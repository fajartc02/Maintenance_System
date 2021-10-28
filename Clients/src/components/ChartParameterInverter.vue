<template>
  <div>
    <div class="card-header text-center py-0">{{ paramName }}</div>
    <line-chart
      :chart-data="datacollection"
      :options="options"
      class="p-1 py-2"
    ></line-chart>
    <!-- <button @click="fillData()">Randomize</button> -->
  </div>
</template>

<script>
import LineChart from "./LineChart.js";

export default {
  components: {
    LineChart,
  },
  data() {
    return {
      datacollection: null,
      options: null,
      label: [],
      paramName: "",
    };
  },
  watch: {
    propsChartData: function () {},
  },
  props: {
    propsChartData: Array,
  },
  mounted() {
    console.log(this.propsChartData);
    console.log("cahrt inverter");
    let nameParam = this.propsChartData[0].fparamName;
    let nameMc = this.propsChartData[0].fmachine;
    this.paramName = `${nameMc}-${nameParam}`;
    let mapValInv = this.propsChartData.map((param) => {
      return param.fvalue;
    });
    // let mapBgColor = this.propsChartData.map(() => {
    //   return "green";
    // });
    // let mapBorderColor = this.propsChartData.map(() => {
    //   return "green";
    // });
    let mapTime = this.propsChartData.map((param) => {
      return param.fupdate.split("T")[0];
    });
    this.datacollection = {
      labels: mapTime,
      datasets: [
        {
          label: nameParam,
          backgroundColor: "black",
          data: mapValInv,
          fill: false,
          borderColor: "green",
        },
      ],
    };
    this.options = {
      legend: {
        display: false,
      },
      scales: {
        yAxes: [
          {
            ticks: {
              fontSize: 10,
              // suggestedMin: mapMin[0],
              // suggestedMax: mapMax[0],
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
};
</script>

<style>
#line-chart {
  height: 350px !important;
}
</style>