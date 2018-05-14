import { NetApi } from "./base";

class Net {
    getCurrentUser = () => {
        return NetApi.get("/api/MemberShip/GetCurrentUser");
    };

    logout = () => {
        return NetApi.post("/api/MemberShip/logout");
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

    /**
     * schoolId: 38,
     * queryClassType: 行政班3，选修班4
     *
     * @memberof Net
     */
    queryClasses = (data) => {
        return NetApi.post("/api/EducationalAdministration/QueryClasses", data);
    };

    getClassDetails = id => {
        return NetApi.get(
            `/api/EducationalAdministration/GetClassDetails?id=${id}`
        );
    };
}

export default new Net();
