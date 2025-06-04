<template>
  <v-app>
    <router-view></router-view>
  </v-app>
</template>

<script>
// import ContainerMenu from "@/components/ContainerMenu";
import { mapActions } from "vuex";
import PWABadge from "pwa-badge";

export default {
  name: "app",
  data() {
    return {
      isHomeBtn: false,
      ex11: false,
      isShow: false,
    };
  },
  components: {
    // ContainerMenu,
  },
  watch: {
    $route(to) {
      console.log(to);
      this.actionsPushRoute(to.params.line);
      if (to.path == "/") {
        this.isHomeBtn = false;
      } else {
        this.isHomeBtn = true;
      }
    },
  },
  methods: {
    ...mapActions(["actionsPushRoute", "actionsChangeTheme"]),
    gotoHome() {
      this.$router.push("/");
    },
    changesTheme() {
      if (this.ex11 == true) {
        this.actionsChangeTheme("dark");
        document.getElementById("app").style.backgroundColor = "black";
      } else {
        this.actionsChangeTheme("light");
        document.getElementById("app").style.backgroundColor = "white";
      }
    },
    permissionCheck() {
      if (!localStorage.getItem("name")) {
        this.$router.push("/login");
      } else {
        this.name = localStorage.getItem("name");
      }
    },
    logout() {
      localStorage.clear();
      this.$router.push("/login");
      this.isShow = false;
    },
  },
  mounted() {
    this.permissionCheck();
    const badge = new PWABadge();
    badge
      .asyncSetBadge(1)
      .then(() => {
        // Badge count has shown as well
      })
      .catch((e) => {
        // The Browser not supporting the Badge feature or something went wrong
        console.log(e);
      });
  },
};
</script>

<style>
.pointer {
  cursor: pointer;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  /* color: #2c3e50; */
  background-color: white;
}

#nav {
  padding: 30px;
}

th {
  background-color: black !important;
  text-align: center;
  color: whitesmoke;
}

table,
th,
td {
  border: 1px solid black;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

html {
  background-color: rgb(234, 252, 252);
  background-color: #101820ff;
}
.modal-backdrop {
  z-index: -1;
}
</style>
