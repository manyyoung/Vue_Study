<template>
  <div style="border: 1px solid blue">
    B component (A의 자식)
    <C></C>
  </div>
</template>

<script>
import C from '@/components/C';

export default {
  components: {
    C,
  },
  beforeCreate() {
    console.log('%cB beforeCreate ===', 'color: gray');
  },
  created() {
    console.log('%cB created ===', 'color: gray');
  },
  beforeMount() {
    console.log('%cB beforeMount ===', 'color: gray');
  },
  mounted() {
    console.log('%cB mounted ===', 'color: gray');
  },
  beforeUpdate() {
    console.log('%cB beforeUpdate ===', 'color: gray');
  },
  updated() {
    console.log('%cB updated ===', 'color: gray');
  },
  beforeDestroy() {
    console.log('%cB beforeDestroy ===', 'color: gray');
  },
  destroyed() {
    console.log('%cB destroyed ===', 'color: gray');
  },
};
</script>
