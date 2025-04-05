<template>
  <view class="profile">
    <view class="card">
      <view class="user flex">
        <image class="avatar"></image>
        <view class="username"></view>
      </view>
      <view class="record flex items-center justify-between">
        <view
          class="record-item flex flex-col"
          v-for="({ label, value }, index) in category"
          :key="index">
          <view class="record-item-value">{{ value }}</view>
          <view class="record-item-label">{{ label }}</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { reactive, computed } from 'vue'
const recordCount = reactive<{
  follow: number
  collect: number
  order: number
}>({
  follow: 0,
  collect: 0,
  order: 0,
})

const orderType = reactive([
  {
    label: '全部',
    value: '',
  },
  {
    label: '',
    value: '',
  },
  {
    label: '',
    value: '',
  },
  {
    label: '',
    value: '',
  },
  {
    label: '',
    value: '',
  },
  {
    label: '',
    value: '',
  },
])

const category = computed(() => [
  {
    label: '关注',
    value: recordCount.follow,
  },
  {
    label: '收藏',
    value: recordCount.collect,
  },
  {
    label: '已下单',
    value: recordCount.order,
  },
])
</script>

<style scoped lang="scss">
.card {
  padding: $uni-spacing-col-base $uni-spacing-row-base;
  border-radius: $uni-border-radius-lg;
  background-color: #fff;
}
.user {
  gap: $uni-spacing-row-base;
  .avatar {
    width: 80rpx;
    height: 80rpx;
    border-radius: 50%;
  }
}
.record {
  margin-top: $uni-spacing-col-base;
  &-item {
    gap: $uni-spacing-col-sm;
  }
}
</style>
