import React from 'react'
import { NavLink, Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar navbar-light bg-light">
      <div className="container-fluid">
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink className="nav-link" exact to="/">Home</NavLink>
            </li>
          </ul>
        </div>
        <Link className="btn btn-outline-primary" to="/users/addusers">Add User</Link>
      </div>
    </nav>
  )
}
export default Navbar;