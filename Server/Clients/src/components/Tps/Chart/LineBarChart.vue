<template>
  <div style="width: 100%">
    <VueApexCharts
      type="area"
      height="100%"
      width="100%"
      :options="chartOptions"
      :series="series"
    />
  </div>
</template>

<script>
import VueApexCharts from "vue-apexcharts";
export default {
  name: "",
  data() {
    return {
      series: [
        {
          name: "Actual",
          type: "column",
          data: [95, 93, 98, 100, 92, 97, 99, 98, 98, 98, 98, 98],
        },
        {
          name: "Target",
          type: "line",
          data: [95, 93, 98, 100, 92, 97, 99, 98, 98, 98, 98, 98],
        },
      ],
      chartOptions: {
        chart: {
          height: 350,
          type: "line",
        },
        stroke: {
          width: [0, 4],
        },
        title: {
          text: "Cycle Time",
        },
        dataLabels: {
          enabled: false,
          //   enabledOnSeries: [1],
        },
        labels: [
          "01 Jan 2001",
          "02 Jan 2001",
          "03 Jan 2001",
          "04 Jan 2001",
          "05 Jan 2001",
          "06 Jan 2001",
          "07 Jan 2001",
          "08 Jan 2001",
          "09 Jan 2001",
          "10 Jan 2001",
          "11 Jan 2001",
          "12 Jan 2001",
        ],
        xaxis: {
          type: "datetime",
        },
        yaxis: [
          {
            title: {
              text: "Detik",
            },
          },
          //   {
          //     opposite: true,
          //     title: {
          //       text: "Social Media",
          //     },
          //   },
        ],
      },
    };
  },
  components: {
    VueApexCharts,
  },
};
</script>