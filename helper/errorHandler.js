module.exports = {
    errorMsg: function errorMessage(err, key) {
        return { message: err, [key]: null };
    }
}