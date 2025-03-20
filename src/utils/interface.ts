// import iconImg from '@/static/icon-img.png'
// import iconVideo from '@/static/icon-video.png'

export interface Size {
  w: number
  h: number
}

// 性别类型
export const GenderType = [
  {
    label: '未知',
    value: 0,
    color: '#999999',
    icon: 'icon-icon1',
  },
  {
    label: '男',
    value: 1,
    color: '#2b97d0',
    icon: 'icon-icon1',
  },
  {
    label: '女',
    value: 2,
    color: '#ff3ec9',
    icon: 'icon-icon',
  },
] as const

export type Gender = (typeof GenderType)[number]

export type GenderValue = (typeof GenderType)[number]['value']

// 作品权限
export const PermissionType = [
  {
    label: '公开可见',
    value: 1,
    icon: 'icon-kaisuo',
  },
  {
    label: '仅自己可见',
    value: 0,
    icon: 'icon-suo',
  },
] as const

export type PermissionValue = (typeof PermissionType)[number]['value']

export type Permission = (typeof PermissionType)[number]

// 作品上传的媒体类型
export const MediaType = [
  {
    type: 'image',
    name: '图片',
    icon: 'iconImg',
  },
  {
    type: 'video',
    name: '视频',
    icon: 'iconVideo',
  },
] as const

export type MediaTypeValue = (typeof MediaType)[number]['type']

// 作品状态
export const InfoStatusType = [
  {
    label: '草稿',
    value: 0,
  },
  {
    label: '审核中',
    value: 1,
  },
  {
    label: '未通过',
    value: 2,
  },
  {
    label: '上线',
    value: 3,
  },
  {
    label: '仅自己可见',
    value: 4,
  },
  {
    label: '已删除',
    value: 5,
  },
] as const

export type InfoStatus = (typeof InfoStatusType)[number]
