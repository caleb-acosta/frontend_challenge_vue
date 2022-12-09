<script>
import Department from "./components/Department.vue";

export default {
  components: {
    Department,
  },
  data() {
    return {};
  },
};
</script>

<template>
  <header>
    <h2>Frontend Challenge</h2>
    <div class="gradient"></div>
  </header>
  <Department></Department>
</template>

<style>
header .gradient {
  background: linear-gradient(
    90deg,
    hsla(333, 93%, 56%, 1) 0%,
    hsla(258, 86%, 34%, 1) 47%,
    hsla(194, 85%, 62%, 1) 100%
  );
  height: 10px;
  width: 100%;
}

header {
  display: flex;
  align-items: center;
  flex-direction: column;
}

header h2 {
  margin: 16px;
}

li::marker {
  content: "";
}
</style>
