<template>
  <div>
    <h2>라이프 사이클의 이해</h2>
    <p>
      main.js파일, console창 <a href="https://kr.vuejs.org/v2/guide/instance.html#Vue-%EC%9D%B8%EC%8A%A4%ED%84%B4%EC%8A%A4-%EB%A7%8C%EB%93%A4%EA%B8%B0">document-Vue 인스턴스</a> 항목를 함께 보면
      이해에 도움이 됩니다.
    </p>
    <div style="display: flex">
      <img src="@/assets/lifecycle.png" style="height: 1000px; margin-right: 15px" />
      <div style="text-align: left">
        <p>1. Vue 인스턴스 - Vue는 루트에 해당하는 new Vue() 인스턴스(객체로 생각)를 생성하면서 시작한다. (참조: main.js)</p>
        <p>2. new Vue() ~ beforeCreate: Vue 루트는 시작하기 앞서 이벤트와 라이프 사이클을 생성하고, 생성한 라이프 사이클(생명주기)에 따라 생성되고 소멸한다.</p>
        <p>3. beforeCreate ~ created: 옵션값들 중 provide/inject(반응형 지원x), data영역(반응형)을 생성한다.</p>
        <p>- data영역 콘솔확인 가능 provide/inject는 테스트 필요</p>
        <br />
        <br />
        <p>4. created ~ beforeMount : el ~ template 옵션 값 유무 확인에 따른 렌더링 방식을 보여준다. main.js에 일부러 el을 선언한 방식으로 변경, template 옵션 선언을 주석으로 해둠</p>
        <p>- 현재 $el값: undefined</p>
        <br />
        <br />
        <br />
        <br />
        <p>5. beforeMount ~ mounted : $el을 생성하고 그에 해당하는 템플릿으로 mount를 한다.</p>
        <p>- 현재 $el값: &#60;div id='app'&#62;&#60;/div&#62;</p>
        <br />
        <p>6. mounted ~ : $el에 해당 템플릿이 mount 되어 그것을 확인 할 수 있다.</p>
        <p>- 현재 $el값: div#app</p>
        <br />
        <p>7. beforeUpdate ~ updated : 데이터의 변경이 생기면(리터럴 객체의 주소값) 데이터 감지를 하여 재 랜더링을 하게 된다.</p>
        <p>- 참조: 라이프 사이클 구동 메뉴 console</p>
        <br />
        <br />
        <p>8. beforeDestroy ~ destroyed ~ : 컴포넌트가 제거(변경) 되려 할 때 호출 된다. 일반적으로 선언된 이벤트를 없애는 시점에 사용 된다.</p>
        <p>- 참조: 라이프 사이클 구동 메뉴 -> 다른 메뉴로 이동 console</p>
      </div>
    </div>
    <hr />
    <br />
    <div style="display: flex">
      <img src="@/assets/parent_child.png" style="width: 400px; margin-right: 15px" />
      <div style="text-align: left">
        <br />
        <p>해당 그림은 부모-자식간 관계에서 라이프사이클이 어떤식으로 실행 되는지 보여주는 그림이다.</p>
        <p>- 참조: 라이프 사이클 구동 메뉴 console</p>
      </div>
    </div>
  </div>
</template>
