<template>
  <div class="container-fluid" style="padding-bottom: 80px">
    <!-- SESARCH -->
    <div class="row m-0 p-0">
      <div class="col-12 d-flex justify-content-center" style="z-index: 1">
        <div
          id="content-search"
          class="card shadow"
          style="position: absolute; top: -90px"
        >
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
            <div class="row m-0 p-0">
              <div class="col-12 p-0">
                <div
                  class="btn-group btn-group-sm bordered"
                  role="group"
                  aria-label="..."
                >
                  <button
                    type="button"
                    class="btn btn-outline-success"
                    @click="switchDate('today')"
                  >
                    Today
                  </button>
                  <button
                    type="button"
                    class="btn btn-outline-success"
                    @click="switchDate('yesterday')"
                  >
                    Yesterday
                  </button>
                  <button
                    type="button"
                    class="btn btn-outline-success"
                    @click="switchDate('lastmonth')"
                  >
                    Last Month
                  </button>
                  <button
                    type="button"
                    class="btn btn-outline-success"
                    @click="switchDate('thismonth')"
                  >
                    This Month
                  </button>
                </div>
              </div>
            </div>
          </div>
          <!-- BTN SEARCH -->
          <div
            class="card bg-primary shadow"
            id="btn-search-toggle"
            @click="showSearch()"
            style="
              position: absolute;
              width: 20px;
              height: 20px;
              bottom: -10px;
              left: 50%;
            "
          >
            <i class="fa fa-search"></i>
          </div>
        </div>
      </div>
    </div>
    <div class="row p-0 m-0 mt-4">
      <div class="col-12 p-0">
        <h2>Realtime Parreto</h2>
      </div>
    </div>
    <!-- FIlter prob & MC -->
    <div class="row p-0 m-0">
      <div class="col-6 p-0">
        <div
          class="btn-group btn-group-sm bordered"
          role="group"
          aria-label="..."
        >
          <button
            type="button"
            class="btn btn-primary"
            @click="switchFilter('mc')"
            v-if="isFilterMc"
          >
            Machines
          </button>
          <button
            type="button"
            class="btn btn-outline-primary"
            @click="switchFilter('mc')"
            v-else
          >
            Machines
          </button>
          <button
            type="button"
            class="btn btn-outline-primary"
            @click="switchFilter('prob')"
            v-if="!isFilterProblem"
          >
            Problems
          </button>
          <button
            type="button"
            class="btn btn-primary"
            @click="switchFilter('prob')"
            v-else
          >
            Problems
          </button>
        </div>
      </div>
      <div class="col-6 p-0">
        <div
          class="btn-group btn-group-sm bordered"
          role="group"
          aria-label="..."
        >
          <button
            v-if="!isOrderFreq"
            type="button"
            class="btn btn-warning"
            @click="isOrderFreq = false"
          >
            Duration
          </button>
          <button
            v-else
            type="button"
            class="btn btn-outline-warning"
            @click="isOrderFreq = false"
          >
            Duration
          </button>
          <button
            v-if="!isOrderFreq"
            type="button"
            class="btn btn-outline-warning"
            @click="isOrderFreq = true"
          >
            Frequency
          </button>
          <button
            v-else
            type="button"
            class="btn btn-warning"
            @click="isOrderFreq = true"
          >
            Frequency
          </button>
        </div>
      </div>
    </div>
    <div>
      <div
        v-for="line in tempResult"
        :key="line.fline"
        class="row p-0 m-0 mt-1"
      >
        <div class="col-12 p-0">
          <div class="card">
            <div class="card-header px-1 py-1 text-left">
              {{ line.fline }} Line
            </div>
            <div class="card-body p-0">
              <ChartPareto
                :problemData="line.data"
                :propsStartDate="selectedStartDate"
                :propsEndDate="selectedEndDate"
                :propsOrder="isOrderFreq"
                :propsPanel="line.panel"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import ChartPareto from "@/components/ChartPareto";
