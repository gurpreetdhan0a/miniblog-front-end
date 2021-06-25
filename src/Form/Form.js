import React, {useState} from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux'
import { createPost } from '../actions/index';
import Resizer from "react-image-file-resizer";
import CircularProgress from '@material-ui/core/CircularProgress';

const Form = () =>{
    const dispatch = useDispatch();
    const [loader, setLoader] = useState(false);
    const auth = useSelector(state => {return state.auth});
    const [blogData, setBlogData] = useState({
        title: '',
        message: '',
        selectedFile: '',
        tags: [],
        userId: '',
        username : ''
    });

    const onFileResize = e => {
        const file = e.target.files[0];
      
      Resizer.imageFileResizer(
      file, // the file from input
      480, // width
      480, // height
      "JPEG", // compress format WEBP, JPEG, PNG
      90, // quality
      0, // rotation
      (uri) => {
        setBlogData({...blogData, selectedFile:uri})
        // You upload logic goes here
      },
      "base64" // blob or base64 default base64
      );
      }

    const handleSubmit = (e)=>{
        setLoader(true);
        e.preventDefault();
        dispatch(createPost(blogData, setLoader));
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

            <input
             type="file"
             id="file"
             accept="image/*"
             onChange={onFileResize}
           />
            <Button style={{marginTop: "10px"}}variant="contained" disabled={!blogData.userId || !blogData.message || !blogData.selectedFile ? true:false} color="primary" size="large" type="submit" fullWidth >{loader ? <CircularProgress/> : <span>Submit</span>}</Button>
            </form>
        </Paper>
        )
    )
}

export default Form;