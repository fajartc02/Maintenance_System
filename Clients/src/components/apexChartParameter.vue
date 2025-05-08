<template>
  <div id="chart">
    <apexchart
      type="area"
      height="350"
      :options="chartOptions"
      :series="series"
    ></apexchart>
  </div>
</template>

<script>
import ApexChart from "vue-apexcharts";
export default {
  name: "ApexChartParameter",
  data() {
    return {
      series: [
        {
          name: "XYZ MOTORS",
          data: [],
        },
      ],
      chartOptions: {
        chart: {
          //   type: "line",
          type: "area",
          stacked: false,
          height: 350,
          zoom: {
            type: "x",
            enabled: true,
            autoScaleYaxis: true,
          },
          toolbar: {
            autoSelected: "zoom",
          },
        },
        stroke: {
          width: 8,
        },
        dataLabels: {
          enabled: false,
        },
        markers: {
          size: 10,
        },
        title: {
          // text: "Stock Price Movement",
          // align: "left",
        },
        fill: {
          // type: "gradient",
          gradient: {
            // shadeIntensity: 5,
            // inverseColors: false,
            // // opacityFrom: 0.1,
            // // opacityTo: 0,
            // stops: [0, 90, 100],
          },
          pattern: {
            // strokeWidth: 10,
          },
        },
        yaxis: {
          labels: {
            // formatter: function (val) {
            //   return (val / 1000000).toFixed(0);
            // },
          },
          title: {
            text: "Price",
          },
        },
        xaxis: {
          categories: [],
        },
        tooltip: {
          shared: false,
          y: {
            // formatter: function (val) {
            //   return (val / 1000000).toFixed(0);
            // },
          },
        },
      },
      timestamp: [],
      title: "",
      ulData: {
        name: "Upper Limit",
        data: [],
      },
      llData: {
        name: "Lower Limit",
        data: [],
      },
      wulData: {
        name: "Warning Upper Limit",
        data: [],
      },
      wllData: {
        name: "Warning Lower Limit",
        data: [],
      },
      valData: {
        name: "",
        data: [],
      },
      unit: "",
    };
  },
  watch: {
    series: function () {
      console.log("berubah");
    },
    timestamp: function () {
      this.series = [
        this.ulData,
        this.wulData,
        this.valData,
        this.wllData,
        this.llData,
      ];
      this.chartOptions = {
        colors: ["#F44336", "#f6f948", "#00ff37", "#f6f948", "#E91E63"],
        chart: {
          //   type: "line",
          type: "area",
          stacked: false,
          height: 350,
          zoom: {
            type: "x",
            enabled: true,
            autoScaleYaxis: true,
          },
          toolbar: {
            autoSelected: "zoom",
          },
        },
        dataLabels: {
          enabled: false,
        },
        markers: {
          size: 0,
        },
        title: {
          text: this.title,
          align: "left",
        },
        stroke: {
          width: 3,
        },
        fill: {
          type: "gradient",
          gradient: {
            shadeIntensity: 1,
            inverseColors: false,
            opacityFrom: 0.1,
            opacityTo: 0,
            stops: [0, 90, 100],
          },
        },
        yaxis: {
          labels: {
            // formatter: function (val) {
            //   return (val / 1000000).toFixed(0);
            // },
          },
          title: {
            text: this.unit,
          },
        },
        xaxis: {
          categories: this.timestamp,
        },
        tooltip: {
          shared: false,
          y: {
            // formatter: function (val) {
            //   return (val / 1000000).toFixed(0);
            // },
          },
        },
      };
    },
    chartOptions: function () {
      console.log("chart options");
    },
  },
  props: {
    propsChartData: Array,
  },
  components: {
    apexchart: ApexChart,
  },
  mounted() {
    console.log(this.propsChartData);
    let mapVal = this.propsChartData.map((item) => {
      return item.fdiv ? item.data * item.fdiv : item.data * 1;
    });
    let mapTime = this.propsChartData.map((item) => {
      return item.fupdate;
    });
    let mapLl = this.propsChartData.map((item) => {
      return item.Ll;
    });
    let mapUl = this.propsChartData.map((item) => {
      return item.Ul;
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
    this.wulData.data = mapWul;
    this.wllData.data = mapWll;
    this.valData.data = mapVal;
    this.wulData.name = "Warning Upper Limit";
    this.wllData.name = "Warning Lower Limit";
    this.valData.name = this.propsChartData[0].paramName;
    this.ulData.data = mapUl;
    this.llData.data = mapLl;
    this.timestamp = mapTime;
    this.unit = this.propsChartData[0].funit;
    this.title = `${this.propsChartData[0].paramName} (${this.propsChartData[0].mcName})`;
  },
};
</script>