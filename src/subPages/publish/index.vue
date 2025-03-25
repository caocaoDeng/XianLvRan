<template>
  <view class="publish flex flex-col">
    <form class="form">
      <view class="form-item border-b-1">
        <view class="form-item-label">封面</view>
        <view class="form-item-content">
          <FilePick
            v-model="info.fileList"
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
            v-model="info.fileList"
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
          <input v-model="info.title" class="title" />
        </view>
      </view>
      <view class="form-item border-b-1">
        <view class="form-item-label">描述</view>
        <view class="form-item-content">
          <textarea v-model="info.text" :maxlength="-1" />
        </view>
      </view>
      <view class="form-item border-b-1">
        <view class="form-item-label">价格</view>
        <view class="form-item-content">
          <input v-model="info.title" />
        </view>
      </view>
    </form>
    <CustomTabbar>
      <viwe class="create-custom-tab-bar flex items-center">
        <view class="draft flex flex-col items-center" @click="submit('draft')">
          <text class="iconfont icon-caogaoxiang"></text>
          <text>存草稿</text>
        </view>
        <button class="flex-1" @click="submit('publish')">发布动态</button>
      </viwe>
    </CustomTabbar>
  </view>
</template>

<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app'
import { ref, reactive, computed } from 'vue'
import { userInfoStore } from '@/store'
import { upload } from '@/utils'
import CustomTabbar from '@/components/CustomTabbar.vue'
import FilePick from '@/components/FilePick.vue'
import Select, { Option } from '@/components/Select.vue'
import { PermissionType, MediaType } from '@/utils/interface'
import type {
  PermissionValue,
  Permission,
  MediaTypeValue,
} from '@/utils/interface'
import type { Topic } from '@/api/interface'
import { queryTopic, createInformation } from '@/api'

export type CategoryOptions = Topic & Option

export type OnlineLinks = Promise<string>[] | string[] | undefined

export interface Info {
  fileList: string[]
  title: string
  text: string
  topic: Topic[]
  mark: string
  permission: PermissionValue
}

const { state } = userInfoStore()

const mediaType = ref<MediaTypeValue>('image')
const topic = ref<CategoryOptions[]>([])
const info = reactive<Info>({
  fileList: [],
  title: '',
  text: '',
  topic: [],
  mark: '',
  permission: 1,
})

const formatePermission = computed(() => {
  return PermissionType.find(
    item => item.value === info.permission
  ) as Permission
})

// 提交参数
const params = computed(() => {
  const { topic, ...rest } = info
  const categoryIds = topic.map(item => item.category_id)
  const topicIds = topic.map(item => item._id)
  return {
    ...rest,
    userId: state.userInfo?._id,
    type: mediaType.value,
    category: categoryIds,
    topic: topicIds,
  }
})

onLoad(options => {
  mediaType.value = options?.type
})

// 获取话题数据
const getTopic = async () => {
  const res = await queryTopic()
  topic.value = (res || []).map(item => ({
    ...item,
    label: item.name,
    value: item,
  }))
}
getTopic()

/**
 * 移除选中话题
 * @param _id 话题id
 */
const removeTopic = (_id: string) => {
  info.topic = info.topic.filter(item => item._id !== _id)
}

// 添加分享地点
const chooseLocation = () => {
  uni.chooseLocation({
    success(res) {
      info.mark = res.address
    },
  })
}

const submit = async (type: 'draft' | 'publish') => {
  try {
    const mediaTypeLabel = MediaType.find(
      item => item.type === mediaType.value
    )?.name
    if (!info.fileList.length) throw new Error(`请上传${mediaTypeLabel}`)
    const loadingTitle = type === 'draft' ? '保存中' : '发布中'
    const toastTitle = type === 'draft' ? '保存成功' : '发布成功，等待审核'
    const action =
      mediaType.value === 'image' ? '/information' : '/information/video'
    uni.showLoading({ title: loadingTitle, mask: true })
    // 上传媒体数据
    let onlineLinks: OnlineLinks = await upload({
      action,
      type: mediaType.value,
      tempFilePaths: info.fileList,
    })
    onlineLinks = await Promise.all(onlineLinks || [])
    // 创建信息
    const infoId = await createInformation({
      ...params.value,
      fileList: onlineLinks,
      status: type === 'draft' ? 0 : 3,
    })
    uni.hideLoading()
    if (!infoId) return
    uni.redirectTo({ url: `/subPages/details/index?id=${infoId}` })
    uni.showToast({ title: toastTitle })
  } catch (error: any) {
    uni.showToast({ title: error.message, icon: 'none' })
  }
}
</script>

<style lang="scss">
.publish {
  width: 100vw;
  height: 100vh;
}
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
