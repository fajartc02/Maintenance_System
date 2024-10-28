var router = require("express").Router();

const problemRoute = require("./problemRoute");
const {getLtbHistory} = require("../../controllers/v2/LTBHistory");
const {
    getGraphQ6,
} = require("../../controllers/v2/Q6/q6_anlysis.controllers");
const {
    addTip,
    getTip,
    getTipTable,
} = require("../../controllers/v2/FloatingTip/tip.controllers");
const cmdMultipleQuery = require("../../config/MultipleQueryConnection");
const q6 = require("../../constant/q6");
const flattenArray = require("../../helpers/flattenArray");
const isNotEmpty = require("../../helpers/isNotEmpty");
const uploadFileReport = require("../../functions/newUploadFile");

router.get("/ltb-history", getLtbHistory);
router.get("/q6-analysis/graph", getGraphQ6);

router.post("/floating-tip", addTip);
router.get("/floating-tip", getTip);
router.get("/floating-tip/table", getTipTable);

const ky = require("./ky.route");
const fs = require("fs");

router.use("/ky", ky);

router.get("/download-report", async (req, res) => {
    try {
        const ExcelJS = require("exceljs");
        const XLSXChart = require("xlsx-chart");
        const moment = require("moment");

        var fs = require("fs");
        const {fid} = req.query;
        // check availablity report
        // no, get template, get db data insert into excel
        // yes, fetch report /<fid>_<problem>/<machine>_<problem>.xlsx

        let responseData = await cmdMultipleQuery(
            `select * from v_current_error_2 where fid = ${fid}`
        );
        let uraianData = await cmdMultipleQuery(
            `select * from tb_r_uraian where error_id = ${fid}`
        );
        const workbook = new ExcelJS.Workbook();
        const wb = await workbook.xlsx.readFile(
            "./reports/template/clone_draft_ltb.xlsx"
        );

        const worksheet = wb.worksheets[0];

        const problemData = await responseData[0];
<<<<<<< HEAD
        console.log(problemData[0]);
        console.log(uraianData[0]);
=======
>>>>>>> 0ec2b59d9e535280f62feff524a86129b42e8d5f
        if (!problemData.file_report) {
            // ---HEADER---
            // F12 = tanggal
            const F12 = worksheet.getCell("F12");
            // H12 = bulan
            const H12 = worksheet.getCell("H12");
            // J12 = tahun
            const J12 = worksheet.getCell("J12");
            // L12 = shift
            const L12 = worksheet.getCell("L12");
            // M12 = time start
            const M12 = worksheet.getCell("M12");
            // O12 = time end
            const O12 = worksheet.getCell("O12");
            // Q12 = duration
            const Q12 = worksheet.getCell("Q12");
            // S11 = descproblem
            const S11 = worksheet.getCell("S11");
            // BO10 = line
            const BO10 = worksheet.getCell("BO10");
            // BO11 = machine
            const BO11 = worksheet.getCell("BO11");
            // CH11 = pic
            const CH11 = worksheet.getCell("CH11");
            // CY11 = REPORT NUMBER
            const CY11 = worksheet.getCell("CY11");

            const day = moment(problemData.fstart_time).format("DD");
            const month = moment(problemData.fstart_time).format("MM");
            const year = moment(problemData.fstart_time).format("YYYY");
            const shift = problemData.fshift == "r" ? "RED" : "WHITE";
            const start_time = moment(problemData.fstart_time).format("HH:mm:ss");
            const end_time = moment(problemData.fend_time).format("HH:mm:ss");
            const fdur = `${problemData.fdur}`;
            const ferror_name = problemData.ferror_name;
            const line = problemData.fline;
            const machine = problemData.fmc_name;
            const pic = problemData.foperator;
            const problem_id = problemData.fid;

            F12.value = day;
            H12.value = month;
            J12.value = year;
            L12.value = shift;
            M12.value = start_time;
            O12.value = end_time;
            Q12.value = fdur;
            S11.value = ferror_name;
            BO10.value = line;
            BO11.value = machine;
            CH11.value = pic;
            CY11.value = problem_id;

            // ---3. PROBLEM DESC---
            // C21 = image problem
            if (
                uraianData[0].ilustration &&
                uraianData[0].ilustration != "" &&
                uraianData[0].ilustration != "null" &&
                fs.existsSync(uraianData[0].ilustration)
            ) {
                const chartImageIdGeneral = workbook.addImage({
                    filename: uraianData[0].ilustration,
                    extension: "jpeg",
                });
                const column = "C"; // Specify the column name
                const row = 21; // Specify the row number
                const colIndex = worksheet.getColumn(column).number;
                worksheet.addImage(chartImageIdGeneral, {
                    tl: {col: colIndex, row: row},
                    ext: {width: 280, height: 180},
                });
            }

            // P17 = image standard
            if (
                uraianData[1].ilustration &&
                uraianData[1].ilustration != "" &&
                uraianData[1].ilustration != "null" &&
                fs.existsSync(uraianData[1].ilustration)
            ) {
                const chartImageIdStd = workbook.addImage({
                    filename: uraianData[1].ilustration,
                    extension: "jpeg",
                });
                const P17 = worksheet.getCell("P17");
                const col2 = "P"; // Specify the column name
                const row2 = 17; // Specify the row number
                const colIndex2 = worksheet.getColumn(col2).number;
                worksheet.addImage(chartImageIdStd, {
                    tl: {col: colIndex2, row: row2},
                    ext: {width: 200, height: 150},
                });
            }
            if (
                uraianData[2].ilustration &&
                uraianData[2].ilustration != "" &&
                uraianData[2].ilustration != "null" &&
                fs.existsSync(uraianData[2].ilustration)
            ) {
                const chartImageIdAct = workbook.addImage({
                    filename: uraianData[2].ilustration ?? 'tidak ada gambar',
                    extension: "jpeg",
                });

                // P27 = img actual
                const P27 = worksheet.getCell("P27");
                const col3 = "P"; // Specify the column name
                const row3 = 27; // Specify the row number
                const colIndex3 = worksheet.getColumn(col3).number;

                worksheet.addImage(chartImageIdAct, {
                    tl: {col: colIndex3, row: row3},
                    ext: {width: 200, height: 150},
                });
            }

            // C31 = problem desc
            const C31 = worksheet.getCell("C31");
            C31.value = uraianData[0].desc_nm;
            // L17 = desc standard
            const L17 = worksheet.getCell("L17");
            L17.value =
                uraianData[1].desc_nm == "" ?
                    "<no-description>" :
                    uraianData[1].desc_nm;

            // L27 = desc actual
            const L27 = worksheet.getCell("L27");
            L27.value =
                uraianData[2].desc_nm == "" ?
                    "<no-description>" :
                    uraianData[2].desc_nm;

            // --- 5. STEP REPAIR ---
            // W17-W22 = no (std)
            // X17-X22 = step repair desc (std)
            // AI17-AI22 = step repair time (std)
            // AM17-AM22 = start color background (std)
            // CK17-CK22 = q6 (std)
            // const X17 = worksheet.getCell("X17");
            const jsonStepRepair = JSON.parse(problemData.fstep_new);
            // console.log(jsonStepRepair);
            if (jsonStepRepair.length > 0) {
                let no = 1;
                let idxAct = 0;
                let idxOffsetStd = 10;
                worksheet.getColumn(3);
                // const tstStyle = worksheet.getCell("AM17");

                // tstStyle.style.fill = "#000";
                let containerParent = [];
                let initialDurationIdx = 17;
                for (let i = 17; i < 17 + 6; i++) {
                    let containerChild = [];
                    const element = jsonStepRepair[idxAct];
                    const colNoActPos = worksheet.getCell(`W${i}`);
                    const colDesActPos = worksheet.getCell(`X${i}`);
                    const colTimeActPos = worksheet.getCell(`AI${i}`);
                    const colQ6ActPos = worksheet.getCell(`CK${i}`);
                    colNoActPos.value = no;
                    colDesActPos.value = element.stepDesc;
                    colTimeActPos.value = element.actualTime;
                    colQ6ActPos.value = element.quick6;

                    const rows = worksheet.getRow(i);
                    let offsetCol = 39 + Math.ceil(element.actualTime / 10);
                    // let container = [];
                    containerParent.push(containerChild);
                    // console.log(container);

                    // console.log(rows[0]._cells);

                    // W27-W32 = no (act)
                    // X27-X32 = step repair desc (act)
                    // AI27-AI32 = step repair time (act)
                    // AM27-AM32 = start color background (act)
                    // CK27-CK32 = q6 (act)
                    // const X27 = worksheet.getCell("X27");
                    const staticCols = ["AM", "AN", "AO", "AP", "AQ", "AR", "AS"];
                    const colNoStdPos = worksheet.getCell(`W${i + idxOffsetStd}`);
                    const colDesStdPos = worksheet.getCell(`X${i + idxOffsetStd}`);
                    const colTimeStdPos = worksheet.getCell(`AI${i + idxOffsetStd}`);
                    const colQ6StdPos = worksheet.getCell(`CK${i + idxOffsetStd}`);
                    colNoStdPos.value = no;
                    colDesStdPos.value = element.stepDesc;
                    colTimeStdPos.value = element.idealTime;
                    colQ6StdPos.value = element.quick6;

                    /*for (let j = 0; j < staticCols.length; j++) {
                        const element = `${staticCols[j]}17`;
                        let fillCol = worksheet.getCell(element);
                        fillCol.style.fill = {
                            type: "pattern",
                            pattern: "solid",
                            //fgColor: { argb: "FFFF0000" },
                            fgColor: { argb: "FF1128d6" },
                        };
                    }*/

                    idxAct++;
                    no++;
                    initialDurationIdx++;
                }

                worksheet.getCell("AM17").fill = {
                    type: "pattern",
                    pattern: "solid",
                    //fgColor: { argb: "FFFF0000" },
                    fgColor: { argb: "FF1128d6" },
                    //bgColor: {argb: 'FF1128d6'}
                };

                worksheet.getCell("AQ17").fill = {
                    type: "pattern",
                    pattern: "solid",
                    //fgColor: { argb: "FFFF0000" },
                    fgColor: { argb: "FF1128d6" },
                    //bgColor: {argb: 'FF1128d6'}
                };

                // Grouping steps by quick6
                const groupedSteps = jsonStepRepair.reduce((acc, step) => {
                    if (!acc[step.quick6]) {
                        acc[step.quick6] = [];
                    }
                    acc[step.quick6].push(step);
                    return acc;
                }, {});

                // Calculate the highest gap for each group
                const groupsWithHighestGap = Object.keys(groupedSteps).map((key) => {
                    const group = groupedSteps[key];
                    const highestGap = Math.max(
                        ...group.map((step) => step.actualTime - step.idealTime)
                    );
                    return {quick6: key, steps: group, highestGap: highestGap};
                });

                // Sort groups by highest gap in descending order
                let sortedStep = groupsWithHighestGap.sort(
                    (a, b) => b.highestGap - a.highestGap
                );
                if (sortedStep.length > 0) {
                    let findHigh = q6.find(
                        (item) => item.category === sortedStep[0].quick6
                    );
                    worksheet.getCell(
                        "CN24"
                    ).value = `${findHigh.category} = ${findHigh.description}`;
                }
            }

            let dataAnalysis = await cmdMultipleQuery(
                `SELECT * FROM o_analisys WHERE id_problem = ${problem_id}`
            );
            console.log(dataAnalysis);

            const whyTerjadi =
                dataAnalysis[0].json_string != "" ?
                    await JSON.parse(dataAnalysis[0].json_string) :
                    [];

            const whyLama =
                dataAnalysis.length > 1 ?
                    dataAnalysis[1].json_string != "" ?
                        await JSON.parse(dataAnalysis[1].json_string) :
                        [] :
                    [];
            // console.log(whyTerjadi);
            // console.log(whyLama);
            // E36, E39, E42, E45, E48  = WHY ANALYSSIS
            const containerWhyCols = ["E36", "E39", "E42", "E45", "E48"];
            const flattenTerjadi = flattenArray(whyTerjadi);
            flattenTerjadi.map((item, i) => {
                worksheet.getCell(containerWhyCols[i]).value = item.name;
            });
            // why1_img
            const why1_img = problemData.why1_img;

            if (isNotEmpty(why1_img) && fs.existsSync(why1_img)) {
                let col1 = "M"; // Specify the column name
                let row1 = 36; // Specify the row number
                let colIndex1 = worksheet.getColumn(col1).number;
                let imageSave = workbook.addImage({
                    filename: why1_img ?? 'tidak ada gambar',
                    extension: "jpeg",
                });

                worksheet.addImage(imageSave, {
                    tl: {col: colIndex1, row: row1},
                    ext: {width: 250, height: 200},
                });
            }

            const containerLamaCols = ["W36", "W38", "E40", "E42", "E44"];
            const flattenLama = flattenArray(whyLama);
            flattenLama.map((item, i) => {
                worksheet.getCell(containerLamaCols[i]).value = item.name;
            });
            const why12_img = problemData.why12_img;
            const why22_img = problemData.why22_img;

            if (isNotEmpty(why1_img) && fs.existsSync(why1_img)) {
                let col1 = "M"; // Specify the column name
                let row1 = 36; // Specify the row number
                let colIndex1 = worksheet.getColumn(col1).number;
                let imageSave = workbook.addImage({
                    filename: why1_img ?? 'tidak ada gambar',
                    extension: "jpeg",
                });
                worksheet.addImage(imageSave, {
                    tl: {col: colIndex1, row: row1},
                    ext: {width: 250, height: 200},
                });
            }

            if (isNotEmpty(why12_img) && fs.existsSync(why12_img)) {
                let col1 = "AM"; // Specify the column name
                let row1 = 36; // Specify the row number
                let colIndex1 = worksheet.getColumn(col1).number;
                let imageSave = workbook.addImage({
<<<<<<< HEAD
                    filename: why1_img ?? 'tidak ada gambar',
=======
                    filename: why12_img,
>>>>>>> 0ec2b59d9e535280f62feff524a86129b42e8d5f
                    extension: "jpeg",
                });
                worksheet.addImage(imageSave, {
                    tl: {col: colIndex1, row: row1},
                    ext: {width: 250, height: 200},
                });
            }

            if (isNotEmpty(why22_img) && fs.existsSync(why22_img)) {
                let col1 = "BR"; // Specify the column name
                let row1 = 36; // Specify the row number
                let colIndex1 = worksheet.getColumn(col1).number;
                let imageSave = workbook.addImage({
                    filename: why1_img ?? 'tidak ada gambar',
                    extension: "jpeg",
                });
                worksheet.addImage(imageSave, {
                    tl: {col: colIndex1, row: row1},
                    ext: {width: 250, height: 200},
                });
            }
            let cm_lama = isNotEmpty(problemData.fpermanet_cm_lama) ?
                JSON.parse(problemData.fpermanet_cm_lama) :
                [];
            let cm_terjadi = isNotEmpty(problemData.fpermanet_cm) ?
                JSON.parse(problemData.fpermanet_cm) :
                [];
            let countermeasure = cm_terjadi.concat(cm_lama).splice(0, 5);
            console.log("countermeasure");
            console.log(countermeasure);
            const containerCmColNo = ["W47", "W48", "W49", "W50"];
            const containerCmColDesc = ["X47", "X48", "X49", "X50"];
            const containerCmColCat = ["AL47", "AL48", "AL49", "AL50"];
            const containerCmColPic = ["AY47", "AY48", "AY49", "AY50"];
            const containerCmColDate = ["BO47", "BO48", "BO49", "BO50"];
            const containerCmColJudg = ["BX47", "BX48", "BX49", "BX50"];
            if (countermeasure.length > 0) {
                countermeasure.map((item, i) => {
                    worksheet.getCell(containerCmColNo[i]).value = i + 1;
                    worksheet.getCell(containerCmColDesc[i]).value = item.cmDesc;
                    worksheet.getCell(containerCmColCat[i]).value = item.cmCategory;
                    worksheet.getCell(containerCmColPic[i]).value = item.pic;
                    worksheet.getCell(containerCmColDate[i]).value = item.datePlan;
                    worksheet.getCell(containerCmColJudg[i]).value = item.judg ?
                        "OK" :
                        "Not Yet";
                });
            }
            const containerYokoColMc = ["CD47", "CD49"];
            const containerYokoColPic = ["CO47", "CO49"];
            const containerYokoColDate = ["DD47", "DD49"];
            const containerYokoColJudg = ["DJ47", "CJ49"];
            let yokoten = isNotEmpty(problemData.fyokoten) ?
                JSON.parse(problemData.fyokoten) :
                [];
            console.log(yokoten);
            if (yokoten.length > 0) {
                yokoten.map((item, i) => {
                    worksheet.getCell(containerYokoColMc[i]).value = item.machine;
                    worksheet.getCell(containerYokoColPic[i]).value = item.pic;
                    worksheet.getCell(containerYokoColDate[i]).value = item.datePlan;
                    worksheet.getCell(containerYokoColJudg[i]).value = item.judg ?
                        "OK" :
                        "Not Yet";
                });
            }

            var dirFile = `./reports/ltb/${problemData.fid}_${problemData.ferror_name}`;

            if (!fs.existsSync(dirFile)) {
                fs.mkdirSync(dirFile);
            }

            const fullPath = `${dirFile}/${problemData.ferror_name}.xlsx`;
            await workbook.xlsx.writeFile(fullPath);
            // res.status(200).json({
            //     responseData,
            // });
            // res.sendFile(`../../reports/ltb/${problemData.ferror_name}.xlsx`);
            res.download(fullPath);
        } else {
            console.log(problemData.file_report);
            res.download(problemData.file_report);
        }
    } catch (error) {
        console.log(error);
        res.send(
            'File Belum Lengkap! <a href="https:smartandonsys.web.app/problemHistory">Back</a>'
        );
        // res.status(401).json({
        //     error,
        // });
    }
});
router.put(
    "/upload-report",
    uploadFileReport.single("file"),
    async (req, res) => {
        try {
            // console.log("req.file");
            // console.log(req.file);
            // WILL DEELTE FILE IN THE FUTURE
            let path = `${req.file.destination}${req.file.filename}`;
            console.log(req.file);
            let q = `UPDATE tb_error_log_2 SET file_report = '${path}' WHERE fid = ${req.body.fid}`;
            console.log(q);
            await cmdMultipleQuery(q);
            res.status(201).json({
                message: "success to upload",
            });
            // upload file
            // ./reports/ltb/${fid}_${error_name}/${error_name}.xlsx
            // update column on database
        } catch (error) {
            res.status(500).json({
                error,
            });
        }
    }
);

router.use("/master", problemRoute);

module.exports = router;