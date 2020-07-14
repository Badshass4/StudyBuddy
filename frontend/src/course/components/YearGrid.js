import React from 'react';
import { useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { setYear } from '../../redux/reducers/routeParamsReducer';

const YearGrid = (props) => {
    const dispatch = useDispatch();
    let year = props.yearInfo;
    let yearList = [];
    for (let i = 1; i <= year; i++) {
        yearList.push(i);
    }

    const handleYearClick = (year) => {
        dispatch(setYear(year));
        props.history.push('/user/course/stream/year/subjects');
    }

    return (
        <Grid container spacing={3}>
            {yearList.map(year => {
                return (
                    <Grid key={year} item xs={12} sm={6}>
                        <Card className="stream-card">
                            <CardActionArea style={{ height: '20vh', backgroundColor: "#132020" }}>
                                <CardContent className="card-text" onClick={() => handleYearClick(year)}>
                                    <input type="hidden" name={year} value={year}></input>
                                    <Typography gutterBottom variant="h5" component="h6" className="font">
                                        Year {year}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                )
            })
            }
        </Grid>
    )
}

export default withRouter(YearGrid)
