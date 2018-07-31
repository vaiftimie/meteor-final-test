import React from 'react';

export default class PostList extends React.Component {
    constructor() {
        super();
        this.state = { posts: null };
    }

    componentDidMount() {
        Meteor.call('post.list', (err, posts) => {
            this.setState({ posts });
        });
    }

    _handleDelete(id) {
        Meteor.call('post.remove', id, (err) => {
            if (err)
                alert("For some reason the post could not be deleted!");
            else
                Meteor.call('post.list', (err, posts) => {
                    this.setState({ posts });
                });
        });

    }

    render() {
        const { posts } = this.state;
        const { history } = this.props;

        if (!posts) {
            return <div>Loading....</div>
        }

        return (
            <div className="post">
                {
                    posts.map((post) => {
                        return (
                            <div key={post._id}>
                                <p>Post id: {post._id} </p>
                                <p>Post title: {post.title}, Post Description: {post.description} </p>
                                <p>Number of views: {post.views}</p>
                                <p>Number of comments: {post.commentsNumber}</p>


                                <button onClick={() => {
                                    history.push("/posts/view/" + post._id)
                                }}> View post
                                </button>

                                {Meteor.userId() == post.userId
                                    ?
                                    <div className="posterButtons">
                                        <button onClick={() => {
                                            history.push("/posts/edit/" + post._id)
                                        }}> Edit post
                                    </button>
                                        <button onClick={this._handleDelete.bind(this, post._id)}>
                                            Delete post</button>
                                    </div>
                                    :
                                    <div className="posterButtons">
                                    </div>
                                }
                            </div>
                        )
                    })}
                <button onClick={() => history.push('/posts/create')}>Create a new post</button>
            </div>
        )
    }
}
