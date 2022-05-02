import Swal from "sweetalert2";
import { fetchYesToken } from "../helpers/fetch"
import { prepareEvents } from "../helpers/prepareEvents";
import { types } from "../types/types"

export const eventStartAddNew = (event) => {
    return async (dispatch, getState) => {
        const { uid, name } = getState().auth;

        try {
            const res = await fetchYesToken('events', event, 'POST');
            const body = await res.json();

            if (body.ok) {
                console.log(body.evento);
                event._id = body.evento.id;
                event.user = {
                    _id: uid,
                    name: name
                }

                dispatch(eventAddNew(event));
            }

        } catch (error) {
            console.log(error);
        }
    }
}

const eventAddNew = (event) => {
    return {
        type: types.eventAddNew,
        payload: event
    }
}

export const eventSetActive = (event) => {
    return {
        type: types.eventSetActive,
        payload: event
    }
}

export const eventClearActiveEvt = () => ({ type: types.eventClearActiveEvt });

export const eventStartUpdated = (event) => {
    return async (dispatch) => {
        try {
            const res = await fetchYesToken(`events/${event._id}`, event, 'PUT');
            const body = await res.json();

            if (body.ok) {
                dispatch(eventUpdated(event));
            } else {
                Swal.fire('Error', body.msg, 'error');
            }
        } catch (error) {
            console.log(error);
        }
    }
}

const eventUpdated = (event) => ({
    type: types.eventUpdate,
    payload: event,
});

export const eventStartDeleted = (event) => {
    return async (dispatch, getState) => {
        const { _id } = getState().calendar.activeEvent;

        try {
            const res = await fetchYesToken(`events/${_id}`, {}, 'DELETE');
            const body = await res.json();

            if (body.ok) {
                dispatch(eventDeleted(event));
            } else {
                Swal.fire('Error', body.msg, 'error');
            }
        } catch (error) {
            console.log(error);
        }
    }
}

const eventDeleted = () => ({ type: types.eventDeleted });

export const eventStartLoading = () => {
    return async (dispatch) => {
        try {
            const res = await fetchYesToken('events');
            const body = await res.json();
            const events = prepareEvents(body.msg);

            dispatch(eventLoaded(events));

        } catch (error) {
            console.log(error);
        }
    }
};

const eventLoaded = (events) => ({
    type: types.eventLoaded,
    payload: events
});

export const eventStartLogout = () => (dispatch => dispatch(eventLogout()));
const eventLogout = () => ({ type: types.eventLogout });