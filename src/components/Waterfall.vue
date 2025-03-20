<template>
  <view class="water-fall" :style="cssVariable">
    <!-- 重新渲染节点位置 -->
    <view
      v-for="item in waterfallData"
      :key="item._id"
      :class="['water-fall-item', `water-fall-item-${item._id}`]"
      :style="item.style"
      @click="$emit('item-click', item)">
      <ProductCard :info="item" />
    </view>
  </view>
</template>

<script setup lang="ts">
import {
  ref,
  computed,
  watch,
  nextTick,
  getCurrentInstance,
  onMounted,
} from 'vue'
import ProductCard from './ProductCard.vue'

const instance = getCurrentInstance()
const query = uni.createSelectorQuery().in(instance?.proxy)

const emits = defineEmits(['item-click'])

const props = defineProps({
  col: {
    type: Number,
    default: () => 2,
  },
  gap: {
    type: Number,
    default: () => 10,
  },
  data: {
    type: Array,
    default: () => [],
  },
})

const colsHeight = ref<number[]>([])
const itemWidth = ref<number>(0)
const waterfallData = ref<any[]>([])

const cssVariable = computed(() => ({
  '--water-fall-height': `${Math.max(...colsHeight.value)}px`,
  '--item-width': `${itemWidth.value}px`,
}))

// 监听数据变化重新计算布局
watch(
  () => props.data,
  async (newVal, oldVal) => {
    if (!newVal.length) {
      colsHeight.value = initColsHeight()
      waterfallData.value = []
    } else {
      const newData = newVal.slice(oldVal.length)
      waterfallData.value.push(...newData)
      await nextTick()
      waterfallData.value = [...oldVal, ...(await getTranslate(newData))]
    }
  }
)

onMounted(() => init())

const init = async () => {
  colsHeight.value = initColsHeight()
  itemWidth.value = await getCardWidth()
  waterfallData.value = props.data
  await nextTick()
  waterfallData.value = await getTranslate(props.data)
}

// 初始化col容器
const initColsHeight = () => new Array(props.col).fill(0)

/**
 * 根据瀑布流容器的宽度和 gap 算出每一项的宽度
 * @return Promise<number>
 */
const getCardWidth = (): Promise<number> => {
  return new Promise(resolve => {
    query
      .select('.water-fall')
      .boundingClientRect((data: UniApp.NodeInfo | UniApp.NodeInfo[]) => {
        let width = (data as UniApp.NodeInfo).width || 0
        width = (width - props.gap * (props.col - 1)) / props.col
        resolve(width)
      })
      .exec()
  })
}

/**
 * 获取产品卡片的DOM高度
 * @param id 数据每项的id
 * @return Promise<number>
 */
const getCardHeight = (id: string): Promise<number> => {
  return new Promise(resove => {
    query
      .select(`.water-fall-item-${id}`)
      .boundingClientRect((data: UniApp.NodeInfo | UniApp.NodeInfo[]) => {
        resove((data as UniApp.NodeInfo)?.height || 0)
      })
      .exec()
  })
}

/**
 * 计算产品Card偏移的位置，赋值触发重新渲染
 * @param data 产品数据
 */
const getTranslate = async (data: any) => {
  const processedData = data.map(async (item: any) => {
    const itemHeight = await getCardHeight(item._id)
    const actionIndex = colsHeight.value.indexOf(Math.min(...colsHeight.value)) // 需要增加高度的索引
    const offsetTop = colsHeight.value[actionIndex] // y 偏移量
    const offsetLeft = (itemWidth.value + props.gap) * actionIndex // x 偏移量
    colsHeight.value[actionIndex] += itemHeight + props.gap
    return {
      ...item,
      style: {
        left: 0,
        transform: `translate(${offsetLeft}px, ${offsetTop}px)`,
      },
    }
  })
  return await Promise.all(processedData)
}
</script>

<style scoped lang="scss">
.water-fall {
  position: relative;
  width: 100%;
  height: var(--water-fall-height);
  &-item {
    position: absolute;
    top: 0;
    left: 0;
    width: var(--item-width);
  }
}
</style>
