import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Home from "./app/home/App";
import Login from "./app/login/App";
/**
 * Router 4.0：
 * React Router被拆分成三个包：
 *      react-router：提供核心的路由组件与函数，
 *      react-router-dom：浏览器环境所需的特定组件，【进行WEB开发时仅需引入该包即可】
 *      react-router-native：react-native环境所需的特定组件。
 *
 * Router
 *      BrowserRouter：html5Mode，需要服务器支持
 *      HashRouter：hash，适用与静态网站
 *
 */
import { BrowserRouter, HashRouter, Route, Switch } from "react-router-dom";
import net from "./services/netService";
import javaNet from "./services/javaNetServices";
import { axios } from "./services/base";
import currentUser from "./state/fakeAuth";
import registerServiceWorker from "./registerServiceWorker";

// ReactDOM.render(<App />, document.getElementById("root"));

// ReactDOM.render(
//     <Router>
//         <Switch>
//             <Route path="/" component={Home} />
//             <Route path="/login" component={Login} />
//         </Switch>
//     </Router>,
//     document.getElementById("root")
// );

// ReactDOM.render(
//     <Router>
//         <Route path="/" component={Home}>
//             <Route path="classRoom" component={ClassRoom} />
//             <Route path="login" component={Login} />
//         </Route>
//     </Router>,
//     document.getElementById("root")
// );

net.getCurrentUser().then(data => {
    currentUser.setState(data.data);
    ReactDOM.render(
        <BrowserRouter>
            <Switch>
                <Route path="/login" component={Login} />
                <Route path="/" component={Home} />
            </Switch>
        </BrowserRouter>,
        document.getElementById("root")
    );
});

// javaNet.test().then(data => {
//     console.log('Java 接口测试', data);
// }).catch(err => {
//     console.error(err);
// })

registerServiceWorker();
