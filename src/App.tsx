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
        console.log("cartEventsCopy", cartEventsCopy);
        cartEventsCopy.splice(cartEventsCopy!.indexOf(item), 1);
        setCartEvents(cartEventsCopy);
        // setEvents([...events, cartEvents![cartEvents!.indexOf(item)]]);
    };

    return (
        <div className="App">
            <Header
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
                    events.map((item: EventT) => (
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
