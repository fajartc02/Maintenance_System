<template>
  <div class="container-fluid p-0" style="margin-bottom: 100px">
    <div class="row m-2">
      <div class="col p-0">
        <div
          class="title-text text-light bg-dark px-2 rounded"
          style="z-index: 1; font-size: 20px; opacity: 0.9"
        >
          {{ $route.query.v_ }}
        </div>
      </div>
      <div class="col p-0" v-if="containerActiveProblem.length === 0">
        <div
          class="title-text text-light bg-success px-2 rounded"
          style="z-index: 1; font-size: 20px; opacity: 0.9"
        >
          RUN
        </div>
      </div>
      <div class="col p-0" v-else>
        <div
          class="title-text text-light bg-danger px-2 rounded"
          style="z-index: 1; font-size: 20px; opacity: 0.9"
        >
          STOP
        </div>
      </div>
      <div class="col p-0">
        <div
          class="title-text text-light bg-dark px-2 rounded"
          style="z-index: 1; font-size: 20px; opacity: 0.9"
        >
          {{ timeNow }}
        </div>
      </div>
    </div>
    <!-- IMAGE -->
    <!-- <div class="row m-0">
      <div class="col-12 p-0">
        <img
          :src="imgUrl"
          alt="cas"
          style="width: 100%; height: 200px; position: absolute; right: 0px"
        />
        <Clock />
      </div>
    </div> -->
    <!-- OEE -->
    <div class="row m-0" style="margin-top: 70px !important">
      <div class="col-4 p-0 px-2">
        <div
          class="
            card
            bg-dark
            m-0
            d-flex
            justify-content-center
            align-items-center
          "
          style="width: 100px; height: 100px; opacity: 0.8"
        >
          <vm-progress
            type="circle"
            :width="80"
            :percentage="currentOEE"
            status="success"
          >
            <strong class="text-center text-success"
              >OEE <br />{{ currentOEE }}%</strong
            >
          </vm-progress>
        </div>
      </div>
    </div>
    <!-- INFO -->
    <div
      class="row m-0"
      style="margin-top: -55px !important; padding-left: 110px; opacity: 0.8"
    >
      <div class="col p-0">
        <div class="card bg-dark text-light">
          <table>
            <tr style="font-weight: bold">
              <td style="font-size: 20px">
                {{ containerActiveProblem.length }}
              </td>
              <td style="font-size: 20px">{{ totalProblemThisMonth }}</td>
              <td style="font-size: 20px">
                {{ durMtCall }} <small>min</small>
              </td>
            </tr>
            <tr>
              <td class="title-text">
                <i class="fa fa-info-circle text-info"></i>Problem Sedang
                Terjadi
              </td>
              <td class="title-text">
                <i class="fa fa-exclamation-circle text-danger"></i> Problem
                Bulan Ini
              </td>
              <td class="title-text">
                <i class="fa fa-exclamation-triangle text-warning"></i> Today MT
                Call
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
    <!-- STTUS RUN LINE -->
    <!-- <div class="row m-0 title-text">
      <div class="col p-0">
        <marquee class="text-success" v-if="containerActiveProblem.length === 0"
          ><i class="fa fa-info-circle text-info"></i>
          {{ isActiveLine }} SEKARANG SEDANG {{ "RUNNING" }}</marquee
        >
        <marquee class="text-danger" v-else
          ><i class="fa fa-exclamation-circle text-danger"></i>
          {{ isActiveLine }} ADA MESIN STOP DURASI:
          {{ durCurrentStop }} Min</marquee
        >
      </div>
    </div> -->
    <h2 class="mt-4" style="font-size: 20px">
      Problem Sedang Terjadi Hari ini
    </h2>
    <div class="row m-0 mt-2">
      <div class="col p-0">
        <v-carousel
          v-model="model"
          style="height: 200px"
          v-if="containerActiveProblem.length != 0"
        >
          <v-carousel-item
            v-for="problem in containerActiveProblem"
            :key="problem.fid"
            style="height: 200px"
          >
            <v-sheet color="error" height="100%" tile>
              <div class="row m-0">
                <div class="col p-0 title-text">MACHINE STOP</div>
              </div>
              <div class="row m-0">
                <div class="col p-0">
                  <div class="input-group mb-3">
                    <div class="input-group-prepend">
                      <span class="input-group-text" id="basic-addon1"
                        >Problem</span
                      >
                    </div>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Problem"
                      aria-describedby="basic-addon1"
                      disabled
                      v-model="problem.ferror_name"
                    />
                  </div>
                </div>
                <div class="col p-0">
                  <div class="input-group mb-3">
                    <div class="input-group-prepend">
                      <span class="input-group-text" id="basic-addon1"
                        >Machine</span
                      >
                    </div>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Machine"
                      aria-describedby="basic-addon1"
                      disabled
                      v-model="problem.fmc_name"
                    />
                  </div>
                </div>
              </div>
              <div class="row m-0">
                <div class="col p-0">
                  <div class="input-group mb-3">
                    <div class="input-group-prepend">
                      <span class="input-group-text" id="basic-addon1"
                        >Operator</span
                      >
                    </div>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Operator"
                      aria-describedby="basic-addon1"
                      disabled
                      v-model="problem.foperator"
                    />
                  </div>
                </div>
                <div class="col p-0">
                  <div class="input-group mb-3">
                    <div class="input-group-prepend">
                      <span class="input-group-text" id="basic-addon1"
                        >Duration (min)</span
                      >
                    </div>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Shift"
                      aria-describedby="basic-addon1"
                      disabled
                      v-model="problem.fdur"
                    />
                  </div>
                </div>
              </div>
              <div class="row m-0">
                <div class="col p-0 text-left" style="height: 200px">
                  <label class="m-0" style="font-size: 10px">Step Repair</label>
                  <textarea
                    class="bg-white form-control"
                    style="max-height: 60px !important"
                    name=""
                    id=""
                    cols="25"
                    rows="10"
                    disabled
                    v-model="problem.fstep_repair"
                  ></textarea>
                </div>
                <div class="col p-0 mt-4">
                  <button
                    class="btn btn-info title-text"
                    style="max-height: 29px"
                    @click="editProblem(problem.fid)"
                  >
                    Edit Problem <i class="fa fa-chevron-circle-right"></i>
                  </button>
                </div>
              </div>
            </v-sheet>
          </v-carousel-item>
        </v-carousel>
        <div v-else>Tidak Ada Problem</div>
      </div>
    </div>
    <!-- TABLE PROBLEM -->
    <h2 class="mt-4" style="font-size: 20px">Problem Close Hari ini</h2>
    <div class="row m-0">
      <div class="col p-0 px-1">
        <table
          class="table table-striped table-dark table-responsive text-left"
          style="max-height: 350px"
        >
          <thead class="title-text" style="font-size: 10px">
            <tr>
              <th scope="col">No</th>
              <th style="min-width: 80px" scope="col">Date</th>
              <th style="min-width: 50px" scope="col">Machine</th>
              <th style="min-width: 150px" scope="col">Problem</th>
              <th style="min-width: 50px" scope="col">PIC</th>
              <th style="min-width: 50px" scope="col">Duration</th>
              <th scope="col" colspan="3">Actions</th>
            </tr>
          </thead>
          <tbody v-if="containerProblems.length != 0 && isLoading == false">
            <tr v-for="(problem, i) in containerProblems" :key="problem.fid">
              <td>{{ i + 1 }}</td>
              <td style="min-width: 80px">
                {{ problem.fstart_time.split("T")[0] }}
              </td>
              <td style="min-width: 50px">
                {{ problem.fmc_name }}
              </td>
              <td style="min-width: 150px">{{ problem.ferror_name }}</td>
              <td style="min-width: 50px">{{ problem.foperator }}</td>
              <td style="min-width: 50px">{{ problem.fdur }}</td>
              <td style="min-width: 70px">
                <v-btn
                  class="btn-light"
                  small
                  color="primary"
                  @click="exportPdf(problem.fid, problem.fdur)"
                >
                  <i class="fa fa-book"></i> Report
                </v-btn>
              </td>
              <td style="min-width: 70px">
                <v-btn @click="editProblem(problem.fid)" small>
                  <i class="fa fa-edit"></i> Edit
                </v-btn>
              </td>
              <td style="min-width: 70px">
                <v-btn
                  elevation="2"
                  data-toggle="modal"
                  :data-target="`#modal${problem.fid}`"
                  small
                  color="error"
                  ><i class="fa fa-trash"></i> Delete</v-btn
                >
                <div
                  class="modal fade"
                  :id="`modal${problem.fid}`"
                  tabindex="-1"
                  role="dialog"
                  aria-hidden="true"
                >
                  <div class="modal-dialog" role="document">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title text-dark">Delete Problem</h5>
                        <button
                          type="button"
                          class="close"
                          data-dismiss="modal"
                          aria-label="Close"
                        >
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div class="modal-body text-dark">
                        <p>
                          apakah kamu yakin ingin menghapus problem
                          <b>{{ problem.ferror_name }}</b> ID:
                          <b>{{ problem.fid }}</b
                          >?
                        </p>
                      </div>
                      <div class="modal-footer">
                        <button
                          type="button"
                          class="btn btn-danger"
                          data-dismiss="modal"
                          @click="deleteProblem(problem.fid)"
                        >
                          Ya, hapus!
                        </button>
                        <button
                          type="button"
                          class="btn btn-secondary"
                          data-dismiss="modal"
                        >
                          Engga jadi deh
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
          <tbody
            v-else-if="containerProblems.length == 0 && isLoading == false"
          >
            <tr>
              <td class="text-center" colspan="9">Tidak Ada Problem</td>
            </tr>
          </tbody>
        </table>
        <i
          v-if="isLoading"
          class="fa fa-refresh fa-spin"
          style="font-size: 30px"
        ></i>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import axios from "axios";
