import React, { useContext, useEffect } from 'react'
import ContactBox from '../Components/Contactbox'
import MessageBox from './MessageBox'
import userContext from '../Context/UserContext'

const ChatBox = () => {
  const context = useContext(userContext)
  const { getAllUsers, socket, sender, setActiveUsers, users, activeUsers } = context;

  useEffect(() => {
    if (sender) {
      socket.current.emit('addUsers', sender)
      socket.current.on('getUsers', users => {
        setActiveUsers(users)
      })
    }// eslint-disable-next-line
  }, [])

  useEffect(() => {
    getAllUsers()
    // eslint-disable-next-line
  }, [users])

  return (
    <>
      {!sender ? <div className="alert alert-danger" role="alert">
        Please LogIn first!
      </div>
        : <div className='chatbox-container d-flex' style={{ width: '100%', height: '100%', position: 'fixed' }}>
          <ContactBox />
          <MessageBox />
        </div>}
    </>
  )
}

export default ChatBox
