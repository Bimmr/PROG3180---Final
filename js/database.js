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

        //Create Book Table
        db.transaction(function (tx) {
            var query = "CREATE TABLE IF NOT EXISTS Books (" +
                "bookId             INTEGER      NOT NULL       PRIMARY KEY     AUTOINCREMENT," +
                "bookName           VARCHAR(25)  NOT NULL," +
                "bookAuthor         VARCHAR(25)  NOT NULL," +
                "bookPublishDate    DATETIME             ," +
                "bookTypeId         INTEGER      NOT NULL,   "
                "FOREIGN KEY(bookTypeId) REFERENCES BookTypes(typeId));" +
            ");";

            tx.executeSql(query, [], function (tx, result) {
                console.info("Success: Book Table created");
            }, errorHandler);
        }, errorHandler, successfulTransaction);

        //Create Book Type
        db.transaction(function (tx) {
            var query = "CREATE TABLE IF NOT EXISTS BookTypes (" +
                "typeId     INTEGER      NOT NULL       PRIMARY KEY     AUTOINCREMENT," +
                "typeName   VARCHAR(25)  NOT NULL," +
            ");";

            tx.executeSql(query, [], function (tx, result) {
                console.info("Success: Type Table created");

                //Add Default Types
                db.transaction(function (tx) {
                    var query = "INSERT INTO BookTypes (typeName) VALUES " +
                        "(?)," +
                        "(?);";
                    var options = ['Fiction', 'Non-Fiction'];

                    tx.executeSql(query, options, function (tx, result) {
                        console.info("Success: Default Types Added");
                    }, errorHandler);
                }, errorHandler, successfulTransaction);
            }, errorHandler);
        }, errorHandler, successfulTransaction);

        //Create Review Table
        db.transaction(function (tx) {
            var query = "CREATE TABLE IF NOT EXISTS Reviews (" +
                "reviewId             INTEGER      NOT NULL       PRIMARY KEY     AUTOINCREMENT," +
                "reviewName           VARCHAR(25)  NOT NULL," +
                "reviewEmail          VARCHAR(25)  NOT NULL," +
                "reviewDate           DATETIME     NOT NULL," +
                "reviewTitle          VARCHAR(25)  NOT NULL," +
                "reviewText           VARCHAR(100)  NOT NULL," +
                "reviewVotes          INTEGER      NOT NULL,"
                "bookId               INTEGER      NOT NULL,"
                "FOREIGN KEY(bookId) REFERENCES Book(bookId));" +
            ");";

            tx.executeSql(query, [], function (tx, result) {
                console.info("Success: Review Table created");
            }, errorHandler);
        }, errorHandler, successfulTransaction);

        //Create SavedBooks Table
        db.transaction(function (tx) {
            var query = "CREATE TABLE IF NOT EXISTS SavedBooks (" +
                "savedId             INTEGER      NOT NULL       PRIMARY KEY     AUTOINCREMENT," +
                "savedURI           VARCHAR(50)  NOT NULL," +
                "savedEmail         VARCHAR(50)  NOT NULL," +
            ");";

            tx.executeSql(query, [], function (tx, result) {
                console.info("Success: SavedBooks Table created");
            }, errorHandler);
        }, errorHandler, successfulTransaction);


    }
}


function errorHandler(tx, error) {
    console.error("SQL Error: %s (%s) -- %s", tx, error.code, error.message);
}
function successfulTransaction() {
    console.info("Success: Transaction is successful");
}