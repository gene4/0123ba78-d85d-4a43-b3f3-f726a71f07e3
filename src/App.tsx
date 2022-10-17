import React from "react";
import { useEffect, useState } from "react";
import "./App.scss";

type EventT = {
    id: string;
    title: string;
    flyerFront: string;
    location: number;
    startTime: string;
    endTime: string;
    date: string;
};

function App() {
    const [events, setEvents] = useState<EventT[]>();

    useEffect(() => {
        fetch("https://tlv-events-app.herokuapp.com/events/uk/london")
            .then((response) => response.json())
            .then((data) => setEvents(data));
    }, []);

    console.log(events);

    return (
        <div className="App">
            <header className="App-header"></header>
        </div>
    );
}

export default App;
