import React, { useContext, useState } from 'react'
import loginImage from '../assets/login-image.jpg'
import image from '../assets/chatbudd-icon.webp'
import { Link, useNavigate } from 'react-router-dom'
import userContext from '../Context/UserContext'

const Login = () => {
    const navigate = useNavigate()
    const [credentials, setCredentials] = useState({ email: "", password: "" })
    const context = useContext(userContext)
    const { setSender } = context

    const toggleCredentials = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    const handleClick = () => {
        userLogin(credentials.email, credentials.password)
    }
    const userLogin = async (email, password) => {
        try {
            const response = await fetch('https://chatbudd-3rqh.onrender.com/api/auth/login',
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password })
                }
            )
            // eslint-disable-next-line
            const json = await response.json()
            if (json.success) {
                setSender(email)
                navigate('/chatbox')
            } else {
                alert("Invalid credentials!")
            }
        } catch (error) {
            alert('Internal error occured, Please try again')
        }

    }
    return (
        <section className="vh-100 rounded" style={{ backgroundColor: 'white' }}>
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col col-xl-10">
                        <div className="card" style={{ borderRadius: '1rem' }}>
                            <div className="row g-0">
                                <div className="col-md-6 col-lg-5 d-none d-md-block">
                                    <img src={loginImage}
                                        alt="login form" className="img-fluid" style={{ borderRadius: '1rem 0 0 1rem' }} />
                                </div>
                                <div className="col-md-6 col-lg-7 d-flex align-items-center">
                                    <div className="card-body p-4 p-lg-5 text-black">

                                        <form>

                                            <div className="d-flex align-items-center mb-3 pb-1 gap-2">
                                                <div className='icon rounded-circle mt-2' style={{ height: '50px', width: '50px', backgroundImage: `url(${image})`, backgroundSize: 'cover', border: '2px solid white' }}></div>
                                                <span className="h1 fw-bold mb-0">CHATBUDD</span>
                                            </div>

                                            <h5 className="fw-normal mb-3 pb-3" style={{ letterSpacing: '1px' }}>Sign into your account</h5>

                                            <div data-mdb-input-init className="form-outline mb-4">
                                                <input type="email" id="form2Example17" onChange={toggleCredentials} name="email" value={credentials.email} className="form-control form-control-lg" />
                                                <label className="form-label" htmlFor="form2Example17">Email address</label>
                                                <p className='text-secondary'>Should be in <i>something@example.com</i> format</p>
                                            </div>

                                            <div data-mdb-input-init className="form-outline mb-4">
                                                <input type="password" id="form2Example27" onChange={toggleCredentials} name="password" value={credentials.password} className="form-control form-control-lg" />
                                                <label className="form-label" htmlFor="form2Example27">Password</label>
                                                <p className='text-secondary '>Minimum 6 characters long </p>
                                            </div>
                                            <div className="pt-1 mb-4">
                                                <button disabled={credentials.email.length < 5 || !credentials.email.includes('@') || !credentials.email.includes('.') || credentials.password.length < 6} data-mdb-button-init data-mdb-ripple-init onClick={handleClick} className="btn btn-dark btn-lg btn-block" type="button">Login</button>
                                            </div>

                                            <a className="small text-muted" href="/">Forgot password?</a>
                                            <p className="mb-5 pb-lg-2" style={{ color: '#393f81' }}>Don't have an account? <Link to="/signup"
                                                style={{ color: '#393f81' }}>Register here</Link></p>
                                        </form>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Login
