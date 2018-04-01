class CurrentUser {
    state = {
        isAuthenticated: false
    };
    constructor() {}
    setState = state => {
        this.state = state;
    };
}

export default new CurrentUser();
