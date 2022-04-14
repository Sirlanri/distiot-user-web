<script setup lang="ts">
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
  <v-btn icon>
    <v-icon size="large">mdi-chevron-down</v-icon>
  </v-btn>
</v-app-bar>
</template>