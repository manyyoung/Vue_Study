<template>
  <ul class="left">
    <label class="left_label"><strong>메뉴</strong></label>
    <li class="left_li" @click="pageBind('Entrance')">메인</li>
    <li class="left_li" @click="pageBind('List')">공지사항</li>
    <li class="left_li" @click="pageBind('Paging')">페이징 샘플</li>
    <li class="left_li" @click="pageBind('LifeCycle')">라이프 사이클 구동 테스트</li>
    <li class="left_li" @click="pageBind('LifeCycleInfo')">라이프 사이클</li>
    <li class="left_li" @click="pageBind('Asexualreproduciton')">무성 생식</li>
    <li class="left_li" @click="pageBind('FamilyTree')">인류 탄생</li>
  </ul>
</template>

<script>
export default {
  methods: {
    pageBind: function (val) {
      this.$router
        .push({
          name: val,
        })
        .catch(() => {
          // 동일페이지 이동 처리
          // https://blog.nachal.com/1507
        });
    },
  },
};
</script>

<style lang="scss" scoped>
// 초기화
* {
  margin: 0px;
  padding: 0px;
}

.left {
  background-color: lightyellow;
  height: 100vh; /* For 100% screen height */
  //   width: 100vw; /* For 100% screen width */
  padding-top: 5px;
  margin-right: 10px;
  .left_label {
    font-size: larger;
    margin-bottom: 5px;
  }
  .left_li {
    list-style: none;
    width: 100px;
    cursor: pointer;
    padding: 5px;
  }
}
</style>
