<script setup lang="ts">
import { ref } from 'vue';

let usermail = ref('');
let password = ref('');

function LoginSubmit() {
  
}
</script>

<template>
  <div>
    <v-row>
      <v-col md="6" offset-md="3">
        <v-card class="d-flex flex-column justify-center">
          <v-card-title>
            登录
          </v-card-title>
          <v-card-text>
            <v-text-field v-model="usermail" label="邮箱" :rules="[v => !!v || '请输入用户名']"></v-text-field>
            <v-text-field v-model="password" label="密码" :rules="[v => !!v || '请输入密码']" type="password"></v-text-field>
          </v-card-text>
          <v-card-text class="d-flex flex-row">
            <v-btn  size="large">
              <v-icon>mdi-arrow-left-thick</v-icon>
              注册
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn size="large" color="primary">
              登录
              <v-icon>mdi-login</v-icon>
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>


  </div>
</template>