import React from 'react';
import Navbar from '../../../components/app/Navbar';
import { protectedRoute } from '../../../lib/hoc/protectedRoute';


function Timetable() {
    return (
        <div>
            <Navbar/>
            Timetable Index
        </div>
    )
}

export default protectedRoute(Timetable);