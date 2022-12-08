<script>
export default {
  name: 'Employee', // necessary for self-reference
  props: {
    model: Object
  },
  data() {
    return {
      isOpen: false
    }
  }, 
  created() {
    if (this.isManager){
      this.changeType()
    }
  
    this.model.allocation = this.allocationByType(this.model.type)
    this.$helper.allocation += this.allocationByType(this.model.type)
    
    this.$helper.current_id++
    this.model.id = this.$helper.current_id    

    console.log(this.$helper)
  },
  computed: {
    isManager() {
      return this.model.type == 'manager'
    },
    accumulatedAllocation() {
      if (this.model.children){
        let init_val = 0
        return this.model.children.reduce(
          (acc, child) => acc + child.allocation,
          init_val) + this.model.allocation
      }
      return 0
    }
  },
  methods: { 
    toggle() {
      if (this.isManager) {
        this.isOpen = !this.isOpen
      }
    },
    changeType() {
      this.model.children = []
    },
    allocationByType(emp_type) {
      switch(emp_type) {
        case 'manager':
          return 300
        case 'qa':
          return 500
        case 'developer':
          return 1000
      }
    },
    addChild(emp_type) { 
      this.model.children.push(
        {
        name: `${emp_type} ${this.$helper.current_id}`,
        type: emp_type
      })
      this.isOpen = true
    },
    deleteChild(delete_id) {
      this.$helper.allocation -= this.model.children.find(child => child.id == delete_id).allocation
      this.model.children = this.model.children.filter(child => child.id != delete_id) 
      console.log(this.$helper.allocation)
    }
  }
}
</script>

<template>
  <li>
    <div
      class="employee-box"
      :class="{ bold: isManager }"
      @dblclick="changeType"
      @click.shift="$emit('delete-child', this.model.id)">
      {{ model.name }} 
      <div v-if="isManager">
        <button class="add" @click="addChild('developer')">D</button>
        <button class="add" @click="addChild('manager')">M</button>
        <button class="add" @click="addChild('qa')">Q</button>
        ${{ accumulatedAllocation }}
        <span @click="toggle" class="toggle">{{ isOpen ? '-' : '+' }}</span>
      </div>
    </div>
    <ul v-show="isOpen" v-if="isManager">
      <Employee
        class="item"
        v-for="model in model.children"
        :model="model"
        @delete-child="deleteChild">
      </Employee>
    </ul>
  </li>
</template>

<style>
.employee-box {
  background-color: white;
  padding: 10px;
  border: 3px solid #2A9D8F;
  border-radius: 4px;
  margin-left: 10px;
  margin-top: 10px;
  width: 250px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-weight: bold;
  align-items: center;
}
 
.add {
  background-color: #E9C46A;
  border: 3px solid #E76F51;
  padding: 3px;
  margin: 4px;
  color: #264653;
  font-weight: bold;
  border-radius: 4px;
}

.toggle{
  background-color: #2A9D8F;
  border:  3px solid #E76F51;
  font-weight: bold;
  padding: 3px;
  color: white;
}

li::marker {
  color: #E76F51;
  font-size: 4em;
  content: "=>";
}
</style>
