import React, {useState} from 'react';
import classes from "./GameArea.module.scss";
import CellsBlock from "./CellsBlock";

const GameArea = () => {
    const [shuffled, setShuffled] = useState(false);
    const [animation, setAnimation] = useState(false);

    const shuffleCells = ()=> {
        setShuffled(Date.now());
    };



    return (
        <div className={classes.gameArea}>
            <CellsBlock
                shuffled={shuffled}
                setShuffled={setShuffled}
                animation={animation}
                setAnimation={setAnimation}
            />
            <button
            disabled={animation}
                onClick={shuffleCells}>Shuffle</button>
        </div>
    );
};

export default GameArea;