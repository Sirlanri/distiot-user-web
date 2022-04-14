<template>
  <v-app>
    <v-main>
      <topbar></topbar>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Topbar from './components/public/topbar.vue'

export default defineComponent({
    name: "App",
    data() {
        return {
        //
        };
    },
    components: { Topbar }
})
</script>
