import React from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Posts } from '/db';
import Post from '/imports/ui/components/Post';

class PostList extends React.Component {
    constructor() {
        super();
    }

    redirect = () => {
        const props = this.props;
        props.history.push('/posts/create');
    }

    redirectLogin = () => {
        const props = this.props;
        props.history.push('/login');
    }

    render() {
        const props = this.props
        const posts = props.posts;

        if (!posts) {
            return <div>Loading....</div>
        }

        return (
            <div>
                {
                    Meteor.userId() ?
                        <div className="post">
                            {posts.map((post) => (
                                <Post key={post._id} post={post} />))}
                            <button onClick={this.redirect}>Create a new post</button>
                        </div>
                        :
                        <div>
                            {this.redirectLogin}
                        </div>
                }
            </div>)
    }
}

export default withTracker(props => {
    const handle = Meteor.subscribe('posts');

    return {
        loading: !handle.ready(),
        posts: Posts.find().fetch(),
        ...props
    };
})(PostList);
