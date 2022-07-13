import React, {useState, useEffect} from 'react';
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
   함수에서도 props를 받을 수 있는데 this를 사용하지 않음
   첫번째 파라미터에 인자값으로 props 값을 전달하도록 약속되어 있음(다른 이름이어도 OK!)
   함수의 인자를 추가하고 그 인자를 사용해서 외부에서 전달된 initNumber 값 사용 가능
 */
var funcStyle = 'color:blue';
var funcId = 0;
function FuncComp(props) {
  // useState의 반환값은 길이가 2인 배열
  var numberState = useState(props.initNumber);
  var number = numberState[0]; // 첫번째 값은 state 값. 인자로 state의 초깃값을 지정함
  var setNumber = numberState[1]; // 두번째 값은 상태를 바꾸는 함수. 함수의 인자로 state 값을 전달.

  // var dateState = useState((new Date()).toString());
  // var _date = dateState[0];
  // var setDate = dateState[1];
  var [_date, setDate] = useState((new Date()).toString());

  // useEffect()의 두번째 인자로 빈 배열을 전달하면 componentDidMount()처럼 처음 1회는 실행되지만 그 다음부터는 더 이상 실행되지 않음
  // 이 useEffect()의 clean up 함수는 componentWillUnmount()와 같은 효과
  useEffect(function() {
    console.log('%cfunc => useEffect (componentDidMount & componentDidUpdate) '+(++funcId), funcStyle);
    document.title = number;
    return function() {
      console.log('%cfunc => useEffect return (componentDidMount & componentDidUpdate) '+(++funcId), funcStyle);
    }
  }, []);

  // 렌더링(main effect)과 상관없는 작업 = side effect
  // useEffect()라는 훅은 1) 웹 페이지가 처음으로 렌더링되었을 때, 2) 그 다음 render()가 실행될 때마다 실행
  // 클래스형 컴포넌트의 componentWillMount()나 componentDidUpdate()와 효과가 같음
  // 여러개의 useEffect()를 설치할 수도 있음
  useEffect(function() {
    console.log('%cfunc => useEffect number (componentDidMount & componentDidUpdate) '+(++funcId), funcStyle);
    document.title = number;
    /*
      render()가 호출되고 useEffect()가 다시 실행되기 전에 뭔가 정리(clean-up)하는 작업이 필요할 경우,
      반환값으로 함수를 전달하면 그 함수를 실행 (즉, 일종의 정리정돈 작업 수행 가능)
    */
    return function() {
        console.log('%cfunc => useEffect number return (componentDidMount & componentDidUpdate) '+(++funcId), funcStyle);
    }
  }, [number]); // useEffect()는 두번째 인자로 전달받은 배열의 요소 내의 값의 상태가 바뀌었을 때만 첫번째 인자인 콜백 함수가 호출되도록 되어 있음

  /*
    바뀐 값에 대한 처리만 하게 함으로써 성능을 향상시킬 수 있는 useEffect()
    clean up 함수도 마찬가지로 useEffect()의 두번째 인자로 전달된 배열의 요소에 포함된 값이 변경된 경우에만 clean up 함수 호출  
    
    useEffect()의 인자로 전달된 함수는 componentDidMount()와 componentDidUpdate()에 해당하는 타이밍에 두 번 호출됨
  */
  useEffect(function() {
    console.log('%cfunc => useEffect _date (componentDidMount & componentDidUpdate) '+(++funcId), funcStyle);
    document.title = _date;
    return function() {
      console.log('%cfunc => useEffect _date return (componentDidMount & componentDidUpdate) '+(++funcId), funcStyle);
    }
  }, [_date]);

  console.log('%cfunc => render '+(++funcId), funcStyle);
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

/*
  클래스 방식에서는 라이프사이클에 따라 원하는 타이밍에 어떤 코드를 추가하고 싶으면
  정해진 이름의 메서드를 구현해서 적당한 타이밍에 원하는 코드를 실행할 수 있음
*/
var classStyle = 'color:red';
class ClassComp extends React.Component {
  state = {
    number:this.props.initNumber,
    date:(new Date()).toString()
  }

  /*
    한 번의 렌더링 순서 : constructor() - componentWillMount() - render() - componentDidMount()  
    상태 변경시 순서 : shouldComponentUpdate() - componentWillMount() - render() - componentDidMount() 

    componentWillUnmount()는 컴포넌트가 소멸될 때 호출됨
  */
  componentWillMount() { // 리액트 17 버전 미만. 
    // 페이지가 렌더링되기 전에 해야 할 일
    // 리액트 17 이상에서는 componentWillMount()를 사용하려면 UNSAFE_componentWillMount()로 사용
    console.log('%cclass => componentWillMount', classStyle); // console.log()에서 %c를 붙이는 것은 CSS 스타일을 추가하기 위함
  }

  componentDidMount() { // 리액트 17 버전 이상
    // react를 실행하고 나서 화면에 뭔가 그려진 다음에 처리해야 할 일이 있을 때
    // UI가 다 그려진 다음에 추가로 처리해야 하거나 네트워크에서 뭔가 내려받아 어떤 일을 처리해야 하는 코드를 넣음
    console.log('%cclass => componentDidMount', classStyle);
  }

  shouldComponentUpdate(nextProps, nextState) {
    // render()를 호출하기 전에 render()가 호출될 필요가 있는지 없는지를 결정
    // true를 반환하면 render()를 호출하고, false를 반환하면 render()를 호출하지 않음
    console.log('%cclass => shouldComponentUpdate', classStyle);
    return true;
  }

  componentWillUpdate(nextProps, nextState) { // 리액트 17 버전 미만. 
    // 리액트 17 이상에서는 componentWillUpdate()를 사용하려면 UNSAFE_componentWillUpdate()로 사용
    console.log('%cclass => componentWillUpdate', classStyle);
    return true;
  }

  componentDidUpdate(nextProps, nextState) { // 리액트 17 버전 이상
    console.log('%cclass => componentDidUpdate', classStyle);
  }

  render() { 
    // state가 바뀌거나 props가 바뀔 때마다 render() 호출
    console.log('%cclass => render', classStyle);
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
