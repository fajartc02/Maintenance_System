const { exec } = require('child_process')

module.exports = {
    updateServer: (req, res) => {
        console.log(`Running update script . . .`);
        exec(`git pull && npm install && pm2 start bin/www && pm2 restart 0`, function(error, stdout, stderr) {
            if (error || stderr) {
                console.log(stderr);
                console.log(error);
                res.status(200).json({
                    message: 'Error',
                    err: error ? error : stderr
                })
            } else {
                console.log(stdout);
                res.status(200).json({
                    message: 'OK',
                    data: stdout.split('\n')
                })

            }
        })
    },
    testing: (req, res) => {
        res.status(200).json({
            message: 'sudah di update tgl 10/02/22',
        })
    }
}