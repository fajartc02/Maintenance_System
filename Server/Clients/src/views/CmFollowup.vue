<template>
  <div class="container-fluid" style="margin-top: 10px; margin-bottom: 100px">
    <div class="row">
      <div class="col">
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
            <div class="row m-0">
              <div class="col-6 p-0">
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <span class="input-group-text" id="basic-addon1">Line</span>
                  </div>
                  <model-select
                    :options="optionsLines"
                    v-model="lineSelected"
                    placeholder="select line"
                    style="width: 60%; font-size: 10px; color: black"
                  >
                  </model-select>
                </div>
              </div>
              <div class="col-6 p-0 pl-1">
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <span class="input-group-text" id="basic-addon1"
                      >Machine</span
                    >
                  </div>
                  <model-select
                    :options="optionsMcs"
                    v-model="machineSelected"
                    placeholder="select line"
                    style="width: 50%; font-size: 10px; color: black"
                  >
                  </model-select>
                </div>
              </div>
            </div>
            <div class="row m-0">
              <div class="col-10 p-0">
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <span class="input-group-text" id="basic-addon1"
                      >Problem</span
                    >
                  </div>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Problem"
                    v-model="problemSelected"
                  />
                </div>
              </div>
              <div class="col-2 p-0">
                <button class="btn btn-primary p-0 px-3" @click="searchCM()">
                  <i class="fa fa-search"></i>
                </button>
              </div>
            </div>
            <div class="row m-0">
              <div class="col p-0">
                <b-dropdown
                  text="Category"
                  class="m-md-2 text-light"
                  style="font-size: 5px !important"
                  variant="primary"
                >
                  <b-dd-form>
                    <b-form-radio
                      v-model="selectCategory"
                      name="some-radios"
                      :value="null"
                      >All</b-form-radio
                    >
                    <b-form-radio
                      v-model="selectCategory"
                      name="some-radios"
                      value="[TASKFORCE]"
                      >TASKFORCE</b-form-radio
                    >
                    <b-form-radio
                      v-model="selectCategory"
                      name="some-radios"
                      value="[FULLCAP]"
                      >FULLCAP</b-form-radio
                    >
                    <!-- <input type="checkbox" v-model="isTaskforce" />Taskforce -->
                  </b-dd-form>
                </b-dropdown>
              </div>
              <div class="col p-0">
                <b-dropdown
                  text="Pilih Shift"
                  style="font-size: 5px !important"
                  variant="primary"
                  class="m-md-2 text-light"
                >
                  <b-form-group label="Shift">
                    <b-form-radio
                      v-model="selectShift"
                      name="some-radios"
                      value=""
                      >All</b-form-radio
                    >
                    <b-form-radio
                      v-model="selectShift"
                      name="some-radios"
                      value="r"
                      >Red Shift</b-form-radio
                    >
                    <b-form-radio
                      v-model="selectShift"
                      name="some-radios"
                      value="w"
                      >White Shift</b-form-radio
                    >
                  </b-form-group>
                </b-dropdown>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12 p-0">
        <h3 class="title-text" style="font-size: 30px">
          Countermeasure Followup
        </h3>
      </div>
    </div>
    <div class="row">
      <div class="col-6">
        <div class="card border-danger text-danger" style="height: 10vh">
          <div
            class="card-header p-1"
            style="font-size: 7px; font-weight: bold"
          >
            Belum Di Countermeasure
          </div>
          <div class="card-body p-2" style="font-size: 18px; font-weight: bold">
            {{ cntCmNotYet }}
          </div>
        </div>
      </div>
      <div class="col-6">
        <div class="card border-success text-success" style="height: 10vh">
          <div
            class="card-header p-1"
            style="font-size: 7px; font-weight: bold"
          >
            Sudah Di Countermeasure
          </div>
          <div class="card-body p-2" style="font-size: 18px; font-weight: bold">
            {{ cntCmOk }}
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12 p-0">
        <LegendStatusCm />
      </div>
    </div>
    <div class="row">
      <div class="col-12 p-0">
        <download-excel
          class="btn btn-primary"
          :data="json_data"
          :fields="json_fields"
          worksheet="My Worksheet"
          :name="fileNameDownload"
        >
          Download Countermeasure
        </download-excel>
      </div>
    </div>
    <div class="row">
      <div
        class="col-12 p-0"
        style="overflow-x: auto; overflow-y: auto; height: 700px"
      >
        <table class="table table-sm table-bordered table-striped tableFixHead">
          <thead>
            <tr class="table-info text-center" style="font-size: 10px">
              <th scope="col" rowspan="3">No</th>
              <th scope="col" rowspan="3">Line</th>
              <th scope="col" rowspan="3">Machine</th>
              <th scope="col" rowspan="3">Date Problem</th>
              <th scope="col" rowspan="3">Description Problem</th>
              <th scope="col" rowspan="3">Duration</th>
              <th scope="col" rowspan="3">Rootcause</th>
              <th scope="col" rowspan="3">Countermeasure</th>
              <th scope="col" rowspan="3">Due Date</th>
              <th scope="col" rowspan="3">PIC</th>
              <th scope="col" rowspan="3">Status</th>
              <th scope="col" colspan="2">Kategori CM (v)</th>
              <th scope="col" colspan="12">Schedule Countermeasure</th>
              <th rowspan="3">Actions</th>
            </tr>
            <tr style="font-size: 10px">
              <th scope="col" rowspan="2">Kenapa Terjadi</th>
              <th scope="col" rowspan="2">Kenapa Lama</th>
              <th class="text-center" scope="col" colspan="12">
                {{ new Date().getFullYear() }}
              </th>
            </tr>
            <tr style="font-size: 10px">
              <th scope="col">Jan</th>
              <th scope="col">Feb</th>
              <th scope="col">Mar</th>
              <th scope="col">Apr</th>
              <th scope="col">May</th>
              <th scope="col">Jun</th>
              <th scope="col">Jul</th>
              <th scope="col">Aug</th>
              <th scope="col">Sept</th>
              <th scope="col">Oct</th>
              <th scope="col">Nov</th>
              <th scope="col">Dec</th>
            </tr>
          </thead>
          <tbody style="font-size: 8px" id="bodyData">
            <tr
              v-for="(cmItem, i) in containerCm"
              :key="cmItem.fid + cmItem.cmDesc + i"
              :style="`background-color: ${containerColorStatus[i]}`"
            >
              <td class="text-center">{{ i + 1 }}</td>
              <td class="text-center">{{ cmItem.fline }}</td>
              <td class="text-center">{{ cmItem.fmc_name }}</td>
              <td style="min-width: 50px" class="text-center">
                {{ cmItem.fstart_time }}
              </td>
              <td style="min-width: 100px">
                <router-link :to="`/editProblem?v_=${cmItem.fid}`">
                  {{ cmItem.ferror_name }}</router-link
                >
              </td>
              <td class="text-center">{{ cmItem.fdur }}</td>
              <td class="text-left" style="min-width: 100px">
                {{ cmItem.freal_prob }}
              </td>
              <td style="min-width: 100px" class="text-left">
                {{ cmItem.cmDesc }}
              </td>
              <td style="min-width: 50px" class="text-center">
                {{ cmItem.datePlan }}
              </td>
              <td class="text-center">{{ cmItem.pic }}</td>
              <td class="text-center">{{ cmItem.judg ? "OK" : "NOT YET" }}</td>
              <td class="text-center">{{ cmItem.cmTerjadi ? "V" : "" }}</td>
              <td class="text-center">{{ cmItem.cmLama ? "V" : "" }}</td>
              <td
                v-for="(item, i) in cmItem.fMonitor"
                :key="item + i"
                class="text-center"
                :style="`font-size: 16px;color: ${
                  cmItem.isYokoten ? 'blue' : 'black'
                }`"
              >
                {{ item }}
              </td>
              <td>
                <button
                  v-if="cmItem.judg"
                  class="btn btn-success"
                  style="font-size: 10px"
                  disabled
                >
                  OK
                </button>
                <button
                  v-else
                  class="btn btn-info"
                  style="font-size: 10px"
                  :disabled="!isSectionHead"
                  @click="onShowConf(cmItem)"
                >
                  Konfirmasi
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <v-dialog
          class="bg-danger"
          v-model="showAlarmDialog"
          v-if="selectedCmConf"
          width="500"
        >
          <v-card>
            <v-card-title class="headline lighten-2"> Konfirmasi </v-card-title>
            <v-card-text class="p-0">
              <table class="table">
                <thead>
                  <tr>
                    <th>Item Countermeasure</th>
                    <th>Date</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td>{{ selectedCmConf.cmDesc }}</td>
                    <td>{{ selectedCmConf.datePlan }}</td>
                    <td>
                      {{ "belum" }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <v-spacer></v-spacer>
              <button
                type="button"
                @click="confCmComplete(selectedCmConf.fid)"
                class="btn btn-success text-light"
              >
                Konfirmasi Sudah
              </button>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import LegendStatusCm from "@/components/LegendStatusCm";
import JsonExcel from "vue-json-excel";
// import brain from "brain.js";
// import moment from "moment";
import { ModelSelect } from "vue-search-select";
export default {
  name: "CmFollowup",
  data() {
    return {
      containerCm: [],
      containerColorStatus: [],
      isTaskforce: false,
      selectShift: "",
      selectCategory: null,
      cntCmNotYet: 0,
      selectedCmConf: null,
      rawCm: [],
      showAlarmDialog: false,
      cntCmOk: 0,
      optionsLines: [
        { value: "LPDC", text: "LPDC" },
        { value: "HPDC", text: "HPDC" },
        { value: "CAM SHAFT", text: "CAM SHAFT" },
        { value: "CYLINDER HEAD", text: "CYLINDER HEAD" },
        { value: "CYLINDER BLOCK", text: "CYLINDER BLOCK" },
        { value: "CRANK SHAFT", text: "CRANK SHAFT" },
        { value: "ASSY LINE", text: "ASSY LINE" },
      ],
      optionsMcs: [{ value: "Loading", text: "Loading..." }],
      lineSelected: "",
      isShow: true,
      selectedStartDate: new Date(new Date().getFullYear(), 0, 1),
      selectedEndDate: new Date(),
      containerProblems: [],
      isLoading: false,
      machineSelected: "",
      problemSelected: "",
      isSectionHead: false,
      json_fields: {
        No: "no",
        Line: "fline",
        Machine: "fmc_name",
        "Date Problem": "fstart_time",
        "Description Problem": "ferror_name",
        "Duration (min)": "fdur",
        Countermeasure: "cmDesc",
        "Due Date": "datePlan",
        Pic: "pic",
        "Kenapa Terjadi": "cmTerjadi",
        "Kenapa Lama": "cmLama",
        Yokoten: "isYokoten",
        Status: "judg",
      },
      json_data: [],
      json_meta: [
        [
          {
            key: "charset",
            value: "utf-8",
          },
        ],
      ],
      fileNameDownload: `Countermeasure Data - ${new Date(new Date().getFullYear(), 0, 1)} ~ `,
    };
  },
  components: {
    ModelSelect,
    LegendStatusCm,
    downloadExcel: JsonExcel,
  },
  watch: {
    lineSelected: function () {
      this.getMachines();
    },
    isTaskforce: function () {
      if (this.isTaskforce == true) {
        this.problemSelected = "[TASKFORCE]";
        localStorage.setItem("keepTf", true);
        this.getAllCm();
      } else {
        this.problemSelected = "";
        localStorage.removeItem("keepTf");
        this.getAllCm();
      }
    },
    selectShift: function () {
      if (this.selectShift == "r") {
        this.getAllCm();
      } else if (this.selectShift == "w") {
        this.getAllCm();
      } else {
        this.getAllCm();
      }
    },
    selectCategory: function () {
      if (this.selectCategory == "[FULLCAP]") {
        this.problemSelected += this.selectCategory;
        localStorage.setItem("keepCategory", "[FULLCAP]");
      } else if (this.selectCategory == "[TASKFORCE]") {
        this.problemSelected += this.selectCategory;
        localStorage.setItem("keepCategory", "[TASKFORCE]");
      } else {
        this.problemSelected = this.problemSelected.split("[")[0];
        this.selectCategory = null;
      }
      this.getAllCm();
    },
  },
  methods: {
    getAllCm() {
      this.containerCm = [];
      this.containerColorStatus = [];
      let url = `${process.env.VUE_APP_HOST}/cmFollowup?startDate=${this.selectedStartDate}&endDate=${this.selectedEndDate}`;
      if (this.lineSelected != "") {
        url += `&fline=${this.lineSelected}`;
      }
      if (this.machineSelected != "") {
        url += `&fmc=${this.machineSelected}`;
      }
      if (this.problemSelected != "") {
        url += `&ferror_name=${this.problemSelected}`;
      }
      if (this.selectShift != "") {
        url += `&shift=${this.selectShift}`;
      }

      axios
        .get(url)
        .then((result) => {
          let cmData = result.data.data;
          this.cntCmNotYet = result.data.cntCmNotYet;
          this.rawCm = cmData;
          this.cntCmOk = result.data.cntCmOk;
          let resCm = [];
          if (new Date().getMonth() > 3) {
            // console.log("OKE");
          }
          let fieldsMonitoring = [
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
          ];
          for (let i = 0; i < cmData.length; i++) {
            // console.log(cmItem.fpermanet_cm.indexOf("[{"));
            const cmItem = cmData[i];
            if (cmItem.fpermanet_cm.indexOf("[{") !== -1) {
              let cmObj = {};
              cmObj.fid = cmItem.fid;
              cmObj.fline = cmItem.fline;
              cmObj.fstart_time = cmItem.fstart_time.split("T")[0];
              cmObj.fmc_name = cmItem.fmc_name;
              cmObj.ferror_name = cmItem.ferror_name;
              cmObj.fdur = cmItem.fdur;
              cmObj.freal_prob = cmItem.freal_prob;
              cmObj.isYokoten = false;
              let cmParse = JSON.parse(cmItem.fpermanet_cm);
              if (cmParse.length > 0) {
                cmParse.forEach((cm) => {
                  cmObj.cmLama = false;
                  cmObj.cmDesc = cm.cmDesc;
                  cmObj.datePlan = cm.datePlan;
                  cmObj.pic = cm.pic;
                  cmObj.foperator = cm.pic;
                  cmObj.judg = cm.judg;
                  cmObj.cmTerjadi = true;
                  let indexPost = +cmObj.datePlan.split("-")[1] - 1;
                  if (cmObj.judg == true) {
                    fieldsMonitoring[indexPost] = "◉";
                    this.containerColorStatus.push("white");
                  } else {
                    fieldsMonitoring[indexPost] = "○";
                    // #onShceduleColor
                    if (
                      Number(new Date(cm.datePlan).getTime()) >
                      Number(new Date().getTime())
                    ) {
                      this.containerColorStatus.push("#00e9ff");
                    } else {
                      this.containerColorStatus.push("rgba(252, 121, 121, .6)");
                    }
                  }
                  cmObj.fMonitor = fieldsMonitoring;
                  // console.log(fieldsMonitoring);
                  resCm.push(cmObj);
                  cmObj = {};
                  fieldsMonitoring = [
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                  ];
                });
              }
            }
            if (cmItem.fpermanet_cm_lama.indexOf("[{") !== -1) {
              let cmObj = {};
              cmObj.fid = cmItem.fid;
              cmObj.fline = cmItem.fline;
              cmObj.fstart_time = cmItem.fstart_time.split("T")[0];
              cmObj.fmc_name = cmItem.fmc_name;
              cmObj.ferror_name = cmItem.ferror_name;
              cmObj.fdur = cmItem.fdur;
              cmObj.freal_prob = cmItem.freal_prob;
              console.log("MASUK PERMANET CM LAMA");
              // cmObj.foperator = cm.;
              // cmObj.foperator = cmItem.fpermanet_cm_lama.pic;
              let cmParseLama = JSON.parse(cmItem.fpermanet_cm_lama);
              if (cmParseLama.length > 0) {
                cmParseLama.forEach((cm) => {
                  cmObj.cmTerjadi = false;
                  cmObj.cmDesc = cm.cmDesc;
                  cmObj.datePlan = cm.datePlan;
                  cmObj.pic = cm.pic;
                  cmObj.foperator = cm.pic;
                  cmObj.judg = cm.judg;
                  cmObj.cmLama = true;
                  let indexPost = +cmObj.datePlan.split("-")[1] - 1;
                  // fieldsMonitoring[+cmObj.datePlan.split("-")[1] - 4] = "O";
                  if (cmObj.judg == true) {
                    fieldsMonitoring[indexPost] = "◉";
                    this.containerColorStatus.push("white");
                  } else {
                    fieldsMonitoring[indexPost] = "○";
                    // #onShceduleColor
                    if (
                      Number(new Date(cm.datePlan).getTime()) >
                      Number(new Date().getTime())
                    ) {
                      this.containerColorStatus.push("#00e9ff");
                    } else {
                      this.containerColorStatus.push("rgba(252, 121, 121, .6)");
                    }
                  }
                  cmObj.fMonitor = fieldsMonitoring;
                  resCm.push(cmObj);
                  cmObj = {};
                  fieldsMonitoring = [
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                  ];
                });
              }
            }
            if (cmItem.fyokoten.indexOf("[{") !== -1) {
              let cmObj = {};
              cmObj.fid = cmItem.fid;
              cmObj.fline = cmItem.fline;
              cmObj.fstart_time = cmItem.fstart_time.split("T")[0];
              cmObj.fmc_name = cmItem.fmc_name;
              cmObj.ferror_name = cmItem.ferror_name;
              cmObj.fdur = cmItem.fdur;
              cmObj.freal_prob = cmItem.freal_prob;
              console.log(cmItem.fyokoten);
              let cmParseYokoten = JSON.parse(cmItem.fyokoten);
              if (cmParseYokoten.length > 0) {
                cmParseYokoten.forEach((cm) => {
                  cmObj.cmTerjadi = cmObj.cmTerjadi ? true : true;
                  cmObj.cmDesc = cm.machine;
                  cmObj.datePlan = cm.datePlan;
                  cmObj.pic = cm.pic;
                  cmObj.foperator = cm.pic;
                  cmObj.judg = cm.judg;
                  cmObj.cmLama = cmObj.cmLama ? true : false;
                  cmObj.isYokoten = true;
                  let indexPost = +cmObj.datePlan.split("-")[1] - 1;
                  // fieldsMonitoring[+cmObj.datePlan.split("-")[1] - 4] = "O";
                  if (cmObj.judg == true) {
                    fieldsMonitoring[indexPost] = "◉";
                    this.containerColorStatus.push("white");
                  } else {
                    fieldsMonitoring[indexPost] = "○";
                    // #onShceduleColor
                    if (
                      Number(new Date(cm.datePlan).getTime()) >
                      Number(new Date().getTime())
                    ) {
                      this.containerColorStatus.push("#00e9ff");
                    } else {
                      this.containerColorStatus.push("rgba(252, 121, 121, .6)");
                    }
                  }
                  cmObj.fMonitor = fieldsMonitoring;
                  console.log(cmObj);
                  resCm.push(cmObj);
                  cmObj = {};
                  fieldsMonitoring = [
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                  ];
                });
              }
            }
            // console.log(cmItem);
          }
          this.containerCm = resCm;
          let mapCmJson = resCm.map((item, i) => {
            return {
              no: i + 1,
              fline: item.fline,
              fmc_name: item.fmc_name,
              fstart_time: item.fstart_time,
              ferror_name: item.ferror_name,
              fdur: item.fdur,
              cmDesc: item.cmDesc,
              datePlan: item.datePlan,
              pic: item.pic,
              cmTerjadi: item.cmTerjadi ? "V" : "",
              cmLama: item.cmLama ? "V" : "",
              isYokoten: item.isYokoten ? "V" : "",
              judg: item.judg ? "OK" : "Not Yet",
            };
          });
          this.json_data = mapCmJson;
          console.log(this.containerCm);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getLines() {
      axios
        .get(`${process.env.VUE_APP_HOST}/lines`)
        .then((result) => {
          console.log(result.data.data);
          let mapLines = result.data.data.map((line) => {
            return { value: line.fline, text: line.fline };
          });
          this.optionsLines = mapLines;
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
    getMachines() {
      axios
        .get(`${process.env.VUE_APP_HOST}/machines?line=${this.lineSelected}`)
        .then((result) => {
          console.log(result);
          let mapMcs = result.data.data.map((mc) => {
            return { value: mc.fmc_name, text: mc.fmc_name };
          });
          console.log(mapMcs);
          this.optionsMcs = mapMcs;
        })
        .catch((err) => {
          // this.getMachines();
          console.log(err);
        });
    },
    searchCM() {
      this.getAllCm();
    },
    onShowConf(cm) {
      this.showAlarmDialog = true;
      this.selectedCmConf = cm;
    },
    confCmComplete(cm) {
      this.showAlarmDialog = false;
      let filterRawCm = this.rawCm.filter((cmEach) => {
        return cmEach.fid === cm;
      });
      if (
        filterRawCm[0].fpermanet_cm !== "" ||
        filterRawCm[0].fpermanet_cm !== "[]"
      ) {
        let parsePermanentCmLama;
        parsePermanentCmLama = JSON.parse(filterRawCm[0].fpermanet_cm);
        let mapPermanetCm = parsePermanentCmLama.map((permanetCm) => {
          if (permanetCm.cmDesc === this.selectedCmConf.cmDesc) {
            permanetCm.judg = true;
            return permanetCm;
          } else {
            return permanetCm;
          }
        });
        axios
          .post(
            `${
              process.env.VUE_APP_HOST
            }/updateCmFinished?fpermanet_cm=${`"cmDesc":"${mapPermanetCm[0].cmDesc}","datePlan":"${mapPermanetCm[0].datePlan}"`}`,
            {
              fpermamnet_cm: JSON.stringify(mapPermanetCm),
            }
          )
          .then((result) => {
            console.log(result);
            this.getAllCm();
          })
          .catch((err) => {
            console.log(err);
          });
      } else if (
        filterRawCm[0].fpermanet_cm_lama !== "" ||
        filterRawCm[0].fpermanet_cm_lama !== "[]"
      ) {
        let parsePermanentCmLama;
        parsePermanentCmLama = JSON.parse(filterRawCm[0].fpermanet_cm_lama);
        console.log(parsePermanentCmLama);
        console.log(this.selectedCmConf);
        let mapPermanetCmLama = parsePermanentCmLama.map((permanetCm) => {
          if (permanetCm.cmDesc === this.selectedCmConf.cmDesc) {
            permanetCm.judg = true;
            return permanetCm;
          } else {
            return permanetCm;
          }
        });
        axios
          .post(
            `${
              process.env.VUE_APP_HOST
            }/updateCmFinished?fpermanet_cm_lama=${`"cmDesc":"${mapPermanetCmLama[0].cmDesc}","datePlan":"${mapPermanetCmLama[0].datePlan}"`}`,
            {
              fpermamnet_cm_lama: JSON.stringify(mapPermanetCmLama),
            }
          )
          .then((result) => {
            console.log(result);
            this.getAllCm();
          })
          .catch((err) => {
            console.log(err);
          });
      }
      // axios.post();
    },
    permissionCheck() {
      if (localStorage.getItem("role") == "SH") {
        this.isSectionHead = true;
      } else {
        this.isSectionHead = false;
      }
    },
  },
  mounted() {
    this.selectedStartDate = this.formatDate(this.selectedStartDate);
    this.selectedEndDate = this.formatDate(this.selectedEndDate);
    this.fileNameDownload = `Countermeasure Data - ${this.selectedStartDate} to ${this.selectedEndDate}`
    this.isTaskforce = localStorage.getItem("keepTf") ? true : false;
    if (!this.isTaskforce) {
      this.getAllCm();
    }
    this.genereate();
    this.getLines();
    this.permissionCheck();
  },
};
</script>

<style>
thead tr:nth-child(1) th {
  position: sticky;
  top: 0;
}
thead tr:nth-child(2) th {
  position: sticky;
  top: 23px;
}
thead tr:nth-child(3) th {
  position: sticky;
  top: 46px;
}
</style>