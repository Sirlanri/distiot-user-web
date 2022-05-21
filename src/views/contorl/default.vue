<script setup lang="ts">

//卡片控制

import { ref } from 'vue';
import ControlCard from './controlCard.vue';

//卡片列表
let cards=ref(2)
function closeAll() {
  cards.value=0
}

//打开文档站
function openDoc() {
  window.open("https://distdoc.ri-co.cn/2022/04/24/%e5%85%8d%e8%b4%b9mqtt%e6%9c%8d%e5%8a%a1%e5%99%a8/")
}
</script>
<template>
  <v-card>
    <v-card-text>
      <v-btn 
        @click="cards++"
        color="primary"
        size="large"
        variant="outlined">
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
      <v-tooltip anchor="bottom">
        <template v-slot:activator="{ props }">
            <v-btn
              class="right-btn"
              variant="text" 
              size="large"
              color="blue"
              v-bind="props"
              @click="openDoc"
            >
              MQTT服务器
            </v-btn>
          </template>
          <span>
            mqtt.ri-co.cn:1883 <br>
            点击查看详情
          </span>
      </v-tooltip>
      
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