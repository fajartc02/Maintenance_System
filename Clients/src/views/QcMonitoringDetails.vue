<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col">
        <h2>DETAILS DEFECT {{ defectSelected }}</h2>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <v-select
          :items="stratificationItems"
          v-model="selectedStra"
          outlined
          label="Stratification By:"
        ></v-select>
      </div>
      <!-- <div class="col">
        <v-select
          :items="valueItems"
          v-model="selectedValue"
          :disabled="valueItems.length == 0"
          outlined
          :label="selectedStra"
        ></v-select>
      </div> -->
    </div>
    <div class="row">
      <div class="col card">
        <ChartParetoDefect :labelData="valueItems" :defectData="totalDefect" />
      </div>
    </div>
    <div class="row" style="display: none">
      <div class="col">
        <img
          src="@/assets/stratificationZansha.png"
          alt="strazansha"
          style="width: 100%; height: 100%"
        />
        <div
          style="
            position: absolute;
            top: 78px;
            left: 70px;
            background-color: transparent;
            width: 245px;
            height: 55px;
            border: 1px solid red;
          "
        >
          <!-- top 5 ~ 40 -->
          <!-- left 10 ~ 225 -->
          <div style="background-color: white; position: absolute; top: -30px">
            Total: {{ totalDefectIn.length }} defect
          </div>
          <div
            v-for="item in totalDefectIn"
            :key="item.topPos"
            :style="`
              position: absolute;
              top: ${item.topPos}px;
              left: ${item.leftPos}px;
              background-color: red;
              width: 10px;
              height: 10px;
              border-radius: 5px;
              border: 1px solid black`"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ChartParetoDefect from "@/components/ChartParetoDefect";
import axios from "axios";

export default {
  name: "QcMonitoringDetails",
  data() {
    return {
      defectSelected: "",
      stratificationItems: [
        "Defect Area",
        "IKDM machine",
        "IKCM machine",
        "die Core",
        "die IKDM",
        "shift",
        "cell",
      ],
      colDb: [
        "fdefect_area",
        "frelated_ikdm",
        "frelated_tv_core",
        "fdie_core_no",
        "fdie_ikdm_no",
        "fshift",
        "fcell",
      ],
      totalDefectIn: [],
      selectedStra: "",
      valueItems: [],
      selectedValue: "",
      labelContainer: [],
      totalDefect: [],
    };
  },
  watch: {
    selectedStra: function () {
      console.log(this.selectedStra);
      let ikdmMcs = [
        "IKDM-001",
        "IKDM-002",
        "IKDM-003",
        "IKDM-004",
        "IKDM-005",
      ];
      let ikcmMcs = [
        "IKCM-001",
        "IKCM-002",
        "IKCM-003",
        "IKCM-004",
        "IKCM-005",
        "IKCM-006",
      ];
      let dieCore = ["N1", "N2", "N3", "N4", "N5"];
      let dieIkdm = ["N1", "N2", "N3", "N4", "N5"];
      let shifts = ["RED", "WHITE"];
      let cells = ["A", "B"];
      let defectAreas = ["IN", "EX"];
      if (this.selectedStra == "IKDM machine") {
        this.valueItems = ikdmMcs;
      } else if (this.selectedStra == "die Core") {
        this.valueItems = dieCore;
      } else if (this.selectedStra == "die IKDM") {
        this.valueItems = dieIkdm;
      } else if (this.selectedStra == "shift") {
        this.valueItems = shifts;
      } else if (this.selectedStra == "cell") {
        this.valueItems = cells;
      } else if (this.selectedStra == "IKCM machine") {
        this.valueItems = ikcmMcs;
      } else if (this.selectedStra == "Defect Area") {
        this.valueItems = defectAreas;
      }

      if (this.selectedStra != "") {
        this.fetchingQcData();
      }
    },
    selectedValue: function () {
      if (this.selectedValue != "") {
        console.log(
          `FETCHING DATA: ${this.selectedStra} = ${this.selectedValue}`
        );
        // this.fetchingQcData();
      }
    },
  },
  components: {
    ChartParetoDefect,
  },
  methods: {
    randomTop() {
      return Math.floor(Math.random() * (40 - 5 + 1) + 5);
    },
    randomLeft() {
      return Math.floor(Math.random() * (225 - 10 + 1) + 10);
    },
    fillData() {
      for (let i = 0; i < 100; i++) {
        let obj = {
          leftPos: this.randomLeft(),
          topPos: this.randomTop(),
        };
        this.totalDefectIn.push(obj);
      }
    },
    fetchingQcData() {
      axios(
        `${process.env.VUE_APP_HOST}/getAllQcData?selectParams={"key":"${
          this.colDb[this.stratificationItems.indexOf(this.selectedStra)]
        }", "value": "${this.valueItems}"}`
      )
        .then((result) => {
          console.log(result);
          let mapLength = result.data.data.map((item) => {
            console.log(item);
            if (item.length > 0) {
              return item.length;
            } else {
              return 0;
            }
          });
          console.log(mapLength);
          this.totalDefect = mapLength;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    // console.log(this.$route.query.defect);
    // this.fillData();
    if (this.$route.query.defect) {
      this.defectSelected = this.$route.query.defect;
    }
  },
};
</script>