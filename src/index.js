import React, { useState, useEffect } from 'react';
import ReactDOM, { render } from 'react-dom';
import './index.css';

const background = [];
for(let i=0; i<20; i++){
    const row = [];
    for(let j=0; j<10; j++){           
            row.push("")
    }
    background.push(row)
}

for(let i=15; i<20; i++){
    const row = [];
    for(let j=0; j<10; j++){           
        if(j!=0) {
            background[i][j] = "O";
        }
    }
}



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

const TETROMINOS = [
    {
        name: 'O',
        color: 'yellow',
        shape: [
            [
                ["", "", ""],
                ["", 'O', 'O'],
                ["", 'O', 'O']
            ],
            [
                ["", "", ""],
                ["", 'O', 'O'],
                ["", 'O', 'O']
            ],
            [
                ["", "", ""],
                ["", 'O', 'O'],
                ["", 'O', 'O']
            ],
            [
                ['', '', ''],
                ['', 'O', 'O'],
                ['', 'O', 'O']
            ]
        ]
    },
    {
        name: 'I',
        color: 'cyan',
        shape: [
            [
                ['', '', '', ''],
                ['I','I','I','I'],
                ['', '', '', ''],
                ['', '', '', '']
            ],
            [
                ['', 'I', '', ''],
                ['', 'I', '', ''],
                ['', 'I', '', ''],
                ['', 'I','', '']
            ],
            [
                ['', '', '', ''],
                ['I','I','I','I'],
                ['', '', '', ''],
                ['', '', '', '']
            ],
            [
                ['', '', 'I', ''],
                ['', '', 'I', ''],
                ['', '', 'I', ''],
                ['', '', 'I', '']
            ],
        ]
    },
    {
        name: 'T',
        color: 'purple',
        shape: [
            [
                ['', '', ''],
                ['', 'T', ''],
                ['T','T','T']
            ],
            [
                ['', 'T', ''],
                ['', 'T', 'T'],
                ['', 'T', '']
            ],
            [
                ['', '', ''],
                ['T','T','T'],
                ['', 'T', '']
            ],
            [
                ['', 'T', ''],
                ['T','T', ''],
                ['', 'T', '']
            ]
        ]
    },
    {
        name: 'J',
        color: 'blue',
        shape: [
            [
                ['', '', ''],
                ['J', '', ''],
                ['J', 'J', 'J']
            ],
            [
                ['', 'J', 'J'],
                ['', 'J', ''],
                ['', 'J', '']
            ],
            [
                ['', '', ''],
                ['J','J','J'],
                ['', '', 'J']
            ],
            [
                ['', 'J', ''],
                ['', 'J', ''],
                ['J', 'J', '']
            ]
        ]
    },
    {
        name: 'L',
        color: 'orange',
        shape: [
            [
                ['', '', ''],
                ['L','L','L'],
                ['L', '', '']
            ],
            [
                ['L','L', ''],
                ['', 'L', ''],
                ['', 'L', '']
            ],
            [
                ['', '', 'L'],
                ['L','L','L'],
                ['', '', '']
            ],
            [
                ['', 'L', ''],
                ['', 'L', ''],
                ['', 'L','L']
            ]
        ]
    },
    {
        name:'S',
        color: 'green',
        shape: [
            [
                ['', '', ''],
                ['','S','S'],
                ['S','S', '']
            ],
            [
                ['S', '', ''],
                ['S','S', ''],
                ['', 'S', '']
            ],
            [
                ['','S','S'],
                ['S','S', ''],
                ['', '', '']
            ],
            [
                ['', 'S', ''],
                ['', 'S','S'],
                ['', '', 'S']
            ]
        ]
    },
    {
        name: 'Z',
        color: 'red',
        shape: [
            [
                ['', '', ''],
                ['Z','Z', ''],
                ['', 'Z', 'Z']
            ],
            [
                ['',  'Z', ''],
                ['Z','Z', ''],
                ['Z', '', '']
            ],
            [
                ['Z','Z', ''],
                ['', 'Z', 'Z'],
                ['', '', '']
            ],
            [
                ['', '', 'Z'],
                ['','Z','Z'],
                ['','Z', '']
            ]
        ]
    },
];

