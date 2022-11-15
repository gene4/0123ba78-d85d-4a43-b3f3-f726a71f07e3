import { useCallback, useEffect, useMemo, useState } from "react";
import "./App.scss";
import Card from "./components/Card";
import Cart from "./components/Cart";
import Header from "./components/Header";
import { motion, AnimatePresence } from "framer-motion";
import { API_URL } from "./utils/api";
import { EventT } from "../types";
import { transformEventPayload } from "./utils/transformEventPayload";
import Spinner from "./components/Spinner";
import DateHeader from "./components/DateHeader";

function App() {
    const [originalEvents, setOriginalEvents] = useState<EventT[]>([]);
    const [cartEventIds, setCartEventIds] = useState<EventT["_id"][]>([]);
    const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
    const [searchInput, setSearchInput] = useState<string>("");

    useEffect(() => {
        const fetchEvents = () => {
            fetch(API_URL)
                .then((response) => response.json())
                .then((data) => setOriginalEvents(data));
        };
        fetchEvents();
    }, []);
    const events = useMemo(() => {
        // filter by search input
        // filter by cart inclusion

        const formatedAddress = (venueName: string, city: string) => {
            const newAddress = `https://www.google.com/maps/dir//${venueName}+${city}`;
            return newAddress;
        };

        const eventsWithFormatedAdress = originalEvents.map((event: EventT) => {
            return {
                ...event,
                venue: {
                    ...event.venue,
                    direction: formatedAddress(event.venue.name, event.city),
                },
            };
        });

        const filtered = eventsWithFormatedAdress.filter((event: EventT) => {
            if (
                (searchInput &&
                    !event.title
                        .toLowerCase()
                        .includes(searchInput.toLowerCase())) ||
                cartEventIds.includes(event._id)
            ) {
                return false;
            }
            return true;
        });

        // sort by date
        const sorted = filtered.sort((a: EventT, b: EventT) => {
            return a.date < b.date ? -1 : a.date > b.date ? 1 : 0;
        });

        // group by date
        const transformed = transformEventPayload(sorted);
        const grouped = Object.entries(transformed);

        return grouped;
    }, [originalEvents, searchInput, cartEventIds]);

    const addEventToCart = useCallback(
        (eventId: string) => {
            setCartEventIds([...cartEventIds, eventId]);
        },
        [cartEventIds]
    );

    const removeEventFromCart = useCallback(
        (eventId: string) => {
            const cartEventIdsCopy = [...cartEventIds];
            cartEventIdsCopy.splice(cartEventIdsCopy!.indexOf(eventId), 1);
            setCartEventIds(cartEventIdsCopy);
        },
        [cartEventIds]
    );

    return (
        <div className="App">
            <Header
                setSearchInput={setSearchInput}
                setIsCartOpen={() => setIsCartOpen(!isCartOpen)}
                cartEventIds={cartEventIds}
            />
            <AnimatePresence>
                {isCartOpen && (
                    <Cart
                        removeEventFromCart={removeEventFromCart}
                        cartEventIds={cartEventIds}
                        originalEvents={originalEvents}
                    />
                )}
            </AnimatePresence>
            <section>
                {events.length > 0 ? (
                    events.map(([date, eventsByDate]) => (
                        <div key={date} className="group-container">
                            <DateHeader date={date} />
                            <motion.div layout className="cards-container">
                                {eventsByDate.map((item: EventT) => (
                                    <Card
                                        addEventToCart={() =>
                                            addEventToCart(item._id)
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
                    ))
                ) : (
                    <Spinner />
                )}
            </section>

            {events?.length === 0 && searchInput !== "" && (
                <div className="not-found">
                    <h2>No events were found ☹︎</h2>
                </div>
            )}
        </div>
    );
}

export default App;
