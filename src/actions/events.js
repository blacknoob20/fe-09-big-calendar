import { types } from "../types/types"

export const eventAddNew = (event) => {
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

export const eventUpdated = (event) => ({
    type: types.eventUpdate,
    payload: event,
});

export const eventDeleted = () => ({ type: types.eventDeleted });
