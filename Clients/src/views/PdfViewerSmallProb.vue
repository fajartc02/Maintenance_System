<template>
  <div class="container-fluid p-0 m-0">
    <div class="row m-0 p-0" ref="content">
      <div class="col-12 p-0">
        <div class="container-fluid p-0 m-0">
          <div class="row m-0">
            <div class="col-12 p-0">
              <h3>Machine Breakdown Report</h3>
              <i
                v-if="isLoading"
                class="fa fa-refresh fa-spin"
                style="font-size: 30px"
              ></i>
            </div>
          </div>
          <!-- Table Title -->
          <div class="row m-0">
            <div class="col-12 p-0">
              <table class="table table-bordered">
                <tbody>
                  <tr>
                    <td>Operation No</td>
                    <td>:</td>
                    <td>{{ foperation_no }}</td>
                    <td>Start Date</td>
                    <td>:</td>
                    <td>{{ startDate }}</td>
                    <td>Finish Date</td>
                    <td>:</td>
                    <td>{{ endDate }}</td>
                  </tr>
                  <tr>
                    <td>Line</td>
                    <td>:</td>
                    <td>{{ fline }}</td>
                    <td>Start Time</td>
                    <td>:</td>
                    <td>{{ startTime }}</td>
                    <td>Finish Time</td>
                    <td>:</td>
                    <td>{{ endTime }}</td>
                  </tr>
                  <tr>
                    <td>M/C No</td>
                    <td>:</td>
                    <td>{{ fmc_name }}</td>
                    <td>Shift</td>
                    <td>:</td>
                    <td>{{ fshift }}</td>
                    <td>M/C Stop (min)</td>
                    <td>:</td>
                    <td>{{ fdur }}</td>
                  </tr>
                  <tr>
                    <td>Maker</td>
                    <td>:</td>
                    <td>{{ fmaker }}</td>
                    <td>Operator</td>
                    <td>:</td>
                    <td>{{ foperator }}</td>
                    <td>AV Category</td>
                    <td>:</td>
                    <td>{{ fav_categoty }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <!-- Problem -->
          <div class="row m-0 table-bordered">
            <div class="col-3 p-0 bg-primary text-center">Problems</div>
            <div class="col-9 p-0 text-center">{{ ferror_name }}</div>
          </div>
          <!-- Ilus & Step -->
          <div class="row m-0 mt-1">
            <div class="col-4 p-0">
              <div class="row m-0 table-bordered">
                <div class="col-12 p-0 bg-primary text-center">Ilustration</div>
                <div class="col-12 p-0" style="height: 200px"></div>
              </div>
            </div>
            <div class="col-8 p-0">
              <div class="row m-0">
                <div class="col-12 p-0 bg-primary text-center">Step Repair</div>
                <div class="col-12 p-0">
                  <table class="table table-bordered text-center">
                    <thead>
                      <tr>
                        <th style="max-width: 10px">No</th>
                        <th>Step Repair</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="(stepRepair, i) in containerStepRepair"
                        :key="stepRepair"
                      >
                        <td style="max-width: 25px">{{ i + 1 }}</td>
                        <td class="text-left">{{ stepRepair }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <!-- Why Analisys & CM (kenapa terjadi) -->
          <div class="row m-0 mt-1">
            <div class="col-6 p-0">
              <div class="row m-0">
                <div class="col-12 p-0 bg-primary text-center">
                  Why Analisys (Kenapa Terjadi)
                </div>
                <div class="col-12 p-0">
                  <table class="table table-bordered text-center">
                    <thead>
                      <tr>
                        <th style="max-width: 20px">No</th>
                        <th>Description</th>
                      </tr>
                    </thead>
                    <tbody class="text-left">
                      <tr
                        v-for="(whyTerjadi, i) in containerWhyTerjadi"
                        :key="whyTerjadi"
                      >
                        <td style="max-width: 20px">{{ i + 1 }}</td>
                        <td>
                          {{ whyTerjadi }}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div class="col-6 p-0">
              <div class="row m-0">
                <div class="col-12 p-0 bg-primary text-center">
                  Countermeasure (Kenapa Terjadi)
                </div>
                <div class="col-12 p-0">
                  <table class="table table-bordered text-center">
                    <thead>
                      <tr>
                        <th style="max-width: 20px">No</th>
                        <th>Description</th>
                        <th style="min-width: 90px">Date Plan</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody class="text-left">
                      <tr
                        v-for="(cmTerjadi, i) in containerCmTerjadi"
                        :key="cmTerjadi.cmDesc"
                      >
                        <td style="max-width: 20px">{{ i + 1 }}</td>
                        <td>
                          {{ cmTerjadi.cmDesc }}
                        </td>
                        <td>{{ cmTerjadi.datePlan }}</td>
                        <td class="text-success">
                          {{ cmTerjadi.judg == false ? "Belum" : "Sudah" }}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <!-- Part changes & Yokoten -->
          <div class="row m-0 mt-1">
            <div class="col-6 p-0">
              <div class="row m-0">
                <div class="col-12 p-0 bg-primary text-center">Part Change</div>
              </div>
              <div class="row m-0">
                <div class="col-12 table-bordered text-center">
                  {{ fpart_change }}
                </div>
              </div>
            </div>
            <div class="col-6 p-0">
              <div class="row m-0">
                <div class="col-12 p-0 bg-primary text-center">Yokoten</div>
              </div>
              <div class="row m-0">
                <div class="col-12 p-0 table-bordered text-center">
                  <table class="table table-bordered text-center">
                    <thead>
                      <tr>
                        <th style="max-width: 20px">No</th>
                        <th>Item yokoten</th>
                        <th style="min-width: 90px">Date Plan</th>
                        <th>PIC</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody class="text-left">
                      <tr
                        v-for="(yokoten, i) in containerYokoten"
                        :key="yokoten.machine"
                      >
                        <td>{{ i + 1 }}</td>
                        <td>
                          {{ yokoten.machine }}
                        </td>
                        <td>{{ yokoten.datePlan }}</td>
                        <td>{{ yokoten.pic }}</td>
                        <td class="text-success">{{ yokoten.judg }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row m-0" style="position: absolute; top: 0px">
      <div class="col-12 p-0">
        <button @click="exportToPDF()" disabled>Loading ...</button>
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
        jsPDF: { unit: "pt", format: "a4", orientation: "p" },
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

        console.log(result.data.data[0]);
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
        // console.log(result.data.data[0].fpermanet_cm);
        if (result.data.data[0].fpermanet_cm.includes("[{")) {
          this.containerCmTerjadi = JSON.parse(
            result.data.data[0].fpermanet_cm
          );
        }
        if (result.data.data[0].fyokoten.includes("[{")) {
          this.containerYokoten = JSON.parse(result.data.data[0].fyokoten);
        }
        if (result.data.data[0].fpermanet_cm_lama.includes("[{")) {
          this.containerCmLama = JSON.parse(
            result.data.data[0].fpermanet_cm_lama
          );
        }
        this.exportToPDF(`${this.ferror_name}_${this.fmc_name}.pdf`);
        // setInterval(() => {
        //   this.$router.push("/problemHistory");
        // }, 3000);
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>