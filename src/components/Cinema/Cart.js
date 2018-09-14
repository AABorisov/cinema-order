import React from 'react';

export default function Cart ({cart, buyHandler, cancelHandler}) {
    return <div className='cart'>
        <h4>Вы выбрали места:</h4>
        <div className="cart-seat-container">
        {
            cart.map(seat =>
                <p key = {seat.id} >ряд {seat.row} место {seat.seat}</p>
            )
        }
        </div>
        <p>Общая стоимость:<br/><br/>{cart.length * 100} руб </p>
        <div className="cart-buttons">
            <button
                className="buy-button"
                disabled={!cart.length}
                onClick={() => {buyHandler(cart)}}>Купить</button>
            <button
                className="cancel-button"
                disabled={!cart.length}
                onClick={() => {cancelHandler(cart)}}>Отмена</button>
        </div>
    </div>
}
