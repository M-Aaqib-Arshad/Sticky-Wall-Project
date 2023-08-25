import { message } from 'antd'
import { auth } from 'config/firebase'
import { useAuthContext } from 'contexts/AuthContext'
import { signOut } from 'firebase/auth'
import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  const { isAuth, dispatch } = useAuthContext()

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        message.success("Signout successful")
        dispatch({ type: "SET_LOGGED_OUT" })
      })
      .catch(err => {
        message.error("Signout not successful")
      })
  }
  return (
    <header>
      <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
        <div className="container">
          <Link to="/" className="navbar-brand">Logo</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to="/" className="nav-link">Home</Link>
              </li>
              <li className="nav-item">
                <Link to="/about" className="nav-link">About</Link>
              </li>
              <li className="nav-item">
                <Link to="/contact" className="nav-link">Contact</Link>
              </li>
            </ul>
            <div className="d-flex gap-3">
              {!isAuth
                ?<>
                 <Link to='/auth/login' className='btn btn-info text-white'>login</Link>
                    <Link to='/auth/register' className='btn btn-warning text-white'>Register</Link> 
                </>
                : <>
                  <Link to="/dashboard" className="btn btn-info">Dashboard</Link>
                  <button className='btn btn-danger ms-2' onClick={handleLogout}>Logout</button>
                {/* {user.reloadUserInfo.providerUserInfo[0].photoUrl &&  <Avatar size="large" src={user.reloadUserInfo.providerUserInfo[0].photoUrl} /> } */}
                </>
              }
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}
