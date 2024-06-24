require("dotenv").config();

var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");

const cron = require("node-cron");

async function checkIsMcActive(id, cmdMultipleQuery) {
    let q = `SELECT fmc_id, 
    ferror_name,
    fstart_time,
    fend_time FROM tb_error_log_2
  WHERE fmc_id = ${id} AND 
  fend_time IS NULL`;
    cmdMultipleQuery(q)
        .then((result) => {
            console.log(result);
            if (result.length < 1 || !result) {
                let qChangesStatusMc = `UPDATE tb_status SET fstatus = 0, ferror_start = NULL WHERE fid = ${id}`;
                cmdMultipleQuery(qChangesStatusMc)
                    .then((resStatus) => {
                        console.log(resStatus);
                    })
                    .catch((errStatus) => {
                        console.log(errStatus);
                    });
            }
        })
        .catch((err) => {
            console.log(err);
        });
}

const {
    getAllCountermeasure,
    getNotifLeader,
} = require("./functions/notification/countermeasure");

const {
    getTemporaryAction,
} = require("./functions/notification/temporaryAction");

// Every day at 9:35am check remind countermeasure to leader MT
cron.schedule("35 9 * * *", () => {
    getAllCountermeasure(getNotifLeader);
});

// Every monday at 9:35am check remind temporary action to leader MT
cron.schedule("35 9 * * 1", () => {
    getTemporaryAction();
});

// Every 3 seconds check fixing bug smartandon not closed
cron.schedule("*/30 * * * * *", async() => {
    const cmdMultipleQuery = require("./config/MultipleQueryConnection");
    console.log("RUN JOB check invalid data 30 seconds");
    // simple query
    let q = `SELECT fid,fstatus FROM tb_status WHERE fstatus = 1;`;
    await cmdMultipleQuery(q)
        .then((result) => {
            console.log(result);
            let containerResult = result;
            if (containerResult.length > 0) {
                containerResult.forEach((itemProb) => {
                    checkIsMcActive(itemProb.fid, cmdMultipleQuery);
                });
            }
        })
        .catch((err) => {
            console.error(err);
        });
});

const problemNotification = require("./functions/notification/problemNotification");
cron.schedule("*/1 * * * *", async() => {
    try {
        let qActiveProblem = `SELECT * FROM v_notif_problems`;
        const problems = await cmdMultipleQuery(qActiveProblem);
        if (problems.length > 0) {
            let qInsertNotifRole = `INSERT INTO tb_r_notification_problems(problem_id,user_id, role) VALUES `;
            let containerNofifProblem = [];
            for (let index = 0; index < problems.length; index++) {
                const problem = problems[index];
                let duration = +problem.fdur;

                let durCondLH = duration >= 15 && duration < 30;
                let durCondSH = duration >= 30 && duration < 60;
                // let durCondDph = duration >= 60 && duration < 120
                let durCondDph = duration % 60 == 0 && duration != 0;
                let durCondDh = duration >= 120;

                let userData = await cmdMultipleQuery(
                    `SELECT * FROM v_user_notification`
                );
                var message = `
===SMART NOTIFICATION===
*LINE* :
${problem.fline}
*START TIME* :
${problem.fstart_time}
*MACHINE* :
${problem.fmc_name}
*ERROR NAME* :
${problem.ferror_name}
*DURATION* :
${duration} Min
*MP* :
${problem.foperator}
*LINK* :
https://smartandonsys.web.app/editProblem?v_=${problem.fid}

https://smartandonsys.web.app

Tolong di save nomer ini jadi
*SMART ANDON*`;
                for (let y = 0; y < userData.length; y++) {
                    const user = userData[y];
                    let userNotifNotyetSent = await cmdMultipleQuery(
                        `SELECT id FROM tb_r_notification_problems WHERE problem_id = ${problem.fid} AND user_id = ${user.user_id}`
                    );
                    let isNotyetSent = userNotifNotyetSent.length == 0;
                    let userInLine = problem.line_id == user.line_id && isNotyetSent;
                    const inLineUser = problem.line_id == user.line_id;
                    let userWhatsapp = user.fwa_no;
                    console.log("durCondLH", "userInLine");
                    console.log(durCondLH, userInLine);
                    if (durCondLH && user.role == "LH" && userInLine) {
                        await problemNotification(message, userWhatsapp, "NOTIF");
                        await problemNotification(
                            `NOTIF SENT TO: ${user.fname} \n\n ${message}`,
                            "082211511213",
                            "NOTIF"
                        );
                        containerNofifProblem.push(
                            `(${problem.fid}, ${user.user_id}, 'LH')`
                        );
                        continue;
                    } else if (durCondSH && user.role == "SH" && userInLine) {
                        await problemNotification(message, userWhatsapp, "NOTIF");
                        await problemNotification(
                            `NOTIF SENT TO: ${user.fname} \n\n ${message}`,
                            "082211511213",
                            "NOTIF"
                        );
                        containerNofifProblem.push(
                            `(${problem.fid}, ${user.user_id}, 'SH')`
                        );
                        continue;
                    } else if (durCondDph && user.role == "Dph" && inLineUser) {
                        // espesially Dph ignoring not yet send
                        await problemNotification(message, userWhatsapp, "NOTIF");
                        await problemNotification(
                            `NOTIF SENT TO: ${user.fname} \n\n ${message}`,
                            "082211511213",
                            "NOTIF"
                        );
                        containerNofifProblem.push(
                            `(${problem.fid}, ${user.user_id}, 'Dph')`
                        );
                        continue;
                    } else if (durCondDh && user.role == "DH" && userInLine) {
                        await problemNotification(message, userWhatsapp, "NOTIF");
                        await problemNotification(
                            `NOTIF SENT TO: ${user.fname} \n\n ${message}`,
                            "082211511213",
                            "NOTIF"
                        );
                        containerNofifProblem.push(
                            `(${problem.fid}, ${user.user_id}, 'DH')`
                        );
                        continue;
                    }
                }
            }

            if (containerNofifProblem.length > 0)
                await cmdMultipleQuery(
                    qInsertNotifRole + containerNofifProblem.join(",")
                );
        }
    } catch (error) {
        console.error(error);
    }
});

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
const cmdMultipleQuery = require("./config/MultipleQueryConnection");

var app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: false, limit: "50mb" }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

// app.listen(3000)

module.exports = app;