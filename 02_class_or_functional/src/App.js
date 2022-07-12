import React, {useState} from 'react';
import './App.css';

function App() {
  return (
    <div className="container">
      <h1>Hello World</h1>
      <FuncComp initNumber={2} />
      <ClassComp initNumber={2} />
    </div>
  );
}

/**
 * 함수에서도 props를 받을 수 있는데 this를 사용하지 않음
 * 첫번째 파라미터에 인자값으로 props 값을 전달하도록 약속되어 있음(다른 이름이어도 OK!)
 * 함수의 인자를 추가하고 그 인자를 사용해서 외부에서 전달된 initNumber 값 사용 가능
 */
function FuncComp(props) {
  // useState의 반환값은 길이가 2인 배열
  var numberState = useState(props.initNumber);
  var number = numberState[0]; // 첫번째 값은 state 값. 인자로 state의 초깃값을 지정함
  var setNumber = numberState[1]; // 두번째 값은 상태를 바꾸는 함수. 함수의 인자로 state 값을 전달.
  console.log('numberState', numberState);

  // var dateState = useState((new Date()).toString());
  // var _date = dateState[0];
  // var setDate = dateState[1];
  var [_date, setDate] = useState((new Date()).toString());

  return (
    <div className="container">
      <h2>function style component</h2>
      <p>Number : {number}</p>
      <p>Date : {_date}</p>
      <input type="button" value="random" onClick={
        function () {
          setNumber(Math.random())
        }
      } />
      <input type="button" value="date" onClick={
        function () {
          setDate((new Date()).toString());
        }
      } />
    </div>
  )
}

class ClassComp extends React.Component {
  state = {
    number:this.props.initNumber,
    date:(new Date()).toString()
  }
  render() {
    return (
      <div className="container">
        <h2>class style component</h2>
        <p>Number : {this.state.number}</p>
        <p>Date : {this.state.date}</p>
        <input type="button" value="random" onClick={
          function() {
            this.setState({number:Math.random()});
          }.bind(this)
        } />
        <input type="button" value="date" onClick={
          function() {
            this.setState({date:(new Date()).toString()});
          }.bind(this)
        } />
      </div>
    );
  }
}

export default App;
