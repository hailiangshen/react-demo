import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Form, Icon, Input, Button } from "antd";
import { Redirect } from "react-router-dom";
import net from "../../services/netService";
import store from "../../state/store";

const FormItem = Form.Item;

function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class HorizontalLoginForm extends React.Component {
    componentDidMount() {
        // To disabled submit button at the beginning.
        this.props.form.validateFields();
    }
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log("Received values of form: ", values);
                net
                    .login(values)
                    .then(data => {
                        this.props.history.push("/");
                    })
                    .catch(err => {
                        console.error(err);
                    });
            }
        });
    };
    render() {
        const {
            getFieldDecorator,
            getFieldsError,
            getFieldError,
            isFieldTouched
        } = this.props.form;

        // Only show error after a field is touched.
        const userNameError =
            isFieldTouched("userName") && getFieldError("userName");
        const passwordError =
            isFieldTouched("password") && getFieldError("password");
        return (
            <Form layout="inline" onSubmit={this.handleSubmit}>
                <FormItem
                    validateStatus={userNameError ? "error" : ""}
                    help={userNameError || ""}
                >
                    {getFieldDecorator("userName", {
                        rules: [
                            {
                                required: true,
                                message: "Please input your username!"
                            }
                        ]
                    })(
                        <Input
                            prefix={
                                <Icon
                                    type="user"
                                    style={{ color: "rgba(0,0,0,.25)" }}
                                />
                            }
                            placeholder="Username"
                        />
                    )}
                </FormItem>
                <FormItem
                    validateStatus={passwordError ? "error" : ""}
                    help={passwordError || ""}
                >
                    {getFieldDecorator("password", {
                        rules: [
                            {
                                required: true,
                                message: "Please input your Password!"
                            }
                        ]
                    })(
                        <Input
                            prefix={
                                <Icon
                                    type="lock"
                                    style={{ color: "rgba(0,0,0,.25)" }}
                                />
                            }
                            type="password"
                            placeholder="Password"
                        />
                    )}
                </FormItem>
                <FormItem>
                    <Button
                        type="primary"
                        htmlType="submit"
                        disabled={hasErrors(getFieldsError())}
                    >
                        Log in
                    </Button>
                </FormItem>
            </Form>
        );
    }
}

const WrappedHorizontalLoginForm = Form.create()(HorizontalLoginForm);

class App extends Component {
    _timer;
    constructor(props) {
        super(props);

        this.state = {
            num: 3
        };
    }

    render() {
        if (store.getState().currentUser.isAuthenticated) {
            return <Redirect to={{ pathname: "/" }} />;
        }
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Welcome to React</h1>
                </header>
                <p className="App-intro" style={{ marginTop: "15px" }}>
                    请先登录
                </p>
                <WrappedHorizontalLoginForm />
            </div>
        );
    }

    componentDidMount() {
        // this._timer = setInterval(
        //     (n => {
        //         return () => {
        //             this.setState({ num: --n });
        //             if (n <= 0) {
        //                 // this.props.history.push("/");
        //                 window.clearInterval(this._timer);
        //                 this._timer = null;
        //             }
        //         };
        //     })(this.state.num),
        //     1000
        // );
    }

    componentWillUnmount() {
        if (this._timer) {
            window.clearInterval(this._timer);
            this._timer = null;
        }
    }
}

export default App;
