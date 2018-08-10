import React from 'react';
import { AutoForm, AutoField, LongTextField, SelectField } from 'uniforms-unstyled';
import PostSchema from '/db/posts/schema';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Posts } from '/db';
import PostTagsLabels from '/db/posts/enum/tags';

class PostEdit extends React.Component {
    constructor() {
        super();
    }

    submit = (post) => {
        const props = this.props;
        const id = props.match.params._id;

        Meteor.call('post.edit', id, post, (err) => {
            if (err)
                return alert(err.reason);
            alert('Post modified!');
        });
    };

    redirect = () => {
        const props = this.props;
        props.history.push('/posts');
    }

    render() {
        const props = this.props;
        const post = props.post[0];
        const options = PostTagsLabels;

        if (!post) {
            return <div>Loading....</div>
        }

        return (
            <div className="post">
                <AutoForm onSubmit={this.submit} schema={PostSchema} model={post}>
                    <AutoField name="title" />
                    <LongTextField name="description" />
                    <SelectField name="type" options={options} />

                    <button type='submit'>Edit post</button>
                    <button onClick={this.redirect}>Back to posts</button>
                </AutoForm>
            </div>
        )
    }
}

export default withTracker(props => {
    const postId = props.match.params._id;
    const handle = Meteor.subscribe('post', postId);

    return {
        loading: !handle.ready(),
        post: Posts.find().fetch(),
        ...props
    };
})(PostEdit);