export default {
  name: "RealtimePareto",
  data() {
    return {
      isShow: true,
      selectedStartDate: new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        1
      ),
      selectedEndDate: new Date(),
      tempResult: [],
      lines: [
        "LPDC",
        "HPDC",
        "CAM SHAFT",
        "CYLINDER HEAD",
        "CYLINDER BLOCK",
        "CRANK SHAFT",
        "ASSY LINE",
      ],
      isFilterMc: true,
      isFilterProblem: false,
      isOrderFreq: false,
      isOrderDur: true,
    };
  },
  watch: {
    isOrderFreq: function () {
      this.getRealtimePareto();
    },
  },
  components: {
    ChartPareto,
  },
  methods: {
    showSearch() {
      if (this.isShow) {
        document.getElementById("content-search").style.top = "0px";
        this.isShow = false;
      } else {
        document.getElementById("content-search").style.top = "-90px";
        this.isShow = true;
      }
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
    switchDate(filterDate) {
      if (filterDate == "today") {
        this.selectedStartDate = this.formatDate(new Date());
        this.selectedEndDate = this.formatDate(new Date());
        this.getRealtimePareto();
      } else if (filterDate == "yesterday") {
        let day = new Date().getDate() - 1 == 0 ? 31 : new Date().getDate() - 1;
        let month = new Date().getMonth();
        console.log(day);
        let year = new Date().getFullYear();
        if (new Date().getDate() - 1 == 0) {
          month -= 1;
        }
        if (new Date().getMonth() - 1 == 0) {
          year -= 1;
        }
        this.selectedStartDate = this.formatDate(new Date(year, month, day));
        this.selectedEndDate = this.formatDate(new Date(year, month, day));
        this.getRealtimePareto();
      } else if (filterDate == "lastmonth") {
        let year = new Date().getFullYear();
        let month =
          new Date().getMonth() - 1 == -1 ? 11 : new Date().getMonth() - 1;
        if (new Date().getMonth() - 1 == -1) {
          year = new Date(year) - 1;
        }
        let lastDateOfMonth = new Date(year, month + 1, 0);
        let firstDateOfMonth = new Date(year, month, 1);
        this.selectedStartDate = this.formatDate(firstDateOfMonth);
        this.selectedEndDate = this.formatDate(lastDateOfMonth);
        this.getRealtimePareto();
      } else if (filterDate == "thismonth") {
        let firstIdxDay = new Date().setDate(1);
        let lastIdxDay = new Date();
        this.selectedStartDate = this.formatDate(firstIdxDay);
        this.selectedEndDate = this.formatDate(lastIdxDay);
        this.getRealtimePareto();
      }
    },
    getRealtimePareto() {
      this.tempResult = [];
      console.log("INI LINES");
      console.log(this.lines);
      this.lines.forEach((line) => {
        // console.log(line);
        axios
          .get(
            `https://us-central1-smartandonsys.cloudfunctions.net/app/getDataPareto?startDate=${this.formatDate(
              this.selectedStartDate
            )}&endDate=${this.formatDate(
              this.selectedEndDate
            )}&fline=${line}&isMc=${this.isFilterMc}&isProblem=${
              this.isFilterProblem
            }&isFreq=${this.isOrderFreq}`
          )
          .then((result) => {
            result.data.fline = line;
            if (this.isFilterMc == true) {
              result.data.isFilterMc = true;
            }
            if (this.isFilterProblem == true) {
              result.data.isFilterProblem = true;
            }
            console.log("LINES");
            if (line == "LPDC") {
              // console.log(this.lines.indexOf(line));
              result.data.panel = "panelLp";
            } else if (line == "HPDC") {
              result.data.panel = "panelDc";
            } else if (line == "CAM SHAFT") {
              result.data.panel = "panelCam";
            } else if (line == "CRANK SHAFT") {
              result.data.panel = "panelCr";
            } else if (line == "CYLINDER HEAD") {
              result.data.panel = "panelCh";
            } else if (line == "CYLINDER BLOCK") {
              result.data.panel = "panelCb";
            } else if (line == "ASSY LINE") {
              result.data.panel = "panelAssy";
            }
            console.log(result.data);
            this.tempResult.push(result.data);
            console.log(this.tempResult);
          })
          .catch((err) => {
            console.log(err);
          });
      });
    },
    switchFilter(category) {
      if (category == "mc") {
        this.isFilterMc = true;
        this.isFilterProblem = false;
        this.getRealtimePareto();
      } else if (category == "prob") {
        this.isFilterMc = false;
        this.isFilterProblem = true;
        this.getRealtimePareto();
      }
    },
  },
  mounted() {
    // this.showSearch();
    this.selectedStartDate = this.formatDate(this.selectedStartDate);
    this.selectedEndDate = this.formatDate(this.selectedEndDate);
    this.getRealtimePareto();
  },
};
</script>

<style scoped>
@keyframes colorChanges {
  from {
    color: white;
  }
  to {
    color: black;
  }
}
#btn-search-toggle {
  animation-name: colorChanges;
  animation-duration: 1s;
  animation-iteration-count: infinite;
}
#content-search {
  transition: all 0.5s;
}
</style>