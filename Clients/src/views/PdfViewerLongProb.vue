<template>
  <div
    class="container-fluid p-0 text-dark"
    style="margin-bottom: 130px; font-weight: bold"
  >
    <div class="row m-0 p-0" ref="content">
      <div class="col-12 p-0">
        <div class="container-fluid p-0 m-0">
          <!-- HEADER TITLE -->
          <div class="row m-0 text-center">
            <div class="col-3 p-0 border" style="padding-top: 30px !important">
              <h4 class="text-danger m-0">TMMIN</h4>
              <h4 style="font-size: 12px">
                PLANT 3 ENGINE PRODUCTION KARAWANG DIVISION
              </h4>
              <h4 class="text-primary" style="font-size: 12px">
                MAINTENANCE DEPARTEMENT
              </h4>
            </div>
            <div
              class="col p-0 border d-flex align-items-center justify-content-center"
              style="vertical-align: middle"
            >
              <h4 class="text-primary" style="font-size: 20px">
                Long Time Breakdown & Recurrence Prevention Report
              </h4>
            </div>
            <div class="col p-0 border" style="max-height: 140px">
              <table class="table table-bordered">
                <thead>
                  <tr>
                    <td style="width: 70px" rowspan="3">Action</td>
                    <td style="width: 70px">D/H</td>
                    <td style="width: 70px">S/H Staff</td>
                    <td style="width: 70px">S/H Op</td>
                    <td style="width: 70px">Staff</td>
                    <td style="width: 70px">GL</td>
                    <td style="width: 70px">TL</td>
                  </tr>
                  <tr>
                    <td style="height: 30px"></td>
                    <td rowspan="3"></td>
                    <td rowspan="3"></td>
                    <td rowspan="3"></td>
                    <td rowspan="3"></td>
                    <td rowspan="3"></td>
                  </tr>
                  <tr>
                    <td style="height: 25px"></td>
                  </tr>
                  <tr>
                    <td style="width: 70px" rowspan="2">Countermeasure</td>
                    <td style="height: 35px"></td>
                  </tr>
                  <tr>
                    <td style="height: 25px"></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                </thead>
              </table>
            </div>
          </div>
          <!-- 1. KEJADIAN &  2. PROBLEM -->
          <div class="row m-0">
            <div class="col-12 p-0">
              <table class="table table-bordered">
                <thead class="text-center">
                  <tr>
                    <td class="bg-success" rowspan="3">1. Kejadian</td>
                    <td colspan="7">Breakdown Start</td>
                    <td class="bg-success text-left px-2" rowspan="3">
                      2. Problem <br />
                      <b style="font-size: 20px">{{ ferror_name }}</b>
                    </td>
                    <td>Line</td>
                    <td>LP</td>
                    <td>PIC</td>
                    <td>Report Number</td>
                  </tr>
                  <tr>
                    <td>Tanggal</td>
                    <td>Bulan</td>
                    <td>Tahun</td>
                    <td>Shift</td>
                    <td>Start</td>
                    <td>Finish</td>
                    <td>B/D Dura</td>

                    <td>Mesin</td>
                    <td>{{ fmc_name }}</td>
                    <td rowspan="2">{{ foperator }}</td>
                    <td rowspan="2" style="font-size: 15px; font-weight: bold">
                      {{ fid }}
                    </td>
                  </tr>
                  <tr>
                    <td>{{ startDate.split("-")[2] }}</td>
                    <td>{{ startDate.split("-")[1] }}</td>
                    <td>{{ startDate.split("-")[0] }}</td>
                    <td>{{ fshift }}</td>
                    <td>{{ startTime }}</td>
                    <td>{{ endTime }}</td>
                    <td>{{ fdur }}</td>

                    <td>Nama Part</td>
                    <td>{{ fpart_change }}</td>
                  </tr>
                </thead>
              </table>
            </div>
          </div>
          <div class="row m-0">
            <div class="col-12 p-0">
              <table class="table table-bordered">
                <thead>
                  <tr style="height: 30px">
                    <td class="bg-success" colspan="2" style="width: 50%">
                      3. PROBLEM DESCRIPTION
                    </td>
                    <td class="bg-success" style="width: 50%">
                      5.STEP REPAIR ( Micro Analysis )
                    </td>
                  </tr>
                  <tr>
                    <td style="height: 400px"></td>
                    <td style="height: 400px"></td>
                    <td class="p-0" style="vertical-align: baseline !important">
                      <!-- ACTUAL -->
                      <table class="table table-bordered">
                        <thead>
                          <tr class="text-center">
                            <td rowspan="2" style="width: 10px">No</td>
                            <td rowspan="2">Step Repair (Actual)</td>
                            <td rowspan="2" style="width: 20px">Work Time</td>
                            <td colspan="5">Menit</td>
                            <td rowspan="2" style="width: 20px">Q 6</td>
                            <td rowspan="9" style="width: 120px"></td>
                          </tr>
                          <!-- MENIT -->
                          <tr>
                            <td style="width: 15px; height: 15px"></td>
                            <td style="width: 15px; height: 15px"></td>
                            <td style="width: 15px; height: 15px"></td>
                            <td style="width: 15px; height: 15px"></td>
                            <td style="width: 15px; height: 15px"></td>
                          </tr>
                          <!-- STEP -->
                          <tr
                            v-for="(stepRepair, i) in containerStepRepair"
                            :key="stepRepair"
                          >
                            <td class="text-center" v-if="i < 7">
                              {{ i + 1 }}
                            </td>
                            <td
                              style="width: 200px"
                              v-if="i < 7"
                              class="text-left"
                            >
                              {{ stepRepair }}
                            </td>
                            <td v-if="i < 7"></td>
                            <td v-if="i < 7"></td>
                            <td v-if="i < 7"></td>
                            <td v-if="i < 7"></td>
                            <td v-if="i < 7"></td>
                            <td v-if="i < 7"></td>
                            <td v-if="i < 7"></td>
                          </tr>
                          <tr>
                            <td colspan="2">Total Time</td>
                            <td></td>
                          </tr>
                        </thead>
                      </table>
                      <!-- IDEAL -->
                      <table class="table table-bordered">
                        <thead>
                          <tr class="text-center">
                            <td rowspan="2" style="width: 10px">No</td>
                            <td rowspan="2">Step Repair (Ideal)</td>
                            <td rowspan="2" style="width: 20px">Work Time</td>
                            <td colspan="5">Menit</td>
                            <td rowspan="2" style="width: 20px">Q 6</td>
                            <td rowspan="9" style="width: 120px"></td>
                          </tr>
                          <!-- MENIT -->
                          <tr>
                            <td style="width: 15px; height: 15px"></td>
                            <td style="width: 15px; height: 15px"></td>
                            <td style="width: 15px; height: 15px"></td>
                            <td style="width: 15px; height: 15px"></td>
                            <td style="width: 15px; height: 15px"></td>
                          </tr>
                          <!-- STEP -->
                          <tr
                            v-for="(stepRepair, i) in containerStepRepair"
                            :key="stepRepair"
                          >
                            <td class="text-center">{{ i + 1 }}</td>
                            <td class="text-left" style="width: 200px"></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                          </tr>
                          <tr>
                            <td colspan="2">Total Time</td>
                            <td></td>
                          </tr>
                        </thead>
                      </table>
                    </td>
                  </tr>
                </thead>
              </table>
            </div>
          </div>
          <div class="row m-0">
            <div class="col-12 p-0">
              <table class="table table-bordered">
                <thead>
                  <tr style="height: 30px">
                    <!-- TABLE WHY TERJADI -->
                    <td class="bg-success" style="width: 50%">
                      <tr>
                        <td>4. KENAPA TERJADI (5W Analysis)</td>
                        <td class="text-center">
                          <tr>
                            <td>PIC</td>
                            <td style="width: 100px"></td>
                            <td style="width: 100px"></td>
                            <td style="width: 100px"></td>
                            <td style="width: 100px"></td>
                            <td style="width: 100px"></td>
                          </tr>
                          <tr>
                            <td>Bagian</td>
                            <td>MT</td>
                            <td>E/S</td>
                            <td>QC</td>
                            <td>PROD</td>
                            <td>ESCO</td>
                          </tr>
                        </td>
                      </tr>
                    </td>
                    <td class="bg-success" style="width: 50%" colspan="2">
                      6. KENAPA LAMA ( 5W Analysis )
                    </td>
                  </tr>
                  <tr>
                    <!-- KENAPA TERJADI -->
                    <td
                      style="
                        height: 300px;
                        vertical-align: baseline !important;
                        margin-top: 10px !important;
                      "
                      rowspan="3"
                      v-if="containerWhyTerjadi.length !== 0"
                    >
                      <div
                        v-for="(whyTerjadi, i) in containerWhyTerjadi"
                        :key="whyTerjadi.machine"
                      >
                        <tr>
                          <td
                            class="text-center"
                            style="height: 20px; width: 300px"
                          >
                            {{ whyTerjadi }}
                          </td>
                        </tr>
                        <tr v-if="i < containerWhyTerjadi.length - 1">
                          <td class="text-center" style="border: none">
                            <i class="fa fa-arrow-down"></i>
                          </td>
                        </tr>
                      </div>
                    </td>
                    <td
                      class="text-danger"
                      style="
                        height: 300px;
                        vertical-align: baseline !important;
                        margin-top: 10px !important;
                      "
                      rowspan="3"
                      v-else
                    >
                      Analisys kenapa Terjadi Belum Di isi
                    </td>
                    <!-- KENAPA LAMA -->
                    <td
                      style="vertical-align: baseline !important"
                      colspan="2"
                      v-if="containerWhyLama.length !== 0"
                    >
                      <div
                        v-for="(whyLama, i) in containerWhyLama"
                        :key="whyLama.machine"
                      >
                        <tr>
                          <td
                            class="text-center"
                            style="height: 20px; width: 300px"
                          >
                            {{ whyLama }}
                          </td>
                        </tr>
                        <tr v-if="i < containerWhyLama.length - 1">
                          <td class="text-center" style="border: none">
                            <i class="fa fa-arrow-down"></i>
                          </td>
                        </tr>
                      </div>
                    </td>
                    <td
                      class="text-danger"
                      style="vertical-align: baseline !important"
                      colspan="2"
                      v-else
                    >
                      Analisys kenapa Lama Belum Di isi
                    </td>
                  </tr>
                  <tr>
                    <td class="bg-success">7. COUNTER MEASURE</td>
                    <td class="bg-success">8. YOKOTEN COUNTERMEASURE 1</td>
                  </tr>
                  <tr>
                    <!-- TABLE CM -->
                    <td style="vertical-align: baseline !important">
                      <tr class="text-center">
                        <td style="width: 10px">No</td>
                        <td style="width: 200px">Countermeasure</td>
                        <td>C/M Category</td>
                        <td>PIC</td>
                        <td>Bagian</td>
                        <td>Kapan</td>
                        <td>Judg</td>
                      </tr>
                      <tr
                        v-for="(cmTerjadi, i) in containerCmTerjadi"
                        :key="cmTerjadi.cmDesc"
                      >
                        <td>{{ i + 1 }}</td>
                        <td>{{ cmTerjadi.cmDesc }}</td>
                        <td></td>
                        <td>{{ cmTerjadi.pic }}</td>
                        <td>MT</td>
                        <td>{{ cmTerjadi.datePlan }}</td>
                        <td v-if="cmTerjadi.judg" class="text-success">
                          {{ "OK" }}
                        </td>
                        <td v-else class="text-danger">{{ "Belum" }}</td>
                      </tr>
                      <tr v-if="containerCmTerjadi.length === 0">
                        <td
                          class="text-danger text-center"
                          style="
                            vertical-align: baseline !important;
                            border: none;
                          "
                          colspan="2"
                        >
                          Countermeasure Belum di isi
                        </td>
                      </tr>
                    </td>
                    <!-- TABLE YOKO -->
                    <td style="vertical-align: baseline !important">
                      <tr>
                        <td>Machine</td>
                        <td>PIC</td>
                        <td>Bagian</td>
                        <td>Kapan</td>
                        <td>Judg</td>
                      </tr>
                      <div v-if="containerYokoten.length !== 0">
                        <tr v-for="yokoten in containerYokoten" :key="yokoten">
                          <td>{{ yokoten.machine }}</td>
                          <td>{{ yokoten.pic }}</td>
                          <td>MT</td>
                          <td>{{ yokoten.datePlan }}</td>
                          <td v-if="yokoten.judg" class="text-success">
                            {{ "OK" }}
                          </td>
                          <td v-else class="text-danger">{{ "Belum" }}</td>
                        </tr>
                      </div>
                      <div v-else>
                        <tr>
                          <td
                            class="text-danger text-center"
                            style="
                              vertical-align: baseline !important;
                              border: none;
                            "
                            colspan="2"
                          >
                            Yokoten Tidak Ada
                          </td>
                        </tr>
                      </div>
                    </td>
                  </tr>
                </thead>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row m-0" style="position: absolute; top: 20px">
      <div class="col-12 p-0">
        <button class="btn btn-primary" @click="exportToPDF()">Export</button>
      </div>
    </div>
    <div class="row m-0">
      <div class="col-12 p-0">
        <v-dialog v-model="dialogLoading" hide-overlay persistent width="300">
          <v-card color="primary" dark>
            <v-card-text>
              Downloading Pdf File
              <v-progress-linear
                indeterminate
                color="white"
                class="mb-0"
              ></v-progress-linear>
            </v-card-text>
          </v-card>
        </v-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import html2pdf from "html2pdf.js";
