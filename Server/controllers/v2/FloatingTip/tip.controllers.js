const cmdMultipleQuery = require("../../../config/MultipleQueryConnection");
const response = require("../../../helpers/response");
const moment = require("moment");

module.exports = {
    getTip: async(req, res) => {
        try {
            let queryCondition = `WHERE check_date BETWEEN '${moment(
        req.query.fstart_date
      ).format("YYYY-MM-DD")}' AND '${moment(req.query.fend_date).format(
        "YYYY-MM-DD"
      )}' `;

            if (req.query.fmc_name != "ALL") {
                queryCondition += `AND machine_nm = '${req.query.fmc_name}' `;
            }

            let q = `SELECT * FROM tb_r_floating_tip ${queryCondition}`;

            // data: [
            // {
            //     x: moment().format('YYYY-MM-DD'),
            //     y: 0.1
            // }, {
            //     x: moment().add(1, 'days').format('YYYY-MM-DD'),
            //     y: 0
            // }, {
            //     x: moment().add(2, 'days').format('YYYY-MM-DD'),
            //     y: 0.3
            // }
            // ]
            // units
            // min
            // max
            // limit

            /* 
                                                                                                      [{
                                                                                                          machine: 'IKDM-0101',
                                                                                                          param: 'Celah Tip Atas',
                                                                                                          data: [
                                                                                                              {
                                                                                                                  x: moment().format('YYYY-MM-DD'),
                                                                                                                  y: 0.1
                                                                                                              }, {
                                                                                                                  x: moment().add(1, 'days').format('YYYY-MM-DD'),
                                                                                                                  y: 0
                                                                                                              }, {
                                                                                                                  x: moment().add(2, 'days').format('YYYY-MM-DD'),
                                                                                                                  y: 0.3
                                                                                                              }
                                                                                                          ],
                                                                                                          units: 'm',
                                                                                                          min: 0,
                                                                                                          max: 1,
                                                                                                          limit: 30
                                                                                                      }]
                                                                                                      */

            const responseData = await cmdMultipleQuery(q);

            const parameters = [{
                    key: "upper_gap_tip",
                    param: "Celah Tip Atas",
                    min: 0,
                    max: 0.3,
                    limit: [{
                        y: 0.1,
                        borderColor: "#ffe821",
                        borderWidth: 5,
                        label: {
                            borderColor: "#ffe821",
                            style: {
                                color: "#000",
                                background: "#ffe821",
                                fontSize: "12px",
                                fontWeight: "bold",
                            },
                            text: "0.1 mm",
                        },
                    }, ],
                    units: "mm",
                },
                {
                    key: "upper_depth_tip",
                    param: "Kedalaman Tip Atas",
                    min: 0,
                    max: 200,
                    limit: [{
                        y: 100,
                        borderColor: "#ffe821",
                        borderWidth: 5,
                        label: {
                            borderColor: "#ffe821",
                            style: {
                                color: "#000",
                                background: "#ffe821",
                                fontSize: "12px",
                                fontWeight: "bold",
                            },
                            text: "100 mm",
                        },
                    }, ],
                    units: "mm",
                },
                {
                    key: "lower_gap_tip",
                    param: "Celah Tip Bawah",
                    min: 0,
                    max: 0.1,
                    limit: [{
                        y: 0.05,
                        borderColor: "#ffe821",
                        borderWidth: 5,
                        label: {
                            borderColor: "#ffe821",
                            style: {
                                color: "#000",
                                background: "#ffe821",
                                fontSize: "12px",
                                fontWeight: "bold",
                            },
                            text: "0.05 mm",
                        },
                    }, ],
                    units: "mm",
                },
                {
                    key: "lower_depth_tip",
                    param: "Kedalaman Tip Bawah",
                    min: 0,
                    max: 7,
                    limit: [{
                            y: 3,
                            borderColor: "#ffe821",
                            borderWidth: 5,
                            label: {
                                borderColor: "#ffe821",
                                style: {
                                    color: "#000",
                                    background: "#ffe821",
                                    fontSize: "12px",
                                    fontWeight: "bold",
                                },
                                text: "3 mm",
                            },
                        },
                        {
                            y: 5,
                            borderColor: "#ffe821",
                            borderWidth: 5,
                            label: {
                                borderColor: "#ffe821",
                                style: {
                                    color: "#000",
                                    background: "#ffe821",
                                    fontSize: "12px",
                                    fontWeight: "bold",
                                },
                                text: "5 mm",
                            },
                        },
                    ],
                    units: "mm",
                },
            ];

            const transformData = (data) => {
                const result = [];

                const groupedByMachine = data.reduce((acc, item) => {
                    if (!acc[item.machine_nm]) {
                        acc[item.machine_nm] = [];
                    }
                    acc[item.machine_nm].push(item);
                    return acc;
                }, {});

                for (const [machine_nm, records] of Object.entries(groupedByMachine)) {
                    const machineObj = {
                        machine_nm,
                        children: [],
                    };

                    parameters.forEach((paramInfo) => {
                        const paramData = {
                            param: paramInfo.param,
                            min: paramInfo.min,
                            max: paramInfo.max,
                            limit: paramInfo.limit,
                            units: paramInfo.units,
                            data: records.map((record) => ({
                                x: moment(record.check_date).format("YYYY-MM-DD"),
                                y: record[paramInfo.key],
                                tip_counter: record.tip_counter,
                                sleeve_counter: record.sleeve_counter,
                                spruebush_counter: record.spruebush_counter,
                            })),
                        };
                        machineObj.children.push(paramData);
                    });

                    result.push(machineObj);
                }

                return result;
            };
            if (responseData.length > 0) {
                const transformedData = transformData(responseData);
                response.success(res, "get data", transformedData);
            } else {
                response.success(res, "get data", []);
            }
        } catch (error) {
            console.log(error);
            response.failed(res, "Error to get data");
        }
    },
    addTip: async(req, res) => {
        try {
            let containerKeys = [];
            let containerValues = [];
            for (const key in req.body) {
                containerKeys.push(key);
                const element = req.body[key];
                containerValues.push(`'${element}'`);
            }
            let q = `INSERT INTO tb_r_floating_tip(${containerKeys.join(
        ","
      )}) VALUES (${containerValues.join(",")})`;

            const resInst = await cmdMultipleQuery(q);
            response.success(res, "inserted", resInst);
        } catch (error) {
            response.failed(res, "Error to add new tip");
        }
    },
};