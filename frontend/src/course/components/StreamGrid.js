import React from 'react';
import { useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { setStreamId } from '../../redux/reducers/routeParamsReducer';

const StreamGrid = (props) => {
    const dispatch = useDispatch();
    let streams = props.streamInfo;

    // Setting the redux store with stream id and redirecting to year page
    const streamCardClick = (stream) => {
        dispatch(setStreamId(stream._id));
        props.history.push("/user/course/stream/years");
    };

    return (
        < Grid container spacing={3}>
            {streams.map(stream => {
                return (
                    <Grid key={stream._id} item xs={12} sm={6}>
                        <Card className="stream-card">
                            <CardActionArea style={{ height: '20vh', backgroundColor: "#132020" }}>
                                <CardContent className="card-text" onClick={() => streamCardClick(stream)}>
                                    <input type="hidden" name={stream._id} value={stream._id}></input>
                                    <Typography gutterBottom variant="h6" component="h6" className="font">
                                        {stream.title.length > 42 ? stream.title.substr(0, 40) + "..." : stream.title}
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

export default withRouter(StreamGrid)
