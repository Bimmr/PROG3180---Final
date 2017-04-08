/**
 * Created by Randy on 04/8/17.
 */
var review = {
    /**
     * Insert into the database
     * @param options
     * @param sCallback
     * @param fCallback
     */
    insert: function (options, sCallback, fCallback) {
        db.transaction(function (tx) {
                var query = "";
                tx.executeSql(query, options, sCallback, fCallback);
            },
            errorHandler, successfulTransaction);

    },
    /**
     * Select a specific record from the database
     * @param id
     * @param sCallback
     * @param fCallback
     */
    select: function (id, sCallback, fCallback) {
        db.transaction(function (tx) {
            var query = "";
            var options = [id];

            tx.executeSql(query, options, sCallback, fCallback);
        }, errorHandler, successfulTransaction);

    },
    /**
     * Update a specific record into the database
     * @param options
     * @param sCallback
     * @param fCallback
     */
    update: function (options, sCallback, fCallback) {
        db.transaction(function (tx) {
            var query = "";

            tx.executeSql(query, options, sCallback, fCallback);
        }, errorHandler, successfulTransaction);

    },
    /**
     * Delete a specific record from the database
     * @param id
     * @param sCallback
     * @param fCallback
     */
    delete: function (id, sCallback, fCallback) {
        db.transaction(function (tx) {
            var query = "";
            var options = [id];

            tx.executeSql(query, options, sCallback, fCallback);
        }, errorHandler, successfulTransaction);

    },
    /**
     * Select all records from the database
     * @param sCallback
     * @param fCallback
     */
    SelectAll: function (sCallback, fCallback) {
        db.transaction(function (tx) {
                var query = "";
                tx.executeSql(query, [], sCallback, fCallback);
            },
            errorHandler, successfulTransaction);
    }
}
