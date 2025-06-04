<template>
  <div>
    <bar-chart :chart-data="datacollection" :options="options"></bar-chart>
  </div>
</template>

<script>
import BarChart from "./BarChart.js";
// import axios from "axios";
import { mapActions, mapState } from "vuex";

export default {
  components: {
    BarChart,
  },
  data() {
    return {
      datacollection: [],
      options: {},
      labels: [],
      dataDur: [],
      machineSelected: "",
      label: "",
      bgColor: ["#00b6ff", "#00b6ff", "#00b6ff", "#00b6ff", "#00b6ff"],
      isLP: false,
      isDC: false,
      isCAM: false,
      isCR: false,
      isCB: false,
      isCH: false,
      isAssy: false,
      showDialog: false,
      dialog: false,
      isShow: false,
      containerProblem: [],
      isMc: false,
      isProblem: false,
      panelLp: [0, 1],
      panelDc: [0, 1],
      panelCam: [0, 1],
      panelCr: [0, 1],
      panelCh: [0, 1],
      panelCb: [0, 1],
      panelAssy: [0, 1],
      panel: [0, 1],
      isLoading: false,
    };
  },
  computed: {
    ...mapState(["stateGraphClick"]),
  },
  watch: {
    datacollection: function () {
      //   console.log("dataCollectionChanges");
    },
    labels: function () {
      this.fillData();
    },
    dataDur: function () {},
    machineSelected: function () {
      this.getDetailsProblem(this.machineSelected);
    },
    stateGraphClick: function () {
      // this.dialog = true;
      this.containerProblem = this.stateGraphClick;
      this.isLoading = false;
      console.log(this.stateGraphClick);
    },
    propsChartData: function () {
      console.log("cahrt param");
      console.log(this.propsChartData);
      this.datacollection = {
        labels: ["1", "2", "3", "4"],
        datasets: [
          {
            label: "",
            backgroundColor: ["#3758dd", "#3758dd", "#3758dd", "#3758dd"],
            data: [200, 300, 500, 600],
            fill: true,
            // borderColor: "#3242",
          },
        ],
      };
      this.options = {
        legend: {
          display: false,
        },
        title: {
          display: true,
          text: "TEST",
        },
        scales: {
          yAxes: [
            {
              ticks: {
                fontSize: 10,
                suggestedMin: 0,
                suggestedMax: 1000,
              },
              gridLines: {
                color: "rgba(0, 0, 0, 0)",
              },

              scaleLabel: {
                //   display: true,
                //   labelString: "Params",
                //   fontSize: 25,
              },
            },
          ],
          xAxes: [
            {
              ticks: {
                fontSize: 10,
                display: true,
              },
              gridLines: {
                color: "rgba(0, 0, 0, 0)",
              },
            },
          ],
        },
      };
    },
  },
  props: {
    propsChartData: Array,
  },
  mounted() {
    console.log("cahrt param");
    console.log(this.propsChartData);
    let mapLabelTime = this.propsChartData.map((ctData) => {
      return ctData.fupdate.split("T")[1].split(".")[0];
    });
    let mapDataCt = this.propsChartData.map((ctData) => {
      return Number(ctData.fcycleTime) / 10;
    });
    let bgColorCt = this.propsChartData.map(() => {
      return "#80f7bb";
    });
    console.log(mapLabelTime);
    this.datacollection = {
      labels: mapLabelTime,
      datasets: [
        {
          label: "",
          backgroundColor: bgColorCt,
          data: mapDataCt,
          fill: true,
          // borderColor: "#3242",
        },
      ],
    };
    this.options = {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: `Cycletime Machine ${this.propsChartData[0].fMachine}`,
      },
      scales: {
        yAxes: [
          {
            ticks: {
              fontSize: 10,
              suggestedMin: 0,
              // suggestedMax: 250,
            },
            gridLines: {
              color: "rgba(0, 0, 0, 0)",
            },
            scaleLabel: {
              display: true,
              labelString: "Second",
              fontSize: 9,
            },
          },
        ],
        xAxes: [
          {
            ticks: {
              fontSize: 10,
              display: true,
            },
            gridLines: {
              color: "rgba(0, 0, 0, 0)",
            },
            scaleLabel: {
              display: true,
              labelString: "Time",
              fontSize: 9,
            },
          },
        ],
      },
    };
  },
  methods: {
    ...mapActions([""]),
    fillData() {
      this.datacollection = {
        labels: this.labels,
        datasets: [
          {
            label: "Seconds",
            backgroundColor: this.bgColor,
            data: this.dataDur,
          },
        ],
      };
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
    resetTable() {
      console.log("CLICK");
      this.containerProblem = [];
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
    displayTable() {
      document.getElementById("content-expander").style.display = "block";
    },
  },
};
</script>

<style>
.v-dialog .v-dialog--active {
  margin: 0px !important;
}
td {
  font-size: 10px;
}
.v-expansion-panel-content__wrap {
  padding: 0px !important;
}
</style>
