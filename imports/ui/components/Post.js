import React from 'react';
import { Meteor } from 'meteor/meteor';
import { withRouter } from 'react-router'

class Post extends React.Component {
    constructor() {
        super();
        this.state = {
            post: null,
            show: true
        };
        //TODO: set tracker up
    }

    componentDidMount() {
        const post = this.props.post;
        this.setState({ post: post });
    }

    redirectView = () => {
        const props = this.props;
        const { post } = this.state;

        props.history.push("/posts/view/" + post._id);
    }

    redirectEdit = () => {
        const props = this.props;
        const { post } = this.state;

        props.history.push("/posts/edit/" + post._id);
    }

    deletePost = () => {
        const { post } = this.state;

        Meteor.call('post.remove', post._id, (err) => {
            if (err)
                alert("For some reason the post could not be deleted!");
            this.setState({ show: false });
        });
    }

    render() {
        const { post } = this.state;
        const { show } = this.state;

        if (!post || !show)
            return <div>Loading....</div>

        return (
            <div>
                {show ?
                    <div>
                        <p>Post id: {post._id} </p>
                        <p>Post title: {post.title}, Post Description: {post.description} </p>
                        <p>Number of views: {post.views}</p>
                        <p>Number of comments: {post.commentsNumber}</p>

                        <button onClick={this.redirectView}> View post</button>

                        {Meteor.userId() == post.userId
                            ?
                            <div className="postButtons">

                                <button onClick={this.redirectEdit}> Edit post</button>
                                <button onClick={this.deletePost}>Delete post</button>

                            </div>
                            :
                            null
                        }
                    </div>
                    :
                    null
                }

            </div>
        );
    }
}

export default withRouter(Post);