<script setup lang="ts">
import { ref } from 'vue';
import { MQClient } from '../../plugins/mqtt';

//输入内容
let topic=ref("distiot/control/web/")
let msg=ref("")

//发送
function send() {
  let client=new MQClient()
  client.publish(topic.value,msg.value)
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