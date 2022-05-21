<script setup lang="ts">

//卡片控制

import { ref } from 'vue';
import ControlCard from './controlCard.vue';

//卡片列表
let cards=ref(5)
function closeAll() {
  cards.value=0
}

</script>
<template>
  <v-card>
    <v-card-text>
      <v-btn color="primary" size="large" variant="outlined">
        <v-icon>
          mdi-plus
        </v-icon>
        新增控制卡片
      </v-btn>
      <v-btn 
        class="right-btn"
        variant="text" 
        size="large" 
        color="error"
        @click="closeAll">
        关闭全部
      </v-btn>
    </v-card-text>
  </v-card>
  <v-row>
    <v-col md="6" v-for="card in cards">
      <ControlCard
      ></ControlCard>
    </v-col>
  </v-row>
</template>
<style>
.right-btn{
  float: right;
}
</style>