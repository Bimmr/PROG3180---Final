/**
 * Created by Randy on 04/8/17.
 */

/**
 * When the page is ready run the init
 */
$(document).ready(function () {
    init();
    initDB();
});

/**
 * Init the page
 */
function init() {
    $.get("./reviews.html", function (data) {
        $("body").append(data);
    });

    //Setup panel navbar
    $('#navbar').enhanceWithin().panel();

    //Listen for swipe to open nav
    $("body").on("swiperight", function () {
        $("#navbar").panel("open");

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


