import React, { useState, useEffect } from 'react';
import ReactDOM, { findDOMNode, render } from 'react-dom';
import './index.css';

let background = [];
const makeBackground = ()=>{
    
    for(let i=0; i<20; i++){
        const row = [];
        for(let j=0; j<10; j++){           
                row.push("")
        }
        background.push(row)
    }
}
makeBackground();

for(let i=15; i<20; i++){
    const row = [];
    for(let j=0; j<10; j++){           
        if(j!=0) {
            background[i][j] = "O";
        }
    }
}

let interval;
const timer = (props)=>{
    clearInterval(interval);
      let time = Date.now();
      interval = setInterval(()=>{
        const dt = Date.now()-time;  
        props.setGamestate(gamestate=>({...gamestate, time: Math.floor(dt/1000)}))
      }, 500);
}


//시작 페이지
const StartPage = (props)=>{

    const handleSubmit =(e)=>{
        e.preventDefault();
        background=[];
        makeBackground();
        props.setGamestate(gamestate=>({...gamestate, gameover: false}));
        props.setMode(1);
    }

    return(
        <div className="container">
            <h1 className='title'>테트리스</h1>
            <form onSubmit={handleSubmit} className='userInfo'>
                <label htmlFor="id">아이디  </label>
                <input type="text" name="id" onChange={e=>props.setGamestate(gamestate=>({...gamestate, id: e.target.value}))}/><br/>
                <button className='startBtn'>게임 시작</button>
            </form>
        </div>
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
                ['', 'T', ''],
                ['T','T','T'],
                ['', '', '']
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
                ['J', '', ''],
                ['J', 'J', 'J'],
                ['', '', '']
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
                ['','S','S'],
                ['S','S', ''],
                ['', '', '']
            ],
            [
                ['','S', ''],
                ['','S','S'],
                ['','', 'S']
            ],
            [
                ['', '', ''],
                ['','S','S'],
                ['S','S', '']
            ],
            [
                ['S', '',''],
                ['S','S',''],
                ['', 'S','']
            ]
        ]
    },
    {
        name: 'Z',
        color: 'red',
        shape: [
            [
                ['Z','Z', ''],
                ['', 'Z', 'Z'],
                ['', '', '']
            ],
            [
                ['', '', 'Z'],
                ['','Z','Z'],
                ['','Z', '']
            ],
            [
                ['', '', ''],
                ['Z','Z', ''],
                ['', 'Z', 'Z']
            ],
            [
                ['',  'Z', ''],
                ['Z','Z', ''],
                ['Z', '', '']
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
    const [count, setCount] = useState({esc: 0, up: 0, left: 0, right: 0, down: 0, space: 0, up2: 0, up3: 0, bg: 0})
    const [d, setD] = useState(0);
    const [e, setE] = useState(0);


    
    const onKeyDown = React.useCallback((e)=>{
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
                    return({...count, up2: 1})
                })
            }
                break;
            case 'ControlLeft':
            case 'KeyZ':{
                setCount(count=>{
                    return({...count, up3: 1})
                })
            }
                break;

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


    const newBlock = (block)=>{
        if(blocks.length != 1){
            const y = block.shape[0][0].every((element)=> element==='') ? -1 : 0
            setFg({ currentBlock: block.shape, name:block.name, color: block.color, x: 3, y });
        }
        else{
            const ranT= randomTetromino().filter(element => element.name!=blocks[blocks.length-1].name);
            ranT.unshift(blocks[blocks.length-1])
            const block2 = ranT.shift();
            setBlocks(ranT);
            const y = block2.shape[0][0].every((element)=> element==='') ? -1 : 0
            setFg({ currentBlock: block2.shape, name:block2.name, color: block2.color, x: 3, y})
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
        for(let i=0; i<fg.currentBlock[count.up].length; i++){
            for(let j=0; j<fg.currentBlock[count.up].length; j++){
                if((fg.x+j>=0 && fg.y+i>=0)&& fg.currentBlock[count.up][i][j]!=''){
                    bg[fg.y+i][fg.x+j] = fg.currentBlock[count.up][i][j];
                }
            }
        }
        return bg;
    }


    // 한 칸씩 떨어뜨리기
    const drop = (fg, bg) => {
        let b = fg.currentBlock[count.up];
        let bgY = fg.y+fg.currentBlock.length-1;
        if(fg.y==-2){
            return;
        }
        for(let i=0; i<b.length; i++){
            for(let j=0; j<b.length; j++){
                // if(b[i][j] != '' && fg.y+i==0 && bg[bgY+(i-2)][fg.x+j] != ""){
                //     console.log("drop gameover")
                //     props.setGamestate(gamestate=>({...gamestate, gameover: true}));
                //     clearInterval(interval);
                //     return;
                // }
                if((b[i][j] != '' && bgY+(i-2)==20)||(b[i][j]!='' && bg[bgY+(i-2)][fg.x+j] != "")){
                    setBg(bg=>fixBg(bg,fg));
                    setCount(count=>({...count, up: 0, bg: 1}))
                    return
                }
            }
        }

        
        let tmp=fg.y+1;
        setFg((fg)=>({...fg, y:tmp}))
    }

    //한 줄 다 차면 삭제시키고 점수올리기
    const deleteRow = (bg)=>{

        let scoreCount = 0;
        
        //다 찬 줄 0으로 만들고
        for(let i=19; i>=0; i--){
            const isFull = bg[i].every(element => element !== "");
            if(isFull){
                bg[i] = [0,0,0,0,0,0,0,0,0,0];
                // 삭제한 줄 수 올리기
                scoreCount++
                props.setGamestate(gamestate => ({...gamestate, lines: gamestate.lines+1, totalLines: gamestate.totalLines+1}))
            }
        }

        //0줄 있으면 위의 블록들 위치 옮기기
        for(let i=19; i>=0;){
            const isZero = bg[i].every(element => element === 0);
            if(isZero){
                if(i===0){
                    bg[i] = ["", "", "", "", "", "", "", "", "", ""];
                }
                else{
                    for(let j=i; j>=0; j--){
                        for(let k=0;k<10; k++) {
                            if(j!==0){
                                bg[j][k] = bg[j-1][k];
                            }
                            else{
                                bg[j].fill(null).map(_=>'');
                            }  
                        }
                    }
                }
            }
            else{
                i--
            }
        }

        //점수 올리기
        if(scoreCount === 1){
            props.setGamestate(gamestate => ({...gamestate, score: gamestate.score+(100*(1+0.1*(props.gamestate.level-1)))}))
        }
        else if(scoreCount === 2){
            props.setGamestate(gamestate => ({...gamestate, score: gamestate.score+(300*(1+0.1*(props.gamestate.level-1)))}))
        }
        else if(scoreCount === 3){
            props.setGamestate(gamestate => ({...gamestate, score: gamestate.score+(500*(1+0.1*(props.gamestate.level-1)))}))
        }
        else if(scoreCount === 4){
            props.setGamestate(gamestate => ({...gamestate, score: gamestate.score+(800*(1+0.1*(props.gamestate.level-1)))}))
        }

        scoreCount=0;
        plusLevel();

        return bg;
    }

    //회전시킬 때 fg위치 변경
    const moveFg = (fg)=>{
        if(fg.x==-1){
            if(fg.name == "I"){
                setFg(fg=>({...fg, x: fg.x+1}));
            }
            else{
                setFg(fg=>({...fg, x: fg.x+1}));
            }
        }
        else if(fg.x==-2){
            setFg(fg=>({...fg, x: fg.x+2}));
        }
        else if(fg.x===7 && fg.name==="I"){
            setFg(fg=>({...fg, x: fg.x-1}));
        }
        else if(fg.x==8){
            if(fg.name == "I"){
                setFg(fg=>({...fg, x: fg.x-2}));
            }
            else{
                setFg(fg=>({...fg, x: fg.x-1}));
            }
        }
        if(fg.y==-1){
            setFg(fg=>({...fg, y: fg.y+1}));
        }
    }


    // 키 눌렀을 때 도형 움직이기
    const moveByKey = (fg, bg)=>{
        if(props.gamestate.gameover==true){
            return
        }
        if(count.up2!=0){
            //count.up1가 0이 아니면, 윗방향 화살표가 눌렸다는 뜻.
            moveFg(fg);

            setCount(count=>{
                //중지상태가 아닐 경우, 회전시키기. 
                if(count.esc === 0){
                    return ({...count, up: (count.up+1)%4, up2: 0})
                }
                else{
                    return ({...count, up2: 0})
                }
            }); 
        }

        if(count.up3 !== 0){
            moveFg(fg);
            setCount(count=>{
                if(count.esc === 0){
                    if(count.up === 0){
                        return ({...count, up: count.up+3, up3:0})
                    }
                    else{
                        return ({...count, up: count.up-1, up3:0});
                    }
                }
                else{
                    return ({...count})
                }

            }); 
        }

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

            //x의 위치가 -1일 때, 이 상태에서 회전을 시키면 위치를 +1 해줘야 함
            
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
            let b = fg.currentBlock[count.up]
            let bgY = fg.y+fg.currentBlock.length-1;
            let tmp = fg.y;
            for(let i=0; i<b.length; i++){
                for(let j=0; j<b.length; j++){
                    if((b[i][j] != '' && bgY+(i-2)==20)||(b[i][j]!='' && bg[bgY+(i-2)][fg.x+j] != "")){
                        setCount(count=>({...count, down:0}));
                        return;
                    }
                }
            }
            setFg(fg=>({...fg, y: tmp+1}));
            props.setGamestate(gamestate => ({...gamestate, score: gamestate.score+1}))
            setCount(count=>({...count, down:0}));
        }

        //스페이스바
        if(count.space!=0){
            let y = fg.y;
            let b = fg.currentBlock[count.up]
            let scoreCount = 0;

            while(true){
                let bgY = y+fg.currentBlock.length-1;
                for(let i=0; i<b.length; i++){
                    for(let j=0; j<b.length; j++){
                        if((b[i][j] != '' && bgY+(i-2)==20)||(b[i][j]!='' && bg[bgY+(i-2)][fg.x+j] != "")){
                            const rbg = fixBg(bg,{
                                ...fg,
                                y,
                            });
                            setBg(()=>rbg);     
                            props.setGamestate(gamestate=>({...gamestate, score: gamestate.score+scoreCount*2}))                       
                            setCount(count=>({...count, space:0, up:0, bg: 1}));
                            return;
                        }
                    }
                }           
                y++;
                scoreCount++
            }
        }

    }//moveByKey


    // 일정 라인 이상 삭제하면 레벨 올리기
    const plusLevel = ()=>{
        if(props.gamestate.lines === 10+(props.gamestate.level-1)*5){
            props.setGamestate(gamestate => ({...gamestate, lines: 0, level: gamestate.level+1}));
        }
    }

    
    //맨 처음 블록 생성
    useEffect(() => {
        if(blocks.length != 0){
            //blocks에 남아있는 블록이 있으면 return
            return;
        }
        timer(props);
        const ranT = randomTetromino();
        console.log(ranT)
        const block = ranT.shift();
        console.log(block);
        setBlocks(ranT)
        const y = block.shape[0][0].every(element=> element=='') ? -1 : 0
        console.log("y : ",y)
        setFg({ currentBlock: block.shape, name:block.name, color: block.color, x: 3, y })

    }, [blocks])

    useEffect(() => {
        if(props.gamestate.gameover == true){
            return;
        }
        const dropInterval = setInterval(()=>{
            setD(d=>d+1);
        }, 1000-(props.gamestate.level-1)*50);
        
        return () => {
            clearInterval(dropInterval);
        }
    }, [props.gamestate.gameover, props.gamestate.level])

    useEffect(() => {
        if(d!==e){
            setE(d);
            if(fg.y===20 || count.esc === 1 || props.gamestate.gameover == true){
                return;
            }
            drop(fg, bg);
        }
        
        if(count.esc !== 1){
            moveByKey(fg, bg);
        }
        const rbg = deleteRow(bg);
        setBg(()=>rbg);
        
        
    }, [count,fg,bg,d,e,props.gamestate.gameover])

    //새로운 도형 생성&위치조정
    useEffect(() => {
        let y = 0;
        // bg에 변동사항이 있으면
        if(count.bg != 0){
            const block = blocks.shift();
            if(bg[0][5]!==""||bg[0][4]!==""){
                clearInterval(interval);
                console.log("useEffect gameover")
                props.setGamestate(gamestate=>({...gamestate, gameover: true}))
                return;
            }
            if(bg[0][3]!==""&&block.name!=="O"){
                clearInterval(interval);
                console.log("useEffect gameover")
                props.setGamestate(gamestate=>({...gamestate, gameover: true}))
                return
            }
            if(bg[0][3]!==""||bg[0][4]!==""||bg[0][5]!==""||bg[0][6]!==""||bg[1][3]!==""||bg[1][4]!==""||bg[1][5]!==""||bg[1][6]!==""){
                for(let i=block.shape[0].length-1; i>=0;){
                    for(let j=block.shape[0].length-1; j>=0; j--){
                        if(0+i>=0&&(block.shape[0][i][j]!==''&&bg[0+i][3+j]!=='')){
                            y--;
                            console.log("확인 y : ", y)
                            i--;
                        }
                        else{
                            i--;
                        }
                    }
                }
                setFg({ currentBlock: block.shape, name:block.name, color: block.color, x: 3, y })         
                clearInterval(interval);
                console.log("useEffect gameover")
                props.setGamestate(gamestate=>({...gamestate, gameover: true}))
                setCount(count=>({...count, bg: 0})) 
                return;
            }
            else{
                newBlock(block);
                setCount(count=>({...count, bg: 0}))
            }
        }
    }, [count.bg, fg, bg, blocks])


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
        document.addEventListener('keydown',onKeyDown);
        return () => {
            //document.removeEventListener('keydown',onKeyDown);
            document.removeEventListener('keydown',onKeyDown);
        }
    }, []);

    return (
        <div>
            <h1 className='title'>테트리스</h1>
            <div className = 'game-div'>
                <Gameover gamestate={props.gamestate}/>
                <table className='game-table'>
                    <tbody>
                        {gameTable}
                    </tbody>
                </table>
            </div>
            <div className='state-div'>
                <div className='timer'>
                    <span>⏱</span><br/>
                    <span>{props.gamestate.time}</span>
                </div>
                <table className='next-block'>
                    <tbody>
                        {nextBlock}
                    </tbody>
                </table>
                <div className="state-bar">
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
                    <div className='total-lines'>
                        <span>TOTAL LINES</span><br/>
                        <span>{props.gamestate.totalLines}</span>
                    </div>
                </div>
                
                <button onClick={()=>{props.setMode(2); 
                                      clearInterval(interval);
                                      if(props.gamestate.gameover===false){
                                          props.setGamestate(gamestate=>({...gamestate, gameover: true}))}}}>게임종료</button>
            </div>
        </div>
    )
}

