<template>
  <view class="detail flex flex-col">
    <swiper
      class="swiper"
      :style="{ '--swiper-height': `${swiperHeight}rpx` }"
      @change="onSwiperChange">
      <swiper-item v-for="(src, index) in info.fileList" :key="index">
        <image class="img" :src="src" mode="aspectFit"></image>
      </swiper-item>
    </swiper>
    <view class="title font-medium">{{ info.title }}</view>
    <view class="desc" v-if="info.title">{{ info.title }}</view>
    <view class="address flex items-center">
      <text class="iconfont icon-zhiyuandidian1"></text>
      <text class="truncate flex-1">{{ info.mark }}</text>
      <text class="iconfont icon-fanhui-copy"></text>
    </view>
  </view>
</template>

<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app'
import { ref, computed, watch } from 'vue'

export interface Query {
  id: string
  examline: boolean
}
// 页面参数
const query = ref<Query>({
  id: '',
  examline: false,
})
// 详情信息
const info = ref()
// 轮播器的高度
const swiperHeight = ref<number>(750)
// 当前轮播激活的下标
const current = ref<number>(0)

// 根据最小图片比例设置swiper高度
watch(info, value => {
  const imgList: string[] = value.fileList || []
  // 捕获组
  const reg = /width=(?<width>.+)&height=(?<height>.+)/
  const defaultValue = { width: '400', height: '800' }
  const maxHeight = 750 * 1.5
  const { width, height } =
    imgList
      // 捕获组数据
      .map(src => reg.exec(src)?.groups || defaultValue)
      // 升序
      .sort((a, b) => {
        const valueA = +a.width / +a.height
        const valueB = +b.width / +b.width
        return Math.abs(valueA - valueB)
      })
      .at(0) || defaultValue
  const computedHeight = (+height / +width) * 750
  swiperHeight.value = computedHeight > maxHeight ? maxHeight : computedHeight
})

onLoad(async options => {})

const onSwiperChange = (e: any) => {
  current.value = e.detail.current
}
</script>

<style scoped lang="scss">
.swiper {
  width: 100%;
  height: var(--swiper-height);
  .img {
    width: 100%;
    height: 100%;
  }
}
.title {
  line-height: 2;
}
.text {
  font-size: $uni-font-size-base;
  white-space: pre-wrap;
  line-height: 1.8;
}
.address {
  gap: $uni-spacing-row-sm;
  font-size: $uni-font-size-base;
  padding: $uni-spacing-col-base $uni-spacing-row-base;
  border-radius: $uni-border-radius-lg;
  background-color: $uni-bg-color-grey;
  .icon-fanhui-copy {
    color: $uni-text-color-grey;
  }
}
</style>
