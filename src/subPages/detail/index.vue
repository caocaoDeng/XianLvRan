<template>
  <view class="detail flex flex-col">
    <Navbar class="custom-navbar">
      <template #left>
        <view></view>
      </template>
    </Navbar>
    <view class="main flex-1">
      <view class="banner-container">
        <swiper class="banner" @change="onSwiperChange">
          <swiper-item v-for="(src, index) in info.fileList" :key="index">
            <image :src="src" mode="aspectFit"></image>
          </swiper-item>
        </swiper>
      </view>
      <view class="title font-medium">{{ info.title }}</view>
      <view class="description" v-if="info.title">{{ info.title }}</view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'
import Navbar from '@/components/Navbar.vue'

// 页面参数
const query = ref<{ id: string }>({
  id: '',
})
// 详情信息
const info = ref()
// 当前轮播激活的下标
const current = ref<number>(0)

onLoad(options => {})

const onSwiperChange = (e: any) => (current.value = e.detail.current)
</script>

<style scoped lang="scss">
.detail {
  width: 100vw;
  height: 100vh;
}
.custom-navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
}
.main {
  .banner-container {
    height: 750rpx;
    .banner {
      height: 100%;
    }
  }
  .title {
    line-height: 2;
  }
}
</style>
