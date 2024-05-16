<script setup>
import { defineOptions, inject } from 'vue'

defineOptions({
  name: 'CustomBar',
})
const tabBarList = inject('tabBarList')
</script>

<template>
  <div v-for="(item, index) in tabBarList" :key="index" @click="item.click">
    {{ item?.meta?.title }}
  </div>
</template>

<style>

</style>
