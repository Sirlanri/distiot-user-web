<script setup lang="ts">

import {  onMounted } from 'vue';
import http from '../../plugins/axios';
import { useStore } from '../../store/pinia';

const store = useStore();





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