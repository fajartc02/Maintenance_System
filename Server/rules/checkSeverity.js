function checkSeverity(upper_limit, lower_limit, value) {
    // let gapWarningLimit = (upper_limit - lower_limit) * 10 / 100 // 90%
    let warningLowLimit = +lower_limit + (+lower_limit * 10 / 100)
    let warningUpLimit = +upper_limit - (+upper_limit * 10 / 100)
        // console.log(gapWarningLimit);
    console.log(warningUpLimit);
    console.log(+upper_limit);
    console.log(warningLowLimit);
    console.log(+lower_limit);
    console.log(value);
    if (+value < warningUpLimit && +value > warningLowLimit) {
        // OK
        return 1
    } else if ((+value >= warningUpLimit && +value <= +upper_limit) || (+value >= +lower_limit && +value <= +warningLowLimit)) {
        // WARNING
        return 2
    } else {
        // NG
        return 3
    }
}


module.exports = checkSeverity