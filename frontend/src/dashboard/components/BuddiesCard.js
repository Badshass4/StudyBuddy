import React from 'react';
import '../styles/buddiescard.css';
import Card from '@material-ui/core/Card';

const BuddiesCard = () => {
    return (
        <Card className="flip-card">
            <div className="flip-card-inner">
                <div className="flip-card-front">
                    <img src="img_avatar.png" alt="Avatar" style={{ width: '300px', height: '300px' }} />
                </div>
                <div className="flip-card-back">
                    <h1>John Doe</h1>
                    <p>Architect & Engineer</p>
                    <p>We love that guy</p>
                </div>
            </div>
        </Card>
    )
}

export default BuddiesCard
