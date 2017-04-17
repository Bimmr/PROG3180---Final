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
            console.log(0);
            $("#frmSearchBook").on("keyup", function () {
                doValidate_frmSearchBookReview();
            });

            //TODO: Move this to Facade (NOT YET TESTED)
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
                    if ($("#txtSearchGenre").val().length !== 0) {
                        fields.push("bookTypeId");
                        values.push($("#txtSearchGenre").val());
                    }
                    if ($("#datSearchDatePublished").val().length !== 0) {
                        fields.push("bookPublishDate");
                        values.push($("#datSearchDatePublished").val());
                    }

                    function addNewReview(element) {
                        element.append("<li data-icon='plus'><h1>Add new review</h1></li>");
                    }

                    //Get all books that match fields
                    Books.selectByField(fields, values,
                        function (tx, bookResults) {
                            var element = $("#reviewList");
                            $.mobile.changePage("#pageShowReviews");

                            //Iterate through all books
                            for (var b = 0; b < bookResults.rows.length; b++) {

                                //Get all reviews that match the books
                                Reviews.selectByField("bookId", bookResults.rows[b].bookId,
                                    function (tx, reviewResults) {

                                        var bookRow = bookResults.rows[b];

                                        //Iterate through all review
                                        for (var r = 0; r < reviewResults.rows.length; r++) {
                                            var reviewRow = reviewResults.rows[r];

                                            var code = "";
                                            code += "<li data-icon='none'>";
                                            code += "<h1>" + bookRow.bookName + "</h1>";
                                            code += "<hr>";
                                            code += "<h2>" + reviewRow.reviewTitle + "</h2>";
                                            code += "<hr>";
                                            code += "<p>" + reviewRow.reviewText + "</p>";
                                            code += "</li>";
                                            element.append(code);
                                        }
                                        addNewReview(element);
                                    },
                                    addNewReview(element));

                            }
                        },
                        function () {
                            $.mobile.changePage("#pageReviewSearch");
                            alert("No books were found with those details");
                        });
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


