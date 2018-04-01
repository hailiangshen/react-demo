import { NetApi, JavaApi } from "./base";

class Net {
    getCurrentUser = () => {
        return NetApi.get("/api/MemberShip/GetCurrentUser");
    };
    login = ({ userName, password }) => {
        return NetApi({
            url: "/api/MemberShip/Login",
            data: {
                Name: userName,
                Password: password
            },
            method: "Post"
        });
    };
}

export default new Net();
