import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { CalendarPage } from '../components/calendar/CalendarPage';
import { LoginPage } from '../components/auth/LoginPage';

export const AppRouter = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                        <Route path='/login' element={<LoginPage />} />
                        <Route path='*' element={<CalendarPage />} />

                    {/* <Route path="/" element={<App />}> */}
                        {/* <Route path="teams" element={<Teams />}>
                            <Route path=":teamId" element={<Team />} />
                            <Route path="new" element={<NewTeamForm />} />
                            <Route index element={<LeagueStandings />} />
                        </Route> */}
                    {/* </Route> */}
                </Routes>
            </BrowserRouter>
        </>
    )
}
