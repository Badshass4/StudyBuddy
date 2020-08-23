import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import PersonIcon from '@material-ui/icons/Person';
import GroupIcon from '@material-ui/icons/Group';
import SchoolIcon from '@material-ui/icons/School';
import PublicIcon from '@material-ui/icons/Public';


const useStyles = makeStyles({
    root: {
        // minWidth: '200px',
        minHeight: '260px',
        margin: '5%',
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    iconColor: {
        color: '#008080'
    }
});

const InfoCard = (props) => {
    const classes = useStyles();
    return (
        <Card className={classes.root}>
            <CardContent>
                {props.info.type === "Person" ?
                    <PersonIcon className={classes.iconColor} /> :
                    props.info.type === "Group" ?
                        <GroupIcon className={classes.iconColor} /> :
                        props.info.type === "Institute" ? <SchoolIcon className={classes.iconColor} /> :
                            <PublicIcon className={classes.iconColor} />}
                <Typography variant="h5" component="h2">
                    {props.info.header}
                </Typography>
                <br />
                <Typography style={{ color: 'grey' }} variant="body2" component="p">
                    {props.info.message}
                    <br />
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">Learn More</Button>
            </CardActions>
        </Card>
    )
}

export default InfoCard
