/**
 * Attempt to set the message priority by read the contents of the mail headers and looking for the X-Priority header
 *
 * @param next
 * @param connection
 * @returns {*}
 */
exports.hook_data_post = function (next, connection) {
    var transaction = connection.transaction;

    // check if the X-Priority header is set and that some other plugin hasn't already set the priority
    if (typeof transaction.header.headers['x-priority'] === 'object'
        && typeof transaction.notes.priority === 'undefined') {
        // set the priority on the notes so we can use this later in outbound.js
        var priority = parseInt(transaction.header.headers['x-priority'][0]);
        transaction.notes.priority = priority;
    }

    return next(CONT);
}
