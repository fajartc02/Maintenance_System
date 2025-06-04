<template>
  <div>
    <div class="container-fluid" style="padding-bottom: 80px" v-if="isMobile">
      <!-- SESARCH -->
      <div class="row m-0 p-0">
        <div
          class="col-12 d-flex justify-content-center px-0"
          style="z-index: 1"
        >
          <div id="content-search" class="card shadow">
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
                <div class="col-8 p-0">
                  <div class="input-group mb-3">
                    <div class="input-group-prepend">
                      <span class="input-group-text" id="basic-addon1"
                        >AV Category</span
                      >
                    </div>
                    <model-select
                      :options="avCategories"
                      v-model="selectedCategory"
                      placeholder="select Category"
                      style="width: 60%; font-size: 10px; color: black"
                    >
                    </model-select>
                  </div>
                </div>
                <div class="col-4 p-0">
                  <button
                    class="btn btn-primary p-0 px-3 title-text"
                    @click="getRealtimePareto()"
                  >
                    Search <i class="fa fa-search"></i>
                  </button>
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
            <!-- <div
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
            </div> -->
          </div>
        </div>
      </div>
      <div class="row p-0 m-0 mt-4">
        <div class="col-12 p-0">
          <h2>Realtime Parreto</h2>
          {{ timeNow }}
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
        <div class="row m-0">
          <div class="col-12 p-0">
            <i
              v-if="isLoading"
              class="fa fa-refresh fa-spin"
              style="font-size: 30px"
            ></i>
          </div>
        </div>
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
                  :propsIsOrderFreq="isOrderFreq"
                  :propsPanel="line.panel"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container-fluid" style="padding-bottom: 80px" v-else>
      <!-- SESARCH -->
      <div class="row m-0 p-0">
        <div
          class="col-12 d-flex justify-content-center px-0"
          style="z-index: 1"
        >
          <div id="content-search" class="card shadow">
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
                <div class="col-8 p-0">
                  <div class="input-group mb-3">
                    <div class="input-group-prepend">
                      <span class="input-group-text" id="basic-addon1"
                        >AV Category</span
                      >
                    </div>
                    <model-select
                      :options="avCategories"
                      v-model="selectedCategory"
                      placeholder="select Category"
                      style="width: 60%; font-size: 10px; color: black"
                    >
                    </model-select>
                  </div>
                </div>
                <div class="col-4 p-0">
                  <button
                    class="btn btn-primary p-0 px-3 title-text"
                    @click="getRealtimePareto()"
                  >
                    Search <i class="fa fa-search"></i>
                  </button>
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
            <!-- <div
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
            </div> -->
          </div>
        </div>
      </div>
      <div class="row p-0 m-0 mt-4">
        <div class="col-12 p-0">
          <h2>Realtime Parreto</h2>
          {{ timeNow }}
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
        <div class="row m-0">
          <div class="col-12 p-0">
            <i
              v-if="isLoading"
              class="fa fa-refresh fa-spin"
              style="font-size: 30px"
            ></i>
          </div>
        </div>
        <div class="row p-0 m-0 mt-1">
          <div class="col-6 p-0" v-for="line in tempResult" :key="line.fline">
            <div class="card">
              <div class="card-header px-1 py-1 text-left" v-if="isMobile">
                {{ line.fline }} Line
              </div>
              <div
                class="card-header px-1 py-1 text-left"
                style="font-size: 30px"
                v-else
              >
                {{ line.fline }} Line
              </div>
              <div class="card-body p-0">
                <ChartPareto
                  :problemData="line.data"
                  :propsStartDate="selectedStartDate"
                  :propsEndDate="selectedEndDate"
                  :propsIsOrderFreq="isOrderFreq"
                  :propsPanel="line.panel"
                />
              </div>
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
import { ModelSelect } from "vue-search-select";
import moment from "moment";

