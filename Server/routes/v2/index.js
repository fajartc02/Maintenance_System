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
const moment = require("moment/moment");
const {data} = require("express-session/session/cookie");
const ExcelJS = require("exceljs");

//region exceljs
const mappedImageFile = async (res, problemData, uraianData, generatedExcelPath) => {
    const workbook = new ExcelJS.Workbook();
    const wb = await workbook.xlsx.readFile(generatedExcelPath);
    const worksheet = wb.worksheets[0];

    // ---3. PROBLEM DESC---
    // C21 = image problem
    if (
        uraianData.length >= 1 &&
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
        uraianData.length >= 2 &&
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
        uraianData.length >= 3 &&
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
                filename: why12_img,
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
                filename: why22_img ?? 'tidak ada gambar',
                extension: "jpeg",
            });
            worksheet.addImage(imageSave, {
                tl: {col: colIndex1, row: row1},
                ext: {width: 250, height: 200},
            });
        }
    }

    await workbook.xlsx.writeFile(generatedExcelPath);
    res.download(generatedExcelPath);
}
//endregion

const filledColor = [];
const generateCellDuration = (sheet, duration, startColumn = "AM", startRow = 17) => {
    const totalCell = duration / 10;

    const columnToIndex = (column) => {
        let sum = 0;
        for (let i = 0; i < column.length; i++) {
            sum *= 26;
            sum += column.charCodeAt(i) - 'A'.charCodeAt(0) + 1;
        }
        return sum;
    }

    const indexToColumn = (index) => {
        let column = '';
        while (index > 0) {
            let mod = (index - 1) % 26;
            column = String.fromCharCode(65 + mod) + column;
            index = Math.floor((index - 1) / 26);
        }
        return column;
    }

    let startColumnIndex = columnToIndex(startColumn);

    for (let i = 0; i < totalCell; i++) {
        if (i > 49) {
            break;
        }

        let currentColumnIndex = startColumnIndex + i;
        let currentColumn = indexToColumn(currentColumnIndex);

        if (filledColor.includes(`${currentColumn}${startRow}`)) {
            continue;
        }

        sheet.cell(`${currentColumn}${startRow}`)
            //.value("")
            .style({
                fill: {
                    type: 'pattern',
                    pattern: 'darkDown',
                    foreground: {
                        rgb: '0000FF',
                    },
                    background: {
                        theme: 3,
                        tint: 0.4,
                    },
                }
            });

        filledColor.push(`${currentColumn}${startRow}`);
    }
}