const randomTetromino = ()=>{
    const ranT = [
                    TETROMINOS[0],
                    TETROMINOS[1],
                    TETROMINOS[2],
                    TETROMINOS[3],
                    TETROMINOS[4],
                    TETROMINOS[5],
                    TETROMINOS[6]
                ]

    const shuffleArray = array => {
        for (let i = 0; i < array.length; i++) {
            let j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };

    const suffledRanT = shuffleArray(ranT);
    return suffledRanT;
}


//테트리스 판
const GameTable = (props)=>{


    const [blocks, setBlocks] = useState([]);
    const [fg, setFg] = useState()
    const [bg, setBg] = useState(background)
    const [count, setCount] = useState({esc: 0, up: 0, left: 0, right: 0, down: 0, space: 0})
    
    
    const onKeyUp = React.useCallback((e)=>{
        e.preventDefault();

        switch (e.code){
            case 'Escape':
                setCount(count=>{
                    let c = count.esc+1
                    console.log('Escape',c%2);
                    return ({...count, esc: c%2})
                });
                break;
            case 'ArrowUp':
            case 'KeyX':{
                setCount(count=>{
                    console.log(count.up,'=>',(count.up+1)%4);
                    return ({...count, up: (count.up+1)%4})
                }) ;               
                console.log("시계방향 회전")}
                break;
            case 'ControlLeft':
            case 'KeyZ':{
                setCount(count=>{
                    return({...count, ctrl: (count.ctrl+1)%4})
                })
                return console.log("반시계방향 회전")
            }

            case 'ArrowDown':
                setCount(count=>{
                    let c = count.down+1;
                    return ({...count, down: c});
                })
                break;

            case 'ArrowLeft':
                setCount(count=>{
                    let c = count.left+1;
                    return ({...count, left: c})
                })
                break;
            case 'ArrowRight':
                setCount(count=>{
                    let c = count.right+1;
                    return ({...count, right: c})
                })
                break;
            
            case 'Space':
                setCount(count=>{
                    return({...count, space: 1})
                });
                break;
            
            default:
                break;
        }
    },[]);


    const newBlock = ()=>{
        if(blocks.length != 1){
            const block = blocks.shift();
            setFg({ currentBlock: block.shape, name:block.name, color: block.color, x: 3, y: -1 });
        }
        else{
            const ranT= randomTetromino().filter(element => element.name!=blocks[blocks.length-1].name);
            ranT.unshift(blocks[blocks.length-1])
            const block = ranT.shift();
            setBlocks(ranT);
            setFg({ currentBlock: block.shape, name:block.name, color: block.color, x: 3, y: -1 })
        }
    }

    const draw = (x, y, bg, fg)=>{
        const result = [];


        //쌓인거 불러오기 (전체 게임 보드)
        for(let i=0; i<20; i++){
            for(let j=0; j<10; j++){
                result[j+10*i] = bg[i][j]
            }
        }

        for(let i=0; i<fg.length; i++){
            for(let j=0; j<fg.length; j++){
                if(fg[i][j]!=''){
                    result[x+10*y+(j+10*i)] = fg[i][j]
                }
            }
        }
    
        return result
    }

    //bg 에 픽스하기
    const fixBg = (bg,fg)=>{
        console.log("fixBg")
        for(let i=0; i<fg.currentBlock[count.up].length; i++){
            for(let j=0; j<fg.currentBlock[count.up].length; j++){
                if(fg.currentBlock[count.up][i][j]!=0){
                    bg[fg.y+i][fg.x+j] = fg.currentBlock[count.up][i][j];
                }
            }
        }
        return bg;
    }


    // 한 칸씩 떨어뜨리기
    const drop = (fg, bg) => {
        let b = fg.currentBlock[count.up]
        let bgY = fg.y+fg.currentBlock.length-1;

        for(let i=0; i<b.length; i++){
            for(let j=0; j<b.length; j++){
                if((b[i][j] != '' && bgY+(i-2)==20)||(b[i][j]!='' && bg[bgY+(i-2)][fg.x+j] != "")){
                    setBg(bg=>fixBg(bg,fg))
                    newBlock();
                    setCount(count=>({...count, up: 0}))
                    return;
                }
            }
        }

        let tmp=fg.y+1;
        setFg((fg)=>({...fg, y:tmp}))
    }

    const clearRow = (bg)=>{
        for(let i=19; i>=0; i--){
            const isFull = bg[i].every(element => element !== "");
            if(isFull){
                bg[i] = [0,0,0,0,0,0,0,0,0,0];

            }
        }
        return bg;
    }

    //한 줄 다 차면 삭제시키고 점수올리기
    const deleteRow = (bg)=>{
        
        //다 찬 줄 0으로 만들고
        for(let i=19; i>=0; i--){
            const isFull = bg[i].every(element => element !== "");
            if(isFull){
                bg[i] = [0,0,0,0,0,0,0,0,0,0];
            }
        }

        //0줄 있으면 위의 블록들 위치 옮기기
        for(let i=19; i>=0;){
            const isZero = bg[i].every(element => element === 0);
            if(isZero){
                for(let j=i; j>=1; j--){
                    bg[j] = bg[j-1]
                }
            }
            else{
                i--
            }
        }

        return bg;
    }

    // 키 눌렀을 때 도형 움직이기
    const moveByKey = (fg, bg)=>{
        //왼쪽으로 움직이기
        if(count.left!=0){ 
            let b = fg.currentBlock[count.up]
            for(let i=0; i<b.length; i++){
                for(let j=0; j<b.length; j++){
                    if(b[i][j]!='' && bg[fg.y+i][fg.x+(j-1)] != "" || b[i][j] != '' && fg.x+j == 0){
                        setCount(count=>({...count, left:0}));
                        return;
                    }
                }
            }

            let tmp = fg.x-1;

            setFg(fg=>({...fg, x:tmp}));
            setCount(count=>({...count, left:0}));
        }

        //오른쪽으로 움직이기
        if(count.right!=0){
            let b = fg.currentBlock[count.up]
            
            for(let i=0; i<b.length; i++){
                for(let j=0; j<b.length; j++){
                    if(b[i][j]!='' && bg[fg.y+i][fg.x+(j+1)] != "" || b[i][j] != '' && fg.x+j == 10){
                        setCount(count=>({...count, right:0}));
                        return;
                    }
                }
            }

            let tmp = fg.x+1;
            setFg(fg=>({...fg, x:tmp}));
            setCount(count=>({...count, right:0}));
        }

        //아래로 한 칸
        if(count.down!=0){
            let tmp = fg.y;
            setFg(fg=>({...fg, y: tmp}));
            setCount(count=>({...count, down:0}));
        }

        //스페이스바
        if(count.space!=0){
            // let b = fg.currentBlock[count.up]
            // let bgY = fg.y+fg.currentBlock.length-1;
    
            // for(let y=fg.y; y<20; ){
            //     for(let i=0; i<b.length; i++){
            //         for(let j=0; j<b.length; j++){
            //             if((b[i][j] != '' && bgY+(i-2)==20)||(b[i][j]!='' && bg[bgY+(i-2)][fg.x+j] != "")){
            //                 return;
            //             }
            //             else{
            //                 y++
            //             }
            //         }
            //     }

            //     setFg((fg)=>({...fg, y:tmp}))
            // }
            
            
            // console.log("tmp : ", tmp);  
            setCount(count=>({...count, space:0}));
        }

    }

    
    //맨 처음 블록 생성
    useEffect(() => {
        if(blocks.length != 0){
            //blocks에 남아있는 블록이 있으면 return
            return;
        }
        const ranT = randomTetromino();
        console.log(ranT)
        const block = ranT.shift();
        setBlocks(ranT)
        setFg({ currentBlock: block.shape, name:block.name, color: block.color, x: 3, y: -1 })

    }, [blocks])


    useEffect(() => {
        const timeout = setTimeout(()=>{
            if(fg.y===20 || count.esc === 1){
                return;
            }
            drop(fg, bg);
        }, 1000);

        moveByKey(fg, bg);
        setBg(bg=>deleteRow(bg));
        

        return () => {
            clearTimeout(timeout);
        }
    }, [count,fg])


    //bg에 있는 애들 색 입히기
    const renderBgColor = (element)=>{
        if(element === 'O'){
            return { backgroundColor: TETROMINOS[0].color }
        }
        if(element === 'I'){
            return { backgroundColor: TETROMINOS[1].color }
        }
        if(element === 'T'){
            return { backgroundColor: TETROMINOS[2].color }
        }
        if(element === 'J'){
            return { backgroundColor: TETROMINOS[3].color }
        }
        if(element === 'L'){
            return { backgroundColor: TETROMINOS[4].color }
        }
        if(element === 'S'){
            return { backgroundColor: TETROMINOS[5].color }
        }
        if(element === 'Z'){
            return { backgroundColor: TETROMINOS[6].color }
        }
    }

    const gameTable = [];
    const nextBlock = [];

    if(fg){
        const result = draw(fg.x, fg.y, bg, fg.currentBlock[count.up])

        const fgColor = {
            backgroundColor: fg.color
        }

        for(let i=0; i<20; i++){
            const row = [];
            for(let j=0; j<10; j++){
                if(bg[i][j]!=""){
                    row.push(<td key={[i,j].join(':')} style={renderBgColor(bg[i][j])}></td>)  
                }
                else if(result[j+10*i]!=""){
                    row.push(<td key={[i,j].join(':')} style={fgColor}></td>)
                }
                else{
                    row.push(<td key={[i,j].join(':')}></td>)
                }
                
            }
            gameTable.push(<tr key={i}>{row}</tr>)
        }

        if(blocks.length!=0){
            for(let i=0; i<blocks[0].shape[0].length; i++){
                const row = [];
                for(let j=0; j<blocks[0].shape[0].length; j++){
                    row.push(<td key={[i,j].join(':')} style={renderBgColor(blocks[0].shape[0][i][j])}></td>)
                }
                nextBlock.push(<tr key={i}>{row}</tr>)
            }
        }
    }




    
    //키이벤트 등록
    useEffect(() => {
        //document.addEventListener('keydown',onKeyDown);
        document.addEventListener('keyup',onKeyUp);
        return () => {
            //document.removeEventListener('keydown',onKeyDown);
            document.removeEventListener('keyup',onKeyUp);
        }
    }, []);

    return (
        <div>
            <h1 className='title'>테트리스</h1>
            <div className = 'game-div'>
                <table className='game-table'>
                    <tbody>
                        {gameTable}
                    </tbody>
                </table>
            </div>
            <div className='state-div'>
                <table className='next-block'>
                    <tbody>
                        {nextBlock}
                    </tbody>
                </table>
                <div className='level'>
                    <span>LEVEL</span><br/>
                    <span>{props.gamestate.level}</span>
                </div>
                <div className='score'>
                    <span>SCORE</span><br/>
                    <span>{props.gamestate.score}</span>
                </div>
                <div className='lines'>
                    <span>LINES</span><br/>
                    <span>{props.gamestate.lines}</span>
                </div>
            </div>

        </div>
    )
}


//게임페이지
// const Game =()=>{

// }

const App = ()=>{
    const [gamestate, setGamestate] = useState({level: 1, score: 0, lines: 0});

    return(
        <div>
            <GameTable gamestate={gamestate}/>
        </div>
    )
}


ReactDOM.render(
    <App />,
    document.getElementById('root')
  );