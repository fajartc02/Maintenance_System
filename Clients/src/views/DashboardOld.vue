<template>
  <div class="container p-1">
    <div class="row m-0 p-0 mt-2 bordered">
      <p>
        Hallo, <b>{{ name }}</b>
      </p>
      <div class="col-12 p-0">
        <div class="card container-menu bg-light">
          <div class="row m-0 p-0">
            <a class="col-3 hover-menu p-1"
              href="http://lproms.prd.toyota.co.id/HomeMTPM"
              target="_blank"
              style="text-decoration: none; color: black">
              <center>
                <img
                  src="https://cdn3.iconfinder.com/data/icons/eziconic-v1-0/256/03.png"
                  width="30%"
                />
              </center>
              <center class="card-title">TPM<br />Monitoring</center>
            </a>
            <div class="col-3 hover-menu p-1" @click="goTo('/realtimePareto')">
              <center>
                <img
                  src="https://cdn0.iconfinder.com/data/icons/accounting-and-tax/48/17-512.png"
                  width="30%"
                />
              </center>
              <center class="card-title">Realtime<br />Pareto</center>
            </div>
            <div class="col-3 hover-menu p-1" @click="goTo('/symptompDesktop')">
              <center>
                <img
                  src="https://cdn0.iconfinder.com/data/icons/Utilize/512/Activity_Monitor.png"
                  width="30%"
                />
              </center>
              <center class="card-title">Symptom<br />Mgmt.</center>
            </div>
            <a
              class="col-3 hover-menu p-1"
              href="https://iwms.toyota.co.id"
              target="_blank"
              style="text-decoration: none; color: black"
            >
              <center>
                <img
                  src="https://www.wortis.fr/wp-content/uploads/2018/06/ORDER-512.png"
                  width="30%"
                />
              </center>
              <center class="card-title">Order<br />Spareparts</center>
            </a>
          </div>
          <div class="row m-0 p-0 mt-2 flex-row flex-nowrap overflow-auto">
            <div class="col-3 hover-menu p-1" @click="goTo('/summaryWeekly')">
              <center>
                <img
                  src="https://icon-library.com/images/summary-icon/summary-icon-15.jpg"
                  width="30%"
                />
              </center>
              <center class="card-title">
                Report <br />
                Status
              </center>
            </div>
            <div
              class="col-3 hover-menu p-1"
              v-if="name == 'FAJAR TRI CAHYONO'"
              @click="goTo('/symptompDesktop')"
            >
              <center>
                <img
                  src="https://cdn0.iconfinder.com/data/icons/Utilize/512/Activity_Monitor.png"
                  width="30%"
                />
              </center>
              <center class="card-title">Symptom<br />Desktop</center>
            </div>
            <div class="col-3 hover-menu p-1" @click="goTo('/cmFollowup')">
              <center>
                <img
                  src="https://images.assetsdelivery.com/compings_v2/ahasoft2000/ahasoft20001601/ahasoft2000160101030.jpg"
                  width="30%"
                />
              </center>
              <center class="card-title">CM<br />Followup</center>
            </div>
            <div
              class="col-3 hover-menu p-1"
              @click="goTo('/cycleTimeMachine')"
            >
              <center>
                <img src="@/assets/cycleTime.png" width="30%" />
              </center>
              <center class="card-title">CycleTime<br />Machines</center>
            </div>
            <div class="col-3 hover-menu p-1" @click="goTo('/problemHistory')">
              <center>
                <img
                  src="https://cdn2.iconfinder.com/data/icons/plump-by-zerode_/256/Folder-URL-History-icon.png"
                  width="30%"
                />
              </center>
              <center class="card-title">Problem<br />History</center>
            </div>
            <div class="col-3 hover-menu p-1" @click="goTo('/henkaten')">
              <center>
                <img
                  src="https://iconbug.com/data/75/256/59dd83353b8e6ade996ff4cdd8f99ad0.png"
                  width="30%"
                />
              </center>
              <center class="card-title">Temporary<br />Action List</center>
            </div>
            
            <div
              class="col-3 hover-menu p-1"
              @click="goTo('/registerNewMachine')"
            >
              <center>
                <img src="@/assets/fanuc.png" width="20%" />
              </center>
              <center class="card-title">Register<br />Mc</center>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row m-0 p-0 mt-1">
      <div class="col-12 p-0">
        <div style="width: 100%; display: none" id="reader"></div>
        <div class="card">
          <div
            class="btn btn-info"
            data-toggle="modal"
            data-target="#exampleModal"
            @click="getMachines()"
            style="height: 50px"
          >
            <h1 class="title-text" style="color: black; font-size: 25px">
              <i class="fa fa-bell"></i>
              MACHINE STOP INPUT
              <i class="fa fa-bell"></i>
            </h1>
          </div>
        </div>
        <v-dialog v-model="dialog" persistent width="500">
          <v-card>
            <v-card-title class="headline grey lighten-2">
              Input Problem
            </v-card-title>

            <v-card-text class="p-0">
              <div class="container-fluid p-0 mt-4">
                <div class="row p-0 m-0">
                  <div class="col p-0">
                    <div class="input-group mb-3">
                      <div class="input-group-prepend">
                        <span class="input-group-text">Machine</span>
                      </div>
                      <!-- <v-select :options="machines" style="width: 75%"></v-select> -->
                      <model-select
                        :options="machines"
                        v-model="machineSelected"
                        placeholder="select machine"
                        style="width: 75%"
                      >
                      </model-select>
                    </div>
                  </div>
                </div>
                <div class="row p-0 m-0">
                  <div class="col p-0">
                    <div class="input-group mb-3">
                      <div class="input-group-prepend">
                        <span class="input-group-text" style="min-width: 63px"
                          >Line</span
                        >
                      </div>
                      <input
                        type="text"
                        id="line"
                        v-model="selectedLine"
                        class="form-control pl-2"
                        disabled
                        aria-label="Amount (to the nearest dollar)"
                      />
                    </div>
                  </div>
                </div>
                <div class="row p-0 m-0">
                  <div class="col p-0">
                    <div class="input-group mb-3">
                      <div class="input-group-prepend">
                        <span class="input-group-text">Operator</span>
                      </div>
                      <input
                        type="text"
                        id="operator"
                        v-model="operator"
                        class="form-control"
                        aria-label="Amount (to the nearest dollar)"
                      />
                    </div>
                  </div>
                </div>
                <div class="row p-0 m-0">
                  <div class="col p-0">
                    <div class="input-group mb-3">
                      <div class="input-group-prepend">
                        <span class="input-group-text">Problem</span>
                      </div>
                      <input
                        type="text"
                        id="problem"
                        v-model="problem"
                        class="form-control"
                        aria-label="Amount (to the nearest dollar)"
                      />
                    </div>
                  </div>
                </div>
                <div v-if="setRole == 'Staff'">
                  <input
                    type="checkbox"
                    style="height: 20px"
                    v-model="categoryProblem"
                  />
                  Fullcap
                </div>
              </div>
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
              <v-spacer></v-spacer>
              <button
                type="button"
                @click="problemInput()"
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
    <!-- LOADING -->
    <v-dialog v-model="isLoading" hide-overlay persistent width="300">
      <v-card color="primary" dark>
        <v-card-text>
          Loading...
          <v-progress-linear
            indeterminate
            color="white"
            class="mb-0"
          ></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
    <div class="row m-0 p-0">
      <div class="col-12 p-0">
        {{ timeNow }}
      </div>
    </div>
    <!-- Card PRod -->
    <div class="row m-0 p-0">
      <CardProd
        v-for="line in lineAchivements"
        :key="line.name"
        :propsLine="line"
        :propsLoading="skeletonLoading"
      />
      <div class="col-6 mt-2 px-1 py-0">
        <div
          id="cardProd"
          class="`card shadow bg-dark w-100"
          style="height: 100%"
        >
          <div class="row m-0">
            <div class="col text-left text-light title-text px-1 py-1">
              <h6>Legend</h6>
            </div>
          </div>
          <div class="row m-0">
            <div class="col-12 p-0 px-2">
              <table>
                <thead>
                  <tr class="w-100">
                    <td
                      class="bg-success bordered"
                      style="height: 10px; width: 10px"
                    ></td>
                    <td></td>
                    <td>
                      <h6 class="m-0">RUNNING</h6>
                    </td>
                  </tr>
                  <tr>
                    <td
                      class="bg-warning bordered"
                      style="height: 10px; width: 10px"
                    ></td>
                    <td style="width: 10px"></td>
                    <td>
                      <h6 class="m-0">STOP ( Under 30 Min)</h6>
                    </td>
                  </tr>
                  <tr>
                    <td
                      class="bg-danger bordered"
                      style="height: 10px; width: 10px"
                    ></td>
                    <td style="width: 10px"></td>
                    <td>
                      <h6 class="m-0">STOP (Over 30 Min)</h6>
                    </td>
                  </tr>
                </thead>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import ContainerMenu from "@/components/ContainerMenu";
