// import hook
import React, { useState, useEffect } from 'react'

import NavbarAdmin from '../components/NavbarAdmin'

// import components here
import { Container, Row, Col } from 'react-bootstrap'
import Contact from '../components/complain/Contact'

// import socket.io-client 
import { io } from 'socket.io-client'

// initial variable outside socket
let socket
export default function ComplainAdmin() {
    // code here
    const [contact, setContact] = useState(null) // data contact yang diklik
    const [contacts, setContacts] = useState([]) // data contact dari server

    const title = "Complain admin"
    document.title = 'DumbMerch | ' + title

    useEffect(() => {
        socket = io('http://localhost:5000')
        // code here
        loadContacts()
        return () => {
            socket.disconnect()
        }
    }, [])

    // code here
    const loadContacts = () => {
        socket.emit("load customer contacts")
        socket.on("customer contacts", (data) => {

            let dataContacts = data.map((item) => ({
                ...item,
                message: "Click here to start message"
            }))
            setContacts(dataContacts)
        })
    }


    const onClickContact = (data) => {
        setContact(data)
    }
    return (
        <>
            <NavbarAdmin title={title} />
            {/* code here */}
            <Container fluid style={{ height: '89.5vh' }}>
                <Row>
                    <Col md={3} style={{ height: '89.5vh' }} className="px-3 border-end border-dark overflow-auto" >
                        <Contact dataContact={contacts} clickContact={onClickContact} contact={contact} />
                    </Col>
                </Row>
            </Container>
        </>
    )
}
