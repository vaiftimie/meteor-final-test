import React from 'react';

export default class App extends React.Component {
    constructor() {
        super();
    }

    render() {
        const props = this.props;

        return (
            <div className="app-container" id="app-container">
                {props.children}
            </div>
        );
    }
}