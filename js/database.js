/**
 * Created by Randy on 04/8/17.
 */

var db;
var DB = {

    createDatabase: function () {
        var shortName = "BookWorms";
        var version = "1.0";
        var displayName = "DB for BookWorms";
        var dbSize = 2 * 1024 * 1024;

        console.info("Creating database...");
        db = openDatabase(shortName, version, displayName, dbSize, function () {
            console.info("Success: Database was created");
        });

    },
    createTables: function () {

        console.info("Create Tables ...");

        //Create Book Type
        db.transaction(function (tx) {
            var query = "CREATE TABLE BookTypes (" +
                "typeId     INTEGER      NOT NULL       PRIMARY KEY     AUTOINCREMENT," +
                "typeName   VARCHAR(25)  NOT NULL" +
                ");";

            tx.executeSql(query, [], function (tx, result) {
                console.info("Success: Type Table created");
                //Add Default Types

                db.transaction(function (tx) {
                    var query = "INSERT INTO BookTypes (typeName) VALUES " +
                        "('Fiction')," +
                        "('Non-Fiction');";

                    tx.executeSql(query, [], function (tx, result) {
                        console.info("Success: Default Types Added");
                    }, errorHandler);
                }, errorHandler, successfulTransaction);
            }, errorHandler);
        }, errorHandler, successfulTransaction);

        //Create Book Table
        db.transaction(function (tx) {
            var query = "CREATE TABLE IF NOT EXISTS Books (" +
                "bookId             INTEGER      NOT NULL       PRIMARY KEY     AUTOINCREMENT," +
                "bookName           VARCHAR(25)  NOT NULL," +
                "bookAuthor         VARCHAR(25)  NOT NULL," +
                "bookPublishDate    DATETIME," +
                "bookTypeId         INTEGER      NOT NULL," +
                "FOREIGN KEY(bookTypeId) REFERENCES BookTypes(typeId)" +
                ");";

            tx.executeSql(query, [], function (tx, result) {
                console.info("Success: Book Table created");

            }, errorHandler);
        }, errorHandler, successfulTransaction);

        //Create Review Table
        db.transaction(function (tx) {
            var query = "CREATE TABLE IF NOT EXISTS Reviews (" +
                "reviewId             INTEGER       NOT NULL       PRIMARY KEY     AUTOINCREMENT," +
                "reviewEmail          VARCHAR(25)   NOT NULL," +
                "reviewDate           DATETIME      NOT NULL," +
                "reviewTitle          VARCHAR(25)   NOT NULL," +
                "reviewText           VARCHAR(100)  NOT NULL," +
                "reviewVotes          INTEGER       NOT NULL," +
                "bookId               INTEGER       NOT NULL," +
                "FOREIGN KEY(bookId) REFERENCES Book(bookId)" +
                ");";

            tx.executeSql(query, [], function (tx, result) {
                console.info("Success: Review Table created");
            }, errorHandler);
        }, errorHandler, successfulTransaction);

        //Create SavedBooks Table
        db.transaction(function (tx) {
            var query = "CREATE TABLE IF NOT EXISTS SavedBooks (" +
                "savedId            INTEGER      NOT NULL       PRIMARY KEY     AUTOINCREMENT," +
                "savedURI           VARCHAR(50)  NOT NULL," +
                "savedEmail         VARCHAR(50)  NOT NULL" +
                ");";

            tx.executeSql(query, [], function (tx, result) {
                console.info("Success: SavedBooks Table created");
            }, errorHandler);
        }, errorHandler, successfulTransaction);


    },
    dropTable: function (table) {
        console.info("Drop Tables ...");
        db.transaction(function (tx) {
            var query = "DROP TABLE IF EXISTS "+table+";"

            tx.executeSql(query, [], function (tx, result) {
                console.info("Success: "+table +" Table dropped")
            }, errorHandler);
        }, errorHandler, successfulTransaction);
    },

    dropTables: function () {
        DB.dropTable("Books");
        DB.dropTable("BookTypes");
        DB.dropTable("Reviews");
        DB.dropTable("SavedBooks");
    }
}


function errorHandler(tx, error) {
    console.error("SQL Error: %s (%s) -- %s", tx, error.code, error.message);
}
function successfulTransaction() {
    console.info("Success: Transaction is successful");
}

/**
 * Load app in chrome, open console and type "addDataToDatabase();"
 */
function addDataToDatabase() {
    alert("Data added to database");
    //Add Default Types
    db.transaction(function (tx) {
        var query = "INSERT INTO Books VALUES " +
            "(NULL, 'Book1', 'Author1', '2/2/2015', 1)," +
            "(NULL, 'Book2', 'Author1', '2/2/2015', 2)," +
            "(NULL, 'Book3', 'Author2', '2/2/2015', 1);";

        tx.executeSql(query, [], function (tx, result) {
            console.info("Success: Default Types Added");
        }, errorHandler);
    }, errorHandler, successfulTransaction);

    db.transaction(function (tx) {
        var query = "INSERT INTO Reviews VALUES " +
            "(NULL, 'PersonA@Email.com', '2/2/2017', 'Review Title', 'This is the review text', 0, 1)," +
            "(NULL, 'PersonB@Email.com', '2/2/2017', 'ReviewB Title', 'This is the review B text', 2, 1)," +
            "(NULL, 'PersonA@Email.com', '2/2/2017', 'ReviewC Title', 'This is the review C text', 5, 2);";

        tx.executeSql(query, [], function (tx, result) {
            console.info("Success: Default Types Added");
        }, errorHandler);
    }, errorHandler, successfulTransaction);


}