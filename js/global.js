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


        //Navbar
        {
            //Setup panel navbar
            $('#navbar').enhanceWithin().panel();

            //Listen for swipe to open nav
            $("body").on("swiperight", function () {
                $("#navbar").panel("open");

            });
        }

        //Review Pages
        {
            $("#frmSearchBook, #datSearchDatePublished").on("change", function () {
                doValidate_frmSearchBookReview();
            });


            //TODO: Move this to Facade
            $("#btnSearchBooks").on("click", function () {
                if (doValidate_frmSearchBookReview()) {
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

                                    var bookRow = bookResults.rows[bRow];

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
                                                code += "<p>" + reviewRow.reviewName + " - " + reviewRow.reviewEmail + "</p>";
                                                code += "</li>";
                                            }
                                            code += "<li data-icon='plus'><a href='#' class='ui-btn ui-btn-icon-right ui-icon-plus'><h1>Add A New Review</h1></a></li>";
                                            code += "</ul>";
                                            element.append(code);

                                        }, function () {
                                            var code = "<ul data-role='listview' data-inset='true' class='ui-listview ui-listview-inset ui-corner-all ui-shadow'>";
                                            code += "<li data-role='list-divider' role='heading' class='ui-li-divider ui-bar-inherit'> <h1>" + bookRow.bookName + " (" + bookRow.bookAuthor + ")" + "</h1></li>";
                                            code += "<li data-icon='plus'><a href='#' class='ui-btn ui-btn-icon-right ui-icon-plus'><h1>Add A New Review</h1></a></li>";
                                            code += "</ul>";
                                            element.append(code);
                                        }
                                    );
                                }

                            } else {
                                $.mobile.changePage("#pageReviewSearch");
                                alert("No books were found with those details");
                            }
                        }, errorHandler)
                }
            });
        }
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


