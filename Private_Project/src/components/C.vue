<template>
  <div style="border: 1px solid yellow">C component (B의 자식)</div>
</template>

<script>
export default {
  beforeCreate() {
    console.log('%cC beforeCreate ===', 'color: orange');
  },
  created() {
    console.log('%cC created ===', 'color: orange');
  },
  beforeMount() {
    console.log('%cC beforeMount ===', 'color: orange');
  },
  mounted() {
    console.log('%cC mounted ===', 'color: orange');
  },
  beforeUpdate() {
    console.log('%cC beforeUpdate ===', 'color: orange');
  },
  updated() {
    console.log('%cC updated ===', 'color: orange');
  },
  beforeDestroy() {
    console.log('%cC beforeDestroy ===', 'color: orange');
  },
  destroyed() {
    console.log('%cC destroyed ===', 'color: orange');
  },
};
</script>
