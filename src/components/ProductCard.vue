<template>
  <view class="product-card">
    <view class="cover" :style="{ paddingBottom: mediaInfo.ratio }">
      <image :src="mediaInfo.src" mode="aspectFill"></image>
      <view v-if="true" class="status">{{ 888 }}</view>
    </view>
    <text class="title text-truncate-2">{{ value.title }}</text>
    <text class="price">{{ value.title }}</text>
  </view>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const { value } = defineProps<{
  value: any
}>()

const mediaInfo = computed(() => {
  const reg = /width=(?<width>.+)&height=(?<height>.+)/ // 捕获组
  const src = value.fileList[0]
  const capture = reg.exec(src) as RegExpExecArray
  const { width, height } = capture?.groups || { width: 400, height: 800 }
  // 宽高比
  let ratio: number | string = (+height / +width) * 100
  ratio = ratio > 150 ? '150%' : `${ratio}%`
  return { src, ratio }
})
</script>

<style scoped lang="scss">
.product-card {
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
    padding: $uni-spacing-col-base $uni-spacing-row-base;
    font-size: $uni-font-size-lg;
    font-weight: 500;
  }
}
</style>
