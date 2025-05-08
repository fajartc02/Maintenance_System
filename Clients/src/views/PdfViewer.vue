<template>
  <div class="container-fluid p-0" style="margin-bottom: 20px">
    <div class="row m-0 p-0" ref="content" style="font-size: 12px">
      <div class="col-12 p-0 m-0">
        <div class="container-fluid p-0">
          <div class="row m-0">
            <div class="col-12 p-0">
              <h3>Machine Breakdown Report</h3>
            </div>
          </div>
          <div class="row m-0">
            <div class="col-12 p-0">
              <table class="table table-bordered">
                <tbody>
                  <tr>
                    <td>Operation No</td>
                    <td>:</td>
                    <td>11B</td>
                    <td>Start Date</td>
                    <td>:</td>
                    <td>2021-02-01</td>
                    <td>Finish Date</td>
                    <td>:</td>
                    <td>2021-02-01</td>
                  </tr>
                  <tr>
                    <td>Line</td>
                    <td>:</td>
                    <td>Cyl. Block</td>
                    <td>Start Time</td>
                    <td>:</td>
                    <td>12:00</td>
                    <td>Finish Time</td>
                    <td>:</td>
                    <td>17:50</td>
                  </tr>
                  <tr>
                    <td>M/C No</td>
                    <td>:</td>
                    <td>IMSP-0111</td>
                    <td>Shift</td>
                    <td>:</td>
                    <td>Red</td>
                    <td>M/C Stop</td>
                    <td>:</td>
                    <td>253 Min</td>
                  </tr>
                  <tr>
                    <td>Maker</td>
                    <td>:</td>
                    <td>Yosunage</td>
                    <td>Operator</td>
                    <td>:</td>
                    <td>Fajar</td>
                    <td>AV Category</td>
                    <td>:</td>
                    <td>Machine</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <!-- Title Problem -->
          <div class="row m-0 table-bordered">
            <div class="col-3 p-0 bg-primary text-center">Problems</div>
            <div class="col-9 p-0 text-center">{problem Desc}</div>
          </div>
          <!-- Ilustration &Step Repair -->
          <div class="row m-0 mt-1">
            <div class="col-4 p-0">
              <div class="row m-0 table-bordered">
                <div class="col-12 p-0 bg-primary text-center">Ilustration</div>
                <div class="col-12 p-0" style="height: 200px"></div>
              </div>
            </div>
            <div class="col-8 p-0">
              <div class="row m-0">
                <div class="col-12 p-0 bg-primary text-center">Step Repair</div>
                <div class="col-12 p-0">
                  <table class="table table-bordered text-center">
                    <thead>
                      <tr>
                        <th style="max-width: 10px">No</th>
                        <th>Step Repair</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td style="max-width: 10px">1</td>
                        <td>TESting ae lah</td>
                      </tr>
                      <tr>
                        <td style="max-width: 10px">1</td>
                        <td>TESting ae lah</td>
                      </tr>
                      <tr>
                        <td style="max-width: 10px">1</td>
                        <td>TESting ae lah</td>
                      </tr>
                      <tr>
                        <td style="max-width: 10px">1</td>
                        <td>TESting ae lah</td>
                      </tr>
                      <tr>
                        <td style="max-width: 10px">1</td>
                        <td>TESting ae lah</td>
                      </tr>
                      <tr>
                        <td style="max-width: 10px">1</td>
                        <td>TESting ae lah</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <!-- Why Analisys -->
          <div class="row m-0 mt-1">
            <div class="col-6 p-0">
              <div class="row m-0">
                <div class="col-12 p-0 bg-primary text-center">
                  Why Analisys (Kenapa Terjadi)
                </div>
                <div class="col-12 p-0">
                  <table class="table table-bordered text-center">
                    <thead>
                      <tr>
                        <th style="max-width: 20px">No</th>
                        <th>Description</th>
                      </tr>
                    </thead>
                    <tbody class="text-left">
                      <tr>
                        <td style="max-width: 20px">1</td>
                        <td>
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Aliquid ab labore, necessitatibus earum laborum
                          voluptatibus cum at? Laudantium, harum. Excepturi quam
                          error autem consequuntur perferendis illo eius alias
                          earum animi.
                        </td>
                      </tr>
                      <tr>
                        <td style="max-width: 20px">1</td>
                        <td>TESting ae lah</td>
                      </tr>
                      <tr>
                        <td style="max-width: 20px">1</td>
                        <td>TESting ae lah</td>
                      </tr>
                      <tr>
                        <td style="max-width: 20px">1</td>
                        <td>TESting ae lah</td>
                      </tr>
                      <tr>
                        <td style="max-width: 20px">1</td>
                        <td>TESting ae lah</td>
                      </tr>
                      <tr>
                        <td style="max-width: 20px">1</td>
                        <td>TESting ae lah</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div class="col-6 p-0">
              <div class="row m-0">
                <div class="col-12 p-0 bg-primary text-center">
                  Why Analisys (Kenapa Lama)
                </div>
                <div class="col-12 p-0">
                  <table class="table table-bordered text-center">
                    <thead>
                      <tr>
                        <th style="max-width: 20px">No</th>
                        <th>Description</th>
                      </tr>
                    </thead>
                    <tbody class="text-left">
                      <tr>
                        <td style="max-width: 20px">1</td>
                        <td>
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Aliquid ab labore, necessitatibus earum laborum
                          voluptatibus cum at? Laudantium, harum. Excepturi quam
                          error autem consequuntur perferendis illo eius alias
                          earum animi.
                        </td>
                      </tr>
                      <tr>
                        <td style="max-width: 20px">1</td>
                        <td>TESting ae lah</td>
                      </tr>
                      <tr>
                        <td style="max-width: 20px">1</td>
                        <td>TESting ae lah</td>
                      </tr>
                      <tr>
                        <td style="max-width: 20px">1</td>
                        <td>TESting ae lah</td>
                      </tr>
                      <tr>
                        <td style="max-width: 20px">1</td>
                        <td>TESting ae lah</td>
                      </tr>
                      <tr>
                        <td style="max-width: 20px">1</td>
                        <td>TESting ae lah</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <!-- Countermeasure -->
          <div class="row m-0 mt-1">
            <div class="col-6 p-0">
              <div class="row m-0">
                <div class="col-12 p-0 bg-primary text-center">
                  Countermeasure (Kenapa Terjadi)
                </div>
                <div class="col-12 p-0">
                  <table class="table table-bordered text-center">
                    <thead>
                      <tr>
                        <th style="max-width: 20px">No</th>
                        <th>Description</th>
                        <th style="min-width: 80px">Date Plan</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody class="text-left">
                      <tr>
                        <td style="max-width: 20px">1</td>
                        <td>
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Aliquid ab labore, necessitatibus earum laborum
                          voluptatibus cum at? Laudantium, harum. Excepturi quam
                          error autem consequuntur perferendis illo eius alias
                          earum animi.
                        </td>
                        <td>2021-02-01</td>
                        <td class="text-success">Sudah</td>
                      </tr>
                      <tr>
                        <td style="max-width: 20px">1</td>
                        <td>
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Aliquid ab labore, necessitatibus earum laborum
                          voluptatibus cum at? Laudantium, harum. Excepturi quam
                          error autem consequuntur perferendis illo eius alias
                          earum animi.
                        </td>
                        <td>2021-02-01</td>
                        <td class="text-success">Sudah</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div class="col-6 p-0">
              <div class="row m-0">
                <div class="col-12 p-0 bg-primary text-center">
                  Countermeasure (Kenapa Lama)
                </div>
                <div class="col-12 p-0">
                  <table class="table table-bordered text-center">
                    <thead>
                      <tr>
                        <th style="max-width: 20px">No</th>
                        <th>Description</th>
                        <th style="min-width: 80px">Date Plan</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody class="text-left">
                      <tr>
                        <td style="max-width: 20px">1</td>
                        <td>
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Aliquid ab labore, necessitatibus earum laborum
                          voluptatibus cum at? Laudantium, harum. Excepturi quam
                          error autem consequuntur perferendis illo eius alias
                          earum animi.
                        </td>
                        <td>2021-02-01</td>
                        <td class="text-success">Sudah</td>
                      </tr>
                      <tr>
                        <td style="max-width: 20px">1</td>
                        <td>
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Aliquid ab labore, necessitatibus earum laborum
                          voluptatibus cum at? Laudantium, harum. Excepturi quam
                          error autem consequuntur perferendis illo eius alias
                          earum animi.
                        </td>
                        <td>2021-02-01</td>
                        <td class="text-success">Sudah</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <!-- Part changes & Yokoten -->
          <div class="row m-0 mt-1">
            <div class="col-6 p-0">
              <div class="row m-0">
                <div class="col-12 p-0 bg-primary">Part Change</div>
              </div>
              <div class="row m-0">
                <div class="col-12 table-bordered text-center">
                  Solenoid KDY_20012
                </div>
              </div>
            </div>
            <div class="col-6 p-0">
              <div class="row m-0">
                <div class="col-12 p-0 bg-primary">Yokoten</div>
              </div>
              <div class="row m-0">
                <div class="col-12 table-bordered text-center">
                  <table class="table table-bordered text-center">
                    <thead>
                      <tr>
                        <th style="max-width: 20px">No</th>
                        <th>Item yokoten</th>
                        <th style="min-width: 80px">Date Plan</th>
                        <th>PIC</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody class="text-left">
                      <tr>
                        <td style="max-width: 20px">1</td>
                        <td>
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Aliquid ab labore, necessitatibus earum laborum
                          voluptatibus cum at? Laudantium, harum. Excepturi quam
                          error autem consequuntur perferendis illo eius alias
                          earum animi.
                        </td>
                        <td>2021-02-01</td>
                        <td>Fajar</td>
                        <td class="text-success">Sudah</td>
                      </tr>
                      <tr>
                        <td style="max-width: 20px">1</td>
                        <td>
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Aliquid ab labore, necessitatibus earum laborum
                          voluptatibus cum at? Laudantium, harum. Excepturi quam
                          error autem consequuntur perferendis illo eius alias
                          earum animi.
                        </td>
                        <td>2021-02-01</td>
                        <td class="text-success">Sudah</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row m-0" style="position: absolute; top: 0px">
      <div class="col-12 p-0">
        <button @click="exportToPDF()">Exports</button>
      </div>
    </div>
  </div>
</template>

<script>
import html2pdf from "html2pdf.js";
// import axios from "axios";

export default {
  name: "PdfViewer",
  data() {
    return {
      detailsProblem: null,
    };
  },
  methods: {
    exportToPDF() {
      html2pdf(this.$refs.content, {
        margin: 1,
        filename: "document.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { dpi: 192, letterRendering: true },
        jsPDF: { unit: "pt", format: "a4", orientation: "p" },
      });
    },
    getDetailsProb() {
      // axios.get()
    },
  },
};
</script>