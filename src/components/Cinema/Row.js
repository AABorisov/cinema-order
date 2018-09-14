import React from 'react';
import Seat from './Seat';

export default function Row(props) {
    return <div className='row'>
        {
            props.row.map(seat =>
                <Seat
                    seat = {seat}
                    toggleSeat = {props.toggleSeat}
                    key = {seat.id}
                />
            )
        }
    </div>
}