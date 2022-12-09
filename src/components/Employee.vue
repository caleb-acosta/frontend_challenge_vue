<script>
export default {
  name: "Employee", // necessary for self-reference
  props: {
    model: Object, // When created 'name' and 'type' values must be passed
  },
  data() {
    return {
      showChildren: false,
      showAdd: false,
      profPic: this.$helper.profilePic(),
    };
  },
  created() {
    if (this.isManager) {
      this.changeType();
    }
    console.log(this.profPic + "");
    this.model.allocation = this.allocationByType(this.model.type);
    this.$emit("update-allocation", this.model.allocation);
    this.model.name = `${this.model.type} ${this.$helper.current_id}`;
    this.$helper.current_id++;
    this.model.id = this.$helper.current_id;
  },
  unmounted() {
    this.$emit("update-allocation", this.model.allocation * -1);
  },
  computed: {
    isManager() {
      return this.model.type == "manager";
    },
  },
  methods: {
    toggleChildren() {
      if (this.isManager) {
        this.showChildren = !this.showChildren;
      }
    },
    toggleOptions() {
      if (this.isManager) {
        this.showAdd = !this.showAdd;
      }
    },
    changeType() {
      this.model.children = [];
    },
    allocationByType(emp_type) {
      switch (emp_type) {
        case "manager":
          return 300;
        case "qa":
          return 500;
        case "developer":
          return 1000;
      }
    },
    addChild(emp_type) {
      this.model.children.push({ type: emp_type });
      this.showChildren = true;
    },
    deleteChild(delete_id) {
      let to_delete = this.model.children.find(
        (child) => child.id == delete_id
      );
      this.model.children = this.model.children.filter(
        (child) => child != to_delete
      );
    },
    updateAllocation(child_allocation) {
      this.model.allocation += child_allocation;
      this.$emit("update-allocation", child_allocation);
    },
  },
};
</script>

<template>
  <li>
    <div
      class="employee"
      :class="{
        man: model.type == 'manager',
        dev: model.type == 'developer',
        qa: model.type == 'qa',
      }"
    >
      <div class="employee-info">
        <img class="prof-pic" :src="profPic" />
        <span class="name">{{ model.name }}</span>
        <span>$ {{ model.allocation }}</span>
        <font-awesome-icon
          @click="toggleChildren"
          v-if="isManager"
          :icon="showChildren ? 'fa-arrow-up' : 'fa-arrow-down'"
        />
        <font-awesome-icon
          @click="$emit('delete-child', this.model.id)"
          icon="fa-solid fa-user-minus"
        />
        <font-awesome-icon
          @click="toggleOptions"
          v-if="isManager"
          icon="fa-solid fa-user-plus"
        />
      </div>
      <div v-if="isManager" v-show="showAdd" class="add-buttons">
        <button @click="addChild('developer')">Dev</button>
        <button @click="addChild('manager')">Manager</button>
        <button @click="addChild('qa')">QA</button>
      </div>
    </div>
    <ul v-show="showChildren" v-if="isManager">
      <Employee
        class="item"
        v-for="model in model.children"
        :model="model"
        @update-allocation="updateAllocation"
        @delete-child="deleteChild"
      >
      </Employee>
    </ul>
  </li>
</template>

<style>
.employee {
  background-color: white;
  width: 400px;
  margin-top: 20px;
  font-family: Verdana, sans-serif;
  border-radius: 10px;
}

.dev {
  box-shadow: 0px -6px #3a0ca3, 2px 2px 10px black;
}

.qa {
  box-shadow: 0px -6px #4361ee, 2px 2px 10px black;
}

.man {
  box-shadow: 0px -6px #4cc9f0, 2px 2px 10px black;
}

.employee div {
  display: flex;
  justify-content: space-around;
  padding: 8px 0 8px 0;
  align-items: center;
}

.employee-info * {
  margin: 0 8px 0 8px;
}

.employee-info button {
  background-color: #f72585;
  color: white;
  padding: 6px;
  border: none;
  border-radius: 4px;
}

.prof-pic {
  border-radius: 100%;
  border: 3px solid #f72585;
  object-fit: cover;
  width: 50px;
  height: 50px;
}

.add-buttons button {
  background-color: #f72585;
  color: white;
  border: none;
  font-weight: bold;
  width: 100%;
  height: 32px;
  margin: 0;
  border: 1px solid white;
}

.name {
  font-weight: bold;
  margin-right: auto;
}
</style>
