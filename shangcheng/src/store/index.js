import { createStore } from "vuex";
// import { persistedPlugin } from "vuex-persisted-plugin";
import createPersistedState from "vuex-persistedstate"
export default createStore({
    state:{
        isGetterRouter:false,
        isCollapsed:false,
        userInfo:{}
    },
    getters:{

    },
    mutations:{
        changeGetterRouter(state,value){
            state.isGetterRouter = value
        },
        //控制侧边栏的展开
        changeCollapsed(state){
            state.isCollapsed =!state.isCollapsed
        },
        changeUserInfo(state,value){
            state.userInfo = {
                ...state.userInfo,
                ...value
            }
        },
        clearUserInfo(state,value){
            state.userInfo = {}
        }
    },
    actions:{

    },
    modules:{

    },
    // plugins: [
    //     persistedPlugin({
    //      paths: ["isCollapsed"]//控制是否持久化
    //     })
    //    ],
    plugins: [createPersistedState({
            paths: ["isCollapsed","userInfo"] // 这里便只会缓存user下的state值
        })]

})