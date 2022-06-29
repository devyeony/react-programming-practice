import React, { Component } from 'react';
import TOC from './components/TOC';
import ReadContent from './components/ReadContent';
import CreateContent from './components/CreateContent';
import UpdateContent from './components/UpdateContent';
import Subject from './components/Subject';
import Control from './components/Control';
import './App.css';

/*
  render()는 함수. 
  우리가 알고 있는 일반적인 함수는 앞에 function 키워드가 붙지만
  자바스크립트의 최신 스펙에 들어있는 클래스 문법은 소속되는 함수의 function 키워드를 생략함.

  이 코드는 자바스크립트와 거의 비슷하지만, 자바스크립트는 아님.
  자바스크립트에서 태그를 작성할 때는 따옴표를 자바스크립트 상에 표현하기 위한 문법이 까다로움.
  -> 이 코드는 페이스북에서 만든 JSX(Javascript XML)라는 언어를 이용해 작성한 것
     JSX로 코드를 작성하면 Create React App이 알아서 자바스크립트 코드로 변환해줌
*/
class App extends Component {

  /*
    render()보다 먼저 실행되면서 해당 컴포넌트를 초기화하고 싶은 코드는
    constructor()에 작성함 
    
    리액트에서는 props나 state의 값이 바뀌면 그것을 가지고 있는 render()가 다시 호출됨
    render()가 다시 호출되면서 하위 컴포넌트들의 render() 또한 함께 호출되어 화면이 다시 그려짐
    render()는 어떤 HTML을 그릴지 결정하는 함수!

    App 컴포넌트가 생성될 때 최초로 실행되는 constructor()에서는 this.state를 직접 지정해주면 됨
    하지만 이미 컴포넌트가 생성된 다음에 동적으로 state 값을 바꿀 때는 this.state 값을 직접 수정X
    이 경우 직접 수정하게 되면 this.state 값은 바뀌지만 리액트가 이를 알아채지 못해서 렌더링 할 수 없음
    따라서 this.setState()를 사용하여 수정하도록 한다!
 */
  constructor(props) {
    super(props);
    /*
      props는 읽기 전용이므로 컴포넌트 내에서 변경 불가(컴포넌트 밖에서는 지정 가능)
      state는 컴포넌트 내부적으로 사용함

      Redux가 아닌 순수한 리액트에서
      상위 컴포넌트가 하위 컴포넌트에게 명령할 때는 props를 이용
      하위 컴포넌트가 상위 컴포넌트에게 명령할 때는 props 값을 바꿀 수 없으므로 이벤트를 씀
    */
    this.max_content_id = 3; // UI에 영향을 주지 않는 값이 state에 들어가면 불필요한 렌더링이 발생할 수 있음.
    this.state = {
      mode: 'read',
      selected_content_id: 2,
      subject: {title: 'WEB', sub: 'World Wide Web!'},
      welcome: {title: 'Welcome', desc: 'Hello, React!!'},
      contents:[
        {id:1, title:'HTML', desc:'Html is for information'},
        {id:2, title:'CSS', desc:'CSS is for design'},
        {id:3, title:'JavaScript', desc:'JavaScript is for interactive'}
      ]
    }
  }

  getReadContent() {
    var i = 0;
    while(i < this.state.contents.length) {
      var data = this.state.contents[i];
      if(data.id === this.state.selected_content_id) {
        return data;
      }
      i = i + 1;
    }
  }

  getContent() {
    var _title, _desc, _article = null;
    if(this.state.mode === 'welcome') {
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
      _article = <ReadContent title={_title} desc={_desc} />
    } else if(this.state.mode === 'read') {
      var _content = this.getReadContent();
      _article = <ReadContent title={_content.title} desc={_content.desc} />
    } else if(this.state.mode === 'create') {
      _article = <CreateContent onSubmit={function(_title, _desc) {
        this.max_content_id = this.max_content_id + 1;

        /*
          배열에서 push()는 원본 변경, concat()은 원본 변경 없이 새로운 배열 반환
          Array.from -> 배열 복사
          Object.assign -> 객체 복사
          참고) 객체 불변성 관련 라이브러리 : immutable.js
        */
        // var _contents = this.state.contents.push(
        //   {id: this.max_content_id, title: _title, desc: _desc}
        // );
        // var _contents = this.state.contents.concat(
        //   {id: this.max_content_id, title: _title, desc: _desc}
        // );
        var _contents = Array.from(this.state.contents);
        _contents.push({id: this.max_content_id, title: _title, desc: _desc});
        this.setState({
          contents: _contents
        });
        console.log(_title, _desc);
      }.bind(this)} />
    } else if(this.state.mode === 'update') {
      var _content = this.getReadContent();
      _article = <UpdateContent data={_content} onSubmit = {function(_title, _desc) {
        this.max_content_id = this.max_content_id + 1;
        var _contents = this.state.contents.concat(
          {id: this.max_content_id, title: _title, desc: _desc}
        );
        this.setState({
          contents: _contents
        });
        console.log(_title, _desc);
      }.bind(this)} />
    }
    return _article;
  }

  /*
    render() 내에서는 this는 컴포넌트를 가리킴. 하지만 이벤트 처리 함수 내의 this는 undefinded
    - 자바스크립트에서 this는 함수 호출 방식에 의해 결정되기 때문
    - 일반적으로 자바스크립트에서 this는 window 객체가 됨(노드에서는 global)
    - 즉, 자바스크립트에서 this는 해당 함수를 호출한 측임
    - strict mode에서는 함수 내의 this에 window 객체를 디폴트로 바인딩해주지 않으므로 bind()로 직접 지정해주지 않으면 this는 undefined가 됨
    이렇게 this 값이 없을 때는 bind()로 this를 주입해줘야 함. 
    관련 리액트 문서 : https://ko.reactjs.org/docs/handling-events.html
  */
  render() {
    console.log('App render');

    return (
      /*
        컴포넌트를 만들 때는 반드시 하나의 최상위 태그로 시작해야 함.
        여기서는 <div>가 최상위 태그.
        반드시 하나의 태그만 리턴할 수 있음!
      */
      <div className="App">

        <Subject 
          title={this.state.subject.title} 
          sub={this.state.subject.sub}
          onChangePage={function() {
            this.setState({mode:'welcome'});
          }.bind(this)}/>

        <TOC
          /* 
            상위 컴포넌트인 App의 상태를 TOC라는 컴포넌트의 props 값으로 지정
            상위 컴포넌트인 App의 상태를 하위 컴포넌트인 TOC의 props 값으로 전달 가능
          */
          onChangePage={function(id) {
            this.setState({
              mode:'read',
              selected_content_id: Number(id)
            });
          }.bind(this)} 
          data={this.state.contents} />

        <Control onChangeMode={function(_mode) {
          this.setState({
            mode: _mode
          });
        }.bind(this)} />

        {this.getContent()}

      </div>
    );
  }
}

export default App;
