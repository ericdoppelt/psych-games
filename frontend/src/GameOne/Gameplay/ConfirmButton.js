import React from 'react';
import {Button} from '@material-ui/core'
import socket from "../../socketClient";

const CONFIRM_CHOICES_TEXT = "Confirm Decision!"
const NUM_PLAYERS = 6

function ConfirmButton(props) {
    return(
        <Button
            variant='contained'
            color='primary'
            onClick={() => sendDecisions(props.selected, props.clearSelected, props.loginCode, props.allLoginCodes)}
            >
            {CONFIRM_CHOICES_TEXT}
        </Button>
    )
}

function sendDecisions(selected, clearSelected, loginCode, allLoginCodes) {
    socket.emit('confirm choice for game 1', loginCode, getSelectedIDs(selected, allLoginCodes))
    clearSelected()
}

// MAKE THIS PUBLIC -- EXISTS IN COLUMN CONTROLLER
function getSelectedIDs(selected, allIDs) {
    let selectedIDs = []
    for (let i = 0; i < NUM_PLAYERS; i++) {
        if (selected[i]) selectedIDs.push(allIDs[i])
    }
    return selectedIDs;
}

export default (ConfirmButton);