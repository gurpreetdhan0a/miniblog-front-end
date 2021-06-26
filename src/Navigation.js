import React from 'react';
import {Link} from 'react-router-dom';
import {Button} from '@material-ui/core';
import GoogleAuth from './GoogleAuth';

const Navigation = () => {
    return (
        <div style={{display:"flex", width:"88%", justifyContent:"space-evenly", backgroundColor:"#424242", padding:"10px", margin:"auto", borderRadius:"30px"}}>
            <Link to="/form"><Button style={{color:"white"}}>Form</Button></Link>
            <Link to="/allPosts"><Button style={{color:"white"}}>Posts</Button></Link>
            <GoogleAuth/>
        </div>
    );
};

export default Navigation;