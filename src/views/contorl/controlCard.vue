<script setup lang="ts">

</script>
<template>
  <v-card class="control-card">
    <v-card-text>
      <v-text-field
        label="Topic 主题"
      ></v-text-field>
      <v-textarea
        label="Message 消息"
      ></v-textarea>
      <v-btn size="large" color="primary">
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