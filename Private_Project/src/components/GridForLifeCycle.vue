<template>
  <!-- 
    TODO: Grid component 기능 추가. (언젠가)
    1. sorting
    2. 외부로부터 column명 받기.
 -->
  <div>
    <div style="display: flex; justify-content: space-between">
      <div class="table_total">총 게시글 {{ items.list.totalCnt }}개</div>
    </div>
    <div class="table">
      <ul class="th_ul common_ul">
        <li style="width: 50px" class="th_li common_li">
          <span><input type="checkbox" v-model="isAllCheck" @click="isAllCheck = !isAllCheck" /></span>
        </li>
        <li style="width: 70px" class="th_li common_li"><span>No</span></li>
        <li style="width: 150px" class="th_li common_li"><span>LanguageType</span></li>
        <li style="width: 100px" class="th_li common_li"><span>DealerType</span></li>
        <li style="width: *" class="th_li common_li"><span>제목</span></li>
        <li style="width: 150px" class="th_li common_li"><span>작성자</span></li>
        <li style="width: 160px" class="th_li common_li"><span>작성 날짜</span></li>
        <li style="width: 160px" class="th_li common_li"><span>수정 날짜</span></li>
        <li style="width: 70px" class="th_li common_li"><span>조회수</span></li>
      </ul>
      <!-- <ul style="width: 100%; border: solid; height: 30px" v-for="(item, index) in items" :key="index"> -->
      <ul class="common_ul" v-for="(item, index) in items.list" :key="index">
        <li style="width: 50px" class="td_li common_li">
          <span><input :value="item.notificationId" v-model="checkedIds" type="checkbox" /></span>
        </li>
        <li style="width: 70px" class="td_li common_li">
          <span>{{ item.no }}</span>
        </li>
        <li style="width: 150px" class="td_li common_li">
          <span>{{ item.languageType }}</span>
        </li>
        <li style="width: 100px" class="td_li common_li">
          <span>{{ item.dealerType }}</span>
        </li>
        <li style="width: *" class="td_li common_li">
          <span style="cursor: pointer; color: blue" @click="$emit('rowInfo', item)">{{ item.title }}</span>
        </li>
        <li style="width: 150px" class="td_li common_li">
          <span>{{ item.regUser }}</span>
        </li>
        <li style="width: 160px" class="td_li common_li">
          <span>{{ item.regDate }}</span>
        </li>
        <li style="width: 160px" class="td_li common_li">
          <span>{{ item.regDate === item.updDate ? '-' : item.updDate }}</span>
        </li>
        <li style="width: 70px" class="td_li common_li">
          <span>{{ item.viewCount }}</span>
        </li>
      </ul>
      <ul v-if="items.list.length < 1" class="common_ul">
        <!-- 데이터 없음 정의 -->
        <li class="noData_li common_li"><span class="noData_span">게시글을 작성해주세요</span></li>
      </ul>
    </div>
    <!-- 페이징 -->
    <div class="paging_total">
      <span>총 {{ totalPage }}페이지</span>
    </div>
    <div class="paging">
      <span><strong @click="setCurPage(curPage - 1)">&laquo;</strong></span>
      <span v-for="num in showPaging" :key="num">
        <strong v-if="num == curPage" class="selected" @click="setCurPage(num)">{{ num }}</strong>
        <strong v-else @click="setCurPage(num)">{{ num }}</strong>
      </span>
      <span><strong @click="setCurPage(curPage + 1)">&raquo;</strong></span>
    </div>
  </div>
</template>

