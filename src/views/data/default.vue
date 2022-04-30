<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import { useStore } from '../../store/pinia';
import DataCard from './dataCard.vue';

//单个卡片的数据
interface singleCard {
  cardid: number,
  chartTypeid: number,//1-列表 2-折线图 3-柱状图 4-大数据图
}
//卡片列表
let cards:Array<singleCard>=reactive([])
//计数卡片ID
let idcount: number = 1

//添加一个卡片，传入卡片可视化的类型ID
function addTable(typeid: number) {
  let card: singleCard = {
    cardid: idcount,
    chartTypeid: typeid
  }
  cards.push(card)
  idcount++
}

onMounted(() => {
  let store = useStore()
  store.getDeviceIDs()
  store.getDevices()
  //addTable(2) //测试用
})

//关闭全部图表
function closeAll() {
  cards.splice(0)
}

</script>

<template>
  <v-card>
    <v-card-text>

      
      <v-menu>
        <template v-slot:activator="{ props }">
          <v-btn color="primary" v-bind="props" size="large" variant="outlined">
            <v-icon>
              mdi-plus
            </v-icon>
            新建图表
          </v-btn>
        </template>
        <v-card>
          <v-list>
            <v-list-item @click="addTable(1)">
              表格
            </v-list-item>
            <v-list-item @click="addTable(2)">
              折线图
            </v-list-item>
            <v-list-item @click="addTable(3)">
              柱状图
            </v-list-item>
            <v-list-item @click="addTable(4)">
              大数据图
            </v-list-item>
          </v-list>
        </v-card>

      </v-menu>
      <v-btn 
        class="right-btn"
        variant="text" 
        size="large" 
        color="error"
        @click="closeAll">
        关闭全部图表
      </v-btn>

    </v-card-text>
  </v-card>

  <div>
    <DataCard 
      v-for="(card) in cards"
      :cardid="card.cardid"
      :data-typeid="card.chartTypeid"
      class="data-card">
    </DataCard>

  </div>


</template>
<style>
.data-card {
  margin-top: 1rem;
}
.right-btn{
  float: right;
}
</style>