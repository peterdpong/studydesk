import React from 'react';
import Navbar from '../../../components/app/navbar';
import { protectedRoute } from '../../../lib/hoc/protectedRoute';


function Timetable() {
    return (
        <div>
            <Navbar/>
            timetable
        </div>
    )
}

export default protectedRoute(Timetable);