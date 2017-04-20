/**
 * Created by Randy on 04/8/17.
 */

/**
 * When the page is ready run the init
 */
$(document).ready(function () {
    initDB();
    init();
});

/**
 * Init the page
 */
function init() {
    $.get("./reviews.html", function (data) {
        $("body").append(data);

        $.get("./settings.html", function (data) {
            $("body").append(data);

            //TODO: Move this to facade
            BookTypes.SelectAll(
                function (tx, results) {
                    var code = "";

                    for (var i = 0; i < results.rows.length; i++) {
                        code += "<option value='" + results.rows[i].typeId + "'>";
                        code += results.rows[i].typeName;
                        code += "</option>";
                    }
                    $("#txtSearchGenre").append(code).hide().show();

                },
                function () {
                    alert("Something went wrong whilst loading book types. Please try again.");
                }
            )

            //Navbar
            {
                //Setup panel navbar
                $('#navbar').enhanceWithin().panel();

                //Listen for swipe to open nav
                $("body").on("swiperight", function () {
                    $("#navbar").panel("open");

                });
            }

            //Home
            {
                if (localStorage.getItem("email") == null)
                    $("#popupGetEmail").popup("open");
                else
                    localStorage.setItem("email", $("#txtHomeEmail").val());


                $("#btnHomeEmail").on("click", function () {

                    //TODO: Move validate to Facade
                    if ($("#frmGetEmail").valid()) {

                        var email = $("#txtHomeEmail").val();
                        localStorage.setItem("email", email);
                        $("#txtSettingsEmail").val(email);

                        $("#popupGetEmail").popup("close");
                    }

                });
            }

            //Review Pages
            {

                //Update validator on anything changing
                $("#frmSearchBook, #datSearchDatePublished").on("change", function () {
                    doValidate_frmSearchBookReview();
                });
                $("#frmSearchBook input").on("keyup", function () {
                    doValidate_frmSearchBookReview();
                });


                //TODO: Move this to facade
                $("#btnSearchBooks").on("click", function () {
                    if (doValidate_frmSearchBookReview()) {

                        //Format fields and values into array
                        var fields = [];
                        var values = [];
                        if ($("#txtSearchName").val().length !== 0) {
                            fields.push("bookName");
                            values.push($("#txtSearchName").val());
                        }
                        if ($("#txtSearchAuthor").val().length !== 0) {
                            fields.push("bookAuthor");
                            values.push($("#txtSearchAuthor").val());
                        }
                        if ($("#txtSearchGenre").val() !== "-1") {
                            fields.push("bookTypeId");
                            values.push($("#txtSearchGenre").val());
                        }
                        if ($("#datSearchDatePublished").val().length !== 0) {
                            fields.push("bookPublishDate");
                            values.push($("#datSearchDatePublished").val());
                        }

                        //Get all books that match fields
                        Books.selectByField(fields, values,
                            function (tx, bookResults) {
                                if (bookResults.rows.length > 0) {
                                    var element = $("#reviewList");
                                    element.html("");
                                    $.mobile.changePage("#pageShowReviews");

                                    //Iterate through all books
                                    for (var bRow = 0; bRow < bookResults.rows.length; bRow++) {
                                        getReviews(element, bookResults.rows[bRow]);
                                    }
                                } else {
                                    $.mobile.changePage("#pageReviewSearch");
                                    alert("No books were found with those details");
                                }
                            }, errorHandler);

                        //This has to be in a separate function to make sure bookRow isn't being overridden before it gets calls
                        function getReviews(element, bookRow) {

                            //Get all reviews that match the books
                            Reviews.selectByField("bookId", bookRow.bookId,
                                function (tx, reviewResults) {

                                    //Manually set classes/etc because it doesn't work nicely when you have multiple listviews being added at the same time, to the same div
                                    var code = "<ul data-role='listview' data-inset='true' class='ui-listview ui-listview-inset ui-corner-all ui-shadow'>";
                                    code += "<li data-role='list-divider' role='heading' class='ui-li-divider ui-bar-inherit'> <h1>" + bookRow.bookName + " (" + bookRow.bookAuthor + ")" + "</h1></li>";

                                    //Iterate through all review
                                    for (var revRow = 0; revRow < reviewResults.rows.length; revRow++) {
                                        var reviewRow = reviewResults.rows[revRow];
                                        code += "<li data-icon='none' class='ui-li-static ui-body-inherit'>";
                                        code += "<p class='ui-li-aside'>" + reviewRow.reviewDate + "</p>";
                                        code += "<h3>" + reviewRow.reviewTitle + "</h3>";
                                        code += "<p>" + reviewRow.reviewText + "</p>";
                                        code += "<p>" + reviewRow.reviewEmail + "</p>";
                                        code += "</li>";
                                    }
                                    code += "<li data-icon='plus'><a href='#' class='ui-btn ui-btn-icon-right ui-icon-plus'><h1>Add A New Review</h1></a></li>";
                                    code += "</ul>";
                                    element.append(code);

                                },
                                function () {
                                    var code = "<ul data-role='listview' data-inset='true' class='ui-listview ui-listview-inset ui-corner-all ui-shadow'>";
                                    code += "<li data-role='list-divider' role='heading' class='ui-li-divider ui-bar-inherit'> <h1>" + bookRow.bookName + " (" + bookRow.bookAuthor + ")" + "</h1></li>";
                                    code += "<li data-icon='plus'><a href='#' class='ui-btn ui-btn-icon-right ui-icon-plus'><h1>Add A New Review</h1></a></li>";
                                    code += "</ul>";
                                    element.append(code);
                                }
                            );
                        }
                    }
                });
            }

            //Settings Pages
            {

                $("#btnSettingsAbout").on("click", function () {
                    $("#popupAbout").popup("open");
                });

                $("#btnSettingsSave").on("click", function () {
                    if ($("#frmSettings").valid()) {
                        alert("Email has been updated");
                        localStorage.setItem("email", $("#txtSettingsEmail").val());
                    }
                });
            }
        });
    });
}

/**
 * Initialize the database
 */
function initDB() {

    try {
        console.info("Creating DB");
        DB.createDatabase();

        if (db != null) {
            console.info("Creating Table");
            DB.createTables();
        }
    } catch (error) {
        console.error("An Error has occurred while creating the database");

    }
}


