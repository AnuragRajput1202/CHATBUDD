import React, { useContext } from 'react'
import default_dp from '../assets/profile-picture.jpg'
import UserContext from '../Context/UserContext'

const ContactList = (props) => {
    const context = useContext(UserContext)
    const { setReceiver, addConversation, sender, } = context
    const dp = () => {
        if (props.receiver.profile_picture) {
            return `https://chatbudd-3rqh.onrender.com/${props.receiver.profile_picture}`
        }
        else {
            return default_dp
        }
    }
    const showChat = () => {
        setReceiver(props.receiver.email)
        addConversation(sender, props.receiver.email)
    }

    return (
        <>
            <div type='button' onClick={showChat} className="contact" style={{ backgroundColor: '#051923', height: '4.5rem', color: 'white', width: '100%' }}>
                <div className="contact-details d-flex p-2 align-items-center">
                    <div className="dp-container">
                        <div className="dp rounded-circle" style={{ border: '0.2px solid #c0c0c0', width: '3.3rem', height: '3.3rem', backgroundImage: `url(${dp()})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}></div>
                    </div>
                    <div className="details-container mx-3" style={{ width: '90%' }}>
                        <div className='top d-flex justify-content-between'>
                            <div className="name">{props.receiver.name}</div>
                        </div>
                    </div>
                </div>
                <div className='d-flex justify-content-end'>
                    <div className="divider bg-secondary" style={{ padding: '0.1px 0px 0px 0px', width: '81%', }}></div>
                </div>
            </div>

        </>
    )
}

export default ContactList
