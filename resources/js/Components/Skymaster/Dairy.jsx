import React, {Component, useState} from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";

import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(Calendar);

export default function Diary({ props }) {

    const [state, setState] = useState({
        events: [
            {
                start: moment().toDate(),
                end: moment().add(1, "days").toDate(),
                title: "Some title",
            },
        ],
    })

    const onEventResize = (data) => {
        const { start, end } = data;
        console.log(data);
        setState((state) => {
            state.events[0].start = start;
            state.events[0].end = end;
            return { events: [...state.events] };
        });
    };

    const onEventDrop = (data) => {
        console.log('Event Dropped', data);
    };

    const eventClicked = (data) => {
        console.log('Single Clicked', data);
    };

    const eventDoubleClicked = (data) => {
        console.log('Double Clicked', data);
    };

    const slotClicked = (data) => {
        console.log('Slot Clicked', data);
    };

    return (
        <DnDCalendar
            defaultDate={moment().toDate()}
            defaultView="month"
            events={state.events}
            localizer={localizer}
            onEventDrop={onEventDrop}
            onEventResize={onEventResize}
            onSelectEvent={eventClicked}
            selectable={true}
            onSelecting={slotClicked}
            onDoubleClickEvent={eventDoubleClicked}
            resizable
            style={{ height: "100vh" }}
        />
    )
}
