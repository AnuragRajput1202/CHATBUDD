import React, { useContext, useEffect, useState } from 'react'
import Chats from './Chats'
import userContext from '../Context/UserContext'

const MessageBox = () => {
    const context = useContext(userContext)
    const { users, receiver, conversationId, incomingMessage, activeUsers } = context;
    const [message, setMessage] = useState("")
    const [chatMessages, setChatMessages] = useState([])
    const [messageSentFlag, setMessageSentFlag] = useState(false)
    const receiverDetails = users.filter(user => user.email === receiver)

    useEffect(() => {
        const getMessages = async () => {
            if (conversationId) {
                const response = await fetch(`http://localhost:8000/api/message/get/${conversationId}`,
                    {
                        method: 'GET',
                    }
                )
                // eslint-disable-next-line
                const json = await response.json()
                setChatMessages(json)
            }

        }
        try {
            getMessages()
        } catch (error) {
            console.log(error)
        }
        if (messageSentFlag) {
            setMessageSentFlag(false)
        }
        // eslint-disable-next-line
    }, [conversationId, receiver, messageSentFlag, activeUsers, incomingMessage])
    return (
        <>
            {!receiver ?
                <div className="message-container d-flex flex-column justify-content-center align-items-center text-secondary" style={{ width: '70%', overflow: 'hidden', backgroundColor:'#023047' }}>
                    <h2>Welcome User!</h2>
                    <p>You are now logged in. Feel free to connect with your contacts</p>
                </div>
                : receiverDetails.map((receiver) => {
                    return <Chats setMessageSentFlag={setMessageSentFlag} messageSentFlag={messageSentFlag} chatMessages={chatMessages} setChatMessages={setChatMessages} setMessage={setMessage} message={message} key={receiver._id} receiver={receiver} />
                })}
        </>
    )
}

export default MessageBox
