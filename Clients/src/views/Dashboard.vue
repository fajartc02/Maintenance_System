<template>
  <div class="container-fluid">
    <div class="row p-0 m-0">
      <div class="col-8 p-0">
        <div class="text-left">
          <h2>Smart Andon System</h2>
          <span>Let's make Smart Factory </span>
          <span style="font-size: 5px">Cycle: {{ cycleCount }}</span>
        </div>
      </div>
      <div class="col-4 p-0 d-flex justify-content-center align-items-center">
        <button
          data-toggle="modal"
          data-target="#exampleModal"
          class="btn btn-outline-danger py-1 px-1"
          style="height: 40px"
          @click="getMachines()"
        >
          <i class="fa fa-bell-o"></i> <strong>Input</strong>
        </button>
      </div>
    </div>
    <!-- Card PRod -->
    <div class="row mt-2">
      <CardProd
        v-for="line in lineAchivements"
        :key="line.name"
        :propsLine="line"
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
                      <h6 class="m-0">STOP (> 10 Min)</h6>
                    </td>
                  </tr>
                  <tr>
                    <td
                      class="bg-danger bordered"
                      style="height: 10px; width: 10px"
                    ></td>
                    <td style="width: 10px"></td>
                    <td>
                      <h6 class="m-0">STOP (> 30 Min)</h6>
                    </td>
                  </tr>
                </thead>
              </table>
            </div>
          </div>
        </div>
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
          </div>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <button type="button" @click="problemInput()" class="btn btn-success">
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

    <!-- LOADING -->
    <v-dialog v-model="isLoading" hide-overlay persistent width="300">
      <v-card color="primary" dark>
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
</template>

<script>
// import ContainerMenu from "@/components/ContainerMenu";
import CardProd from "@/components/CardProd";
import { mapActions, mapState } from "vuex";
import axios from "axios";

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
        if (prod.isStop !== 0) {
          prod.borderStatus = "border-danger";
        } else {
          prod.borderStatus = "border-success";
        }
      });
      if (this.stateProdAchievements) {
        this.cycleCount += 1;
        this.lineAchivements = this.stateProdAchievements;
      }
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
  },
  methods: {
    ...mapActions([
      "storeProdAchievments",
      "storeCountProbTemp",
      "storeGetLines",
      "storeGetMachines",
    ]),
    problemInput() {
      let { problem, operator, fmc_id } = this;
      let obj = {
        ferror_name: problem,
        foperator: operator,
        fmc_id: fmc_id,
      };
      this.isLoading = true;
      if (problem != "" || operator != "" || fmc_id != "") {
        axios
          .post(`${process.env.VUE_APP_HOST}/addProblem`, obj)
          .then((result) => {
            console.log(result);
            this.isLoading = false;
            this.clearSubmit();
            this.storeProdAchievments();
          })
          .catch((err) => {
            console.log(err);
            this.isLoading = false;
          });
      }
    },
    getColorDash() {
      this.storeProdAchievments();
      this.storeCountProbTemp();
      // http://localhost:5001/smartandonsys/us-central1/app/
      axios
        .post(`${process.env.VUE_APP_HOST}/sendNotifWhatsapp`)
        .then((result) => {
          console.log(result);
        })
        .catch((err) => {
          console.log(err);
        });
      // this.fnInterval = setInterval(() => {
      //   this.storeProdAchievments();
      //   this.cycleCount += 1;
      // }, 60000);
    },
    getMachines(first = true) {
      if (first) {
        this.dialog = true;
      }
      axios
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
  },
  components: {
    // ContainerMenu,
    CardProd,
    ModelSelect,
  },
  mounted() {
    this.getColorDash();
    this.getMachines(false);
    if (!localStorage.getItem("name")) {
      this.$router.push("/login");
    }
  },
};
</script>

<style>
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
</style>