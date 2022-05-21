<script setup lang="ts">
import { ref } from 'vue';
import * as mqtt from 'mqtt/dist/mqtt.min'

//输入内容
let topic=ref("distiot/control/web")
let msg=ref("")

//发送
function send() {
  let option={
      keepAlive:60,
      ClientId: 'distiot_ts_' + Math.random().toString(16).slice(-10),
      connectTimeout: 4000
  }
  
  let client=mqtt.connect("tcp://mqtt.ri-co.cn:1883",option)
  client.publish(topic.value,msg.value,{qos:1},(err:any)=>{
    if(!err) {
      console.log('主题为'+topic+ "发布成功")
    }
  })
}
</script>
<template>
  <v-card class="control-card">
    <v-card-text>
      <v-text-field
        label="Topic 主题"
        v-model="topic"
      ></v-text-field>
      <v-textarea
        label="Message 消息"
        v-model="msg"
      ></v-textarea>
      <v-btn size="large" color="primary" @click="send">
        发送
      </v-btn>
    </v-card-text>
    
  </v-card>
</template>
<style>
.control-card{
  margin-top: 1rem;
}

</style>