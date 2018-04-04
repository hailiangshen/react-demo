import { JavaApi } from "./base";

class Net{
    test() {
        return JavaApi.get('/state/1');
    }
}

export default new Net();