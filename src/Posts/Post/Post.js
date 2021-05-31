import React from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core'; 
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbDownAltIcon from '@material-ui/icons/ThumbDownAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import useStyles from './styles';
import {useParams} from 'react-router-dom';
import {deletePost, likePost, unLikePost} from '../../actions/index';
const Post = ({post}) => {
    const params = useParams();
    const classes = useStyles();
    const auth = useSelector(state =>  {return state.auth})
    const dispatch = useDispatch();
    return (
            <Card className={classes.card}>
                <CardMedia className={classes.media} src="string" image={post.selectedFile}/> 
                <div className={classes.overlay}>
                    <Typography variant="body2">{post.createdAt.split('T')[0]}</Typography>
                </div>
                <div className={classes.overlay2}>
                    {post.userId === auth.userId ? <Button style={{color:'white',border:'1px solid black'}} size="small"
                    ><MoreHorizIcon fontSize="default"/></Button> : null}
                </div>
                <Typography className={classes.title} variant="h5" gutterBottom>{post.title}</Typography>
                <CardContent>
                <Typography variant="body2" gutterBottom>{post.message}</Typography>
                {!params.id ?<Typography style={{fontStyle:'italic'}} variant="body1" gutterBottom><Link to={`/user/${post.userId}`}>@{post.username}</Link></Typography> :null }
                </CardContent>
                <CardActions className={classes.cardActions}>
                    {post.likeCount === 0 ? <Button size="small" color="primary" onClick={()=>{dispatch(likePost(post._id))}}>
                        <ThumbUpAltIcon fontSize="small" />
                        Like
                    </Button> :
                    <Button size="small" color="primary" onClick={()=>{dispatch(unLikePost(post._id))}}>
                        <ThumbDownAltIcon fontSize="small" />
                        Unlike
                    </Button>}
                    <Button size="small" disabled={post.userId === auth.userId ? false :true } color="primary" onClick={()=>{dispatch(deletePost(post._id))}}>
                        <DeleteIcon fontSize="small" />
                        Delete
                    </Button>
                </CardActions>
                
            </Card>
    );
}

export default Post;