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
    }
  },

  actions: {

  },
})