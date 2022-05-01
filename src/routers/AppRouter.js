import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { LoginPage } from '../components/auth/LoginPage';
import { CalendarPage } from '../components/calendar/CalendarPage';
import { startChecking } from '../actions/auth';
import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';

export const AppRouter = () => {
    const dispatch = useDispatch();
    const { checking, uid } = useSelector(state => state.auth);

    useEffect(() => {
        dispatch(startChecking());
    }, [dispatch]);

    if (checking) return (<h1>Espere...</h1>);

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path='/login' element={
                        <PublicRoute
                            element={<LoginPage />}
                            isAuthenticated={!!uid}
                        />
                    } />
                    <Route path='*' element={
                        <PrivateRoute
                            element={<CalendarPage />}
                            isAuthenticated={!!uid}
                        />
                    } />
                    {/*
                    <Route path='/login' element={<LoginPage />} />
                    <Route path='*' element={<CalendarPage />} />
                    */}

                    {/* <Route path="/" element={<App />}> */}
                    {/*
                    <Route path="teams" element={<Teams />}>
                            <Route path=":teamId" element={<Team />} />
                            <Route path="new" element={<NewTeamForm />} />
                            <Route index element={<LeagueStandings />} />
                    </Route>
                    */}
                    {/* </Route> */}
                </Routes>
            </BrowserRouter>
        </>
    )
}
