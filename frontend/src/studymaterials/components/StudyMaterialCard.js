import React from 'react'
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
import '../styles/studymaterialcard.css';
import '../../shared/styles/font.css'

const StudyMaterialCard = (props) => {
    const { info } = props;
    return (
        <div>
            <Card className="study-card">
                <CardActionArea style={{backgroundColor:"#132020"}}>
                    <CardContent>
                        <input type="hidden" name={info._id} value={info._id}></input>
                        <Typography gutterBottom variant="h6" component="h6" className="font">
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
                        <CloudDownloadIcon />
                    </IconButton>
                    <IconButton aria-label="edit">
                        <EditIcon />
                    </IconButton>
                    <IconButton aria-label="delete">
                        <DeleteIcon />
                    </IconButton>
                </CardActions>
            </Card>
        </div>
    )
}

export default StudyMaterialCard
