/**
 * Created by Randy on 04/8/17.
 */

/**
 * Clear the database
 */
function clearDatabase() {
    var result = confirm("Are you sure?");

    if (result) {
        DB.dropTables();
        alert("Dropped All Tables");
    }
}
