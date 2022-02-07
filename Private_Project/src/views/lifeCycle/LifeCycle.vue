<template>
  <div>
    <h3>라이프 사이클을 위한 그리드 props 테스트(리스트 컴포넌트 수정 중)</h3>
    <a href="https://kr.vuejs.org/v2/guide/instance.html">Vue document 라이프사이클 이미지</a>
    <br />

    <GridForLifeCycle :items="notice.class"></GridForLifeCycle>
    <hr />
    <br />
    <h3>자식의 자식의 자식 컴포넌트 라이프사이클</h3>
    <A></A>
  </div>
</template>

<script>
// 참조: https://wormwlrm.github.io/2018/12/29/Understanding-Vue-Lifecycle-hooks.html
import Notice from '@/entity/notice';
import GridForLifeCycle from '@/components/GridForLifeCycle';
import A from '@/components/A';

export default {
  components: {
    GridForLifeCycle,
    A,
  },
  data: () => ({
    notice: {
      class: new Notice(),
    },
    // 총 게시글 배열
    items: [],
    checkedIds: [],
    // 버튼 제어
    btns: {
      search: false,
      remove: false,
    },
    // 검색 시작 날짜
    startDate: '',
    // 검색 끝 날짜
    endDate: '',
  }),
  beforeCreate() {
    console.log('beforeCreate ====');
    console.log('search 메서드 호출');
    this.search();
    console.log('data 접근 테스트 this.notice.class: ', this.notice.class);
  },
  created() {
    console.log('%cList created ===', 'color: blue');
    console.log('props 대상 items에 push');
    console.log('search axios 호출');
    // this.items.push(this.notice.class);
    //await this.search();
    this.search();
    //setTimeout(30000, 'test');
    //console.log('setTimeout');
    //this.$nextTick();
  },
  beforeMount() {
    console.log('%cList beforeMount ===', 'color: blue');
  },
  mounted() {
    console.log('%cList mounted ===', 'color: blue');
  },
  beforeUpdate() {
    console.log('%cList beforeUpdate ===', 'color: blue');
  },
  updated() {
    console.log('%cList updated ===', 'color: blue');
  },
  beforeDestroy() {
    console.log('%cList beforeDestroy ===', 'color: blue');
  },
  destroyed() {
    console.log('%cList destroyed ===', 'color: blue');
  },
  methods: {
    async search() {
      this.notice.class.startDate = this.startDate;
      this.notice.class.endDate = this.endDate;
      // default로 삭제되지 않은 값만 불러옴
      this.notice.class.delYn = 'N';
      this.btns.search = true;
      // 검색 조건 세팅
      let result = await this.axios.get('http://localhost:8080/limNotice/listGrid', {
        params: this.notice.class.param(),
      });
      console.log('search axios 결과 도착 ', result);

      console.log('props items에 대상 axios 값 세팅');
      // 리스트정보
      this.notice.class.list = result.data.data;
      // 토탈
      this.notice.class.list.totalCnt = result.data.data.length;

      console.log('자식 데이터 변경 감지.');

      // .then((result) => {
      //   console.log('search axios 도착');
      //   // 초기화
      //   // this.items = [];
      //   // let resultLeng = result.data.data.length;
      //   // // 전체 게시글 세팅
      //   // for (let i = resultLeng; i > 0; i--) {
      //   //   this.items.push(new Notice(result.data.data[resultLeng - i], i));
      //   // }
      //   this.mappingItems(result);
      //   console.log('props 대상 items axios 데이터로 변경 ===> 비동기 통신보다 자식 컴포넌트의 생성이 우선순위');
      // })
      // .catch((err) => {
      //   alert(err.message);
      // })
      // .finally(() => {
      //   this.btns.search = false;
      // });
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
