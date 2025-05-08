<template>
  <div class="container-fluid p-0">
    <!-- SESARCH -->
    <div class="row m-0 p-0">
      <div class="col-12 d-flex justify-content-center py-1" style="z-index: 1">
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
              <div class="col-6 p-0">
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <span class="input-group-text" id="basic-addon1">Line</span>
                  </div>
                  <model-select
                    :options="optionsLines"
                    v-model="lineSelected"
                    placeholder="select line"
                    style="width: 70%; font-size: 10px; color: black"
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
                    placeholder="All"
                    style="width: 60%; font-size: 10px; color: black"
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
                <button class="btn btn-primary p-0 px-3" @click="onSearch()">
                  <i class="fa fa-search"></i>
                </button>
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
    <!-- Table -->
    <div class="row m-0 mt-3">
      <div class="col py-0">
        <h2 style="font-size: 20px">Table History</h2>
      </div>
    </div>
    <div class="row m-0 mt-1 mx-4 mb-2">
      <div class="col p-0 px-2">
        <download-excel
          class="btn btn-primary"
          :data="json_data"
          :fields="json_fields"
          worksheet="My Worksheet"
          :name="fileNameDownload"
        >
          Download Excel
        </download-excel>
      </div>
    </div>
    <div class="row m-0 mt-1 mx-4 mb-2">
      <div class="col p-0 px-2">
        <div class="btn btn-outline-dark w-100" @click="getFreqProblem()">
          Freq. Problem
        </div>
      </div>
      <div class="col p-0 px-2">
        <div class="btn btn-outline-dark w-100" @click="getLtbProblem()">
          LTB
        </div>
      </div>
    </div>
    <div class="row m-0 mt-1 mx-4 mb-2">
      <div class="col p-0" style="background-color: #ff7f7f">
        5 Why Belum di isi
      </div>
      <div class="col p-0" style="background-color: #ffffa0">
        C/M Belum di isi
      </div>
    </div>
    <div class="row m-0" style="font-size: 9px; padding: 0px">
      <div class="col p-0">
        <Spinner-2 v-if="isLoading" />
        <h4 v-if="containerProblems.length === 0 && !isLoading">
          Tidak Ada Problem
        </h4>
        <table
          class="table table-striped table-dark table-responsive text-left"
          style="max-height: 350px"
          v-if="containerProblems.length !== 0 && !isLoading"
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
          <tbody>
            <tr
              v-for="(problem, i) in containerProblems"
              :key="problem.fid"
              :style="`background-color: ${problem.bgCol}!important;color:${problem.txtCol}`"
            >
              <th scope="row">{{ i + 1 }}</th>
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
                  tabindex="-1"
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
        </table>
      </div>
    </div>
    <div v-if="btnSeeAllProblem" class="row m-0">
      <div class="col p-0">
        <button class="btn btn-primary" @click="getProblemHistory()">
          See All Problems
        </button>
      </div>
    </div>
    <!-- Card TEMP Problem -->
    <div style="padding-bottom: 90px; display: none">
      <div class="row m-0 mt-4">
        <div class="col-12 text-center text-light title-text p-0">
          <h2 style="font-size: 15px">
            Problem Temporary Bulan Ini (> 30 Min)
          </h2>
        </div>
      </div>
      <div class="row m-0 p-0">
        <div class="col p-0">
          <!-- RED -->
          <div class="row mb-1 m-0">
            <div class="col-12 text-center">
              <button
                class="btn btn-outline-danger w-100 disabled"
                style="font-size: 10px"
              >
                RED
              </button>
            </div>
          </div>
          <div class="row m-0">
            <div class="col-4">
              <div class="card bg-dark shadow">
                <div class="row">
                  <div class="col-12 d-flex justify-content-center">
                    <button
                      class="btn btn-outline-info disabled w-100"
                      style="font-size: 10px"
                    >
                      Casting
                    </button>
                  </div>
                </div>
                <div class="row">
                  <div
                    class="col-12 d-flex justify-content-center text-light"
                    style="font-size: 20px"
                  >
                    <b
                      id="castProbNotCloseRed"
                      class="sevenDisplay text-danger"
                      >{{ probCastRed.length }}</b
                    >
                  </div>
                </div>
                <div class="row">
                  <div
                    class="col-12 d-flex justify-content-center text-light"
                    style="font-size: 10px"
                  >
                    <button
                      class="btn btn-warning mt-1"
                      style="font-size: 8px"
                      @click="getProblemNotClose('probCastRed')"
                    >
                      See Problems
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-4">
              <div class="card bg-dark shadow">
                <div class="row">
                  <div class="col-12 d-flex justify-content-center">
                    <button
                      class="btn btn-outline-info disabled w-100"
                      style="font-size: 10px"
                    >
                      Machining
                    </button>
                  </div>
                </div>
                <div class="row">
                  <div
                    class="col-12 d-flex justify-content-center text-light"
                    style="font-size: 20px"
                  >
                    <b
                      id="machProbNotCloseRed"
                      class="sevenDisplay text-danger"
                      >{{ probMachRed.length }}</b
                    >
                  </div>
                </div>
                <div class="row">
                  <div
                    class="col-12 d-flex justify-content-center text-light"
                    style="font-size: 10px"
                  >
                    <button
                      class="btn btn-warning mt-1"
                      style="font-size: 8px"
                      @click="getProblemNotClose('probMachRed')"
                    >
                      See Problems
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-4">
              <div class="card bg-dark shadow">
                <div class="row">
                  <div class="col-12 d-flex justify-content-center">
                    <button
                      class="btn btn-outline-info disabled w-100"
                      style="font-size: 10px"
                    >
                      Assembly
                    </button>
                  </div>
                </div>
                <div class="row">
                  <div
                    class="col-12 d-flex justify-content-center text-light"
                    style="font-size: 20px"
                  >
                    <b
                      id="assyProbNotCloseRed"
                      class="sevenDisplay text-danger"
                      >{{ probAssyRed.length }}</b
                    >
                  </div>
                </div>
                <div class="row">
                  <div
                    class="col-12 d-flex justify-content-center text-light"
                    style="font-size: 10px"
                  >
                    <button
                      class="btn btn-warning mt-1"
                      style="font-size: 8px"
                      @click="getProblemNotClose('probAssyRed')"
                    >
                      See Problems
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- WHITE -->
          <div class="row m-0 mb-1">
            <div class="col-12 text-center">
              <button
                class="btn btn-outline-dark w-100 disabled text-dark"
                style="font-size: 10px"
              >
                WHITE
              </button>
            </div>
          </div>
          <div class="row m-0">
            <div class="col-4">
              <div class="card bg-dark shadow">
                <div class="row">
                  <div class="col-12 d-flex justify-content-center">
                    <button
                      class="btn btn-outline-info disabled w-100"
                      style="font-size: 10px"
                    >
                      Casting
                    </button>
                  </div>
                </div>
                <div class="row">
                  <div
                    class="col-12 d-flex justify-content-center text-light"
                    style="font-size: 20px"
                  >
                    <b
                      id="castProbNotCloseWhite"
                      class="sevenDisplay text-danger"
                      >{{ probCastWhite.length }}</b
                    >
                  </div>
                </div>
                <div class="row">
                  <div
                    class="col-12 d-flex justify-content-center text-light"
                    style="font-size: 10px"
                  >
                    <button
                      class="btn btn-warning mt-1"
                      style="font-size: 8px"
                      @click="getProblemNotClose('probCastWhite')"
                    >
                      See Problems
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-4">
              <div class="card bg-dark shadow">
                <div class="row">
                  <div class="col-12 d-flex justify-content-center">
                    <button
                      class="btn btn-outline-info disabled w-100"
                      style="font-size: 10px"
                    >
                      Machining
                    </button>
                  </div>
                </div>
                <div class="row">
                  <div
                    class="col-12 d-flex justify-content-center text-light"
                    style="font-size: 20px"
                  >
                    <b
                      id="machProbNotCloseWhite"
                      class="sevenDisplay text-danger"
                      >{{ probMachWhite.length }}</b
                    >
                  </div>
                </div>
                <div class="row">
                  <div
                    class="col-12 d-flex justify-content-center text-light"
                    style="font-size: 10px"
                  >
                    <button
                      class="btn btn-warning mt-1"
                      style="font-size: 8px"
                      @click="getProblemNotClose('probMachWhite')"
                    >
                      See Problems
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-4">
              <div class="card bg-dark shadow">
                <div class="row">
                  <div class="col-12 d-flex justify-content-center">
                    <button
                      class="btn btn-outline-info disabled w-100"
                      style="font-size: 10px"
                    >
                      Assembly
                    </button>
                  </div>
                </div>
                <div class="row">
                  <div
                    class="col-12 d-flex justify-content-center text-light"
                    style="font-size: 20px"
                  >
                    <b
                      id="assyProbNotCloseWhite"
                      class="sevenDisplay text-danger"
                      >{{ probAssyWhite.length }}</b
                    >
                  </div>
                </div>
                <div class="row">
                  <div
                    class="col-12 d-flex justify-content-center text-light"
                    style="font-size: 10px"
                  >
                    <button
                      class="btn btn-warning mt-1"
                      style="font-size: 8px"
                      @click="getProblemNotClose('probAssyWhite')"
                    >
                      See Problems
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ModelSelect } from "vue-search-select";
import axios from "axios";
import JsonExcel from "vue-json-excel";
import Spinner2 from "@/components/spinner/Spinner-2";
// import ExportExcelSheetVueJs from "export-excel-sheet-vue-js";

