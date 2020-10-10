import React, {useState} from 'react';
import PlayerGroup from '../../Avatars/Components/PlayerGroup';
import { Typography, Grid, Button, withStyles } from '@material-ui/core';
import '../../CommonStylings/FullScreenDiv.css';
import DelayedConfetti from './DelayedConfetti';
 
const FULL_DIV = 'fullDiv';
const WINNING_HEADER = 'Winning Players:'
const LOSING_HEADER = 'Losing Players:'
const HEADER_VARIANT='h4';

const styles = ({
    winners: {
        marginTop: '15vh',
        marginLeft: '10%',
        marginRight: '10%',
    },
    losers: {
        marginTop: '15vh',
        marginLeft: '10%',
        marginRight: '10%',
    },
    playerGroup: {
        marginTop: '30px',
    },
});


function GroupScreen(props) {
    const {classes} = props;
    const [confetti, setConfetti] = useState(false);


   

    return(
 
        <div className={FULL_DIV}>
            <DelayedConfetti/>
            {getGroup(classes.winners, classes.playerGroup, WINNING_HEADER, [1, 2, 3])}
            {getGroup(classes.losers, classes.playerGroup, LOSING_HEADER, [4, 5, 6])}
        </div>
    )
}

function getGroup(divClassName, groupClassName, headerText, playersShown) {
    return(
        <div className={divClassName}>
            <Typography variant={HEADER_VARIANT}>{headerText}</Typography>
            <div className={groupClassName}>
                <PlayerGroup players={playersShown}/>
            </div>
        </div>
    )
}

export default withStyles(styles)(GroupScreen);