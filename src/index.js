import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Home from "./app/home/App";
import Login from "./app/login/App";
import {
    BrowserRouter as Router,
    // HashRouter,
    Route,
    Switch
} from "react-router-dom";
import net from "./services/netService";
import javaNet from './services/javaNetServices';
import { axios} from './services/base';
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
        <Router>
            <Switch>
                <Route path="/login" component={Login} />
                <Route path="/" component={Home} />
            </Switch>
        </Router>,
        document.getElementById("root")
    );
});

// javaNet.test().then(data => {
//     console.log('Java 接口测试', data);
// }).catch(err => {
//     console.error(err);
// })

axios.get('http://localhost:9000/state/1', {
    withCredentials: true
}).then(data => {
    console.log(data);
}).catch(err => {
    console.error(err);
})

registerServiceWorker();
