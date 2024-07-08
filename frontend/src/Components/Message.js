import React, { useContext } from 'react'
import userContext from '../Context/UserContext'
import pdfIcon from '../assets/pdfIcon.jpg'

const Message = (props) => {
    const { message } = props
    const context = useContext(userContext)
    const { sender } = context

    const sentStyle = {
        backgroundColor: "#a2d2ff",
        maxWidth: "60%",
        width: "fit-content",
        padding: "4px",
        marginLeft: "auto",
        fontSize: "14px",
        marginRight: '20px',
        transition: 'all .3s ease-in-out'
    }
    const receivedStyle = {
        backgroundColor: "#edede9",
        maxWidth: "60%",
        width: "fit-content",
        padding: "4px",
        marginRight: "auto",
        fontSize: "14px",
        marginLeft: '20px',
        transition: 'all .3s ease-in-out'
    }
    const formatDate = (date) => {
        const time = new Date(date)
        return time.getHours() + ":" + time.getMinutes()
    }
    const downloadFile = (e, fileUrl) => {
        e.preventDefault()
        try {
            fetch(fileUrl)
                .then(response => response.blob())
                .then(blob => {
                    const url = window.URL.createObjectURL(blob);
                    const link = document.createElement('a');
                    link.style.display = 'none'
                    link.href = url;
                    link.download = fileUrl.slice(fileUrl.lastIndexOf('/') + 1)
                    document.body.appendChild(link);
                    link.click()

                    window.URL.revokeObjectURL(url)
                }).catch(error => console.log("error while downloading the file", error.message));
        } catch (error) {
            console.log(error.message)
        }
    }


    return (
        <>
            {sender === message.senderId ?
                <div className="message-container my-2 text-break rounded d-flex gap-2" style={sentStyle}>
                    {message.type === 'file' && !message.value.includes('pdf') && <img src={message.value} width="350px" height="300px" alt="file" />}
                    {message.type === 'file' && message.value.includes('pdf') && <><img src={pdfIcon} width="40px" height="40px" alt="file"></img>{message.value.slice(message.value.lastIndexOf('/') + 1)}</>}
                    {message.type === 'text' && <p style={{ margin: '0px' }}>{message.value}</p>}
                    <p style={{ textAlign: 'right', fontSize: '12px', margin: '0px', wordBreak: 'keep-all', alignSelf: 'end' }}>{formatDate(message.createdAt)}</p>
                </div>
                : <div className="message-container my-1  rounded d-flex gap-2" style={receivedStyle}>
                    {message.type === 'file' && !message.value.includes('pdf') && <><img src={message.value} width="350px" height="300px" alt="file" /><i type="button" onClick={(e) => downloadFile(e, message.value)} className="fa-regular fa-circle-down fs-4 align-self-end"></i></>}
                    {message.type === 'file' && message.value.includes('pdf') && <><img src={pdfIcon} width="40px" height="40px" alt="file"></img>{message.value.slice(message.value.lastIndexOf('/') + 1)}<i type="button" onClick={(e) => downloadFile(e, message.value)} className="fa-regular fa-circle-down fs-4 align-self-end"></i></>}
                    {message.type === 'text' && <p style={{ margin: '0px' }}>{message.value}</p>}
                    <p style={{ textAlign: 'right', fontSize: '12px', margin: '0px', wordBreak: 'keep-all', alignSelf: 'end' }}>{formatDate(message.createdAt)}</p>
                </div>}
        </>
    )
}

export default Message
