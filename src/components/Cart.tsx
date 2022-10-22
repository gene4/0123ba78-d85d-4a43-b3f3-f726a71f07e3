import React from "react";
import stockEventImage from "../assets/stock-event-image.jpeg";
import "./Cart.scss";
import { motion } from "framer-motion";
import { EventT } from "../utils/types";

interface Props {
    cartEvents: EventT[];
    removeEventFromCart: (item: EventT) => void;
}

function Cart({ cartEvents, removeEventFromCart }: Props) {
    return (
        <motion.div
            initial={{ x: 200 }}
            animate={{ x: 0 }}
            exit={{ x: 400 }}
            transition={{ ease: "easeOut", duration: 0.5 }}
            layout
            className="cart-container"
        >
            {cartEvents.length > 0 ? (
                cartEvents.map((item: EventT) => (
                    <div className="item-container" key={item._id}>
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
                ))
            ) : (
                <h2>There are no events in your cart!</h2>
            )}
        </motion.div>
    );
}

export default Cart;
