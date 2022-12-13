<script>
export default {
  name: "EmployeeBox", // necessary for self-reference
  props: {
    mod: Object, // When created 'id' and 'type' values must be passed
  },
  data() {
    return {
      showChildren: false,
      showAdd: false,
      profPic: this.$helper.profilePic(),
      model: this.mod,
    };
  },
  created() {
    if (this.isManager) {
      this.changeType();
    }
    this.model.allocation = this.allocationByType(this.model.type);
    this.$emit("update-allocation", this.model.allocation);
    this.model.name = `${this.model.type} ${this.model.id}`;
  },
  computed: {
    isManager() {
      console.log(this.model);
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
      this.model.children.push({ type: emp_type, id: this.$helper.current_id });
      this.$helper.current_id++;
      this.showChildren = true;
    },
    deleteChild(delete_id) {
      let delete_model = this.model.children.find(
        (child) => child.id == delete_id
      );
      this.model.allocation -= delete_model.allocation;
      this.model.children = this.model.children.filter(
        (child) => child != delete_model
      );
      this.$emit("update-allocation", delete_model.allocation);
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
      <EmployeeBox
        class="item"
        v-for="emp in model.children"
        :mod="emp"
        :key="emp.id"
        @update-allocation="updateAllocation"
        @delete-child="deleteChild"
      >
      </EmployeeBox>
    </ul>
  </li>
</template>
