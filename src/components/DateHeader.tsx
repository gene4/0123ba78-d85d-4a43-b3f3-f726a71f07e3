import moment from "moment";
import React from "react";
import "./DateHeader.scss";

interface Props {
    date: string;
}

function DateHeader({ date }: Props) {
    return (
        <div className="date-container">
            <p>{moment(date).format("MMMM Do YYYY")}</p>
        </div>
    );
}

export default DateHeader;
