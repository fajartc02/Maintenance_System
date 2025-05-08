const { exec } = require('child_process')

module.exports = {
    updateServer: async(req, res) => {
        console.log(`Running update script . . .`);
        await exec(`git pull && npm install`, function(error, stdout, stderr) {
                if (error || stderr) {
                    console.log(stderr);
                    console.log(error);
                    res.status(200).json({
                        message: 'Error',
                        err: error ? error.split('\n') : stderr.split('\n')
                    })
                } else {
                    console.log(stdout);
                    res.status(200).json({
                        message: 'OK',
                        data: stdout.split('\n')
                    })
                }
                console.log(stdout);

            })
            // await exec(`pm2 start bin/www && pm2 restart 0`, function(error, stdout, stderr) {
            //     if (error || stderr) {
            //         console.log(stderr);
            //         console.log(error);
            //         res.status(200).json({
            //             message: 'Error',
            //             err: error ? error : stderr
            //         })
            //     }
            //     res.status(200).json({
            //         message: 'OK',
            //         data: stdout.split('\n')
            //     })
            //     console.log('BAWAH');
            //     console.log(stdout);
            // })
    },
    testing: (req, res) => {
        res.status(200).json({
            message: 'sudah di update tgl 16/02/22 16:10',
        })
    }
}