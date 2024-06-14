function isNotEmpty(input) {
    if (!isNaN(input) || input == "" || input == "null" || !input) {
        return false;
    } else {
        return true;
    }
}

module.exports = isNotEmpty;