<template>
  <div class="container">
    <div class="row m-0 p-0">
      <div class="col-12 d-flex justify-content-center" style="z-index: 1">
        <div id="content-search" class="card shadow w-100">
          <div class="card-header title-text p-0 px-2 text-left">Search</div>
          <div class="card-body px-1 py-1">
            <div class="row m-0">
              <div class="col-6 p-0">
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <span class="input-group-text" id="basic-addon1"
                      >Start</span
                    >
                  </div>
                  <input
                    type="date"
                    v-model="selectedStartDate"
                    class="form-control"
                    placeholder="Start Date"
                  />
                </div>
              </div>
              <div class="col-6 p-0 pl-1">
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <span class="input-group-text" id="basic-addon1"
                      >Finish</span
                    >
                  </div>
                  <input
                    type="date"
                    class="form-control"
                    v-model="selectedEndDate"
                    placeholder="End Date"
                  />
                </div>
              </div>
            </div>
            <div class="row m-0">
              <div class="col-12 p-0 pr-1">
                <v-select
                  v-model="selectedMachines"
                  :items="optionsMcs"
                  label="Select Machine"
                  multiple
                >
                  <template
                    v-slot:selection="{ item, index }"
                    style="font-size: 0.6rem !important"
                  >
                    <v-chip v-if="index === 0">
                      <span>{{ item.value }}</span>
                    </v-chip>
                    <span v-if="index === 1" class="grey--text caption">
                      (+{{ selectedMachines.length - 1 }} others)
                    </span>
                  </template>
                </v-select>
              </div>
            </div>
            <div class="row m-0">
              <div class="col-12 d-flex justify-content-end p-0">
                <button
                  type="button"
                  class="btn btn-primary"
                  @click="searchCtMachine()"
                >
                  <b class="text-light">Search<i class="fa fa-search"></i></b>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row m-0 mt-2">
      <div class="col p-0 m-0">
        <ChartParetoCtDashboardAB :propsChartData="containerMcCellAB" />
      </div>
    </div>
    <div class="row m-0 mt-2">
      <div class="col p-0 m-0">
        <ChartParetoCtDashboardCD :propsChartData="containerMcCellCD" />
      </div>
    </div>
    <div class="row m-0 mt-2">
      <div class="col p-0 m-0">
        <ChartParetoCtDashboardFA :propsChartData="containerMcCellFA" />
      </div>
    </div>
    <div class="row m-0 mt-2">
      <div class="col p-0 m-0">
        <ChartParetoCtDashboardFB :propsChartData="containerMcCellFB" />
      </div>
    </div>
    <!-- <div class="row m-0 mt-2">
      <div v-for="(data, i) in chartData" :key="i" class="col-12 p-0">
      </div>
    </div> -->
    <v-dialog
      v-if="detailCtData.length > 0"
      persistent
      v-model="dialog"
      width="500"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="red lighten-2" dark v-bind="attrs" v-on="on">
          {{ detailCtData[0].fMachine }}
        </v-btn>
      </template>

      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          {{ detailCtData[0].fMachine }}
        </v-card-title>

        <v-card-text class="p-0">
          <div v-if="isLoading" class="row m-0">
            <div class="col">
              <i class="fa fa-refresh fa-spin" style="font-size: 30px"></i>
            </div>
          </div>
          <div v-else-if="detailCtData.length > 0">
            <ChartParetoCt :propsChartData="detailCtData" />
          </div>
        </v-card-text>

        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="closeDialog">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <div v-if="isLoading" class="row m-0">
      <div class="col">
        <i class="fa fa-refresh fa-spin" style="font-size: 30px"></i>
      </div>
      <!-- LOADING -->
      <v-dialog v-model="isLoadingDetail" hide-overlay persistent width="300">
        <v-card color="warning" dark>
          <v-card-text>
            Please stand by
            <v-progress-linear
              indeterminate
              color="white"
              class="mb-0"
            ></v-progress-linear>
          </v-card-text>
        </v-card>
      </v-dialog>
    </div>
    <!-- <div
      v-else-if="isLoading === false && chartData.length === 0"
      class="row m-0"
    >
      <div class="col">
        <h4>Tidak ada data Cycletime</h4>
      </div>
    </div> -->
  </div>
</template>

<script>
import ChartParetoCt from "@/components/ChartParetoCt";
import axios from "axios";
import ChartParetoCtDashboardAB from "@/components/ChartParetoCtDashboardAB";
import ChartParetoCtDashboardCD from "@/components/ChartParetoCtDashboardCD";
import ChartParetoCtDashboardFA from "@/components/ChartParetoCtDashboardFA";
import ChartParetoCtDashboardFB from "@/components/ChartParetoCtDashboardFB";
import { mapState } from "vuex";
// import ChartParameter from "@/components/ChartParameter.vue";

