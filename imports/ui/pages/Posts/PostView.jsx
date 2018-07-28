import React from 'react';

export default class PostView extends React.Component {
    constructor() {
        super();
        this.state = {post: null};
    }

    componentDidMount() {
        Meteor.call('post.incrementViews', this.props.match.params._id, (err, post) => {
            this.setState({post});
        });
    }

    render() {
        const {history} = this.props;
        const {post} = this.state;

        if (!post) {
            return <div>Loading....</div>
        }

        return (
            <div className="post">
                <p>Post title: {post.title}</p>
                <p>Post description: {post.description}</p>
                <p>Post views: {post.views}</p>
                <button onClick={() => history.push('/posts')}>Back to posts</button>
            </div>
        )
    }
}
