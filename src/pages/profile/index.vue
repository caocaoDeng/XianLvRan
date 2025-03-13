<template>
  <WaterFall :col="3" :data="data" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import WaterFall from '@/components/Waterfall.vue'

const data = ref<
  {
    cover: string
    title: string
    price: number
  }[]
>([])

setTimeout(() => {
  data.value = [
    {
      cover:
        'https://cdn.wwads.cn/creatives/twhxiNjfzbJLv5489LUGhtjrJLqwGu9VjcPTOxIQ.png?w=260&h=200',
      title: '🐔',
      price: 888,
    },
    {
      cover:
        'https://img1.baidu.com/it/u=3001150338,397170470&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=1422',
      title: '茉莉花',
      price: 128,
    },
    {
      cover:
        'https://img1.baidu.com/it/u=2172818577,3783888802&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=1422',
      title: '雪上',
      price: 99999999,
    },
    {
      cover:
        'https://img2.baidu.com/it/u=1337068678,3064275007&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=750',
      title: '菊花',
      price: 9.9,
    },
    {
      cover:
        'https://img0.baidu.com/it/u=2463093910,286705803&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=787',
      title: '小雏菊',
      price: 9.9,
    },
    {
      cover:
        'https://img2.baidu.com/it/u=2869247613,4217707162&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=500',
      title: '松塔',
      price: 99,
    },
    {
      cover:
        'https://img2.baidu.com/it/u=1041191017,3841558816&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=667',
      title: '荷花🪷',
      price: 199,
    },
    {
      cover:
        'https://img0.baidu.com/it/u=600722015,3838115472&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=750',
      title: '小鸟',
      price: 88,
    },
    {
      cover:
        'https://img2.baidu.com/it/u=1475620981,3889677523&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=1067',
      title: '故事的小黄花',
      price: 19.9,
    },
    {
      cover:
        'https://img2.baidu.com/it/u=661612237,3556829695&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=910',
      title: '立秋',
      price: 1.9,
    },
  ]
}, 1000)
</script>

<style scoped lang="scss"></style>
