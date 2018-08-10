import React from 'react';
import { AutoForm, LongTextField, HiddenField } from 'uniforms-unstyled';
import CommentSchema from '/db/comments/schema';
import { Meteor } from 'meteor/meteor';
import Comment from '/imports/ui/components/Comment';
import { withTracker } from 'meteor/react-meteor-data';
import { Posts } from '/db';
import { Comments } from '/db';

class PostView extends React.Component {
    constructor() {
        super();
    }

    componentDidMount() {
        const props = this.props;
        const id = props.match.params._id;

        Meteor.call('post.incrementViews', id, (err) => {
            if (err)
                alert("There was a problem when attempting to increment the views!");
        });
    }

    submit = (comment) => {
        Meteor.call('comments.create', comment, (err) => {
            if (err)
                alert("There was a problem when atttempting to create the post comment!");
        });
    }

    redirect = () => {
        const props = this.props;
        props.history.push('/posts');
    }

    render() {
        const props = this.props;
        const post = props.post[0];
        const comments = props.comments;

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
                    <Comment key={comment._id} comment={comment} postUserId={post.userId} />
                )).sort((a, b) => a.createdAt > b.createdAt)}

                {Meteor.userId() ?
                    <div className="comment">
                        <AutoForm onSubmit={this.submit} schema={CommentSchema}>
                            <LongTextField name="text" />

                            <HiddenField name="createdAt" value={new Date()} />
                            <HiddenField name="userId" value={Meteor.userId()} />
                            <HiddenField name="userEmail" value={Meteor.user().emails[0].address} />
                            <HiddenField name="postId" value={post._id} />

                            <button type='submit'>Comment</button>
                        </AutoForm>
                    </div>
                    :
                    null
                }

                <button onClick={this.redirect}>Back to posts</button>
            </div>
        )
    }
}

export default withTracker(props => {
    const postId = props.match.params._id;

    const handlePosts = Meteor.subscribe('post', postId);
    const handleComments = Meteor.subscribe('comments', postId);

    return {
        loading: !handlePosts.ready() && !handleComments.ready(),
        post: Posts.find().fetch(),
        comments: Comments.find().fetch(),
        ...props
    };
})(PostView);