<template>
  <ScrollableContainer>
    <div class="container-fluid" style="padding-bottom: 80px">
      <h2>Edit Problem</h2>
      <i
        v-if="isLoading"
        class="fa fa-refresh fa-spin"
        style="font-size: 30px"
      ></i>
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
          <input
            class="form-control"
            type="file"
            @change="onFileChange"
            disabled
          />
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
                    <button class="btn btn-primary py-1 input-lable">
                      <i
                        class="fa fa-pencil"
                        style="font-size: 10px"
                        aria-hidden="true"
                        @click="
                          onToogleEdit(
                            'isEditWhyTerjadi',
                            'descWhyTerjadi',
                            whyTerjadi,
                            i
                          )
                        "
                        v-if="!isEditWhyTerjadi || idxWhyTerjadiSelected != i"
                      ></i>
                      <i
                        class="fa fa-send"
                        style="font-size: 10px"
                        aria-hidden="true"
                        @click="
                          editContainerSingle(
                            i,
                            'containerWhyTerjadi',
                            'descWhyTerjadi',
                            'isEditWhyTerjadi'
                          )
                        "
                        v-else-if="
                          isEditWhyTerjadi && idxWhyTerjadiSelected == i
                        "
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
                    <button class="btn btn-primary py-1 input-lable">
                      <i
                        class="fa fa-pencil"
                        style="font-size: 10px"
                        aria-hidden="true"
                        @click="
                          onToogleEdit(
                            'isEditStepRepair',
                            'descStepRepair',
                            stepRepair,
                            i
                          )
                        "
                        v-if="!isEditStepRepair || idxStepRepairSelected != i"
                      ></i>
                      <i
                        class="fa fa-send"
                        style="font-size: 10px"
                        aria-hidden="true"
                        @click="
                          editContainerSingle(
                            i,
                            'containerStepRepair',
                            'descStepRepair',
                            'isEditStepRepair'
                          )
                        "
                        v-else-if="
                          isEditStepRepair || idxStepRepairSelected != i
                        "
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
      <div
        v-if="fiveWhyLhApprove == 1 && fiveWhyShApprove == 1"
        class="row m-0 p-0"
      >
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
                    <button class="btn btn-primary py-1 input-lable">
                      <i
                        class="fa fa-pencil"
                        style="font-size: 10px"
                        aria-hidden="true"
                        @click="
                          onToogleEditObj(
                            'isEditCmTerjadi',
                            'cmField',
                            cmTerjadi,
                            i
                          )
                        "
                        v-if="!isEditCmTerjadi || idxCmTerjadiSelected != i"
                      ></i>
                      <i
                        class="fa fa-send"
                        style="font-size: 10px"
                        aria-hidden="true"
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
        <div class="col px-1 text-left">
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
                    <button class="btn btn-primary py-1 input-lable">
                      <i
                        class="fa fa-pencil"
                        style="font-size: 10px"
                        aria-hidden="true"
                        v-if="!isEditYokoten || idxYokotenSelected != i"
                        @click="
                          onToogleEditObj(
                            'isEditYokoten',
                            'yokoField',
                            yokoten,
                            i
                          )
                        "
                      ></i>
                      <i
                        class="fa fa-send"
                        style="font-size: 10px"
                        aria-hidden="true"
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
                    <button class="btn btn-primary py-1 input-lable">
                      <i
                        class="fa fa-pencil"
                        style="font-size: 10px"
                        aria-hidden="true"
                        @click="
                          onToogleEdit(
                            'isEditWhyLama',
                            'descWhyLama',
                            whyLama,
                            i
                          )
                        "
                        v-if="!isEditWhyLama || idxWhyLamaSelected != i"
                      ></i>
                      <i
                        class="fa fa-send"
                        style="font-size: 10px"
                        aria-hidden="true"
                        @click="
                          editContainerSingle(
                            i,
                            'containerWhyLama',
                            'descWhyLama',
                            'isEditWhyLama'
                          )
                        "
                        v-else-if="isEditWhyLama && idxWhyLamaSelected == i"
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
      <div
        v-if="isLongBd && fiveWhyLhApprove == 1 && fiveWhyShApprove == 1"
        class="row m-0 p-0"
      >
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
                    <button class="btn btn-primary py-1 input-lable">
                      <i
                        class="fa fa-pencil"
                        style="font-size: 10px"
                        aria-hidden="true"
                        @click="
                          onToogleEditObj('isEditCmLama', 'cmField', cmLama, i)
                        "
                        v-if="!isEditCmLama || idxCmLamaSelected != i"
                      ></i>
                      <i
                        class="fa fa-send"
                        style="font-size: 10px"
                        aria-hidden="true"
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
                      ></i>
                    </button>
                  </td>
                  <td class="border">
                    <button class="btn btn-danger py-1 input-lable">
                      <i
                        class="fa fa-trash"
                        style="font-size: 10px"
                        aria-hidden="true"
                        @click="removeContainerSingle(i, 'containerCmLama')"
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
      <!-- APPROVAL STATUS 5 WHY -->
      <!-- <div>
        <span style="font-size: 9px; font-weight: bold"
          >Approval Status 5 Why:</span
        >
        <div class="row align-items-center justify-content-center m-0 p-0">
          <div class="col">
            <button
              class="btn btn-success mb-4"
              style="width: 100%"
              v-if="fiveWhyLhApprove === 1"
              @click="isDialogShowLhFiveWhy = true"
            >
              <i class="fa fa-check"></i> LH
            </button>
            <button
              class="btn btn-danger mb-4"
              style="width: 100%"
              v-if="fiveWhyLhApprove === 0"
              @click="isDialogShowLhFiveWhy = true"
            >
              <i class="fa fa-times"></i> LH
            </button>
            <ExcalamationInfo
              v-if="
                fiveWhyLhFeedback &&
                fiveWhyLhApprove == 0 &&
                fiveWhyLhFeedback != 'null' &&
                fiveWhyLhFeedback != ''
              "
            />
            <v-dialog v-model="isDialogShowLhFiveWhy" persistent width="500">
              <v-card>
                <v-card-title
                  class="headline grey lighten-2"
                  style="font-size: 15px !important"
                >
                  Approval 5 Why Line Head:
                </v-card-title>

                <v-card-text class="p-0">
                  <div class="container-fluid mt-4">
                    <div class="row p-0 m-0">
                      <div class="col p-0">
                        <div class="input-group mb-3">
                          <v-select
                            :items="itemsStatus"
                            :disabled="!isLineHead"
                            label="Status"
                            v-model="selectedStatusLhFiveWhy"
                          ></v-select>
                        </div>
                      </div>
                    </div>
                    <div class="row p-0 m-0">
                      <div class="col p-0">
                        <div class="input-group mb-3">
                          <div class="input-group-prepend">
                            <span class="input-group-text">Feedback</span>
                          </div>
                          <input
                            type="text"
                            :disabled="!isLineHead || fiveWhyLhApprove == 1"
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
                    :disabled="!isLineHead || fiveWhyLhApprove == 1"
                    @click="sendFeedback('LH5W')"
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

          <div class="col">
            <i class="fa fa-angle-double-right mb-4 mx-4"></i>
          </div>

          <div class="col">
            <button
              class="btn btn-success mb-4"
              style="width: 100%"
              v-if="fiveWhyShApprove === 1"
              :disabled="fiveWhyLhApprove === 0"
              @click="isDialogShowShFiveWhy = true"
            >
              <i class="fa fa-check"></i> SH
            </button>
            <button
              class="btn btn-danger mb-4"
              style="width: 100%"
              :disabled="fiveWhyLhApprove === 0"
              v-if="fiveWhyShApprove === 0"
              @click="isDialogShowShFiveWhy = true"
            >
              <i class="fa fa-times"></i> SH
            </button>
            <ExcalamationInfo
              v-if="
                fiveWhyShFeedback &&
                fiveWhyShApprove == 0 &&
                fiveWhyShFeedback != 'null' &&
                fiveWhyShFeedback != ''
              "
            />
            <v-dialog v-model="isDialogShowShFiveWhy" persistent width="500">
              <v-card>
                <v-card-title
                  class="headline grey lighten-2"
                  style="font-size: 15px !important"
                >
                  Approval 5 Why Section Head:
                </v-card-title>

                <v-card-text class="p-0">
                  <div class="container-fluid mt-4">
                    <div class="row p-0 m-0">
                      <div class="col p-0">
                        <div class="input-group mb-3">
                          <v-select
                            :items="itemsStatus"
                            :disabled="!isSectionHead"
                            label="Status"
                            v-model="selectedStatusShFiveWhy"
                          ></v-select>
                        </div>
                      </div>
                    </div>
                    <div class="row p-0 m-0">
                      <div class="col p-0">
                        <div class="input-group mb-3">
                          <div class="input-group-prepend">
                            <span class="input-group-text">Feedback</span>
                          </div>
                          <input
                            type="text"
                            :disabled="!isSectionHead || fiveWhyShApprove == 1"
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
                    :disabled="!isSectionHead || fiveWhyShApprove == 1"
                    @click="sendFeedback('SH5W')"
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
      </div> -->
      <!-- APPROVAL STATUS CM -->
      <!-- <div v-if="fiveWhyLhApprove == 1 && fiveWhyShApprove == 1">
        <span style="font-size: 9px; font-weight: bold"
          >Approval Status Countermeasure:</span
        >
        <div class="row align-items-center justify-content-center m-0 p-0">
          <div class="col">
            <button
              class="btn btn-success mb-4"
              style="width: 100%"
              v-if="cmLhApprove === 1"
              @click="isDialogShowLhCm = true"
            >
              <i class="fa fa-check"></i> LH
            </button>
            <button
              class="btn btn-danger mb-4"
              style="width: 100%"
              v-if="cmLhApprove === 0"
              :disabled="
                containerCmLama.length === 0 && containerCmTerjadi.length === 0
              "
              @click="isDialogShowLhCm = true"
            >
              <i class="fa fa-times"></i> LH
            </button>
            <ExcalamationInfo
              v-if="
                cmLhFeedback &&
                cmLhApprove == 0 &&
                cmLhFeedback != 'null' &&
                cmLhFeedback != ''
              "
            />
            <v-dialog v-model="isDialogShowLhCm" persistent width="500">
              <v-card>
                <v-card-title
                  class="headline grey lighten-2"
                  style="font-size: 15px !important"
                >
                  Approval Countermeasure Line Head:
                </v-card-title>

                <v-card-text class="p-0">
                  <div class="container-fluid mt-4">
                    <div class="row p-0 m-0">
                      <div class="col p-0">
                        <div class="input-group mb-3">
                          <v-select
                            :items="itemsStatus"
                            :disabled="!isLineHead"
                            label="Status"
                            v-model="selectedStatusLhCm"
                          ></v-select>
                        </div>
                      </div>
                    </div>
                    <div class="row p-0 m-0">
                      <div class="col p-0">
                        <div class="input-group mb-3">
                          <div class="input-group-prepend">
                            <span class="input-group-text">Feedback</span>
                          </div>
                          <input
                            type="text"
                            :disabled="!isLineHead || cmLhApprove == 1"
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
                    :disabled="!isLineHead || cmLhApprove == 1"
                    @click="sendFeedback('LHCM')"
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

          <div class="col">
            <i class="fa fa-angle-double-right mb-4 mx-4"></i>
          </div>

          <div class="col">
            <button
              class="btn btn-success mb-4"
              style="width: 100%"
              v-if="cmShApprove === 1"
              :disabled="cmLhApprove === 0"
              @click="isDialogShowShCm = true"
            >
              <i class="fa fa-check"></i> SH
            </button>
            <button
              class="btn btn-danger mb-4"
              style="width: 100%"
              v-if="cmShApprove === 0"
              :disabled="cmLhApprove === 0"
              @click="isDialogShowShCm = true"
            >
              <i class="fa fa-times"></i> SH
            </button>
            <ExcalamationInfo
              v-if="
                cmShFeedback &&
                cmShApprove == 0 &&
                cmShFeedback != 'null' &&
                cmShFeedback != ''
              "
            />
            <v-dialog v-model="isDialogShowShCm" persistent width="500">
              <v-card>
                <v-card-title
                  class="headline grey lighten-2"
                  style="font-size: 15px !important"
                >
                  Approval Countermeasure Section Head:
                </v-card-title>

                <v-card-text class="p-0">
                  <div class="container-fluid mt-4">
                    <div class="row p-0 m-0">
                      <div class="col p-0">
                        <div class="input-group mb-3">
                          <v-select
                            :items="itemsStatus"
                            :disabled="!isSectionHead"
                            label="Status"
                            v-model="selectedStatusShCm"
                          ></v-select>
                        </div>
                      </div>
                    </div>
                    <div class="row p-0 m-0">
                      <div class="col p-0">
                        <div class="input-group mb-3">
                          <div class="input-group-prepend">
                            <span class="input-group-text">Feedback</span>
                          </div>
                          <input
                            type="text"
                            :disabled="!isSectionHead || cmShApprove == 1"
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
                    :disabled="!isSectionHead || cmShApprove == 1"
                    @click="sendFeedback('SHCM')"
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
      </div> -->
      <div class="card card-inactive">
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
              setRole != 'DH' &&
              setRole != 'DDH'
            "
          >
            <button class="btn-success btn px-2 py-1 fontSp mr-1">
              Approve
            </button>
            <button class="btn-info btn px-2 py-1 fontSp">Comment</button>
          </div>
        </div>
        <div class="row align-items-center justify-content-center m-0 p-0 mt-1">
          <div class="col">
            <table class="table table-bordered mt-1">
              <thead class="fontSp">
                <tr>
                  <th>GL Check</th>
                  <th>SH Check</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <div :class="`dot text-center`">
                      <span style="font-size: 6px">.</span>
                    </div>
                  </td>
                  <td>
                    <div :class="`dot text-center`">
                      <span style="font-size: 6px">.</span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <button class="btn-outline-info w-100">comment(0)</button>
                  </td>
                  <td>
                    <button class="btn-outline-info w-100">comment(0)</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <!-- SUBMIT EDIT BTN -->
      <hr class="bg-light m-0" />
      <div class="row m-0 p-0 mt-3">
        <p class="m-0 text-left" style="font-size: 10px">
          Silahkan <b>submit</b> kalau sudah, atau kembali tekan <b>cancel</b>
        </p>
        <br />
        <p class="m-0 text-left" style="font-size: 10px">
          Pastikan
          <b>rootcause sudah benar dan telah di konfirmasi sampai section </b>,
          baru <b>kamu bisa melanjutkan untuk Countermeasure</b>
        </p>
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
// import ExcalamationInfo from "../components/ExclamationInfo";
// import moment from "moment";

