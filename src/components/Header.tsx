import React from "react";
import { EventT } from "../../types";
import "./Header.scss";

interface Props {
    cartEventIds: EventT["_id"][];
    setIsCartOpen: () => void;
    setSearchInput: (searchInput: string) => void;
}

function Header({ cartEventIds, setIsCartOpen, setSearchInput }: Props) {
    return (
        <header>
            <input
                type="text"
                placeholder="Search..."
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setSearchInput(e.target.value)
                }
            />
            <div onClick={() => setIsCartOpen()} className="cart-btn-container">
                <img alt="cart" src="./cart.svg" />
                <p>{cartEventIds.length}</p>
            </div>
        </header>
    );
}

export default Header;
