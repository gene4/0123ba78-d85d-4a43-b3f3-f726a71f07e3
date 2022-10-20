import "./Card.scss";
import stockEventImage from "../assets/stock-event-image.jpeg";
import moment from "moment";
import { motion } from "framer-motion";

interface Props {
    title: string;
    flyerFront?: string;
    venue: {
        name: string;
        direction: string;
    };
    startTime: string;
    endTime: string;
    addEventToCart: () => void;
}

function Card({
    title,
    flyerFront,
    venue,
    startTime,
    endTime,
    addEventToCart,
}: Props) {
    return (
        <motion.div layout className="card">
            {
                <img
                    alt={title}
                    src={flyerFront ? flyerFront : stockEventImage}
                />
            }
            <a rel="noreferrer" target={"_blank"} href={venue.direction}>
                <img
                    alt="open-location"
                    className="location-btn"
                    src="/location.svg"
                />
                {venue.name}
            </a>
            <h2>{title}</h2>
            <p>Starts: {moment(startTime).format("DD.MM.YYYY, H:mm")} </p>
            <p>Ends: {moment(endTime).format("DD.MM.YYYY, H:mm")} </p>

            <div className="action-container">
                <button onClick={addEventToCart}>
                    {" "}
                    <img alt="add-event" className="add-btn" src="/add.svg" />
                    Add event
                </button>
            </div>
        </motion.div>
    );
}

export default Card;
