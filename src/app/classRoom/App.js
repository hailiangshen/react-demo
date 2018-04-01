import React, { Component } from "react";

class ClassRoom extends Component {
    render() {
        return <h1>行政班!</h1>;
    }

    componentWillMount() {
        console.log("我要被渲染啦");
    }

    componentDidMount() {
        console.log("我被渲染啦");
    }

    componentWillUnmount() {
        console.log("我要被销毁啦");
    }
}

export default ClassRoom;
