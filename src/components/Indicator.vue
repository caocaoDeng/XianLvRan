<template>
  <view :class="['indicator', props.placement]" :style="cssVariable"></view>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  count: {
    type: Number,
    required: true,
  },
  current: {
    type: Number,
    default: () => 0,
  },
  color: {
    type: String,
    default: () => 'rgba(0, 0, 0, 0.4)',
  },
  activeColor: {
    type: String,
    default: () => '#FFFFFF',
  },
  placement: {
    type: String,
    default: () => 'bottom',
  },
})

const cssVariable = computed(() => {
  const { count, current, color, activeColor } = props
  return {
    '--racewayWidth': '80rpx',
    '--count': count,
    '--current': current,
    '--color': color,
    '--activeColor': activeColor,
  }
})
</script>

<style lang="scss" scoped>
.indicator {
  position: relative;
  width: var(--racewayWidth);
  height: 20rpx;
  border-radius: $uni-border-radius-base;
  background-color: var(--color);
  &.top,
  &.bottom {
    left: 50%;
    transform: translateX(-50%);
  }
  &.top {
    top: 20rpx;
  }
  &.bottom {
    bottom: 20rpx;
  }
  &.left,
  &.right {
    top: 50%;
    transform: translateY(-50%) rotate(90deg);
  }
  &.left {
    left: 20rpx;
  }
  &.right {
    right: 20rpx;
  }
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: calc(var(--racewayWidth) / var(--count));
    height: 100%;
    transform: translateX(
      calc(var(--racewayWidth) / var(--count) * var(--current))
    );
    background-color: var(--activeColor);
  }
}
</style>
