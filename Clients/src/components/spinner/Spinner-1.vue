<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col text-centered">
        <b-spinner :variant="color" label="Spinning"></b-spinner>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Spinner-1",
  props: {
    color: String,
  },
};
</script>