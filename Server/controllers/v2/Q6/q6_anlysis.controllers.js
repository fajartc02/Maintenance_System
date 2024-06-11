const cmdMultipleQuery = require("../../../config/MultipleQueryConnection");
const response = require("../../../helpers/response");

async function dataMap(data, is_abnormal = "false", is_freq = "false") {
  var randomColor = require("randomcolor");
  /* 
                                                                            series: [{
                                                                                    name: 'Problem Name',
                                                                                    type: 'column',
                                                                                    data: [440, 505, 414, 671, 227, 413]
                                                                                }, {
                                                                                    name: 'Problem Name',
                                                                                    type: 'column',
                                                                                    data: [440, 505, 414, 671, 227, 413]
                                                                                }, {
                                                                                    name: 'Standard',
                                                                                    type: 'line',
                                                                                    data: [23, 42, 35, 27, 43, 22]
                                                                                }],
                                                                            
                                                                            chartOptions: {
                                                                              strokeWidth: [0, 0, ..., 4]
                                                                              enabledOnSeries: [0, 1, 2],
                                                                              yaxis: [{
                                                                                  title: {
                                                                                      text: 'Actual (min)',
                                                                                  },
                                                                              }, {
                                                                                  show: false,
                                                                                  opposite: true,
                                                                              }, {
                                                                                  opposite: true,
                                                                                  title: {
                                                                                      text: 'Standard (min)',
                                                                                  }
                                                                              }]
                                                                            }
                                                                          */
  let responseMap = {
    series: [],
    chartOptions: {
      strokeWidth: [],
      enabledOnSeries: [],
      colors: [],
      yaxis: [
        {
          title: {
            text: "Actual (min)",
          },
        },
      ],
    },
    data: [],
  };

  let containerStandard = [0, 0, 0, 0, 0, 0];
  let containerColors = [];
  let mapSeries = await data.map(async (item, i) => {
    let containerActual = [0, 0, 0, 0, 0, 0];
    // console.log(item.fstep_new);
    // stepDesc: 'Trial dan check Qualitas',
    // quick6: 'Q4',
    // idealTime: 1,
    // actualTime: 1,
    // result: null
    containerColors.push(randomColor());
    responseMap.chartOptions.strokeWidth.push(0);
    responseMap.chartOptions.enabledOnSeries.push(i);
    responseMap.chartOptions.yaxis.push({
      show: false,
      opposite: true,
    });
    let mapStepRepair = await item.fstep_new.map(async (step, idxStep) => {
      let idxQ6 = +step.quick6.slice(1, step.quick6.length) - 1;
      if (is_abnormal == "true" && is_freq != "true") {
        if (+step.actualTime > +step.idealTime) {
          containerActual[idxQ6] += +step.actualTime;
          containerStandard[idxQ6] += +step.idealTime;
        } else {
          containerActual[idxQ6] += 0;
          containerStandard[idxQ6] += 0;
        }
        responseMap.data.push(item);
      } else if (is_abnormal == "false" && is_freq != "true") {
        containerActual[idxQ6] += +step.actualTime;
        containerStandard[idxQ6] += +step.idealTime;
        responseMap.data.push(item);
      } else {
        containerActual[idxQ6] += 1;
        containerStandard[idxQ6] += 1;
        responseMap.data.push(item);
      }
      // console.log(idxQ6);
    });
    return {
      fid: item.fid,
      name: `${item.fline} - ${item.ferror_name}`,
      type: "column",
      data: containerActual,
    };
  });
  responseMap.series = await Promise.all(mapSeries);
  responseMap.chartOptions.colors = containerColors;
  responseMap.chartOptions.colors.push(randomColor());
  responseMap.series.push({
    name: "Standard",
    type: "line",
    data: containerStandard,
  });
  responseMap.chartOptions.strokeWidth.push(4);
  responseMap.chartOptions.enabledOnSeries.push(
    responseMap.chartOptions.enabledOnSeries.length
  );
  responseMap.chartOptions.yaxis.push({
    show: false,
  });
  return responseMap;
}

module.exports = {
  getGraphQ6: async (req, res) => {
    try {
      let { fstart_date, fend_date } = req.query;
      let isLtb = `AND (
        fdur >= 120 AND (
            fline = 'Cylinder Head' OR fline = 'Cylinder Block' OR fline = 'Crank shaft' OR fline = 'Cam Shaft' OR fline = 'HPDC' OR fline = 'LPDC'
        )
    ) OR (
        fdur >= 15 AND (
            fline = 'ASSY LINE'
        )
    )`;
      let fline = "";
      if (req.query.fline && req.query.fline != "ALL") {
        isLtb = ` AND (
                    fdur >= 120 AND (
                        fline = '${req.query.fline}'
                    )
                )`;
        if (req.query.fline == "ASSY LINE")
          isLtb = ` AND fdur >= 15 AND (
                    fline = 'ASSY LINE'
                )`;
        // fline = ` AND fline LIKE '%${req.query.fline}%'`;
      }
      let q = `SELECT fid, fline, ferror_name, fstep_new FROM v_current_error_2 WHERE fstart_time BETWEEN '${fstart_date}' AND '${fend_date}' ${isLtb} ${fline} AND fstep_new NOT LIKE '%"quick6":""%' AND fstep_new <> '[]'`;
      console.log(q);
      let rawData = await cmdMultipleQuery(q);
      // console.log(rawData);

      let mapData = await rawData.map((item) => {
        if (item.fstep_new != "[]" && item.fstep_new) {
          let parseJson = JSON.parse(item.fstep_new);
          item.fstep_new = parseJson;
          return item;
        }
      });
      let filterData = await mapData.filter((item) => item?.fstep_new);
      console.log(filterData);
      let responseData = await dataMap(
        filterData,
        req.query.is_abnormal,
        req.query.is_freq
      );
      response.success(res, "GET DATA", responseData);
    } catch (error) {
      console.log(error);
      response.error(res, error);
    }
  },
};
