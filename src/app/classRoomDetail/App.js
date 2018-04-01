import React, { Component } from "react";
import net from "../../services/netService";

class ClassRoomDetail extends Component {
    state = {
        detail: {}
    };

    render() {
        return (
            <div>
                <h1>{this.state.detail.className}</h1>
                <span>{JSON.stringify(this.state.detail)}</span>
            </div>
        );
    }

    componentWillMount() {
        this.getDetailData();
    }

    getDetailData = () => {
        net
            .getClassDetails(this.props.match.params.id)
            .then(data => {
                this.setState({
                    detail: data.data
                });
            })
            .catch(err => {});
    };
}

export default ClassRoomDetail;
