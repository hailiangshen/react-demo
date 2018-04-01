import { NetApi } from "./base";

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

    /**
     * schoolId: 38,
     * queryClassType: 行政班3，选修班4
     *
     * @memberof Net
     */
    queryClasses = ({ schoolId, queryClassType, page }) => {
        return NetApi.post("/api/EducationalAdministration/QueryClasses", {
            schoolId,
            queryClassType,
            page
        });
    };

    getClassDetails = id => {
        return NetApi.get(
            `/api/EducationalAdministration/GetClassDetails?id=${id}`
        );
    };
}

export default new Net();
