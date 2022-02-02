<template>
  <div>
    <img src="@/assets/logo.png" />
    <h1>아따 입구</h1>
    <router-link :to="{ name: 'List' }">공지사항 링크 ▶▶▶</router-link> <br />
    <br />
    <router-link :to="{ name: 'Paging' }">페이징 수정 예시 링크 ▶▶▶</router-link> <br />
    <br />
    <router-link :to="{ name: 'LifeCycleInfo' }">라이프 사이클 ▶▶▶</router-link> <br />
    <br />
    <router-link :to="{ name: 'ComWat' }">Computed VS Watch ▶▶▶</router-link> <br />
    <br />
    <router-link :to="{ name: 'Asexualreproduciton' }">무성생식 가계도 ▶▶▶</router-link> <br />
  </div>
</template>
