import React, { Component } from "react";
import ReactDOM from "react-dom";

class App extends Component {
    render() {
        return (
            <div>
                <h1>App</h1>
                {this.props.children}
            </div>
        );
    }
}

export default App;
