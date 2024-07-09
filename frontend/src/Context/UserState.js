import UserContext from "./UserContext";
import { io } from 'socket.io-client'
import React, { useState, useRef, useEffect } from 'react'

const UserState = (props) => {
    const [users, setUsers] = useState([])
    const [sender, setSender] = useState(null)
    const [receiver, setReceiver] = useState(null)
    const [conversationId, setConversationId] = useState("")
    const [activeUsers, setActiveUsers] = useState([])
    const [incomingMessage, setIncomingMessage] = useState()

    const socket = useRef()

    useEffect(() => {
        socket.current = io('https://chatbudd-1.onrender.com')
    }, [])

    const getAllUsers = async () => {
        const response = await fetch('https://chatbudd-3rqh.onrender.com/api/userdetails/getusers',
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        )
        const json = await response.json()
        setUsers(json)
    }
    const addConversation = async (senderId, receiverId) => {
        try {
            const response = await fetch('https://chatbudd-3rqh.onrender.com/api/conversation/add',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ senderId, receiverId })
                }
            )
            // eslint-disable-next-line
            const json = await response.json()
        }
        catch (error) {
            console.log(error)
        }
    }


    const getConversation = async (senderId, receiverId) => {
        if (receiverId) {
            try {
                const response = await fetch('https://chatbudd-3rqh.onrender.com/api/conversation/get',
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ senderId, receiverId })
                    }
                )
                const json = await response.json()
                setConversationId(json._id)
            }
            catch (error) {
                console.log(error)
            }
        }

    }
    return (
        <UserContext.Provider value={{ users, activeUsers, setActiveUsers, incomingMessage, setIncomingMessage, socket, sender, setSender, getAllUsers, getConversation, receiver, setReceiver, conversationId, addConversation }}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserState
