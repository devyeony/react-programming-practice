import React, { Component } from "react";

class UpdateContent extends Component {
    constructor(props) {
      super(props);
      this.state = {
        id: this.props.data.id,
        title: this.props.data.title,
        desc: this.props.data.desc
      };
      this.inputFormHandler = this.inputFormHandler.bind(this);
    }

    inputFormHandler(e) {
      // 대괄호를 사용하면 객체에서 대괄호 내의 값을 프로퍼티로 사용할 수 있음(자바스크립트 최신 문법)
      this.setState({[e.target.name]: e.target.value})
    }

    render() {
      console.log(this.props.data)
      console.log('UpdateContent render');
      return (
        <article>
          <h2>Update</h2>
          <form action="/update_process" method="post"
            onSubmit={function(e) {
              e.preventDefault();
              this.props.onSubmit(
                this.state.id,
                this.state.title,
                this.state.desc
              );
            }.bind(this)}>
            <input type="hidden" name="id" value={this.state.id} />
            <p>
              <input 
                type="text" 
                name="title" 
                placeholder="title"
                value={this.state.title} 
                // props 값을 직접 value에 넣으면 읽기 전용이 됨
                // 가변적 데이터는 state에 들어가도록 함
                onChange={this.inputFormHandler} />
            </p>
            <p>
              <textarea 
                name="desc" 
                placeholder="description" 
                value={this.state.desc}
                // 리액트는 <textarea> 태그 내에 값을 넣는 것을 허용하지 않음
                onChange={this.inputFormHandler} />
            </p>
            <p>
              <input type="submit" />
            </p>
          </form>
        </article>
      )
    }
  }

  export default UpdateContent;