<template>
  <div>
    <!-- <pdf src="@/documents/CVFajar.pdf"></pdf> -->
    <VuePdfReader url="@/documents/CVFajar.pdf" />
  </div>
  <!-- <vue-pdf-app pdf="@/documents/mockup.pdf"></vue-pdf-app> -->
</template>

<script>
// import pdf from "vue-pdf";
// import VuePdfApp from "vue-pdf-app";
// // import this to use default icons for buttons
// import "vue-pdf-app/dist/icons/main.css";

export default {
  name: "PdfView",
  components: {
    // pdf,
    // VuePdfApp,
  },
};
</script>