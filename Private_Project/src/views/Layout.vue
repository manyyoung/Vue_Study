<template>
  <div>
    <!-- header -->
    <Header></Header>
    <!-- 왼쪽 사이드바 -->
    <div class="left_view">
      <LeftMenu></LeftMenu>

      <!-- 화면 영역 -->
      <router-view class="view_center1" />
    </div>
    <!-- footer -->
    <Footer></Footer>
  </div>
</template>

<script>
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LeftMenu from '@/components/LeftMenu';

export default {
  components: {
    Header,
    Footer,
    LeftMenu,
  },
};
</script>

<style lang="scss" scoped>
.left_view {
  display: flex;
}
// view 중앙 정렬 방식
// 참조: https://velog.io/@jary/flex%EB%A5%BC-%EC%9D%B4%EC%9A%A9%ED%95%9C-%EA%B0%80%EC%9A%B4%EB%8D%B0-%EC%A0%95%EB%A0%AC
.view_center1 {
  margin: 0 auto;
}
.view_center2 {
  width: 100%;
}
.view_center3 {
  display: flex;
  justify-content: center;
}
</style>
