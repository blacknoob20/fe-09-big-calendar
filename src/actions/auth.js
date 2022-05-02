import Swal from 'sweetalert2';
import { fetchNoToken, fetchYesToken } from '../helpers/fetch';
import { types } from '../types/types';
import { eventStartLogout } from './events';

export const startLogin = (email, password) => {
    // El thunk hace que el dispach lo reciba por parametro
    return async (disptach) => {

        const res = await fetchNoToken('auth', { email, password }, 'POST');
        const body = await res.json();

        if (body.ok) {
            localStorage.setItem('token', body.token);
            localStorage.setItem('token-ini-date', new Date().getTime());

            disptach(
                login({
                    uid: body.uid,
                    name: body.name
                })
            );

        } else {
            Swal.fire('Error', JSON.stringify(body.errors), 'error');
        }
    }
}

export const startRegister = (name, email, password) => {
    return async (dispach) => {

        const res = await fetchNoToken('auth/new', { name, email, password }, 'POST');
        const body = await res.json();

        if (body.ok) {
            localStorage.setItem('token', body.token);
            localStorage.setItem('token-ini-date', new Date().getTime());

            dispach(
                login({
                    uid: body.uid,
                    name: body.name
                })
            );

        } else {
            Swal.fire('Aviso', body.msg, 'warning');
        }
    }
}

export const startChecking = () => {
    return async (dispach) => {
        try {
            const res = await fetchYesToken('auth/renew');
            const body = await res.json();

            if (body.ok) {
                localStorage.setItem('token', body.token);
                localStorage.setItem('token-ini-date', new Date().getTime());

                dispach(
                    login({
                        uid: body.uid,
                        name: body.name
                    })
                );

            } else {
                // Swal.fire('Aviso', body.msg, 'warning');
                dispach(checkingFinsh());
            }

        } catch (error) {
            console.log('fetchYesToken()', error.message, error);
        }

    }
}

const checkingFinsh = () => ({ type: types.authCheckingFinish });

const login = (user) => ({
    type: types.authLogin,
    payload: user
});

export const startLogout = () => {
    return (dispach) => {
        localStorage.clear();

        dispach(eventStartLogout());
        dispach(logout());
    }
}

const logout = () => ({ type: types.authLogout });