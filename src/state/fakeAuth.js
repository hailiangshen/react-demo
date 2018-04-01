class CurrentUser {
    state = {
        isAuthenticated: false
    };
    setState = state => {
        this.state = state;
    };
}

export default new CurrentUser();
