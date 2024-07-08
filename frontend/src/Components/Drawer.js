import React from 'react'
import DrawerContent from './DrawerContent'

const Drawer = ({ isOpen, toggleDrawer, dp }) => {
    return (
        <div className={`Drawer__Container ${isOpen && "Drawer__Container--isOpen"}`}>
            <div className="back-button-container d-flex align-items-end p-4" style={{ backgroundColor:'#023047', height: '150px', color: 'white' }}>
                <div className="d-flex align-items-center">
                    <i type='button' onClick={toggleDrawer} className="fa-solid fa-arrow-left-long fs-4 mx-4 text-white"></i>
                    <h3 className='text-white'>Profile</h3>
                </div>
            </div>
            <div className="divider" style={{ backgroundColor: '#6C757D', padding: '0.1px 0px 0px 0px', width: '100%', }}></div>
            <DrawerContent dp={dp} />
        </div>
    )
}

export default Drawer 
