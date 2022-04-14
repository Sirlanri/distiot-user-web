<template>
  <v-app>
    <v-main>
      <topbar></topbar>
      <v-container>
        <v-row no-gutters>
          <v-col md="11" offset-md="0.5">
            <router-view/>
          </v-col>
        </v-row>
      </v-container>
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
