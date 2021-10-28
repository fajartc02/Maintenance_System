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
    // console.log(this.propsChartData);
    // console.log("cahrt param");
    // console.log(this.propsChartData);
    let mapLabel = this.propsChartData.map((data) => {
      if (data.fupdate) {
        return data.fupdate;
      }
    });
    this.paramName = `${this.propsChartData[0].paramName} - ${this.propsChartData[0].mcName}`;
    // console.log(mapLabel);
    let mapVal = this.propsChartData.map((data) => {
      if (data.data) {
        return Number((data.data * (data.fdiv ? data.fdiv : 1)).toFixed(2));
      }
    });
    let mapUl = this.propsChartData.map((data) => {
      if (data.Ul) {
        return data.Ul;
      }
    });
    let mapWul = this.propsChartData.map((data) => {
      if (data.Ul) {
        let ranged = ((data.Ul - data.Ll) * 10) / 100;
        return data.Ul - ranged;
      }
    });
    let mapWll = this.propsChartData.map((data) => {
      if (data.Ll) {
        let ranged = ((data.Ul - data.Ll) * 10) / 100;
        return data.Ll + ranged;
      }
    });
    let mapLl = this.propsChartData.map((data) => {
      if (data.Ll) {
        return data.Ll;
      }
    });
    let mapBgColor = this.propsChartData.map(() => {
      return "rgb(2, 244, 83, 0.7)";
    });
    let mapBgColorUl = this.propsChartData.map(() => {
      return "rgb(255, 96, 96, 0.2)";
    });
    let mapBgColorWul = this.propsChartData.map(() => {
      return "rgb(255, 239, 102, 0.2)";
    });
    // let mapMin = this.propsChartData.map((data) => {
    //   return data.min;
    // });
    // let mapMax = this.propsChartData.map((data) => {
    //   return data.max;
    // });
    // console.log(mapVal);
    this.datacollection = {
      labels: mapLabel,
      datasets: [
        {
          label: "Lower Limit",
          backgroundColor: mapBgColorUl,
          data: mapLl,
          fill: true,
          borderColor: mapBgColorUl,
        },
        {
          label: "Warning Lower Limit",
          backgroundColor: mapBgColorWul,
          data: mapWll,
          fill: false,
          borderColor: mapBgColorWul,
        },
        {
          label: this.propsChartData[0].paramName,
          backgroundColor: mapBgColor,
          data: mapVal,
          fill: false,
          borderColor: mapBgColor,
        },
        {
          label: "Upper Limit",
          backgroundColor: mapBgColorUl,
          data: mapUl,
          fill: false,
          borderColor: mapBgColorUl,
        },
        {
          label: "Warning Upper Limit",
          backgroundColor: mapBgColorWul,
          data: mapWul,
          fill: false,
          borderColor: mapBgColorWul,
        },
      ],
    };
    this.options = {
      legend: {
        display: false,
      },
      tooltips: {
        callbacks: {
          title: function (value, values) {
            console.log(values);
            return `${value[0].label}`;
          },
          label: (tooltipItem, data) => {
            console.log(data);
            return `${this.propsChartData[0].paramName}: ${tooltipItem.value} ${this.propsChartData[0].funit}`;
          },
        },
      },
      scales: {
        yAxes: [
          {
            ticks: {
              fontSize: 10,
              suggestedMin: this.propsChartData[0].min,
              suggestedMax: this.propsChartData[0].max,
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