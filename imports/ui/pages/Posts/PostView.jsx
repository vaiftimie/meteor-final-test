import React from 'react';
import { AutoForm, LongTextField, HiddenField } from 'uniforms-unstyled';
import CommentSchema from '/db/comments/schema';
import { Meteor } from 'meteor/meteor';

export default class PostView extends React.Component {
    constructor() {
        super();
        this.state = {
            post: null,
            comments: null
        };
    }

    componentDidMount() {
        Meteor.call('post.incrementViews', this.props.match.params._id, (err, post) => {
            if (err)
                alert("There was a problem when attempting to increment the views!");
            else
                this.setState({ post: post });
        });

        Meteor.call('comments.getCommentsByPostId', this.props.match.params._id, (err, comments) => {
            if (err)
                return alert("There was a problem when atttempting to fetch the post comments!");
            else {
                this.setState({ comments: comments });
            }
        });
    }

    _submitComment(comment) {
        Meteor.call('comments.create', comment, (err) => {
            if (err)
                alert("There was a problem when atttempting to create the post comment!");
        });

        Meteor.call('post.incrementComments', this.props.match.params._id, (err, post) => {
            if (err)
                alert("There was a problem when attempting to increment the comments number!");
            else
                this.setState({ post: post });
        });

        Meteor.call('comments.getCommentsByPostId', this.props.match.params._id, (err, comments) => {
            if (err)
                return alert("There was a problem when atttempting to fetch the post comments!");
            else {
                this.setState({ comments: comments });
            }
        });
    }

    _deleteComment(_id) {
        Meteor.call('comments.remove', _id, (err) => {
            if (err)
                alert("There was a problem when atttempting to delete the post comment!");
        });

        Meteor.call('comments.getCommentsByPostId', this.props.match.params._id, (err, comments) => {
            if (err)
                return alert("There was a problem when atttempting to fetch the post comments!");
            else {
                this.setState({ comments: comments });
            }
        });
    }

    render() {
        const { history } = this.props;
        const { post } = this.state;
        const { comments } = this.state;

        if (!post || !comments)
            return <div>Loading....</div>

        return (
            <div className="post">
                Post title: {post.title}
                <br></br>
                Post description: {post.description}
                <br></br>
                Post views: {post.views}
                <br></br>
                <br></br>
                <br></br>
                Post comments:
                <br></br>
                <br></br>
                {comments.map(comment => (
                    <div key={comment._id}>
                        {comment.text}
                        <br></br>
                        Posted by: {comment.userEmail}
                        <br></br>
                        {Meteor.userId() == comment.userId || Meteor.userId() == post.userId
                            ?
                            <div className="deleteButton">
                                <button className="deleteComment" onClick={this._deleteComment.bind(this, comment._id)}>
                                    Delete comment</button>
                            </div>
                            :
                            <div className="deleteButton">
                            </div>
                        }
                        <br></br>
                        <br></br>
                    </div>
                )).sort((a, b) => a.createdAt < b.createdAt)}

                {Meteor.userId() ?
                    <div className="comment">
                        <AutoForm onSubmit={this._submitComment.bind(this)} schema={CommentSchema}>
                            <LongTextField name="text" />

                            <HiddenField name="createdAt" value={new Date()} />
                            <HiddenField name="userId" value={Meteor.userId()} />
                            <HiddenField name="userEmail" value={Meteor.user().emails[0].address} />
                            <HiddenField name="postId" value={post._id} />

                            <button type='submit'>Comment</button>
                        </AutoForm>
                    </div>
                    :
                    <div className="comment">
                    </div>
                }

                <button onClick={() => history.push('/posts')}>Back to posts</button>
            </div>
        )
    }
}