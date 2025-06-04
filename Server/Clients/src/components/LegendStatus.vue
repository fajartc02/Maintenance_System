<template>
  <div class="p-1 border bg-dark text-light">
    <div class="row">
      <div class="col">
        <div class="dot"></div>
        <span style="font-size: 9px">none</span>
      </div>
      <div class="col">
        <div class="dotComment"></div>
        <span style="font-size: 9px">comment</span>
      </div>
      <div class="col">
        <div class="dotDelay"></div>
        <span style="font-size: 9px">delay</span>
      </div>
      <div class="col">
        <div class="dotApprove"></div>
        <span style="font-size: 9px">approved</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LegendStatus",
};
</script>

<style scoped>
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
  background-color: yellow;
  border-radius: 50%;
  display: inline-block;
  border: 1px solid black;
}
</style>