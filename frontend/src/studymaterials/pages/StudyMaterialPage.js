import React, { useState, useEffect } from 'react';
import { useDispatch } from "react-redux";
import axios from 'axios';
import { setSnackbar } from "../../redux/reducers/snackBarReducer";
import StudyMaterialCard from '../components/StudyMaterialCard'
import '../styles/studymaterialpage.css'
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        margin: theme.spacing(5)
    },
    card: {
        padding: theme.spacing(2),
        textAlign: 'center'
    }
}));

const StudyMaterialPage = (props) => {
    let [studyMaterials, setStudyMaterials] = useState({});
    let [subjectKeys, setSubjectKeys] = useState([]);
    let [subjectValues, setSubjectValues] = useState([]);
    let [subjectList, setSubjectList] = useState([]);
    const dispatch = useDispatch();
    let path = props.history.location.pathname;
    let subjectName = path.split("/")[3];

    useEffect(() => {
        //get studymaterials for a particular subject
        axios
            .get(
                "http://localhost:5000/user/notes/" + subjectName
            )
            .then(response => {
                //classify each subjects
                let finalSubjectList = {};
                let allSubjects = response.data.result;
                let uniqueSubjects = new Set();
                allSubjects.map(data => {
                    uniqueSubjects.add(data.subject)
                })
                setSubjectList(uniqueSubjects);

                uniqueSubjects.forEach(subject => {
                    finalSubjectList[subject] = [];
                })
                allSubjects.map(subObj => {
                    finalSubjectList[subObj.subject].push(subObj);
                })

                console.log(finalSubjectList);

                let keys = Object.keys(finalSubjectList);
                let values = Object.values(finalSubjectList);
                setStudyMaterials(finalSubjectList);
                setSubjectKeys(keys);
                setSubjectValues(values);
            }).catch(err => {
                dispatch(setSnackbar(true, "error", err.response.data.message))
                props.history.goBack();
            });
    }, [])

    const classes = useStyles();

    return (
        <div className={classes.root}>
            {
                subjectKeys.map(key => {
                    return (<React.Fragment>
                        <h2>{key}</h2>
                        <Grid container spacing={3} style={{paddingBottom: '40px'}}>
                            {
                                studyMaterials[key].map(note => {
                                    return (<React.Fragment>
                                        <Grid key={note._id} item xs={12} sm={2}>
                                            <StudyMaterialCard className={classes.card} info={note} />
                                        </Grid>
                                    </React.Fragment>);
                                })
                            }
                        </Grid>
                        <Divider />
                    </React.Fragment>)
                })
            }
        </div>
    )
}

export default StudyMaterialPage
