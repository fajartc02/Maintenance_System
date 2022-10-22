function calculateAv(total_ls, total_jam) {
    // TOTAL JAM - L/S AVAILABILITY
    // ----------------------------
    // TOTAL JAM
    // let total_jam = 480
    return (total_jam - total_ls) / total_jam
}

module.exports = calculateAv