<template>
  <div style="cursor: pointer" @click="mainBind"><h1>자라나라 머리머리머리</h1></div>
</template>

<script>
export default {
  methods: {
    mainBind: function () {
      this.$router
        .push({
          name: 'Entrance',
        })
        .catch(() => {});
    },
  },
};
</script>

<style lang="scss" scoped>
* {
  margin: 0px;
  background-color: lightyellow;
}
</style>
