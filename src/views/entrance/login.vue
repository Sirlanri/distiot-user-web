<script setup lang="ts">
import { ref } from 'vue';
import http from '../../plugins/axios';
import { useRouter } from 'vue-router'
import { useStore } from '../../store/pinia';

const router = useRouter()
const store = useStore()

let usermail = ref('');
let password = ref('');
let info = ref('');
let infoOpen = ref(false);
let btndisabled = ref(false);

function LoginSubmit() {
  btndisabled.value = true;
  http.post('/login', {
    mail: usermail.value,
    pw: password.value
  }).then(res => {
    if (res.status === 200) {
      info.value = "登录成功，即将跳转主页"
      infoOpen.value = true
      //获取用户信息 存入store
      GetUserInfo()
      setTimeout(() => {
        router.push({ name: 'userinfo' })
      }, 1500);
      console.log("登录成功")
    } else {
      console.log("登录失败！")
      btndisabled.value = false;
    }
  }).catch(err => {
    info.value = "登录失败 " + err
    infoOpen.value = true
    btndisabled.value = false;
    console.log(err)
  })
}

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
    <v-card class="d-flex flex-column  justify-center">
      <v-card-title class="justify-center">
        登录
      </v-card-title>
      <v-card-text>
        <v-text-field v-model="usermail" label="邮箱" :rules="[v => !!v || '请输入用户名']"></v-text-field>
        <v-text-field v-model="password" label="密码" :rules="[v => !!v || '请输入密码']" type="password"></v-text-field>
      </v-card-text>
      <v-card-text class="d-flex flex-row">
        <v-btn size="large" @click="router.push({name:'register'})">
          <v-icon>mdi-arrow-left-thick</v-icon>
          注册
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn size="large" color="primary" @click="LoginSubmit" :disabled="btndisabled">
          登录
          <v-icon>mdi-login</v-icon>
        </v-btn>
      </v-card-text>
    </v-card>
    <v-snackbar v-model="infoOpen">
      {{ info }}

      <template v-slot:actions>
        <v-btn color="blue" variant="text" @click="infoOpen = false">
          知道了
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>