const Gameover = (props)=>{
    if(props.gamestate.gameover == true){
        return(
            <div className='alert-gameover'>
                <span>GAMEOVER</span>
            </div>
        )
    }
    else{
        return("");
    }
} 

const cs = [];
const RankTable = (props)=>{
    const [content, setContent] = useState();
     
    const  renderContent = (i, id, score, level, totalLines, time)=>{
        return(
            <tr key={i}>
            <td>{i+1}</td>
            <td>{id}</td>
            <td>{score}</td>
            <td>{level}</td>
            <td>{totalLines}</td>
            <td>{time}</td>
            </tr>
        )
    }

    useEffect(() => {
        cs.length=0;
        let userRank = JSON.parse(localStorage.getItem('userRank')).splice(1);
        userRank.sort((a,b)=>{
            return a.score < b.score ? 1 : a.score > b.score ? -1: 0;
          })
        if(userRank.length>10){
            userRank.splice(10);
        }
        for(let i=0; i<userRank.length;i++){
            cs.push(renderContent(i, userRank[i].id, userRank[i].score, userRank[i].level, userRank[i].totalLines, userRank[i].time));
        }
        setContent(cs);
    }, [content])

    
    if(content){
        return(
            <>
            <table className='rank-table'>
              <thead>
                <tr>
                  <th>순위</th>
                  <th>id</th>
                  <th>점수</th>
                  <th>레벨</th>
                  <th>삭제한 줄 개수</th>
                  <th>진행시간</th>
                </tr>
              </thead>
              <tbody>
                {content}
              </tbody>
            </table>
            </>
          )
    }
    else{
        return("")
    }
}

