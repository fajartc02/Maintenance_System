const axios = require('axios');
const { User } = require('../models').models;
const UserActivity = require('../models/UserActivity');
const { QueryTypes } = require('sequelize');
const { v4: uuidv4 } = require('uuid');
const { table } = require('../config/dbTable');
const { values, epochNow, stravaOauthURI } = require('../config/values');
const jwt = require('jsonwebtoken');

exports.verifyWebhook = async (req, res, next) => {
    const VERIFY_TOKEN = "FAMILY-DAY";
    
    let mode = req.query['hub.mode'];
    let token = req.query['hub.verify_token'];
    let challenge = req.query['hub.challenge'];
    
    if (mode && token) {
      if (mode === 'subscribe' && token === VERIFY_TOKEN) {     
        console.log('WEBHOOK_VERIFIED');
        res.json({"hub.challenge":challenge});  
      } else {
        res.sendStatus(403);      
      }
    }
};

exports.stravaWebhook = async (req, res) => {
	  console.log("webhook event received!", req.query, req.body);

    //cek apakah tipe event nya activity
    if(req.body.object_type != "activity"){
        return res.status(212).json({
            status: "success",
            message: `data pushed but object id is not activity ${req.body}`
        })
    }

    
    try {
        // const userData = await User.findOne({
        //       where: {
        //           strava_id: req.body.owner_id
        //       },
        //       attributes: ['id','name','strava_id','strava_token_refresh','strava_token_access',
        //       'strava_token_expire_at']
        // });
        const qGetUserWithCompetition = `SELECT * FROM ${table.user} tu JOIN ${table.user_competition} tuc ON tu. `
        const user = await sequelize.query("SELECT id,uuid,strava_id, strava_token_refresh, strava_token_access, strava_token_expire_at FROM `users`", { type: QueryTypes.SELECT });

        // const user = await 
        
        if (!user) {
          return res.status(404).json({
            status: "error",
            message: "User Tidak Ditemukan,  tolong register dulu bos",
          });
        }



        

        
    } catch (error) {
        
    }
    
    
    // try {
        
        
    // } catch (error) {
    //     console.log(error)
    // }
    

    // const activity = await Activity.findOne({
    //     where: {
    //         name: req.body.owner_id
    //     },
    //     attributes: ['id','name','strava_id','strava_token_refresh','strava_token_access',
    //     strava.token.expire.at]
    // })
    
    const data = {
		uuid: uuidv4(),
		id_activity: 1,
        id_user: user.id,
        id_competition: 1,
		// distance: 0,
		// moving_time: 0,
		// elapsed_time: 0,
		strava_activity_id: req.body.object_id,
        strava_activity_data: {},
		submission_file: null,
		submission_desc: null,
		created_at: Math.floor(new Date().getTime() / 1000.0),
    	updated_at: Math.floor(new Date().getTime() / 1000.0)
	};

    try {
        const createdUserActivity = await UserActivity.create(data);
        return res.status(201).json({
			status: "success",
			data: {
				uuid: createdUserActivity.uuid,
			},
		});
	} catch (error) {
		return res.status(409).json({
			status: "error",
			message: error.message,
		});
		
	}
};

exports.exchangeToken = async(req, res)=> {
    const code = req.query.code;
    const token = req.query.token;
    let decoded = jwt.decode(token)
    const uuid_user = decoded.data.uuid;

    try {
      const oauthData = {
        client_id: process.env.STRAVA_CLIENT_ID,
        client_secret: process.env.STRAVA_SECRET_ID,
        code: code,
        grant_type: "authorization_code"
      } 
      
      const strava = await axios.post(stravaOauthURI,oauthData);

      console.log(uuid_user)
      const user = await User.findOne({ 
          where: { uuid: uuid_user } ,
          attributes : ['uuid', "name"]
      });

      if (!user) {
        return res.status(404).json({
          status: "error",
          message: "User Tidak Ditemukan,  tolong register dulu bos",
        });
      }
    //TODO: cek tidak bole ada user ganda
    let current_time = Math.floor(new Date().getTime() / 1000.0)

    const data = {
         strava_id: strava.data.athlete.id,
         strava_token_refresh: strava.data.refresh_token,
         strava_token_access: strava.data.access_token,
         strava_token_expire_at: strava.data.expires_at,
         updated_at: current_time,
    }

    // console.log(data)
    const rest = await User.update(data, {
			where: {
				uuid: uuid_user,
			}
    });
    // console.log(rest)

    // return res.status(200).json({
    //   status: 'success',
    //   message: 'User connected to Strava',
    //   data: {
    //       user: user.uuid,
    //       name: user.name,
    //       strava_id: data.strava_id
    //   }
    // });

    return res.redirect('https://tmminfamilyday.com')
    
  } catch (error) {
    return res.status(501).json({
      status: 'error',
      data: error
    });
  }

}

exports.updateStravaToken = async (uuid) => {
  try {
    const user = await User.findOne({ 
      where: { uuid: uuid } ,
      attributes : ["uuid","strava_id", "strava_token_refresh", "strava_token_access", "strava_token_expire_at"]
    });

    //console.log(user.strava_id)

    if (!user.strava_id) return false
    //user belum terkoneksi ke strava

    if(user.strava_token_expire_at > epochNow) return true
    //masih belum expire

    const postRefreshToken = {
      client_id : process.env.STRAVA_CLIENT_ID,
      client_secret : process.env.STRAVA_SECRET_ID,
      grant_type : "refresh_token",
      refresh_token : user.strava_token_refresh
    }

    console.log("UPDATE TOKEN");
  
    const strava = await axios.post(stravaOauthURI,postRefreshToken)
    const dataRefreshToken = {
      strava_token_access: strava.data.access_token,
      strava_token_expire_at: strava.data.expires_at,
      updated_at: epochNow,
    }

    const rest = await User.update(dataRefreshToken, {
      where: {
        uuid: uuid,
      }
    });
    return true
    
  } catch (error) {
    console.log(error);
  }
}


exports.isStravaConnected = async (req, res) => {
  const uuid = req.user.data.uuid
  const uuid_user = uuid;

  let status= await this.updateStravaToken(uuid_user)
  
  // console.log(`status user ${decoded.data.email} => ${status}`);
  //console.log(status)
  

  if(!status) return res.status(501).json({
    status: 'failed',
    message: 'User belum terkoneksi ke strava',
  });

  return res.status(200).json({
    status: 'success',
    message: 'User sudah Terknoneksi ke strava',
  });
}