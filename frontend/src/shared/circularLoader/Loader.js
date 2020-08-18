import React from 'react';
import ReactDOM from 'react-dom';
import { useDispatch, useSelector } from "react-redux";
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    backdrop: {
      zIndex: 3000,
      color: '#fff',
    },
  }));

const Loader = () => {
    const classes = useStyles();

    let isLoader = useSelector(state => {
        return state.loaderReducer.isLoader;
    });

    const content = 
        <Backdrop className={classes.backdrop} open={isLoader} >
            <CircularProgress color="inherit" />
        </Backdrop>;
    return ReactDOM.createPortal(content, document.getElementById('backdrop'));
};

export default Loader
