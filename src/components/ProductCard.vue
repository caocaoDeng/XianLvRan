<template>
  <view class="product-card">
    <view class="cover" :style="{ paddingBottom }">
      <image :src="info.cover" mode="aspectFill"></image>
      <view v-if="true" class="status">{{ 888 }}</view>
    </view>
    <view class="title text-truncate-2">{{ info.title }}</view>
    <view class="price">{{ info.price }}</view>
  </view>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { getSizeForUrl } from '@/utils/index'

const { info } = defineProps<{
  info: any
}>()

const paddingBottom = computed(() => {
  const { w, h } = getSizeForUrl(info.cover)
  const ratio = (h / w) * 100 // 宽高比
  return ratio > 150 ? '150%' : `${ratio}%`
})
</script>

<style scoped lang="scss">
.product-card {
  overflow: hidden;
  border-radius: $uni-border-radius-base;
  background-color: #fff;
  .cover {
    position: relative;
    image {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
    .status {
      position: absolute;
      color: #fff;
      top: $uni-spacing-col-base;
      right: $uni-spacing-row-base;
      font-size: $uni-font-size-sm;
      padding: $uni-spacing-col-sm $uni-spacing-row-sm;
      border-radius: $uni-border-radius-base;
      background-color: $uni-bg-color-mask;
    }
  }
  .title {
    padding: $uni-spacing-col-base $uni-spacing-row-base;
    font-size: $uni-font-size-base;
    font-weight: 500;
  }
  .price {
    color: red;
    padding: 0 $uni-spacing-row-base;
    font-size: $uni-font-size-lg;
    font-weight: 500;
  }
}
</style>
