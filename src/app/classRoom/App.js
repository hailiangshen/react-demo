import React, { Component } from "react";
import net from "../../services/netService";
import { Table, Menu } from "antd";
import { Route, Link, Switch } from "react-router-dom";
import moment from "moment";
import ClassRoomDetail from "../classRoomDetail/App";

class ClassRoom extends Component {
    state = {
        classList: [],
        tableColumns: [],
        loading: false,
        pagination: {
            position: "bottom",
            hideOnSinglePage: true,
            onChange: (page, pageSize) => {
                // TODO:
                // state对象存在多层级数据时，setState赋值不方便
                // 如何解决setState异步导致同步函数拿不到state最新值的问题

                this.setState((prevState, props) => {
                    return {
                        pagination: {
                            ...prevState.pagination,
                            current: page,
                            pageSize: pageSize
                        }
                    };
                });
                this.renderClassList();
            },
            current: 1,
            pageSize: 10,
            total: 0
        }
    };
    constructor(props) {
        super(props);

        this.state.tableColumns = [
            {
                title: "校区",
                dataIndex: "schoolName",
                key: "schoolName",
                render: item => <span>{item}</span>
            },
            {
                title: "班级名称",
                dataIndex: "displayClassName",
                key: "displayClassName",
                render: item => <span>{item}</span>
            },
            {
                title: "班主任",
                dataIndex: "teachers",
                key: "teachers",
                render: item => {
                    return <span>{item.map(x => x.name).join("、")}</span>;
                }
            },
            {
                title: "开班日期",
                dataIndex: "openTime",
                key: "openTime",
                render: item => <span>{moment(item).format("YYYY/MM/DD")}</span>
            }
        ];
    }
    render() {
        return (
            <div>
                <Menu mode="horizontal">
                    <Menu.Item key="adminClass">
                        <Link to="/classRoom">
                            <span className="nav-text">行政班</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="otherClass">
                        <Link to="/otherClassRoom">
                            <span className="nav-text">选修班</span>
                        </Link>
                    </Menu.Item>
                </Menu>
                <h1>行政班!</h1>
                <Table
                    dataSource={this.state.classList}
                    columns={this.state.tableColumns}
                    pagination={this.state.pagination}
                    rowKey="id"
                    loading={this.state.loading}
                    onRow={this.onRow}
                />
            </div>
        );
    }

    componentWillMount() {
        console.log("我要被渲染啦");
        this.renderClassList();
    }

    componentDidMount() {
        console.log("我被渲染啦");
    }

    componentWillUnmount() {
        console.log("我要被销毁啦");
    }

    renderClassList = () => {
        this.setState({
            loading: true
        });
        //this.props.match.url
        return net
            .queryClasses({
                schoolId: 38,
                queryClassType: 3,
                page: {
                    pageIndex: this.state.pagination.current,
                    pageSize: this.state.pagination.pageSize
                }
            })
            .then(data => {
                this.setState(prevState => {
                    return {
                        loading: false,
                        classList: data.data.list,
                        pagination: {
                            ...prevState.pagination,
                            total: data.data.totalCount
                        }
                    };
                });
            })
            .catch(err => {
                this.setState({
                    loading: false
                });
            });
    };

    onRow = record => {
        // 行渲染处理
        return {
            onClick: () => {
                this.props.history.push(
                    `${this.props.match.url}/detail/${record.id}`
                );
            }
        };
    };
}

function classRoomRoute() {
    return (
        <Switch>
            <Route path="/classRoom/detail/:id" component={ClassRoomDetail} />
            <Route path="/classRoom" component={ClassRoom} />
        </Switch>
    );
}

export default classRoomRoute;
