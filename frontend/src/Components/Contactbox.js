import React, { useContext, useState, useEffect } from 'react'
import userContext from '../Context/UserContext'
import UserDetails from './UserDetails'
import ContactList from './ContactList'

const Contactbox = () => {
    const [search, setSearch] = useState("")
    const context = useContext(userContext)
    const { users, sender, receiver, getConversation } = context
    const senderDetails = users.filter(user => user.email === sender)
    const receivers = users.filter(user => user.email !== sender && user.name.toLowerCase().includes(search))

    useEffect(() => {
        getConversation(sender, receiver)
        // eslint-disable-next-line
    }, [receiver])

    return (
        <div className="contacts-pane" style={{ height: '100%', width: '30%', overflowY: 'scroll',overflowX: 'hidden', backgroundColor: '#051923' }}>
            {senderDetails.map((sender) => {
                return <UserDetails key={sender._id} sender={sender} search={search} setSearch={setSearch} />
            })}
            {receivers.map((receiver) => {
                return <ContactList key={receiver.email} receiver={receiver} />
            })}
        </div>
    )
}

export default Contactbox
