import React, { Component } from "react";

/*
  <h1> 태그 내의 중괄호 {}는 자바스크립트 코드가 아니고 JSX 문법
  props는 리액트에서 속성값을 나타내는 키워드.
 */
  class Subject extends Component {
    render() {
      console.log('Subject render');
      return (
        <header>
          <h1><a href="/">{this.props.title}</a></h1>
          {this.props.sub}
        </header>
      );
    }
  }

  export default Subject;