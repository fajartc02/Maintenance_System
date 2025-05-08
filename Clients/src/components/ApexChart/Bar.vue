<template>
  <div id="chart">
    <apexchart
      type="bar"
      height="190"
      width="100%"
      :options="chartOptions"
      :series="series"
    ></apexchart>
  </div>
</template>

<script>
import VueApexCharts from "vue-apexcharts";
export default {
  components: {
    apexchart: VueApexCharts,
  },
  name: "Bar",
  data() {
    return {
      series: this.propsData.data,
      chartOptions: {
        // annotations: {
        //   points: [
        //     {
        //       x: "Bananas",
        //       seriesIndex: 0,
        //       label: {
        //         borderColor: "#775DD0",
        //         offsetY: 0,
        //         style: {
        //           color: "#fff",
        //           background: "#775DD0",
        //         },
        //         text: "Bananas are good",
        //       },
        //     },
        //   ],
        // },
        chart: {
          height: 190,
          type: "bar",
          toolbar: {
            show: false,
          },
          events: {
            click: function (event, chartContext, config) {
              console.log(event);
              console.log(chartContext);
              console.log(config);
              // The last parameter config contains additional information like `seriesIndex` and `dataPointIndex` for cartesian charts
            },
          },
        },
        title: {
          text: this.propsData.title,
          align: "left",
          margin: 10,
          offsetX: 0,
          offsetY: 0,
          floating: false,
          style: {
            fontSize: "14px",
            fontWeight: "bold",
            fontFamily: undefined,
            color: "#263238",
          },
        },
        colors: ["#B32824", "#1A73E8", "#1A73E8", "#1A73E8", "#1A73E8"],
        plotOptions: {
          bar: {
            distributed: true,
            // borderRadius: 10,
            // columnWidth: "50%",
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          width: 2,
        },

        grid: {
          //   row: {
          //     colors: ["#fff", "#f2f2f2"],
          //   },
        },
        xaxis: {
          labels: {
            // rotate: -45,
          },
          categories: this.propsData.labels,
          //   tickPlacement: "on",
        },
        yaxis: {
          title: {
            text: "Freq",
          },
        },
        // fill: {
        //   type: "gradient",
        //   //   gradient: {
        //   //     shade: "light",
        //   //     type: "horizontal",
        //   //     shadeIntensity: 0.25,
        //   //     gradientToColors: undefined,
        //   //     inverseColors: true,
        //   //     opacityFrom: 0.85,
        //   //     opacityTo: 0.85,
        //   //     stops: [50, 0, 100],
        //   //   },
        // },
        legend: {
          show: false,
        },
      },
    };
  },
  props: {
    propsData: Object,
  },
};
</script>