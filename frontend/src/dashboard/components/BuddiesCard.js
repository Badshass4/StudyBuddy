import React from 'react';
import '../styles/buddiescard.css';
import Card from '@material-ui/core/Card';

const BuddiesCard = (props) => {
    return (
        <Card className="flip-card">
            <div className="flip-card-inner">
                <div className="flip-card-front">
                    <img src={props.info.image} alt="Avatar" style={{ width: '100%', height: '100%' }} />
                </div>
                <div className="flip-card-back">
                    <h2 style={{ paddingTop: '20px' }}>{props.info.name}</h2>
                    <p>Designer</p>
                    <p>Architect</p>
                    <p>Developer</p>
                </div>
            </div>
        </Card>
    )
}

export default BuddiesCard
