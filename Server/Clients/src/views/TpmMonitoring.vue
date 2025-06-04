<template>
  <div class="container-fluid mt-12">
    <input @change="chooseFile" type="file" />

    <excel-viewer
      ref="excelViewer"
      :height="'100%'"
      :first-row-num="firstRowNum"
      :min-col-counts="5"
      @on-reach-top="reachTop"
      @on-reach-bottom="reachBottom"
      @on-row-select="onRowSelect"
      @on-col-select="onColSelect"
      @on-cell-select="onCellSelect"
      @on-before-open="beforeOpen"
      @on-after-open="afterOpen"
    />s
    <!-- <router-link to="/tpmMonitoring/ledger" class="card rounded card-gradient">
      <div class="row m-0">
        <div class="col">
          <i class="fa fa-book text-light" style="font-size: 80px"></i>
        </div>
        <div
          class="col p-0 title-text text-light d-flex align-items-center justify-content-center"
          style="font-size: 30px"
        >
          LEDGER
        </div>
      </div>
    </router-link>
    <div class="card rounded card-gradient2 mt-2">
      <div class="row m-0">
        <div class="col">
          <i class="fa fa-calendar text-light" style="font-size: 80px"></i>
        </div>
        <div
          class="col p-0 title-text text-light d-flex align-items-center justify-content-center"
          style="font-size: 30px"
        >
          SCHEDULE TPM
        </div>
      </div>
    </div>
    <router-link
      to="/tpmMonitoring/temuanTpm"
      class="card rounded card-gradient3 mt-2"
    >
      <div class="row m-0">
        <div class="col">
          <i class="fa fa-sticky-note text-light" style="font-size: 80px"></i>
        </div>
        <div
          class="col p-0 title-text text-light d-flex align-items-center justify-content-center"
          style="font-size: 30px"
        >
          TEMUAN TPM
        </div>
      </div>
    </router-link> -->
  </div>
</template>

<script>
export default {
  name: "TpmMonitoring",
  data() {
    return {
      firstRowNum: 2,
    };
  },
  methods: {
    chooseFile(e) {
      console.info("excel file select", e);
      //open excel file
      this.$refs.excelViewer.openExcelFile(e.target.files[0]);
    },
    beforeOpen() {
      //文件打开前的事件 on before open
      console.info("excel before open");
    },
    afterOpen() {
      //文件打开后的事件 on after open
      console.info("excel after open");
      this.$refs.excelViewer.setRowBackgroundColor(5, "red");
    },
    onRowSelect(rowNum, selectRowValues) {
      //行选择的事件 on row select
      console.info("row select", rowNum, selectRowValues);
      //设置行的背景颜色 set row background-color
      this.$refs.excelViewer.setSelectedBackgroundColor("red");
    },
    onColSelect(colNum) {
      //列选择事件 on column select
      console.info("col select", colNum);
    },
    onCellSelect(rowNum, colNum, value) {
      //单元格选择的事件 on cell select
      //设置背景颜色 set backgroundColor
      this.$refs.excelViewer.setCellBackgroundColor(rowNum, colNum, "red");
      //冻结窗格 freeze at cell
      this.$refs.excelViewer.freezeCellAt(rowNum, colNum);
      if (value) {
        console.info("cell select", rowNum, colNum, value);
      } else {
        console.info("cell select， value empty", rowNum, colNum);
      }
    },
    reachTop() {
      //滚动到顶部的事件 on reach top
      console.info("touch top");
    },
    reachBottom() {
      //滚动到底部的事件 on reach bottom
      console.info("touch bottom");
    },
  },
};
</script>

<style scoped>
.card-gradient {
  background: #8e0e00; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #1f1c18,
    #8e0e00
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #1f1c18,
    #8e0e00
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
.card-gradient2 {
  background: #005c97; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #363795,
    #005c97
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #363795,
    #005c97
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
.card-gradient3 {
  background: #6a9113; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #141517,
    #6a9113
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #141517,
    #6a9113
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
.card-gradient:active {
  border: 1px yellow solid;
}
.card-gradient2:active {
  border: 1px yellow solid;
}
.card-gradient3:active {
  border: 1px yellow solid;
}
</style>