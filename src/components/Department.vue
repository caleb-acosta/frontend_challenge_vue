<script>
import Employee from './Employee.vue'

export default {
  components: {
    Employee
  },
  data() {
    return {
      dep: []
    }
  },
  computed: {
    totalAllocation() {
      //return this.dep.length
      let init = 0
      return this.dep.reduce((acc, emp) => acc + emp.allocation, init)
    }
  },
  methods: {
    addManager() {
      this.dep.push({type: 'manager'})
    },
    deleteManager(manager_id) {
      this.dep = this.dep.filter(child => child.id != manager_id )
    }
  }
}
</script>

<template>
<div>
  <div class="info">
    <button class="add-main" @click="addManager">Add Manager</button>
    <h3>Total Allocation: ${{ totalAllocation }}</h3>
  </div>
   <div class="department">
    <ul>
      <Employee v-for="emp in dep" :model="emp" @delete-child="deleteManager"></Employee>
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
  background-color: #F72585;
  border: none;
  color: white; 
  padding: 8px;
  border-radius: 8px;
  font-weight: bold;
}
</style>
