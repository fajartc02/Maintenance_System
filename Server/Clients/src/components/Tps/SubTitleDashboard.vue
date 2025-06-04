<template>
  <b-row>
    <b-col class="text-left py-0">{{ title }}</b-col>
    <b-col></b-col>
    <b-col></b-col>
    <b-col></b-col>
    <b-col></b-col>
  </b-row>
</template>

<script>
export default {
  props: {
    title: String,
  },
};
</script>