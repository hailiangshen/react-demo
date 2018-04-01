import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
    _timer;
    constructor(props) {
        super(props);

        this.state = {
            num: 3
        };
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Welcome to React</h1>
                </header>
                <p className="App-intro">Welcome Page!</p>
                <h2>{this.state.num}</h2>
            </div>
        );
    }

    componentDidMount() {
        this._timer = setInterval(
            (n => {
                return () => {
                    this.setState({ num: --n });
                    if (n <= 0) {
                        // this.props.history.push("/");
                        window.clearInterval(this._timer);
                        this._timer = null;
                    }
                };
            })(this.state.num),
            1000
        );
    }

    componentWillUnmount() {
        if (this._timer) {
            window.clearInterval(this._timer);
            this._timer = null;
        }
    }
}

export default App;