import moment from "moment";

// import Clock from "@/components/Clock.vue";
export default {
  name: "DetailsLine",
  data() {
    return {
      isActiveLine: null,
      selectedStartDate: null,
      selectedEndDate: new Date(),
      model: 0,
      colors: ["error"],
      problem: "",
      machine: "",
      operator: "",
      shift: "",
      isLoading: false,
      containerProblems: [],
      isProblemFinished: false,
      selectedStartTime: null,
      selectedEndTime: null,
      currentOEE: 100,
      durMtCall: 0,
      containerActiveProblem: [],
      imgUrl:
        "https://greenhatgk-wpengine.netdna-ssl.com/wp-content/uploads/2017/08/GK-large-8-1360x500.png",
      imgUrl2:
        "https://www.market-prospects.com//storage/images/57be7fdf4eeecccf2ffe7171c88423db.jpg",
      totalProblemThisMonth: 0,
      durCurrentStop: 0,
      maxCount: 10,
      timeNow: "",
    };
  },
  computed: {
    ...mapState(["isActiveRoutes", "stateProdAchievements"]),
  },
  components: {
    // Clock,
  },
  watch: {
    $route(to) {
      // react to route changes...
      console.log(to);
    },
    stateProdAchievements: function () {
      console.log(this.stateProdAchievements);
      this.stateProdAchievements.forEach((prod) => {
        if (prod.fline == this.$route.query.v_) {
          this.currentOEE = prod.oee;
          this.durMtCall = prod.durMtCall;
          this.durCurrentStop = prod.durCurrentStop;
        }
      });
    },
  },
  methods: {
    ...mapActions(["storeProdAchievments"]),
    async getProblemToday() {
      this.isLoading = true;
      let that = this;
      async function reGetting() {
        await axios
          .get(
            `${process.env.VUE_APP_HOST}/problemsToday?fline=${that.$route.query.v_}`
          )
          .then((result) => {
            // console.log(result.data.data);
            that.containerProblems = result.data.data;
            that.isLoading = false;
          })
          .catch(async (err) => {
            console.log(err);
            that.maxCount -= 1;
            console.log(that.maxCount);
            if (that.maxCount != 0) {
              await reGetting();
            }
          });
      }
      await reGetting();
    },
    intervalTime() {
      this.timeNow = `${
        moment().format("MMMM Do YYYY, h:mm:ss a").split(", ")[1]
      }`;
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
    exportPdf(id, dur) {
      console.log(dur);
      console.log(id);
      if (dur > 120) {
        this.$router.push(`/pdfViewer?v_=${id}`);
      } else {
        this.$router.push(`/pdfViewerSmall?v_=${id}`);
      }
    },
    editProblem(vid) {
      this.$router.push(`/editProblem?v_=${vid}`);
    },
    async deleteProblem(_v) {
      await axios
        .delete(`${process.env.VUE_APP_HOST}/deleteProblem/${_v}`)
        .then((result) => {
          console.log(result);
          this.$router.go();
          this.getProblemHistory();
        })
        .catch((err) => {
          // this.deleteProblem(_v)
          console.log(err);
        });
    },
    saveSelectedStartDate() {
      this.selectedStartDate = new Date(this.selectedStartDate)
        .toISOString()
        .substr(0, 10);
      this.menu = false;
    },
    async getActiveProblem() {
      let uri = `${process.env.VUE_APP_HOST}/activeProblem?fline=${this.$route.query.v_}`;
      await axios
        .get(uri)
        .then((result) => {
          console.log(result);
          this.containerActiveProblem = result.data.data;
        })
        .catch((err) => {
          console.log(err);
          // this.getActiveProblem()
        });
    },
    async countProblemThisMonth() {
      let startDate = this.formatDate(
        new Date(new Date().getFullYear(), new Date().getMonth(), 1)
      );
      let finishDate = this.formatDate(new Date());
      await axios
        .get(
          `${process.env.VUE_APP_HOST}/problemHistory?startDate=${startDate}&endDate=${finishDate}&line=${this.$route.query.v_}`
        )
        .then((result) => {
          console.log(result.data.data);
          this.totalProblemThisMonth = result.data.data.length;
        })
        .catch((err) => {
          // this.countProblemThisMonth()
          console.log(err);
        });
    },
  },
  async mounted() {
    console.log(this.isActiveRoutes);
    this.isActiveLine = this.$route.query.v_;
    let dateConvert = `${moment().format("L").split("/")[1]}/${
      moment().format("L").split("/")[0]
    }/${moment().format("L").split("/")[2]}`;
    console.log(dateConvert);
    this.timeNow = `${
      moment().format("MMMM Do YYYY, h:mm:ss a").split(", ")[1]
    }`;
    let intervalStart = setInterval(this.intervalTime, 1000);
    console.log(intervalStart);
    this.countProblemThisMonth();
    if (
      this.$route.query.v_ == "CRANK SHAFT" ||
      this.$route.query.v_ == "CAM SHAFT" ||
      this.$route.query.v_ == "CYLINDER HEAD" ||
      this.$route.query.v_ == "CYLINDER BLOCK"
    ) {
      this.imgUrl =
        "https://www.market-prospects.com//storage/images/57be7fdf4eeecccf2ffe7171c88423db.jpg";
    } else if (this.$route.query.v_ == "ASSY LINE") {
      this.imgUrl = require("@/assets/assembly.jpg");
    }
    // console.log(this.$route.query.v_);
    await this.getActiveProblem();
    await this.storeProdAchievments();
    await this.getProblemToday();
  },
};
</script>

<style scoped>
td {
  font-size: 10px;
}
.form-control {
  font-size: 12px;
}
.v-data-table__mobile-row {
  padding: 5px !important;
}
.v-carousel__controls {
  height: 30px !important;
}
.v-time-picker-clock__item,
.v-time-picker-clock__item--active,
span {
  color: rgb(0, 0, 0) !important;
}
</style>

<style>
.v-carousel__controls {
  display: none !important;
}
</style>