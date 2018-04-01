import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import Home from "./app/home/App";
import Login from "./app/login/App";
import ClassRoom from "./app/home/App";
import {
    BrowserRouter as Router,
    HashRouter,
    Route,
    Switch
} from "react-router-dom";
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

ReactDOM.render(
    <Router>
        <Home>
            <Route path="/" exact component={Login} />
        </Home>
    </Router>,
    document.getElementById("root")
);

registerServiceWorker();
