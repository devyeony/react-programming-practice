import React, { Component } from "react"

/*
  a 태그에 data-id라는 속성을 추가하고 id 값 할당
  onClick 이벤트 함수의 인자로 전달된 e 객체를 사용해 id 값을 구해 onChangePage 함수 호출
  이벤트 객체 내 e.target 속성은 이벤트가 발생한 태그(<a> 태그)를 가리킴
  data-id -> 'data-'라는 접두사로 시작되는 속성은 dataset이라는 특수한 객체를 통해 접근 가능

  data-id 속성을 이용하지 않고 bind()의 두번째 인자를 사용할 수 있음
  bind()의 두번째 인자로 data[i].id 값을 지정하면
  bind 호출의 대상이 되는 함수의 첫번째 인자로 data[i].id 값이 전달됨
  (나머지 인자는 한칸씩 뒤로 밀리게 됨)
*/
class TOC extends Component {
    render() {
      console.log('TOC render');
      var lists = [];
      var data = this.props.data;
      var i = 0;
      while(i < data.length) {
        lists.push(
          <li key={data[i].id}>
            <a 
              href={"/content/" + data[i].id}
              data-id={data[i].id}
              // onClick={function(e) {
              //   e.preventDefault();
              //   this.props.onChangePage(e.target.dataset.id);
              // }.bind(this)}
              onClick={function(id, e) {
                e.preventDefault();
                this.props.onChangePage(id);
              }.bind(this, data[i].id)}
            >{data[i].title}</a></li>);
        i = i + 1;
      }
      return (
        <nav>
          <ul>
            {lists}
          </ul>
        </nav>
      )
    }
  }

  export default TOC;