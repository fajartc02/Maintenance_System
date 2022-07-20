const cron = require('node-cron');
const { QueryTypes } = require('sequelize');
const { table } = require('../config/dbTable');
const sequelize = require('../config/database');

const { default: axios } = require('axios');
const { updateStravaToken } = require('../controllers/StravaController');

module.exports = {
    getActivityScheduler : () => {
        let countOffset = 0;
        let limit = 4;
        let epochNow = Math.floor(new Date().getTime() / 1000.0)

        cron.schedule('*/10 * * * * *', async () => {
            try {
                let countUser = await sequelize.query(`select COUNT(id) c FROM ${table.user} WHERE strava_id IS NOT NULL`,{type:QueryTypes.SELECT})
                console.log(`\n countOffset ${countOffset} | limit ${limit} | countUser ${countUser[0].c}`);

                if(countOffset >= countUser[0].c) return countOffset = 0
                let athletes = await sequelize.query(`SELECT id,uuid,strava_id, strava_token_refresh, strava_token_access, strava_token_expire_at FROM ${table.user} tu 
                                                          WHERE tu.strava_id IS NOT NULL LIMIT ${limit} OFFSET ${countOffset} `,{type:QueryTypes.SELECT})
                
                // offset kelewatan
                if(athletes.length == 0) return false
                athletes.map(async athlete => {
                    try {
                        let activity = await sequelize.query(`SELECT tus.uuid,tus.created_at FROM ${table.user_activity} tus 
                                                          JOIN ${table.activity} ta ON ta.id = tus.id_activity
                                                          WHERE tus.id_user = ${athlete.id} AND ta.is_strava = 1
                                                          ORDER BY tus.created_at DESC LIMIT 1`,
                                                          {type:QueryTypes.SELECT})

                        // gapunya activity
                        if (activity.length == 0) return false;

                        let created_at = (activity[0].created_at) ? activity[0].created_at : 0; 


                        if(!updateStravaToken(athlete.uuid)) console.log("user belum terkoneksi ke strava")

                        // console.log(getActivityData)

                        // console.log(postRefreshToken);
                        
                    } catch (error) {
                        console.log(error);
                        
                    }
                    // const res = await axios.get("https://www.strava.com/api/v3/athlete/activities")
                })


                countOffset += limit
            } catch (error) {
                console.log(error);
            }
        });
    }
} 

