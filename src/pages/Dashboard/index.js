import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Home from './Home'
import UpdateTodo from './Home/UpdateTodo'

export default function Index() {
    return (
        <div className='dashboard'>
            <Routes>
                <Route path='/' element={<Navigate to="/dashboard/todos" />} />
                <Route path='/todos' element={<Home />} />
                <Route path='/todos/:id' element={<UpdateTodo />} />
                {/* <Route path='register' element={<Register />} />
            <Route path='forgot-password' element={<ForgotPassword />} />
        <Route path='reset-password' element={<ResetPassword />} /> */}
                <Route path="*" element={<h1>404</h1>} />
            </Routes>
        </div>
    )
}