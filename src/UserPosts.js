import React, {useEffect} from 'react';
import {getPosts} from './actions/index';
import {useSelector, useDispatch} from 'react-redux';
import {LinearProgress, Grid, Typography} from '@material-ui/core';
import { useParams} from 'react-router-dom';
import Post from './Posts/Post/Post';

const UserPosts = () => {
    const dispatch = useDispatch();
    const params = useParams();
    const posts = useSelector(state=>{return state.posts});
    const userPosts = posts.filter(post=> post.userId === params.id);
    useEffect(() =>{
        dispatch(getPosts());
    },[dispatch]);

    console.log(params.id);
    return (
        <React.Fragment>
        {userPosts.length > 0 ? <Typography variant="h6" align="center">Showing all the posts by @{userPosts[0].username}</Typography> : <Typography variant="h6" align="center">No posts found</Typography>}
        {!userPosts.length ? <LinearProgress align="center" /> : (
            <Grid container alignItems="stretch" spacing={3}>
                {
                    userPosts.map((post)=>(
                        <Grid key={post._id} item xs={12} sm={6}>
                        <Post post={post} />
                         </Grid>
                    ))
                }
            </Grid>) }
            </React.Fragment>
        );
};

export default UserPosts;