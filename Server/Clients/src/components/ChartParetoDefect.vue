<template>
  <div>
    <bar-chart :chart-data="datacollection" :options="options"></bar-chart>
    <v-expansion-panels :v-model="propsPanel" multiple>
      <v-expansion-panel>
        <!-- <v-expansion-panel-header @click="resetTable()">{{
          propsPanel.toUpperCase()
        }}</v-expansion-panel-header> -->
        <v-expansion-panel-content>
          <!-- MOBILE -->
          <table
            class="table table-striped table-dark table-responsive text-left"
            v-if="isMobile"
          >
            <thead class="title-text" style="font-size: 10px">
              <tr>
                <th scope="col">No</th>
                <th style="min-width: 80px" scope="col">Date</th>
                <th style="min-width: 50px" scope="col">Machine</th>
                <th style="min-width: 150px" scope="col">Problem</th>
                <th style="min-width: 50px" scope="col">PIC</th>
                <th style="min-width: 50px" scope="col">Duration</th>
                <th scope="col" colspan="3">Actions</th>
              </tr>
            </thead>
            <tbody v-if="containerProblem.length != 0 && !isLoading">
              <tr v-for="(problem, i) in containerProblem" :key="problem.fid">
                <td scope="row">{{ i + 1 }}</td>
                <td style="min-width: 80px">
                  {{ problem.fstart_time.split("T")[0] }}
                </td>
                <td style="min-width: 50px">
                  {{ problem.fmc_name }}
                </td>
                <td style="min-width: 150px">{{ problem.ferror_name }}</td>
                <td style="min-width: 50px">{{ problem.foperator }}</td>
                <td style="min-width: 50px">{{ problem.fdur }}</td>
                <td style="min-width: 70px">
                  <v-btn
                    class="btn-light"
                    small
                    color="primary"
                    @click="exportPdf(problem.fid, problem.fdur)"
                  >
                    <i class="fa fa-book"></i> Report
                  </v-btn>
                </td>
                <td style="min-width: 70px">
                  <v-btn @click="editProblem(problem.fid)" small>
                    <i class="fa fa-edit"></i> Edit
                  </v-btn>
                </td>
                <td style="min-width: 70px">
                  <v-btn
                    elevation="2"
                    data-toggle="modal"
                    :data-target="`#modal${problem.fid}`"
                    small
                    color="error"
                    ><i class="fa fa-trash"></i> Delete</v-btn
                  >
                  <div
                    class="modal fade"
                    :id="`modal${problem.fid}`"
                    tabindex="1"
                    role="dialog"
                    aria-hidden="true"
                  >
                    <div class="modal-dialog" role="document">
                      <div class="modal-content">
                        <div class="modal-header">
                          <h5 class="modal-title text-dark">Delete Problem</h5>
                          <button
                            type="button"
                            class="close"
                            data-dismiss="modal"
                            aria-label="Close"
                          >
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </div>
                        <div class="modal-body text-dark">
                          <p>
                            apakah kamu yakin ingin menghapus problem
                            <b>{{ problem.ferror_name }}</b> ID:
                            <b>{{ problem.fid }}</b
                            >?
                          </p>
                        </div>
                        <div class="modal-footer">
                          <button
                            type="button"
                            class="btn btn-danger"
                            data-dismiss="modal"
                            @click="deleteProblem(problem.fid)"
                          >
                            Ya, hapus!
                          </button>
                          <button
                            type="button"
                            class="btn btn-secondary"
                            data-dismiss="modal"
                          >
                            Engga jadi deh
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
            <tbody v-else-if="containerProblem.length == 0 && !isLoading">
              <tr>
                <td colspan="10">Tidak Ada Problem</td>
              </tr>
            </tbody>

            <tbody v-else-if="isLoading">
              <tr>
                <td colspan="10">
                  <i
                    v-if="isLoading"
                    class="fa fa-refresh fa-spin"
                    style="font-size: 30px"
                  ></i>
                </td>
              </tr>
            </tbody>
          </table>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script>
import BarChart from "./BarChart.js";
import axios from "axios";
import { mapActions, mapState } from "vuex";

