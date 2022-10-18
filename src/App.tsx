import { useEffect, useState } from "react";
import "./App.scss";
import Card from "./components/Card";
import Cart from "./components/Cart";
import Header from "./components/Header";

export type EventT = {
    _id: string;
    title: string;
    flyerFront?: string;
    venue: {
        name: string;
        direction: string;
    };
    startTime: string;
    endTime: string;
    date: string;
};

function App() {
    const [events, setEvents] = useState<EventT[]>([]);
    const [cartEvents, setCartEvents] = useState<EventT[]>([]);
    const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
    const [searchInput, setSearchInput] = useState<string>("");

    useEffect(() => {
        fetch("https://tlv-events-app.herokuapp.com/events/uk/london")
            .then((response) => response.json())
            .then((data) => setEvents(data));
    }, []);

    const addEventToCart = (item: EventT) => {
        setCartEvents([...cartEvents, events![events!.indexOf(item)]]);
        const eventsCopy = events;
        eventsCopy!.splice(eventsCopy!.indexOf(item), 1);
        setEvents(eventsCopy);
    };

    const removeEventFromCart = (item: EventT) => {
        const cartEventsCopy = cartEvents;
        setEvents([...events, cartEventsCopy![cartEventsCopy!.indexOf(item)]]);
        cartEventsCopy.splice(cartEventsCopy!.indexOf(item), 1);
        setCartEvents(cartEventsCopy);
    };

    return (
        <div className="App">
            <Header
                setSearchInput={setSearchInput}
                setIsCartOpen={() => setIsCartOpen(!isCartOpen)}
                cartEvents={cartEvents}
            />

            {isCartOpen && (
                <Cart
                    removeEventFromCart={removeEventFromCart}
                    cartEvents={cartEvents}
                />
            )}

            <section className="cards-container">
                {events &&
                    events
                        .sort(function (a: EventT, b: EventT) {
                            return a.date < b.date
                                ? 1
                                : a.date > b.date
                                ? -1
                                : 0;
                        })
                        .filter((item: EventT) =>
                            item.title
                                .toLowerCase()
                                .includes(searchInput.toLowerCase())
                        )
                        .map((item: EventT) => (
                            <Card
                                addEventToCart={() => addEventToCart(item)}
                                key={item._id}
                                title={item.title}
                                venue={item.venue}
                                flyerFront={item.flyerFront}
                                startTime={item.startTime}
                                endTime={item.endTime}
                            />
                        ))}
            </section>
        </div>
    );
}

export default App;