<script>
export default {
  // props: {
  //   items: Array,
  //   default: [],
  // },
  props: {
    items: Object,
    default: [],
  },
  data: () => ({
    // 보여줄 게시글 배열
    showItems: [],
    // 페이징 관련 데이터 [s]
    // 총 게시글 개수
    totalCnt: 0,
    // 다섯개씩 보여줄 것
    listRange: 5,
    // 현재 페이지 디폴트 1 세팅
    curPage: 1,
    // 페이징 범위 5
    pagingRange: 5,
    // 시작 페이지
    startPage: 1,
    // 종료 페이지
    endPage: 1,
    // 총 페이지 수
    totalPage: 1,
    // 보여주는 용 페이징
    showPaging: [],
    // 이전 총 페이지 수
    preTotalPage: 1,
    // 페이징 관련 데이터 [e]
    // 체크된 게시글 아이디 배열
    checkedIds: [],
    // 전부 체크되었는지 여부
    isAllCheck: false,
  }),
  computed: {
    // 외부의 데이터 비동기적 데이터이기 때문에 computed 하게 받아 처리한다. (items를)
    // https://juntcom.tistory.com/103
  },
  watch: {
    isAllCheck: function () {
      // 초기화
      this.checkedIds = [];
      if (this.isAllCheck) {
        this.showItems.forEach((element) => {
          this.checkedIds.push(element.notificationId);
        });
      }
    },
    checkedIds: function () {
      this.$emit('checkedIds', this.checkedIds);
    },
    // // 외부에서 내려오는 데이터
    // items: function () {
    //   // 배열 내림차순 정렬
    //   // this.items.sort(this.sortingItems);
    //   // 총 게시글 개수 세팅
    //   this.totalCnt = this.items.length;
    //   // 페이징 세팅
    //   this.setPagingList();
    // },
  },
  beforeCreate() {
    console.log('%cGridForLifeCycle(component) beforeCreate ===', 'color: red');
    console.log('props 값 items: ', this.items.list);
  },
  created() {
    console.log('%cGridForLifeCycle(component) created ===', 'color: red');
    // 총 게시글 개수 세팅
    this.totalCnt = this.items.list.length;
    console.log('props 값 items: ', this.items.list);
    console.log('totalCnt', this.totalCnt);
    // 페이징 세팅
    // this.showItems = this.items.list;
    //this.setPagingList();
  },
  beforeMount() {
    console.log('%cGridForLifeCycle(component) beforeMount ===', 'color: red');
  },
  mounted() {
    console.log('%cGridForLifeCycle(component) mounted ===', 'color: red');
  },
  beforeUpdate() {
    console.log('%cGridForLifeCycle(component) beforeUpdate ===', 'color: red');
  },
  updated() {
    console.log('%cGridForLifeCycle(component) updated ===', 'color: red');
  },
  beforeDestroy() {
    console.log('%cGridForLifeCycle(component) beforeDestroy ===', 'color: red');
  },
  destroyed() {
    console.log('%cGridForLifeCycle(component) destroyed ===', 'color: red');
  },
  methods: {
    allCheck: function () {
      this.checkedIds.push();
    },
    setCurPage: function (curPage) {
      if (curPage <= 0) {
        this.curPage = 1;
      } else if (curPage > this.totalPage) {
        this.curPage = this.totalPage;
      } else {
        this.curPage = curPage;
      }

      // 페이지 이동에 따른 세팅
      this.setPagingList();
    },
    setPagingList() {
      // 게시글 총 개수 세팅
      this.totalCnt = this.items.length;

      // 페이징 세팅
      this.getTotalPage();

      //보여줄 배열만 세팅
      let start = (this.curPage - 1) * this.listRange;
      let end = start + this.listRange;
      this.showItems = this.items.list.slice(start, end);
      console.log('showItems');
      // this.$forceUpdate();

      // 하단 페이징 처리
      this.setPagingRange();
    },
    // 페이징 처리 메서드
    getTotalPage: function () {
      // 총 토탈 페이지 값 변경 되기 전 값 저장.
      this.preTotalPage = this.totalPage;
      this.totalPage = Math.floor((this.totalCnt - 1) / this.listRange) + 1;
    },
    // 하단 페이징 범위 변경 메서드
    setPagingRange() {
      let temp = [];
      for (let i = 1; i <= this.totalPage; i++) {
        temp.push(i);
      }

      // 현재 페이지가 항상 중앙에 오도록 세팅
      let start = this.curPage - parseInt(this.pagingRange / 2) <= 0 ? 1 : this.curPage - parseInt(this.pagingRange / 2);
      // let end = start + this.pagingRange;
      let end = this.curPage + parseInt(this.pagingRange / 2) <= this.totalPage ? this.curPage + parseInt(this.pagingRange / 2) : this.totalPage;

      // start에서 중앙 값 rage만 보여주면 현재 1페이지 및 제일 끝 페이지인 경우 범위 문제가 생기기 때문에 세팅
      if (end - start + 1 === this.pagingRange) {
        this.showPaging = temp.slice(start - 1, end);
      } else if (end - start + 1 < this.pagingRange && this.curPage < this.pagingRange / 2) {
        this.showPaging = temp.slice(0, this.pagingRange);
      } else if (end - start + 1 < this.pagingRange && this.curPage > this.pagingRange / 2) {
        this.showPaging = temp.slice(this.totalPage - this.pagingRange < 0 ? 0 : this.totalPage - this.pagingRange, this.totalPage);
      }
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

.table {
  width: 100%;
  overflow: auto;
}

.searchBox {
  border: 1px solid;
  border-collapse: collapse;
  overflow: auto;
  width: 100%;
  text-align: left;
  padding: 10px;
  margin-bottom: 10px;

  td,
  th {
    border: 1px solid;
    padding: 5px;
  }
}

.table_total {
  font-size: small;
  text-align: left;
  margin-left: 5px;
}

.paging {
  span {
    margin: 2px;
    strong {
      cursor: pointer;
    }
    .selected {
      color: red;
    }
  }
}

.paging_total {
  font-size: small;
  text-align: right;
  margin-right: 5px;
}

// 공통 ul
.common_ul {
  width: 100%;
  display: table;
  table-layout: fixed;
  // text-align: center;

  // 공통 li
  .common_li {
    display: table-cell;
    list-style: none;
    text-align: center;
    line-height: 30px;
    border: {
      right: solid 1px;
      bottom: solid 1px;
    }

    // 생각해보아야함
    &:first-child {
      border: {
        left: solid 1px;
      }
    }
  }
}

// table th에 해당하는 ul(tr)
.th_ul {
  font-weight: bold;

  // table th 에 해당하는 li
  .th_li {
    border: {
      top: solid 1px;
    }
    background-color: lightyellow;
  }
}

// data 부분에 해당하는 li
.td_li {
  text-align: center;
}

// data 없는 경우들
.noData_li {
  line : {
    height: 30px;
  }

  &.noData_span {
    font: {
      weight: bold;
    }
  }
}

// 써보기 테스트
// 참조 https://heropy.blog/2018/01/31/sass/
@mixin border-radius($radius) {
  -webkit-border-radius: $radius;
  -moz-border-radius: $radius;
  -ms-border-radius: $radius;
  border-radius: $radius;
}

.btn_array {
  .btn {
    margin-right: 5px;
  }
  .btn:last-child {
    margin-right: 0;
  }
}

.btn {
  // background-color: #0099ff;
  color: white;
  width: 120px;
  margin-bottom: 5px;

  @include border-radius(10px);
}
</style>