//region generated using xlsx-populate
const generatedStepRepairCellDuration = async (res, problemData, uraianData, fullPath) => {
    const XLSXPopulate = require('xlsx-populate');
    const workbook = await XLSXPopulate.fromFileAsync(fullPath);
    const sheet = workbook.sheet(0); // Mengakses sheet pertama
    const startTime = moment(problemData.fstart_time);
    const endTime = moment(problemData.fend_time);

    sheet.cell("F12").value(startTime.format("DD"));
    sheet.cell("H12").value(startTime.format("MM"));
    sheet.cell("J12").value(startTime.format("MM"));
    sheet.cell("L12").value(problemData.fshift == "r" ? "RED" : "WHITE");
    sheet.cell("M12").value(startTime.format("HH:mm:ss"));
    sheet.cell("O12").value(endTime.format("HH:mm:ss"));
    sheet.cell("Q12").value(`${problemData.fdur}`);
    sheet.cell("S11").value(problemData.ferror_name);
    sheet.cell("BO10").value(problemData.fline);
    sheet.cell("BO11").value(problemData.fmc_name);
    sheet.cell("CH11").value(problemData.foperator);
    sheet.cell("CY11").value(problemData.fid);


    sheet.cell("C31").value(uraianData.length ? uraianData[0].desc_nm : "");
    sheet.cell("L17").value(
        uraianData.length >= 1 && !uraianData[1].desc_nm
            ? "<no-description>"
            : uraianData[1].desc_nm
    );
    sheet.cell("L27").value(
        uraianData.length >= 2 && !uraianData[2].desc_nm
            ? "<no-description>"
            : uraianData[2].desc_nm
    );

    const jsonStepRepair = JSON.parse(problemData.fstep_new);
    if (jsonStepRepair.length > 0) {
        let no = 1;
        let idxAct = 0;
        let idxOffsetStd = 10;
        // const tstStyle = worksheet.getCell("AM17");

        // tstStyle.style.fill = "#000";
        let initialDurationIdx = 17;
        const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        for (let i = 17; i < 17 + 6; i++) {
            const element = jsonStepRepair[idxAct];
            sheet.cell(`W${i}`).value(no);
            sheet.cell(`X${i}`).value(element.stepDesc);
            sheet.cell(`AI${i}`).value(element.actualTime);
            sheet.cell(`CK${i}`).value(element.quick6);
            // console.log(container);


            // console.log(rows[0]._cells);

            // W27-W32 = no (act)
            // X27-X32 = step repair desc (act)
            // AI27-AI32 = step repair time (act)
            // AM27-AM32 = start color background (act)
            // CK27-CK32 = q6 (act)
            // const X27 = worksheet.getCell("X27");

            sheet.cell(`W${i + idxOffsetStd}`).value(no);
            sheet.cell(`X${i + idxOffsetStd}`).value(element.stepDesc);
            sheet.cell(`AI${i + idxOffsetStd}`).value(element.idealTime);
            sheet.cell(`CK${i + idxOffsetStd}`).value(element.quick6);

            generateCellDuration(sheet, element.actualTime, "AM", i);
            generateCellDuration(sheet, element.idealTime, "AM", i + idxOffsetStd);

            idxAct++;
            no++;
            initialDurationIdx++;
        }

        /*  sheet.cell(`AM17`)
              //.value("")
              .style({
                  fill: {
                      type: 'pattern',
                      pattern: 'darkDown',
                      foreground: {
                          rgb: '0000FF',
                      },
                      background: {
                          theme: 3,
                          tint: 0.4,
                      },
                  }
              });*/

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

            if (findHigh) {
                sheet.cell("CN24").value(`${findHigh.category} = ${findHigh.description}`);
            }
        }
    }

    let dataAnalysis = await cmdMultipleQuery(
        `SELECT * FROM o_analisys WHERE id_problem = ${problemData.fid}`
    );
    console.log(dataAnalysis);

    const whyTerjadi =
        dataAnalysis.length && dataAnalysis[0].json_string != "" ?
            await JSON.parse(dataAnalysis[0].json_string) :
            [];

    const whyLama =
        dataAnalysis.length > 1 ?
            dataAnalysis[1].json_string != "" ?
                await JSON.parse(dataAnalysis[1].json_string) :
                [] :
            [];

    const containerWhyCols = ["E36", "E39", "E42", "E45", "E48"];
    const flattenTerjadi = flattenArray(whyTerjadi);
    flattenTerjadi.map((item, i) => {
        if (containerWhyCols[i]) {
            sheet.cell(containerWhyCols[i]).value(item.name);
        }
    });

    const containerLamaCols = ["W36", "W38", "E40", "E42", "E44"];
    const flattenLama = flattenArray(whyLama);
    flattenLama.map((item, i) => {
        if (containerLamaCols[i]) {
            sheet.cell(containerLamaCols[i]).value(item.name);
        }
    });

    let cm_lama = isNotEmpty(problemData.fpermanet_cm_lama) ?
        JSON.parse(problemData.fpermanet_cm_lama) :
        [];
    let cm_terjadi = isNotEmpty(problemData.fpermanet_cm) ?
        JSON.parse(problemData.fpermanet_cm) :
        [];

    let countermeasure = cm_terjadi && cm_lama ? cm_terjadi.concat(cm_lama).splice(0, 5) : null;
    console.log("countermeasure");
    console.log(countermeasure);

    //region countermeasure
    {
        const containerCmColNo = ["W47", "W48", "W49", "W50"];
        const containerCmColDesc = ["X47", "X48", "X49", "X50"];
        const containerCmColCat = ["AL47", "AL48", "AL49", "AL50"];
        const containerCmColPic = ["AY47", "AY48", "AY49", "AY50"];
        const containerCmColDate = ["BO47", "BO48", "BO49", "BO50"];
        const containerCmColJudg = ["BX47", "BX48", "BX49", "BX50"];
        if (countermeasure.length > 0) {
            countermeasure.map((item, i) => {
                sheet.cell(containerCmColNo[i]).value(i + 1);
                sheet.cell(containerCmColDesc[i]).value(item.cmDesc);
                sheet.cell(containerCmColCat[i]).value(item.cmCategory);
                sheet.cell(containerCmColPic[i]).value(item.pic);
                sheet.cell(containerCmColDate[i]).value(item.datePlan);
                sheet.cell(containerCmColJudg[i]).value(item.judg ?
                    "OK" :
                    "Not Yet")
            });
        }
    }
    //endregion

    //region yokoten
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
            sheet.cell(containerYokoColMc[i]).value(item.machine)
            sheet.cell(containerYokoColPic[i]).value(item.pic)
            sheet.cell(containerYokoColDate[i]).value(item.datePlan)
            sheet.cell(containerYokoColJudg[i]).value(item.judg ? "OK" : "Not Yet")
        });
    }
    //endregion

    let dirFile = `./reports/ltb/${problemData.fid}_${problemData.ferror_name}`;
    if (dirFile.includes(":")) {
        dirFile = dirFile.replace(new RegExp(":", "g"), "_")
    }

    if (!fs.existsSync(dirFile)) {
        fs.mkdirSync(dirFile);
    }

    // remap for image file
    let r = `${dirFile}/${problemData.ferror_name}.xlsx`
    if (r.includes(":")) {
        r = r.replace(new RegExp(":", "g"), "_")
    }

    await workbook.toFileAsync(r);
    return r;

    // direct generate using xlsx-populate
    /*const excel = await workbook.outputAsync();
    res.attachment(`${problemData.ferror_name}.xlsx`);
    res.send(excel);*/
};
//endregion

