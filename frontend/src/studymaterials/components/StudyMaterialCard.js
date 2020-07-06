import React from 'react'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import '../styles/studymaterialcard.css';

const StudyMaterialCard = (props) => {
    const { info } = props;
    return (
        <div>
            <Card className="study-card">
                <CardContent>
                    {info.title}
                </CardContent>
            </Card>
        </div>
    )
}

export default StudyMaterialCard