import axios from "axios";
export default {
  name: "PdfViewerSmallProb",
  data() {
    return {
      fpart_change: "",
      fmc_name: "",
      fline: "",
      foperation_no: "",
      fmaker: "",
      ferror_name: "",
      foperator: "",
      isLoading: false,
      fshift: "",
      fav_categoty: "",
      startDate: "",
      endDate: "",
      startTime: "",
      endTime: "",
      fdur: "",
      fDescImage: "",
      isLongBd: false,
      url: null,
      containerWhyTerjadi: [],
      containerWhyLama: [],
      containerStepRepair: [],
      containerCmTerjadi: [],
      containerCmLama: [],
      containerYokoten: [],
      fid: "",
      dialogLoading: false,
    };
  },
  methods: {
    exportToPDF(nameFile) {
      html2pdf(this.$refs.content, {
        margin: 1,
        filename: nameFile,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { dpi: 192, letterRendering: true },
        jsPDF: { unit: "pt", format: "a3", orientation: "l" },
      }).then((pdf) => {
        console.log(pdf);
        this.$router.go(-1);
        this.dialogLoading = false;
      });
    },
  },
  mounted() {
    this.isLoading = true;
    this.dialogLoading = true;
    // console.log(this.$route.query.v_);
    axios
      .get(
        `${process.env.VUE_APP_HOST}/getDetailProblem?v_=${this.$route.query.v_}`
      )
      .then((result) => {
        this.isLoading = false;
        this.fid = result.data.data[0].fid;
        this.fmc_name = result.data.data[0].fmc_name;
        this.fline = result.data.data[0].fline;
        this.foperation_no = result.data.data[0].foperation_no;
        this.fmaker = result.data.data[0].fmaker;
        this.ferror_name = result.data.data[0].ferror_name;
        this.foperator = result.data.data[0].foperator;
        this.fshift = result.data.data[0].fshift;
        this.fav_categoty = result.data.data[0].fav_categoty;
        this.startDate = result.data.data[0].fstart_time.split("T")[0];
        this.startTime = result.data.data[0].fstart_time
          .split("T")[1]
          .split(".")[0];
        this.endDate = result.data.data[0].fend_time.split("T")[0];
        this.endTime = result.data.data[0].fend_time
          .split("T")[1]
          .split(".")[0];
        this.fdur = result.data.data[0].fdur;
        this.fDescImage = result.data.data[0].fDescImage;
        if (result.data.data[0].fstep_repair.includes("\n")) {
          this.containerStepRepair = result.data.data[0].fstep_repair.split(
            "\n"
          );
        }
        if (result.data.data[0].freal_prob.includes("\n")) {
          this.containerWhyTerjadi = result.data.data[0].freal_prob.split("\n");
        }
        if (result.data.data[0].froot_cause.includes("\n")) {
          this.containerWhyLama = result.data.data[0].froot_cause.split("\n");
        }
        this.fpart_change = result.data.data[0].fpart_change;
        if (result.data.data[0].fpermanet_cm.includes("[{")) {
          this.containerCmTerjadi = JSON.parse(
            result.data.data[0].fpermanet_cm
          );
        }
        if (result.data.data[0].fyokoten.includes("[{")) {
          this.containerYokoten = JSON.parse(result.data.data[0].fyokoten);
          //   [{"machine":"IMZY-0222","datePlan":"2021-01-29","pic":"Didi","judg":false}]
        }
        if (result.data.data[0].fpermanet_cm_lama.includes("[{")) {
          this.containerCmLama = JSON.parse(
            result.data.data[0].fpermanet_cm_lama
          );
        }
        // this.dialogLoading = false;
        this.exportToPDF(`${this.ferror_name}_${this.fmc_name}.pdf`);
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>

<style scoped>
/* div {
    vertical-align: middle;
} */
.bg-success {
  background-color: #d7fdd0 !important;
}
</style>