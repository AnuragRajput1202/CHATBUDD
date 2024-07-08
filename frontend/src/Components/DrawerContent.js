import React, { useContext, useState } from 'react'
import userContext from '../Context/UserContext'

const DrawerContent = ({ dp }) => {

    const context = useContext(userContext)
    const { sender, users } = context
    const [photo, setPhoto] = useState(null)
    const [showInput, setShowInput] = useState(false)
    const senderDetails = users.filter(user => user.email === sender)
    const [name, setName] = useState(senderDetails[0].name)
    const updatePicture = (e) => {
        if (e.target.files.length > 0) {
            setPhoto(URL.createObjectURL(e.target.files[0]))
            const formData = new FormData()
            formData.append('profile_picture', e.target.files[0])
            uploadPhoto(formData)
        }
    }

    const uploadPhoto = async (data) => {
        const response = await fetch(`http://localhost:8000/api/userdetails/updatedetails/profilepic/${sender}`,
            {
                method: 'PUT',
                body: data
            }
        )
        // eslint-disable-next-line
        const json = await response.json()
    }
    const toggleInput = () => {
        setShowInput(!showInput)
    }
    const editUsername = (e) => {
        setName(e.target.value)
    }
    const setUsername = async (e) => {
        console.log(e.target)
        if (e.key === "Enter") {
            e.target.blur()
            try {
                const response = fetch(`https://chatbudd-3rqh.onrender.com/api/userdetails/updatedetails/username/${sender}`,
                    {
                        method: "PUT",
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ name })
                    }
                )
                // eslint-disable-next-line
                const json = (await response).json()
            } catch (error) {

            }
        }
    }

    return (
        <div className="DrawerContents__Container p-4">
            <label htmlFor='photoSelector' className="dp-container d-flex justify-content-center align-items-center">
                <input type="file" onChange={updatePicture} hidden id='photoSelector' />
                {photo ? <div type='button' className="dp-update rounded-circle" style={{ border: '0.2px solid #c0c0c0', backgroundImage: `url(${photo})` }}> </div>
                    : <div type='button' className="dp-update rounded-circle" style={{ border: '0.2px solid #c0c0c0', backgroundImage: `url(${dp()})` }}> </div>}
                <div className="img-text">
                    <i className="fa-solid fa-camera text-white fs-6"></i>
                    <p className='text-white fs-6' style={{ margin: '0px' }}>CHANGE</p>
                    <p className='text-white fs-6' style={{ margin: '0px' }}>PROFILE PHOTO</p>
                </div>
            </label>
            <div className="user-details mt-5">
                <p className='text-secondary'>Your Name</p>
                <div className="name-details d-flex justify-content-between align-items-center">
                    <input onKeyUp={setUsername} onChange={editUsername} id="username-input" className={`username ${showInput && "username-show"} text-white`} value={name} />
                    <label htmlFor="username-input"><i type='button' onClick={toggleInput} className="fa-solid fa-pen text-white"></i></label>
                </div>
                <p className='text-secondary my-2'>This name will be visible to your chat buddies</p>
            </div>
        </div>
    )
}

export default DrawerContent
