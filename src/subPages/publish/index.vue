<template>
  <view class="publish flex flex-col">
    <form class="form">
      <view class="form-item border-b-1">
        <view class="form-item-label">封面</view>
        <view class="form-item-content">
          <FilePick
            v-model="form.fileList"
            action="/information"
            :mediaType="['image']"
            :width="80"
            :height="142" />
        </view>
      </view>
      <view class="form-item border-b-1">
        <view class="form-item-label">详情图片</view>
        <view class="form-item-content">
          <FilePick
            v-model="form.fileList"
            action="/information"
            :mediaType="['image']"
            :width="80"
            :height="80"
            showList
            preview />
        </view>
      </view>
      <view class="form-item border-b-1">
        <view class="form-item-label">标题</view>
        <view class="form-item-content">
          <input v-model="form.title" class="title" />
        </view>
      </view>
      <view class="form-item border-b-1">
        <view class="form-item-label">描述</view>
        <view class="form-item-content">
          <textarea v-model="form.text" :maxlength="-1" />
        </view>
      </view>
      <view class="form-item border-b-1">
        <view class="form-item-label">价格</view>
        <view class="form-item-content">
          <input v-model="form.title" />
        </view>
      </view>
    </form>
    <CustomTabbar>
      <viwe class="create-custom-tab-bar flex items-center">
        <view class="draft flex flex-col items-center">
          <text class="iconfont icon-caogaoxiang"></text>
          <text>存草稿</text>
        </view>
        <button class="flex-1">发布动态</button>
      </viwe>
    </CustomTabbar>
  </view>
</template>

<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app'
import { ref, reactive, computed } from 'vue'
import { upload } from '@/utils'
import CustomTabbar from '@/components/CustomTabbar.vue'
import FilePick from '@/components/FilePick.vue'

const form = ref<AnyObject>({})
</script>

<style scoped lang="scss">
.file-list {
  &::v-deep(.file-picker) {
    flex-wrap: nowrap;
    padding: $uni-spacing-col-lg $uni-spacing-row-lg;
  }
  &.media-video::v-deep(.file-picker__box) {
    width: 100%;
    .file-picker__box-content {
      height: 240px;
      padding-top: 0;
    }
  }
}
.form {
  padding: $uni-spacing-col-lg $uni-spacing-row-lg;
  .picker {
    padding: $uni-spacing-col-base 0;
  }
  .icon-fanhui-copy {
    color: $uni-text-color-grey;
  }
  .title {
    font-size: 32rpx;
  }
}
.topic {
  gap: $uni-spacing-row-base;
  &::v-deep(.article) {
    & > .label {
      width: max-content;
      font-size: $uni-font-size-sm;
      padding: $uni-spacing-col-sm $uni-spacing-row-base;
      border-radius: 40rpx;
      background-color: $uni-bg-color-grey;
    }
  }
  .tag-warp {
    gap: $uni-spacing-row-base;
    .tag {
      display: flex;
      align-items: center;
      flex-shrink: 0;
      .iconfont {
        color: $uni-text-color-grey;
      }
    }
  }
}
.create-custom-tab-bar {
  width: 100%;
  box-sizing: border-box;
  padding-left: $uni-spacing-row-lg;
  padding-right: $uni-spacing-row-lg;
  gap: $uni-spacing-row-lg;
  .draft {
    padding: $uni-spacing-col-sm $uni-spacing-row-sm;
    font-size: $uni-font-size-sm;
    color: $uni-text-color-grey;
  }
  button {
    width: 100%;
    height: 80rpx;
    font-size: $uni-font-size-lg;
    line-height: 80rpx;
    color: #fff;
    border-radius: 40rpx;
    font-weight: 500;
    background-color: $theme-color;
    &::after {
      border: none;
    }
  }
}
</style>