export default {
  components: {
    BarChart,
  },
  data() {
    return {
      datacollection: {},
      options: {},
      labels: [],
      dataDur: [],
      machineSelected: "",
      label: "",
      bgColor: ["#ff005d", "#00b6ff", "#00b6ff", "#00b6ff", "#00b6ff"],
      isLP: false,
      isDC: false,
      isCAM: false,
      isCR: false,
      isCB: false,
      isCH: false,
      isAssy: false,
      showDialog: false,
      dialog: false,
      isShow: false,
      containerProblem: [],
      isMc: false,
      isProblem: false,
      panelLp: [0, 1],
      panelDc: [0, 1],
      panelCam: [0, 1],
      panelCr: [0, 1],
      panelCh: [0, 1],
      panelCb: [0, 1],
      panelAssy: [0, 1],
      panel: [0, 1],
      isLoading: false,
      isMobile: true,
    };
  },
  computed: {
    ...mapState(["stateGraphClick"]),
  },
  created() {
    window.addEventListener("resize", this.handleResize);
    this.handleResize();
  },
  destroyed() {
    window.removeEventListener("resize", this.handleResize);
  },
  watch: {
    datacollection: function () {
      //   console.log("dataCollectionChanges");
    },
    labels: function () {
      this.fillData();
    },
    dataDur: function () {},
    machineSelected: function () {
      this.getDetailsProblem(this.machineSelected);
    },
    stateGraphClick: function () {
      // this.dialog = true;
      this.containerProblem = this.stateGraphClick;
      this.isLoading = false;
      console.log(this.stateGraphClick);
    },
    isMobile: function () {
      this.dataDur = [];
      this.labels = [];
      if (this.isMobile == true) {
        if (this.propsPanel) {
          console.log(this.propsPanel);
        }
        this.problemData.forEach((problem) => {
          console.log(problem);
          if (problem.fmc_name) {
            this.isProblem = false;
            this.isMc = true;
            this.labels.push(problem.fmc_name);
          }
          if (problem.ferror_name) {
            this.isProblem = true;
            this.isMc = false;
            this.labels.push(problem.ferror_name);
          }
          this.dataDur.push(problem.fdur);
          // console.log(problem);
        });
        this.options = {
          responsive: true,
          tooltips: {
            bodyFontSize: 20,
            callbacks: {
              title: function (value, values) {
                console.log(values);
                return `${value[0].label}`;
              },
              // label: (tooltipItem, data) => {
              //   console.log("MACHINE SELECTED");
              //   console.log(data);
              //   // console.log(tooltipItem.label);
              //   this.machineSelected = tooltipItem.label;
              //   // console.log(this.machineSelected);
              //   this.getDetailsProblem(tooltipItem.label);
              //   if (this.showDialog == false) {
              //     this.showDialog = true;
              //   }
              //   return `${this.propsIsOrderFreq ? "Freq" : "Duration"}: ${
              //     tooltipItem.value
              //   } ${this.propsIsOrderFreq ? "x" : "Min"}`;
              // },
            },
          },
          legend: {
            display: false,
          },
          events: ["click"],
          scales: {
            xAxes: [
              {
                ticks: {
                  fontSize: 13,
                  callback: function (lbl) {
                    if (lbl.length > 20) {
                      // console.log(lbl.length);
                      // console.log(lbl.slice(20));
                      return lbl.slice(0, 13);
                    }
                    return lbl;
                  },
                },
              },
            ],
            yAxes: [
              {
                ticks: {
                  stepSize: Number(`${this.propsIsOrderFreq ? 1 : 0}`),
                  fontSize: 100,
                  min: 0,
                },
              },
            ],
          },
        };
      } else {
        document.getElementById("bar-chart").style.height = "600px";
        let chartClasses = document.getElementsByClassName(
          "chartjs-render-monitor"
        );
        for (let i = 0; i < chartClasses.length; i++) {
          const element = chartClasses[i];
          element.style.height = "600px";
        }
        if (this.propsPanel) {
          console.log(this.propsPanel);
        }
        this.problemData.forEach((problem) => {
          if (problem.fmc_name) {
            this.isProblem = false;
            this.isMc = true;
            this.labels.push(problem.fmc_name);
          }
          if (problem.ferror_name) {
            this.isProblem = true;
            this.isMc = false;
            this.labels.push(problem.ferror_name);
          }
          this.dataDur.push(problem.fdur);
          // console.log(problem);
        });
        this.options = {
          responsive: true,
          tooltips: {
            bodyFontSize: 20,
            titleFontSize: 20,
            callbacks: {
              title: function (value, values) {
                console.log(values);
                return `${value[0].label}`;
              },
              label: (tooltipItem, data) => {
                console.log("MACHINE SELECTED");
                console.log(data);
                // console.log(tooltipItem.label);
                this.machineSelected = tooltipItem.label;
                // console.log(this.machineSelected);
                this.getDetailsProblem(tooltipItem.label);
                if (this.showDialog == false) {
                  this.showDialog = true;
                }
                return `${this.propsIsOrderFreq ? "Freq" : "Duration"}: ${
                  tooltipItem.value
                } ${this.propsIsOrderFreq ? "x" : "Min"}`;
              },
            },
          },
          legend: {
            display: false,
          },
          events: ["click"],
          scales: {
            xAxes: [
              {
                ticks: {
                  fontSize: 28,
                  callback: function (lbl) {
                    if (lbl.length > 20) {
                      // console.log(lbl.length);
                      // console.log(lbl.slice(20));
                      return lbl.slice(0, 13);
                    }
                    return lbl;
                  },
                },
              },
            ],
            yAxes: [
              {
                ticks: {
                  stepSize: Number(`${this.propsIsOrderFreq ? 1 : 0}`),
                  fontSize: 30,
                  min: 0,
                },
              },
            ],
          },
        };
      }
    },
    defectData: function () {
      console.log(this.labelData);
      console.log(this.defectData);
      this.datacollection = {
        labels: this.labelData,
        datasets: [
          {
            label: "Defect",
            backgroundColor: ["red", "red", "red", "red", "red", "red"],
            data: this.defectData,
          },
        ],
      };
    },
  },
  props: {
    defectData: Array,
    labelData: Array,
  },
  mounted() {
    this.fillData();
    console.log(this.defectData);
    console.log(this.labelData);
  },
  methods: {
    ...mapActions(["actionsGetProblemHistory"]),
    fillData() {
      this.datacollection = {
        labels: ["1", "2", "3", "1", "2", "3"],
        datasets: [
          {
            label: "Defect",
            backgroundColor: ["red", "red", "red", "red", "red", "red"],
            data: [2, 3, 4, 5, 6, 3],
          },
        ],
      };
      this.options = {
        responsive: true,
        tooltips: {
          callbacks: {
            title: function (value, values) {
              console.log(values);
              return `${value[0].label}`;
            },
            // label: (tooltipItem, data) => {
            //   console.log("MACHINE SELECTED");
            //   console.log(data);
            //   // console.log(tooltipItem.label);
            //   this.machineSelected = tooltipItem.label;
            //   // console.log(this.machineSelected);
            //   this.getDetailsProblem(tooltipItem.label);
            //   if (this.showDialog == false) {
            //     this.showDialog = true;
            //   }
            //   return `${this.propsIsOrderFreq ? "Freq" : "Duration"}: ${
            //     tooltipItem.value
            //   } ${this.propsIsOrderFreq ? "x" : "Min"}`;
            // },
          },
        },
        legend: {
          display: false,
        },
        events: ["click"],
        scales: {
          xAxes: [
            {
              ticks: {
                fontSize: 13,
                callback: function (lbl) {
                  if (lbl.length > 20) {
                    // console.log(lbl.length);
                    // console.log(lbl.slice(20));
                    return lbl.slice(0, 13);
                  }
                  return lbl;
                },
              },
            },
          ],
          yAxes: [
            {
              ticks: {
                stepSize: Number(`${this.propsIsOrderFreq ? 1 : 0}`),
                fontSize: 12,
                min: 0,
              },
            },
          ],
        },
      };
    },
    handleResize() {
      console.log(window.innerWidth);
      if (window.innerWidth < 640) {
        this.isMobile = true;
      } else {
        this.isMobile = false;
      }
    },
    getDetailsProblem(machine) {
      this.containerProblem = [];
      this.isLoading = true;
      let obj = {
        startDate: this.propsStartDate,
        endDate: this.propsEndDate,
        machine,
      };
      if (this.isMc == true) {
        obj.isMc = true;
        obj.isProblem = false;
      }
      if (this.isProblem == true) {
        obj.isProblem = true;
        obj.isMc = false;
      }
      this.actionsGetProblemHistory(obj);
    },
    formatDate(date) {
      var d = new Date(date),
        month = "" + (d.getMonth() + 1),
        day = "" + d.getDate(),
        year = d.getFullYear();

      if (month.length < 2) month = "0" + month;
      if (day.length < 2) day = "0" + day;

      return [year, month, day].join("-");
    },
    resetTable() {
      console.log("CLICK");
      this.containerProblem = [];
    },
    editProblem(vid) {
      this.$router.push(`/editProblem?v_=${vid}`);
    },
    deleteProblem(_v) {
      axios
        .delete(
          `https://us-central1-smartandonsys.cloudfunctions.net/app/deleteProblem/${_v}`
        )
        .then((result) => {
          console.log(result);
          this.getProblemHistory();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    exportPdf(id, dur) {
      console.log(dur);
      console.log(id);
      if (dur > 120) {
        this.$router.push(`/pdfViewerLong?v_=${id}`);
      } else {
        this.$router.push(`/pdfViewerSmall?v_=${id}`);
      }
    },
    displayTable() {
      document.getElementById("content-expander").style.display = "block";
    },
  },
};
</script>

<style>
.v-dialog .v-dialog--active {
  margin: 0px !important;
}
td {
  font-size: 10px;
}
.v-expansion-panel-content__wrap {
  padding: 0px !important;
}
</style>
