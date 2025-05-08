<template>
  <b-container fluid class="mt-2">
    <b-row>
      <b-col>
        <b-card class="height-card text-center">
          <h2 class="align-middle">Furnance Process</h2>
        </b-card>
      </b-col>
      <b-col>
        <b-card class="height-card text-center">
          <h2 class="align-middle">Injection Process</h2></b-card
        >
      </b-col>
      <b-col>
        <b-card class="height-card text-center">
          <h2 class="align-middle">Burr Removal Process</h2></b-card
        >
      </b-col>
      <b-col>
        <b-card class="height-card text-center">
          <h2 class="align-middle">Visual Check Process</h2></b-card
        >
      </b-col>
      <b-col>
        <b-card class="height-card text-center">
          <h2 class="align-middle">Heat Treatment Process</h2></b-card
        >
      </b-col>
    </b-row>
    <SubTitleDashboard title="Pillar 1 (STW)" />
    <b-row>
      <b-col>
        <b-card>
          <LineBarChart />
        </b-card>
      </b-col>
      <b-col></b-col>
      <b-col></b-col>
      <b-col></b-col>
      <b-col></b-col>
    </b-row>
    <SubTitleDashboard title="Pillar 2 (OM)" />
    <b-row>
      <b-col>
        <table class="table table-bordered">
          <thead>
            <tr>
              <th scope="col">No</th>
              <th scope="col">Item Check</th>
              <th scope="col">Judg</th>
              <th scope="col">Finding</th>
              <th scope="col">S</th>
              <th scope="col">Q</th>
              <th scope="col">P</th>
              <th scope="col">Pic</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>Hydraulic Piping check</td>
              <td>O</td>
              <td><b-button size="sm" pill>Details</b-button></td>
              <td>O</td>
              <td>O</td>
              <td>O</td>
              <td rowspan="3">Prod</td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>Check pressure gauge</td>
              <td>X</td>
              <td>
                <b-button size="sm" pill variant="danger">Details</b-button>
              </td>
              <td>O</td>
              <td>O</td>
              <td>O</td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td>Pressure Pompa</td>
              <td>O</td>
              <td><b-button size="sm" pill>Details</b-button></td>
              <td>O</td>
              <td>O</td>
              <td>O</td>
            </tr>
          </tbody>
        </table>
      </b-col>
      <b-col></b-col>
      <b-col></b-col>
      <b-col></b-col>
      <b-col></b-col>
    </b-row>
    <SubTitleDashboard title="Pillar 3 (Process Mgmt)" />
    <b-row>
      <b-col>
        <table class="table table-bordered">
          <thead>
            <tr>
              <th scope="col">Category</th>
              <th scope="col">No</th>
              <th scope="col">Item Check</th>
              <th scope="col">Judg</th>
              <th scope="col">Finding</th>
              <th scope="col">S</th>
              <th scope="col">Q</th>
              <th scope="col">P</th>
              <th scope="col">Pic</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td rowspan="3">Senmon Hozen</td>
              <td scope="row">1</td>
              <td>Hydraulic Piping check</td>
              <td>O</td>
              <td><b-button size="sm" pill>Details</b-button></td>
              <td>O</td>
              <td>O</td>
              <td>O</td>
              <td rowspan="3">Prod</td>
            </tr>
            <tr>
              <td scope="row">2</td>
              <td>Check pressure gauge</td>
              <td>X</td>
              <td>
                <b-button size="sm" pill variant="danger">Details</b-button>
              </td>
              <td>O</td>
              <td>O</td>
              <td>O</td>
            </tr>
            <tr>
              <td scope="row">3</td>
              <td>Pressure Pompa</td>
              <td>O</td>
              <td><b-button size="sm" pill>Details</b-button></td>
              <td>O</td>
              <td>O</td>
              <td>O</td>
            </tr>
          </tbody>
          <tbody>
            <tr>
              <td rowspan="3">Die Management</td>
              <td scope="row">1</td>
              <td>Hydraulic Piping check</td>
              <td>O</td>
              <td><b-button size="sm" pill>Details</b-button></td>
              <td>O</td>
              <td>O</td>
              <td>O</td>
              <td rowspan="3">Prod</td>
            </tr>
            <tr>
              <td scope="row">2</td>
              <td>Check pressure gauge</td>
              <td>X</td>
              <td>
                <b-button size="sm" pill variant="danger">Details</b-button>
              </td>
              <td>O</td>
              <td>O</td>
              <td>O</td>
            </tr>
            <tr>
              <td scope="row">3</td>
              <td>Pressure Pompa</td>
              <td>O</td>
              <td><b-button size="sm" pill>Details</b-button></td>
              <td>O</td>
              <td>O</td>
              <td>O</td>
            </tr>
          </tbody>
          <tbody>
            <tr>
              <td rowspan="3">Casting Management</td>
              <td scope="row">1</td>
              <td>Hydraulic Piping check</td>
              <td>O</td>
              <td><b-button size="sm" pill>Details</b-button></td>
              <td>O</td>
              <td>O</td>
              <td>O</td>
              <td rowspan="3">Prod</td>
            </tr>
            <tr>
              <td scope="row">2</td>
              <td>Check pressure gauge</td>
              <td>X</td>
              <td>
                <b-button size="sm" pill variant="danger">Details</b-button>
              </td>
              <td>O</td>
              <td>O</td>
              <td>O</td>
            </tr>
            <tr>
              <td scope="row">3</td>
              <td>Pressure Pompa</td>
              <td>O</td>
              <td><b-button size="sm" pill>Details</b-button></td>
              <td>O</td>
              <td>O</td>
              <td>O</td>
            </tr>
          </tbody>
          <tbody>
            <tr>
              <td rowspan="3">Symptom Management</td>
              <td scope="row">1</td>
              <td>Hydraulic Piping check</td>
              <td>O</td>
              <td><b-button size="sm" pill>Details</b-button></td>
              <td>O</td>
              <td>O</td>
              <td>O</td>
              <td rowspan="3">Prod</td>
            </tr>
            <tr>
              <td scope="row">2</td>
              <td>Check pressure gauge</td>
              <td>X</td>
              <td>
                <b-button size="sm" pill variant="danger">Details</b-button>
              </td>
              <td>O</td>
              <td>O</td>
              <td>O</td>
            </tr>
            <tr>
              <td scope="row">3</td>
              <td>Pressure Pompa</td>
              <td>O</td>
              <td><b-button size="sm" pill>Details</b-button></td>
              <td>O</td>
              <td>O</td>
              <td>O</td>
            </tr>
          </tbody>
        </table>
      </b-col>
      <b-col></b-col>
      <b-col></b-col>
      <b-col></b-col>
      <b-col></b-col>
    </b-row>
  </b-container>
</template>

<script>
import SubTitleDashboard from "@/components/Tps/SubTitleDashboard";
import LineBarChart from "@/components/Tps/Chart/LineBarChart";
export default {
  name: "DashboardTps",
  components: {
    SubTitleDashboard,
    LineBarChart,
  },
};
</script>

<style scoped>
.height-card {
  height: 100%;
}
.card-body {
  padding: 1px;
}
td {
  font-size: 9px !important;
}
.btn-sm {
  font-size: 9px;
}
</style>