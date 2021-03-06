import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import DeleteModal from '../../shared/modals/DeleteModal';
import EditModal from '../../shared/modals/EditModal';
import '../styles/studymaterialcard.css';
import '../../shared/styles/font.css';

const StudyMaterialCard = (props) => {
    const { info } = props;

    let isLoggedIn = useSelector(state => {
        return state.authReducer.isLoggedIn;
    })

    let isAdmin = useSelector(state => {
        return state.userReducer.isAdmin;
    })

    let [deleteModalOpen, setDeleteModalOpen] = useState(false);
    let [editModalOpen, setEditModalOpen] = useState(false);

    // This function will work upon clicking Delete icon
    const handleDelete = () => {
        setDeleteModalOpen(true);
    }

    // This function will work upon clicking Edit icon
    const handleEdit = () => {
        setEditModalOpen(true);
    }

    // This function will close the delete modal
    const handleDeleteModalClose = () => {
        setDeleteModalOpen(false);
    }

    // This function will close the edit modal
    const handleEditModalClose = () => {
        setEditModalOpen(false);
    }

    // This function will fetch a material and set correct filetype and filename
    // and decode it for users to get ready to download
    const handleDownload = () => {
        axios.get(`${process.env.REACT_APP_BACKEND_API}/user/downloadnote`,
            {
                params: {
                    noteId: info._id
                },
                responseType: 'blob'
            })
            .then(response => {
                let type = response.data.type;
                let data = new Blob([response.data], { type });
                let url = window.URL.createObjectURL(data);
                let link = document.createElement("a");
                link.download = info.file.originalname;
                link.href = url;
                link.click();
                window.URL.revokeObjectURL(url);
            })
            .catch(err => {
                console.log(err.response.data.message);
            })
    }

    return (
        <div>
            <Card className="study-card">
                <CardActionArea style={{ backgroundColor: "#132020" }}>
                    <CardContent>
                        <input type="hidden" name={info._id} value={info._id}></input>
                        <Typography gutterBottom variant="h5" component="h6" className="font">
                            {info.title}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <Divider light />
                <CardActions disableSpacing>
                    <IconButton aria-label="add to favorites">
                        <FavoriteIcon />
                    </IconButton>
                    <IconButton aria-label="download">
                        <CloudDownloadIcon onClick={handleDownload} />
                    </IconButton>
                    {
                        isLoggedIn && isAdmin &&
                        <IconButton onClick={handleEdit} aria-label="edit">
                            <EditIcon />
                        </IconButton>
                    }
                    {
                        isLoggedIn && isAdmin &&
                        <IconButton onClick={handleDelete} aria-label="delete">
                            <DeleteIcon />
                        </IconButton>
                    }
                </CardActions>
            </Card>

            <DeleteModal openStatus={deleteModalOpen} refresh={props.refresh} noteInfo={info} closeModal={handleDeleteModalClose} />
            <EditModal openStatus={editModalOpen} refresh={props.refresh} noteInfo={info} closeModal={handleEditModalClose} />
        </div>
    )
}

export default withRouter(StudyMaterialCard)
