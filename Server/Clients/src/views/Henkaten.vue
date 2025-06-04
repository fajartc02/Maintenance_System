<template>
  <div class="container-fluid p-0" style="margin-bottom: 100px">
    <!-- SESARCH -->
    <div class="row m-0 p-0">
      <div class="col-12 d-flex justify-content-center" style="z-index: 1">
        <div id="content-search" class="card shadow w-100 p-">
          <div class="card-header title-text p-0 px-2 text-left">Search</div>
          <div class="card-body px-1 py-1">
            <div class="row m-0">
              <div class="col-6 p-0">
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <span class="input-group-text" id="basic-addon1"
                      >Start</span
                    >
                  </div>
                  <input
                    type="date"
                    v-model="selectedStartDate"
                    class="form-control"
                    placeholder="Start Date"
                  />
                </div>
              </div>
              <div class="col-6 p-0 pl-1">
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <span class="input-group-text" id="basic-addon1"
                      >Finish</span
                    >
                  </div>
                  <input
                    type="date"
                    class="form-control"
                    v-model="selectedEndDate"
                    placeholder="End Date"
                  />
                </div>
              </div>
            </div>
            <div class="row m-0">
              <div class="col-6 p-0">
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <span class="input-group-text" id="basic-addon1">Line</span>
                  </div>
                  <model-select
                    :options="optionsLines"
                    v-model="lineSelected"
                    placeholder="select line"
                    style="width: 60%; font-size: 10px; color: black"
                  >
                  </model-select>
                </div>
              </div>
              <div class="col-6 p-0 pl-1">
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <span class="input-group-text" id="basic-addon1"
                      >Machine</span
                    >
                  </div>
                  <model-select
                    :options="machines"
                    v-model="machineSelected"
                    placeholder="select line"
                    style="width: 50%; font-size: 10px; color: black"
                  >
                  </model-select>
                </div>
              </div>
            </div>
            <div class="row m-0">
              <div class="col-12 p-0 d-flex justify-content-end">
                <div
                  class="card bg-primary shadow"
                  @click="getHenkaten()"
                  style="width: 20%"
                >
                  Search
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row m-0 p-0">
      <div class="col p-0 m-0">
        <h2>Temporary Action List</h2>
      </div>
    </div>
    <div class="row m-0 p-0">
      <div class="col d-flex justify-content-end p-0">
        <button
          class="btn btn-outline-warning"
          data-toggle="modal"
          data-target="#addModalHenkaten"
          @click="getMachines()"
        >
          Add
          <i class="fa fa-book"></i>
        </button>

        <div
          class="modal fade"
          id="addModalHenkaten"
          tabindex="-1"
          role="dialog"
          aria-labelledby="addModalHenkatenLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="addModalHenkatenLabel">
                  Temporary Action
                </h5>
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <div class="container-fluid m-0 p-0">
                  <div class="row m-0 p-0">
                    <div class="col-12 p-0">
                      <div
                        v-if="isSuccess"
                        class="alert alert-success"
                        role="alert"
                      >
                        {{ message }}
                      </div>
                    </div>
                  </div>
                  <div class="row m-0 p-0">
                    <div class="col-12 p-0">
                      <div class="form-group text-left">
                        <label>Date</label>
                        <input
                          type="date"
                          class="form-control form-control-sm"
                          placeholder="date"
                          v-model="postData.fdate"
                        />
                      </div>
                    </div>
                    <!-- Line -->
                    <!-- <div class="col-6 p-0">
                      <div class="form-group text-left">
                        <label>Line</label>
                        <input
                          type="text"
                          class="form-control form-control-sm"
                          placeholder="line"
                          v-model="postData.fline"
                          disabled
                        />
                      </div>
                    </div> -->
                  </div>
                  <!-- <div class="row m-0 p-0">
                    <div class="col-6 p-0 text-left">
                      <label>Machine</label>
                      <model-select
                        :options="machines"
                        v-model="postData.fmc"
                        placeholder="select machine"
                        style="width: 100%"
                        class="form-control-sm"
                      >
                      </model-select>
                    </div> 
                    <div class="col-12 p-0 text-left">
                      <label>Problem</label>
                      <textarea
                        class="form-control form-control-sm"
                        placeholder="what's a problem?"
                        v-model="postData.fproblem"
                      />
                    </div>
                  </div> -->
                  <div class="row m-0 p-0">
                    <div class="col-12 p-0 text-left">
                      <label>Item Temporary</label>
                      <textarea
                        class="form-control form-control-sm"
                        placeholder="apa item yang temporary?"
                        v-model="postData.fchanges_item"
                      />
                    </div>
                    <!-- <div class="col-6 p-0 text-left">
                      <label>Part Type</label>
                      <input
                        type="text"
                        class="form-control form-control-sm"
                        placeholder="type part"
                        v-model="postData.fpart_type"
                      />
                    </div> -->
                  </div>
                  <div class="row m-0 p-0">
                    <div class="col-12 p-0 text-left">
                      <label>Lokasi</label>
                      <textarea
                        class="form-control form-control-sm"
                        placeholder="dimana yang temporary?"
                        v-model="postData.fmc"
                      />
                    </div>
                  </div>
                  <div class="row m-0 p-0">
                    <div class="col-12 p-0 text-left">
                      <label>PIC</label>
                      <input
                        type="text"
                        class="form-control form-control-sm"
                        placeholder="nama antum siapa?"
                        v-model="postData.fpic"
                      />
                    </div>
                    <!-- <div class="col-6 p-0 text-left">
                      <label>Work No</label>
                      <input
                        type="text"
                        class="form-control form-control-sm"
                        placeholder="work number?"
                        v-model="postData.fwork_no"
                      />
                    </div> -->
                  </div>
                  <div class="row m-0 p-0">
                    <div class="col-12 p-0 text-left">
                      <label>Keterangan</label>
                      <textarea
                        class="form-control"
                        placeholder="mau di apakan yang temporary?"
                        v-model="postData.fnote"
                      ></textarea>
                    </div>
                    <!-- <div class="col-6 p-0 text-left">
                      <label>Status</label>
                      <select class="form-control" v-model="postData.fstatus">
                        <option value="0">TEMPORARY</option>
                        <option value="1">FIX</option>
                      </select>
                    </div> -->
                  </div>
                  <div class="row m-0 p-0">
                    <div class="col-12 p-0 text-left">
                      <label>Status</label>
                      <select class="form-control" v-model="postData.fstatus">
                        <option value="0">TEMPORARY</option>
                        <option value="1">FIX</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  class="btn btn-outline-success"
                  @click="postHenkaten()"
                  data-dismiss="modal"
                >
                  Submit<i
                    v-if="isLoading"
                    class="fa fa-refresh fa-spin"
                    style="font-size: 14px"
                  ></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row m-0 p-0">
      <div class="col p-0 m-0">
        <table
          class="table table-sm table-dark table-bordered table-responsive text-light"
        >
          <thead>
            <tr>
              <th>No</th>
              <th>Tanggal</th>
              <!-- <th>Line</th> -->
              <th style="min-width: 90px">Lokasi</th>
              <!-- <th style="min-width: 200px">Problem</th> -->
              <th style="min-width: 200px">Item Temporary</th>
              <!-- <th>Type Part</th> -->
              <th>PIC</th>
              <!-- <th>No Work</th> -->
              <th>Keterangan</th>
              <th colspan="2">Actions</th>
            </tr>
          </thead>
          <tbody v-if="containerHenkaten.length !== 0 && isLoading === false">
            <tr
              v-for="(henkaten, i) in containerHenkaten"
              :key="henkaten.fid"
              :style="`background-color: ${
                henkaten.fstatus == 0 ? 'yellow' : ''
              };color: ${henkaten.fstatus == 0 ? 'black' : 'white'}`"
            >
              <td>{{ i + 1 }}</td>
              <td>{{ henkaten.fdate.split("T")[0] }}</td>
              <!-- <td>{{ henkaten.fline }}</td> -->
              <td>{{ henkaten.fmc }}</td>
              <!-- <td>{{ henkaten.fproblem }}</td> -->
              <td>{{ henkaten.fchanges_item }}</td>
              <!-- <td>{{ henkaten.fpart_type }}</td> -->
              <td>{{ henkaten.fpic }}</td>
              <!-- <td>{{ henkaten.fwork_no }}</td> -->
              <td style="min-width: 100px">{{ henkaten.fnote }}</td>
              <td>
                <v-btn
                  color="info"
                  small
                  class="btn btn-outline-warning"
                  data-toggle="modal"
                  data-target="#addModalHenkaten"
                  @click="editHenkaten(henkaten.fid, henkaten)"
                >
                  <i class="fa fa-edit"></i> Edit
                </v-btn>
              </td>
              <td style="min-width: 70px">
                <v-btn
                  elevation="2"
                  data-toggle="modal"
                  :data-target="`#modal${henkaten.fid}`"
                  small
                  color="error"
                  ><i class="fa fa-trash"></i> Delete</v-btn
                >
                <div
                  class="modal fade"
                  :id="`modal${henkaten.fid}`"
                  tabindex="-1"
                  role="dialog"
                  aria-hidden="true"
                >
                  <div class="modal-dialog" role="document">
                    <div class="modal-content" style="height: 40vh">
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
                          apakah kamu yakin ingin menghapus henkaten
                          <b>{{ henkaten.fmc }}</b> Problem:
                          <b>{{ henkaten.fproblem }}</b
                          >?
                        </p>
                      </div>
                      <div class="modal-footer">
                        <button
                          type="button"
                          class="btn btn-danger"
                          data-dismiss="modal"
                          @click="deleteHenkaten(henkaten.fid)"
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
          <tbody v-else-if="containerHenkaten.length === 0 && !isLoading">
            <tr>
              <td colspan="9">Tidak ada henkaten</td>
            </tr>
          </tbody>
          <tbody v-else>
            <tr>
              <td colspan="9">
                <i
                  v-if="isLoading"
                  class="fa fa-refresh fa-spin"
                  style="font-size: 20px"
                ></i>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- DIALOG LOADER -->
      <v-dialog v-model="isDialogLoading" hide-overlay persistent width="300">
        <v-card color="primary" dark>
          <v-card-text>
            Please stand by
            <v-progress-linear
              indeterminate
              color="white"
              class="mb-0"
            ></v-progress-linear>
          </v-card-text>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>

