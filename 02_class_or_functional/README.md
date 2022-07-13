# 리액트 클래스 스타일 vs 함수 스타일

- 리액트의 최신 기능인 훅 : 함수형 스타일과 클래스 스타일을 대등하게 비교할 수 있게 함
  - 과거에 함수형 스타일에서는 state 값을 가질 수 없었고, 컴포넌트의 라이프사이클과 관련된 작업을 처리할 수 없었음
  - 하지만 훅이 등장하면서 함수형에서도 state를 처리할 수 있게 됐고, 이런 식으로 라이플 사이클을 관리할 수 있게 됨
  - 리액트 16.8 버전부터 훅이라는 기능이 도입됨

- <b>Hook</b>
  - 이름이 'use'로 시작함
    - 리액트에서 제공하는 훅의 이름은 useState (페이스북에서 제공하는 내장된 훅)

- <b>리액트의 라이프사이클</b>
  - 컴포넌트가 생성되면 componentWillMount()를 리액트가 호출
    - 컴포넌트가 생성되기 전에 처리해야 할 일이 있다면 componentWillMount() 구현
    - 컴포넌트가 생성되기 직전에(=어떤 컴포넌트가 mount되기 전에=어떤 컴포넌트가 화면에 그려지기 전에=render()가 호출되기 전에) 
  - 한 번의 렌더링 순서 
    - constructor() - componentWillMount() - render() - componentDidMount()
  - 상태 변경시 순서 
    - shouldComponentUpdate() - componentWillMount() - render() - componentDidMount()
  - 컴포넌트가 처음으로 DOM이 나타나는 순간에 수행해야 할 초기 작업 : componentWillMount(), componentDidMount()
  - 컴포넌트가 퇴장할 때나 소멸할 때 뒤처리 작업을 해야 하는 경우 : componentWillUnmount()

