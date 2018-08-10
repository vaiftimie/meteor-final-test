import React from 'react';
import { AutoForm, AutoField, LongTextField, SelectField, HiddenField } from 'uniforms-unstyled';
import PostSchema from '/db/posts/schema';
import PostTagsLabels from '/imports/api/posts/enum/tags';
import { Meteor } from 'meteor/meteor';

export default class PostCreate extends React.Component {
    constructor() {
        super();
    }

    submit = (post) => {
        Meteor.call('post.create', post, (err) => {
            if (err)
                return alert(err.reason);
            alert('Post added!')
        });
    };

    redirect = () => {
        const props = this.props;
        props.history.push('/posts');
    }

    render() {
        const options = PostTagsLabels;

        return (
            <div className="post">
                <AutoForm onSubmit={this.submit} schema={PostSchema}>
                    <AutoField name="title" />
                    <LongTextField name="description" />

                    <HiddenField name="views" value="0" />
                    <HiddenField name="commentsNumber" value="0" />
                    <HiddenField name="userId" value={Meteor.userId()} />
                    <HiddenField name="createdAt" value={new Date()} />
                    <SelectField name="type" options={options} />

                    <button type='submit'>Add post</button>
                    <button onClick={this.redirect}>Back to posts</button>
                </AutoForm>
            </div>
        )
    }
}
