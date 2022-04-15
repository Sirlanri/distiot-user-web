<script setup lang="ts">

import {  onMounted } from 'vue';
import http from '../../plugins/axios';
import { useStore } from '../../store/pinia';

const store = useStore();


onMounted(()=>{
  if (!store.isLogin) {
    GetUserInfo()
  }
})

//登录后 获取用户的信息
function GetUserInfo() {
  http.get('/getuserinfo')
    .then(res=>{
    if(res.status===200){
      let data={
        mail:'',
        level:1,
        token:'',
        dnum:0,
      }
      data.dnum=res.data.dnum
      data.level=res.data.level
      data.mail=res.data.mail
      data.token=res.data.token
      store.userInfo=data
    }
  }).catch(err=>{
    console.log(err)
  })
}
</script>
<template>
<div>
  <v-card>
    <v-card-title>
      用户信息
    </v-card-title>
    <v-card-text>
 邮箱：{{store.userInfo.mail}}
    </v-card-text>
    <v-card-text>
      用户Token：<br>
      <span class="user-token">
        {{store.userInfo.token}}
      </span>
    </v-card-text>
  </v-card>
</div>
</template>
<style>
.user-token{
  font-size: large;
}
</style>