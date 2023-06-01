import React, {useState, useEffect, useRef} from 'react';
import Cell from "./Cell";
import classes from "./CellsBlock.module.scss";
import MyFireworks from "./MyFireworks";



const CellsBlock = ({shuffled, setShuffled, animation, setAnimation}) => {
    const myRef = useRef(0);
    const [cells, setCells] = useState([]);
    const baseCells = createCells().map(item=>JSON.stringify(item)).join(',');
    const [isWin,setIsWin] = useState(false);

    const cellsSectionSize = cells[0] ? cells[0].coordsStep*4 : 0;


    const handleResize = ()=> {
        setCells(createCells());
        setShuffled(false);
        setIsWin(false);
    }

    function createCells() {
        const squareSize = 4;
        const proportionSide = (myRef.current.clientWidth/myRef.current.clientHeight)<1 ? myRef.current.clientWidth : myRef.current.clientHeight;
        const coordsStep = myRef.current ? Math.round(proportionSide/4) : 0;
        let arr=[];
        let i=1;
        for(let rows=0; rows<squareSize; rows++){
            for(let columns=0; columns<squareSize; columns++){

                arr.push({number: i, x: columns*coordsStep, y: rows*coordsStep, coordsStep: coordsStep});
                i++;

            }
        }

        return arr;
    }


    const shuffleCells = ()=> {
        let newCells = createCells();
        let prevMove = "";

        for(let i=100; i>0; i--){
            const emptyCell = newCells.find(item=>item.number===16);
            const coordsStep=emptyCell.coordsStep;
            let xOrY = Math.round(Math.random()) === 0 ? "x" : "y";
            prevMove=prevMove+xOrY;
            if(prevMove.includes(`${xOrY}${xOrY}${xOrY}`)){
                prevMove="";
                xOrY= xOrY=== "x" ? "y" : "x";
            }

            const currentXOrY = xOrY==="x" ? "y" : "x";
            const minusOrPlus = Math.round(Math.random()) === 0 ? -coordsStep : coordsStep;
            const newCoord = newCells.some(item=> item[xOrY] === emptyCell[xOrY] + minusOrPlus) ? (emptyCell[xOrY]+ minusOrPlus) : (emptyCell[xOrY]- minusOrPlus);

            newCells=newCells.map(item=>{
                if(item[xOrY]===newCoord && item[currentXOrY]===emptyCell[currentXOrY]){
                    return {...item, [xOrY]: emptyCell[xOrY]};
                }
                if(item[xOrY]===emptyCell[xOrY] && item[currentXOrY]===emptyCell[currentXOrY]){
                    return {...item, [xOrY]: newCoord};
                }
                return item;
            })
        }

        setIsWin(false);
        setAnimation(true);
        setTimeout(()=>{
            setCells(newCells);
        }, 750);
        setTimeout(()=>{
            setAnimation(false);
        }, 1100)
    };


    const cellsBlock = cells.map((item, index)=>{
        return <Cell
            key={index}
            cell={item}
            emptyCell={cells.find(item=>item.number===16)}
            setCells={setCells}
            animation={animation}
        />
    });


    useEffect(()=>{
        if(!isWin && shuffled){
            const plainedCells = cells.map(item=>JSON.stringify(item)).join(',');
            if(plainedCells === baseCells){
                setIsWin(true);
                setShuffled(false);
            }
        }
    }, [cells]);


    useEffect(()=>{
        shuffled && shuffleCells();
    }, [shuffled]);


    useEffect(()=>{
        handleResize();
        window.addEventListener('resize', handleResize);

        return ()=> window.removeEventListener("resize",handleResize);
    }, [])


    return (
        <div className={classes.cellsBlock} ref={myRef}>
            {isWin &&
                <MyFireworks/>
            }
            <div
                className={classes.cellsBlock__cells}
                style={{height: cellsSectionSize, width: cellsSectionSize}}
            >
                {cellsBlock}
            </div>
        </div>
    );
};

export default CellsBlock;