<template>
  <div class="col-3 px-2 my-1">
    <div
      class="card menu"
      style="max-height: 50px; min-height: 50px"
      @click="goTo(propsMenu.link)"
    >
      <div
        v-if="propsMenu.badges && totalTempProb"
        class="card bg-danger rounded-circle shadow text-light"
        style="
          width: 15px;
          height: 15px;
          position: absolute;
          top: -5px;
          right: -5px;
          font-size: 10px;
        "
      >
        {{ totalTempProb }}
      </div>
      <div class="card-body p-0">
        <img :src="propsMenu.img" width="30px" height="30px" />
      </div>
      <div class="card-footer p-0" style="font-size: 12px">
        {{ propsMenu.title }}
      </div>
    </div>
  </div>
</template>


<script>
import { mapState } from "vuex";
export default {
  name: "Menu",
  data() {
    return {
      totalTempProb: null,
    };
  },
  computed: {
    ...mapState(["countProbTemp"]),
  },
  watch: {
    countProbTemp: function () {
      console.log(this.countProbTemp);
      if (this.countProbTemp[0].totalProb) {
        this.totalTempProb = this.countProbTemp[0].totalProb;
      }
    },
  },
  methods: {
    goTo(link) {
      this.$router.push(link);
    },
  },
  props: {
    propsMenu: Object,
  },
};
</script>

<style>
.menu {
  transform: border 2s;
  font-family: "Bebas Neue", cursive;
}
.menu:active {
  border: 1px aquamarine solid;
}
</style>