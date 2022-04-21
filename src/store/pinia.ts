import { defineStore } from "pinia";
import http from "../plugins/axios";

export const useStore = defineStore('pinia', {
  state: () => {
    return {
      userInfo:{
        mail:'',
        level:1,
        token:'',
        dnum:0,
       },
       deviceIDS:Array<number>,
       devices:Array<any>
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
    },

    getDeviceIDs(){
      http.get('/getdeviceids').then(res=>{
        this.deviceIDS=res.data
      })
    },

    getDevices(){
      http.get('/getdevices').then(res=>{
        this.devices=res.data
      })
    }
  },

  //数据持久化
  persist:{
    enabled:true,
  }
})