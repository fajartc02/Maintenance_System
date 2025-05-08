<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col">
        <h2>Quality Monitoring</h2>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <button class="btn btn-outline-primary w-100" @click="dialog = true">
          Add Record
        </button>
        <v-row justify="center">
          <v-dialog
            v-model="dialog"
            fullscreen
            hide-overlay
            transition="dialog-bottom-transition"
          >
            <v-card>
              <v-toolbar dark color="primary">
                <v-btn icon dark @click="cancelDialog('zansha')">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
                <v-toolbar-title>Input Quality (Zhansa)</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <div class="container-fluid mt-4">
                <div class="row">
                  <div class="col">
                    <v-select
                      :items="shifts"
                      label="Shift"
                      v-model="fshift"
                    ></v-select>
                  </div>
                  <div class="col">
                    <v-text-field
                      v-model="fno_work"
                      label="Work No."
                    ></v-text-field>
                  </div>
                </div>
                <div class="row">
                  <div class="col">
                    <v-select
                      :items="cells"
                      label="Cell"
                      v-model="fcell"
                    ></v-select>
                  </div>
                  <div class="col">
                    <v-select
                      :items="areas"
                      label="Area"
                      v-model="fdefect_area"
                    ></v-select>
                  </div>
                </div>
                <div class="row">
                  <div class="col">
                    <v-select
                      :items="tvCoreMcs"
                      label="IKCM Related"
                      v-model="frelated_tv_core"
                    ></v-select>
                  </div>
                  <div class="col">
                    <v-text-field
                      v-model="fdie_core_no"
                      label="Die Core No."
                    ></v-text-field>
                  </div>
                </div>
                <div class="row">
                  <div class="col">
                    <v-select
                      :items="ikdmMcs"
                      label="IKDM Related"
                      v-model="frelated_ikdm"
                    ></v-select>
                  </div>
                  <div class="col">
                    <v-text-field
                      v-model="fdie_ikdm_no"
                      label="Die IKDM No."
                    ></v-text-field>
                  </div>
                </div>
                <div class="row">
                  <div class="col">
                    <v-text-field
                      label="Value IN"
                      v-model="fvalue_in"
                      :rules="rulesOnlyNumber"
                      hide-details="auto"
                    ></v-text-field>
                  </div>
                  <div class="col">
                    <v-text-field
                      label="Value EX"
                      v-model="fvalue_ex"
                      :rules="rulesOnlyNumber"
                      hide-details="auto"
                    ></v-text-field>
                  </div>
                </div>
                <div class="row">
                  <div class="col">
                    <v-text-field
                      label="Checker"
                      v-model="fchecker"
                      hide-details="auto"
                    ></v-text-field>
                  </div>
                  <div class="col">
                    <input type="date" v-model="fdate" />
                  </div>
                </div>
                <div class="row">
                  <div class="col">
                    <v-btn color="primary" @click="inputProblem('zansha')"
                      >Submit</v-btn
                    >
                  </div>
                </div>
              </div>
            </v-card>
          </v-dialog>
        </v-row>
      </div>
    </div>
    <!-- LOADING -->
    <v-dialog v-model="isLoading" hide-overlay persistent width="300">
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
    <!-- MENU -->
    <div class="row">
      <div class="col d-flex justify-content-center mt-4">
        <div class="card" style="width: 9rem" @click="detailsPage('zansha')">
          <img
            class="card-img-top"
            src="https://2.bp.blogspot.com/-cX_xFROcYdY/W2lvUtoAoNI/AAAAAAAAETU/rS_aHtwxsIoAk660ITl02IgpoXgyXYerwCLcBGAs/s400/blokkepala.JPG"
            alt="Card image cap"
          />
          <div class="card-body">
            <p class="card-text">Zansha</p>
          </div>
        </div>
      </div>
      <div class="col d-flex justify-content-center mt-4">
        <div class="card" style="width: 9rem" @click="stillOnDev()">
          <img
            class="card-img-top"
            src="https://2.bp.blogspot.com/-cX_xFROcYdY/W2lvUtoAoNI/AAAAAAAAETU/rS_aHtwxsIoAk660ITl02IgpoXgyXYerwCLcBGAs/s400/blokkepala.JPG"
            alt="Card image cap"
          />
          <div class="card-body">
            <p class="card-text">Name</p>
          </div>
        </div>
      </div>
      <div class="col d-flex justify-content-center mt-4">
        <div class="card" style="width: 9rem" @click="stillOnDev()">
          <img
            class="card-img-top"
            src="https://2.bp.blogspot.com/-cX_xFROcYdY/W2lvUtoAoNI/AAAAAAAAETU/rS_aHtwxsIoAk660ITl02IgpoXgyXYerwCLcBGAs/s400/blokkepala.JPG"
            alt="Card image cap"
          />
          <div class="card-body">
            <p class="card-text">Ibutsu</p>
          </div>
        </div>
      </div>
      <div class="col d-flex justify-content-center mt-4">
        <div class="card" style="width: 9rem" @click="stillOnDev()">
          <img
            class="card-img-top"
            src="https://2.bp.blogspot.com/-cX_xFROcYdY/W2lvUtoAoNI/AAAAAAAAETU/rS_aHtwxsIoAk660ITl02IgpoXgyXYerwCLcBGAs/s400/blokkepala.JPG"
            alt="Card image cap"
          />
          <div class="card-body">
            <p class="card-text">Keropos</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "QcMonitoring",
  data() {
    return {
      dialog: false,
      rulesOnlyNumber: [
        (v) => new RegExp("^[0-9].+$").test(v) || "Please input number",
      ],
      isLoading: false,
      shifts: ["RED", "WHITE"],
      fshift: "",
      fno_work: "",
      cells: ["A", "B"],
      fcell: "",
      areas: ["IN", "EX"],
      fdefect_area: "",
      tvCoreMcs: [
        "IKCM-001",
        "IKCM-002",
        "IKCM-003",
        "IKCM-004",
        "IKCM-005",
        "IKCM-006",
      ],
      frelated_tv_core: "",
      fdie_core_no: "",
      fdie_ikdm_no: "",
      ikdmMcs: ["IKDM-001", "IKDM-002", "IKDM-003", "IKDM-004", "IKDM-005"],
      frelated_ikdm: "",
      fvalue_in: "",
      fvalue_ex: "",
      fchecker: "",
      fdate: this.formatDate(new Date()),
    };
  },
  watch: {},
  methods: {
    stillOnDev() {
      alert("THIS FEATURE STILL ON DEVELEOPMENT :)");
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
    inputProblem(defect) {
      if (defect == "zansha") {
        this.isLoading = true;
        let newObj = {
          fdate: this.fdate,
          fshift: this.fshift,
          fno_work: this.fno_work,
          fcell: this.fcell,
          fdefect_area: this.fdefect_area,
          frelated_tv_core: this.frelated_tv_core,
          fdie_core_no: this.fdie_core_no.toUpperCase(),
          frelated_ikdm: this.frelated_ikdm,
          fdie_ikdm_no: this.fdie_ikdm_no.toUpperCase(),
          fvalue_in: this.fvalue_in,
          fvalue_ex: this.fvalue_ex,
          fchecker: this.fchecker,
        };
        console.log(newObj);
        axios
          .post(`${process.env.VUE_APP_HOST}/addQcData`, newObj)
          .then((result) => {
            console.log(result);
            this.cancelDialog("zansha");
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    cancelDialog(defect) {
      this.dialog = false;
      this.isLoading = false;
      if (defect == "zansha") {
        this.fdate = "";
        this.fshift = "";
        this.fno_work = "";
        this.fcell = "";
        this.fdefect_area = "";
        this.frelated_tv_core = "";
        this.fdie_core_no = "";
        this.frelated_ikdm = "";
        this.fdie_ikdm_no = "";
        this.fvalue_in = "";
        this.fvalue_ex = "";
        this.fchecker = "";
      }
    },
    detailsPage(defect) {
      this.$router.push(`/qcMonitoring/details?defect=${defect}`);
    },
  },
};
</script>
