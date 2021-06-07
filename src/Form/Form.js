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
        tags: [],
        userId: '',
        username : ''
    });
    console.log(FileBase)
    const handleSubmit = (e)=>{
        e.preventDefault();
        dispatch(createPost(blogData)).finally(alert("Post saved successfully"))
        clear();
    }

    const clear = () =>{
        setBlogData({
            title: '',
            message: '',
            selectedFile: '',
            tags: [],
            userId: '',
            username : '' 
        })
    }
    return (
        !auth.userId ? <Typography style={{marginTop: "10px"}} variant="h5" align="center">Please Login to create a post</Typography> : (
        <Paper>
            <form onSubmit={handleSubmit}>
            <Typography align="center" style={{margin: "10px"}} variant="h6">Creating a Blog Post</Typography>
            <TextField required name="title" variant="outlined" label="Title" fullWidth value={blogData.title} onChange={(e) => setBlogData({...blogData, title: e.target.value, username: auth.username, userId: auth.userId})}/>
            <TextField style={{marginTop: "10px", marginBottom: "10px"}} required name="message" variant="outlined" label="Message" fullWidth value={blogData.message} onChange={(e) => setBlogData({...blogData, message: e.target.value})}/>
            <TextField style={{marginTop: "10px", marginBottom: "10px"}} name="tags" variant="outlined" label="Tags" fullWidth value={blogData.tags} placeholder="Separate hashtags with ," onChange={(e) => setBlogData({...blogData, tags: e.target.value.split(',')})}/>
            <FileBase
            type="file"
            multiple={false}
            onDone={({base64})=>setBlogData({...blogData, selectedFile:base64})}/>
            <Button style={{marginTop: "10px"}}variant="contained" disabled={!blogData.userId || !blogData.message || !blogData.selectedFile ? true:false} color="primary" size="large" type="submit" fullWidth >Submit</Button>
            </form>
        </Paper>
        )
    )
}

export default Form;