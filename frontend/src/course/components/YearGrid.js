import React, { useState, useEffect } from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const YearGrid = (props) => {
    let year = props.yearInfo;
    let yearList = [];
    for (let i = 1; i <= year; i++) {
        yearList.push(i);
    }

    return (
        <Grid container spacing={3}>
            {yearList.map(year => {
                return (
                    <Grid key={year} item xs={12} sm={6}>
                        <Card className="stream-card">
                            <CardActionArea style={{ height: '20vh', backgroundColor: "#132020" }}>
                                <CardContent className="card-text">
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

export default YearGrid
