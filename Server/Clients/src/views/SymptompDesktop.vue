<template>
  <div class="container-fluid" style="margin-top: 30px; height: 100vh">
    
    <router-link to="/symptompMgmt" class="text-left btn btn-outline-info" style="text-decoration: none;color: black">Detail Parameter</router-link>
    <div class="row mt-4 justify-content-around">
      <div class="col-lg-4 p-0">
        <div class="justify-content-around row">
          <div class="col-lg-6 col-xs-12 mt-2">
            <div class="card p-3 shadow-all bg-light text-dark shadow-lg p-0">
              <div class="row text-center">
                <div
                  class="col-8 text-left title-text p-0 p-2 pb-0 text-primary"
                  style="font-size: 32px"
                >
                  {{ totalParams }}
                </div>
                <div
                  class="
                    col
                    text-left
                    title-text
                    p-0 p-2
                    pb-0
                    text-primary text-center
                  "
                  style="font-size: 32px"
                >
                  <i class="fa fa-tachometer" aria-hidden="true"></i>
                </div>
              </div>
              <div class="row">
                <div class="col text-left p-0 p-2 pt-0 text-secondary">
                  <span class="title-text">Parameters Monitored</span>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-6 col-xs-12 mt-2">
            <div class="card p-3 shadow-all bg-light text-dark shadow-lg p-0">
              <div class="row">
                <div
                  class="col-8 text-left title-text p-0 p-2 pb-0 text-danger"
                  style="font-size: 32px"
                >
                  {{ totalMc }}
                </div>
                <div
                  class="
                    col
                    text-left
                    title-text
                    p-0 p-2
                    pb-0
                    text-danger text-center
                  "
                  style="font-size: 32px"
                >
                  <i class="fa fa-cogs" aria-hidden="true"></i>
                </div>
              </div>
              <div class="row">
                <div class="col text-left p-0 p-2 pt-0 text-secondary">
                  <span class="title-text">Machines Monitored</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="justify-content-around row">
          <div class="col-lg-6 col-xs-12 mt-2">
            <div class="card p-3 shadow-all bg-light text-dark shadow-lg p-0 clicked-card">
              <div class="row">
                <div
                  class="col-8 text-left title-text p-0 p-2 pb-0 text-success "
                  style="font-size: 32px"
                >
                  {{ containerAlarms.length }}
                </div>
                <div
                  class="
                    col
                    text-left
                    title-text
                    p-0 p-2
                    pb-0
                    text-success text-center
                  "
                  style="font-size: 32px"
                >
                  <i class="fa fa-history" aria-hidden="true"></i>
                </div>
              </div>
              <div class="row">
                <div class="col text-left p-0 p-2 pt-0 text-secondary">
                  <span class="title-text">Past Alarm History</span>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-6 col-xs-12 mt-2">
            <div class="card p-3 shadow-all bg-light text-dark shadow-lg p-0">
              <div class="row">
                <div
                  class="col-8 text-left title-text p-0 p-2 pb-0 text-warning"
                  style="font-size: 32px"
                >
                  0
                </div>
                <div
                  class="
                    col
                    text-left
                    title-text
                    p-0 p-2
                    pb-0
                    text-warning text-center
                  "
                  style="font-size: 32px"
                >
                  <i class="fa fa-desktop" aria-hidden="true"></i>
                </div>
              </div>
              <div class="row">
                <div class="col text-left p-0 p-2 pt-0 text-secondary">
                  <span class="title-text">Now Alarm!</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Card Right -->
      <div class="col-lg-7 p-0">
        <div class="row justify-content-between my-auto">
          <div class="col-lg-6 col-xs-12 mt-2 p-1">
            <div
              class="card shadow-all bg-light text-dark shadow-lg p-0"
              style="width: 100%"
            >
              <Doughnut :propsData="doughnutData" />
            </div>
          </div>
          <div class="col-lg-6 col-xs-12 mt-2 p-1">
            <div
              class="card shadow-all bg-light text-dark shadow-lg p-0"
              style="width: 100%"
            >
              <Bar :propsData="barData" v-if="barData.title" />
                <div v-if="isLoading" class="row m-0">
                <div class="col">
                  <i class="fa fa-refresh fa-spin" style="font-size: 30px"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row justify-content-around" style="margin-top: 30px">
      <div class="col-lg-4 card">
        <h3 class="text-left pl-2 title text-primary">Lines</h3>
        <div class="justify-content-around row">
          <div
            v-for="(line, i) in containerLines"
            :key="line.name"
            class="col-5 card m-2 border-dark clicked-card"
            @click="changeLine(i)"
            :style="`height: 90px;${
              line.isActive ? 'border: 4px solid black!important' : ''
            };background-color: ${line.bg}`"
          >
            <h6 class="title text-center my-auto">{{ line.name }}</h6>
          </div>
        </div>
      </div>
      <div class="col-lg-7 card p-1">
        <h3 class="text-left pl-2 title text-primary">
          Parameter List ({{ selecetedLineMenu }})
        </h3>
        <table class="table table-bordered">
          <thead>
            <tr style="font-weight: bold">
              <td>No</td>
              <td>Machine</td>
              <td>Parameter Name</td>
              <td>Status</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>IKFH-0102</td>
              <td>Frequency Motor</td>
              <td>OK</td>
            </tr>
            <tr>
              <td>2</td>
              <td>IKFH-0102</td>
              <td>Load Motor</td>
              <td>OK</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Doughnut from "@/components/ApexChart/Doughnut";
import Bar from "@/components/ApexChart/Bar";
export default {
  name: "SymptompDesktop",
  data() {
    return {
      isLoading: false,
      selectedStartDate: new Date(),
      selectedEndDate: new Date(),
      totalParams: 0,
      totalMc: 0,
      parameterAlarm: 0,
      doughnutData: {
        title: "Machine Condition",
        data: [130, 11, 0],
        labels: ["Normal", "Warning", "Alarm"],
        colors: ["#07ed89", "#d9f409", "#f70939"],
      },
      barData: {},
      
      containerLines: [
        {
          name: "LPDC",
          isActive: true,
          status: 'NORMAL',
          bg: '#5DFFBD'
        },
        {
          name: "HPDC",
          isActive: false,
          status: 'NORMAL',
          bg: '#5DFFBD'
        },
        {
          name: "CAM SHAFT",
          isActive: false,
          status: 'NORMAL',
          bg: '#5DFFBD'
        },
        {
          name: "CRANK SHAFT",
          isActive: false,
          status: 'NORMAL',
          bg: '#5DFFBD'
        },
        {
          name: "CYLINDER BLOCK",
          isActive: false,
          status: 'NORMAL',
          bg: '#5DFFBD'
        },
        {
          name: "CYLINDER HEAD",
          isActive: false,
          status: 'NORMAL',
          bg: '#5DFFBD'
        },
        {
          name: "ASSY LINE",
          isActive: false,
          status: 'NORMAL',
          bg: '#5DFFBD'
        },
      ],
      selecetedLineMenu: null,
      containerAlarms: [],
      modalShow: false
    };
  },
  methods: {
    async getParams() {
      await axios
        .get(
          `${process.env.VUE_APP_HOST}/parameter/get/parameters?reqColName=fmc_name`
        )
        .then((result) => {
          console.log(result);
          this.totalParams = result.data.data.length;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async getAvailMc() {
      await axios
        .get(`${process.env.VUE_APP_HOST}/parameter/get/machines`)
        .then((result) => {
          let totalFanucMc = 120;
          this.totalMc = result.data.data.length + totalFanucMc;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    changeLine(idx) {
      this.containerLines[idx].isActive = true;
      this.containerLines.forEach((line, i) => {
        if (i == idx) {
          line.isActive = true;
          this.selecetedLineMenu = line.name;
        } else {
          line.isActive = false;
        }
      });
    },
    async getAlarms() {
      await axios.get(`http://192.168.1.41:4000/fanuc/alarms?start=${this.formatDate(this.selectedStartDate)}&finish=${this.formatDate(this.selectedEndDate)}`)
      .then(res => {
        console.log(res);
        let groupAlarms = this.groupBy(res.data.data, 'message')
        let containerRes = []
        for(let key in groupAlarms) {
          console.log(groupAlarms[key]);
          let obj = {
            label: key,
            totalAlarm: groupAlarms[key].length,
            data: groupAlarms[key]
          }
          containerRes.push(obj)
        }
        let sortRes = containerRes.sort((a, b) => (a.totalAlarm < b.totalAlarm) ? 1 : ((b.totalAlarm < a.totalAlarm) ? -1 : 0))
        this.containerAlarms = containerRes
        let mapNum = sortRes.splice(0,5).map(item => {
          return item.totalAlarm
        })
        let mapLabels = sortRes.splice(0,5).map(item => {
          console.log(item);
          return item.label.slice(0, 14)
        })
        
          
        // let objNew = {
        //   name: "Freq",
        //   data: mapNum,
        // }

        this.barData = {
          title: "Pareto Alarms",
          data: [
            {
              name: "Freq",
              data: mapNum,
            }
          ],
          labels: mapLabels,
        }
        // this.barData.labels = mapLabels
        // this.barData.data[0] = objNew
        // this.barData.data.push(objNew)
        this.isLoading = false
      })
      .catch(err => {
        console.log(err);
      })
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
    groupBy(objectArray, property) {
      return objectArray.reduce((acc, obj) => {
          const key = obj[property];
          if (!acc[key]) {
            acc[key] = [];
          }
          // Add object to list for given key's value
          acc[key].push(obj);
          return acc;
      }, {});
    },
  },
  components: {
    Doughnut,
    Bar,
  },
  async mounted() {
    this.changeLine(0)
    this.isLoading = true
    await this.getParams();
    await this.getAvailMc();
    await this.getAlarms()
  },
};
</script>

<style>
.card {
  border-radius: 10px;
}
.clicked-card:active {
  background-color: #81e3f4;
}
.clicked-card {
  cursor: pointer;
}
</style>