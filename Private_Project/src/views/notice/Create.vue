<template>
  <div>
    <h3 v-if="$route.name === 'Create'">공지사항 등록</h3>
    <h3 v-else-if="$route.name === 'Update'">공지사항 수정</h3>
    <br />
    <!-- max-width 주고, margin auto 하면 중앙 간다. -->
    <ul class="ul_top">
      <!-- 
          text-align 속성은 block 속성에만 가능. inline속성에는 불가.
          block 요소: <p>,  <div>, <ol>, <ul>, <table> 등
          inline 요소: <span>, <b>, <a>, <img> 등
          출처: https://blog.pages.kr/2556 [pages.kr 날으는물고기 <º))))><]

          inline속성을 블록으로 변경하여 text-align 적용.
        -->
      <span class="font span_label">언어 타입</span>
      <li>
        <select class="common li_gray font" v-model="notice.class.languageType">
          <option value="" selected>선택해주세요</option>
          <option value="NONE">NONE</option>
          <option value="KR">KR</option>
          <option value="EN">EN</option>
          <option value="RU">RU</option>
          <option value="ES">ES</option>
          <option value="AR">AR</option>
        </select>
      </li>
      <span class="font span_label">구매자 및 판매자</span>
      <li>
        <select class="common li_gray font" v-model="notice.class.dealerType">
          <option value="" selected>선택해주세요</option>
          <option value="NONE">NONE</option>
          <option value="BUYER">BUYER</option>
          <option value="SELLER">SELLER</option>
        </select>
      </li>
      <span class="font span_label">제목</span>
      <li><input class="common li_white" v-model="notice.class.title" placeholder="제목을 입력해주세요.(50자 이내)" /></li>
      <span class="font span_label">내용</span>
      <li class="common">
        <textarea class="common font textarea_design" v-model="notice.class.content" placeholder="내용을 입력해주세요."></textarea>
        <span class="textarea_label">{{ notice.class.content.length }}/2,000자</span>
      </li>
      <span class="font span_label">파일</span>
      <li>
        <input class="common li_white" style="padding-top: 10px" type="file" multiple @change="onFileChange" />
      </li>
      <div v-for="(file, index) in notice.class.files" :key="index">
        <a style="font-color: black" :href="getFilePath(file.path)">{{ file.fileName }}.{{ file.extension }} </a> &nbsp;<strong style="cursor: pointer" @click="fileRemove(file.fileId)"
          >&nbsp;(X) 삭제 불가(File Sort 문제)</strong
        >
      </div>
      <li v-if="$route.name === 'Create'" style="display: flex">
        <button class="font_btn btn_insert" style="background-color: blue" @click="create">등록</button
        ><button class="font_btn btn_insert" style="background-color: green" @click="pageBind('List')">목록</button>
      </li>
      <li v-else-if="$route.name === 'Update'" style="display: flex">
        <button class="font_btn btn_insert" style="background-color: blue" @click="update">수정</button
        ><button class="font_btn btn_insert" style="background-color: green" @click="pageBind('List')">목록</button
        ><button class="font_btn btn_insert" style="background-color: green" @click="pageBind('Info', notificationId)">취소</button>
      </li>
    </ul>
  </div>
</template>

<script>
import Notice from '@/entity/notice';

