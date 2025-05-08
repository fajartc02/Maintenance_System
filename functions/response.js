function gettingSuccess(res, data) {
    return res.status(200).json({
        message: 'OK',
        data
    })
}

function gettingError(res, err, code = 500) {
    return res.status(code).json({
        message: 'Err',
        err
    })
}

module.exports = {
    gettingSuccess,
    gettingError
}