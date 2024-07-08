import React, { useContext, useState } from 'react'
import default_dp from '../assets/profile-picture.jpg'
import Drawer from './Drawer'
import userContext from '../Context/UserContext'
import { useNavigate } from 'react-router-dom'

const UserDetails = (props) => {
    const { search, setSearch } = props
    const [isOpen, setIsOpen] = useState(false)
    const context = useContext(userContext)
    const { socket, sender, setActiveUsers, activeUsers } = context
    const navigate = useNavigate()

    const dp = () => {
        if (props.sender.profile_picture) {
            return `https://chatbudd-3rqh.onrender.com/${props.sender.profile_picture}`
        }
        else {
            return default_dp
        }
    }
    const handleChange = (e) => {
        setSearch(e.target.value)
    }

    const toggleDrawer = () => {
        setIsOpen(!isOpen)
    }

    const logout = (e) => {
        socket.current.emit('removeUser', sender)
        socket.current.on('loggedOutUser', user => {
            setActiveUsers(user)
        })
        navigate('/')
        navigate(0)
    }
    return (
        <>
            <Drawer isOpen={isOpen} toggleDrawer={toggleDrawer} dp={dp} />
            <div className='pb-1' style={{ position: 'sticky', top: '0', backgroundColor: "#051923", borderBottom: '0.1px solid #6C757D ' }}>
                <div className="navbar d-flex justify-content-between align-items-center px-4 py-2" style={{ backgroundColor: '#023047', height: '4rem', color: 'white', width: '100%' }}>
                    <div type='button' onClick={toggleDrawer} className="dp-container">
                        <div className="user-dp rounded-circle" style={{ border: '0.2px solid #c0c0c0', width: '3rem', height: '3rem', backgroundImage: `url(${dp()})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }} ></div>
                    </div>
                    <div className="menu-container">
                        <div className="btn-group dropstart">
                            <i type="button" className="fa-solid fs-5 fa-ellipsis-vertical text-secondary" data-bs-toggle="dropdown" aria-expanded="false"></i>
                            <ul className="dropdown-menu dropdown-menu-dark" style={{ marginRight: 'auto' }}>
                                <li onClick={toggleDrawer} type="button" className="dropdown-item" >Update Profile</li>
                                <li type="button" className="dropdown-item" >Change Password</li>
                                <li type='button' onClick={logout} className="dropdown-item" >Log Out</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <input placeholder='search' onChange={handleChange} value={search} className="d-flex align-items-center text-secondary search-bar mt-1 mb-1 mx-2 rounded p-2" style={{ width: '96%', backgroundColor: '#023047', height: '2.3rem', border: 'none', outline: 'none' }} />
            </div >
        </>
    )
}

export default UserDetails
