import React, { useState, useEffect } from 'react'
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import '../styles/coursedetailspage.css'

const CourseDetailsPage = () => {
    const [streams, setStreams] = useState([]);
    const [year, setYear] = useState([]);

    useEffect(() => {
        let allStreams=[];   // for storing actual data from api
        let stream = [{ id: 1, name: "Computer Science and Engineering" },
        { id: 2, name: "Electrical Balchal and Engineering" },
        { id: 2, name: "Electrical Balchal and Engineering" },
        { id: 2, name: "IT" },
        { id: 2, name: "Electrical Balchal and Engineering" },
        { id: 2, name: "Electrical Balchal and Engineering Electrical Balchal and Engineering " }]
        setStreams(stream);
        return () => {
            console.log("HI")
        }
    }, [])

    return (
        <React.Fragment>
            <div className="main-container">
                < Grid container spacing={3}>
                    {streams.map(stream => {
                        return (
                            <Grid key={stream.id} item xs={12} sm={6}>
                                <Card className="stream-card">
                                    <CardActionArea style={{ height: '20vh', backgroundColor: "#132020" }}>
                                        <CardContent className="card-text">
                                            <input type="hidden" name={stream.id} value={stream.id}></input>
                                            <Typography gutterBottom variant="h6" component="h6" className="font">
                                                {stream.name.length > 40 ? stream.name.substr(0, 40) + "..." : stream.name}
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Grid>
                        )
                    })
                    }
                </Grid >
            </div>
        </React.Fragment>

    )
}

export default CourseDetailsPage
