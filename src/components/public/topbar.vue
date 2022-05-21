<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import http from '../../plugins/axios';
import { useStore } from '../../store/pinia';

let router = useRouter()
let store = useStore()

function logout() {
  http.get('/logout')
    .then(res => {
      if (res.status === 200) {
        
        store.logout()
        router.push({ name: 'login' })
      }
    }).catch(err => {
      console.log(err)
    })
}

function openDoc() {
  window.open("https://distdoc.ri-co.cn")
}

//左侧栏
let drawerOpen=ref(true)

function jumpTo(name:string) {
  router.push({name:name})
}
</script>

<template>
<v-app-bar>
  <v-app-bar-nav-icon @click="drawerOpen=!drawerOpen"></v-app-bar-nav-icon>
  <v-toolbar-title>
    Distiot 
    <span class="version-text">V0.2.1</span>
  </v-toolbar-title>
  <v-spacer></v-spacer>
  <v-btn 
    size="large"
    @click="openDoc" >
    文档 
    <v-icon>mdi-open-in-new</v-icon>
  </v-btn>
  <v-menu anchor="start">
    <template v-slot:activator="{ props }">
      <v-btn icon  v-bind="props">
        <v-icon size="large">mdi-chevron-down</v-icon>
      </v-btn>
    </template>
      <v-list>
        <v-list-item @click="logout">
          <v-list-item-title>
            注销登录
          </v-list-item-title>
        </v-list-item>
      </v-list>
    
  </v-menu>
</v-app-bar>

<v-navigation-drawer
  v-model="drawerOpen"
  temporary
>
  <v-list>
    <v-list-item @click="jumpTo('userinfo')">
      用户信息
    </v-list-item>
    <v-list-item @click="jumpTo('data')">
      数据中心
    </v-list-item>
    <v-list-item @click="jumpTo('control')">
      控制硬件
    </v-list-item>
  </v-list>
</v-navigation-drawer>
</template>
<style>
.version-text{
  font-size: x-small;
}
</style>