/**
 * Attempt to set the message priority by reading the contents of the mail headers and looking for the X-Priority header
 * This plugin will remove the X-Priority header
 *
 * @param next
 * @param connection
 * @returns {*}
 */
exports.hook_data_post = function (next, connection) {
    var transaction = connection.transaction;

    // check if the X-Priority header is set and that some other plugin hasn't already set the priority
    if (typeof transaction.header.headers['x-priority'] === 'object') {

        // check the priority hasn't already been set in another plugin
        if (typeof transaction.notes.priority === 'undefined') {
            // use the priority from the header and save in the notes for use later in outbound.js
            var priority = parseInt(transaction.header.headers['x-priority'][0]);
            transaction.notes.priority = priority;
        }

        // remove the X-Priority header otherwise emails will be marked as important which probably isn't what we want
        transaction.remove_header('x-priority');
    }

    return next(CONT);
}
