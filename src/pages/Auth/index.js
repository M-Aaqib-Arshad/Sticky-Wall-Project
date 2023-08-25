import React from 'react'
import { Route, Routes } from 'react-router-dom'
// Components
import Header from '../../components/Header'
import Footer from '../../components/Footer'


import Login from './login'
import Register from './Register'
import NoPage from '../../components/NoPage'
import ForgotPassword from './ForgotPassword'
import ResetPassword from './ResetPassword'

export default function Index() {
    return (
        <>
            <Header />
            <main>
            <Routes>
                <Route path='login' element={<Login />} />
                <Route path='register' element={<Register />} />
                <Route path='forgot-password' element={<ForgotPassword />} />
                <Route path='reset-password' element={<ResetPassword />} />
                <Route path="*" element={<NoPage />} />
            </Routes>
            </main>
            <Footer />
        </>
    )
}
