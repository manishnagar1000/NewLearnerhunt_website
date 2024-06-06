import React from 'react';

const FormatTimestamp = ({ timestamp }) => {
    const dateObject = new Date(timestamp);

    const formattedTime = dateObject.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    });

    const formattedDate = dateObject.toLocaleDateString("en-US", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });

    return (
        <span>
            {formattedTime}, {formattedDate}
        </span>
    );
};

export default FormatTimestamp;