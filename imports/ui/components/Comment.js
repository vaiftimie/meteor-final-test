import React from 'react';
import { Meteor } from 'meteor/meteor';

export default class Comment extends React.Component {
    constructor() {
        super();
        this.state = {
            comment: null,
            postUserId: null,
            show: true
        };
        //TODO: set tracker up
    }

    componentDidMount() {
        const comment = this.props.comment;
        const postUserId = this.props.postUserId;
        this.setState({ comment: comment, postUserId: postUserId });
    }

    deleteComment = () => {
        const { comment } = this.state;

        Meteor.call('comments.remove', comment, (err) => {
            if (err)
                alert("There was a problem when atttempting to delete the post comment!");
            this.setState({ show: false });
        });
    }

    render() {
        const { comment } = this.state;
        const { postUserId } = this.state;
        const { show } = this.state;

        if (!comment || !postUserId)
            return <div>Loading....</div>

        return (
            <div>
                {show ?
                    <div>
                        {comment.text}
                        <br></br>
                        Posted by: {comment.userEmail}
                        <br></br>
                        {Meteor.userId() == comment.userId || Meteor.userId() == postUserId
                            ?
                            <div className="deleteButton">
                                <button className="deleteComment" onClick={this.deleteComment}>
                                    Delete comment</button>
                            </div>
                            :
                            null
                        }
                        <br></br>
                        <br></br>
                    </div>
                    :
                    null
                }
            </div>
        );
    }
}