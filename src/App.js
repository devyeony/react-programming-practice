import React, { Component } from 'react';
import TOC from './components/TOC';
import Content from './components/Content';
import Subject from './components/Subject';
import './App.css';

/*
  render()보다 먼저 실행되면서 해당 컴포넌트를 초기화하고 싶은 코드는
  constructor()에 작성함 
 */

/*
  render()는 함수. 
  우리가 알고 있는 일반적인 함수는 앞에 function 키워드가 붙지만
  자바스크립트의 최신 스펙에 들어있는 클래스 문법은 소속되는 함수의 function 키워드를 생략함.

  컴포넌트를 만들 때는 반드시 하나의 최상위 태그로 시작해야 함.
  여기서는 <div>가 최상위 태그.
  반드시 하나의 태그만 리턴할 수 있음!

  이 코드는 자바스크립트와 거의 비슷하지만, 자바스크립트는 아님.
  자바스크립트에서 태그를 작성할 때는 따옴표를 자바스크립트 상에 표현하기 위한 문법이 까다로움.
  -> 이 코드는 페이스북에서 만든 JSX(Javascript XML)라는 언어를 이용해 작성한 것
     JSX로 코드를 작성하면 Create React App이 알아서 자바스크립트 코드로 변환해줌
*/
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subject: {title: 'WEB', sub: 'World Wide Web!'}
    }
  }
  render() {
    return (
      <div className="App">
        <Subject 
          title={this.state.subject.title} 
          sub={this.state.subject.sub}/>
        <TOC/>
        <Content title="HTML" desc="HTML is HyperText Markup Language."/>
      </div>
    );
  }
}

export default App;
