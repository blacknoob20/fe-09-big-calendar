import React from 'react';

export const CalendarEvent = ({ event }) => {
    const { title, user } = event;

    return (
        <div>
            <span>{title}</span>
            <b>--{user.name}</b>
        </div>
    )
}
