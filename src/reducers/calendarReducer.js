import moment from 'moment';
import { types } from '../types/types';

const mSarahBirthdate = moment('20/03/2022', 'dd/mm/yyyy');
const initState = {
    events: [
        {
            id: new Date().getTime(),
            title: 'Cumpleanios Sarah',
            start: mSarahBirthdate.toDate(),
            end: mSarahBirthdate.add(2, 'hours').toDate(),
            user: {
                _id: '123',
                name: 'Cristhian'
            }
        }
    ]
}

export const calendarReducer = (state = initState, action) => {
    switch (action.type) {
        case types.eventSetActive:
            return {
                ...state,
                activeEvent: action.payload
            };
        case types.eventAddNew:
            return {
                ...state,
                events: [
                    ...state.events,
                    action.payload
                ]
            };
        case types.eventClearActiveEvt:
            return {
                ...state,
                activeEvent: null,
            }
        case types.eventUpdate:
            return {
                ...state,
                events: state.events.map(
                    e => (e.id === action.payload.id ? action.payload : e)
                ),
            }
        case types.eventDeleted:
            return {
                ...state,
                events: state.events.filter(
                    e => (e.id === state.id)
                ),
                activeEvent: null
            }
        default:
            return state;
    }
}