router.use("/ky", ky);

const fs = require("fs");
const path = require("path");

router.get("/download-report", async (req, res) => {
    try {
        const { fid, problem } = req.query;

        if (!fid || !problem) {
            console.error("Missing fid or problem parameter");
            return res.status(400).send("Missing fid or problem parameter");
        }

        // Query database for file_report path
        const result = await cmdMultipleQuery(
            `SELECT file_report FROM tb_error_log_2 WHERE fid = ${fid} LIMIT 1`
        );

        if (result.length > 0 && result[0].file_report) {
            const filePath = result[0].file_report;
            if (fs.existsSync(filePath)) {
                console.log(`Serving uploaded report file: ${filePath}`);
                return res.download(filePath);
            } else {
                console.error(`Uploaded report file not found on server: ${filePath}`);
                return res.status(404).send("Uploaded report file not found on server");
            }
        } else {
            console.warn(`No file_report entry found in database for fid: ${fid}`);
        }

        // Fallback: serve latest file in folder
        const targetDir = `./reports/ltb/${fid}_${problem}/`;

        if (!fs.existsSync(targetDir)) {
            console.error(`Report folder not found: ${targetDir}`);
            return res.status(404).send("Report folder not found");
        }

        // Read files in the target directory
        const files = fs.readdirSync(targetDir)
            .filter(file => file.endsWith(".xlsx"))
            .map(file => ({
                name: file,
                time: fs.statSync(path.join(targetDir, file)).mtime.getTime()
            }))
            .sort((a, b) => b.time - a.time); // Sort descending by modified time

        if (files.length === 0) {
            console.error(`No report files found in folder: ${targetDir}`);
            return res.status(404).send("No report files found");
        }

        const latestFile = files[0].name;
        const filePath = path.join(targetDir, latestFile);

        console.log(`Serving latest report file from folder: ${filePath}`);
        res.download(filePath, latestFile);

    } catch (error) {
        console.error("Error downloading report:", error);
        res.status(500).send("Error downloading report");
    }
});

const fs = require("fs");
const path = require("path");

router.put(
    "/upload-report",
    uploadFileReport.single("file"),
    async (req, res) => {
        try {
            const oldPath = req.file.path;
            const targetDir = `./Uploads/ltb/${req.body.fid}_${req.body.problem}/`;
            if (!fs.existsSync(targetDir)) {
                fs.mkdirSync(targetDir, { recursive: true });
            }

            // Generate unique filename with timestamp
            const timestamp = Date.now();
            const uniqueFileName = `${req.body.problem}_${timestamp}.xlsx`;
            const targetPath = path.join(targetDir, uniqueFileName);

            fs.renameSync(oldPath, targetPath);

            // Update database with the new file path
            let q = `UPDATE tb_error_log_2 SET file_report = '${targetPath}' WHERE fid = ${req.body.fid}`;
            console.log("New file path:", targetDir);
            console.log(q);
            await cmdMultipleQuery(q);

            res.status(201).json({
                message: "success to upload 1",
                filePath: targetPath,
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                error,
            });
        }
    }
);

router.get("/download-template", async (req, res) => {
    try {
        const { fid } = req.query;

        if (!fid) {
            return res.status(400).send("Missing fid parameter");
        }

        // Query database for problem data and uraian data
        const problemDataResult = await cmdMultipleQuery(
            `SELECT * FROM tb_error_log_2 WHERE fid = ${fid} LIMIT 1`
        );

        if (problemDataResult.length === 0) {
            return res.status(404).send("Problem data not found");
        }

        const problemData = problemDataResult[0];

        const uraianData = await cmdMultipleQuery(
            `SELECT * FROM tb_uraian WHERE fid = ${fid} ORDER BY id_uraian ASC`
        );

        // Generate the Excel template file path
        const dirFile = `./reports/template/${fid}_${problemData.ferror_name}`;
        if (!fs.existsSync(dirFile)) {
            fs.mkdirSync(dirFile, { recursive: true });
        }
        const generatedExcelPath = `${dirFile}/${problemData.ferror_name}_template.xlsx`;

        // Use existing function to generate the Excel file with images and data
        await mappedImageFile(res, problemData, uraianData, generatedExcelPath);

        // The mappedImageFile function calls res.download internally, so no need to call res.download here again

    } catch (error) {
        console.error(error);
        res.status(500).send("Error generating template");
    }
});

router.use("/master", problemRoute);

module.exports = router;
