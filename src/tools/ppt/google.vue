<script setup>
import { onMounted } from 'vue';

onMounted(() => {
  window.open('http://tgai.weoa.com:8299/', '_blank')
})
</script>

<template>
  <div class="tool-layout">
    <div class="tool-header">
      <div flex flex-nowrap items-center justify-between>
        <n-h1>
          Chat PPT
        </n-h1>

        <div>
        </div>
      </div>

      <div class="separator" />

      <div class="description">
        AI驱动，快速打造专业、多种风格的PPT。
      </div>
    </div>
  </div>
</template>
