export default class Notice {
  constructor(result, i) {
    const _data = result || {};

    // 게시글 순서
    this.no = i || -1;
    this.list = _data.list || [];
    // 공지사항 아이디
    this.notificationId = _data.notificationId || -1;
    // 제목
    this.title = _data.title || '';
    // 작성자
    this.regUser = _data.regUser || '익명의 작성자';
    // 작성 날짜
    this.regDate = this.longToDateTime(_data.regDate) || '';
    // 수정 날짜
    this.updDate = this.longToDateTime(_data.updDate) || '';
    // 조회수
    this.viewCount = _data.viewCount || 0;
    // 내용
    this.content = _data.content || '';
    // 언어 타입
    this.languageType = _data.languageType || '';
    // 구매자 또는 판매자
    this.dealerType = _data.dealerType || '';
    // 생성 파라미터
    this.files = _data.files || [];

    // 검색 파라미터
    this.searchType = '';
    this.searchKeyword = '';
    this.startDate = '';
    this.endDate = '';
    this.delYn = '';
    this.useYn = '';
  }

  // 참조: https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Date/getDate
  longToDateTime(val) {
    if (val === '' || val === 0) {
      return '-';
    }

    // let nowTime = Date.now();
    let dateTime = new Date(val);
    return (
      dateTime.getFullYear() +
      '-' +
      (dateTime.getMonth() / 10 >= 1 ? dateTime.getMonth() : '0' + dateTime.getMonth()) +
      '-' +
      (dateTime.getDate() / 10 >= 1 ? dateTime.getDate() : '0' + dateTime.getDate()) +
      ' ' +
      (dateTime.getHours() / 10 >= 1 ? dateTime.getHours() : '0' + dateTime.getHours()) +
      ':' +
      (dateTime.getMinutes() / 10 >= 1 ? dateTime.getMinutes() : '0' + dateTime.getMinutes()) +
      ':' +
      (dateTime.getSeconds() / 10 >= 1 ? dateTime.getSeconds() : '0' + dateTime.getSeconds())
    );
    // return dateTime.getFullYear() + '-' + dateTime.getMonth() + '-' + dateTime.getDate() + ' ' + dateTime.getHours() + ':' + dateTime.getMinutes() + ':' + dateTime.getSeconds();
  }

  dateToLong(val) {
    if (val === '' || val === 0) {
      return 0;
    }
    let date = new Date(val);
    return date.getTime();
  }

  // search
  param() {
    return {
      searchType: this.searchType,
      searchKeyword: this.searchKeyword,
      dealerType: this.dealerType,
      languageType: this.languageType,
      // startDate: this.dateToLong(this.startDate),
      startDate: 1511549192000,
      // endDate: this.dateToLong(this.endDate),
      endDate: 1711549192000,
      delYn: this.delYn,
      useYn: this.useYn,
    };
  }

  // create
  form() {
    return {
      title: this.title,
      content: this.content,
      dealerType: this.dealerType,
      files: this.files,
      languageType: this.languageType,
    };
  }

  // update
  updateForm() {
    return {
      notificationId: this.notificationId,
      title: this.title,
      content: this.content,
      dealerType: this.dealerType,
      files: this.files,
      languageType: this.languageType,
    };
  }
}
