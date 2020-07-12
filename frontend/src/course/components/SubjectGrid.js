import React from 'react'
import { withRouter } from 'react-router-dom'
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const SubjectGrid = (props) => {
    let subjects = props.subjectInfo;
    let path = props.history.location.pathname;
    let courseId = path.split("/")[2];

    const subjectCardClick = (subject) => {
        console.log(subject);
        props.history.push("/user/" + courseId + "/" + subject._id);
    };

    return (
        < Grid container spacing={3}>
            {subjects.map(subject => {
                return (
                    <Grid key={subject._id} item xs={12} sm={6}>
                        <Card className="subject-card">
                            <CardActionArea style={{ height: '20vh', backgroundColor: "#132020" }}>
                                <CardContent className="card-text" onClick={() => subjectCardClick(subject)}>
                                    <input type="hidden" name={subject._id} value={subject._id}></input>
                                    <Typography gutterBottom variant="h6" component="h6" className="font">
                                        {subject.subjectName.length > 42 ? subject.subjectName.substr(0, 40) + "..." : subject.subjectName}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                )
            })
            }
        </Grid >
    )
}

export default withRouter(SubjectGrid)