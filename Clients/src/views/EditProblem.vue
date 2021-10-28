<template>
  <ScrollableContainer>
    <div class="container-fluid" style="padding-bottom: 80px">
      <h2>Edit Problem</h2>
      <i
        v-if="isLoading"
        class="fa fa-refresh fa-spin"
        style="font-size: 30px"
      ></i>
      <!-- LOADING -->
      <v-dialog v-model="isLoading" hide-overlay persistent width="300">
        <v-card color="primary" dark>
          <v-card-text>
            Loading...
            <v-progress-linear
              indeterminate
              color="white"
              class="mb-0"
            ></v-progress-linear>
          </v-card-text>
        </v-card>
      </v-dialog>
      <div class="row m-0 p-0">
        <div class="col px-1 text-left">
          <span class="input-lable">Machine</span>
          <input class="form-control" type="text" v-model="fmc_name" disabled />
        </div>
        <div class="col px-1 text-left">
          <span class="input-lable">Line</span>
          <input class="form-control" type="text" v-model="fline" disabled />
        </div>
      </div>
      <div class="row m-0 p-0">
        <div class="col px-1 text-left">
          <span class="input-lable">Operation No.</span>
          <input
            class="form-control"
            type="text"
            v-model="foperation_no"
            disabled
          />
        </div>
        <div class="col px-1 text-left">
          <span class="input-lable">Maker</span>
          <input class="form-control" type="text" v-model="fmaker" disabled />
        </div>
      </div>
      <!-- Prob & OP -->
      <div class="row m-0 p-0">
        <div class="col px-1 text-left">
          <span class="input-lable">Problem</span>
          <input class="form-control" type="text" v-model="ferror_name" />
        </div>
        <div class="col px-1 text-left">
          <span class="input-lable">Operator</span>
          <input class="form-control" type="text" v-model="foperator" />
        </div>
      </div>
      <div class="row" v-if="setRole == 'Staff'">
        <div class="col-6">
          <div class="row">
            <div class="col">
              <input
                type="checkbox"
                style="height: 20px"
                v-model="isTaskforce"
              />
              <span style="font-size: 9px; font-weight: 800">Taskforce</span>
            </div>
            <div class="col">
              <input type="checkbox" style="height: 20px" v-model="isFullcap" />
              <span style="font-size: 9px; font-weight: 800">FULLCAP</span>
            </div>
          </div>
        </div>
      </div>
      <!-- Av category & Shift -->
      <div class="row m-0 p-0">
        <div class="col px-1 text-left">
          <span class="input-lable">AV Category</span>
          <select
            ref="fav_categoty"
            id="fav_categoty"
            class="form-control"
            v-model="fav_categoty"
          >
            <option value="MESIN">MESIN</option>
            <option value="DIES">DIES</option>
            <option value="TOOL">TOOL</option>
            <option value="COOLANT">COOLANT</option>
            <option value="TOOL CHANGE">TOOL CHANGE</option>
            <option value="FUTAI">FUTAI</option>
            <option value="POWER/ANGIN">POWER/ANGIN</option>
            <option value="NES">NES</option>
            <option value="PALLETE">PALLETE</option>
            <option value="OTHER">OTHER</option>
          </select>
        </div>
        <div class="col px-1 text-left">
          <span class="input-lable">Shift</span>
          <select
            ref="fshift"
            id="fshift"
            class="form-control"
            v-model="fshift"
          >
            <option value="r">RED</option>
            <option value="w">WHITE</option>
          </select>
        </div>
      </div>
      <!-- TIME -->
      <div class="row m-0 p-0">
        <div class="col px-1 text-left">
          <span class="input-lable">Start Date</span>
          <div class="row m-0 p-0">
            <div class="col-7 p-0">
              <input
                style="font-size: 10px"
                class="form-control"
                type="date"
                v-model="startDate"
              />
            </div>
            <div class="col-5 p-0">
              <input class="form-control" type="time" v-model="startTime" />
            </div>
          </div>
        </div>
        <div class="col px-1 text-left">
          <span class="input-lable">Finish Date</span>
          <div class="row m-0 p-0">
            <div class="col-7 p-0">
              <input
                style="font-size: 10px"
                class="form-control"
                type="date"
                v-model="endDate"
              />
            </div>
            <div class="col-5 p-0">
              <input class="form-control" type="time" v-model="endTime" />
            </div>
          </div>
        </div>
      </div>
      <!-- DUR&Desc -->
      <div class="row m-0 p-0">
        <div class="col px-1 text-left">
          <span class="input-lable">Duration (min)</span>
          <input class="form-control" type="text" v-model="fdur" disabled />
        </div>
        <div class="col px-1 text-left">
          <span class="input-lable">Upload Image (still on develop)</span>

          <!-- :action="" -->
          <form
            method="post"
            @submit.prevent="
              onSubmitUpload(
                `${urlUpload}?folder=ilustration&nameFile=${fileName}`
              )
            "
          >
            <div class="row m-0 p-0">
              <div class="col-10 p-0">
                <input
                  class="form-control"
                  name="sampleFile"
                  ref="file"
                  type="file"
                  @change="onSelect"
                />
              </div>
              <div class="col-2 p-0">
                <button class="btn btn-secondary btn-sm" type="submit">
                  Upload
                </button>
              </div>
            </div>
          </form>
          <!-- <input
            class="form-control"
            id="img"
            name="sampleFile"
            type="file"
            @change="onFileChange"
          /> -->
        </div>
      </div>
      <div class="row m-0 p-0" v-if="fimage">
        <div class="col">
          <img :src="fimage" alt="" />
        </div>
      </div>
      <!-- Ilustration (DISABLED)-->
      <div class="row m-0 p-0" style="display: none">
        <div class="col px-1 text-left">
          <div class="col px-1 text-left">
            <span class="input-lable">Description Ilustration</span>
            <input class="form-control" type="text" v-model="fDescImage" />
          </div>
        </div>
        <div class="col px-1 text-left" style="display: none">
          <span class="input-lable">Image Ilustration</span>
          <img v-if="url" :src="url" style="width: 80%; height: 80%" />
          <img
            v-else
            src="https://mtsn4malang.sch.id/wp-content/uploads/2019/08/placeholder-1.png"
            style="width: 80%; height: 80%"
          />

          <!-- https://smartandonplant3.com/mobile/imagesIlustration/20200704_023547.jpg -->
        </div>
      </div>
      <div class="row m-0 p-0">
        <div class="col px-1 text-left">
          <span class="input-lable">Item Temporary Action</span>
          <input class="form-control" type="text" v-model="temporaryAction" />
        </div>
      </div>
      <!-- Rootcause Terjadi -->
      <div class="row m-0 p-0">
        <div class="col px-1 text-left">
          <span class="input-lable">Rootcause 5 Why (kenapa terjadi) </span>
          <button
            class="btn btn-success py-1"
            @click="addToogle('isWhyTerjadi')"
            style="font-size: 10px"
          >
            +
          </button>
          <div class="row m-0 p-0">
            <table
              id="table-why-terjadi"
              class="table table-responsive text-center"
              style="font-size: 10px"
              v-if="containerWhyTerjadi.length > 0"
            >
              <thead>
                <tr>
                  <th>No</th>
                  <th style="max-width: 100px">Description</th>
                  <th colspan="2">actions</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(whyTerjadi, i) in containerWhyTerjadi"
                  :key="whyTerjadi"
                >
                  <td class="border" style="min-width: 10px">{{ i + 1 }}</td>
                  <td
                    class="text-left border"
                    style="min-width: 220px"
                    v-if="!isEditWhyTerjadi || idxWhyTerjadiSelected != i"
                  >
                    {{ whyTerjadi }}
                  </td>
                  <td
                    class="text-left border"
                    style="min-width: 220px"
                    v-else-if="isEditWhyTerjadi && idxWhyTerjadiSelected == i"
                  >
                    <input type="text" v-model="descWhyTerjadi" />
                  </td>
                  <td class="border">
                    <button
                      class="btn btn-primary py-1 input-lable"
                      @click="
                        onToogleEdit(
                          'isEditWhyTerjadi',
                          'descWhyTerjadi',
                          whyTerjadi,
                          i
                        )
                      "
                      v-if="!isEditWhyTerjadi || idxWhyTerjadiSelected != i"
                    >
                      <i
                        class="fa fa-pencil"
                        style="font-size: 10px"
                        aria-hidden="true"
                      ></i>
                    </button>
                    <button
                      class="btn btn-primary py-1 input-lable"
                      @click="
                        editContainerSingle(
                          i,
                          'containerWhyTerjadi',
                          'descWhyTerjadi',
                          'isEditWhyTerjadi'
                        )
                      "
                      v-else-if="isEditWhyTerjadi && idxWhyTerjadiSelected == i"
                    >
                      <i
                        class="fa fa-send"
                        style="font-size: 10px"
                        aria-hidden="true"
                      ></i>
                    </button>
                  </td>
                  <td class="border">
                    <button class="btn btn-danger py-1 input-lable">
                      <i
                        class="fa fa-trash"
                        style="font-size: 10px"
                        aria-hidden="true"
                        @click="removeContainerSingle(i, 'containerWhyTerjadi')"
                      ></i>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div
            class="
              row
              m-0
              p-0
              d-flex
              justify-content-around
              align-content-center
            "
            v-if="isWhyTerjadi"
          >
            <div class="col-7 p-0">
              <input
                class="form-control mt-1"
                type="text"
                v-model="descWhyTerjadi"
              />
            </div>
            <div class="col-2 p-0">
              <button
                class="btn btn-info py-1 input-lable"
                @click="onAddWhyTerjadi()"
              >
                Submit
              </button>
            </div>
            <div class="col-2 p-0 ml-2">
              <button
                class="btn btn-danger py-1 input-lable"
                @click="onCancel('isWhyTerjadi')"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
      <!-- Step Repair -->
      <div class="row m-0 p-0">
        <div class="col px-1 text-left">
          <span class="input-lable">Step Repair </span>
          <button
            class="btn btn-success py-1"
            @click="addToogle('isStepRepair')"
            style="font-size: 10px"
          >
            +
          </button>
          <div class="row m-0 p-0">
            <table
              id="table-step-repair"
              class="table table-responsive text-center"
              style="font-size: 10px"
              v-if="containerStepRepair.length > 0"
            >
              <thead>
                <tr>
                  <th>No</th>
                  <th style="max-width: 100px">Description</th>
                  <th colspan="2">actions</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(stepRepair, i) in containerStepRepair"
                  :key="stepRepair"
                >
                  <td class="border" style="min-width: 10px">{{ i + 1 }}</td>
                  <td
                    class="text-left border"
                    style="min-width: 220px"
                    v-if="!isEditStepRepair || idxStepRepairSelected != i"
                  >
                    {{ stepRepair }}
                  </td>
                  <td
                    class="text-left border"
                    style="min-width: 220px"
                    v-else-if="isEditStepRepair || idxStepRepairSelected != i"
                  >
                    <input type="text" v-model="descStepRepair" />
                  </td>
                  <td class="border">
                    <button
                      class="btn btn-primary py-1 input-lable"
                      @click="
                        onToogleEdit(
                          'isEditStepRepair',
                          'descStepRepair',
                          stepRepair,
                          i
                        )
                      "
                      v-if="!isEditStepRepair || idxStepRepairSelected != i"
                    >
                      <i
                        class="fa fa-pencil"
                        style="font-size: 10px"
                        aria-hidden="true"
                      ></i>
                    </button>
                    <button
                      class="btn btn-primary py-1 input-lable"
                      @click="
                        editContainerSingle(
                          i,
                          'containerStepRepair',
                          'descStepRepair',
                          'isEditStepRepair'
                        )
                      "
                      v-else-if="isEditStepRepair || idxStepRepairSelected != i"
                    >
                      <i
                        class="fa fa-send"
                        style="font-size: 10px"
                        aria-hidden="true"
                      ></i>
                    </button>
                  </td>
                  <td class="border">
                    <button class="btn btn-danger py-1 input-lable">
                      <i
                        class="fa fa-trash"
                        style="font-size: 10px"
                        aria-hidden="true"
                        @click="removeContainerSingle(i, 'containerStepRepair')"
                      ></i>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div
            class="
              row
              m-0
              p-0
              d-flex
              justify-content-around
              align-content-center
            "
            v-if="isStepRepair"
          >
            <div class="col-7 p-0">
              <input
                class="form-control mt-1"
                type="text"
                v-model="descStepRepair"
              />
            </div>
            <div class="col-2 p-0">
              <button
                class="btn btn-info py-1 input-lable"
                @click="onAddStepRepair()"
              >
                Submit
              </button>
            </div>
            <div class="col-2 p-0 ml-2">
              <button
                class="btn btn-danger py-1 input-lable"
                @click="onCancel('isStepRepair')"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
      <!-- Part Change -->
      <div class="row m-0 p-0">
        <div class="col px-1 text-left">
          <span class="input-lable">Part Change</span>
          <input class="form-control" type="text" v-model="fpart_change" />
        </div>
      </div>
      <!-- Countermeasure (terjadi) -->
      <div v-if="containerWhyTerjadi.length > 0" class="row m-0 p-0">
        <div class="col px-1 text-left">
          <span class="input-lable">Countermeasure (kenapa terjadi) </span>
          <button
            class="btn btn-success py-1"
            @click="addToogle('isCmTerjadi')"
            style="font-size: 10px"
          >
            +
          </button>
          <div class="row m-0 p-0">
            <table
              id="table-cm-terjadi"
              class="table table-responsive text-center"
              style="font-size: 10px"
              v-if="containerCmTerjadi.length > 0"
            >
              <thead>
                <tr>
                  <th>No</th>
                  <th style="max-width: 100px">Countermeasure</th>
                  <th style="max-width: 50px">Plan Date</th>
                  <th style="max-width: 50px">PIC</th>
                  <th style="max-width: 50px">Judg</th>
                  <th colspan="2">actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(cmTerjadi, i) in containerCmTerjadi" :key="i">
                  <td class="border" style="min-width: 10px">{{ i + 1 }}</td>
                  <td
                    class="text-left border"
                    style="min-width: 220px"
                    v-if="!isEditCmTerjadi || idxCmTerjadiSelected != i"
                  >
                    {{ cmTerjadi.cmDesc }}
                  </td>
                  <td
                    class="text-left border"
                    style="min-width: 220px"
                    v-else-if="isEditCmTerjadi || idxCmTerjadiSelected == i"
                  >
                    <input type="text" v-model="cmTerjadi.cmDesc" />
                  </td>
                  <td
                    class="text-left border"
                    style="min-width: 50px"
                    v-if="!isEditCmTerjadi || idxCmTerjadiSelected != i"
                  >
                    {{ cmTerjadi.datePlan }}
                  </td>
                  <td
                    class="text-left border"
                    style="min-width: 50px"
                    v-else-if="isEditCmTerjadi || idxCmTerjadiSelected == i"
                  >
                    <input type="date" v-model="cmTerjadi.datePlan" />
                  </td>
                  <td
                    class="text-left border"
                    style="min-width: 50px"
                    v-if="!isEditCmTerjadi || idxCmTerjadiSelected != i"
                  >
                    {{ cmTerjadi.pic }}
                  </td>
                  <td
                    class="text-left border"
                    style="min-width: 50px"
                    v-else-if="isEditCmTerjadi || idxCmTerjadiSelected == i"
                  >
                    <input type="text" v-model="cmTerjadi.pic" />
                  </td>
                  <td
                    v-if="
                      cmTerjadi.judg == true &&
                      (!isEditCmTerjadi || idxCmTerjadiSelected != i)
                    "
                    class="text-center border text-success"
                    style="min-width: 50px"
                  >
                    {{ "Sudah" }}
                  </td>
                  <td
                    v-else-if="
                      cmTerjadi.judg == false &&
                      (!isEditCmTerjadi || idxCmTerjadiSelected != i)
                    "
                    class="text-center border text-danger"
                    style="min-width: 50px"
                  >
                    {{ "Belum" }}
                  </td>
                  <td
                    class="text-center border"
                    style="min-width: 50px"
                    v-else-if="isEditCmTerjadi || idxCmTerjadiSelected == i"
                  >
                    <select v-model="cmTerjadi.judg">
                      <option :value="false">Belum</option>
                      <option :value="true">Sudah</option>
                    </select>
                  </td>
                  <td class="border">
                    <button
                      class="btn btn-primary py-1 input-lable"
                      @click="
                        onToogleEditObj(
                          'isEditCmTerjadi',
                          'cmField',
                          cmTerjadi,
                          i
                        )
                      "
                      v-if="!isEditCmTerjadi || idxCmTerjadiSelected != i"
                    >
                      <i
                        class="fa fa-pencil"
                        style="font-size: 10px"
                        aria-hidden="true"
                      ></i>
                    </button>
                    <button
                      class="btn btn-primary py-1 input-lable"
                      @click="
                        editContainerObj(
                          i,
                          'containerCmTerjadi',
                          'cmField',
                          'isEditCmTerjadi',
                          cmTerjadi
                        )
                      "
                      v-else-if="isEditCmTerjadi || idxCmTerjadiSelected == i"
                    >
                      <i
                        class="fa fa-send"
                        style="font-size: 10px"
                        aria-hidden="true"
                      ></i>
                    </button>
                  </td>
                  <td class="border">
                    <button class="btn btn-danger py-1 input-lable">
                      <i
                        class="fa fa-trash"
                        style="font-size: 10px"
                        aria-hidden="true"
                        @click="removeContainerSingle(i, 'containerCmTerjadi')"
                      ></i>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div v-if="isCmTerjadi">
            <div
              class="
                row
                m-0
                p-0
                d-flex
                justify-content-around
                align-content-center
              "
            >
              <div class="col p-0">
                <input
                  class="form-control mt-1"
                  type="text"
                  placeholder="countermeasure"
                  v-model="cmField.cmDesc"
                />
              </div>
              <div class="col p-0">
                <input
                  class="form-control mt-1"
                  type="date"
                  placeholder="date"
                  v-model="cmField.datePlan"
                />
              </div>
              <div class="col p-0">
                <input
                  class="form-control mt-1"
                  type="text"
                  placeholder="Pic"
                  v-model="cmField.pic"
                />
                <input
                  type="checkbox"
                  v-if="cmField.pic != ''"
                  style="height: 20px"
                  v-model="isActionCm"
                />
                <span
                  v-if="cmField.pic != ''"
                  style="font-size: 9px; font-weight: 800"
                  >action</span
                >
              </div>
            </div>
            <div class="row m-0 p-0">
              <div class="col p-0">
                <button
                  class="btn btn-info py-1 input-lable"
                  @click="onAddCmTerjadi()"
                >
                  Submit
                </button>
              </div>
              <div class="col p-0 ml-2">
                <button
                  class="btn btn-danger py-1 input-lable"
                  @click="onCancel('isCmTerjadi')"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Yokoten -->
      <div class="row m-0 p-0">
        <div class="col px-1 text-left mb-2">
          <span class="input-lable">Yokoten </span>
          <button
            class="btn btn-success py-1"
            @click="addToogle('isYokoten')"
            style="font-size: 10px"
          >
            +
          </button>
          <div class="row m-0 p-0">
            <table
              id="table-yokoten"
              class="table table-responsive text-center"
              style="font-size: 10px"
              v-if="containerYokoten.length != 0"
            >
              <thead>
                <tr>
                  <th>No</th>
                  <th style="max-width: 100px">Item Yokoten</th>
                  <th style="max-width: 50px">Plan Date</th>
                  <th style="max-width: 50px">PIC</th>
                  <th style="max-width: 50px">Judg</th>
                  <th colspan="2">actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(yokoten, i) in containerYokoten" :key="i">
                  <td class="border" style="min-width: 10px">{{ i + 1 }}</td>
                  <td
                    class="text-left border"
                    style="min-width: 220px"
                    v-if="!isEditYokoten || idxYokotenSelected != i"
                  >
                    {{ yokoten.machine }}
                  </td>
                  <td
                    class="text-left border"
                    style="min-width: 220px"
                    v-else-if="isEditYokoten || idxYokotenSelected != i"
                  >
                    <input type="text" v-model="yokoten.machine" />
                  </td>
                  <td
                    class="text-left border"
                    style="min-width: 50px"
                    v-if="!isEditYokoten || idxYokotenSelected != i"
                  >
                    {{ yokoten.datePlan }}
                  </td>
                  <td
                    class="text-left border"
                    style="min-width: 220px"
                    v-else-if="isEditYokoten || idxYokotenSelected != i"
                  >
                    <input type="date" v-model="yokoten.datePlan" />
                  </td>
                  <td
                    class="text-left border"
                    style="min-width: 50px"
                    v-if="!isEditYokoten || idxYokotenSelected != i"
                  >
                    {{ yokoten.pic }}
                  </td>
                  <td
                    class="text-left border"
                    style="min-width: 50px"
                    v-else-if="isEditYokoten || idxYokotenSelected != i"
                  >
                    <input type="text" v-model="yokoten.pic" />
                  </td>
                  <td
                    v-if="
                      yokoten.judg == true &&
                      (!isEditYokoten || idxYokotenSelected != i)
                    "
                    class="text-center border text-success"
                    style="min-width: 50px"
                  >
                    {{ "Sudah" }}
                  </td>
                  <td
                    v-else-if="
                      yokoten.judg == false &&
                      (!isEditYokoten || idxYokotenSelected != i)
                    "
                    class="text-center border text-danger"
                    style="min-width: 50px"
                  >
                    {{ "Belum" }}
                  </td>
                  <td
                    class="text-center border"
                    style="min-width: 50px"
                    v-else-if="isEditYokoten || idxYokotenSelected == i"
                  >
                    <select v-model="yokoten.judg">
                      <option :value="false">Belum</option>
                      <option :value="true">Sudah</option>
                    </select>
                  </td>
                  <td class="border">
                    <button
                      class="btn btn-primary py-1 input-lable"
                      v-if="!isEditYokoten || idxYokotenSelected != i"
                      @click="
                        onToogleEditObj(
                          'isEditYokoten',
                          'yokoField',
                          yokoten,
                          i
                        )
                      "
                    >
                      <i
                        class="fa fa-pencil"
                        style="font-size: 10px"
                        aria-hidden="true"
                      ></i>
                    </button>
                    <button
                      class="btn btn-primary py-1 input-lable"
                      @click="
                        editContainerObj(
                          i,
                          'containerYokoten',
                          'yokoField',
                          'isEditYokoten',
                          yokoten
                        )
                      "
                      v-else-if="isEditYokoten || idxYokotenSelected == i"
                    >
                      <i
                        class="fa fa-send"
                        style="font-size: 10px"
                        aria-hidden="true"
                      ></i>
                    </button>
                  </td>
                  <td class="border">
                    <button class="btn btn-danger py-1 input-lable">
                      <i
                        class="fa fa-trash"
                        style="font-size: 10px"
                        aria-hidden="true"
                        @click="removeContainerSingle(i, 'containerYokoten')"
                      ></i>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div v-if="isYokoten">
            <div
              class="
                row
                m-0
                p-0
                d-flex
                justify-content-around
                align-content-center
              "
            >
              <div class="col p-0">
                <input
                  class="form-control mt-1"
                  type="text"
                  placeholder="yokoyen item"
                  v-model="yokoField.machine"
                />
              </div>
              <div class="col p-0">
                <input
                  class="form-control mt-1"
                  type="date"
                  placeholder="date"
                  v-model="yokoField.datePlan"
                />
              </div>
              <div class="col p-0">
                <input
                  class="form-control mt-1"
                  type="text"
                  placeholder="Pic"
                  v-model="yokoField.pic"
                />
              </div>
            </div>
            <div class="row m-0 p-0">
              <div class="col p-0">
                <button
                  class="btn btn-info py-1 input-lable"
                  @click="onAddYokoten()"
                >
                  Submit
                </button>
              </div>
              <div class="col p-0 ml-2">
                <button
                  class="btn btn-danger py-1 input-lable"
                  @click="onCancel('isYokoten')"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- ISLONG BD (root LAMA) (CM LAMA) -->
      <!-- Why Lama -->
      <div v-if="isLongBd" class="row m-0 p-0">
        <div class="col px-1 text-left">
          <span class="input-lable">Rootcause 5 Why (kenapa lama) </span>
          <button
            class="btn btn-success py-1"
            @click="addToogle('isWhyLama')"
            style="font-size: 10px"
          >
            +
          </button>
          <div class="row m-0 p-0">
            <table
              id="table-why-lama"
              class="table table-responsive text-center"
              style="font-size: 10px"
            >
              <thead>
                <tr>
                  <th>No</th>
                  <th style="max-width: 100px">Description</th>
                  <th colspan="2">actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(whyLama, i) in containerWhyLama" :key="whyLama">
                  <td class="border" style="min-width: 10px">{{ i + 1 }}</td>
                  <td
                    class="text-left border"
                    style="min-width: 220px"
                    v-if="!isEditWhyLama || idxWhyLamaSelected != i"
                  >
                    {{ whyLama }}
                  </td>
                  <td
                    class="text-left border"
                    style="min-width: 220px"
                    v-else-if="isEditWhyLama && idxWhyLamaSelected == i"
                  >
                    <input type="text" v-model="descWhyLama" />
                  </td>
                  <td class="border">
                    <button
                      class="btn btn-primary py-1 input-lable"
                      @click="
                        onToogleEdit('isEditWhyLama', 'descWhyLama', whyLama, i)
                      "
                      v-if="!isEditWhyLama || idxWhyLamaSelected != i"
                    >
                      <i
                        class="fa fa-pencil"
                        style="font-size: 10px"
                        aria-hidden="true"
                      ></i>
                    </button>
                    <button
                      class="btn btn-primary py-1 input-lable"
                      @click="
                        editContainerSingle(
                          i,
                          'containerWhyLama',
                          'descWhyLama',
                          'isEditWhyLama'
                        )
                      "
                      v-else-if="isEditWhyLama && idxWhyLamaSelected == i"
                    >
                      <i
                        class="fa fa-send"
                        style="font-size: 10px"
                        aria-hidden="true"
                      ></i>
                    </button>
                  </td>
                  <td class="border">
                    <button class="btn btn-danger py-1 input-lable">
                      <i
                        class="fa fa-trash"
                        style="font-size: 10px"
                        aria-hidden="true"
                        @click="removeContainerSingle(i, 'containerWhyLama')"
                      ></i>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div
            class="
              row
              m-0
              p-0
              d-flex
              justify-content-around
              align-content-center
            "
            v-if="isWhyLama"
          >
            <div class="col-7 p-0">
              <input
                class="form-control mt-1"
                type="text"
                v-model="descWhyLama"
              />
            </div>
            <div class="col-2 p-0">
              <button
                class="btn btn-info py-1 input-lable"
                @click="onAddWhyLama()"
              >
                Submit
              </button>
            </div>
            <div class="col-2 p-0 ml-2">
              <button
                class="btn btn-danger py-1 input-lable"
                @click="onCancel('isWhyLama')"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
      <!-- CM LAMA -->
      <div v-if="isLongBd" class="row m-0 p-0">
        <div class="col px-1 text-left">
          <span class="input-lable">Countermeasure (kenapa Lama) </span>
          <button
            class="btn btn-success py-1"
            @click="addToogle('isCmLama')"
            style="font-size: 10px"
          >
            +
          </button>
          <div class="row m-0 p-0">
            <table
              id="table-cm-lama"
              class="table table-responsive text-center"
              style="font-size: 10px"
              v-if="containerCmLama.length > 0"
            >
              <thead>
                <tr>
                  <th>No</th>
                  <th style="max-width: 100px">Countermeasure</th>
                  <th style="max-width: 50px">Plan Date</th>
                  <th style="max-width: 50px">PIC</th>
                  <th style="max-width: 50px">Judg</th>
                  <th colspan="2">actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(cmLama, i) in containerCmLama" :key="i">
                  <td class="border" style="min-width: 10px">{{ i + 1 }}</td>
                  <td
                    class="text-left border"
                    style="min-width: 220px"
                    v-if="!isEditCmLama || idxCmLamaSelected != i"
                  >
                    {{ cmLama.cmDesc }}
                  </td>
                  <td
                    class="text-left border"
                    style="min-width: 220px"
                    v-else-if="isEditCmLama || idxCmLamaSelected == i"
                  >
                    <input type="text" v-model="cmLama.cmDesc" />
                  </td>
                  <td
                    class="text-left border"
                    style="min-width: 50px"
                    v-if="!isEditCmLama || idxCmLamaSelected != i"
                  >
                    {{ cmLama.datePlan }}
                  </td>
                  <td
                    class="text-left border"
                    style="min-width: 50px"
                    v-else-if="isEditCmLama || idxCmLamaSelected == i"
                  >
                    <input type="date" v-model="cmLama.datePlan" />
                  </td>
                  <td
                    class="text-left border"
                    style="min-width: 50px"
                    v-if="!isEditCmLama || idxCmLamaSelected != i"
                  >
                    {{ cmLama.pic }}
                  </td>
                  <td
                    class="text-left border"
                    style="min-width: 50px"
                    v-else-if="isEditCmLama || idxCmLamaSelected == i"
                  >
                    <input type="text" v-model="cmLama.pic" />
                  </td>
                  <td
                    v-if="
                      cmLama.judg == true &&
                      (!isEditCmLama || idxCmLamaSelected != i)
                    "
                    class="text-center border text-success"
                    style="min-width: 50px"
                  >
                    {{ "Sudah" }}
                  </td>
                  <td
                    class="text-center border text-danger"
                    style="min-width: 50px"
                    v-else-if="
                      cmLama.judg == false &&
                      (!isEditCmLama || idxCmLamaSelected != i)
                    "
                  >
                    {{ "Belum" }}
                  </td>
                  <td
                    class="text-center border"
                    style="min-width: 50px"
                    v-else-if="isEditCmLama || idxCmLamaSelected == i"
                  >
                    <select v-model="cmLama.judg">
                      <option :value="false">Belum</option>
                      <option :value="true">Sudah</option>
                    </select>
                  </td>
                  <td class="border">
                    <button
                      class="btn btn-primary py-1 input-lable"
                      @click="
                        onToogleEditObj('isEditCmLama', 'cmField', cmLama, i)
                      "
                      v-if="!isEditCmLama || idxCmLamaSelected != i"
                    >
                      <i
                        class="fa fa-pencil"
                        style="font-size: 10px"
                        aria-hidden="true"
                      ></i>
                    </button>
                    <button
                      class="btn btn-primary py-1 input-lable"
                      @click="
                        editContainerObj(
                          i,
                          'containerCmLama',
                          'cmField',
                          'isEditCmLama',
                          cmLama
                        )
                      "
                      v-else-if="isEditCmLama || idxCmLamaSelected == i"
                    >
                      <i
                        class="fa fa-send"
                        style="font-size: 10px"
                        aria-hidden="true"
                      ></i>
                    </button>
                  </td>
                  <td class="border">
                    <button
                      class="btn btn-danger py-1 input-lable"
                      @click="removeContainerSingle(i, 'containerCmLama')"
                    >
                      <i
                        class="fa fa-trash"
                        style="font-size: 10px"
                        aria-hidden="true"
                      ></i>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div v-if="isCmLama">
            <div
              class="
                row
                m-0
                p-0
                d-flex
                justify-content-around
                align-content-center
              "
            >
              <div class="col p-0">
                <input
                  class="form-control mt-1"
                  type="text"
                  placeholder="countermeasure"
                  v-model="cmField.cmDesc"
                />
              </div>
              <div class="col p-0">
                <input
                  class="form-control mt-1"
                  type="date"
                  placeholder="date"
                  v-model="cmField.datePlan"
                />
              </div>
              <div class="col p-0">
                <input
                  class="form-control mt-1"
                  type="text"
                  placeholder="Pic"
                  v-model="cmField.pic"
                />
              </div>
            </div>
            <div class="row m-0 p-0">
              <div class="col p-0">
                <button
                  class="btn btn-info py-1 input-lable"
                  @click="onAddCmLama()"
                >
                  Submit
                </button>
              </div>
              <div class="col p-0 ml-2">
                <button
                  class="btn btn-danger py-1 input-lable"
                  @click="onCancel('isCmLama')"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <LegendStatus style="margin-top: 20px" />
      <div class="card">
        <div class="row m-0 p-0 mt-1">
          <div class="col text-left">
            <span style="font-size: 9px; font-weight: bold"
              >Approval Status 5 Why</span
            >
          </div>
          <div
            class="col justify-content-around"
            v-if="
              setRole != 'TM' &&
              setRole != 'GH' &&
              setRole != 'Staff' &&
              setRole != 'DpH' &&
              setRole != 'DDH'
            "
          >
            <button
              class="btn-success btn px-2 py-1 fontSp mr-1"
              @click="submitEdit('WHY')"
              :disabled="containerWhyTerjadi.length < 0"
            >
              Approve
            </button>
            <button
              class="btn-info btn px-2 py-1 fontSp"
              @click="
                setRole == 'LH'
                  ? (isDialogShowLhFiveWhy = true)
                  : (isDialogShowShFiveWhy = true)
              "
            >
              Comment
            </button>
            <v-dialog v-model="isDialogShowLhFiveWhy" persistent width="500">
              <v-card>
                <v-card-title
                  class="headline grey lighten-2"
                  style="font-size: 15px !important"
                >
                  Comment 5 Why Line Head:
                </v-card-title>

                <v-card-text class="p-0">
                  <div class="container-fluid mt-4">
                    <div class="row p-0 m-0">
                      <div class="col p-0">
                        <div class="input-group mb-3">
                          <div class="input-group-prepend">
                            <span class="input-group-text">Feedback</span>
                          </div>
                          <input
                            type="text"
                            v-model="fiveWhyLhFeedback"
                            class="form-control"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <button
                    type="button"
                    class="btn btn-success"
                    data-dismiss="modal"
                    @click="submitEdit('WHYFB')"
                  >
                    Send Feedback
                  </button>
                  <button
                    type="button"
                    class="btn btn-secondary"
                    data-dismiss="modal"
                    @click="clearDialog()"
                  >
                    Close
                  </button>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-dialog v-model="isDialogShowShFiveWhy" persistent width="500">
              <v-card>
                <v-card-title
                  class="headline grey lighten-2"
                  style="font-size: 15px !important"
                >
                  Comment 5 Why Section Head:
                </v-card-title>

                <v-card-text class="p-0">
                  <div class="container-fluid mt-4">
                    <div class="row p-0 m-0">
                      <div class="col p-0">
                        <div class="input-group mb-3">
                          <div class="input-group-prepend">
                            <span class="input-group-text">Feedback</span>
                          </div>
                          <input
                            type="text"
                            v-model="fiveWhyShFeedback"
                            class="form-control"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <button
                    type="button"
                    class="btn btn-success"
                    data-dismiss="modal"
                    @click="submitEdit('WHYFB')"
                  >
                    Send Feedback
                  </button>
                  <button
                    type="button"
                    class="btn btn-secondary"
                    data-dismiss="modal"
                    @click="clearDialog()"
                  >
                    Close
                  </button>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </div>
        </div>
        <div class="row align-items-center justify-content-center m-0 p-0 mt-1">
          <div class="col">
            <table class="table table-bordered mt-1">
              <thead class="fontSp">
                <tr>
                  <th>TL Check</th>
                  <th>GL Check</th>
                  <th>SH Check</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <div :class="`${fiveWhyTlApprove} text-center`">
                      <span style="font-size: 6px">.</span>
                    </div>
                  </td>
                  <td>
                    <div :class="`${fiveWhylhCheck} text-center`">
                      <span style="font-size: 6px">.</span>
                    </div>
                  </td>
                  <td>
                    <div :class="`${fiveWhyshCheck} text-center`">
                      <span style="font-size: 6px">.</span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <!-- Approval Status CM -->
        <div v-if="fiveWhyShApprove == 1">
          <div class="row m-0 p-0 mt-1">
            <div class="col text-left">
              <span style="font-size: 9px; font-weight: bold"
                >Approval Status Countermeasure</span
              >
            </div>
            <div
              class="col justify-content-around"
              v-if="
                setRole != 'TM' &&
                setRole != 'GH' &&
                setRole != 'Staff' &&
                setRole != 'DpH' &&
                setRole != 'DDH'
              "
            >
              <button
                class="btn-success btn px-2 py-1 fontSp mr-1"
                @click="submitEdit('CM')"
                :disabled="containerCmTerjadi.length < 0"
              >
                Approve
              </button>
              <button
                class="btn-info btn px-2 py-1 fontSp"
                @click="
                  setRole == 'LH'
                    ? (isDialogShowLhCm = true)
                    : (isDialogShowShCm = true)
                "
              >
                Comment
              </button>
              <v-dialog v-model="isDialogShowLhCm" persistent width="500">
                <v-card>
                  <v-card-title
                    class="headline grey lighten-2"
                    style="font-size: 15px !important"
                  >
                    Comment C/M Line Head:
                  </v-card-title>

                  <v-card-text class="p-0">
                    <div class="container-fluid mt-4">
                      <div class="row p-0 m-0">
                        <div class="col p-0">
                          <div class="input-group mb-3">
                            <div class="input-group-prepend">
                              <span class="input-group-text">Feedback</span>
                            </div>
                            <input
                              type="text"
                              v-model="cmLhFeedback"
                              class="form-control"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </v-card-text>
                  <v-divider></v-divider>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <button
                      type="button"
                      class="btn btn-success"
                      data-dismiss="modal"
                      @click="submitEdit('CMFB')"
                    >
                      Send Feedback
                    </button>
                    <button
                      type="button"
                      class="btn btn-secondary"
                      data-dismiss="modal"
                      @click="clearDialog()"
                    >
                      Close
                    </button>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <v-dialog v-model="isDialogShowShCm" persistent width="500">
                <v-card>
                  <v-card-title
                    class="headline grey lighten-2"
                    style="font-size: 15px !important"
                  >
                    Comment C/M Section Head:
                  </v-card-title>

                  <v-card-text class="p-0">
                    <div class="container-fluid mt-4">
                      <div class="row p-0 m-0">
                        <div class="col p-0">
                          <div class="input-group mb-3">
                            <div class="input-group-prepend">
                              <span class="input-group-text">Feedback</span>
                            </div>
                            <input
                              type="text"
                              v-model="cmShFeedback"
                              class="form-control"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </v-card-text>
                  <v-divider></v-divider>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <button
                      type="button"
                      class="btn btn-success"
                      data-dismiss="modal"
                      @click="submitEdit('CMFB')"
                    >
                      Send Feedback
                    </button>
                    <button
                      type="button"
                      class="btn btn-secondary"
                      data-dismiss="modal"
                      @click="clearDialog()"
                    >
                      Close
                    </button>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </div>
          </div>
          <div
            class="row align-items-center justify-content-center m-0 p-0 mt-1"
          >
            <div class="col">
              <table class="table table-bordered mt-1">
                <thead class="fontSp">
                  <tr>
                    <th>TL Check</th>
                    <th>GL Check</th>
                    <th>SH Check</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <div :class="`${cmTlApprove} text-center`">
                        <span style="font-size: 6px">.</span>
                      </div>
                    </td>
                    <td>
                      <div :class="`${cmlhCheck} text-center`">
                        <span style="font-size: 6px">.</span>
                      </div>
                    </td>
                    <td>
                      <div :class="`${cmshCheck} text-center`">
                        <span style="font-size: 6px">.</span>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <!-- Approval Status CM DH -->
        <div v-if="fiveWhyShApprove == 1">
          <div class="row m-0 p-0 mt-1">
            <div class="col text-left">
              <span style="font-size: 9px; font-weight: bold"
                >Approval Status Departement Head</span
              >
            </div>
            <div class="col justify-content-around" v-if="setRole == 'DpH'">
              <button
                class="btn-success btn px-2 py-1 fontSp mr-1"
                @click="submitEdit('CM')"
                :disabled="containerCmTerjadi.length < 0"
              >
                Approve
              </button>
              <button
                class="btn-info btn px-2 py-1 fontSp"
                @click="isDialogShowDhCm = true"
              >
                Comment
              </button>
              <v-dialog v-model="isDialogShowDhCm" persistent width="500">
                <v-card>
                  <v-card-title
                    class="headline grey lighten-2"
                    style="font-size: 15px !important"
                  >
                    Comment C/M Departement Head:
                  </v-card-title>

                  <v-card-text class="p-0">
                    <div class="container-fluid mt-4">
                      <div class="row p-0 m-0">
                        <div class="col p-0">
                          <div class="input-group mb-3">
                            <div class="input-group-prepend">
                              <span class="input-group-text">Feedback</span>
                            </div>
                            <input
                              type="text"
                              v-model="cmDhFeedback"
                              class="form-control"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </v-card-text>
                  <v-divider></v-divider>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <button
                      type="button"
                      class="btn btn-success"
                      data-dismiss="modal"
                      @click="submitEdit('CMFB')"
                    >
                      Send Feedback
                    </button>
                    <button
                      type="button"
                      class="btn btn-secondary"
                      data-dismiss="modal"
                      @click="clearDialog()"
                    >
                      Close
                    </button>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </div>
          </div>
          <div
            class="row align-items-center justify-content-center m-0 p-0 mt-1"
          >
            <div class="col">
              <table class="table table-bordered mt-1">
                <thead class="fontSp">
                  <tr>
                    <th>DpH Check</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <div :class="`${dhCheck} text-center`">
                        <span style="font-size: 6px">.</span>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <!-- Comment 5Why -->
        <div>
          <div class="row m-0 p-0 mt-1">
            <div class="col text-left">
              <span style="font-size: 9px; font-weight: bold"
                >Comments 5 Why</span
              >
            </div>
          </div>
          <!-- isi comment 5 Why LH -->
          <div
            class="row mb-1"
            v-if="
              String(fiveWhyLhFeedback) != 'null' &&
              String(fiveWhyLhFeedback) != ''
            "
          >
            <div class="col-2 p-1 pr-0">
              <img
                src="https://ptetutorials.com/images/user-profile.png"
                alt="sunil"
                width="30"
                style="position: absolute"
              />
            </div>
            <div class="col-9 p-1">
              <div
                class="card rounded-all text-left p-1"
                style="font-size: 9px"
              >
                {{ fiveWhyLhFeedback }}
              </div>
            </div>
          </div>
          <!-- isi comment 5 Why SH -->
          <div
            class="row mb-1"
            v-if="
              String(fiveWhyShFeedback) != 'null' &&
              String(fiveWhyShFeedback) != ''
            "
          >
            <div class="col-2 p-1 pr-0">
              <img
                src="https://ptetutorials.com/images/user-profile.png"
                alt="sunil"
                width="30"
                style="position: absolute"
              />
            </div>
            <div class="col-9 p-1">
              <div
                class="card rounded-all text-left p-1"
                style="font-size: 9px"
              >
                {{ fiveWhyShFeedback }}
              </div>
            </div>
          </div>
          <!-- no comment -->
          <div
            class="row p-0 m-0"
            v-if="
              (String(fiveWhyShFeedback) == 'null' &&
                String(fiveWhyLhFeedback) == 'null') ||
              (String(fiveWhyShFeedback) == '' &&
                String(fiveWhyLhFeedback) == '')
            "
          >
            <div class="col text-secondary text-start fontSp">No Comments</div>
          </div>
        </div>
        <!-- Comment CM -->
        <div>
          <div class="row m-0 p-0 mt-1">
            <div class="col text-left">
              <span style="font-size: 9px; font-weight: bold"
                >Comments Countermeasure</span
              >
            </div>
          </div>
          <!-- isi comment Countermeasure LH -->
          <div
            class="row mb-1"
            v-if="String(cmLhFeedback) != 'null' && String(cmLhFeedback) != ''"
          >
            <div class="col-2 p-1 pr-0">
              <img
                src="https://ptetutorials.com/images/user-profile.png"
                alt="sunil"
                width="30"
                style="position: absolute"
              />
            </div>
            <div class="col-9 p-1">
              <div
                class="card rounded-all text-left p-1"
                style="font-size: 9px"
              >
                {{ cmLhFeedback }}
              </div>
            </div>
          </div>
          <!-- isi comment 5 Why SH -->
          <div
            class="row mb-1"
            v-if="String(cmShFeedback) != 'null' && String(cmShFeedback) != ''"
          >
            <div class="col-2 p-1 pr-0">
              <img
                src="https://ptetutorials.com/images/user-profile.png"
                alt="sunil"
                width="30"
                style="position: absolute"
              />
            </div>
            <div class="col-9 p-1">
              <div
                class="card rounded-all text-left p-1"
                style="font-size: 9px"
              >
                {{ cmShFeedback }}
              </div>
            </div>
          </div>
          <!-- isi comment 5 Why SH -->
          <div
            class="row mb-1"
            v-if="String(cmDhFeedback) != 'null' && String(cmDhFeedback) != ''"
          >
            <div class="col-2 p-1 pr-0">
              <img
                src="https://ptetutorials.com/images/user-profile.png"
                alt="sunil"
                width="30"
                style="position: absolute"
              />
            </div>
            <div class="col-9 p-1">
              <div
                class="card rounded-all text-left p-1"
                style="font-size: 9px"
              >
                {{ cmDhFeedback }}
              </div>
            </div>
          </div>
          <!-- no comment -->
          <div
            class="row p-0 m-0"
            v-if="
              (String(cmShFeedback) == 'null' &&
                String(cmLhFeedback) == 'null') ||
              (String(cmShFeedback) == '' && String(cmLhFeedback) == '')
            "
          >
            <div class="col text-secondary text-start fontSp">No Comments</div>
          </div>
        </div>
      </div>
      <!-- SUBMIT EDIT BTN -->
      <hr class="bg-light m-0" />
      <div class="row m-0 p-0 mt-3">
        <div class="col-6">
          <button
            v-if="!isDurationInvalid"
            class="btn btn-outline-success"
            :id="`${isPleaseFinish ? 'blink' : ''}`"
            @click="submitEdit()"
            :disabled="isLoading"
            style="width: 100%"
          >
            <i
              v-if="isLoading"
              class="fa fa-refresh fa-spin"
              style="font-size: 14px"
            ></i>
            <div v-else>Finish</div>
          </button>
          <button
            class="btn btn-outline-info"
            v-if="isDurationInvalid && !isProblemClose"
            @click="updateEdit()"
            style="width: 100%"
          >
            <i
              v-if="isLoading"
              class="fa fa-refresh fa-spin"
              style="font-size: 14px"
            ></i>
            <div v-else>Update</div>
          </button>
        </div>
        <div class="col-6">
          <button
            class="btn btn-outline-danger"
            @click="goBack()"
            style="width: 100%"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </ScrollableContainer>
