<script setup lang="ts">
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

</script>

<template>
<v-app-bar>
  <v-app-bar-nav-icon ></v-app-bar-nav-icon>
  <v-toolbar-title>
    Distiot 
    <span>{{ $route.name }}</span>
  </v-toolbar-title>
  <v-spacer></v-spacer>
  <v-btn size="large">
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
</template>