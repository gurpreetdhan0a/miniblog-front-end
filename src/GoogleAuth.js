import React, { Component } from 'react';
import { connect } from 'react-redux';
import {signIn, signOut} from './actions/index';
import {Button} from '@material-ui/core'

class GoogleAuth extends Component {

    componentDidMount(){
        window.gapi.load('client:auth2', ()=>{
            window.gapi.client.init({
                clientId: "630496304040-5fb7avg0trtf793932a5clla3lk6sovn.apps.googleusercontent.com",
                scope: "email"
            }).then(()=>{
                this.auth = window.gapi.auth2.getAuthInstance();
                this.onAuthChange(this.auth.isSignedIn.get());
                this.auth.isSignedIn.listen(this.onAuthChange);
            })
        });
    }

    onAuthChange = (isSignedIn)=>{
       if (isSignedIn){
           this.props.signIn(this.auth.currentUser.get().getId(), this.auth.currentUser.get().getBasicProfile().getGivenName());
       }else{
           this.props.signOut();
       }
    }

    renderAuthButton(){
        if (this.props.isSignedIn === null){
            return null;
        }else if(this.props.isSignedIn){
            return (
            <div>
                <Button onClick={this.auth.signOut} variant="contained" color="secondary">Logout</Button>
            </div>
            )
        }else{
        return (
            <Button onClick={this.auth.signIn} variant="contained" color="secondary">Login</Button>
            )
        }
    }
    
    render() {
        return (
            <div>
                {this.renderAuthButton()}
            </div>
        );
    }
}

const mapStateToProps = (state)=>{
    return { isSignedIn: state.auth.isSignedIn, userId: state.auth.userId, username: state.auth.username }
}

export default connect(mapStateToProps, { signIn, signOut})(GoogleAuth);