export default {
  name: "RealtimeParetoDesktop",
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
      avCategories: [
        { value: "MESIN", text: "MESIN" },
        { value: "DIES", text: "DIES" },
        { value: "TOOL", text: "TOOL" },
        { value: "COOLANT", text: "COOLANT" },
        { value: "TOOL CHANGE", text: "TOOL CHANGE" },
        { value: "FUTAI", text: "FUTAI" },
        { value: "POWER/ANGIN", text: "POWER/ANGIN" },
        { value: "NES", text: "NES" },
        { value: "PALLETE", text: "PALLETE" },
        { value: "OTHER", text: "OTHER" },
      ],
      selectedCategory: null,
      isFilterMc: true,
      isFilterProblem: false,
      isOrderFreq: false,
      isOrderDur: true,
      isLoading: false,
      timeNow: "",
      isMobile: true,
    };
  },
  watch: {
    isOrderFreq: function () {
      this.getRealtimePareto();
      console.log(this.isOrderFreq);
    },
  },
  components: {
    ChartPareto,
    ModelSelect,
  },
  methods: {
    showSearch() {
      if (this.isShow) {
        document.getElementById("content-search").style.top = "0px";
        this.isShow = false;
      } else {
        document.getElementById("content-search").style.top = "-200px";
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
      this.isLoading = true;
      this.tempResult = [];
      let containerQuery = ``;
      this.lines.forEach((line, i) => {
        let startDate = "";
        let endDate = "";
        let fline = "";
        let avCategoty = "";
        if (this.selectedCategory) {
          avCategoty = `fav_categoty = '${this.selectedCategory}' AND `;
        }
        if (this.selectedStartDate) {
          startDate = this.formatDate(this.selectedStartDate);
        }
        if (this.selectedEndDate) {
          endDate = this.formatDate(this.selectedEndDate);
        }
        if (line) {
          fline = `AND fline = '${line}'`;
        }
        let group = ``;
        if (this.isFilterMc) {
          group = "fmc_name";
        }
        if (this.isFilterProblem) {
          group = "ferror_name";
        }
        let order = "sum(fdur)";
        if (this.isOrderFreq) {
          order = "count(fid)";
        }
        let q = `SELECT ${group}, ${order} AS fdur FROM v_current_error_2 WHERE ${avCategoty}date(fstart_time) >= date('${startDate}') AND date(fstart_time) <= date('${endDate}') AND fdur > 3 ${fline} GROUP BY ${group} ORDER BY fdur desc LIMIT 5`;
        if (i < this.lines.length - 1) {
          q += ";";
        }
        containerQuery += q;
        console.log(q);
      });
      console.log(containerQuery);
      axios
        .get(
          `${process.env.VUE_APP_HOST}/getDataPareto?containerQuery=${containerQuery}`
        )
        .then((result) => {
          console.log(result);
          let obj = {
            data: [],
            fline: "",
            isFilterMc: true,
            message: "Success to get Pareto Problem",
            panel: "",
          };
          this.lines.forEach((line) => {
            if (this.isFilterMc == true) {
              obj.isFilterMc = true;
            }
            if (this.isFilterProblem == true) {
              obj.isFilterProblem = true;
            }
            if (line == "LPDC") {
              obj.data = result.data.data[0];
              obj.fline = line;
              obj.panel = "panelLp";
            } else if (line == "HPDC") {
              obj.data = result.data.data[1];
              obj.fline = line;
              obj.panel = "panelDc";
            } else if (line == "CAM SHAFT") {
              obj.data = result.data.data[2];
              obj.fline = line;
              obj.panel = "panelCam";
            } else if (line == "CYLINDER HEAD") {
              obj.data = result.data.data[3];
              obj.fline = line;
              obj.panel = "panelCh";
            } else if (line == "CYLINDER BLOCK") {
              obj.data = result.data.data[4];
              obj.fline = line;
              obj.panel = "panelCb";
            } else if (line == "CRANK SHAFT") {
              obj.data = result.data.data[5];
              obj.fline = line;
              obj.panel = "panelCr";
            } else if (line == "ASSY LINE") {
              obj.data = result.data.data[6];
              obj.fline = line;
              obj.panel = "panelAssy";
            }
            this.tempResult.push(obj);
            obj = {
              data: [],
              fline: "",
              isFilterMc: true,
              message: "Success to get Pareto Problem",
              panel: "",
            };
          });
          this.isLoading = false;
        })
        .catch((err) => {
          // this.getRealtimePareto();
          this.isLoading = false;
          console.log(err);
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
    intervalTime() {
      let dateConvert = `${moment().format("L").split("/")[1]}/${
        moment().format("L").split("/")[0]
      }/${moment().format("L").split("/")[2]}`;
      this.timeNow = `${dateConvert} ${
        moment().format("MMMM Do YYYY, h:mm:ss a").split(", ")[1]
      }`;
    },
    handleResize() {
      console.log(window.innerWidth);
      if (window.innerWidth < 640) {
        this.isMobile = true;
      } else {
        this.isMobile = false;
      }
    },
  },
  mounted() {
    // this.showSearch();
    this.selectedStartDate = this.formatDate(this.selectedStartDate);
    this.selectedEndDate = this.formatDate(this.selectedEndDate);
    this.getRealtimePareto();

    let dateConvert = `${moment().format("L").split("/")[1]}/${
      moment().format("L").split("/")[0]
    }/${moment().format("L").split("/")[2]}`;
    this.timeNow = `${dateConvert} ${
      moment().format("MMMM Do YYYY, h:mm:ss a").split(", ")[1]
    }`;
    let intervalStart = setInterval(this.intervalTime, 1000);
    console.log(intervalStart);
  },
  created() {
    window.addEventListener("resize", this.handleResize);
    this.handleResize();
  },
  destroyed() {
    window.removeEventListener("resize", this.handleResize);
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