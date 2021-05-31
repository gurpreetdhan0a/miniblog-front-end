import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Form from './Form/Form';
import Navigation from './Navigation';
import Posts from './Posts/Posts';
import UserPosts from './UserPosts';
const App = () => {

    return (
        <div>
            <Router>
            <Navigation/>
                <Switch>
                    <Route path="/form" exact component={Form}/>
                    <Route path="/allPosts" exact component={Posts}/>
                    <Route path="/user/:id" exact component={UserPosts}/>
                </Switch>
            </Router>
        </div>
    );
};

export default App;