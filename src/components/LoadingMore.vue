<template>
  <view class="loading flex flex-col items-center">
    <slot name="icon">
      <view class="icon"></view>
    </slot>
    <view class="text">{{ isMore ? tipText : waitText }}</view>
  </view>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, getCurrentInstance, computed } from 'vue'

const instance = getCurrentInstance()
const observer = uni.createIntersectionObserver(instance?.proxy)

const props = defineProps({
  isMore: Boolean,
  icon: {
    type: String,
    default: () => '',
  },
  text: {
    type: String,
    default: () => '加载中...',
  },
  waitText: {
    type: String,
    default: () => '上拉加载更多',
  },
  noMoreText: {
    type: String,
    default: () => '没有更多了',
  },
})
const isRatio = ref<boolean>(true)

const tipText = computed(() => {
  return isRatio.value ? props.text : props.waitText
})

onMounted(() => {
  observer.relativeToViewport({ bottom: 100 }).observe('.loading', res => {
    isRatio.value = res.intersectionRatio < 0
  })
})

onUnmounted(() => {
  observer.disconnect()
})
</script>

<style lang="scss" scoped>
.loading {
  gap: $uni-spacing-col-base;
  .icon {
    animation: r 0.8s infinite;
  }
  .text {
    font-size: $uni-font-size-sm;
    color: $uni-text-color-grey;
  }
}

@keyframes r {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
