import React, { useState, useRef, useContext } from 'react'
import profilePicture from '../assets/profile-picture.jpg'
import { Link, useNavigate } from 'react-router-dom'
import userContext from '../Context/UserContext'


const Signup = () => {
    const [userDetails, setuserDetails] = useState({ name: "", email: "", password: "", rePassword: "", gender: 'Gender', dateOfBirth: "", image: '' })
    const ref = useRef()
    const navigate = useNavigate()
    const context = useContext(userContext)
    const {setSender} = context

    const toggleUserDetails = (e) => {
        setuserDetails({ ...userDetails, [e.target.name]: e.target.value })

    }
    const changeImage = () => {
        ref.current.click()
    }
    const saveChanges = (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('name', userDetails.name)
        formData.append('email', userDetails.email)
        formData.append('gender', userDetails.gender)
        formData.append('password', userDetails.password)
        formData.append('date_of_birth', userDetails.dateOfBirth)
        formData.append('profile_picture', userDetails.image)
        loginRequest(formData)
    }
    const toggleUserImage = (e) => {
        if (e.target.files.length !== 0) {
            setuserDetails({ ...userDetails, [e.target.name]: e.target.files[0] })
        }
    }
    const loginRequest = async (data) => {
        try {
            const response = await fetch('http://localhost:8000/api/auth/createuser',
                {
                    method: 'POST',
                    body: data
                }
            )
            const json = await response.json()
            if (json.success) {
                setSender(userDetails.email)
                navigate('/chatbox')
            }
        } catch (error) {
            console.log(error)
        }

    }
    return (
        <section className="vh-100 rounded" style={{ backgroundColor: 'white' }}>
            <div className="container h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-lg-12 col-xl-11">
                        <div className="card text-black" style={{ borderRadius: '25px' }}>
                            <div className="card-body p-md-5">
                                <div className="row justify-content-center">
                                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                                        <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>

                                        <form onSubmit={saveChanges} id='userDetails' className="mx-1 mx-md-4">

                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                                                <div data-mdb-input-init className="form-outline flex-fill">
                                                    <input type="text" onChange={toggleUserDetails} id="form3Example1c" name='name' value={userDetails.name} className="form-control" style={{ width: '236px' }} />
                                                    <label className="form-label" htmlFor="form3Example1c">Your Name</label>
                                                    {userDetails.name<3&&<p className='text-danger' style={{margin:'0px', fontSize:'14px'}}>Minimum 3 characters</p>}
                                                </div>
                                            </div>
                                            <div className="d-flex flex-row align-items-center mb-4 mx-5 gap-1">
                                                <select defaultValue={userDetails.gender} data-mdb-select-init name='gender' onChange={toggleUserDetails} value={userDetails.gender}>
                                                    <option value="Gender" disabled>Gender</option>
                                                    <option value="Female">Female</option>
                                                    <option value="Male">Male</option>
                                                    <option value="Other">Other</option>
                                                </select>
                                                <div data-mdb-input-init className="form-outline flex-fill">
                                                    <input type="date" name='dateOfBirth' onChange={toggleUserDetails} id="birthday"></input>
                                                </div>
                                            </div>
                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                                                <div data-mdb-input-init className="form-outline flex-fill mb-0">    
                                                    <input type="email" name='email' value={userDetails.email} onChange={toggleUserDetails} id="form3Example3c" className="form-control" />
                                                    <label className="form-label" htmlFor="form3Example3c">Your Email</label>
                                                    {(userDetails.email.length < 5 || !userDetails.email.includes('@') || !userDetails.email.includes('.')) &&<p className='text-danger' style={{margin:'0px', fontSize:'14px'}}>Should be in <i>something@example.com</i> format</p>}
                                                </div>
                                            </div>

                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                                                <div data-mdb-input-init className="form-outline flex-fill mb-0">
                                                    <input type="password" name='password' value={userDetails.password} onChange={toggleUserDetails} id="form3Example4c" className="form-control" />
                                                    <label className="form-label" htmlFor="form3Example4c">Password</label>
                                                    {userDetails.password.length < 6&&<p className='text-danger' style={{margin:'0px', fontSize:'14px'}}>Minimum 6 characters</p>}
                                                </div>
                                            </div>

                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                                                <div data-mdb-input-init className="form-outline flex-fill mb-0">
                                                    <input type="password" name='rePassword' value={userDetails.rePassword} onChange={toggleUserDetails} id="form3Example4cd" className="form-control" />
                                                    <label className="form-label" htmlFor="form3Example4cd">Repeat your password</label>
                                                    {userDetails.rePassword!==userDetails.password&&<p className='text-danger' style={{margin:'0px', fontSize:'14px'}}>Same as password</p>}
                                                </div>
                                            </div>
                                            <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                                <button disabled={!userDetails.name||!userDetails.email||!userDetails.password||!userDetails.rePassword||userDetails.name.length<3||userDetails.email.length < 5 || !userDetails.email.includes('@') || !userDetails.email.includes('.') || userDetails.password.length < 6||userDetails.name.length<3||userDetails.rePassword!==userDetails.password} type='submit' data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-lg">Register</button>
                                            </div>

                                        </form>

                                    </div>
                                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex justify-content-center flex-wrap align-items-center order-1 gap-2 order-lg-2">
                                        <div className="App mx-4 text-center">
                                            <h4 className='text-center'>Add Image</h4>
                                            <div role='button' className='dp-container' onClick={changeImage} >
                                                {userDetails.image ? <img src={URL.createObjectURL(userDetails.image)} className='rounded-circle border border-2' width='300px' height='300px' alt="" />
                                                    : <img src={profilePicture} className='rounded-circle border border-2' width='300px' height='300px' alt="" />}
                                                <input name='image' type="file" ref={ref} hidden onChange={toggleUserImage} />
                                            </div>
                                        </div>
                                        <div className="footer">
                                            <p className="mb-5 pb-lg-2" style={{ color: '#393f81' }}>Already have an account? <Link to="/login"
                                                style={{ color: '#393f81' }}>Login here</Link></p>
                                        </div>
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

export default Signup
