const vars = {
    namespaced: true,
    state: {
        // ログイン済ユーザID
        login_id: "test",
        //ログインdateを取得
        login_dt: "",
    },
    mutations: {
        // ログイン済みユーザ
        setLoginId(state, args) {
            console.log("Vuex args=" + args);
            state.login_id = args;
        },
        // ログイン時刻
        setLoginDt(state, args) {
            console.log("Vuex dt=" + args);
            state.login_dt = args;
        },
    },
    actions: {},
    modules: {},
};
export default vars;