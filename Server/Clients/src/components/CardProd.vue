<template>
  <div class="col-6 mt-2 px-1 py-0 text-dark">
    <div
      id="cardProd"
      :class="`card shadow bg-dark w-100 ${propsLine.borderStatus} p-1`"
      style="height: 100%"
      @click="goToDetailsLine(propsLine.fline)"
    >
      <div class="row p-0 m-0">
        <div
          class="col-7 text-left text-light title-text px-1 py-0"
          style="font-size: 18px"
        >
          {{ propsLine.fline }}
          <b-skeleton v-if="skeletonLoading"></b-skeleton>
        </div>
        <div
          v-if="propsLine.isStop != 0"
          :class="`col-5 text-left text-light title-text px-1 d-flex justify-content-center align-items-center py-0 ${propsLine.bgStatus}`"
          style="font-size: 10px"
        >
          <p class="m-0 p-0">Stop: {{ propsLine.durCurrentStop }} Min</p>
          <b-skeleton v-if="skeletonLoading"></b-skeleton>
        </div>
        <div
          v-else
          class="
            col-5
            text-left text-light
            title-text
            px-1
            bg-success
            d-flex
            justify-content-center
            align-items-center
            py-0
          "
          style="font-size: 12px"
        >
          <p class="m-0 p-0" scrollamount="3">RUNNING</p>
          <b-skeleton v-if="skeletonLoading"></b-skeleton>
        </div>
      </div>
      <!-- VM -->
      <div class="row d-flex align-items-center p-0 m-0">
        <div class="col-6 d-flex justify-content-center p-0">
          <vm-progress
            type="circle"
            :width="80"
            :percentage="`${
              propsLine.fline == 'HPDC' ? propsLine.oee : propsLine.oee
            }`"
            status="success"
          >
            <strong class="text-center title-text" style="font-size: 20px"
              >OEE <br />
              <!-- {{ propsLine.fline == "HPDC" ? "97.2" : propsLine.oee }} -->
              {{ propsLine.oee + "%" }}
              <b-skeleton v-if="skeletonLoading"></b-skeleton>
            </strong>
          </vm-progress>
        </div>
        <div class="col-6 p-0 mt-3" style="height: 70px">
          <div class="card">
            <div class="row p-0 m-0">
              <div
                class="col-12 p-0 d-flex justify-content-center title-text"
                style="font-size: 10px"
              >
                MT Call
              </div>
            </div>
            <div class="row p-0 m-0">
              <div class="col-12 p-0 d-flex justify-content-center title-text">
                {{ propsLine.durMtCall + " Min" }}
                <b-skeleton v-if="skeletonLoading"></b-skeleton>
              </div>
            </div>
          </div>
          <div class="row p-0 m-0">
            <div
              class="col-12 text-light p-0 d-flex justify-content-center"
              style="font-family: Roboto, sans-serif; font-weight: 800"
            >
              <!-- {{ propsLine.fline == "HPDC" ? "285/377" : propsLine.output }} -->
              {{ propsLine.output }}
              <b-skeleton v-if="skeletonLoading"></b-skeleton>
            </div>
          </div>
        </div>
      </div>
      <!-- INFO STILL LOADING-->
      <div class="text-center">
        <v-dialog v-model="info" width="500">
          <v-card>
            <v-card-title class="headline grey lighten-2"> Info </v-card-title>

            <v-card-text>
              Tunggu Sebentar sedang mengambil data pencapaian produksi
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" text @click="info = false">
                I accept
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CardProd",
  data() {
    return {
      info: false,
      skeletonLoading: false,
    };
  },
  props: {
    propsLine: Object,
    propsLoading: Boolean,
  },
  watch: {
    propsLine: function () {
      this.info = false;
    },
    propsLoading: function () {
      this.skeletonLoading = this.propsLoading;
    },
  },
  methods: {
    goToDetailsLine(line) {
      if (line) {
        this.$router.push(`/detailsLine?v_=${line}`);
      } else {
        this.info = true;
      }
    },
  },
};
</script>

<style>
#cardProd:active {
  border: 1px solid yellow;
  background-color: rgba(249, 255, 76, 0.4) !important;
}
</style>