const Ending = (props)=>{
    return(
        <div>
            <h1 className='title'>테트리스</h1>
            <div className="ending-container">
                <div>
                    <p>아이디 : {props.gamestate.id}</p>
                    <p>레벨 : {props.gamestate.level}</p>
                    <p>게임 진행시간 : {props.gamestate.time}</p>
                </div>
                <button onClick={()=>{props.setMode(0);}}>처음으로</button>
                <RankTable/>
            </div>
        </div>
    )
}

let userRank=[];
userRank = userRank.concat(JSON.parse(localStorage.getItem('userRank')));

const App = ()=>{
    const [gamestate, setGamestate] = useState({level: 1, score: 0, lines: 0, totalLines:0, id: '', time:0, gameover: false});
    const [mode, setMode] = useState(0);
    
    useEffect(() => {
        if(gamestate.gameover == true){

            const newUser = {
                "id": gamestate.id,
                "score": gamestate.score,
                "level": gamestate.level,
                "totalLines": gamestate.totalLines,
                "time": gamestate.time
            };
            
            userRank.push(newUser);
            localStorage.setItem("userRank", JSON.stringify(userRank));
        }
    }, [gamestate.gameover])
    
    

    
    if(mode === 0){
        return(
            <div>
                <StartPage 
                    gamestate={gamestate}
                    setGamestate={setGamestate}
                    mode={mode}
                    setMode={setMode}/>
            </div>
        )
    }
    else 
    if(mode === 1){
        return(
            <div>
                <GameTable 
                    gamestate={gamestate}
                    setGamestate={setGamestate}
                    setMode={setMode}/>
            </div>
        )
    }
    else if(mode === 2){
        return(
            <div>
                <Ending
                    gamestate={gamestate}
                    setGamestate={setGamestate}
                    setMode={setMode}/>
            </div>
        )
    }
}


ReactDOM.render(
    <App />,
    document.getElementById('root')
  );