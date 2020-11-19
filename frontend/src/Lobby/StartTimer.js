// CLASS THAT CREATES A TIMER FOR THE LOBBY

import React, {useEffect, useState} from 'react';
import Timer from 'react-compound-timer'
import {Typography, Box} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles';
import socket from "../socketClient";


const INITIAL_START_TIME = 1 * 6000;

const LAST_TIME_UNIT = 'h';
const DIRECTION = 'backward';

const WELCOME_MESSAGE = 'The game will begin in:';
const WELCOME_VARIANT = 'h3';
const INSTRUCTIONS_VARIANT = 'h4';
const MINUTES = 'Minutes';
const SECONDS = 'Seconds';
const START_GAME = true;

const STOP_TIMER = 0;
const TIMER_UPDATE = 10;
const TIMER_ID = 'timer';
const TEXT_ID = 'timerText';
const DIV_ID = 'timerDiv';

const styles = ({
  welcomeInstruction: {
      marginTop: '150px',
  },
  timerInstruction: {
    marginTop: '50px',
  },

});

function StartTimer(props) {
    const {classes} = props;
    const MAX_ROOM_CAPACITY = 5;
    const [waitingOnPlayerCounter, setWaitingOnPlayerCounter] = useState(MAX_ROOM_CAPACITY);
    const INSTRUCTIONS_MESSAGE = (counter) => `Please wait while ${counter} other players join in.`;

    let code = props.code;
    let setAllLoginCodes = props.setAllLoginCodes;
    useEffect(() => {
        socket.emit("enter lobby", code);
        socket.on("join", (msg) => {
            setWaitingOnPlayerCounter((prevCount) => prevCount - 1);
            console.log(msg);
        });
        socket.on('room fill', (msg) => {
            setAllLoginCodes(msg)
            console.log(msg);
        })
        socket.on('num of people in the room', (numOfPlayers) => {
            console.log(numOfPlayers);
        });

        return () => {
            console.log("remove listeners");
            socket.off("join");
            socket.off('room fill');
            socket.off('num of people in the room');
        }
    }, [code, setAllLoginCodes]);

    return (
        <div className={classes.startTimer} id={DIV_ID}>

            <Typography className={classes.welcomeInstruction} id={TEXT_ID} variant={INSTRUCTIONS_VARIANT}>
                <Box fontStyle="italic">{INSTRUCTIONS_MESSAGE(waitingOnPlayerCounter)}</Box>
            </Typography>
            <Typography className={classes.timerInstruction} variant={WELCOME_VARIANT}>{WELCOME_MESSAGE}</Typography>

            <Timer
                id={TIMER_ID}
                initialTime={INITIAL_START_TIME}
                lastUnit={LAST_TIME_UNIT}
                direction={DIRECTION}
                timeToUpdate={TIMER_UPDATE}
                checkpoints={[
                    {
                        time: STOP_TIMER,
                        callback: () => props.setStartStatus(START_GAME),
                    },
                ]}
            >
                {() => (
                    <React.Fragment>

                        <Typography variant={WELCOME_VARIANT}>
                            <br/>
                            <Timer.Minutes/> {MINUTES}
                            <br/>
                            <Timer.Seconds/> {SECONDS}
                            <br/>
                        </Typography>
                    </React.Fragment>


                )}
            </Timer>
        </div>
    );
}

export default withStyles(styles)(StartTimer);
