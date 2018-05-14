import React, { Component } from "react";
// import { lifecycle } from "react-router";
import { Route, Link, Switch, Redirect } from "react-router-dom";
import ClassRoom from "../classRoom/App";
import Student from "../student/App";
import OtherClassRoom from "../otherClassRoom/App";
import MyStudent from "../myStudent/App";
import PageNotFound from "../404/App";
import "./App.css";
import { Layout, Menu, Breadcrumb, Icon } from "antd";
import store from "../../state/store";
import * as actionsTypes from "../../state/actionTypes";
import net from "../../services/netService";
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

const requireAuth = (nextState, replace, next) => {
    console.log("requireAuth");
    if (!store.getState().currentUser.isAuthenticated) {
        replace({ pathname: "/login" }); // 路由转发
    }
    next();
};

class App extends Component {
    state = {
        collapsed: false,
        currentUser: store.getState().currentUser
    };
    // onCollapse = collapsed => {
    //     this.setState({ collapsed });
    // };
    toggle = () => {
        this.setState({ collapsed: !this.state.collapsed }, nextState => {});
    };
    onSelect = ({ item, key, selectedKeys }) => {
        console.log(key);
    };
    logout = () => {
        net.logout().then(() => {
            store.dispatch({
                type: actionsTypes.CLEAR_CURRENT_USER,
                data: null
            });
            this.props.history.push("/login");
        });
    };
    render() {
        if (!this.state.currentUser.isAuthenticated) {
            return (
                <Redirect
                    to={{
                        pathname: "/login",
                        state: { from: this.props.location }
                    }}
                />
            );
        }
        return (
            <Layout>
                <Sider
                    collapsible
                    collapsed={this.state.collapsed}
                    trigger={null}
                    // onCollapse={this.onCollapse}
                    width={200}
                >
                    <div
                        className="logo"
                        data-text={this.state.currentUser.displayName || "Logo"}
                    />
                    <Menu
                        mode="inline"
                        theme="dark"
                        // defaultSelectedKeys={["1"]}
                        // defaultOpenKeys={["sub1"]}
                        style={{ height: "100%", borderRight: 0 }}
                        onSelect={this.onSelect}
                    >
                        <SubMenu
                            key="classRoom"
                            title={
                                <span>
                                    <Icon type="user" />
                                    <span>班级列表</span>
                                </span>
                            }
                        >
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
                        </SubMenu>
                        <SubMenu
                            key="student"
                            title={
                                <span>
                                    <Icon type="user" />
                                    <span>学生列表</span>
                                </span>
                            }
                        >
                            <Menu.Item key="myStudent">
                                <Link to="/myStudent">
                                    <span className="nav-text">我的学生</span>
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="student">
                                <Link to="/student">
                                    <span className="nav-text">全部学生</span>
                                </Link>
                            </Menu.Item>
                        </SubMenu>
                        <SubMenu
                            key="sub1"
                            title={
                                <span>
                                    <Icon type="qq" />
                                    <span>User</span>
                                </span>
                            }
                        >
                            <Menu.Item key="7">Tom</Menu.Item>
                            <Menu.Item key="8">Bill</Menu.Item>
                            <Menu.Item key="9">Alex</Menu.Item>
                        </SubMenu>
                        <Menu.Item key="3">
                            <Icon type="pie-chart" />
                            <span>Menu 3</span>
                        </Menu.Item>
                        <Menu.Item key="4">
                            <Icon type="pie-chart" />
                            <span>Menu 4</span>
                        </Menu.Item>
                        <Menu.Item key="5">
                            <Icon type="pie-chart" />
                            <span>Menu 5</span>
                        </Menu.Item>
                    </Menu>
                </Sider>

                <Layout>
                    <Header
                        className="header"
                        style={{ background: "#fff", padding: 0 }}
                    >
                        <Icon
                            className="trigger"
                            type={
                                this.state.collapsed
                                    ? "menu-unfold"
                                    : "menu-fold"
                            }
                            onClick={this.toggle}
                        />
                        <Icon
                            className="trigger logout"
                            type="logout"
                            title="logout"
                            onClick={this.logout}
                        />
                    </Header>

                    <Layout style={{ padding: "0 24px 24px" }}>
                        <Breadcrumb style={{ margin: "16px 0" }}>
                            <Breadcrumb.Item>Home</Breadcrumb.Item>
                            <Breadcrumb.Item>List</Breadcrumb.Item>
                            <Breadcrumb.Item>App</Breadcrumb.Item>
                        </Breadcrumb>
                        <Content
                            style={{
                                background: "#fff",
                                padding: 24,
                                margin: 0,
                                minHeight: 280
                            }}
                        >
                            <Switch>
                                <Route
                                    path="/"
                                    exact
                                    render={() => <h1>哈哈哈哈哈哈！</h1>}
                                />
                                <Route
                                    path="/classRoom"
                                    component={ClassRoom}
                                    onEnter={requireAuth}
                                />
                                <Route
                                    path="/otherClassRoom"
                                    component={OtherClassRoom}
                                    onEnter={requireAuth}
                                />
                                <Route
                                    path="/student"
                                    component={Student}
                                    onEnter={requireAuth}
                                />
                                <Route
                                    path="/myStudent"
                                    component={MyStudent}
                                    onEnter={requireAuth}
                                />
                                <Route component={PageNotFound} />
                            </Switch>
                        </Content>
                    </Layout>
                </Layout>
            </Layout>
        );
    }
}

export default App;
