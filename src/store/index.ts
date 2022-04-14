import { createStore } from 'vuex'

const state = {
 userInfo:{
  mail:'',
  level:1,
  token:'',
  dnum:0,
 }
}

const mutations = {
  setUserInfo(state:any, userInfo: any) {
    state.userInfo = userInfo
  }
}

const getters = {
  getUserToken:(state:any)=>{
    return state.userInfo.token
  },
  isLogin:(state:any)=>{
    return state.userInfo.token!=''
  }
}

const actions = {

}

const modules = {

}

export default createStore({
  state,
  getters,
  mutations,
  actions,
  modules
})
