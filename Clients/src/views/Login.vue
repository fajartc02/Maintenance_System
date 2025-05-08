<template>
  <div class="container">
    <div class="row justify-content-center mt-4">
      <div class="col-10">
        <v-text-field
          label="Noreg"
          :rules="rules"
          hide-details="auto"
          v-model="username"
          class="mb-4"
        ></v-text-field>
        <v-text-field
          v-model="password"
          :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
          :rules="[rules.required, rules.min]"
          :type="show1 ? 'text' : 'password'"
          name="input-10-1"
          label="Password"
          hint="please input last of 4 digit your phone number (4 digit terakhir nomer hp)"
          counter
          v-on:keyup.enter="login()"
          @click:append="show1 = !show1"
        ></v-text-field>
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col-10">
        <v-btn
          class="ma-2"
          :loading="loading1"
          :disabled="loading1"
          color="success"
          @click="login()"
        >
          Login
          <template v-slot:loader>
            <span class="custom-loader">
              <v-icon light>mdi-cached</v-icon>
            </span>
          </template>
        </v-btn>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <span
          >You don't have an acccount?
          <router-link to="/register">Register Here!</router-link></span
        >
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col">
        <img
          src="https://elmecon-mk.com/wp-content/uploads/2018/04/what-monitoring-involves-1523604555.png"
          style="width: 100%"
        />
        <h2 class="mt-4">Smart Andon Systems</h2>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Login",
  data: () => ({
    rules: [
      (value) => !!value || "Required.",
      (value) => (value && value.length >= 3) || "Min 3 characters",
    ],
    username: "",
    password: "",
    show1: false,
    loading1: false,
    correctUser: "toyota",
    correctPass: "toyota",
  }),
  methods: {
    login() {
      this.loading1 = true;
      console.log(process.env.VUE_APP_HOST);
      if (
        this.username == this.correctUser &&
        this.password == this.correctPass
      ) {
        localStorage.setItem("name", "Guest");
        localStorage.setItem("role", "Guest");
        localStorage.setItem("area", "Guest");
        localStorage.setItem("shift", "Guest");
        this.loading1 = false;
        alert(`Selamat Datang Guest`);
        this.$router.push("/");
        this.loading1 = false;
      } else {
        axios
          .get(
            `${process.env.VUE_APP_HOST}/signin?noreg=${this.username}&wa=${this.password}`
          )
          .then((result) => {
            console.log(result.data.data);
            let data = result.data.data;
            if (data) {
              localStorage.setItem("name", data.fname);
              localStorage.setItem("role", data.frole);
              localStorage.setItem("area", data.farea);
              localStorage.setItem("shift", data.fshift);
              this.loading1 = false;
              alert(`Selamat Datang ${data.fname}`);
              this.$router.push("/");
            } else {
              this.loading1 = false;
              alert("username atau password salah");
            }
          })
          .catch((err) => {
            console.log(err);
            alert("Error systems");
          });
      }
    },
  },
};
</script>

<style>
.custom-loader {
  animation: loader 1s infinite;
  display: flex;
}
@-moz-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-webkit-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-o-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>