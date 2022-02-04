<template>
  <div style="border: 1px solid red">
    A component
    <B></B>
  </div>
</template>

<script>
import B from '@/components/B';
export default {
  components: {
    B,
  },
  beforeCreate() {
    console.log('%cA beforeCreate ===', 'color: green');
  },
  created() {
    console.log('%cA created ===', 'color: green');
  },
  beforeMount() {
    console.log('%cA beforeMount ===', 'color: green');
  },
  mounted() {
    console.log('%cA mounted ===', 'color: green');
  },
  beforeUpdate() {
    console.log('%cA beforeUpdate ===', 'color: green');
  },
  updated() {
    console.log('%cA updated ===', 'color: green');
  },
  beforeDestroy() {
    console.log('%cA beforeDestroy ===', 'color: green');
  },
  destroyed() {
    console.log('%cA destroyed ===', 'color: green');
  },
};
</script>
