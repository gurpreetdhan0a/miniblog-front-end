import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getPosts} from '../actions/index';
import {Grid, LinearProgress} from '@material-ui/core';
import Post from './Post/Post';
const Posts = () => {
    const dispatch = useDispatch();
    const posts = useSelector((state)=>{return state.posts});
    console.log(posts);
    useEffect(()=>{
        dispatch(getPosts());
    },[dispatch])
    return (
        !posts.length ? <LinearProgress style={{marginTop: "10px"}} /> : (
            <Grid style={{marginTop: "10px"}} container alignItems="stretch" spacing={3}>
                {
                    posts.map((post)=>(
                        <Grid key={post._id} item xs={12} sm={6}>
                        <Post post={post} />
                         </Grid>
                    ))
                }
            </Grid>
        )
    );
};

export default Posts;