export default {
  name: "EditProblem",
  data() {
    return {
      isWhyTerjadi: false,
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

      fiveWhyLhApprove: 0,
      fiveWhyShApprove: 0,
      fiveWhyLhFeedback: "",
      fiveWhyShFeedback: "",

      cmLhApprove: 0,
      cmShApprove: 0,
      cmLhFeedback: "",
      cmShFeedback: "",

      isDialogShowLhFiveWhy: false,
      isDialogShowLhCm: false,
      isDialogShowShFiveWhy: false,
      isDialogShowShCm: false,

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
    };
  },
  watch: {
    startDate: function () {
      let strStartDate = `${this.startDate} ${this.startTime}`;
      let strEndDate = `${this.endDate} ${this.endTime}`;
      let start = new Date(strStartDate.replace(" ", "T"));
      let finish = new Date(strEndDate.replace(" ", "T"));
      let dura = (finish - start) / 1000 / 60;
      if (dura >= 120) {
        this.isLongBd = true;
      }
      console.log(dura);
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
      // this.submitEdit();
      if (this.fiveWhyLhApprove == 1) {
        this.isPleaseFinish = true;
        // alert("kalau sudah approve silahkan tekan FINISH");
      }
    },
    fiveWhyShApprove: function () {
      this.clearDialog();
      // this.submitEdit();
      if (this.fiveWhyLhApprove == 1) {
        this.isPleaseFinish = true;
        // alert("kalau sudah approve silahkan tekan FINISH");
      }
    },
    cmLhApprove: function () {
      this.clearDialog();
      // this.submitEdit();
      if (this.fiveWhyLhApprove == 1) {
        this.isPleaseFinish = true;
        // alert("kalau sudah approve silahkan tekan FINISH");
      }
    },
    cmShApprove: function () {
      this.clearDialog();
      // this.submitEdit();
      if (this.fiveWhyLhApprove == 1) {
        this.isPleaseFinish = true;
        // alert("kalau sudah approve silahkan tekan FINISH");
      }
    },
  },
  computed: {
    ...mapState(["storeTheme"]),
  },
  methods: {
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
    submitEdit() {
      this.isLoading = true;
      console.log("masuk fn submitEdit");
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
        fiveWhyLhFeedback: this.fiveWhyLhFeedback,
        fiveWhyShFeedback: this.fiveWhyShFeedback,
        cmLhFeedback: this.cmLhFeedback,
        cmShFeedback: this.cmShFeedback,
        freal_prob: this.containerWhyTerjadi.join("\n"),
        froot_cause: this.containerWhyLama.join("\n"),
        fpermanet_cm: JSON.stringify(this.containerCmTerjadi),
        fyokoten: JSON.stringify(this.containerYokoten),
        fpermanet_cm_lama: JSON.stringify(this.containerCmLama),
        temporaryAction: this.temporaryAction,
      };
      // if (this.fpart_change === "") {
      if (
        this.temporaryAction != "" &&
        `${this.temporaryAction}`.toLowerCase() != "null"
      ) {
        this.postHenkaten();
      }
      if (this.fav_categoty != null) {
        if (this.fshift != null) {
          // let url' = `http://localhost:5001/smartandonsys/us-central1/app/editProblem/${this.$route.query.v_}`;
          let url = `${process.env.VUE_APP_HOST}/editProblem/${this.$route.query.v_}`;
          if (this.isProblemClose) {
            url += `?isFinished=${this.fmc_id}&line=${this.fline}`;
          }
          axios
            .put(url, dataPrev)
            .then((result) => {
              console.log(result);
              alert("Success to Edit Problem");
              //               if (this.fdur >= 30) {
              //                 if (
              //                   this.fiveWhyLhApprove == 0 &&
              //                   (this.fiveWhyLhFeedback == "" ||
              //                     this.fiveWhyLhFeedback == "null" ||
              //                     this.fiveWhyLhFeedback == null) &&
              //                   (this.setRole == "TM" || this.setRole == "GH")
              //                 ) {
              //                   this.sendNotif(
              //                     this.setArea,
              //                     this.fshift === "w" ? "WHITE" : "RED",
              //                     "LH",
              //                     `Ada 5 Why Problem baru yang harus di cek
              // Silahkan klik link di bawah:
              // https://smartandonsys.web.app/editProblem?v_=${this.$route.query.v_}`
              //                   );
              //                 }
              //                 if (
              //                   this.fiveWhyLhApprove == 1 &&
              //                   this.fiveWhyShApprove == 0 &&
              //                   (this.fiveWhyShFeedback == "" ||
              //                     this.fiveWhyShFeedback == "null")
              //                 ) {
              //                   // SEND NOTIF TO LINE HEAD to confirm check analysis and creator info Lh already approve
              //                   this.sendNotif(
              //                     this.setArea,
              //                     this.fshift === "w" ? "WHITE" : "RED",
              //                     "SH,GH,TM",
              //                     `5 Why sudah di approve pak ${this.setName}(LH) selanjutnya SH untuk cek:
              // https://smartandonsys.web.app/editProblem?v_=${this.$route.query.v_}`
              //                   );
              //                 }
              //                 if (
              //                   this.fiveWhyShApprove == 1 &&
              //                   this.fiveWhyLhApprove == 1 &&
              //                   this.containerCmTerjadi.length == 0 &&
              //                   this.setRole == "SH"
              //                 ) {
              //                   // SEND NOTIF TO LINE HEAD & CREATOR to create countermeasure
              //                   this.sendNotif(
              //                     this.setArea,
              //                     this.fshift === "w" ? "WHITE" : "RED",
              //                     "LH,TM,GH",
              //                     `5 Why Problem sudah di approve oleh pak ${this.setName}(SH)
              // silahkan di buat untuk countermeasurenya:
              // https://smartandonsys.web.app/editProblem?v_=${this.$route.query.v_}`
              //                   );
              //                 }
              //                 if (
              //                   (this.containerCmTerjadi.length > 0 ||
              //                     this.containerCmLama.length > 0) &&
              //                   this.cmLhApprove == 0 &&
              //                   this.fiveWhyLhApprove == 1 &&
              //                   this.fiveWhyShApprove == 1 &&
              //                   (this.cmLhFeedback == "" || this.cmLhFeedback == "null") &&
              //                   (this.setRole == "TM" || this.setRole == "GH")
              //                 ) {
              //                   // SEND NOTIF TO LH if TM already submit C/M
              //                   this.sendNotif(
              //                     this.setArea,
              //                     this.fshift === "w" ? "WHITE" : "RED",
              //                     "LH",
              //                     `Countermeasure sudah di buat pak ${this.setName}(TM)
              // Selanjutnya LH untuk cek:
              // https://smartandonsys.web.app/editProblem?v_=${this.$route.query.v_}`
              //                   );
              //                 }
              //                 if (
              //                   (this.containerCmTerjadi.length > 0 ||
              //                     this.containerCmLama.length > 0) &&
              //                   this.cmLhApprove == 1 &&
              //                   this.cmShApprove == 0 &&
              //                   (this.cmShFeedback == "" || this.cmShFeedback == "null") &&
              //                   this.setRole == "LH"
              //                 ) {
              //                   // SEND NOTIF TO SECTION HEAD to confirm check countermeasure and creator info Lh already approve
              //                   // this.sendNotif(name, message)
              //                   this.sendNotif(
              //                     this.setArea,
              //                     this.fshift === "w" ? "WHITE" : "RED",
              //                     "SH,GH,TM",
              //                     `Countermeasure sudah di approve pak ${this.setName}(LH) selanjutnya SH untuk cek:
              // https://smartandonsys.web.app/editProblem?v_=${this.$route.query.v_}`
              //                   );
              //                 }
              //                 if (this.cmShApprove == 1 && this.cmLhApprove == 1) {
              //                   // SEND NOTIF TO LINE HEAD & CREATOR to do countermeasure
              //                   this.sendNotif(
              //                     this.setArea,
              //                     this.fshift === "w" ? "WHITE" : "RED",
              //                     "LH,TM,GH",
              //                     `Countermeasure sudah di approve oleh pak ${this.setName}(SH)
              // silahkan Eksekusi untuk countermeasurenya:
              // https://smartandonsys.web.app/editProblem?v_=${this.$route.query.v_}`
              //                   );
              //                 }

              //                 if (
              //                   (this.setRole == "TM" || this.setRole == "GH") &&
              //                   this.fiveWhyLhFeedback != "null" &&
              //                   this.fiveWhyLhFeedback != null &&
              //                   this.fiveWhyLhFeedback != "" &&
              //                   this.fiveWhyLhApprove == 0 &&
              //                   this.fiveWhyShApprove == 0
              //                 ) {
              //                   // SEND NOTIF TO LH Feedback 5Why already repaired
              //                   this.sendNotif(
              //                     this.setArea,
              //                     this.fshift === "w" ? "WHITE" : "RED",
              //                     "LH",
              //                     `5 Why sudah di Perbaiki pak ${this.setName} Silahkan kembali di cek:
              // https://smartandonsys.web.app/editProblem?v_=${this.$route.query.v_}`
              //                   );
              //                 }
              //                 if (
              //                   (this.setRole == "TM" || this.setRole == "GH") &&
              //                   this.fiveWhyShFeedback != "null" &&
              //                   this.fiveWhyShFeedback != "" &&
              //                   this.fiveWhyLhApprove == 1 &&
              //                   this.fiveWhyShApprove == 0
              //                 ) {
              //                   // SEND NOTIF TO SH Feedback 5Why already repaired
              //                   this.sendNotif(
              //                     this.setArea,
              //                     this.fshift === "w" ? "WHITE" : "RED",
              //                     "SH",
              //                     `5 Why sudah di Perbaiki pak ${this.setName} Silahkan kembali di cek:
              // https://smartandonsys.web.app/editProblem?v_=${this.$route.query.v_}`
              //                   );
              //                 }
              //                 // COUNTERMEASURE FEEDBACK FROM TM
              //                 // console.log(this.cmLhFeedback);
              //                 if (
              //                   (this.setRole == "TM" || this.setRole == "GH") &&
              //                   this.cmLhFeedback != "null" &&
              //                   this.cmLhFeedback != "" &&
              //                   this.cmLhFeedback != null &&
              //                   this.cmLhApprove == 0 &&
              //                   this.cmShApprove == 0
              //                 ) {
              //                   // SEND NOTIF TO LH Feedback 5Why already repaired
              //                   this.sendNotif(
              //                     this.setArea,
              //                     this.fshift === "w" ? "WHITE" : "RED",
              //                     "LH",
              //                     `Countermeasure sudah di Perbaiki pak ${this.setName} Silahkan kembali di cek:
              // https://smartandonsys.web.app/editProblem?v_=${this.$route.query.v_}`
              //                   );
              //                 }
              //                 if (
              //                   (this.setRole == "TM" || this.setRole == "GH") &&
              //                   this.cmShFeedback != "null" &&
              //                   this.cmShFeedback != "" &&
              //                   this.cmLhApprove == 1 &&
              //                   this.cmShApprove == 0
              //                 ) {
              //                   // SEND NOTIF TO LH Feedback 5Why already repaired
              //                   this.sendNotif(
              //                     this.setArea,
              //                     this.fshift === "w" ? "WHITE" : "RED",
              //                     "SH",
              //                     `Countermeasure sudah di Perbaiki pak ${this.setName} Silahkan kembali di cek:
              // https://smartandonsys.web.app/editProblem?v_=${this.$route.query.v_}`
              //                   );
              //                 }
              //               }
              this.isLoading = false;
              this.$router.go(-1);
            })
            .catch((err) => {
              alert(JSON.stringify(err));
              this.submitEdit();
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
      const file = e.target.files[0];
      console.log(file);
      this.url = URL.createObjectURL(file);
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
    },
    sendNotif(area, shift, targetRole, message) {
      console.log("THIS SEND NOTIF FN");
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
          alert("notifikasi terkirim.");
        })
        .catch((err) => {
          console.log(err);
          alert(JSON.stringify(err));
        });
    },
    sendFeedback(state) {
      if (state == "LH5W") {
        this.sendNotif(
          this.setArea,
          this.fshift === "w" ? "WHITE" : "RED",
          "TM,GH",
          `Ada Feedback 5Why dari pak ${this.setName}(LH) tolong di cek:
Comment: "${this.fiveWhyLhFeedback}"
https://smartandonsys.web.app/editProblem?v_=${this.$route.query.v_}`
        );
      } else if (state == "SH5W") {
        this.sendNotif(
          this.setArea,
          this.fshift === "w" ? "WHITE" : "RED",
          "TM,LH,GH",
          `Ada Feedback 5Why dari pak ${this.setName}(SH) tolong di cek:
Comment: "${this.fiveWhyShFeedback}"
https://smartandonsys.web.app/editProblem?v_=${this.$route.query.v_}`
        );
      } else if (state == "LHCM") {
        this.sendNotif(
          this.setArea,
          this.fshift === "w" ? "WHITE" : "RED",
          "TM,GH",
          `Ada Feedback Countermeasure dari pak ${this.setName}(LH) tolong di cek:
Comment: "${this.cmLhFeedback}"
https://smartandonsys.web.app/editProblem?v_=${this.$route.query.v_}`
        );
      } else if (state == "SHCM") {
        this.sendNotif(
          this.setArea,
          this.fshift === "w" ? "WHITE" : "RED",
          "TM,LH,GH",
          `Ada Feedback Countermeasure dari pak ${this.setName}(SH) tolong di cek:
Comment: "${this.cmShFeedback}"
https://smartandonsys.web.app/editProblem?v_=${this.$route.query.v_}`
        );
      }
      this.clearDialog();
      this.submitEdit();
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
  },
  components: {
    ScrollableContainer,
    // ExcalamationInfo,
  },
  mounted() {
    this.isLoading = true;
    this.checkPermission();
    axios
      .get(
        `${process.env.VUE_APP_HOST}/getDetailProblem?v_=${this.$route.query.v_}`
      )
      .then((result) => {
        this.isLoading = false;
        this.fmc_name = result.data.data[0].fmc_name;
        this.getMcId();
        this.fline = result.data.data[0].fline;
        this.foperation_no = result.data.data[0].foperation_no;
        this.fmaker = result.data.data[0].fmaker;
        this.ferror_name = result.data.data[0].ferror_name;
        this.foperator = result.data.data[0].foperator;
        this.fshift = result.data.data[0].fshift;
        this.fav_categoty = result.data.data[0].fav_categoty;
        this.startDate = result.data.data[0].fstart_time.split("T")[0];
        console.log("DATA EDIT");
        console.log(result.data.data[0]);
        this.startTime = result.data.data[0].fstart_time
          // this.startTime = result.data.data[0].fstart_time
          .split("T")[1]
          .split(".")[0];
        this.fiveWhyLhApprove = result.data.data[0].fiveWhyLhApprove;
        this.fiveWhyShApprove = result.data.data[0].fiveWhyShApprove;
        this.cmLhApprove = result.data.data[0].cmLhApprove;
        this.cmShApprove = result.data.data[0].cmShApprove;
        this.fiveWhyLhFeedback = result.data.data[0].fiveWhyLhFeedback;
        this.fiveWhyShFeedback = result.data.data[0].fiveWhyShFeedback;
        this.cmLhFeedback = result.data.data[0].cmLhFeedback;
        this.cmShFeedback = result.data.data[0].cmShFeedback;
        if (result.data.data[0].fend_time != null) {
          this.endDate = result.data.data[0].fend_time.split("T")[0];
          this.endTime = result.data.data[0].fend_time
            .split("T")[1]
            .split(".")[0];
          this.isProblemClose = true;
        } else {
          this.isProblemClose = false;
        }
        this.fdur = result.data.data[0].fdur;
        this.fDescImage = result.data.data[0].fDescImage;
        console.log(result.data.data[0]);
        this.temporaryAction = result.data.data[0].temporaryAction;
        if (result.data.data[0].fstep_repair.includes("\n")) {
          this.containerStepRepair =
            result.data.data[0].fstep_repair.split("\n");
        }
        if (result.data.data[0].freal_prob.includes("\n")) {
          this.containerWhyTerjadi = result.data.data[0].freal_prob.split("\n");
        }
        if (result.data.data[0].froot_cause.includes("\n")) {
          this.containerWhyLama = result.data.data[0].froot_cause.split("\n");
        }
        this.fpart_change = result.data.data[0].fpart_change;
        if (result.data.data[0].fpermanet_cm.includes("[{")) {
          this.containerCmTerjadi = JSON.parse(
            result.data.data[0].fpermanet_cm
          );
        }
        if (result.data.data[0].fyokoten.includes("[{")) {
          this.containerYokoten = JSON.parse(result.data.data[0].fyokoten);
        }
        if (result.data.data[0].fpermanet_cm_lama.includes("[{")) {
          this.containerCmLama = JSON.parse(
            result.data.data[0].fpermanet_cm_lama
          );
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
      })
      .catch((err) => {
        console.log(err);
        alert(JSON.stringify(err));
      });
  },
};
</script>

<style scoped>
.input-lable {
  font-size: 12px;
  color: black;
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
.card-inactive:active {
  background-color: none !important;
}
</style>