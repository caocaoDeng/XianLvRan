<template>
  <view class="profile">
    <view class="card info">
      <view class="user flex">
        <image class="avatar" src="@/assets/ad.jpeg"></image>
        <view>
          <view class="username font-medium">Deng·草草</view>
          <view class="label">个人</view>
        </view>
      </view>
      <view class="record flex items-center justify-between">
        <view
          class="item flex flex-1 flex-col items-center"
          v-for="({ label, value, icon }, index) in infos"
          :key="index">
          <view v-if="!icon" class="item-value font-medium">{{ value }}</view>
          <view v-else :class="['iconfont', icon]"></view>
          <view class="item-label">{{ label }}</view>
        </view>
      </view>
      <view class="tips flex items-center">
        <text>入驻成为供销者即可发布自己的产品</text>
        <view class="btn">去入驻</view>
      </view>
    </view>

    <view class="card goods-shelves">
      <view class="title font-medium">货架</view>
      <view class="body flex items-center">
        <view
          class="item flex flex-1 flex-col items-center"
          v-for="({ label, value, icon }, index) in goodsShelves"
          :key="index">
          <view v-if="!icon" class="item-value font-medium">{{ value }}</view>
          <view v-else :class="['item-value', 'iconfont', icon]"></view>
          <view class="item-label">{{ label }}</view>
        </view>
      </view>
    </view>

    <view class="card order-type">
      <view class="title font-medium">我的订单</view>
      <view class="body flex items-center">
        <view
          class="item flex flex-1 flex-col items-center"
          v-for="({ label, icon }, index) in orderStatus"
          :key="index">
          <view :class="['item-value', 'iconfont', icon]"></view>
          <view class="item-label">{{ label }}</view>
        </view>
      </view>
    </view>

    <WaterFall :data="data" />
  </view>
</template>

<script setup lang="ts">
import { reactive, computed } from 'vue'
import WaterFall from '@/components/Waterfall.vue'

const recordCount = reactive<{
  follow: number
  collect: number
}>({
  follow: 0,
  collect: 0,
})

const goodsCount = reactive<{
  order: number
  listed: number
  removed: number
}>({
  order: 888,
  listed: 54,
  removed: 1,
})

const orderStatus = reactive([
  {
    label: '待付款',
    icon: 'icon-daifukuan',
  },
  {
    label: '待收货',
    icon: 'icon-daishouhuo',
  },
  {
    label: '待评价',
    icon: 'icon-daipingjia',
  },
  {
    label: '退款/售后',
    icon: 'icon-shouhou-tuikuan',
  },
])

const data = reactive([
  {
    _id: 0,
    cover:
      'https://cdn.wwads.cn/creatives/twhxiNjfzbJLv5489LUGhtjrJLqwGu9VjcPTOxIQ.png?w=260&h=200',
    title: '🐔',
    price: 888,
  },
  {
    _id: 1,
    cover:
      'https://img1.baidu.com/it/u=3001150338,397170470&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=1422',
    title: '茉莉花',
    price: 128,
  },
  {
    _id: 2,
    cover:
      'https://img1.baidu.com/it/u=2172818577,3783888802&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=1422',
    title: '雪上',
    price: 99999999,
  },
  {
    _id: 3,
    cover:
      'https://img2.baidu.com/it/u=1337068678,3064275007&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=750',
    title: '菊花',
    price: 9.9,
  },
  {
    _id: 4,
    cover:
      'https://img0.baidu.com/it/u=2463093910,286705803&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=787',
    title: '小雏菊',
    price: 9.9,
  },
  {
    _id: 5,
    cover:
      'https://img2.baidu.com/it/u=2869247613,4217707162&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=500',
    title: '松塔',
    price: 99,
  },
  {
    _id: 6,
    cover:
      'https://img2.baidu.com/it/u=1041191017,3841558816&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=667',
    title: '荷花🪷',
    price: 199,
  },
  {
    _id: 7,
    cover:
      'https://img0.baidu.com/it/u=600722015,3838115472&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=750',
    title: '小鸟',
    price: 88,
  },
  {
    _id: 8,
    cover:
      'https://img2.baidu.com/it/u=1475620981,3889677523&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=1067',
    title: '故事的小黄花',
    price: 19.9,
  },
  {
    _id: 9,
    cover:
      'https://img2.baidu.com/it/u=661612237,3556829695&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=910',
    title: '立秋',
    price: 1.9,
  },
])

const infos = computed(() => [
  {
    label: '收藏',
    value: recordCount.collect,
  },
  {
    label: '关注',
    value: recordCount.follow,
  },

  {
    label: '地址',
    icon: 'icon-dizhi',
  },
])

const goodsShelves = computed(() => [
  {
    label: '订单数',
    value: goodsCount.order,
  },
  {
    label: '已上架',
    value: goodsCount.listed,
  },
  {
    label: '已下架',
    value: goodsCount.removed,
  },
  {
    label: '去上架',
    icon: 'icon-On-Sale',
  },
])
</script>

<style scoped lang="scss">
.profile {
  min-height: 100vh;
  padding: $uni-spacing-col-base $uni-spacing-row-base;
  background-color: $uni-bg-color-grey;
}
.card {
  padding: $uni-spacing-col-base $uni-spacing-row-base;
  border-radius: $uni-border-radius-lg;
  background-color: #fff;
  margin-bottom: $uni-spacing-col-lg;
  // &:last-of-type {
  //   margin-bottom: 0;
  // }
  .title {
    margin-bottom: $uni-spacing-col-base;
  }
}
.info {
  margin-top: 20px;
  .user {
    gap: $uni-spacing-row-base;
    margin-top: -20px;
    align-items: flex-end;
    .avatar {
      width: 120rpx;
      height: 120rpx;
      border-radius: 50%;
    }
    .username {
      font-size: $uni-font-size-lg;
    }
    .label {
      font-size: $uni-font-size-sm;
      margin-top: $uni-spacing-row-sm;
    }
  }
  .record {
    margin-top: $uni-spacing-col-base;
    &-item {
      gap: $uni-spacing-col-sm;
    }
  }
  .tips {
    color: $uni-color-primary;
    padding: $uni-spacing-col-base $uni-spacing-row-base;
    margin-top: $uni-spacing-row-base;
    border-radius: $uni-border-radius-lg;
    background-color: rgba($color: $uni-color-warning, $alpha: 0.1);
  }
  .btn {
    color: #fff;
    font-size: $uni-font-size-sm;
    margin-left: auto;
    padding: $uni-spacing-col-sm $uni-spacing-row-sm;
    border-radius: $uni-border-radius-base;
    background-color: $uni-color-primary;
  }
}
.info,
.goods-shelves,
.order-type {
  .item-label {
    font-size: $uni-font-size-sm;
  }
  .item-value {
    font-size: $uni-font-size-lg;
  }
  .iconfont {
    font-size: 44rpx;
  }
}
</style>
