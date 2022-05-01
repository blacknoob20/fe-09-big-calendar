import React, { useState } from 'react';
import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import moment from 'moment';

import { Navbar } from '../ui/Navbar';
import { messages } from '../../helpers/calendar-messages-es';
import { CalendarEvent } from './CalendarEvent';
import { CalendarModal } from './CalendarModal';

// Importar CSS
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'moment/locale/es';
import { useDispatch, useSelector } from 'react-redux';
import { uiOpenModal } from '../../actions/ui';
import { eventClearActiveEvt, eventDeleted, eventSetActive } from '../../actions/events';

const localizer = momentLocalizer(moment);
// const myEventsList = [{
//     title: 'Cumpleanios Sarah',
//     start: moment().toDate(),
//     end: moment().add(2, 'hours').toDate(),
//     user: {
//         _id: '123',
//         name: 'Cristhian'
//     }
// }]

export const CalendarPage = () => {
    const dispatch = useDispatch();
    const { events, activeEvent } = useSelector(state => state.calendar);

    const [lastView, setLastView] = useState(localStorage.getItem('lastView') || Views.MONTH);

    const onDobleClick = (e) => {
        // console.log(e);
        console.log('Doble click.');
        dispatch(uiOpenModal());
    }
    const onSelectEvent = (e) => {
        // console.log(e);
        dispatch(eventSetActive(e));
    }
    const onViewChange = (e) => {
        // console.log(e);
        setLastView(e);
        localStorage.setItem('lastView', e);
    }
    const onSelectSlot = (e) => {
        dispatch(eventClearActiveEvt());
    }
    const handleButtonNew = () => {
        dispatch(uiOpenModal());
    }
    const handleButtonDelete = () => {
        dispatch(eventDeleted(activeEvent));
    }
    const evtStyleGetter = (event, start, end, isSelected) => {
        const style = {
            backgroundColor: '#367CF7',
            borderRadius: '0px',
            opacity: 0.8,
            display: 'block',
            color: 'white'
        }

        return { style };
    }

    return (
        <div className='calendar-page'>
            <Navbar />
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 500 }}
                messages={messages}
                eventPropGetter={evtStyleGetter}
                onDoubleClickEvent={onDobleClick}
                onSelectEvent={onSelectEvent}
                onView={onViewChange}
                view={lastView}
                onSelectSlot={onSelectSlot}
                selectable={true}
                components={
                    {
                        event: CalendarEvent // Es referencia al componente <CalendarEvent />
                    }
                }
            />
            <button
                className='btn btn-primary fab'
                onClick={handleButtonNew}
            >
                <i className='fas fa-plus'></i>
            </button>
            {
                activeEvent &&
                <button
                    className='btn btn-danger fab-danger'
                    onClick={handleButtonDelete}
                >
                    <i className='fas fa-trash'></i>
                    <span> Borrar evento</span>
                </button>
            }
            <CalendarModal />
        </div>
    );

}
