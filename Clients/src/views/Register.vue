<template>
  <div class="container-fluid">
    <div class="row p-0 m-0">
      <div class="col">
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text" id="basic-addon1">Name</span>
          </div>
          <input
            type="text"
            class="form-control"
            placeholder="nama kamu"
            aria-label="nama kamu"
            aria-describedby="basic-addon1"
            v-model="fname"
          />
        </div>
      </div>
    </div>
    <div class="row p-0 m-0">
      <div class="col pt-0">
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text" id="basic-addon1">Noreg</span>
          </div>
          <input
            type="text"
            class="form-control"
            placeholder="Noreg kamu"
            aria-label="Noreg kamu"
            aria-describedby="basic-addon1"
            v-model="fnoreg"
          />
        </div>
      </div>
    </div>
    <div class="row p-0 m-0">
      <div class="col pt-0">
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text" id="basic-addon1">Shift</span>
          </div>
          <select class="custom-select form-control" v-model="fshift">
            <option selected disabled>--Choose Shift--</option>
            <option value="WHITE">WHITE</option>
            <option value="RED">RED</option>
            <option value="RED">NON</option>
          </select>
        </div>
      </div>
    </div>
    <div class="row p-0 m-0">
      <div class="col pt-0">
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text" id="basic-addon1">Whatsapp No.</span>
          </div>
          <input
            type="text"
            class="form-control"
            placeholder="08xxxxx"
            aria-label="password"
            aria-describedby="basic-addon1"
            v-model="fpassword"
          />
        </div>
      </div>
    </div>
    <div class="row p-0 m-0 align-items-center">
      <div class="col">
        <v-btn
          class="ma-2"
          :loading="loading1"
          :disabled="loading1"
          color="success"
          @click="register()"
        >
          Register
          <template v-slot:loader>
            <span class="custom-loader">
              <v-icon light>mdi-cached</v-icon>
            </span>
          </template>
        </v-btn>
      </div>
      <div class="col">
        <router-link class="btn btn-outline-danger" to="/login">
          <span>Cancel</span>
        </router-link>
      </div>
    </div>
  </div>
</template>


<script>
import axios from "axios";
import qs from "qs";
export default {
  name: "Register",
  data() {
    return {
      fname: "",
      fnoreg: "",
      fshift: "",
      fpassword: "",
      loading1: false,
    };
  },
  methods: {
    register() {
      this.loading1 = true;
      if (this.fname !== "" && this.fshift != "" && this.fnoreg != "") {
        axios
          .post(`${process.env.VUE_APP_HOST}/signup`, {
            fname: this.fname,
            fnoreg: this.fnoreg,
            fshift: this.fshift,
            fpassword: this.fpassword,
          })
          .then((result) => {
            if (result.status == 202) {
              alert("Anda sudah terdaftar");
            } else {
              alert(
                "success to register, wait for approval info from SMART ANDON Number"
              );
              this.configWa(
                `Ada yang mendaftar:
Nama: ${this.fname},
Noreg: ${this.fnoreg},
shift: ${this.fshift},
password: ${this.fpassword}
              `,
                "082211511213"
              );
              this.$router.push("/login");
            }
            this.loading1 = false;
          })
          .catch((err) => {
            alert(`failed to register ${JSON.stringify(err)}`);
            this.loading1 = false;
          });
      } else {
        alert("Pastikan semua data terisi");
        this.loading1 = false;
      }
    },
    configWa(msg, receiverNo) {
      var data = qs.stringify({
        token: "nRRMT4Jomzf5vyn4DU1p4ywDuZ7pdYwDnULfGTlrAsVAMWcpeT",
        number: receiverNo,
        message: msg,
      });
      var config = {
        method: "post",
        url: "https://app.ruangwa.id/api/send_express",
        headers: {},
        data: data,
      };

      axios(config)
        .then(function (response) {
          console.log(JSON.stringify(response.data));
          alert(response.data);
        })
        .catch(function (error) {
          alert(error);
        });
    },
  },
};
</script>