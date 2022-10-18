import React from "react";
import { EventT } from "../App";
import "./Header.scss";

interface Props {
    cartEvents: EventT[];
    setIsCartOpen: () => void;
    setSearchInput: (searchInput: string) => void;

    // removeEventFromCart: () => void;
}

function Header({ cartEvents, setIsCartOpen, setSearchInput }: Props) {
    return (
        <header>
            <input
                type="search"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setSearchInput(e.target.value)
                }
            />
            <div onClick={() => setIsCartOpen()} className="cart-btn-container">
                <img alt="cart" src="./cart.svg" />
                <p>{cartEvents.length}</p>
            </div>
        </header>
    );
}

export default Header;