import CardProd from "@/components/CardProd";
import { mapActions, mapState } from "vuex";
import axios from "axios";
import moment from "moment";

import { ModelSelect } from "vue-search-select";

export default {
  name: "Dashboard",
  data() {
    return {
      lineAchivements: [
        {
          name: "ASSY LINE",
          oee: 100,
          durMtCall: "-",
          durCurrentStop: "-",
          isStop: 0,
          output: "-/-",
        },
        {
          name: "CRANK SHAFT",
          oee: 70,
          durMtCall: "-",
          durCurrentStop: "-",
          isStop: 0,
          output: "-/-",
        },
        {
          name: "CAM SHAFT",
          oee: 80,
          durMtCall: "-",
          durCurrentStop: "-",
          isStop: 0,
          output: "-/-",
        },
        {
          name: "CYLINDER BLOCK",
          oee: 100,
          durMtCall: "-",
          durCurrentStop: "-",
          isStop: false,
          output: "-/-",
        },
        {
          name: "CYLINDER HEAD",
          oee: 100,
          durMtCall: "-",
          durCurrentStop: "-",
          isStop: false,
          output: "-/-",
        },
        {
          name: "LPDC",
          oee: 100,
          durMtCall: "-",
          durCurrentStop: "-",
          isStop: false,
          output: "-/-",
        },
        {
          name: "HPDC",
          oee: 100,
          durMtCall: "-",
          durCurrentStop: "-",
          isStop: false,
          output: "-/-",
        },
      ],
      problem: "",
      selectedLine: "",
      lines: null,
      operator: "",
      machines: ["IMSP-0001", "IMSP-0002"],
      machineSelected: "",
      cycleCount: 0,
      item: [],
      containerRawMachine: [],
      fmc_id: "",
      fnInterval: null,
      dialog: false,
      isLoading: false,
      timeNow: "",
      name: "",
      skeletonLoading: false,
      categoryProblem: false,
      setRole: null,
    };
  },
  computed: {
    ...mapState([
      "stateProdAchievements",
      "countProbTemp",
      "stateLines",
      "stateMachines",
    ]),
  },
  watch: {
    stateProdAchievements: function () {
      console.log("PROD ACH");
      console.log(this.stateProdAchievements);
      this.stateProdAchievements.map((prod) => {
        console.log(prod.durCurrentStop);
        // TEMPORARY
        // if (prod.falias == "LP" || prod.falias == "DC") {
        //   prod.durMtCall = 0;
        // }
        if (
          prod.durCurrentStop >= 0 &&
          prod.durCurrentStop <= 30 &&
          prod.durCurrentStop != null
        ) {
          prod.borderStatus = "border-warning";
          prod.bgStatus = "bg-warning";
        } else if (prod.durCurrentStop > 30 && prod.durCurrentStop != null) {
          prod.borderStatus = "border-danger";
          prod.bgStatus = "bg-danger";
        } else {
          prod.borderStatus = "border-success";
          prod.bgStatus = "bg-success";
        }
      });
      if (this.stateProdAchievements) {
        this.cycleCount += 1;
        this.lineAchivements = this.stateProdAchievements;
      }
      this.isLoading = false;
    },
    countProbTemp: function () {
      console.log(this.countProbTemp[0].totalProb);
    },
    stateLines: function () {
      console.log(this.stateLines);
      this.lines = this.stateLines;
    },
    stateMachines: function () {
      console.log("Machines");
      console.log(this.stateMachines);
      this.stateMachines.map((machine) => {
        return machine.fmc_name;
      });
      this.machines = this.stateMachines;
    },
    machineSelected: function () {
      console.log(this.machineSelected);
      if (this.machineSelected != "") {
        let mcSelected = this.containerRawMachine.map((mc) => {
          if (mc.fmc_name == this.machineSelected) {
            this.fmc_id = mc.fid;
            return mc.fline;
          } else {
            return null;
          }
        });
        console.log(mcSelected.sort());
        this.selectedLine = mcSelected.sort()[0];
      }
    },
    categoryProblem: function () {
      if (this.categoryProblem) {
        this.problem = "[FULLCAP]" + this.problem;
      } else {
        this.problem = this.problem.split("]")[1];
      }
    },
  },
  methods: {
    ...mapActions([
      "storeProdAchievments",
      "storeCountProbTemp",
      "storeGetLines",
      "storeGetMachines",
    ]),
    goTo(link) {
      this.$router.push(link);
    },
    async problemInput() {
      let { problem, operator, fmc_id } = this;
      let obj = {
        ferror_name: problem,
        foperator: operator,
        fmc_id: fmc_id,
      };
      this.isLoading = true;
      if (problem != "" || operator != "" || fmc_id != "") {
        await axios
          .post(`${process.env.VUE_APP_HOST}/addProblem`, obj)
          .then(async (result) => {
            console.log(result);
            if (result.status == 203) {
              alert(result.data.message);
              this.isLoading = false;
            } else {
              this.isLoading = false;
              this.clearSubmit();
              await this.storeProdAchievments();
            }
          })
          .catch((err) => {
            console.log(err);
            this.isLoading = false;
          });
      }
    },
    async getColorDash() {
      this.storeProdAchievments();
      this.storeCountProbTemp();
      await axios
        .get(`${process.env.VUE_APP_HOST}/sendNotifWhatsapp`)
        .then((result) => {
          console.log(result);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async getMachines(first = true) {
      if (first) {
        this.dialog = true;
      }
      await axios
        .get(`${process.env.VUE_APP_HOST}/searchMc`)
        .then((result) => {
          console.log(result.data.data);
          this.containerRawMachine = result.data.data;
          let mapMc = result.data.data.map((mc) => {
            return { value: mc.fmc_name, text: mc.fmc_name };
          });
          console.log(mapMc);
          this.machines = mapMc;
        })
        .catch((err) => {
          console.error(err);
        });
    },
    beforeDestroy() {
      clearInterval(this.fnInterval);
      console.log("BEFORE DESTROY");
    },
    clearSubmit() {
      this.problem = "";
      this.operator = "";
      this.fmc_id = "";
      this.machineSelected = "";
      this.selectedLine = "";
      this.dialog = false;
      this.isLoading = false;
    },
    openExel() {
      window.go("@/assets/excel/TpmSys/TPM Ledger Capacity Based.xlsb");
      // var Excel = new ActiveXObject("Excel.Application");
      // Excel.Visible = true;
      // Excel.Workbooks.Open(
      //   "@/assets/excel/TpmSys/TPM Ledger Capacity Based.xlsb"
      // );
    },
    intervalTime() {
      let dateConvert = `${moment().format("L").split("/")[1]}/${
        moment().format("L").split("/")[0]
      }/${moment().format("L").split("/")[2]}`;
      this.timeNow = `${dateConvert} ${
        moment().format("MMMM Do YYYY, h:mm:ss a").split(", ")[1]
      }`;
    },
    permissionCheck() {
      if (!localStorage.getItem("name")) {
        this.$router.push("/login");
      } else {
        this.name = localStorage.getItem("name");
        this.setRole = localStorage.getItem("role");
        this.operator = this.name;
      }
    },
  },
  components: {
    CardProd,
    ModelSelect,
  },
  async mounted() {
    this.skeletonLoading = true;
    await this.getColorDash();
    await this.permissionCheck();
    // let intervalColDash = setInterval(this.storeProdAchievments, 20000);
    // console.log(intervalColDash);
    await this.getMachines(false);
    let dateConvert = `${moment().format("L").split("/")[1]}/${
      moment().format("L").split("/")[0]
    }/${moment().format("L").split("/")[2]}`;
    this.timeNow = `${dateConvert} ${
      moment().format("MMMM Do YYYY, h:mm:ss a").split(", ")[1]
    }`;
    let intervalStart = setInterval(this.intervalTime, 1000);
    console.log(intervalStart);
  },
};
</script>
<style>
.container-menu {
  /* height: 100%; */
}
.card-title {
  /* font-family: "Bebas Neue", cursive; */
  font-size: 13px;
  margin-bottom: 0px;
  font-weight: 800;
}
.nav-title {
  font-family: "Bebas Neue", cursive;
  font-size: 23px;
  letter-spacing: 3px;
}
#vs1__combobox {
  max-height: 29px;
}
h2 {
  font-family: "Bebas Neue", cursive;
  margin: 0px;
  color: #006b38ff;
}
.title-text {
  font-family: "Bebas Neue", cursive;
  font-size: 16px;
}
.vm-progress__text {
  display: flex !important;
  justify-content: center !important;
}
.vm-progress--circle .vm-progress__text {
  position: flex !important;
  justify-content: center;
  align-items: center;
  color: white !important;
  margin: 0;
  text-align: center;
  transform: translate(0, -50%);
}
strong {
  font-size: 12px;
}
.input-group-text {
  font-size: 10px;
}
.form-control,
.search {
  font-size: 0.6rem;
  padding-left: 4px;
  padding-right: 0px;
  max-height: 29px;
}
.swal2-content {
  padding: 0px;
}
td h6 {
  font-size: 10px;
  color: white;
  text-align: left;
}
.hover-menu:active {
  background-color: rgba(125, 242, 228, 0.7);
  border-radius: 10px;
}
.hover-menu {
  border-radius: 10px;
}
</style>