export default {
  name: "ProblemHistory",
  data() {
    return {
      optionsLines: [
        { value: "1", text: "aa" + " - " + "1" },
        { value: "2", text: "ab" + " - " + "2" },
        { value: "3", text: "bc" + " - " + "3" },
        { value: "4", text: "cd" + " - " + "4" },
        { value: "5", text: "de" + " - " + "5" },
      ],
      optionsMcs: [
        { value: "1", text: "A" },
        { value: "2", text: "B" },
        { value: "3", text: "B" },
        { value: "4", text: "B" },
        { value: "5", text: "B" },
      ],
      lineSelected: "",
      isShow: true,
      selectedStartDate: new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        1
      ),
      selectedEndDate: new Date(),
      containerProblems: [],
      isLoading: false,
      machineSelected: "",
      problemSelected: "",
      probTempLp: [],
      probTempDc: [],
      probTempCam: [],
      probTempCr: [],
      probTempCh: [],
      probTempCb: [],
      probTempAssy: [],
      probCastRed: [],
      probCastWhite: [],
      probMachRed: [],
      probMachWhite: [],
      probAssyRed: [],
      probAssyWhite: [],
      btnSeeAllProblem: false,
      json_fields: {
        No: "no",
        Date: "fstart_time",
        Line: "fline",
        Machine: "fmachine",
        Category: "fav_categoty",
        Problem: "ferror_name",
        "Duration (min)": "fdur",
        // Min: "min",
        // "Min/Hour": "minHour",
        Pic: "foperator",
        Shift: "fshift",
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
      fileNameDownload: ``,
    };
  },
  watch: {
    lineSelected: function () {
      if (this.lineSelected !== undefined) {
        console.log("changes");
        localStorage.setItem("lineSelected", this.lineSelected);
        this.getMachines();
      } else {
        this.lineSelected = "";
      }
    },
    machineSelected: function () {
      if (this.machineSelected !== undefined) {
        console.log("changes");
        localStorage.setItem("machineSelected", this.machineSelected);
      } else {
        this.machineSelected = "";
      }
    },
    problemSelected: function () {
      if (this.problemSelected !== undefined) {
        console.log("changes");
        localStorage.setItem("problemSelected", this.problemSelected);
      } else {
        this.problemSelected = "";
      }
    },
    selectedStartDate: function () {
      this.fileNameDownload = `ProblemHistory_${this.selectedStartDate}_${this.selectedEndDate}.xls`;
      if (this.selectedStartDate !== undefined) {
        localStorage.setItem(
          "selectedStartDate",
          this.formatDate(this.selectedStartDate)
        );
      } else {
        this.selectedStartDate = this.formatDate(
          new Date(new Date().getFullYear(), new Date().getMonth(), 1)
        );
        this.selectedEndDate = this.formatDate(new Date());
      }
    },
    selectedEndDate: function () {
      if (this.selectedEndDate !== undefined) {
        localStorage.setItem(
          "selectedEndDate",
          this.formatDate(this.selectedEndDate)
        );
      } else {
        this.selectedEndDate = this.formatDate(new Date());
      }
    },
    containerProblems: function () {
      console.log("BERUBAH CONTAINER PROBLEMS");
      if (this.containerProblems.length > 0) {
        let mapProblem = this.containerProblems.map((item, i) => {
          return {
            no: `${i + 1}`,
            fstart_time: `${item.fstart_time.split("T")[0]}`,
            fline: item.fline,
            fmachine: item.fmc_name,
            fav_categoty: item.fav_categoty,
            ferror_name: `${item.ferror_name}`,
            fdur: `${item.fdur}`,
            // min: 60,
            // minHour: ``,
            foperator: `${item.foperator}`,
            fshift: `${item.fshift == "w" ? "WHITE" : "RED"}`,
          };
        });
        // console.log("this map problem");
        // console.log(mapProblem);
        this.json_data = mapProblem;
      }
    },
  },
  methods: {
    showSearch() {
      if (this.isShow) {
        document.getElementById("content-search").style.top = "-50px";
        this.isShow = false;
      } else {
        document.getElementById("content-search").style.top = "-210px";
        this.isShow = true;
      }
    },
    async getProblemHistory() {
      this.isLoading = true;
      this.btnSeeAllProblem = false;
      await axios
        .get(
          `${process.env.VUE_APP_HOST}/problemHistory?startDate=${this.selectedStartDate}&endDate=${this.selectedEndDate}`
        )
        .then((result) => {
          console.log(result.data.data);
          // this.containerProblems = result.data.data;
          let resData = result.data.data.map((item) => {
            if (item.fdur >= 30) {
              if (item.freal_prob == "" || !item.freal_prob) {
                return {
                  ...item,
                  bgCol: "#ff7f7f",
                  txtCol: "black",
                };
              } else if (item.fpermanet_cm == "" || item.fpermanet_cm == "[]") {
                return {
                  ...item,
                  bgCol: "#ffffa0",
                  txtCol: "black",
                };
              }
            }
            return {
              ...item,
              bgCol: "#302e2e",
              txtCol: "white",
            };
          });
          this.containerProblems = resData;
          this.isLoading = false;
        })
        .catch((err) => {
          // this.getProblemHistory()
          this.isLoading = false;
          console.log(err);
        });
    },
    async onSearch() {
      this.isLoading = true;
      let url = `${process.env.VUE_APP_HOST}/problemHistory?startDate=${this.selectedStartDate}&endDate=${this.selectedEndDate}&isProblem=false`;
      if (this.machineSelected != "") {
        url += `&machine=${this.machineSelected}`;
      }
      if (this.lineSelected != "") {
        url += `&line=${this.lineSelected}`;
      }
      if (this.problemSelected != "") {
        url += `&problem=${this.problemSelected}`;
      }
      await axios
        .get(`${url}`)
        .then((result) => {
          console.log(result.data.data);
          let resData = result.data.data.map((item) => {
            if (item.fdur >= 30) {
              if (item.freal_prob == "" || !item.freal_prob) {
                return {
                  ...item,
                  bgCol: "#ff7f7f",
                  txtCol: "black",
                };
              } else if (item.fpermanet_cm == "" || item.fpermanet_cm == "[]") {
                return {
                  ...item,
                  bgCol: "#ffffa0",
                  txtCol: "black",
                };
              }
            }
            return {
              ...item,
              bgCol: "#302e2e",
              txtCol: "white",
            };
          });
          this.containerProblems = resData;
          this.isLoading = false;
        })
        .catch((err) => {
          // this.onSearch();
          this.isLoading = false;
          console.log(err);
        });
    },
    async getLines() {
      await axios
        .get(`${process.env.VUE_APP_HOST}/lines`)
        .then((result) => {
          console.log(result.data.data);
          let mapLines = result.data.data.map((line) => {
            return { value: line.fline, text: line.fline };
          });
          //   console.log(mapLines);
          this.optionsLines = mapLines;
        })
        .catch((err) => {
          // this.getLines();
          console.log(err);
        });
    },
    async getFreqProblem() {
      let url = `${process.env.VUE_APP_HOST}/problemFreq?startDate=${this.selectedStartDate}&endDate=${this.selectedEndDate}`;
      if (this.machineSelected !== "" && this.machineSelected !== undefined) {
        url += `&fmc=${this.machineSelected}`;
      }
      if (this.lineSelected !== "" || this.lineSelected !== undefined) {
        url += `&fline=${this.lineSelected}`;
      }
      await axios
        .get(url)
        .then((result) => {
          console.log(result.data.data);
          let resData = result.data.data.map((item) => {
            if (item.fdur >= 30) {
              if (item.freal_prob == "" || !item.freal_prob) {
                return {
                  ...item,
                  bgCol: "#ff7f7f",
                  txtCol: "black",
                };
              } else if (item.fpermanet_cm == "" || item.fpermanet_cm == "[]") {
                return {
                  ...item,
                  bgCol: "#ffffa0",
                  txtCol: "black",
                };
              }
            }
            return {
              ...item,
              bgCol: "#302e2e",
              txtCol: "white",
            };
          });
          this.containerProblems = resData;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async getLtbProblem() {
      let url = `${process.env.VUE_APP_HOST}/problemLtb?startDate=${this.selectedStartDate}&endDate=${this.selectedEndDate}`;
      if (this.machineSelected !== "" && this.machineSelected !== undefined) {
        url += `&fmc=${this.machineSelected}`;
      }
      if (this.lineSelected !== "" || this.lineSelected !== undefined) {
        url += `&fline=${this.lineSelected}`;
      }
      await axios
        .get(url)
        .then((result) => {
          console.log(result.data.data);
          let resData = result.data.data.map((item) => {
            if (item.fdur >= 30) {
              if (item.freal_prob == "" || !item.freal_prob) {
                return {
                  ...item,
                  bgCol: "#ff7f7f",
                  txtCol: "black",
                };
              } else if (item.fpermanet_cm == "" || item.fpermanet_cm == "[]") {
                return {
                  ...item,
                  bgCol: "#ffffa0",
                  txtCol: "black",
                };
              }
            }
            return {
              ...item,
              bgCol: "#302e2e",
              txtCol: "white",
            };
          });
          this.containerProblems = resData;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async getMachines() {
      await axios
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
    formatDate(date) {
      var d = new Date(date),
        month = "" + (d.getMonth() + 1),
        day = "" + d.getDate(),
        year = d.getFullYear();

      if (month.length < 2) month = "0" + month;
      if (day.length < 2) day = "0" + day;

      return [year, month, day].join("-");
    },
    editProblem(vid) {
      this.$router.push(`/editProblem?v_=${vid}`);
    },
    async deleteProblem(_v) {
      await axios
        .delete(`${process.env.VUE_APP_HOST}/deleteProblem/${_v}`)
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
    async getProblemTemporary() {
      let url = `${process.env.VUE_APP_HOST}/problemTemporary`;
      await axios
        .get(url)
        .then((result) => {
          let containerStateProb = [
            "probTempLp",
            "probTempDc",
            "probTempCam",
            "probTempCr",
            "probTempCh",
            "probTempCb",
            "probTempAssy",
          ];
          // 0: white | 1: red
          let probWhite = [1, 3, 5, 7, 9, 11, 13];
          let probRed = [0, 2, 4, 6, 8, 10, 12];
          if (result.data.data) {
            for (let i = 0; i < probWhite.length; i++) {
              this[`${containerStateProb[i]}`].push(
                result.data.data[probWhite[i]],
                result.data.data[probRed[i]]
              );
            }
            let arrConcatMachRed = result.data.data[4];
            this.probMachRed = arrConcatMachRed
              .concat(result.data.data[6])
              .concat(result.data.data[8])
              .concat(result.data.data[10]);

            let arrConcatCastRed = result.data.data[0];
            this.probCastRed = arrConcatCastRed.concat(result.data.data[2]);

            let arrConcatAssyRed = result.data.data[13];
            this.probAssyRed = arrConcatAssyRed;

            let arrConcatMachWhite = result.data.data[5];
            this.probMachWhite = arrConcatMachWhite
              .concat(result.data.data[7])
              .concat(result.data.data[9])
              .concat(result.data.data[11]);

            let arrConcatCastWhite = result.data.data[1];
            this.probCastWhite = arrConcatCastWhite.concat(result.data.data[3]);

            let arrConcatAssyWhite = result.data.data[12];
            this.probAssyWhite = arrConcatAssyWhite;
          }
        })
        .catch((err) => {
          console.err(err);
        });
    },
    getProblemNotClose(keyLine) {
      this.isLoading = true;
      this.btnSeeAllProblem = true;
      this.containerProblems = this[`${keyLine}`];
      this.isLoading = false;
    },
  },
  components: {
    ModelSelect,
    downloadExcel: JsonExcel,
    Spinner2,
    // ExportExcelSheetVueJs,
  },
  async mounted() {
    await this.getLines();
    // this.getProblemTemporary();
    let isStorage = false;
    if (localStorage.getItem("lineSelected")) {
      if (localStorage.getItem("machineSelected")) {
        this.machineSelected = localStorage.getItem("machineSelected");
      }
      this.lineSelected = localStorage.getItem("lineSelected");
      isStorage = true;
    } else {
      this.lineSelected = "";
      this.machineSelected = "";
      isStorage = false;
    }
    if (localStorage.getItem("problemSelected")) {
      this.problemSelected = localStorage.getItem("problemSelected");
    } else {
      this.problemSelected = "";
    }
    if (localStorage.getItem("selectedStartDate")) {
      this.selectedStartDate = this.formatDate(
        localStorage.getItem("selectedStartDate")
      );
      this.selectedEndDate = this.formatDate(
        localStorage.getItem("selectedEndDate")
      );
    } else {
      this.selectedStartDate = this.formatDate(this.selectedStartDate);
      this.selectedEndDate = this.formatDate(this.selectedEndDate);
    }
    if (isStorage) {
      await this.onSearch();
    } else {
      await this.getProblemHistory();
    }
  },
};
</script>

<style>
.cell {
  color: black;
}

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
th,
td {
  padding-top: 2px !important;
  padding-bottom: 2px !important;
  padding-left: 1px !important;
  padding-right: 1px !important;
}
td,
th {
  vertical-align: middle !important;
}
.v-btn__content {
  font-size: 7px;
}
</style>