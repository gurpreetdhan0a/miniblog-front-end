import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Delete from '@material-ui/icons/Delete';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {Link} from 'react-router-dom';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import {Button} from '@material-ui/core';
import {deletePost, likePost, unLikePost} from '../../actions/index';
import {useSelector, useDispatch} from 'react-redux';
import {useParams} from 'react-router-dom';
import Model from '../../Model';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    backgroundColor: "#424242",
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
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
            post.userId === auth.userId ? <Button className={classes.color} size="small"
            ><MoreVertIcon fontSize="default"/></Button> : null
        }
        title={<Typography variant="h5" className={classes.color}>{post.title}</Typography>}
        subheader={<Typography variant="body2" className={classes.color}> {post.createdAt.split('T')[0]}</Typography>}
      />
      <CardMedia
        className={classes.media}
        src="string" image={post.selectedFile}
      />
      <CardContent>
        <Typography variant="h6" className={classes.color} component="p">
          {post.message}
        </Typography>
      </CardContent>
      <CardActions >
        {post.likeCount === 0 ? <Button size="small" color="secondary" onClick={()=>{dispatch(likePost(post._id))}}>
        <FavoriteIcon />
        </Button> :
        <Button size="small" className={classes.color} onClick={()=>{dispatch(unLikePost(post._id))}}>
        <FavoriteIcon />
        </Button>}
        <Button size="small" className={classes.color} disabled={post.userId === auth.userId ? false :true } onClick={()=>{setOpenModal(true)}}>
        <Delete />
        </Button>
        {params.id ? null : <Link to={`/user/${post.userId}`}>
        <IconButton className={classes.color} style={{float:"right"}} aria-label="delete">
            <AccountCircleIcon />
        </IconButton>
        </Link>}  
      </CardActions>
    </Card>
    </div>
  );
}
