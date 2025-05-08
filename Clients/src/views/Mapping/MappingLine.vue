<template>
  <div class="container-fluid mt-4">
    <div class="row">
      <div class="col">
        <h2>CAM SHAFT LINE</h2>
      </div>
    </div>
    <div class="row align-items-center">
      <div class="col-12 p-0">
        <div class="scrollMenu">
          <div
            class="card pointer hover-card py-auto align-items-center m-2"
            v-for="machine in machines"
            :key="machine.fid"
            style="height: 50px; width: 50px; display: inline-block"
          >
            <p style="font-size: 9px; margin-top: 40%">
              {{ machine.fmc_name }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MappingLine",
  data() {
    return {
      machines: [
        {
          fid: 0,
          fmc_name: "IMSP-0109",
          maker: "Yasunaga",
        },
        {
          fid: 1,
          fmc_name: "IMSP-0089",
          maker: "Yasunaga",
        },
        {
          fid: 2,
          fmc_name: "IMSP-0110",
          maker: "Yasunaga",
        },
        {
          fid: 3,
          fmc_name: "IMSP-0111",
          maker: "Yasunaga",
        },
        {
          fid: 4,
          fmc_name: "IMSP-0111",
          maker: "Yasunaga",
        },
        {
          fid: 5,
          fmc_name: "IMSP-0111",
          maker: "Yasunaga",
        },
        {
          fid: 6,
          fmc_name: "IMSP-0111",
          maker: "Yasunaga",
        },
        {
          fid: 7,
          fmc_name: "IMSP-0111",
          maker: "Yasunaga",
        },
        {
          fid: 8,
          fmc_name: "IMLA-0007",
          maker: "DMG Mori",
        },
        {
          fid: 0,
          fmc_name: "IMSP-0109",
          maker: "Yasunaga",
        },
        {
          fid: 1,
          fmc_name: "IMSP-0089",
          maker: "Yasunaga",
        },
        {
          fid: 2,
          fmc_name: "IMSP-0110",
          maker: "Yasunaga",
        },
        {
          fid: 3,
          fmc_name: "IMSP-0111",
          maker: "Yasunaga",
        },
        {
          fid: 4,
          fmc_name: "IMSP-0111",
          maker: "Yasunaga",
        },
        {
          fid: 5,
          fmc_name: "IMSP-0111",
          maker: "Yasunaga",
        },
        {
          fid: 6,
          fmc_name: "IMSP-0111",
          maker: "Yasunaga",
        },
        {
          fid: 7,
          fmc_name: "IMSP-0111",
          maker: "Yasunaga",
        },
        {
          fid: 8,
          fmc_name: "IMLA-0007",
          maker: "DMG Mori",
        },
      ],
    };
  },
  methods: {},
};
</script>

<style scoped>
.hover-card:active {
  background-color: chartreuse;
}
.scrollMenu {
  overflow: auto;
  white-space: nowrap;
}
</style>