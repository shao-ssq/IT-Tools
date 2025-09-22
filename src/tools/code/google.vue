<script setup>
import { onMounted } from 'vue';
import FavoriteButton from '@/components/FavoriteButton.vue';

onMounted(() => {
  window.open('https://www.baidu.com/', '_blank')
})
</script>

<template>
  <div class="tool-layout">
      <div class="tool-header">
        <div flex flex-nowrap items-center justify-between>
          <n-h1>
            CNC 代码关联检索
          </n-h1>

          <div>
          </div>
        </div>

        <div class="separator" />

        <div class="description">
          代码检索与理解工具，支持跨项目、跨仓库的代码搜索和依赖关系分析
        </div>
      </div>
    </div>
</template>
