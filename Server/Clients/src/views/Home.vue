<template>
  <div>
    <nav class="navbar navbar-light bg-light text-dark">
      <router-link class="navbar-brand nav-title mr-0" to="/">
        <img
          src="@/assets/icons/icon.png"
          width="30"
          height="30"
          class="d-inline-block align-top"
        />
        Smart Andon Systems
        <span style="font-size: 9px">V2.3.35</span>
      </router-link>
      <a href="http://192.168.1.207:3000" target="_blank">PDF</a>
      <button
        class="btn btn-outline-danger"
        style="font-size: 9px; font-weight: bold"
        @click="isShow = true"
      >
        Logout
      </button>
    </nav>
    <v-dialog v-model="isShow" persistent width="500">
      <v-card>
        <v-card-title class="headline grey lighten-2">
          Konfirmasi
        </v-card-title>

        <v-card-text class="p-0">
          <div class="container-fluid p-0 mt-4">
            <div class="row p-0 m-0">
              <div class="col p-0">Apakah kamu yakin ingin keluar?</div>
            </div>
          </div>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <button type="button" @click="logout()" class="btn btn-danger">
            Logout
          </button>
          <button
            type="button"
            class="btn btn-secondary"
            data-dismiss="modal"
            @click="isShow = false"
          >
            Close
          </button>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <vue-page-transition name="fade-in-right">
      <router-view />
    </vue-page-transition>
    <PdfView />
  </div>
</template>

<script>
import { mapActions } from "vuex";
import PWABadge from "pwa-badge";
import PdfView from "@/components/PdfView";
export default {
  name: "Home",
  data() {
    return {
      isHomeBtn: false,
      ex11: false,
      isShow: false,
    };
  },
  components: {
    // ContainerMenu,
    PdfView,
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
