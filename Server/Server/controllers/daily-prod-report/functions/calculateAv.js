function calculateAv(total_ls, total_minute) {
    return ((total_minute - total_ls) / total_minute) * 100
}

module.exports = calculateAv