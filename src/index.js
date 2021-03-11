import React, { useState, useReducer } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

//시작 페이지
const StartPage = ()=>{
    return(
        <>
            <h1>Tetris</h1>
            <input type="text"/>
            <button>게임 시작</button>
        </>
    )
}


//테트리스 판
const GameTable = ()=>{
    
    onkeyup = (e)=>{
        e.preventDefault();
        switch (e.code){
            case 'Escape':
                return console.log("일시정지")
            case 'ArrowUp':
            case 'KeyX':{
                return console.log("시계방향 회전")}
            case 'Control':
            case 'KeyZ':{
                return console.log("반시계방향 회전")
            }
            case 'ArrowDown':
                return console.log("한칸 떨어뜨리기")
            case 'ArrowLeft':
                return console.log("왼쪽으로 한칸 이동")
            case 'ArrowRight':
                return console.log("오른쪽으로 한 칸 이동")
            default:
                break;
        }

    }

    onkeydown = (e) => {
        switch (e.code){
            case 'Space':
                console.log("하드 드롭")
                break;
            default:
                break;
        }
    }

    const gameTable = [];
    for(let i=0; i<20; i++){
        const row = [];
        for(let j=0; j<10; j++){
            row.push(<td key={[i,j].join(':')}>0</td>)
        }
        gameTable.push(<tr key={i}>{row}</tr>)
    }
    
    return (
        <>
        <h1>테트리스</h1>
        <table className='game-table'>
            <tbody>
                {gameTable}
            </tbody>
        </table>
        </>
    )
}


//게임페이지
// const Game =()=>{

// }

const App = ()=>{
       
    
    return(
        <div>
            <GameTable/>
        </div>
    )
}


ReactDOM.render(
    <App />,
    document.getElementById('root')
  );