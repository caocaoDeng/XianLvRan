<template>
  <view class="market flex flex-col">
    <Navbar>
      <view class="tabs flex items-center">
        <view
          v-for="item in tabs"
          :key="item.value"
          :class="['tab-item', item.value === tab && 'tab-active']">
          {{ item.name }}
        </view>
      </view>
    </Navbar>
    <view class="category">
      <view class="category-item" v-for="item in category" :key="item.value">{{
        item.name
      }}</view>
    </view>
    <view class="data-list flex-1">
      <WaterFall :data="data" />
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import Navbar from '@/components/Navbar.vue'
import WaterFall from '@/components/Waterfall.vue'

const tab = ref<(typeof tabs)[number]['value']>('index')
const tabs = reactive([
  {
    name: '首页',
    value: 'index',
  },
  {
    name: '三农',
    value: 'support',
  },
] as const)

const category = reactive([
  {
    name: '推荐',
    value: '',
  },
  {
    name: '时蔬',
    value: '',
  },
  {
    name: '鲜果',
    value: '',
  },
  {
    name: '家禽',
    value: '',
  },
  {
    name: '肉类',
    value: '',
  },
  {
    name: '草本',
    value: '',
  },
  {
    name: '宠物',
    value: '',
  },
  {
    name: '其他',
    value: '',
  },
] as const)

const data = ref<
  {
    _id: number
    cover: string
    title: string
    price: number
  }[]
>([])

setTimeout(() => {
  data.value = [
    {
      _id: 0,
      cover:
        'https://cdn.wwads.cn/creatives/twhxiNjfzbJLv5489LUGhtjrJLqwGu9VjcPTOxIQ.png?w=260&h=200',
      title: '🐔',
      price: 888,
    },
    {
      _id: 1,
      cover:
        'https://img1.baidu.com/it/u=3001150338,397170470&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=1422',
      title: '茉莉花',
      price: 128,
    },
    {
      _id: 2,
      cover:
        'https://img1.baidu.com/it/u=2172818577,3783888802&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=1422',
      title: '雪上',
      price: 99999999,
    },
    {
      _id: 3,
      cover:
        'https://img2.baidu.com/it/u=1337068678,3064275007&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=750',
      title: '菊花',
      price: 9.9,
    },
    {
      _id: 4,
      cover:
        'https://img0.baidu.com/it/u=2463093910,286705803&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=787',
      title: '小雏菊',
      price: 9.9,
    },
    {
      _id: 5,
      cover:
        'https://img2.baidu.com/it/u=2869247613,4217707162&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=500',
      title: '松塔',
      price: 99,
    },
    {
      _id: 6,
      cover:
        'https://img2.baidu.com/it/u=1041191017,3841558816&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=667',
      title: '荷花🪷',
      price: 199,
    },
    {
      _id: 7,
      cover:
        'https://img0.baidu.com/it/u=600722015,3838115472&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=750',
      title: '小鸟',
      price: 88,
    },
    {
      _id: 8,
      cover:
        'https://img2.baidu.com/it/u=1475620981,3889677523&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=1067',
      title: '故事的小黄花',
      price: 19.9,
    },
    {
      _id: 9,
      cover:
        'https://img2.baidu.com/it/u=661612237,3556829695&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=910',
      title: '立秋',
      price: 1.9,
    },
  ]
}, 1000)
</script>

<style scoped lang="scss">
.market {
  width: 100vw;
  height: 100vh;
}
.tabs {
  .tab-item {
    position: relative;
    padding: $uni-spacing-col-base $uni-spacing-row-base;
    &.tab-active {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 88rpx;
      height: 66rpx;
      border-radius: 50%;
      border-bottom: 8rpx;
    }
  }
}
</style>
