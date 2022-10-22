import React from "react";
import stockEventImage from "../assets/stock-event-image.jpeg";
import "./Cart.scss";
import { motion } from "framer-motion";
import { EventT } from "../../types";

interface Props {
    originalEvents: EventT[];
    cartEventIds: EventT["_id"][];
    removeEventFromCart: (id: string) => void;
}

function Cart({ originalEvents, cartEventIds, removeEventFromCart }: Props) {
    return (
        <motion.div
            initial={{ x: 200 }}
            animate={{ x: 0 }}
            exit={{ x: 400 }}
            transition={{ ease: "easeOut", duration: 0.5 }}
            layout
            className="cart-container"
        >
            {cartEventIds.length > 0 ? (
                cartEventIds.map((id) =>
                    originalEvents
                        .filter((event) => id === event._id)
                        .map((item: EventT) => (
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
                                        onClick={() =>
                                            removeEventFromCart(item._id)
                                        }
                                        className="remove-btn"
                                        alt="remove-event"
                                        src="/remove.svg"
                                    />
                                </span>
                            </div>
                        ))
                )
            ) : (
                <h2>There are no events in your cart!</h2>
            )}
        </motion.div>
    );
}

export default Cart;
