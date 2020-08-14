import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    large: {
        width: theme.spacing(30),
        height: theme.spacing(30),
    },
}));

const ProfileImage = (props) => {
    const [state, setState] = React.useState({
        public: true,
        onlyMe: true,
    });

    const handleToggleSwitch = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
        console.log(event.target.name);
        console.log(event.target.checked);
    };
    const classes = useStyles();
    return (
        <div className={"profile_image"}>
            <div>
                <Avatar alt="Badsha" src="/static/images/avatar/1.jpg" className={classes.large}>
                    BM
                </Avatar>
            </div>
            <center><h2>Name</h2></center>
            <Typography component="div" className={'profile_image-toggle'}>
                <Grid component="label" container alignItems="center" spacing={1}>
                    <Grid item>Public</Grid>
                    <Grid item>
                        <Switch
                            checked={state.onlyMe}
                            onChange={handleToggleSwitch}
                            color="default"
                            name="onlyMe"
                            inputProps={{ 'aria-label': 'primary checkbox' }}
                        />
                    </Grid>
                    <Grid item>Only Me</Grid>
                </Grid>
            </Typography>
        </div>
    )
}

export default ProfileImage