</template>

<script>
import ScrollableContainer from "vue-scrollable-container";
import axios from "axios";
import { mapState } from "vuex";
import LegendStatus from "@/components/LegendStatus";
// import ExcalamationInfo from "../components/ExclamationInfo";
// import moment from "moment";

export default {
  name: "EditProblem",
  data() {
    return {
      isWhyTerjadi: false,
      isActionCm: false,
      isTaskforce: false,
      isEditWhyTerjadi: false,
      idxWhyTerjadiSelected: -1,
      isWhyLama: false,
      isEditWhyLama: false,
      idxWhyLamaSelected: -1,
      isStepRepair: false,
      isEditStepRepair: false,
      idxStepRepairSelected: -1,
      isCmTerjadi: false,
      isEditCmTerjadi: false,
      idxCmTerjadiSelected: -1,
      isCmLama: false,
      isEditCmLama: false,
      idxCmLamaSelected: -1,
      isYokoten: false,
      isEditYokoten: false,
      idxYokotenSelected: -1,
      containerWhyTerjadi: [],
      containerWhyLama: [],
      containerStepRepair: [],
      containerCmTerjadi: [],
      containerCmLama: [],
      containerYokoten: [],
      descWhyTerjadi: "",
      descWhyLama: "",
      descStepRepair: "",
      tlCheck: "dot",
      fiveWhylhCheck: "dot",
      fiveWhyshCheck: "dot",
      cmlhCheck: "dot",
      cmshCheck: "dot",
      dhCheck: "dot",
      cmField: {
        cmDesc: "",
        datePlan: "",
        pic: "",
        judg: false,
      },
      yokoField: {
        machine: "",
        datePlan: "",
        pic: "",
        judg: false,
      },
      fpart_change: "",
      fmc_name: "",
      fline: "",
      foperation_no: "",
      fmaker: "",
      ferror_name: "",
      foperator: "",
      isLoading: false,
      fshift: "",
      fav_categoty: "",
      startDate: "",
      endDate: "",
      startTime: "",
      endTime: "",
      fdur: "",
      fDescImage: "",
      isLongBd: false,
      url: null,
      isDurationInvalid: false,
      isProblemClose: false,
      fmc_id: null,
      isHenkatenForm: false,

      fiveWhyTlApprove: "dot",
      fiveWhyLhApprove: 0,
      fiveWhyShApprove: 0,
      fiveWhyLhFeedback: "",
      fiveWhyShFeedback: "",

      cmLhApprove: 0,
      cmShApprove: 0,
      cmLhFeedback: "",
      cmShFeedback: "",

      cmDhApprove: 0,
      cmTlApprove: "dot",

      cmDhFeedback: "",
      cmTlFeedback: "",

      isDialogShowLhFiveWhy: false,
      isDialogShowLhCm: false,
      isDialogShowShFiveWhy: false,
      isDialogShowShCm: false,

      isDialogShowDhCm: false,

      itemsStatus: ["Approve", "Tidak Approve"],

      selectedStatusLhFiveWhy: "Tidak Approve",
      selectedStatusShFiveWhy: "Tidak Approve",
      selectedStatusLhCm: "Tidak Approve",
      selectedStatusShCm: "Tidak Approve",
      isLineHead: false,
      isSectionHead: false,

      setName: null,
      setArea: null,
      setRole: null,

      isPleaseFinish: "false",
      temporaryAction: "",

      isFullcap: false,
      uploadImage: null,
      urlUpload: `${process.env.VUE_APP_HOST}/upload`,
      fileName: null,
      selectedFile: null,
      fimage: null,
    };
  },
  watch: {
    isTaskforce: function () {
      if (this.isTaskforce == true) {
        if (!this.ferror_name.includes("[TASKFORCE]")) {
          this.ferror_name += "[TASKFORCE]";
        }
      } else {
        this.ferror_name = this.ferror_name.split("[")[0];
      }
    },
    isFullcap: function () {
      if (this.isFullcap == true) {
        if (!this.ferror_name.includes("[FULLCAP]")) {
          this.ferror_name = "[FULLCAP]" + this.ferror_name;
        }
      } else {
        this.ferror_name = this.ferror_name.split("]")[1];
      }
    },
    isDialogShowLhFiveWhy: function () {
      if (this.isDialogShowLhFiveWhy == true) {
        this.fiveWhyLhFeedback = this.fiveWhyLhFeedback.split(": ")[1];
      }
    },
    isDialogShowShFiveWhy: function () {
      if (this.isDialogShowShFiveWhy == true) {
        this.fiveWhyShFeedback = this.fiveWhyShFeedback.split(": ")[1];
      }
    },
    isDialogShowLhCm: function () {
      if (this.isDialogShowLhCm == true) {
        this.cmLhFeedback = this.cmLhFeedback.split(": ")[1];
      }
    },
    isDialogShowShCm: function () {
      if (this.isDialogShowShCm == true) {
        this.cmShFeedback = this.cmShFeedback.split(": ")[1];
      }
    },
    isDialogShowDhCm: function () {
      if (this.isDialogShowDhCm == true) {
        this.cmDhFeedback = this.cmDhFeedback.split(": ")[1];
      }
    },
    startDate: function () {
      let strStartDate = `${this.startDate} ${this.startTime}`;
      let strEndDate = `${this.endDate} ${this.endTime}`;
      let start = new Date(strStartDate.replace(" ", "T"));
      let finish = new Date(strEndDate.replace(" ", "T"));
      let dura = (finish - start) / 1000 / 60;
      if (dura >= 120) {
        this.isLongBd = true;
      } else if (dura >= 30 && this.fline == "ASSY LINE") {
        this.isLongBd = true;
      }
      if (dura.toFixed("1").includes("-")) {
        // alert(`tidak bisa memasukan durasi minus (${dura})`);
        this.isDurationInvalid = true;
      } else if (isNaN(dura)) {
        // alert(
        //   "tolong masukan date start dan date end apabila problem sudah selesai"
        // );
        this.isDurationInvalid = true;
      } else {
        this.fdur = dura;
        this.isDurationInvalid = false;
      }
    },
    startTime: function () {
      let strStartDate = `${this.startDate} ${this.startTime}`;
      let strEndDate = `${this.endDate} ${this.endTime}`;
      let start = new Date(strStartDate.replace(" ", "T"));
      let finish = new Date(strEndDate.replace(" ", "T"));
      let dura = (finish - start) / 1000 / 60;
      if (dura >= 120) {
        this.isLongBd = true;
      } else if (dura >= 30 && this.fline == "ASSY LINE") {
        this.isLongBd = true;
      }
      if (dura.toFixed("1").includes("-")) {
        // alert(`tidak bisa memasukan durasi minus (${dura})`);
        this.isDurationInvalid = true;
      } else if (isNaN(dura)) {
        // alert(
        //   "tolong masukan date start dan date end apabila problem sudah selesai"
        // );
        this.isDurationInvalid = true;
      } else {
        this.fdur = dura;
        this.isDurationInvalid = false;
      }
    },
    endDate: function () {
      let strStartDate = `${this.startDate} ${this.startTime}`;
      let strEndDate = `${this.endDate} ${this.endTime}`;
      let start = new Date(strStartDate.replace(" ", "T"));
      let finish = new Date(strEndDate.replace(" ", "T"));
      let dura = (finish - start) / 1000 / 60;
      console.log(dura);
      if (dura >= 120) {
        this.isLongBd = true;
      } else if (dura >= 30 && this.fline == "ASSY LINE") {
        this.isLongBd = true;
      }
      if (dura.toFixed("1").includes("-")) {
        // alert(`tidak bisa memasukan durasi minus (${dura})`);
        this.isDurationInvalid = true;
      } else if (isNaN(dura)) {
        // alert(
        //   "tolong masukan date start dan date end apabila problem sudah selesai"
        // );
        this.isDurationInvalid = true;
      } else {
        this.fdur = dura;
        this.isDurationInvalid = false;
        this.isProblemClose = true;
      }
    },
    endTime: function () {
      let strStartDate = `${this.startDate} ${this.startTime}`;
      let strEndDate = `${this.endDate} ${this.endTime}`;
      let start = new Date(strStartDate.replace(" ", "T"));
      let finish = new Date(strEndDate.replace(" ", "T"));
      console.log((finish.getTime() - start.getTime()) / 1000 / 60);
      let dura = (finish - start) / 1000 / 60;
      if (dura >= 120) {
        this.isLongBd = true;
      } else if (dura >= 30 && this.fline == "ASSY LINE") {
        this.isLongBd = true;
      }
      if (dura.toFixed("1").includes("-")) {
        alert(`tidak bisa memasukan durasi minus (${dura})`);
        this.isDurationInvalid = true;
      } else if (isNaN(dura)) {
        alert(
          "tolong masukan date start dan date end apabila problem sudah selesai"
        );
        this.isDurationInvalid = true;
      } else {
        this.fdur = dura;
        this.isDurationInvalid = false;
        this.isProblemClose = true;
      }
    },
    isEditWhyTerjadi: function () {},
    isEditWhyLama: function () {
      console.log("lama berubah");
    },
    storeTheme: function () {
      var all = document.getElementsByClassName("form-control");
      var inputsLabel = document.getElementsByClassName("input-lable");
      if (this.storeTheme == "light") {
        for (let i = 0; i < all.length; i++) {
          all[i].style.color = "black";
        }
        for (let i = 0; i < inputsLabel.length; i++) {
          inputsLabel[i].style.color = "black";
        }
        document.getElementById(`table-step-repair`).style.color = "black";
        document.getElementById(`table-why-lama`).style.color = "black";
        document.getElementById(`table-why-terjadi`).style.color = "black";
        document.getElementById(`table-cm-terjadi`).style.color = "black";
        document.getElementById(`table-cm-lama`).style.color = "black";
        document.getElementById(`table-yokoten`).style.color = "black";
      } else {
        for (let i = 0; i < all.length; i++) {
          all[i].style.color = "white";
        }
        for (let i = 0; i < inputsLabel.length; i++) {
          inputsLabel[i].style.color = "white";
        }
        document.getElementById(`table-step-repair`).style.color = "white";
        document.getElementById(`table-why-lama`).style.color = "white";
        document.getElementById(`table-why-terjadi`).style.color = "white";
        document.getElementById(`table-cm-terjadi`).style.color = "white";
        document.getElementById(`table-cm-lama`).style.color = "white";
        document.getElementById(`table-yokoten`).style.color = "white";
      }
    },
    selectedStatusLhFiveWhy: function () {
      if (this.selectedStatusLhFiveWhy == "Tidak Approve") {
        this.fiveWhyLhApprove = 0;
      } else {
        this.fiveWhyLhApprove = 1;
      }
    },
    selectedStatusShFiveWhy: function () {
      if (this.selectedStatusShFiveWhy == "Tidak Approve") {
        this.fiveWhyShApprove = 0;
      } else {
        this.fiveWhyShApprove = 1;
      }
    },
    selectedStatusLhCm: function () {
      if (this.selectedStatusLhCm == "Tidak Approve") {
        this.cmLhApprove = 0;
      } else {
        this.cmLhApprove = 1;
      }
    },
    selectedStatusShCm: function () {
      if (this.selectedStatusShCm == "Tidak Approve") {
        this.cmShApprove = 0;
      } else {
        this.cmShApprove = 1;
      }
    },
    fiveWhyLhApprove: function () {
      this.clearDialog();
      if (this.fiveWhyLhApprove == 1) {
        this.isPleaseFinish = true;
        // alert("kalau sudah approve silahkan tekan FINISH");
      }
    },
    fiveWhyShApprove: function () {
      this.clearDialog();
      if (this.fiveWhyLhApprove == 1) {
        this.isPleaseFinish = true;
        // alert("kalau sudah approve silahkan tekan FINISH");
      }
    },
    cmLhApprove: function () {
      this.clearDialog();
      if (this.fiveWhyLhApprove == 1) {
        this.isPleaseFinish = true;
        // alert("kalau sudah approve silahkan tekan FINISH");
      }
    },
    cmShApprove: function () {
      this.clearDialog();
      if (this.fiveWhyLhApprove == 1) {
        this.isPleaseFinish = true;
        // alert("kalau sudah approve silahkan tekan FINISH");
      }
    },
    isActionCm: function () {
      console.log(this.cmField.cmDesc.includes("ACTION"));
      console.log(this.cmField.cmDesc.split("[")[0]);
      if (this.isActionCm == true) {
        this.cmField.cmDesc = `[ACTION]` + this.cmField.cmDesc;
      } else {
        this.cmField.cmDesc = this.cmField.cmDesc.split("]")[1];
      }
    },
  },
  computed: {
    ...mapState(["storeTheme"]),
  },
  methods: {
    onSelect() {
      const file = this.$refs.file.files[0];
      this.selectedFile = file;
    },
    async onSubmitUpload(url) {
      const formData = new FormData();

      formData.append("file", this.selectedFile);
      for (var key of formData.entries()) {
        console.log(key[1]);
      }
      console.log(this.selectedFile);
      console.log(formData);
      await axios
        .post(url, formData)
        .then((result) => {
          // console.log(result);
          if (result.status == 201) {
            this.fimage = result.data.path;
            alert(
              "success to upload, silahkan tekan tombol finished kalau sudah slesai input semua data"
            );
          }
        })
        .catch((err) => {
          console.log(err);
          alert(JSON.stringify(err));
        });
    },
    checkStatus(state) {
      // 1: approveCm, 2: delay, 3: comment, 4: none,
      if (state == 1) {
        return "dotApprove";
      } else if (state == 2) {
        return "dotDelay";
      } else if (state == 3) {
        return "dotComment";
      } else {
        return "dot";
      }
    },
    addToogle(cond) {
      this[`${cond}`] = true;
    },
    onCancel(cond) {
      this[`${cond}`] = false;
    },
    onAddWhyTerjadi() {
      this.containerWhyTerjadi.push(this.descWhyTerjadi);
      this.descWhyTerjadi = "";
      this.isWhyTerjadi = false;
    },
    onAddWhyLama() {
      this.containerWhyLama.push(this.descWhyLama);
      this.descWhyLama = "";
      this.isWhyLama = false;
    },
    onAddStepRepair() {
      this.containerStepRepair.push(this.descStepRepair);
      this.descStepRepair = "";
      this.isStepRepair = false;
    },
    onAddCmTerjadi() {
      this.containerCmTerjadi.push(this.cmField);
      this.cmField = {
        cmDesc: "",
        datePlan: "",
        pic: "",
        judg: false,
      };
      this.isCmTerjadi = false;
      this.isActionCm = false;
    },
    onAddCmLama() {
      this.containerCmLama.push(this.cmField);
      this.cmField = {
        cmDesc: "",
        datePlan: "",
        pic: "",
        judg: false,
      };
      this.isCmLama = false;
      this.isActionCm = false;
    },
    onAddYokoten() {
      this.containerYokoten.push(this.yokoField);
      this.yokoField = {
        machine: "",
        datePlan: "",
        pic: "",
        judg: false,
      };
      this.isYokoten = false;
    },
    onToogleEdit(condToogle, editDesc = null, beforeValue = null, idxSelected) {
      this[`${condToogle}`] = true;
      this.idxWhyTerjadiSelected = idxSelected;
      this.idxWhyLamaSelected = idxSelected;
      this.idxStepRepairSelected = idxSelected;
      if (editDesc || beforeValue) {
        this[`${editDesc}`] = beforeValue;
      }
    },
    onToogleEditObj(
      condToogle,
      editDesc = null,
      beforeValue = null,
      idxSelected
    ) {
      this[`${condToogle}`] = true;
      this.idxCmTerjadiSelected = idxSelected;
      this.idxCmLamaSelected = idxSelected;
      this.idxYokotenSelected = idxSelected;
      if (editDesc == "cmField") {
        this[`${editDesc}`] = {
          cmDesc: beforeValue.cmDesc,
          datePlan: beforeValue.datePlan,
          pic: beforeValue.pic,
          judg: beforeValue.judg,
        };
      } else {
        this[`${editDesc}`] = {
          machine: beforeValue.machine,
          datePlan: beforeValue.datePlan,
          pic: beforeValue.pic,
          judg: beforeValue.judg,
        };
      }
    },
    removeContainerSingle(i, containerName) {
      let postIdx = i;
      if (postIdx > -1) {
        this[`${containerName}`].splice(postIdx, 1);
      }
    },
    editContainerSingle(idx, containerName, editDesc, condToogle) {
      this[`${containerName}`].splice(idx, 1, this[`${editDesc}`]);
      this[`${condToogle}`] = false;
      this[`${editDesc}`] = "";
    },
    editContainerObj(idx, containerName, editDesc, condToogle, afterVal) {
      console.log(this[`${containerName}`]);
      console.log(this[`${editDesc}`]);
      this[`${editDesc}`] = afterVal;
      this[`${containerName}`].splice(idx, 1, this[`${editDesc}`]);
      this[`${condToogle}`] = false;
      this[`${editDesc}`] = { cmDesc: "", datePlan: "", pic: "", judg: false };
    },
    async submitEdit(approveStatus) {
      this.isLoading = true;
      let isBack = true;
      if (approveStatus == "WHY") {
        isBack = false;
        if (this.setRole == "LH") {
          this.fiveWhyLhApprove = 1;
        } else if (this.setRole == "SH") {
          this.fiveWhyShApprove = 1;
        }
      } else if (approveStatus == "CM") {
        isBack = false;
        if (this.setRole == "LH") {
          this.cmLhApprove = 1;
        } else if (this.setRole == "SH") {
          this.cmShApprove = 1;
        } else if (this.setRole == "DpH") {
          this.cmDhApprove = 1;
        }
      } else if (approveStatus == "WHYFB") {
        isBack = false;
        if (this.setRole == "LH") {
          this.fiveWhyLhFeedback = `${this.setName}(${this.setRole}): ${this.fiveWhyLhFeedback}`;
          await this.sendFeedback("LH5W");
        } else if (this.setRole == "SH") {
          this.fiveWhyShFeedback = `${this.setName}(${this.setRole}): ${this.fiveWhyShFeedback}`;
          await this.sendFeedback("SH5W");
        }
      } else if (approveStatus == "CMFB") {
        isBack = false;
        if (this.setRole == "LH") {
          this.cmLhFeedback = `${this.setName}(${this.setRole}): ${this.cmLhFeedback}`;
          await this.sendFeedback("LHCM");
        } else if (this.setRole == "SH") {
          this.cmShFeedback = `${this.setName}(${this.setRole}): ${this.cmShFeedback}`;
          await this.sendFeedback("SHCM");
        } else if (this.setRole == "DpH") {
          this.cmDhFeedback = `${this.setName}(${this.setRole}): ${this.cmDhFeedback}`;
          await this.sendFeedback("DHCM");
        }
      }

      // #REVISICM
      if (localStorage.getItem("beforeCm")) {
        if (
          JSON.stringify(this.containerCmTerjadi) !=
          localStorage.getItem("beforeCm")
        ) {
          // console.log("Ada Revisi");
          if (
            this.cmLhApprove != 1 &&
            (this.cmLhFeedback != "" || this.cmLhFeedback != "null")
          ) {
            await this.sendNotif(
              this.fline,
              this.fshift === "w" ? "WHITE" : "RED",
              "LH",
              `Countermeasure sudah di revisi Silahkan kembali di cek:
https://smartandonsys.web.app/editProblem?v_=${this.$route.query.v_}`
            );
          } else if (
            this.cmShApprove != 1 &&
            (this.cmShFeedback != "" || this.cmShFeedback != "null")
          ) {
            await this.sendNotif(
              this.fline,
              this.fshift === "w" ? "WHITE" : "RED",
              "SH",
              `Countermeasure sudah di revisi Silahkan kembali di cek:
https://smartandonsys.web.app/editProblem?v_=${this.$route.query.v_}`
            );
          } else if (
            // SH must approve dulu
            this.cmDhApprove != 1 &&
            this.cmShApprove == 1 &&
            (this.cmDhFeedback != "" || this.cmDhFeedback != "null")
          ) {
            await this.sendNotif(
              this.fline,
              "NON",
              "DpH",
              `Countermeasure sudah di revisi Silahkan kembali di cek:
https://smartandonsys.web.app/editProblem?v_=${this.$route.query.v_}`
            );
          }
        }
      }
      if (this.containerWhyTerjadi.length == 1) {
        this.containerWhyTerjadi.push("");
      }
      if (this.containerWhyLama.length == 1) {
        this.containerWhyTerjadi.push("");
      }
      let dataPrev = {
        ferror_name: this.ferror_name,
        foperator: this.foperator,
        fshift: this.fshift,
        fav_categoty: this.fav_categoty,
        fstart_time: [this.startDate, this.startTime],
        fend_time: [this.endDate, this.endTime],
        fpart_change: this.fpart_change,
        fDescImage: this.fDescImage,
        fstep_repair: this.containerStepRepair.join("\n"),
        fiveWhyLhApprove: this.fiveWhyLhApprove,
        fiveWhyShApprove: this.fiveWhyShApprove,
        cmLhApprove: this.cmLhApprove,
        cmShApprove: this.cmShApprove,
        cmDhApprove: this.cmDhApprove,
        fiveWhyLhFeedback: this.fiveWhyLhFeedback,
        fiveWhyShFeedback: this.fiveWhyShFeedback,
        cmLhFeedback: this.cmLhFeedback,
        cmShFeedback: this.cmShFeedback,
        cmDhFeedback: this.cmDhFeedback,
        freal_prob: this.containerWhyTerjadi.join("\n"),
        froot_cause: this.containerWhyLama.join("\n"),
        fpermanet_cm: JSON.stringify(this.containerCmTerjadi),
        fyokoten: JSON.stringify(this.containerYokoten),
        fpermanet_cm_lama: JSON.stringify(this.containerCmLama),
        temporaryAction: this.temporaryAction,
      };
      if (this.fimage) {
        dataPrev.fimage = this.fimage;
      }

      if (
        this.temporaryAction != "" &&
        `${this.temporaryAction}`.toLowerCase() != "null"
      ) {
        await this.postHenkaten();
      }
      if (this.fav_categoty != null) {
        if (this.fshift != null) {
          // let url' = `http://localhost:5001/smartandonsys/us-central1/app/editProblem/${this.$route.query.v_}`;
          let url = `${process.env.VUE_APP_HOST}/editProblem/${this.$route.query.v_}`;
          if (this.isProblemClose) {
            url += `?isFinished=${this.fmc_id}&line=${this.fline}`;
          }
          await axios
            .put(url, dataPrev)
            .then(async (result) => {
              console.log(result);
              if (this.fdur >= 30) {
                if (
                  this.fiveWhyLhApprove == 0 &&
                  (this.fiveWhyLhFeedback == "" ||
                    this.fiveWhyLhFeedback == "null" ||
                    this.fiveWhyLhFeedback == null) &&
                  (this.setRole == "TM" || this.setRole == "GH")
                ) {
                  await this.sendNotif(
                    this.setArea,
                    this.fshift === "w" ? "WHITE" : "RED",
                    "LH",
                    `Ada 5 Why Problem baru yang harus di cek
Silahkan klik link di bawah:
https://smartandonsys.web.app/editProblem?v_=${this.$route.query.v_}`
                  );
                }
                if (
                  this.fiveWhyLhApprove == 1 &&
                  this.fiveWhyShApprove == 0 &&
                  (this.fiveWhyShFeedback == "" ||
                    this.fiveWhyShFeedback == "null")
                ) {
                  // SEND NOTIF TO LINE HEAD to confirm check analysis and creator info Lh already approve
                  await this.sendNotif(
                    this.setArea,
                    this.fshift === "w" ? "WHITE" : "RED",
                    "SH,GH,TM",
                    `5 Why sudah di approve pak ${this.setName}(${this.setRole}) selanjutnya SH untuk cek:
https://smartandonsys.web.app/editProblem?v_=${this.$route.query.v_}`
                  );
                }
                if (
                  this.fiveWhyShApprove == 1 &&
                  this.fiveWhyLhApprove == 1 &&
                  this.containerCmTerjadi.length == 0 &&
                  this.setRole == "SH"
                ) {
                  // SEND NOTIF TO LINE HEAD & CREATOR to create countermeasure
                  await this.sendNotif(
                    this.setArea,
                    this.fshift === "w" ? "WHITE" : "RED",
                    "LH,TM,GH",
                    `5 Why Problem sudah di approve oleh pak ${this.setName}(${this.setRole})
silahkan di buat untuk countermeasurenya:
https://smartandonsys.web.app/editProblem?v_=${this.$route.query.v_}`
                  );
                }
                if (
                  (this.containerCmTerjadi.length > 0 ||
                    this.containerCmLama.length > 0) &&
                  this.cmLhApprove == 0 &&
                  this.fiveWhyLhApprove == 1 &&
                  this.fiveWhyShApprove == 1 &&
                  (this.cmLhFeedback == "" || this.cmLhFeedback == "null") &&
                  (this.setRole == "TM" || this.setRole == "GH")
                ) {
                  // SEND NOTIF TO LH if TM already submit C/M
                  await this.sendNotif(
                    this.setArea,
                    this.fshift === "w" ? "WHITE" : "RED",
                    "LH",
                    `Countermeasure sudah di buat pak ${this.setName}(${this.setRole})
Selanjutnya LH untuk cek:
https://smartandonsys.web.app/editProblem?v_=${this.$route.query.v_}`
                  );
                }
                if (
                  (this.containerCmTerjadi.length > 0 ||
                    this.containerCmLama.length > 0) &&
                  this.cmLhApprove == 1 &&
                  this.cmShApprove == 0 &&
                  (this.cmShFeedback == "" || this.cmShFeedback == "null") &&
                  this.setRole == "LH"
                ) {
                  // SEND NOTIF TO SECTION HEAD to confirm check countermeasure and creator info Lh already approve
                  // this.sendNotif(name, message)
                  await this.sendNotif(
                    this.setArea,
                    this.fshift === "w" ? "WHITE" : "RED",
                    "SH,GH,TM",
                    `Countermeasure sudah di approve pak ${this.setName}(${this.setRole}) selanjutnya SH untuk cek:
https://smartandonsys.web.app/editProblem?v_=${this.$route.query.v_}`
                  );
                }
                if (
                  this.cmShApprove == 1 &&
                  this.cmLhApprove == 1 &&
                  this.cmDhApprove == 1
                ) {
                  // SEND NOTIF TO LINE HEAD & CREATOR to do countermeasure
                  await this.sendNotif(
                    this.setArea,
                    this.fshift === "w" ? "WHITE" : "RED",
                    "LH,TM,GH",
                    `Countermeasure sudah di approve oleh pak ${this.setName}(${this.setRole})
silahkan Eksekusi untuk countermeasurenya:
https://smartandonsys.web.app/editProblem?v_=${this.$route.query.v_}`
                  );
                }

                if (
                  (this.setRole == "TM" || this.setRole == "GH") &&
                  this.fiveWhyLhFeedback != "null" &&
                  this.fiveWhyLhFeedback != null &&
                  this.fiveWhyLhFeedback != "" &&
                  this.fiveWhyLhApprove == 0 &&
                  this.fiveWhyShApprove == 0
                ) {
                  // SEND NOTIF TO LH Feedback 5Why already repaired
                  await this.sendNotif(
                    this.setArea,
                    this.fshift === "w" ? "WHITE" : "RED",
                    "LH",
                    `5 Why sudah di Perbaiki pak ${this.setName} Silahkan kembali di cek:
https://smartandonsys.web.app/editProblem?v_=${this.$route.query.v_}`
                  );
                }
                if (
                  (this.setRole == "TM" || this.setRole == "GH") &&
                  this.fiveWhyShFeedback != "null" &&
                  this.fiveWhyShFeedback != "" &&
                  this.fiveWhyLhApprove == 1 &&
                  this.fiveWhyShApprove == 0
                ) {
                  // SEND NOTIF TO SH Feedback 5Why already repaired
                  await this.sendNotif(
                    this.setArea,
                    this.fshift === "w" ? "WHITE" : "RED",
                    "SH",
                    `5 Why sudah di Perbaiki pak ${this.setName} Silahkan kembali di cek:
https://smartandonsys.web.app/editProblem?v_=${this.$route.query.v_}`
                  );
                }
              }
              this.isLoading = false;
              if (isBack) {
                alert("Success to Edit Problem");
                this.$router.go(-1);
              } else {
                // alert("Success");
                this.getDetailProblem();
                // this.$router.go();
              }
            })
            .catch((err) => {
              alert(JSON.stringify(err));
              // this.submitEdit();
              this.isLoading = false;
            });
        } else {
          document.getElementById("fshift").style.borderColor = "red";
          this.$refs.fshift.focus();
          this.isLoading = false;
        }
      } else {
        if (this.fshift != null) {
          console.log(dataPrev);
          this.isLoading = false;
        } else {
          this.$refs.fshift.focus();
          document.getElementById("fshift").style.borderColor = "red";
          this.isLoading = false;
        }
        this.$refs.fav_categoty.focus();
        this.isLoading = false;
        document.getElementById("fav_categoty").style.borderColor = "red";
      }
    },
    updateEdit() {
      this.isLoading = true;
      let dataPrev = {
        ferror_name: this.ferror_name,
        foperator: this.foperator,
        fshift: this.fshift,
        fav_categoty: this.fav_categoty,
        fstart_time: [this.startDate, this.startTime],
        fpart_change: this.fpart_change,
        fDescImage: this.fDescImage,
        fiveWhyLhApprove: this.fiveWhyLhApprove,
        fiveWhyShApprove: this.fiveWhyShApprove,
        cmLhApprove: this.cmLhApprove,
        cmShApprove: this.cmShApprove,
        fiveWhyLhFeedback: this.fiveWhyLhFeedback,
        fiveWhyShFeedback: this.fiveWhyShFeedback,
        cmLhFeedback: this.cmLhFeedback,
        cmShFeedback: this.cmShFeedback,
        fstep_repair: this.containerStepRepair.join("\n"),
        freal_prob: this.containerWhyTerjadi.join("\n"),
        froot_cause: this.containerWhyLama.join("\n"),
        fpermanet_cm: JSON.stringify(this.containerCmTerjadi),
        fyokoten: JSON.stringify(this.containerYokoten),
        fpermanet_cm_lama: JSON.stringify(this.containerCmLama),
        temporaryAction: this.temporaryAction,
      };
      if (this.fav_categoty != "") {
        if (this.fshift != "-") {
          console.log(dataPrev);
          let url = `${process.env.VUE_APP_HOST}/editProblem/${this.$route.query.v_}`;
          axios
            .put(url, dataPrev)
            .then((result) => {
              console.log(result);
              if (result.data.data) {
                alert("Success to update problem");
                this.isLoading = false;
                this.$router.go(-1);
              }
            })
            .catch((err) => {
              console.log(err);
              alert(JSON.stringify(err));
              this.isLoading = false;
            });
        } else {
          document.getElementById("fshift").style.borderColor = "red";
          this.$refs.fshift.focus();
          this.isLoading = false;
        }
      } else {
        if (this.fshift != "-") {
          console.log(dataPrev);
          this.isLoading = false;
        } else {
          this.$refs.fshift.focus();
          document.getElementById("fshift").style.borderColor = "red";
          this.isLoading = false;
        }
        this.$refs.fav_categoty.focus();
        document.getElementById("fav_categoty").style.borderColor = "red";
        this.isLoading = false;
      }
    },
    onFileChange(e) {
      // const file
      console.log(e);
      // this.uploadImage = file;
      // this.url = URL.createObjectURL(file);
      // var data = new FormData();
      // data.append("image", file);
      // console.log(data);
    },
    goBack() {
      this.$router.go(-1);
    },
    getMcId() {
      console.log(this.fmc_name);
      axios
        .get(`${process.env.VUE_APP_HOST}/searchMc?machine=${this.fmc_name}`)
        .then((result) => {
          // console.log("GETTING ID MC");
          // console.log(result.data.data[0]);
          this.fmc_id = result.data.data[0].fid;
        })
        .catch((err) => {
          console.log(err);
          alert(JSON.stringify(err));
        });
    },
    clearDialog() {
      this.isDialogShowLhFiveWhy = false;
      this.isDialogShowLhCm = false;
      this.isDialogShowShFiveWhy = false;
      this.isDialogShowShCm = false;
      this.isDialogShowDhCm = false;
    },
    sendNotif(area, shift, targetRole, message) {
      axios
        .post(`${process.env.VUE_APP_HOST}/sendWhatsapp`, {
          area,
          shift,
          targetRole,
          message,
          targetLine: this.fline,
          isLhApprove: this.fiveWhyLhApprove || this.cmLhApprove,
        })
        .then((result) => {
          console.log(result);
          // alert("notifikasi terkirim.");
        })
        .catch((err) => {
          console.log(err);
          // alert(JSON.stringify(err));
        });
    },
    async sendFeedback(state) {
      if (state == "LH5W") {
        await this.sendNotif(
          this.setArea,
          this.fshift === "w" ? "WHITE" : "RED",
          "TM,GH",
          `Ada Feedback 5Why dari pak ${this.setName}(${
            this.setRole
          }) tolong di cek:
Comment: "${this.fiveWhyLhFeedback.split(": ")[1]}"
https://smartandonsys.web.app/editProblem?v_=${this.$route.query.v_}`
        );
      } else if (state == "SH5W") {
        await this.sendNotif(
          this.setArea,
          this.fshift === "w" ? "WHITE" : "RED",
          "TM,LH,GH",
          `Ada Feedback 5Why dari pak ${this.setName}(${
            this.setRole
          }) tolong di cek:
Comment: "${this.fiveWhyShFeedback.split(": ")[1]}"
https://smartandonsys.web.app/editProblem?v_=${this.$route.query.v_}`
        );
      } else if (state == "LHCM") {
        await this.sendNotif(
          this.setArea,
          this.fshift === "w" ? "WHITE" : "RED",
          "TM,GH",
          `Ada Feedback Countermeasure dari pak ${this.setName}(${this.setRole}) tolong di cek:
Comment: "${this.cmLhFeedback}"
https://smartandonsys.web.app/editProblem?v_=${this.$route.query.v_}`
        );
      } else if (state == "SHCM") {
        await this.sendNotif(
          this.setArea,
          this.fshift === "w" ? "WHITE" : "RED",
          "TM,LH,GH",
          `Ada Feedback Countermeasure dari pak ${this.setName}(${this.setRole}) tolong di cek:
Comment: "${this.cmShFeedback}"
https://smartandonsys.web.app/editProblem?v_=${this.$route.query.v_}`
        );
      } else if (state == "DHCM") {
        await this.sendNotif(
          this.setArea,
          this.fshift === "w" ? "WHITE" : "RED",
          "TM,LH,GH,SH",
          `Ada Feedback Countermeasure dari pak ${this.setName}(${this.setRole}) tolong di cek:
Comment: "${this.cmDhFeedback}"
https://smartandonsys.web.app/editProblem?v_=${this.$route.query.v_}`
        );
      }
      this.clearDialog();
      // this.submitEdit();
    },
    checkPermission() {
      this.setName = localStorage.getItem("name");
      this.setArea = localStorage.getItem("area");
      this.setRole = localStorage.getItem("role");
      console.log(localStorage.getItem("role"));
      console.log(localStorage.getItem("role") == "SH");
      if (localStorage.getItem("role") == "LH") {
        this.isLineHead = true;
        this.isSectionHead = false;
      } else if (localStorage.getItem("role") == "SH") {
        this.isSectionHead = true;
        this.isLineHead = false;
      }
    },
    postHenkaten() {
      let postData = {
        fdate: this.startDate,
        fline: this.fline,
        fmc: this.fmc_name,
        fproblem: this.ferror_name,
        fchanges_item: this.temporaryAction,
        fpart_type: "",
        fpic: this.foperator,
        fwork_no: "",
        fnote: "",
        fstatus: "0",
      };
      axios
        .post(
          `${process.env.VUE_APP_HOST}/postHenkaten?keywordTempAction=${this.temporaryAction}`,
          postData
        )
        .then((result) => {
          console.log(result);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    checkNameCategory() {
      console.log(this.ferror_name.includes("[FULLCAP]"));
      this.isTaskforce = false;
      this.isFullcap = false;
      if (this.ferror_name.includes("[FULLCAP]")) {
        this.isFullcap = true;
      } else if (this.ferror_name.includes("[TASKFORCE]")) {
        this.isTaskforce = true;
      }
    },
    async getDetailProblem() {
      await axios
        .get(
          `${process.env.VUE_APP_HOST}/getDetailProblem?v_=${this.$route.query.v_}`
        )
        .then((result) => {
          this.isLoading = false;
          let item = result.data.data[0];
          this.fmc_name = item.fmc_name;
          this.getMcId();
          this.fline = item.fline;
          this.foperation_no = item.foperation_no;
          this.fmaker = item.fmaker;
          this.ferror_name = item.ferror_name;
          this.fileName = item.ferror_name;
          this.foperator = item.foperator;
          this.fshift = item.fshift;
          this.fav_categoty = item.fav_categoty;
          this.startDate = item.fstart_time.split("T")[0];
          this.startTime = item.fstart_time.split("T")[1].split(".")[0];
          if (item.fimage) {
            this.fimage = item.fimage;
          }
          this.fiveWhyLhApprove = item.fiveWhyLhApprove;
          this.fiveWhyShApprove = item.fiveWhyShApprove;
          this.cmLhApprove = item.cmLhApprove;
          this.cmShApprove = item.cmShApprove;
          this.cmDhApprove = item.cmDhApprove;

          if (item.fiveWhyLhApprove == 0) {
            let diffInTime =
              new Date().getTime() - new Date(item.fstart_time).getTime();
            let diffDay = diffInTime / (1000 * 3600 * 24);
            if (
              diffDay >= 1 &&
              (String(item.fiveWhyLhFeedback) == "null" ||
                String(item.fiveWhyLhFeedback) == "")
            ) {
              this.fiveWhylhCheck = this.checkStatus(2);
            } else if (String(item.fiveWhyLhFeedback) != "null") {
              this.fiveWhylhCheck = this.checkStatus(3);
            } else {
              this.fiveWhylhCheck = this.checkStatus(4);
            }
          } else if (item.fiveWhyLhApprove == 1) {
            this.fiveWhylhCheck = this.checkStatus(1);
          }

          if (item.cmLhApprove == 0) {
            let diffInTime =
              new Date().getTime() - new Date(item.fstart_time).getTime();
            let diffDay = diffInTime / (1000 * 3600 * 24);
            if (
              diffDay >= 1 &&
              (String(item.cmLhFeedback) == "null" ||
                String(item.cmLhFeedback) == "")
            ) {
              this.cmlhCheck = this.checkStatus(2);
            } else if (String(item.cmLhFeedback) != "null") {
              this.cmlhCheck = this.checkStatus(3);
            } else {
              this.cmlhCheck = this.checkStatus(4);
            }
          } else if (item.cmLhApprove == 1) {
            this.cmlhCheck = this.checkStatus(1);
          }

          if (item.fiveWhyShApprove == 0) {
            let diffInTime =
              new Date().getTime() - new Date(item.fstart_time).getTime();
            let diffDay = diffInTime / (1000 * 3600 * 24);
            if (
              diffDay >= 2 &&
              (String(item.fiveWhyShFeedback) == "null" ||
                item.fiveWhyShFeedback == "")
            ) {
              this.fiveWhyshCheck = this.checkStatus(2);
            } else if (String(item.cmShFeedback) != "null") {
              this.fiveWhyshCheck = this.checkStatus(3);
            } else {
              this.fiveWhyshCheck = this.checkStatus(4);
            }
          } else if (item.fiveWhyShApprove == 1) {
            this.fiveWhyshCheck = this.checkStatus(1);
          }

          if (item.cmShApprove == 0) {
            let diffInTime =
              new Date().getTime() - new Date(item.fstart_time).getTime();
            let diffDay = diffInTime / (1000 * 3600 * 24);
            if (
              diffDay >= 2 &&
              (String(item.cmShFeedback) == "null" || item.cmShFeedback == "")
            ) {
              this.cmshCheck = this.checkStatus(2);
            } else if (String(item.cmShFeedback) != "null") {
              this.cmshCheck = this.checkStatus(3);
            } else {
              this.cmshCheck = this.checkStatus(4);
            }
          } else if (item.cmShApprove == 1) {
            this.cmshCheck = this.checkStatus(1);
          }

          if (item.cmDhApprove == 0) {
            let diffInTime =
              new Date().getTime() - new Date(item.fstart_time).getTime();
            let diffDay = diffInTime / (1000 * 3600 * 24);
            if (
              diffDay >= 3 &&
              (String(item.cmDhFeedback) == "null" ||
                String(item.cmDhFeedback) == "")
            ) {
              this.dhCheck = this.checkStatus(2);
            } else if (String(item.cmDhFeedback) != "null") {
              this.dhCheck = this.checkStatus(3);
            } else {
              this.dhCheck = this.checkStatus(4);
            }
          } else if (item.cmDhApprove == 1) {
            this.dhCheck = this.checkStatus(1);
          }

          this.fiveWhyLhFeedback = item.fiveWhyLhFeedback;
          this.fiveWhyShFeedback = item.fiveWhyShFeedback;
          this.cmLhFeedback = item.cmLhFeedback;
          this.cmShFeedback = item.cmShFeedback;
          if (item.fend_time != null) {
            this.endDate = item.fend_time.split("T")[0];
            this.endTime = item.fend_time.split("T")[1].split(".")[0];
            this.isProblemClose = true;
          } else {
            this.isProblemClose = false;
          }
          this.fdur = item.fdur;
          this.fDescImage = item.fDescImage;
          this.cmDhFeedback = item.cmDhFeedback;
          this.cmDhApprove = item.cmDhApprove;
          console.log(item);
          this.temporaryAction = item.temporaryAction;
          if (item.fstep_repair.includes("\n")) {
            this.containerStepRepair = item.fstep_repair.split("\n");
          }
          if (String(item.fend_time) != null) {
            if (item.freal_prob.includes("\n")) {
              this.containerWhyTerjadi = item.freal_prob.split("\n");
              this.fiveWhyTlApprove = this.checkStatus(1);
            } else {
              this.fiveWhyTlApprove = this.checkStatus(2);
            }
          }
          if (item.fend_time != null) {
            if (item.froot_cause.includes("\n")) {
              this.containerWhyLama = item.froot_cause.split("\n");
            }
          }
          this.fpart_change = item.fpart_change;
          if (String(item.fpermanet_cm).includes("[{")) {
            // #REVISICM
            localStorage.setItem("beforeCm", String(item.fpermanet_cm));
            this.containerCmTerjadi = JSON.parse(String(item.fpermanet_cm));
            this.cmTlApprove = this.checkStatus(1);
          } else {
            this.cmTlApprove = this.checkStatus(2);
          }
          if (String(item.fyokoten).includes("[{")) {
            this.containerYokoten = JSON.parse(item.fyokoten);
          }
          if (String(item.fpermanet_cm_lama).includes("[{")) {
            this.containerCmLama = JSON.parse(item.fpermanet_cm_lama);
          }

          // APPROVAL STATUS
          if (this.fiveWhyLhApprove === 0) {
            this.selectedStatusLhFiveWhy = "Tidak Approve";
          } else {
            this.selectedStatusLhFiveWhy = "Approve";
          }
          if (this.fiveWhyShApprove === 0) {
            this.selectedStatusShFiveWhy = "Tidak Approve";
          } else {
            this.selectedStatusShFiveWhy = "Approve";
          }
          if (this.cmLhApprove === 0) {
            this.selectedStatusLhCm = "Tidak Approve";
          } else {
            this.selectedStatusLhCm = "Approve";
          }
          if (this.cmShApprove === 0) {
            this.selectedStatusShCm = "Tidak Approve";
          } else {
            this.selectedStatusShCm = "Approve";
          }
          this.checkNameCategory();
        })
        .catch((err) => {
          console.log(err);
          alert(JSON.stringify(err));
        });
    },
  },
  components: {
    ScrollableContainer,
    LegendStatus,
    // ExcalamationInfo,
  },
  async mounted() {
    this.isLoading = true;
    await this.checkPermission();
    await this.getDetailProblem();
  },
};
</script>

<style scoped>
.input-lable {
  font-size: 12px;
  color: black;
  font-weight: 800;
}
.form-control {
  background-color: transparent !important;
  color: black;
  padding-left: 3px;
}
h6 {
  font-family: "Bebas Neue", cursive;
}
.col {
  padding-top: 0px;
  padding-bottom: 0px;
}
input,
select {
  /* color: white; */
  font-size: 12px;
  height: 34px;
  background-color: white;
  width: 100%;
}

#table-why-terjadi {
  color: black;
}
#table-why-lama {
  color: black;
}
#table-cm-lama {
  color: black;
}
#table-cm-terjadi {
  color: black;
}
#table-yokoten {
  color: black;
}
#table-step-repair {
  color: black;
}
td {
  font-size: 12px;
}

#blink {
  animation-duration: 400ms;
  animation-name: blink;
  animation-iteration-count: infinite;
  animation-direction: alternate;
}
@keyframes blink {
  from {
    /* opacity: 1; */
    background-color: khaki;
  }
  to {
    /* opacity: 0; */
    background-color: greenyellow;
  }
}
.fontSp {
  font-size: 9px;
}

.dot {
  height: 25px;
  width: 25px;
  background-color: white;
  border-radius: 50%;
  display: inline-block;
  border: 1px solid black;
}
.dotDelay {
  height: 25px;
  width: 25px;
  background-color: #fc5555;
  border-radius: 50%;
  display: inline-block;
  border: 1px solid black;
}
.dotApprove {
  height: 25px;
  width: 25px;
  background-color: #00ff3b;
  border-radius: 50%;
  display: inline-block;
  border: 1px solid black;
}
.dotComment {
  height: 25px;
  width: 25px;
  background-color: #2fc9fc;
  border-radius: 50%;
  display: inline-block;
  border: 1px solid black;
}
.card:active {
  background-color: none !important;
}
.incoming_msg_img {
  display: inline-block;
  width: 6%;
}
</style>