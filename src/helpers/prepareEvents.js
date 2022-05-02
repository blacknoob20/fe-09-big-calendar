import moment from 'moment';

export const prepareEvents = (event = []) => {
    return event.map(
        (evt) => ({
            ...evt,
            end: moment(evt.end).toDate(),
            start: moment(evt.start).toDate(),
        })
    );
}