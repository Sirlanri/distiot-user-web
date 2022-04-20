import { defineStore } from "pinia";

export const useStore = defineStore('pinia', {
  state: () => {
    return {
      userInfo:{
        mail:'',
        level:1,
        token:'',
        dnum:0,
       }
    }
  },

  getters:{
    isLogin:(state)=>{
      return state.userInfo.token!=''
    },
    getToken:(state)=>{
      return state.userInfo.token
    }
  },

  actions: {
    logout(){
      this.userInfo={
        mail:'',
        level:1,
        token:'',
        dnum:0,
       }
    }
  },

  //数据持久化
  persist:{
    enabled:true,
  }
})