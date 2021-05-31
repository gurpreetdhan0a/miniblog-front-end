import React, {useState,} from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux'
import FileBase from 'react-file-base64';
import { createPost } from '../actions/index';


const Form = () =>{
    const dispatch = useDispatch();
    
    const auth = useSelector(state => {return state.auth});
    const [blogData, setBlogData] = useState({
        title: '',
        message: '',
        selectedFile: '',
        userId: '',
        username : ''
    });
    const handleSubmit = (e)=>{
        e.preventDefault();
        dispatch(createPost(blogData));
    }
    return (
        !auth.userId ? <Typography style={{marginTop: "10px"}} variant="h5" align="center">Please Login to create a post</Typography> : (
        <Paper>
            <form noValidate onSubmit={handleSubmit}>
            <Typography variant="h6">Creating a Blog Post</Typography>
            <TextField name="title" variant="outlined" label="Title" fullWidth value={blogData.title} onChange={(e) => setBlogData({...blogData, title: e.target.value, username: auth.username, userId: auth.userId})}/>
            <TextField name="message" variant="outlined" label="Message" fullWidth value={blogData.message} onChange={(e) => setBlogData({...blogData, message: e.target.value})}/>
            <FileBase
            type="file"
            multiple={false}
            onDone={({base64})=>setBlogData({...blogData, selectedFile:base64})}/>
            <Button variant="contained" disabled={!blogData.userId ? true:false} color="primary" size="large" type="submit" fullWidth >Submit</Button>
            </form>
        </Paper>
        )
    )
}

export default Form;