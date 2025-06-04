<template>
  <div>
    <nav class="navbar navbar-dark bg-dark text-light">
      <router-link class="navbar-brand nav-title mr-0" to="/">
        <img
          src="https://www.pngall.com/wp-content/uploads/2016/04/Toyota-Logo-Free-Download-PNG.png"
          width="30"
          height="30"
          class="d-inline-block align-top"
        />
        Toyota Production Systems 4.0
        <span style="font-size: 9px">V1.0.0</span>
      </router-link>
    </nav>
    <vue-page-transition name="fade-in-right">
      <router-view />
    </vue-page-transition>
  </div>
</template>


<script>
export default {
  name: "Tps",
};
</script>