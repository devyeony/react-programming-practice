import React, { Component } from "react";

/*
  컴포넌트 안에서 외부에서 전달된 props의 값을 바꾸는 것은 금지되어 있음
  props는 read only.(컴포넌트 밖에서는 props 바꿀 수 있음(App.js 참고))
*/
class ReadContent extends Component {
    render() {
      console.log('ReadContent render');
      return (
        <article>
          <h2>{this.props.title}</h2>
          {this.props.desc}
        </article>
      )
    }
  }

  export default ReadContent;