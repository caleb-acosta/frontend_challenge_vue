<script>
import EmployeeBox from "./EmployeeBox.vue";

export default {
  components: {
    EmployeeBox,
  },
  data() {
    return {
      dep: [],
    };
  },
  computed: {
    totalAllocation() {
      let init = 0;
      return this.dep.reduce((acc, emp) => acc + emp.allocation, init);
    },
  },
  methods: {
    addManager() {
      this.dep.push({ type: "manager", id: this.$helper.current_id });
      this.$helper.current_id++;
      console.log(this.dep);
    },
    deleteManager(manager_id) {
      this.dep.find((child) => child.id == manager_id).children = [];
      console.log(this.dep);
      this.dep = this.dep.filter((child) => child.id != manager_id);
    },
    updateAllocation() {
      return 0;
    },
  },
};
</script>

<template>
  <div>
    <div class="info">
      <button class="add-main" @click="addManager">Add Manager</button>
      <h3>Total Allocation: ${{ totalAllocation }}</h3>
    </div>
    <div class="department">
      <ul>
        <EmployeeBox
          v-for="emp in dep"
          :mod="emp"
          :key="emp.id"
          @delete-child="deleteManager"
          @update-allocation="updateAllocation"
        ></EmployeeBox>
      </ul>
    </div>
  </div>
</template>

<style>
.department {
  width: 80%;
  min-height: 100%;
  margin-left: 10%;
}

.info {
  display: flex;
  justify-content: space-around;
  padding: 8px;
}

.add-main {
  background-color: #f72585;
  border: none;
  color: white;
  padding: 8px;
  border-radius: 8px;
  font-weight: bold;
}
</style>
