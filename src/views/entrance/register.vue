<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import http from '../../plugins/axios';

const router = useRouter()

let mail = ref('');
let vcode = ref('');
let pw = ref('');
let info = ref('');
let infoOpen = ref(false);

function getVcode() {
  http.get('/applyvcode', {
    params: {
      mail: mail.value
    }
  }).then(res => {
    if (res.status === 200) {
      console.log("获取验证码成功，请查收邮箱")
      info.value = "获取验证码成功，请查收邮箱"
      infoOpen.value = true
    } else {
      console.log("获取验证码失败！")
    }
  }).catch(err => {
    info.value = "获取验证码失败，请检查网络"
    infoOpen.value = true
    console.log("获取验证码失败！")
    console.log(err)
  })
}

function registerSubmit() {
  http.post('/register', {
    mail: mail.value,
    vcode: vcode.value,
    pw: pw.value
  }).then(res => {
    if (res.status === 200) {
      info.value = "注册成功，即将跳转登录页面"
      infoOpen.value = true
      console.log("注册成功")
    } else {
      info.value = "注册失败"
      infoOpen.value = true
      console.log("注册失败！")
    }
  }).catch(err => {
    info.value = "注册失败 " + err
    infoOpen.value = true
    console.log(err)
  })
}

</script>

<template>
  <v-card class="d-flex flex-column justify-center">
    <v-card-title class="justify-center">
      注册新账号
    </v-card-title>
    <v-card-text>
      <v-text-field v-model="mail" label="邮箱" :rules="[v => !!v || '请输入用户名']"></v-text-field>
      <v-row>
        <v-col md="8">
          <v-text-field v-model="vcode" label="验证码" :rules="[v => !!v || '请输入验证码']"></v-text-field>
        </v-col>
        <v-col>
          <v-btn variant="outlined" size="large" color="blue" @click="getVcode">获取验证码</v-btn>
        </v-col>
      </v-row>
      <v-text-field v-model="pw" label="密码" :rules="[v => !!v || '请输入密码']" type="password"></v-text-field>
    </v-card-text>
    <v-card-text class="d-flex flex-row">
      <v-btn size="large" @click="router.push({name:'login'})">
        <v-icon>mdi-arrow-left-thick</v-icon>
        登录
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn size="large" color="primary" @click="registerSubmit">
        注册
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
</template>