import React from "react";
import "./Spinner.scss";

function Spinner() {
    return (
        <div className="spinner-container">
            <div className="lds-ring">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    );
}

export default Spinner;
