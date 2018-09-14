import React from 'react';
import {SEAT_STATE} from "./state";

export default function Seat(props) {
    return <div className='seat'
                onClick = { props.seat.state === SEAT_STATE.BUSY ? null : () => props.toggleSeat(props.seat) }
                style = {{background: props.seat.state}}
    >
    </div>
}