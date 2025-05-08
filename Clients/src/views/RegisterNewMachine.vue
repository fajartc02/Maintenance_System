<template>
  <div class="container-fluid p-0 m-0">
    <div class="row m-0">
      <div class="col p-0">
        <h2>Register New Machine</h2>
      </div>
    </div>
    <div class="row m-0">
      <div class="col p-1 bg-light">
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field
            v-model="machine"
            label="Machine name"
            required
          ></v-text-field>

          <v-select
            v-model="selectedLine"
            :items="items"
            :rules="[(v) => !!v || 'Line is required']"
            label="Line"
            required
          ></v-select>

          <v-text-field
            v-model="process"
            label="Process"
            required
          ></v-text-field>

          <v-text-field v-model="maker" label="Maker" required></v-text-field>

          <v-btn color="error" class="mr-4" @click="reset"> Clear </v-btn>

          <v-btn
            :loading="isLoading"
            :disabled="isLoading"
            color="success"
            @click="submitMachine()"
          >
            Submit
          </v-btn>
        </v-form>
      </div>
    </div>
    <div class="row m-0 mt-2">
      <div class="col-12 p-0">
        <v-alert
          v-if="isSuccess == true"
          border="top"
          colored-border
          type="info"
          elevation="2"
        >
          Berhasil menambahkan machine
        </v-alert>
        <v-alert
          v-if="isSuccess == false"
          border="top"
          colored-border
          type="error"
          elevation="2"
        >
          Gagal Menambahkan machine
        </v-alert>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "RegisterNewMachine",
  data() {
    return {
      valid: true,
      machine: "",
      //   nameRules: [
      //     (v) => !!v || "Machine is required",
      //     (v) => (v && v.length <= 20) || "Name must be less than 10 characters",
      //   ],
      selectedLine: "",
      //   emailRules: [
      //     (v) => !!v || "E-mail is required",
      //     (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      //   ],
      select: null,
      items: [
        "LPDC",
        "HPDC",
        "CAM SHAFT",
        "CYLINDER HEAD",
        "CYLINDER BLOCK",
        "CRANK SHAFT",
        "ASSY LINE",
      ],
      checkbox: false,
      process: "",
      maker: "",
      isSuccess: null,
      isLoading: false,
    };
  },
  methods: {
    validate() {
      this.$refs.form.validate();
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
    submitMachine() {
      let newMachine = {
        machine: this.machine,
        selectedLine: this.selectedLine,
        process: this.process,
        maker: this.maker,
      };
      console.log(newMachine);
      this.isLoading = true;
      if (
        this.machine == "" ||
        this.selectedLine == "" ||
        this.maker == "" ||
        this.process == ""
      ) {
        this.isLoading = false;
        this.isSuccess = false;
        setTimeout(() => (this.isSuccess = null), 5000);
      } else {
        axios
          .post(`${process.env.VUE_APP_HOST}/addNewMachine`, newMachine)
          .then((result) => {
            if (result.data) {
              console.log(result.data);
              this.isSuccess = true;
              this.isLoading = false;
              this.reset();
              setTimeout(() => (this.isSuccess = null), 5000);
            }
          })
          .catch((err) => {
            console.log(err);
            // this.submitMachine()
            this.isLoading = false;
            this.isSuccess = false;
            setTimeout(() => (this.isSuccess = null), 5000);
          });
      }
    },
  },
};
</script>

<style scoped>
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