export default {
  name: "CycleTimeMachines",
  data() {
    return {
      selectedStartDate: new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        1
      ),
      selectedEndDate: new Date(),
      optionsLines: [
        { value: "1", text: "aa" + " - " + "1" },
        { value: "2", text: "ab" + " - " + "2" },
        { value: "3", text: "bc" + " - " + "3" },
        { value: "4", text: "cd" + " - " + "4" },
        { value: "5", text: "de" + " - " + "5" },
      ],
      optionsMcs: [],
      lineSelected: "",
      selectedMachines: [
        "IMSP-0001",
        "IMSP-0002",
        "IMSP-0003",
        "IMSP-0004",
        "IMSP-0005",
      ],
      parameters: [],
      selectedParameters: [],
      dialog: false,
      detailCtData: [],
      tempResult: [],
      isLoading: false,
      isLoadingDetail: false,
      containerMcCellAB: [],
      containerMcCellCD: [],
      containerMcCellFA: [],
      containerMcCellFB: [],
    };
  },
  computed: {
    ...mapState(["stateMcCt"]),
  },
  watch: {
    stateMcCt: function () {
      console.log(this.stateMcCt);
      this.getOneCtMachine(this.stateMcCt);
    },
  },
  methods: {
    getCtMachines(arrMc = this.selectedMachines) {
      this.isLoading = true;
      this.chartData = [];
      axios(
        `${process.env.VUE_APP_HOST}/ctMachines?startDate=${
          this.selectedStartDate
        }&endDate=${this.selectedEndDate}&searchMc=${arrMc.join(",")}`
      )
        .then((result) => {
          if (result.data.data.length > 0) {
            var groupBy = function (xs, key) {
              return xs.reduce(function (rv, x) {
                (rv[x[key]] = rv[x[key]] || []).push(x);
                return rv;
              }, {});
            };
            let groupCtMachine = groupBy(result.data.data, "fMachine");
            // let mapCtMachine = (this.chartData = result.data.data);

            for (let machine in groupCtMachine) {
              //   console.log(groupCtMachine[machine]);
              this.chartData.push(groupCtMachine[machine]);
            }
            this.isLoading = false;
          } else {
            this.isLoading = false;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    searchCtMachine() {
      this.getCtMachines(this.selectedMachines);
    },
    getMachines() {
      axios
        .get(`${process.env.VUE_APP_HOST}/machines?line=CYLINDER HEAD`)
        .then((result) => {
          const filterMcImsp = result.data.data.filter(
            (mc) => mc.fmc_name.includes("IMSP") != 0
          );
          let mapMcs = filterMcImsp.map((mc) => {
            return { value: mc.fmc_name, text: mc.fmc_name };
          });
          this.optionsMcs = mapMcs;
        })
        .catch((err) => {
          console.log(err);
        });
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
    getCtMachinesCell(cell) {
      this.isLoading = true;
      axios(
        `${process.env.VUE_APP_HOST}/ctMachinesDashboard?startDate=${this.selectedStartDate}&endDate=${this.selectedEndDate}&machinesCell=${cell}`
      )
        .then((result) => {
          if (cell === "AB") {
            this.containerMcCellAB = result.data.data;
          }
          if (cell == "CD") {
            this.containerMcCellCD = result.data.data;
          }
          if (cell == "FA") {
            this.containerMcCellFA = result.data.data;
          }
          if (cell == "FB") {
            this.containerMcCellFB = result.data.data;
          }
          this.getMachines();
          this.isLoading = false;
          console.log(result);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getOneCtMachine(machine) {
      this.dialog = true;
      this.isLoading = true;
      this.isLoadingDetail = true;
      axios(
        `${process.env.VUE_APP_HOST}/ctOneMachine?startDate=${this.selectedStartDate}&endDate=${this.selectedEndDate}&machine=${machine}`
      )
        .then((result) => {
          console.log(result);
          this.detailCtData = result.data.data;
          this.isLoading = false;
          this.isLoadingDetail = false;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    closeDialog() {
      this.isLoading = false;
      this.dialog = false;
      this.detailCtData = [];
    },
  },
  components: {
    ChartParetoCt,
    ChartParetoCtDashboardAB,
    ChartParetoCtDashboardCD,
    ChartParetoCtDashboardFA,
    ChartParetoCtDashboardFB,
    // ModelSelect,
  },
  async created() {
    await this.getCtMachinesCell("AB");
    await this.getCtMachinesCell("CD");
    await this.getCtMachinesCell("FA");
    await this.getCtMachinesCell("FB");
    // this.getCtMachines();
    this.selectedStartDate = this.formatDate(this.selectedStartDate);
    this.selectedEndDate = this.formatDate(this.selectedEndDate);
  },
};
</script>