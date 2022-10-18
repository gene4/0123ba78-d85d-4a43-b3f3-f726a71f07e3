import React from "react";
import { EventT } from "../App";
import "./Header.scss";

interface Props {
    cartEvents: EventT[];
    setIsCartOpen: () => void;

    // removeEventFromCart: () => void;
}

function Header({ cartEvents, setIsCartOpen }: Props) {
    return (
        <header>
            <input />
            <div onClick={() => setIsCartOpen()} className="cart-btn-container">
                <img alt="cart" src="./cart.svg" />
                <p>{cartEvents.length}</p>
            </div>
        </header>
    );
}

export default Header;
