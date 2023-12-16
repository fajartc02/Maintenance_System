function problemNotification(msg, receiverNo, category) {
    const cmdMultipleQuery = require("../../config/MultipleQueryConnection");
    var axios = require("axios");
    var qs = require("qs");

    var data = qs.stringify({
        token: "nRRMT4Jomzf5vyn4DU1p4ywDuZ7pdYwDnULfGTlrAsVAMWcpeT",
        number: receiverNo,
        message: msg,
    });
    var config = {
        method: "post",
        url: "https://app.ruangwa.id/api/send_express",
        headers: {},
        data: data,
    };

    axios(config)
        .then(function(response) {
            console.log(JSON.stringify(response.data));
            return true
        })
        .catch(function(error) {
            console.log(error);
            return error
        });
}

module.exports = problemNotification