import React from 'react'

import { Card } from 'react-bootstrap'

function CardHome(props) {
    return (
        <Card key={ props.id } className="cardHome mb-4">
            <Card.Body>
                <Card.Img className='mb-3' variant="top" src={props.image} style={{maxWidth: "200px", maxHeight: "200px"}}/>
                <div className='d-flex justify-content-between mb-3'>
                    <Card.Title className='title mr-3'>{props.title}</Card.Title>
                    <Card.Text>
                        {props.year}
                    </Card.Text>
                </div>

                <div>
                    <Card.Subtitle className="mb-0 text-muted">{props.artis}</Card.Subtitle>
                </div>
            </Card.Body>
        </Card>
    )
}

export default CardHome;