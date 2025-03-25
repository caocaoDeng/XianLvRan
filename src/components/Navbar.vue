<template>
  <view
    :style="cssVariable"
    :class="[
      'navbar flex items-center justify-between',
      border && 'border-b-1',
    ]">
    <slot>
      <view class="navbar-left">
        <slot name="left"></slot>
      </view>
      <view class="navbar-center flex-1">
        <slot></slot>
      </view>
      <view class="navbar-right">
        <slot name="right"></slot>
      </view>
    </slot>
    <view class="ad-warp">
      <slot name="ad"></slot>
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const { border, backgroundColor } = defineProps<{
  border?: boolean
  backgroundColor?: string
}>()

const cssVariable = computed(() => ({
  '--background-color': backgroundColor || '#FFF',
}))
</script>

<style scoped lang="scss">
.navbar {
  position: relative;
  height: 44px;
  padding: var(--status-bar-height) $uni-spacing-row-lg 0;
  background-color: var(--background-color);
  &-left,
  &-right {
    width: 30px;
    height: 30px;
  }
  .ad-warp {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    width: 200rpx;
  }
}
</style>
