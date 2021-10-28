<template>
  <div class="container-fluid">
    <!-- SESARCH -->
    <b-tabs class="mt-3" content-class="mt-3">
      <b-tab title="Casting">
        <div class="row justify-content-between">
          <!-- SIDE MENU -->
          <div class="col-lg-2 card bg-light">
            <span class="text-left">Select Machine:</span>
            <b-form-select
              v-model="selectedMachines"
              :options="optionsMcs"
            ></b-form-select>
            <b-form-checkbox
              v-for="(param, i) in paramListCasting"
              :key="i"
              class="text-left"
              :style="`${i == 0 ? 'margin-top: 50px' : ''}`"
              v-model="param.selected"
            >
              {{ param.ftemp_name }}
            </b-form-checkbox>
          </div>
          <!-- CONTENT -->
          <div class="col-lg-10">
            <h3 class="text-left title">Parameter Graph</h3>

            <div class="row m-0 p-0">
              <div
                class="col-12 d-flex justify-content-center"
                style="z-index: 1"
              >
                <div
                  id="content-search"
                  class="card disable-active-card shadow w-100"
                >
                  <div class="card-header title-text p-0 px-2 text-left">
                    Search
                  </div>
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
                    <!-- <div class="row m-0">
                      <div class="col-6 p-0 pr-1">
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
                              <span>{{ item }}</span>
                            </v-chip>
                            <span v-if="index === 1" class="grey--text caption">
                              (+{{ selectedMachines.length - 1 }} others)
                            </span>
                          </template>
                        </v-select>
                      </div>
                      <div class="col-6 p-0">
                        <v-select
                          v-model="selectedParameters"
                          :items="parameters"
                          :disabled="isParamInActive"
                          :label="`${
                            isLoading ? 'loading' : 'select parameter'
                          }`"
                          multiple
                        >
                          <template
                            v-slot:selection="{ item, index }"
                            style="font-size: 0.6rem !important"
                          >
                            <v-chip v-if="index === 0">
                              <span>{{ item }}</span>
                            </v-chip>
                            <span v-if="index === 1" class="grey--text caption">
                              (+{{ selectedParameters.length - 1 }} others)
                            </span>
                          </template>
                        </v-select>
                      </div>
                    </div> -->
                    <!-- <div class="row m-0">
                      <div class="col-12 d-flex justify-content-end p-0">
                        <button
                          type="button"
                          class="btn btn-primary"
                          @click="searchParams()"
                        >
                          Search
                          <i class="fa fa-search"></i>
                        </button>
                      </div>
                    </div> -->
                  </div>
                </div>
              </div>
            </div>
            <div class="row m-0">
              <div class="col p-0">
                <h2>SYMPTOM MANAGEMENT</h2>
                {{ timeNow }}
              </div>
            </div>
            <div class="row m-0">
              <div class="col p-0 d-flex justify-content-start">
                <button class="btn btn-danger" @click="showSetting()">
                  <i class="fa fa-cog"></i>
                </button>
                <v-dialog v-model="dialogShow" persistent width="500">
                  <v-card>
                    <v-card-title class="headline grey lighten-2">
                      Setting Parameter
                    </v-card-title>

                    <v-card-text class="p-0">
                      <div class="container-fluid">
                        <div class="row m-0">
                          <div class="col-12 text-left">
                            <div class="input-group mb-3">
                              <div class="input-group-prepend">
                                <span class="input-group-text" id="basic-addon1"
                                  >Setting LL (Pressure CH)</span
                                >
                              </div>
                              <input
                                type="number"
                                v-model="lowerSetPressCh"
                                class="form-control"
                                placeholder="Username"
                                aria-label="Username"
                                aria-describedby="basic-addon1"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </v-card-text>

                    <v-divider></v-divider>

                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <button
                        type="button"
                        @click="submitSetting()"
                        class="btn btn-success"
                      >
                        Submit
                      </button>
                      <button
                        type="button"
                        class="btn btn-secondary"
                        data-dismiss="modal"
                        @click="clearSubmit()"
                      >
                        Close
                      </button>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </div>
            </div>
            <div v-if="isLoading" class="row m-0">
              <div class="col">
                <i class="fa fa-refresh fa-spin" style="font-size: 30px"></i>
              </div>
            </div>
            <div class="row m-0 mt-2">
              <div v-for="(data, i) in chartData" :key="i" class="col-12 p-0">
                <div class="card mt-2 disable-active-card">
                  <apexChartParameter :propsChartData="data" />
                  <!-- <ChartParameter :propsChartData="data" /> -->
                </div>
              </div>
            </div>
            <v-dialog
              class="bg-danger"
              v-model="showAlarmDialog"
              persistent
              width="500"
            >
              <v-card>
                <v-card-title class="headline yellow lighten-2">
                  Warning
                </v-card-title>
                <v-card-text class="p-0">
                  {{ dialogAlarm }}
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <button
                    type="button"
                    @click="showAlarmDialog = false"
                    class="btn btn-success"
                  >
                    OK
                  </button>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </div>
        </div>
      </b-tab>
      <b-tab title="Machining">
        <!-- SIDE MENU -->
        <div class="row justify-content-between">
          <div class="col-lg-2 card bg-light">
            <span class="text-left">Select Machine:</span>
            <b-form-select
              v-model="selectedMachinesFanuc"
              :options="optionsMcsFanuc"
            ></b-form-select>
            <!-- <b-form-input v-model="findParameter" placeholder="Find Parameter"></b-form-input> -->
            <b-form-checkbox
              v-for="(param, i) in paramListMachining"
              :key="i"
              class="text-left"
              :style="`${i == 0 ? 'margin-top: 50px' : ''};width: 20px!important`"
              v-model="param.selected"
            >
              {{ param.ftemp_name }}
            </b-form-checkbox>
          </div>
          <!-- CONTENT -->
        <div class="col-lg-10">
            <h3 class="text-left title">Parameter Graph</h3>

            <div class="row m-0 p-0">
              <div
                class="col-12 d-flex justify-content-center"
                style="z-index: 1"
              >
                <div
                  id="content-search"
                  class="card disable-active-card shadow w-100"
                >
                  <div class="card-header title-text p-0 px-2 text-left">
                    Search
                  </div>
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
                  </div>
                </div>
              </div>
            </div>
            <div class="row m-0">
              <div class="col p-0">
                <h2>SYMPTOM MANAGEMENT</h2>
                {{ timeNow }}
              </div>
            </div>
            <div class="row m-0">
              <div class="col p-0 d-flex justify-content-start">
                <button class="btn btn-danger" @click="showSetting()">
                  <i class="fa fa-cog"></i>
                </button>
                <v-dialog v-model="dialogShow" persistent width="500">
                  <v-card>
                    <v-card-title class="headline grey lighten-2">
                      Setting Parameter
                    </v-card-title>

                    <v-card-text class="p-0">
                      <div class="container-fluid">
                        <div class="row m-0">
                          <div class="col-12 text-left">
                            <div class="input-group mb-3">
                              <div class="input-group-prepend">
                                <span class="input-group-text" id="basic-addon1"
                                  >Setting LL (Pressure CH)</span
                                >
                              </div>
                              <input
                                type="number"
                                v-model="lowerSetPressCh"
                                class="form-control"
                                placeholder="Username"
                                aria-label="Username"
                                aria-describedby="basic-addon1"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </v-card-text>

                    <v-divider></v-divider>

                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <button
                        type="button"
                        @click="submitSetting()"
                        class="btn btn-success"
                      >
                        Submit
                      </button>
                      <button
                        type="button"
                        class="btn btn-secondary"
                        data-dismiss="modal"
                        @click="clearSubmit()"
                      >
                        Close
                      </button>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </div>
            </div>
            <div v-if="isLoading" class="row m-0">
              <div class="col">
                <i class="fa fa-refresh fa-spin" style="font-size: 30px"></i>
              </div>
            </div>
            <div class="row m-0 mt-2" v-if="chartDataFanuc.length > 0">
              <div v-for="(data, i) in chartDataFanuc" :key="i" class="col-12 p-0">
                <div class="card mt-2 disable-active-card">
                  <apexChartParameterFanuc :propsChartData="data" />
                </div>
              </div>
            </div>
            <div class="row m-0 mt-2" v-else>
              <div class="col-lg-12 text-center">
              <h1>Please Select One or More Parameters</h1>
              </div>
            </div>
            <v-dialog
              class="bg-danger"
              v-model="showAlarmDialog"
              persistent
              width="500"
            >
              <v-card>
                <v-card-title class="headline yellow lighten-2">
                  Warning
                </v-card-title>
                <v-card-text class="p-0">
                  {{ dialogAlarm }}
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <button
                    type="button"
                    @click="showAlarmDialog = false"
                    class="btn btn-success"
                  >
                    OK
                  </button>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </div>
        </div>
      </b-tab>
      <b-tab title="Assembly" disabled> </b-tab>
    </b-tabs>
  </div>
</template>

<script>
// import { ModelSelect } from "vue-search-select";
import axios from "axios";
// import ChartParameter from "@/components/ChartParameter.vue";
// import ChartParameterInverter from "@/components/ChartParameterInverter.vue";
import FormData from "form-data";
import moment from "moment";
import apexChartParameter from "@/components/apexChartParameter.vue";
import apexChartParameterFanuc from "@/components/apexChartParameterFanuc.vue";

export default {
  name: "RealtimeParameter",
  data() {
    return {
      isShow: false,
      dialogShow: false,
      showAlarmDialog: false,
      dialogAlarm: "",
      isLoading: false,
      status: false,
      selectedStartDate: new Date(this.getMonday(new Date())),
      selectedEndDate: new Date(),
      optionsLines: [
        { value: "1", text: "aa" + " - " + "1" },
        { value: "2", text: "ab" + " - " + "2" },
        { value: "3", text: "bc" + " - " + "3" },
        { value: "4", text: "cd" + " - " + "4" },
        { value: "5", text: "de" + " - " + "5" },
      ],
      optionsMcs: [],
      optionsMcsFanuc: [],
      selectedMachinesFanuc: ['IMSP_0095'],
      lineSelected: "",
      selectedMachines: ["IKDM-001"],
      parameters: [],
      selectedParameters: [],
      selectedParametersFanuc: [],
      chartData: [],
      chartDataFanuc: [],
      isParamInActive: true,
      lowerSetPressCh: 660,
      timeNow: "",

      paramListCasting: [],
      paramListMachining: [],
      paramListAssy: [],
      filterParam: []
    };
  },
  watch: {
    lineSelected: function () {
      // console.log("changes");
    },
    selectedMachines: function () {
      console.log(this.selectedMachines);
      this.selectedParameters = [];
      this.isParamInActive = true;
      if (this.selectedMachines.length > 0) {
        this.isLoading = true;
        this.getParamName();
      } else {
        this.isParamInActive = true;
      }
    },
    paramListCasting: {
      handler: async function (val) {
        console.log(val);
        this.selectedParameters = [];
        await val.forEach((item) => {
          if (item.selected) {
            console.log(item);
            this.selectedParameters.push(item.ftemp_name);
          }
        });
        await this.searchParams();
      },
      deep: true,
    },
    selectedMachinesFanuc: function() {
      this.getParamNameFanuc(this.selectedMachinesFanuc)
    },
    selectedEndDate: function() {
      if(this.selectedMachinesFanuc) {
        this.getParamsFanuc()
      }
    },
    paramListMachining: {
      handler: async function (val) {
        console.log(val);
        this.selectedParametersFanuc = [];
        await val.forEach((item) => {
          if (item.selected) {
            this.selectedParametersFanuc.push(item.name)
          }
        });
        // if(this.selectedMachinesFanuc.length > 0)
        await this.getParamsFanuc();
      },
      deep: true,
    },
    findParameter:function() {
      console.log(this.findParameter);
      // let paramTemp = this.paramListMachining
      // let mapParam = this.paramListMachining.filter(item => {
      //   return item
      // })
    }
  },
  methods: {
    clearSubmit() {
      this.dialogShow = false;
    },
    showSetting() {
      this.dialogShow = true;
    },
    submitSetting() {
      this.searchParams();
    },
    showSearch() {},
    sendNotif(noReceiver, messsage) {
      // var axios = require("axios");
      // var FormData = require("form-data");

      var data = new FormData();
      data.append(
        "token",
        "BfsLoRiDyDU4MJfzCZEZDNbubWob7OIjvo2un9TDwCbF4Lt5OP"
      );
      data.append("phone", noReceiver);
      data.append("message", messsage);

      var config = {
        method: "post",
        url: "https://ruangwa.com/v2/api/send-message.php",
        // headers: {
        //   ...data.getHeaders(),
        // },
        data: data,
      };

      axios(config)
        .then(function (response) {
          console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
          console.log(error);
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
    getLines() {
      axios
        .get(`${process.env.VUE_APP_HOST}/lines`)
        .then((result) => {
          // console.log(result.data.data);
          let mapLines = result.data.data.map((line) => {
            return { value: line.fline, text: line.fline };
          });
          //   console.log(mapLines);
          this.optionsLines = mapLines;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getMachines() {
      axios
        .get(`${process.env.VUE_APP_HOST}/machines?line=${this.lineSelected}`)
        .then((result) => {
          // console.log(result);
          let mapMcs = result.data.data.map((mc) => {
            return { value: mc.fmc_name, text: mc.fmc_name };
          });
          this.optionsMcs = mapMcs;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getMachinesFanuc() {
      axios.get('http://192.168.1.41:4000/fanuc/groups?isMachine=true')
      .then(result => {
        console.log(result);
        let mapMcs = result.data.data.map((mc) => {
          return { value: mc.displayName, text: mc.displayName };
          });
          this.optionsMcsFanuc = mapMcs
      })
      .catch(err => {
        console.log(err);
      })
    },
    async getParamNameFanuc(mc) {
      await axios.get(`http://192.168.1.41:4000/fanuc/params?mc=${mc}`)
      .then(result => {
        console.log(result);
        let mapParamName = result.data.data.map((item) => {
          item.ftemp_name = item.name.split('_path') ? item.name.split('_path')[0] : item.name
          item.selected = false
          return item
        })
        this.paramListMachining = mapParamName
      })
      .catch(err => {
        console.log(err);
      })
    },
    async getDistinctParams() {
      await axios
        .get(
          `${process.env.VUE_APP_HOST}/parameter/get/parameters?reqColName=fmc_name`
        )
        .then((result) => {
          console.log(result);
          let mapSelected = result.data.data.map((item) => {
            item.selected = false;
            item.ftemp_name =
              item.ftemp_name.length < 19
                ? item.ftemp_name
                : item.ftemp_name.slice(0, 18);
            return item;
          });
          this.paramListCasting = mapSelected;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async getParamName() {
      await axios
        .get(
          `${process.env.VUE_APP_HOST}/paramsName?machines=${this.selectedMachines}`
        )
        .then((result) => {
          let mapParams = result.data.data.map((param, i) => {
            let obj = {
              ftemp_name:
                param.ftemp_name.length < 19
                  ? param.ftemp_name
                  : param.ftemp_name,
              selected: false,
            };
            if (i == 3) {
              obj.selected = true;
            }
            return obj;
          });
          this.parameters = mapParams;
          this.paramListCasting = mapParams;
          // this.selectedParameters.push(this.parameters);
          this.isParamInActive = false;
          this.isLoading = false;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async getAvailableParamMcs() {
      await axios
        .get(`${process.env.VUE_APP_HOST}/availableParamMc`)
        .then((result) => {
          let mapMcs = result.data.data.map((param) => {
            return param.fmc_name;
          });
          this.optionsMcs = mapMcs;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getParams(
      // mc = ["IKDM-001", "IKDM-002", "IKDM-003", "IKDM-004", "IKDM-005"],
      mc = ["IKDM-001", "IKDM-002", "IKDM-003"],
      param = ["PRESSURE CH"]
    ) {
      this.isLoading = true;
      // this.selectedMachines = mc;
      // this.selectedParameters = param;
      let containerQuery = "";
      let arrQuery = [];
      for (let i = 0; i < mc.length; i++) {
        var machine = mc[i];
        for (let j = 0; j < param.length; j++) {
          // AND DATE(fupdate) >= DATE('${this.selectedEndDate}') AND DATE(fupdate) <= DATE('${this.selectedEndDate}')
          containerQuery += `SELECT fvalue_01 AS fval, fmc_name, fupdate, ftemp_name, WUL, WLL, fdiv, funit FROM tb_temperature_log where fmc_name = '${machine}'`;
          let subQUery = ` AND ftemp_name = '${param[j]}' ORDER BY fupdate DESC LIMIT 100`;
          containerQuery += `${subQUery}`;
          subQUery = ``;
          arrQuery.push(containerQuery);
          containerQuery = ``;
        }
      }
      axios
        .get(
          `${
            process.env.VUE_APP_HOST
          }/temperature?containerQuery=${arrQuery.join(";")}`
        )
        .then((result) => {
          // console.log(result.data.data);
          if (result.data.data) {
            let raw = result.data.data;
            raw.forEach((paramsData) => {
              let rawData = paramsData.reverse();
              // console.log(rawData);
              let mapRawData = rawData.map((data) => {
                let obj = {};
                // console.log(data);
                obj.data = Number(data.fval);
                obj.fupdate = `${data.fupdate.split("T")[1].split(".")[0]}`;
                obj.mcName = data.fmc_name;
                obj.funit = data.funit;
                obj.fdiv = data.fdiv ? data.fdiv : 1;
                if (data.WUL != null) {
                  obj.Ul = data.WUL;
                  if (data.funit == "m/s") {
                    obj.max = Number(data.WUL) + 2;
                    obj.min = Number(data.WLL) - 2;
                  } else {
                    obj.max = Number(data.WUL) + 10;
                    obj.min = Number(data.WLL) - 10;
                  }
                  obj.Ll = data.WLL;
                }
                // if (data.ftemp_name.includes("PRESSURE CH")) {
                //   obj.Ul = 685;
                //   obj.Ll = this.lowerSetPressCh;
                //   obj.min = 650;
                //   obj.max = 695;
                // } else {
                //   obj.Ul = 725;
                //   obj.Ll = 690;
                //   obj.min = 680;
                //   obj.max = 730;
                // }
                obj.paramName = data.ftemp_name;
                // console.log(obj);
                return obj;
              });
              this.chartData.push(mapRawData);
              console.log(this.chartData);
            });
            this.isLoading = false;
          }
        })
        .catch((err) => {
          console.log(err);
          // this.getParams(mc = ["IKDM-001", "IKDM-002", "IKDM-003", "IKDM-004", "IKDM-005"],param = ["PRESSURE CH"])
          this.isLoading = false;
        });
    },
    async searchParams() {
      if (this.selectedMachines.length < 1 || this.selectedParameters < 1) {
        alert("please select machine and parameter first!");
      } else {
        // CHECK MACHINE NOT SIMILIAR
        // if (this.selectedMachines.indexOf()) this.chartData = [];
        this.isLoading = true;
        let containerQuery = "";
        let arrQuery = [];
        this.chartData = [];
        // for (let i = 0; i < this.selectedMachines.length; i++) {
        var machine = this.selectedMachines;
        for (let j = 0; j < this.selectedParameters.length; j++) {
          containerQuery += `SELECT fvalue_01 AS fval, fmc_name, fupdate, ftemp_name, WUL, WLL, fdiv, funit FROM tb_temperature_log where fmc_name = '${machine}' AND DATE(fupdate) >= DATE('${this.selectedStartDate}') AND DATE(fupdate) <= DATE('${this.selectedEndDate}')`;
          let subQUery = ` AND ftemp_name = '${this.selectedParameters[j]}' ORDER BY fupdate DESC LIMIT 100`;
          containerQuery += `${subQUery}`;
          subQUery = ``;
          arrQuery.push(containerQuery);
          containerQuery = ``;
        }
        // }
        // console.log(this.selectedParameters);
        // console.log(this.selectedMachines);
        // console.log(arrQuery);
        let resQuery;
        if (arrQuery.length == 1) {
          resQuery = arrQuery[0];
        } else {
          resQuery = arrQuery.join(";");
        }
        await axios
          .get(
            `${process.env.VUE_APP_HOST}/temperature?containerQuery=${resQuery}`
          )
          .then((result) => {
            if (result.data.data) {
              let raw = result.data.data;
              this.dialogShow = false;
              console.log(raw);
              if (raw[0][1]) {
                raw.forEach((paramsData) => {
                  // if(paramsData.length > 0) {}
                  let rawData = paramsData.reverse();
                  let mapRawData = rawData.map((data) => {
                    let obj = {};
                    obj.data = Number(data.fval).toFixed(1);
                    obj.fupdate = `${data.fupdate.split("T")[1].split(".")[0]}`;
                    obj.mcName = data.fmc_name;
                    obj.funit = data.funit;
                    obj.fdiv = data.fdiv ? data.fdiv : 1;
                    if (data.WUL != null) {
                      if (Number(data.WUL) < -1) {
                        obj.Ul = data.WUL;
                        obj.max = Number(data.WUL) - 100;
                        obj.Ll = data.WLL;
                        obj.min = Number(data.WLL) + 100;
                      } else {
                        if (data.funit == "m/s") {
                          obj.max = Number(data.WUL) + 2;
                          obj.min = Number(data.WLL) - 2;
                        } else {
                          obj.max = Number(data.WUL) + 10;
                          obj.min = Number(data.WLL) - 10;
                        }
                        obj.Ul = data.WUL;
                        obj.Ll = data.WLL;
                      }
                    }
                    obj.paramName = data.ftemp_name;
                    // console.log(obj);
                    return obj;
                  });
                  this.chartData.push(mapRawData);
                  // this.selectedParameters = [];
                });
              } else {
                let rawData = raw.reverse();
                let mapRawData = rawData.map((data) => {
                  let obj = {};
                  obj.data = Number(data.fval);
                  obj.fupdate = data.fupdate.split("T")[1].split(".")[0];
                  obj.mcName = data.fmc_name;
                  obj.funit = data.funit;
                  obj.fdiv = data.fdiv ? data.fdiv : 1;
                  if (data.WUL != null) {
                    obj.Ul = data.WUL;
                    obj.max = Number(data.WUL) + 10;
                    obj.Ll = data.WLL;
                    obj.min = Number(data.WLL) - 10;
                  }
                  obj.paramName = data.ftemp_name;
                  // console.log(obj);
                  return obj;
                });
                this.chartData.push(mapRawData);
              }
              this.isLoading = false;
            } else {
              alert("Data tidak ada");
              this.isLoading = false;
            }
          })
          .catch((err) => {
            console.log(err);
            this.isLoading = false;
          });
      }
    },
    async getParamsFanuc() {
      console.log(this.selectedMachinesFanuc);
      console.log(this.selectedParametersFanuc);
      this.isLoading = true
      this.chartDataFanuc = []
      if(this.selectedParametersFanuc.length > 0) {
        axios.get(`http://192.168.1.41:4000/fanuc/data?mc=${[this.selectedMachinesFanuc].length > 1 ? [this.selectedMachinesFanuc].join(','): [this.selectedMachinesFanuc][0]}&param=${this.selectedParametersFanuc.length > 1 ? this.selectedParametersFanuc.join(','): this.selectedParametersFanuc[0]}&start=${this.selectedStartDate}&end=${this.selectedEndDate}`)
        .then(result => {
          console.log(result);
          if (result.data.data) {
              let raw = result.data.data;
              this.dialogShow = false;
              console.log(raw);
              if (raw[0][1]) {
                raw.forEach((paramsData) => {
                  // if(paramsData.length > 0) {}
                  let rawData = paramsData.reverse();
                  let mapRawData = rawData.map((data) => {
                    let obj = {};
                    obj.data = Number(data.fval);
                    obj.fupdate = `${data.fupdate.split("T")[1].split(".")[0]}`;
                    obj.mcName = data.fmc_name;
                    obj.funit = data.funit;
                    obj.fdiv = data.fdiv ? data.fdiv : 1;
                    if (data.WUL != null) {
                      if (Number(data.WUL) < -1) {
                        obj.Ul = data.WUL;
                        obj.max = Number(data.WUL) - 100;
                        obj.Ll = data.WLL;
                        obj.min = Number(data.WLL) + 100;
                      } else {
                        if (data.funit == "m/s") {
                          obj.max = Number(data.WUL) + 2;
                          obj.min = Number(data.WLL) - 2;
                        } else {
                          obj.max = Number(data.WUL) + 10;
                          obj.min = Number(data.WLL) - 10;
                        }
                        obj.Ul = data.WUL;
                        obj.Ll = data.WLL;
                      }
                    }
                    obj.paramName = data.ftemp_name;
                    // console.log(obj);
                    return obj;
                  });
                  this.chartDataFanuc.push(mapRawData);
                  // this.selectedParameters = [];
                });
              } else {
                let rawData = raw.reverse();
                let mapRawData = rawData.map((data) => {
                  let obj = {};
                  obj.data = Number(data.fval);
                  obj.fupdate = data.fupdate.split("T")[1].split(".")[0];
                  obj.mcName = data.fmc_name;
                  obj.funit = data.funit;
                  obj.fdiv = data.fdiv ? data.fdiv : 1;
                  if (data.WUL != null) {
                    obj.Ul = data.WUL;
                    obj.max = Number(data.WUL) + 10;
                    obj.Ll = data.WLL;
                    obj.min = Number(data.WLL) - 10;
                  }
                  obj.paramName = data.ftemp_name;
                  // console.log(obj);
                  return obj;
                });
                this.chartDataFanuc.push(mapRawData);
              }
              this.isLoading = false;
            } else {
              alert("Data tidak ada");
              this.isLoading = false;
            }
        })
        .catch(err => {
          console.log(err);
        })
      } else {
        this.isLoading = false
      }
    },
    getMonday(d) {
      d = new Date(d);
      var day = d.getDay(),
        diff = d.getDate() - day + (day == 0 ? -6 : 1); // adjust when day is sunday
      return new Date(d.setDate(diff));
    },
    intervalTime() {
      let dateConvert = `${moment().format("L").split("/")[1]}/${
        moment().format("L").split("/")[0]
      }/${moment().format("L").split("/")[2]}`;
      this.timeNow = `${dateConvert} ${
        moment().format("MMMM Do YYYY, h:mm:ss a").split(", ")[1]
      }`;
    },
  },
  components: {
    // ChartParameter,
    apexChartParameter,
    apexChartParameterFanuc
    // ChartParameterInverter,
  },
  async mounted() {
    this.isLoading = true;
    this.selectedStartDate = this.formatDate(this.selectedStartDate);
    this.selectedEndDate = this.formatDate(this.selectedEndDate);
    // this.showSearch();
    // this.getParamName();
    await this.getMachinesFanuc()
    await this.getAvailableParamMcs();
    await this.getParamName();
    // await this.getParams();
    // await this.getDistinctParams();
    let dateConvert = `${moment().format("L").split("/")[1]}/${
      moment().format("L").split("/")[0]
    }/${moment().format("L").split("/")[2]}`;
    this.timeNow = `${dateConvert} ${
      moment().format("MMMM Do YYYY, h:mm:ss a").split(", ")[1]
    }`;
    let intervalStart = setInterval(this.intervalTime, 100);
    console.log(intervalStart);
  },
};
</script>

<style scoped>
span {
  font-size: 10px;
}
</style>
<style>
.v-select__selections {
  font-size: 0.8rem;
}
.v-text-field {
  padding: 0px;
  margin: 0px;
}
.disable-active-card:active {
  background-color: transparent !important;
}
</style>