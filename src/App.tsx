import { useCallback, useEffect, useState } from "react";
import "./App.scss";
import Card from "./components/Card";
import Cart from "./components/Cart";
import Header from "./components/Header";
import moment from "moment";
import { motion, AnimatePresence } from "framer-motion";

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
    const [events, setEvents] = useState<EventT[][]>([]);
    const [cartEvents, setCartEvents] = useState<EventT[]>([]);
    const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
    const [searchInput, setSearchInput] = useState<string>("");

    useEffect(() => {
        fetch("https://tlv-events-app.herokuapp.com/events/uk/london")
            .then((response) => response.json())
            .then((data) => {
                const groupedData = data.reduce(
                    (
                        reducer: { [key: string]: EventT[] },
                        accumulator: EventT
                    ) => {
                        reducer[accumulator.date] = [
                            ...(reducer[accumulator.date] || []),
                            accumulator,
                        ];
                        return reducer;
                    },
                    []
                );

                setEvents(Object.values(groupedData));
            });
    }, []);

    const addEventToCart = (item: EventT) => {
        setCartEvents([...cartEvents, item]);

        const eventsCopy = events.map((group) => {
            if (group[0].date === item.date) {
                group.splice(group.indexOf(item), 1);
                return group;
            }
            return group;
        });

        setEvents(eventsCopy);
    };

    const removeEventFromCart = (item: EventT) => {
        const cartEventsCopy = cartEvents;
        cartEventsCopy.splice(cartEventsCopy!.indexOf(item), 1);
        setCartEvents(cartEventsCopy);

        const eventsCopy = events.map((group: EventT[]) => {
            if (group.length > 0 && group[0].date === item.date) {
                return [...group, item];
            } else {
                return group;
            }
            // return group;
        });
        setEvents(eventsCopy);
    };

    const filteredEvents = useCallback(() => {
        const filterGroup = events.map((group: EventT[]) => {
            return group.filter((item: EventT) =>
                item.title.toLowerCase().includes(searchInput.toLowerCase())
            );
        });

        return filterGroup.filter((array: [] | EventT[]) => array.length > 0);
    }, [events, searchInput]);

    return (
        <div className="App">
            <Header
                setSearchInput={setSearchInput}
                setIsCartOpen={() => setIsCartOpen(!isCartOpen)}
                cartEvents={cartEvents}
            />
            <AnimatePresence>
                {isCartOpen && (
                    <Cart
                        removeEventFromCart={removeEventFromCart}
                        cartEvents={cartEvents}
                    />
                )}
            </AnimatePresence>
            <section>
                {events &&
                    filteredEvents()
                        .sort(function (a: EventT[], b: EventT[]) {
                            return a[0].date < b[0].date
                                ? -1
                                : a[0].date > b[0].date
                                ? 1
                                : 0;
                        })
                        .map(
                            (group: EventT[]) =>
                                group.length > 0 && (
                                    <div
                                        key={group[0]._id}
                                        className="group-container"
                                    >
                                        <div className="date-container">
                                            <p>
                                                {moment(group[0].date).format(
                                                    "MMMM Do YYYY"
                                                )}
                                            </p>
                                        </div>
                                        <motion.div
                                            layout
                                            className="cards-container"
                                        >
                                            {group.map((item: EventT) => (
                                                <Card
                                                    addEventToCart={() =>
                                                        addEventToCart(item)
                                                    }
                                                    key={item._id}
                                                    title={item.title}
                                                    venue={item.venue}
                                                    flyerFront={item.flyerFront}
                                                    startTime={item.startTime}
                                                    endTime={item.endTime}
                                                />
                                            ))}
                                        </motion.div>
                                    </div>
                                )
                        )}
            </section>

            {filteredEvents().length === 0 && searchInput !== "" && (
                <div className="not-found">
                    <h2>No events were found ☹︎</h2>
                </div>
            )}
        </div>
    );
}

export default App;
