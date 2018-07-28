import React from 'react';
import {Route} from 'react-router';
import App from './App';
import Home from './pages/Home';
import PostCreate from './pages/Posts/PostCreate';
import PostEdit from './pages/Posts/PostEdit';
import PostView from './pages/Posts/PostView';
import PostList from './pages/Posts/PostList';
import PostListReactive from './pages/Posts/PostListReactive';

import Register from './pages/Users/Register';
import Login from './pages/Users/Login';

export default () =>
    <App>
        <Route exact path="/" component={Home}/>
        <Route exact path="/posts" component={PostList} />
        <Route exact path="/posts/reactive" component={PostListReactive} />
        <Route exact path="/posts/create" component={PostCreate} />
        <Route exact path="/posts/edit/:_id" component={PostEdit} />
        <Route exact path="/posts/view/:_id" component={PostView} />


        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
    </App>