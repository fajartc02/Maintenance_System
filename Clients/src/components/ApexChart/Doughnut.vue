<template>
  <div id="chart">
    <apexchart
      type="donut"
      width="100%"
      height="200"
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
  data() {
    return {
      series: this.propsData.data,
      chartOptions: {
        chart: {
          height: 200,
          type: "donut",
          events: {
            // click: function (event, chartContext, config) {
            //   console.log(event);
            //   console.log(chartContext);
            //   console.log(config);
            //   console.log(config.globals.labels);
            //   // The last parameter config contains additional information like `seriesIndex` and `dataPointIndex` for cartesian charts
            // },
            dataPointSelection: function (event, chartContext, config) {
              console.log("test dps");
              console.log(event);
              console.log(chartContext);
              console.log(config);
            },
          },
        },
        plotOptions: {
          pie: {
            startAngle: -90,
            endAngle: 270,
          },
        },
        labels: this.propsData.labels,
        dataLabels: {
          enabled: false,
        },
        colors: this.propsData.colors,
        fill: {
          type: "gradient",
        },
        legend: {
          show: true,
          position: "right",
          horizontalAlign: "center",
          itemMargin: {
            horizontal: 20,
            vertical: 20,
          },
          //   formatter: function (val, opts) {
          //     console.log(opts);
          //     let arrStatus = ["Abnormal Alarm", "Normal Alarm"];
          //     console.log(val);
          //     console.log();
          //     return arrStatus[opts.seriesIndex];
          //   },
        },
        title: {
          text: this.propsData.title,
        },
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200,
              },
              legend: {
                position: "bottom",
              },
            },
          },
        ],
      },
    };
  },
  props: {
    propsData: Object,
  },
};
</script>