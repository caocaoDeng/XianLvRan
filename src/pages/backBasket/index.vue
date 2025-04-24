<template>
  <view class="back-basket">
    <view class="card" v-for="(value, key) in groupByUser" :key="key">
      <view v-if="value.length > 1" class="supplier">{{
        getSupplier(key as string)
      }}</view>
      <view class="body">
        <view
          class="product-item"
          v-for="{ _id, count, product } in value"
          :key="_id">
          <image class="cover" :src="product.cover"></image>
          <view class="info">
            <view class="product-title">{{ product.title }}</view>
            <Count :value="count"></Count>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed, reactive } from 'vue'
import Count from '@/components/Count.vue'

interface BackBasket {
  _id: string
  count: number
  product: {
    _id: string
    cover: string
    title: string
    price: number
  }
  user: {
    _id: string
    nickname: string
  }
}

const dataList = reactive<BackBasket[]>([])

const groupByUser = computed(() => {
  const obj: { [key: string]: BackBasket[] } = {}
  dataList.forEach(item => {
    const key = `${item.user.nickname}_${item.user._id}`
    obj[key] ? obj[key].push(item) : (obj[key] = [item])
  })
  return obj
})

const getSupplier = (str: string) => str.split('_').at(0)
</script>
