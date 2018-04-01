import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";

class App extends Component {
    render() {
        return (
            <div>
                <h1>App</h1>
                <ul>
                    <li>
                        <Link to="/">Index</Link>
                    </li>
                    <li>
                        <Link to="/home">Home</Link>
                    </li>
                </ul>
                {this.props.children}
            </div>
        );
    }
}

export default App;
