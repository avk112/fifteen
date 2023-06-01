import React, {useState} from 'react';
import classes from "./Cell.module.scss";


const Cell = ({cell, emptyCell, setCells, animation}) => {
    const [touchCoords, setTouchCoords] = useState({});
    const {coordsStep} = cell;

    const checkIsValidToMove = (cell)=> {
        const isValidToMoveX = (Math.abs(emptyCell.x - cell.x) ===coordsStep && (emptyCell.y === cell.y)) ? (emptyCell.x - cell.x) : 0;
        const isValidToMoveY = (Math.abs(emptyCell.y - cell.y) ===coordsStep && (emptyCell.x === cell.x)) ? (emptyCell.y - cell.y) : 0;
        return {x: isValidToMoveX, y: isValidToMoveY};
    };


    const move = (cellNumber, cellX = touchCoords.cell.x, cellY = touchCoords.cell.y, moveX=touchCoords.move.x, moveY=touchCoords.move.y)=> {
        setCells(prev=>prev.map(item=>{
            if(item.number===16){
                return {...item, x: item.x-moveX, y: item.y -moveY};
            }
            if(item.number===cellNumber){
                return {...item, x: cellX+moveX, y: cellY+moveY};
            }
            return item
        }));
    };

    const handleClick = (cell)=>{
        if(!animation) {
            const {number, x, y} = cell;
            const isValidToMove = checkIsValidToMove(cell);

            return (isValidToMove.x || isValidToMove.y) && move(number, x, y, isValidToMove.x, isValidToMove.y);
        }
    };

    const startTouch = (e, cell)=> {
        if(!animation) {
            const eventX = e.touches[0].screenX;
            const eventY = e.touches[0].screenY;
            const cellX = e.target.offsetLeft;
            const cellY = e.target.offsetTop;
            const timestamp = e.touches[0].timestamp;
            const isValidToMove = checkIsValidToMove(cell)

            return setTouchCoords({
                cell: {x: cellX, y: cellY},
                touch: {x: eventX, y: eventY},
                timestamp: timestamp,
                move: {...isValidToMove}
            });
        }
    };


    const moveTouch = (e, cell)=> {
        if ((cell.x !== touchCoords.cell.x + touchCoords.move.x) || (cell.y !== touchCoords.cell.y + touchCoords.move.y)){
            const saldo = {
                x: e.touches[0].screenX - touchCoords.touch.x,
                y: e.touches[0].screenY - touchCoords.touch.y,
            };

            if (touchCoords.move.x || touchCoords.move.y) {
                const xOrY = touchCoords.move.x ? "x" : "y";
                if ((touchCoords.move[xOrY] > 0 && saldo[xOrY] > 0) || (touchCoords.move[xOrY] < 0 && saldo[xOrY] < 0)) {
                    if (Math.abs(saldo[xOrY]) > 20) {
                        return move(cell.number);
                    }

                    return setCells(prev=>prev.map(item => {
                        return item.number === cell.number ? {...item, [xOrY]: touchCoords.cell[xOrY] + saldo[xOrY]} : item;
                    }));
                }
            }
        }
    };

    const endTouch = (e,cell)=> {
        if ((cell.x !== touchCoords.cell.x + touchCoords.move.x) || (cell.y !== touchCoords.cell.y + touchCoords.move.y)){
            return setCells(prev=>prev.map(item=> {
                return item.number===cell.number ? {...item, x: touchCoords.cell.x, y: touchCoords.cell.y} : item;
            }));
        }
    };


    return (
        <div
             className={`${classes.cell} ${ animation && classes.rotation}`}
             style={{left: cell.x, top: cell.y, width: coordsStep-6, height: coordsStep-6, visibility: cell.number===16 ? "hidden" : "visible"}}
             onClick={()=>handleClick(cell)}
             onTouchStart={(e)=>startTouch(e,cell)}
             onTouchMove={(e)=>moveTouch(e,cell)}
             onTouchEnd={(e)=>endTouch(e,cell)}
        >
            {cell.number}
        </div>
    );
};

export default React.memo(Cell);