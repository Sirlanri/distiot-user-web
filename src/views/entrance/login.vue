<script setup lang="ts">
import { ref } from 'vue';
import http from '../../plugins/axios';
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
let usermail = ref('');
let password = ref('');
let info = ref('');
let infoOpen = ref(false);

function LoginSubmit() {
  http.post('/login', {
    mail: usermail.value,
    pw: password.value
  }).then(res => {
    if (res.status === 200) {
      info.value = "登录成功，即将跳转主页"
      infoOpen.value = true
      console.log("登录成功")
    } else {
      console.log("登录失败！")
    }
  }).catch(err => {
    info.value = "登录失败 " + err
    infoOpen.value = true
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
        <v-btn size="large" color="primary" @click="LoginSubmit">
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