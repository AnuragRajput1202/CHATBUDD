import React, { useContext, useEffect, useState, useRef } from 'react'
import default_dp from '../assets/profile-picture.jpg'
import userContext from '../Context/UserContext'
import Message from './Message'
import Picker from 'emoji-picker-react'


const Chats = (props) => {
    const context = useContext(userContext)
    const { sender, receiver, conversationId, activeUsers, socket, setIncomingMessage, incomingMessage, setReceiver } = context
    const { name, profile_picture } = props.receiver
    const [file, setFile] = useState('')
    const [isTyping, setIsTyping] = useState(false)
    const [fileUrl, setFileUrl] = useState('')
    const [isOpen, setIsOpen] = useState(false)
    const scrollRef = useRef()
    const inputRef = useRef()
    const emojiMenuRef = useRef();

    //setting the scrollbar position at the bottom to fetch the latest position by default
    useEffect(() => {
        scrollRef.current?.scrollIntoView({ transition: 'smooth' })
    }, [props.chatMessages])

    //getting the incoming message in real time
    useEffect(() => {
        socket.current.on('getMessage', msg => {
            setIncomingMessage({
                ...msg,
                createdAt: Date.now()
            })
        })// eslint-disable-next-line
    }, [])

    //This is for getting the typing indicator
    useEffect(() => {
        socket.current.on('getTypingIndicator', data => {
            if(receiver===data.from){
                setIsTyping(data.flag)
            } else{
                setIsTyping(false)
            }
        })// eslint-disable-next-line
    }, [receiver])

    //syncing the incoming message with the real message/chat history 
    useEffect(() => {
        incomingMessage && receiver === incomingMessage.senderId &&
            props.setChatMessages(prev => [...prev, incomingMessage])
        // eslint-disable-next-line
    }, [incomingMessage, conversationId])

    //This is for displaying the profile_picture
    const dp = () => {
        if (profile_picture) {
            return `https://chatbudd-3rqh.onrender.com/${profile_picture}`
        }
        else {
            return default_dp
        }
    }

    //onchange for message input
    const handleChange = (e) => {
        socket.current.emit('sendTypingIndicator', { from: sender, to: receiver, flag: true })
        props.setMessage(e.target.value)
    }

    const onBlur = () =>{
        socket.current.emit('sendTypingIndicator', { from: sender, to: receiver, flag: false })
    }

    //sending message on enter press
    const sendMessage = (e) => {
        if (e.key === "Enter") {
            inputRef.current.blur()
            let message = {}
            if (file) {
                message = {
                    senderId: sender,
                    receiverId: receiver,
                    conversationId: conversationId,
                    value: fileUrl,
                    type: 'file'
                }
            }
            else {
                message = {
                    senderId: sender,
                    receiverId: receiver,
                    conversationId: conversationId,
                    value: e.target.value,
                    type: 'text'
                }
            }
            socket.current.emit('sendMessage', message)

            addMessage(message)
            props.setMessageSentFlag(!props.messageSentFlag)
            props.setMessage('')
            setFile('')
        }
    }

    //adding the message sent in the database 
    const addMessage = async (message) => {
        const { senderId, receiverId, conversationId, value, type } = message
        const response = await fetch('https://chatbudd-3rqh.onrender.com/api/message/add',
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ senderId, receiverId, conversationId, value, type })
            }
        )
        // eslint-disable-next-line
        const json = await response.json()
    }

    //handling the file change if user desires to send a document 
    const fileChange = (e) => {
        if (e.target.files.length > 0) {
            inputRef.current.focus()
            props.setMessage(e.target.files[0].name)
            setFile(e.target.files[0])
            const formData = new FormData()
            formData.append('name', e.target.files[0].name)
            formData.append('file', e.target.files[0])
            uploadFile(formData)
        }
    }

    //uploading the file sent in the database
    const uploadFile = async (data) => {
        const response = await fetch('https://chatbudd-3rqh.onrender.com/api/file/fileupload', {
            method: 'POST',
            body: data
        })
        const json = await response.json()
        setFileUrl(json)
    }

    //to open the emoji picker
    const toggleEmojiPicker = () => {
        inputRef.current.focus()

        setIsOpen(!isOpen)
    }

    //on choosing the emoji, displaying it on the input message field
    const onEmojiClick = (emojiObject) => {
        inputRef.current.focus()
        const start = props.message.substring(0, inputRef.current.selectionStart)
        const end = props.message.substring(inputRef.current.selectionStart)
        const newMessage = start + emojiObject.emoji + end
        props.setMessage(newMessage)
    };

    //this is to close the emoji picker if user clicks anywhere on the screen except the picker itself
    useEffect(() => {
        const closeEmojiPicker = (e) => {
            if (emojiMenuRef.current) {
                if (!emojiMenuRef.current.contains(e.target)) {
                    setIsOpen(false)
                }
            }
        }
        document.addEventListener('mousedown', closeEmojiPicker)
        return () => {
            document.removeEventListener('mousedown', closeEmojiPicker)
        }
    })

    //to close the chat with current selected receiver
    const closeChat = () => {
        setReceiver('')
    }

    //this will clear the chat history from both ends...
    const clearChatHistory = async () => {
        try {
            await fetch(`https://chatbudd-3rqh.onrender.com/api/message/delete/${conversationId}`, {
                method: 'DELETE'
            })
            props.setChatMessages([])
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className="chat-container d-flex flex-column" style={{ height: '100%', width: '70%', overflowY: 'scroll', overflowX: 'hidden', backgroundColor: '#051923' }}>
            <div className='pb-1' style={{ position: 'sticky', top: '0' }}>
                <div className="navbar d-flex justify-content-between align-items-center px-4 py-2" style={{ backgroundColor: '#023047', height: '4rem', color: 'white', width: '100%' }}>
                    <div className="d-flex gap-3 align-items-center">
                        <div className="dp-container">
                            <div className="dp rounded-circle" style={{ border: '0.2px solid #c0c0c0', width: '3rem', height: '3rem', backgroundImage: `url(${dp()})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}></div>
                        </div>
                        <div className="name-status">
                            <p style={{ margin: '0px', fontSize: '17px' }}>{name}</p>
                            {activeUsers.find(user => user.userId === receiver) ? <p style={{ margin: '0px', fontSize: '14px', color: '#c0c0c0' }}>Online</p>
                                : <p style={{ margin: '0px', fontSize: '14px', color: '#c0c0c0' }}>Offline</p>}
                        </div>
                    </div>
                    <div className="btn-group dropstart">
                        <i type="button" className="fa-solid fs-5 fa-ellipsis-vertical text-secondary" data-bs-toggle="dropdown" aria-expanded="false"></i>
                        <ul className="dropdown-menu dropdown-menu-dark" style={{ marginRight: 'auto' }}>
                            <li onClick={clearChatHistory} type="button" className="dropdown-item" >Clear chat history</li>
                            <li onClick={closeChat} type="button" className="dropdown-item" >Close chat</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="container">
                {props.chatMessages.map((message) => {
                    return <Message key={message._id} message={message} />
                })}
            </div>
            <div ref={scrollRef} className='pt-1 align-self-end' style={{ width: '100%', marginTop: 'auto', position: 'sticky', bottom: '0' }}>
                <div className="navbar d-flex justify-content-center align-items-center px-4 gap-4 py-2" style={{ backgroundColor: '#023047', height: '4.5rem', color: 'white', width: '100%' }}>
                    {isOpen && <div ref={emojiMenuRef} className={`wrapper ${isOpen && "wrapper-isOpen"}`} style={{ position: 'relative', alignSelf: 'flex-start' }}>
                        <div className='picker-container' style={{ position: 'absolute', bottom: '0', left: '10px' }}><Picker onEmojiClick={onEmojiClick} /></div>
                    </div>}
                    <i type='button' className="fa-regular fa-face-smile fs-3 text-secondary" onClick={toggleEmojiPicker} style={{ top: '0', left: '0' }}></i>
                    <input onChange={fileChange} value='' type="file" hidden id='fileSelector' />
                    <label type='button' htmlFor="fileSelector">
                        <i className="fa-solid fa-paperclip fs-3 text-secondary"></i>
                    </label>
                    {!isTyping ? <input onBlur={onBlur} ref={inputRef} id='messageInput' onKeyUp={sendMessage} type="text" value={props.message} onChange={handleChange} className='rounded d-flex align-items-center shadow-lg' placeholder='type a message' style={{ width: '80%', padding: '12px', backgroundColor: '#edede9', border: 'none', outline: 'none' }} />
                        : <input type="text" value="Typing..." className='rounded d-flex align-items-center shadow-lg' placeholder='type a message' style={{ width: '80%', padding: '12px', backgroundColor: '#edede9', border: 'none', outline: 'none' }} />}
                    <i className="fa-solid fa-microphone-lines fs-3 text-secondary"></i>
                </div>
            </div>
        </div>
    )
}

export default Chats
