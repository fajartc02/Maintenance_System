<template>
  <div class="card" style="z-index: 10">
    <div class="row">
      <div class="col">
        <div class="card" style="background-color: white">Finished</div>
      </div>
      <div class="col">
        <div class="card" style="background-color: #00e9ff">On Progress</div>
      </div>
      <div class="col">
        <div class="card" style="background-color: rgba(252, 121, 121, 0.6)">
          Delay
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LegendStatusCm",
};
</script>