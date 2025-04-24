<template>
  <view class="count flex items-center">
    <view class="sub" @click="handler(ActionType.SUB)"></view>
    <view class="num">{{ value }}</view>
    <view class="add" @click="handler(ActionType.ADD)"></view>
  </view>
</template>

<script setup lang="ts">
export enum ActionType {
  SUB = 'sub',
  ADD = 'add',
}

export type Action = ActionType.SUB | ActionType.ADD

const { value } = defineProps<{
  value: number
}>()

const emit = defineEmits<{
  (e: 'action', type: Action): void
}>()

const handler = (type: Action) => emit('action', type)
</script>

<style lang="scss" scoped>
.count {
  gap: $uni-spacing-row-base;
  .sub,
  .add {
    position: relative;
    width: 60rpx;
    height: 60rpx;
    border-radius: 50%;
    &::before,
    &::after {
      position: absolute;
      inset: 0;
      width: 20rpx;
      height: 4rpx;
      margin: auto;
      border-radius: $uni-border-radius-sm;
      background-color: #fff;
    }
  }
  .add {
    &::after {
      transform: rotate(90deg);
    }
  }
}
</style>
