import React, { Component } from 'react';
import { connect } from 'react-redux';
import {SEAT_STATE} from './state';

import Row from './Row';
import Cart from './Cart';

const getRemoteData = () => new Promise((resolve, reject) => {
    function shuffle (array, number = array.length) {
        let shuffled = [],
            copy = array.map((i) => i),
            n = array.length,
            stopN = n > number ? n - number : 0,
            t, i;
        // While there remain elements to shuffle
        while (n > stopN) {
            // Pick a remaining element
            i = Math.floor(Math.random() * n--);
            // And swap it with the current element.
            t = copy[n];
            shuffled.push(array[i]);
            copy[i] = t;
        }
        return shuffled;
    }
    const seatsArray = Array.apply(null, {length: 100}).map(Number.call, Number);
    const busySeats = shuffle(seatsArray, 10);
    const rows = Array.apply(null, {length: 10}).map((x, index) => index + 1);
    const seats = seatsArray.map((item) => {
        return {
            id: item + 1,
            row: Math.floor(item / 10) + 1,
            seat: item % 10 + 1,
            state: busySeats.includes(item) ? SEAT_STATE.BUSY : SEAT_STATE.FREE
        };
    });
    setTimeout(resolve({
        seats,
        rows
    }), 1000);
});

class Cinema extends Component {
    constructor() {
        super();
        this.state = {
            seats: [],
            rows: [],
            loading: false,
            error: null
        };
    }

    componentWillMount() {
        this.setState({loading: true});
        getRemoteData().then(
            ({seats, rows}) => {
                this.setState({seats, rows, loading: false});
            },
            error => {
                this.setState({error, loading: false});
            }
        );
    }

    static toggleSeatState(state) {
        return state === SEAT_STATE.FREE ? SEAT_STATE.SELECTED : SEAT_STATE.FREE;
    }

    toggleSeat(seat) {
        this.setState(prevState => {
            const seats = prevState.seats.map((st) => st.id === seat.id ?
                {...st, state: Cinema.toggleSeatState(seat.state)} : st );
            return {seats: seats}
        });
        this.props.toggleSeat(seat);
    }

    buyHandler(cart) {
        const ids = cart.map((seat) => seat.id);
        this.setState(prevState => {
            const seats = prevState.seats.map((st) => ids.includes(st.id) ?
                {...st, state: SEAT_STATE.BUSY} : st );
            return {seats: seats}
        });
        this.props.removeAllSeats();
        setTimeout(() => { alert("Спасибо за покупку") }, 0);
    }


    cancelHandler(cart) {
        const ids = cart.map((seat) => seat.id);
        this.setState(prevState => {
            const seats = prevState.seats.map((st) => ids.includes(st.id) ?
                {...st, state: SEAT_STATE.FREE} : st );
            return {seats: seats}
        });
        this.props.removeAllSeats();
    }

    render() {
        const { rows, seats, loading } = this.state;
        return (
            <div className='cinema'>
                <div className='cinema-room'>
                    {
                        (loading) ?
                            <span>Loading...</span> :
                            rows.map(row =>
                                <Row
                                    row = {seats.filter((seat) => seat.row === row)}
                                    toggleSeat = {this.toggleSeat.bind(this)}
                                    key = {row}
                                />
                            )
                    }
                </div>
                <Cart
                    cart = { this.props.cart }
                    buyHandler = { this.buyHandler.bind(this) }
                    cancelHandler = { this.cancelHandler.bind(this) }
                />
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        cart: state.cart
    }
}

function mapDispatchToProps(dispatch) {
    return {
        toggleSeat: (seat) => {
            dispatch({
                type: 'TOGGLE',
                payload: seat
            });
        },
        removeAllSeats: () => {
            dispatch({
                type: 'REMOVE_ALL',
                payload: null
            });
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cinema);