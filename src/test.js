import ReactDOM from 'react-dom';
import React, { useState, useEffect, useReducer } from 'react';
import './index.css';


//1. useState
  //함수형 컴포넌트에서 setState 쓸 수 있게 해줌
  //useState() 함수의 파라미터에 상태의 기본값 넣기. 해당 함수가 호출되면, 배열을 반환한다. [상태값, 상태를 설정하는 함수]

const Counter = ()=>{
  const [value, setValue] = useState(0);
  return(
    <div>
      <p>
        현재 카운터 값은 <b>{value}</b>입니다.
      </p>
      <button onClick={()=>{setValue(value + 1)}}>+1</button>
      <button onClick={()=>{setValue(value - 1)}}>-1</button>
    </div>
  )
}

function reducer(state, action){
  switch(action.type){
    case 'INCREMENT' :
      return { value: state.value + 1 };
    case 'DECREMENT':
      return { value: state.value - 1 };
    default:
      return state;
  }
}

const Counter2 = ()=>{
  //useReducer의 첫번째 파라미터 : reducer 함수, 두번째 파라미터 : 해당 리듀서의 기본값
  //hook을 사용하면 state값과 dispatch 함수를 받아옴. dispatch는 액션을 발생시키는 함수.
  const [state, dispatch]=useReducer(reducer, { value: 0 });
  return(
    <div>
      <p>
        현재 카운터 값은 <b>{state.value}</b>입니다.
      </p>
      <button onClick={()=>{ dispatch({ type: 'INCREMENT' })}}>+1</button>
      <button onClick={()=>{ dispatch({ type: 'DECREMENT' })}}>-1</button>
    </div>
  )
}

const Info = ()=>{
  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');

  const onChangeName = (e)=>{
    setName(e.target.value)
  }
  const onChangeNickname = (e)=>{
    setNickname(e.target.value);
  }
  
  return(
    <div>
      <div>
        <input type="text" value={name} onChange={onChangeName}/>
        <input type="text" value={nickname} onChange={onChangeNickname}/>
      </div>
      <div>
        <b>이름 : </b> {name}
      </div>
      <div>
        <b>닉네임 : </b> {nickname}
      </div>  
      <Counter/>
    </div>
  )
}

/*
2. useEffect
   useEffect는 리액트 컴포넌트가 렌더링 될 때 마다 특정 작업을 수행하도록 설정할 수 있는 Hook
   - 만약 useEffect에서 설정한 함수가 컴포넌트 화면에 가장 처음 렌더링 될 때만 실행되고, 업데이트 할 경우에는 실행할 필요가 없으면
   두번째 파라미터로 비어있는 배열을 넣어주면 된다.
      useEffect(() => {
        //이곳에 원하는 효과를 넣고
      }, [최초 한 번만 실행시키고 싶으면 비워두기])
   
   - 특정 값이 변경될 때만 호출하게 하고 싶다면?
     useEffect(() => {
    //console.log(name)
  }, [name])

*/

function reducer2(state, action){
  return{
    ...state,
    [action.name]: action.value
  };
}



const Info3 = ()=>{
  const [state, dispatch] = useReducer(reducer2, {
    name: '',
    nickname: ''
  })
  const { name, nickname } = state;
  const onChange = e=>{
    dispatch(e.target);
  }
  
  return(
    <div>
      <div>
        <input name='name' value={name} onChange={onChange}/>
        <input name='nickname' value={nickname} onChange={onChange}/>
      </div>
      <div>
        <b>이름 : </b> {name}
      </div>
      <div>
        <b>닉네임 : </b> {nickname}
      </div>  
      <Counter/>
    </div>
  )

}





const Info2 = ()=>{
  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');

  useEffect(() => {
    console.log('렌더링이 완료되었습니다!');
    console.log({
      name
    });
    return()=>{
      console.log('cleanup');
      console.log(name);
    }
  });


  const onChangeName = (e)=>{
    setName(e.target.value)
  }
  const onChangeNickname = (e)=>{
    setNickname(e.target.value);
  }
  
  return(
    <div>
      <div>
        <input type="text" value={name} onChange={onChangeName}/>
        <input type="text" value={nickname} onChange={onChangeNickname}/>
      </div>
      <div>
        <b>이름 : </b> {name}
      </div>
      <div>
        <b>닉네임 : </b> {nickname}
      </div>  
      <Counter/>
    </div>
  )
}



ReactDOM.render(
  <Info3 />,
  document.getElementById('root')
);

