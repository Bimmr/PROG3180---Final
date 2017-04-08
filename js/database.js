/**
 * Created by Randy on 04/8/17.
 */

var db;
var DB = {

    createDatabase: function () {
        var shortName = "Name";
        var version = "1.0";
        var displayName = "DB for Name";
        var dbSize = 2 * 1024 * 1024;

        console.info("Creating database...");
        db = openDatabase(shortName, version, displayName, dbSize, function () {
            console.info("Success: Database was created");
        });

    },
    createTables: function () {

        console.info("Create Tables ...");

        db.transaction(function (tx) {
            var query = "";

            tx.executeSql(query, [], function (tx, result) {
                console.info("Success: Type Table created");
            }, errorHandler);
        }, errorHandler, successfulTransaction);


    },

    dropTable: function (table) {
        console.info("Dropping Table ...");
        db.transaction(function (tx) {
            var query = "DROP TABLE IF EXISTS " + table + ";"

            tx.executeSql(query, [], function (tx, result) {
                console.info("Success: " + table + " Table dropped")
            }, errorHandler);
        }, errorHandler, successfulTransaction);
    },

    dropTables: function () {
        DB.dropTable("tableName");
    }
}


function errorHandler(tx, error) {
    console.error("SQL Error: %s (%s) -- %s", tx, error.code, error.message);
}
function successfulTransaction() {
    console.info("Success: Transaction is successful");
}