import { useCallback, useEffect, useMemo, useState } from "react";
import "./App.scss";
import Card from "./components/Card";
import Cart from "./components/Cart";
import Header from "./components/Header";
import moment from "moment";
import { motion, AnimatePresence } from "framer-motion";
import { API_URL } from "./utils/api";
import { EventsDataT, EventT } from "./utils/types";
import { transformEventPayload } from "./utils/transformEventPayload";

function App() {
    const [events, setEvents] = useState<EventsDataT>();
    const [cartEvents, setCartEvents] = useState<EventT[]>([]);
    const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
    const [searchInput, setSearchInput] = useState<string>("");

    const fetchEvents = useCallback(() => {
        fetch(API_URL)
            .then((response) => response.json())
            .then((data) => setEvents(transformEventPayload(data)));
    }, []);

    useEffect(() => {
        fetchEvents();
    }, []);

    const addEventToCart = useCallback(
        (item: EventT) => {
            setCartEvents([...cartEvents, item]);

            if (!events) return;

            const eventsCopy = events;
            eventsCopy[item.date].splice(
                eventsCopy[item.date].indexOf(item),
                1
            );
            setEvents(eventsCopy);
        },
        [cartEvents, events]
    );

    const removeEventFromCart = useCallback(
        (item: EventT) => {
            const cartEventsCopy = [...cartEvents];
            cartEventsCopy.splice(cartEventsCopy!.indexOf(item), 1);
            setCartEvents(cartEventsCopy);

            if (!events) return;
            const eventsCopy = events;
            if (eventsCopy[item.date]) {
                eventsCopy[item.date].push(item);
            } else {
                eventsCopy[item.date] = [item];
            }

            setEvents(eventsCopy);
        },
        [events, cartEvents]
    );

    const filteredEvents = useMemo(() => {
        if (!events) return;
        const filterGroup = Object.entries(events);

        filterGroup.map(([date, eventsByDate]) => {
            eventsByDate.filter((item: EventT) =>
                item.title.toLowerCase().includes(searchInput.toLowerCase())
            );

            return [date, eventsByDate];
        });

        return filterGroup;
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
                    // filteredEvents()
                    filteredEvents!
                        // Object.entries(events)
                        .filter((item) => item[1].length > 0)
                        .sort(
                            (a: [string, EventT[]], b: [string, EventT[]]) => {
                                return a[0] < b[0] ? -1 : a[0] > b[0] ? 1 : 0;
                            }
                        )
                        .map(([date, eventsByDate]) => (
                            <div key={date} className="group-container">
                                <div className="date-container">
                                    (
                                    <p>{moment(date).format("MMMM Do YYYY")}</p>
                                    )
                                </div>
                                <motion.div layout className="cards-container">
                                    {eventsByDate.map((item: EventT) => (
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
                        ))}
            </section>

            {/* {filteredEvents().length === 0 && searchInput !== "" && (
                <div className="not-found">
                    <h2>No events were found ☹︎</h2>
                </div>
            )} */}
        </div>
    );
}

export default App;
