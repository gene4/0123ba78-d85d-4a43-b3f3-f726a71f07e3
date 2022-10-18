import React from "react";
import { EventT } from "../App";
import stockEventImage from "../assets/stock-event-image.jpeg";
import "./Cart.scss";

interface Props {
    cartEvents: EventT[];
    removeEventFromCart: (item: EventT) => void;
}

function Cart({ cartEvents, removeEventFromCart }: Props) {
    return (
        <div className="cart-container">
            {cartEvents &&
                cartEvents.map((item: EventT) => (
                    <div className="item-container">
                        <p>{item.title}</p>
                        <span>
                            <img
                                alt="poster"
                                src={
                                    item.flyerFront
                                        ? item.flyerFront
                                        : stockEventImage
                                }
                            />
                            <img
                                onClick={() => removeEventFromCart(item)}
                                className="remove-btn"
                                alt="remove-event"
                                src="/remove.svg"
                            />
                        </span>
                    </div>
                ))}
        </div>
    );
}

export default Cart;