<script>
import { ModelSelect } from "vue-search-select";
import axios from "axios";

export default {
  name: "Henkaten",
  data() {
    return {
      postData: {
        fdate: "",
        fline: "",
        fmc: "",
        fproblem: "",
        fchanges_item: "",
        fpart_type: "",
        fpic: "",
        fwork_no: "",
        fnote: "",
        fstatus: "0",
      },
      machines: ["IMSP-0001", "IMSP-0002"],
      fmc_id: "",
      containerHenkaten: [],
      isLoading: false,
      isSuccess: false,
      isShow: true,
      machineSelected: null,
      optionsLines: [],
      lineSelected: null,
      selectedStartDate: new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        1
      ),
      selectedEndDate: new Date(),
      isDialogLoading: false,
      isEdit: false,
      fidEdit: null,
      message: "",
    };
  },
  computed: {
    fmc() {
      return this.postData.fmc;
    },
  },
  watch: {
    postData: function () {
      if (this.postData.fmc != "") {
        let mcSelected = this.containerRawMachine.map((mc) => {
          if (mc.fmc_name == this.postData.fmc) {
            this.fmc_id = mc.fid;
            return mc.fline;
          } else {
            return null;
          }
        });
        console.log(mcSelected.sort());
        this.postData.fline = mcSelected.sort()[0];
      }
      console.log("postDataBERUBUAH");
    },
    fmc() {
      if (this.postData.fmc != "") {
        let mcSelected = this.containerRawMachine.map((mc) => {
          if (mc.fmc_name == this.postData.fmc) {
            this.fmc_id = mc.fid;
            return mc.fline;
          } else {
            return null;
          }
        });
        console.log(mcSelected.sort());
        this.postData.fline = mcSelected.sort()[0];
      }
    },
    lineSelected: function () {
      this.getMachines(true);
    },
  },
  methods: {
    getLines() {
      axios
        .get(`${process.env.VUE_APP_HOST}/lines`)
        .then((result) => {
          console.log(result.data.data);
          let mapLines = result.data.data.map((line) => {
            return { value: line.fline, text: line.fline };
          });
          this.optionsLines = mapLines;
        })
        .catch((err) => {
          // this.getLines();
          console.log(err);
        });
    },
    showSearch() {
      // if (this.isShow) {
      //   document.getElementById("content-search").style.top = "-20px";
      //   this.isShow = false;
      // } else {
      //   document.getElementById("content-search").style.top = "-225px";
      //   this.isShow = true;
      // }
    },
    // Temporary action
    postHenkaten() {
      this.isLoading = true;
      this.isDialogLoading = true;
      if (!this.isEdit) {
        if (this.postData.fchanges_item != "" && this.postData.fstatus != "") {
          axios
            .post(`${process.env.VUE_APP_HOST}/postHenkaten`, this.postData)
            .then((result) => {
              console.log(result);
              this.message = "Berhasil menambahkan temporary action.";
              this.isLoading = false;
              // this.containerHenkaten.unshift(this.postData);
              this.isSuccess = true;
              this.onClear();
              this.isEdit = false;
              this.isDialogLoading = false;
              this.getHenkaten();
            })
            .catch((err) => {
              // this.postHenkaten();
              console.log(err);
            });
        } else {
          this.isLoading = false;
          this.isDialogLoading = false;
          alert(
            "tolong di isi mesin, problem, item perubahan, dan status (Temporary/Fix)"
          );
        }
      } else {
        axios
          .put(
            `${process.env.VUE_APP_HOST}/editHenkaten/${this.fidEdit}`,
            this.postData
          )
          .then((result) => {
            console.log(result);
            this.message = "Berhasil Mengedit henkaten.";
            this.isDialogLoading = false;
            this.isLoading = false;
            this.isSuccess = true;
            this.isEdit = false;
            this.getHenkaten();
            this.onClear();
          })
          .catch((err) => {
            // this.postHenkaten();
            this.isDialogLoading = false;
            this.isLoading = false;
            console.log(err);
          });
      }
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
    getMachines(status = false) {
      var url;
      if (status) {
        url = `${process.env.VUE_APP_HOST}/machines?line=${this.lineSelected}`;
      } else {
        url = `${process.env.VUE_APP_HOST}/searchMc`;
      }
      axios
        .get(url)
        .then((result) => {
          console.log(result.data.data);
          this.containerRawMachine = result.data.data;
          let mapMc = result.data.data.map((mc) => {
            return { value: mc.fmc_name, text: mc.fmc_name };
          });
          console.log(mapMc);
          this.machines = mapMc;
        })
        .catch((err) => {
          // this.getMachines((status = false));
          console.error(err);
        });
    },
    getHenkaten() {
      this.isLoading = true;
      let url = `${process.env.VUE_APP_HOST}/getHenkaten?startDate=${this.selectedStartDate}&endDate=${this.selectedEndDate}`;
      if (this.machineSelected !== null) {
        url += `&fmc=${this.machineSelected}`;
      }
      if (this.lineSelected != null) {
        url += `&fline=${this.lineSelected}`;
      }
      axios
        .get(url)
        .then((result) => {
          this.isLoading = false;
          console.log(result);
          this.containerHenkaten = result.data.data;
        })
        .catch((err) => {
          console.log(err);
          // this.getHenkaten()
          this.isLoading = false;
        });
    },
    onClear() {
      this.postData = {
        fdate: "",
        fline: "",
        fmc: "",
        fproblem: "",
        fchanges_item: "",
        fpart_type: "",
        fpic: "",
        fwork_no: "",
        fnote: "",
        fstatus: "",
      };
    },
    deleteHenkaten(id) {
      this.isDialogLoading = true;
      axios
        .delete(`${process.env.VUE_APP_HOST}/deleteHenkaten/${id}`)
        .then((result) => {
          this.isDialogLoading = false;
          if (result.status == 201) {
            // this.getHenkaten();
            this.$router.go();
          }
        })
        .catch((err) => {
          this.isDialogLoading = false;
          console.log(err);
        });
    },
    editHenkaten(id, data) {
      this.isSuccess = false;
      this.fidEdit = id;
      this.postData = {
        fdate: this.formatDate(data.fdate),
        fline: data.fline,
        fmc: data.fmc,
        fproblem: data.fproblem,
        fchanges_item: data.fchanges_item,
        fpart_type: data.fpart_type,
        fpic: data.fpic,
        fwork_no: data.fwork_no,
        fnote: data.fnote,
        fstatus: data.fstatus,
      };
      this.isEdit = true;
    },
  },
  components: {
    ModelSelect,
  },
  mounted() {
    this.selectedStartDate = this.formatDate(this.selectedStartDate);
    this.selectedEndDate = this.formatDate(this.selectedEndDate);
    this.postData.fdate = this.formatDate(new Date());
    this.getMachines();
    this.getHenkaten();
    this.getLines();
    if (localStorage.getItem("name")) {
      this.postData.fpic = localStorage.getItem("name");
    }
  },
};
</script>

<style scoped>
.modal-dialog {
  margin: 0px;
}
.modal-content {
  height: 100vh;
}
label {
  margin: 0px;
}
.table {
  font-size: 12px;
}
.modal-body {
  padding-left: 2px;
  padding-right: 2px;
}
input.search {
  padding: 0px !important;
}
</style>