import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Card, CardHeader, CardMedia, CardContent, CardActions, Avatar, Typography, Button} from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Delete from '@material-ui/icons/Delete';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {Link, useParams} from 'react-router-dom';
import {deletePost, likePost, unLikePost} from '../../actions/index';
import {useSelector, useDispatch} from 'react-redux';
import Model from '../../Model';
import AccountBoxIcon from '@material-ui/icons/AccountBox';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    backgroundColor: "#424242",
  },
  media: {
    width: "100%",
    minHeight : "100px",
    paddingTop: '61.25%', // 16:9
  },
  avatar: {
    backgroundColor: red[500],
  },
  cardActions: {
    padding: '0 16px 8px 16px',
    display: 'flex',
    backgroundColor:"white"
  },
  color:{
      color:"white"
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderRadius: '15px',
    height: '100%',
    position: 'relative',
    color:"white",
    backgroundColor: "#424242",
    width:"90%",
    margin:"auto",
    padding:"15px"
  },
}));

export default function NewPost({post}) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const params = useParams();
  const date = new Date().toJSON();
  const auth = useSelector(state =>  {return state.auth});
  const [openModal, setOpenModal] = useState(false);
  const modalClose= ()=>{
      return setOpenModal(false);
};

  return (
    <div>
    <Model open={openModal} deletePost={()=>dispatch(deletePost(post._id))} closeModal={modalClose} />
    <Card className={`${classes.card}`}>

      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {post.username[0]}
          </Avatar>
        }
        action={
            <Button disabled={auth.userId === post.userId ? false : true} className={classes.color} size="small"
            ><MoreVertIcon fontSize="default"/></Button>
        }
        title={<Typography variant="h5" className={classes.color}>{post.title}</Typography>}
        subheader={<Typography variant="body2" className={classes.color}> {post.createdAt.split('T')[0]}</Typography>}
      />

      <CardMedia
        className={classes.media}
        src="string" image={post.selectedFile}
      />

      <CardContent>
      {post.tags.length>0 ? <Typography className={classes.color} variant="body2" color="textSecondary">{post.tags.map((tag)=>` #${tag}`)}</Typography> : null}
        <Typography style={{marginTop: "10px"}} variant="h6" className={classes.color} component="p">
          {post.message}
        </Typography>
      </CardContent>

      <CardActions >
        {post.likeCount === 0 ? <Button disabled={auth.userId ? false : true} className={classes.color} size="small" onClick={()=>{dispatch(likePost(post._id))}}>
        <FavoriteIcon />
        </Button> :
        <Button disabled={auth.userId ? false : true} size="small" color="secondary" onClick={()=>{dispatch(unLikePost(post._id))}}>
        <FavoriteIcon />
        </Button>}
        <Button size="small" className={classes.color} disabled={post.userId === auth.userId ? false :true } onClick={()=>{setOpenModal(true)}}>
        <Delete />
        </Button>
        {params.id ? null : <Link to={`/user/${post.userId}`}>
        <Button style={{background : "#F44336"}} className={classes.color} variant="contained"><AccountBoxIcon/></Button>
        </Link>}  
        {date.split('T')[0] === post.createdAt.split('T')[0] ? <Button className={classes.color} disabled size="small" variant="contained"><Typography className={classes.color} variant="caption">New</Typography></Button>: null}
      </CardActions>

    </Card>
    </div>
  );
}
