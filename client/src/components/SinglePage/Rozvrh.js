import React from 'react'

import Container from 'react-bootstrap/Container'

export default () => {
    return (
        <Container fluid>
            <iframe className="meo-event-calendar" style={{width: '100%', height: '1350px', border: '1px solid #ccc', borderRadius: '3px'}} 
                src="https://calendiari.com/booking/embeddedCalendar?accountId=CdKXXQZ9HkeXochPTT_DNQ&amp;view=Week" 
                width="300" height="150"></iframe>
        </Container>
    )
}