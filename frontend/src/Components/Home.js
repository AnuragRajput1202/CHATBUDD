import React, { useState } from 'react'
import image from '../assets/chatbudd-icon.webp'
import Login from './Login'
import Signup from './Signup'
import { Routes, Route, useNavigate } from 'react-router-dom'


const Home = () => {
    const navigate = useNavigate()
    const [home, setHome] = useState(true)
    const handleClick = () =>{
        navigate('/login')
        setHome(false)
    }
    return (
        <div className='app-container' style={{ height: '150vh' }}>
            <div className='nav' style={{ height: '220px', backgroundColor: '#219ebc' }}>
                <div className="header d-flex gap-3 align-items-center h-25" style={{ margin: '10px 190px 0px' }}>
                    <div className='icon rounded-circle mt-4 mx-1' style={{ height: '50px', width: '50px', backgroundImage: `url(${image})`, backgroundSize: 'cover', border: '2px solid white' }}></div>
                    <div className="title mt-4"><h1 className='text-white fs-4'>CHATBUDD</h1></div>
                </div>
            </div>
            <div className="wrapper-box shadow-lg bg-white rounded" style={{ height: '80%', margin: '-90px 190px 0px' }}>
                {home && <div className="home-page d-flex justify-content-center align-items-center flex-wrap" style={{ height: '100%', backgroundColor:'#edede9'}}>
                    <h1 className='text-center' style={{ color: '#219ebc' }}>Welcome to Chatbudd. Connect with friends, family and more</h1>
                    <div className= 'd-flex justify-content-center align-items-center gap-4' style={{marginTop:'-450px'}}>
                        <h2>Try for Free!</h2>
                        <button onClick={handleClick} className="btn btn-primary">login</button>
                    </div>
                </div>}
                <Routes>
                    {!home &&<Route element={<Login />} path='/login' />}
                    {!home &&<Route element={<Signup />} path='/signup' />}
                </Routes>
            </div>
        </div>

    )
}

export default Home