export default {
  props: {
    notificationId: {
      type: [Number, String],
      required: false,
      default: '',
    },
  },
  data: () => ({
    notice: {
      class: new Notice(),
    },
    files: [],
    btns: {
      create: false,
      update: false,
    },
  }),
  created() {
    if (this.$route.name === 'Update') {
      this.search();
    }
  },
  // mounted() {
  //   if (this.$route.name === 'Update') {
  //     this.search();
  //   }
  // },
  methods: {
    search: function () {
      this.axios
        .get('http://localhost:8080/limNotice/info', { params: { notificationId: this.notificationId } })
        .then((result) => {
          this.notice.class = new Notice(result.data);
          console.log(this.notice.class);
        })
        .catch((err) => {
          alert(err.message);
        })
        .finally();
    },
    create: function () {
      this.btns.create = true;
      this.axios
        .post('http://localhost:8080/limNotice/insert', this.notice.class.form())
        .then((result) => {
          console.log(result);
          this.pageBind('List');
        })
        .catch((err) => {
          alert(err.message);
        })
        .finally(() => {
          this.btns.create = false;
        });
    },
    update: function () {
      this.axios
        .put('http://localhost:8080/limNotice/update', this.notice.class.updateForm())
        .then((result) => {
          console.log(result);
          this.pageBind('Info', this.notificationId);
        })
        .catch((err) => {
          alert(err.message);
        })
        .finally(() => {
          this.btns.create = false;
        });
    },
    // buyer 프로젝트로부터 가져옴...
    // 파일 처리 메서드들 [s]
    onFileChange: function (e) {
      const files = e.target.files;
      console.log('e.target.files: ', files);
      if (!files.length) return;

      for (var i = 0; i < files.length; i++) {
        this.fileBind(files[i], i);
      }
    },
    fileBind: async function (f, i) {
      // console.log('fileBind' );
      let formData = new FormData();
      formData.append('files', f);
      // formData.append('path', 'home/limda/buyer/bankSlip');
      formData.append('path', 'buyer/bankSlip');

      this.axios
        .post('http://localhost:8080/file/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((result) => {
          if (result.status === 200) {
            console.log('fileBind 리턴값 result.data.data: ', result.data.data);
            let fileObj = {
              fileBusinessType: 'NORMAL',
              fileId: result.data.data[0].fileId,
              sort: i,
            };
            this.notice.class.files.push(fileObj);
            console.log(this.notice.class.files);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getFilePath: function (filePath) {
      return `http://localhost:8080${filePath}`;
    },
    // File 삭제의 경우 FileSort 테이블을 바라보는데, 현재 공지사항은 NoticeFileSort를 바라봄에 따라 삭제처리가 되지 않는다.
    fileRemove: function (fileId) {
      this.axios
        .delete(`http://localhost:8080/file/delete/${fileId}`)
        .then((result) => {
          console.log(result);
        })
        .catch((err) => {
          alert(err.message);
        })
        .finally();
    },
    // 파일 처리 메서드들 [e]
    pageBind: function (val, id) {
      this.$router.push({
        name: val,
        params: {
          notificationId: id,
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
* {
  margin: 0px;
  padding: 0px;
}

.font {
  font-family: NotoSansKR;
  font-size: 14px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: 0.04px;
  text-align: left;
  color: #000000;
}

.font_btn {
  font-family: NotoSansKR;
  font-size: 16px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.38;
  letter-spacing: normal;
  text-align: center;
  color: #ffffff;
}

li {
  margin-bottom: 20px;
  list-style: none;
}

li:last-child {
  margin-bottom: 0px;
}

.common {
  border-radius: 4px;
  border: solid 1px #dddddd;
}

.span_label {
  height: 20px;
  display: block;
  line-height: 2.14;
  margin-bottom: 7px;
  padding-left: 2px;
}

.ul_top {
  text-align: center;
  // max-width: 720px;
  margin: auto;
}

.li_gray {
  height: 50px;
  background-color: transparent;
  width: 100%;
  padding-left: 13px;
}

.li_white {
  height: 50px;
  width: 100%;
  padding-left: 13px;
}

.li_textarea {
  height: 239px;
  width: 100%;
}

.textarea_label {
  display: block;
  height: 19px;
  font-family: NotoSansKR;
  font-size: 13px;
  font-weight: 300;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.54;
  letter-spacing: 0.04px;
  text-align: left;
  padding-left: 13px;
  color: #000000;
}

.textarea_design {
  height: 150px;
  width: 100%;
  // padding-left: 13px;
  padding-top: 14px;
  border: none;
}

.btn_insert {
  width: 100%;
  height: 50px;
  // background-color: #0099ff;
  color: white;
  border-radius: 6px;
}
</style>
