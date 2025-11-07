<script setup>
import { onMounted } from 'vue';

onMounted(() => {
  window.open('http://tgai.weoa.com:8233/', '_blank')
})
</script>

<template>
  <div class="tool-layout">
    <div class="tool-header">
      <div flex flex-nowrap items-center justify-between>
        <n-h1>
          Chat Excel
        </n-h1>

        <div>
        </div>
      </div>

      <div class="separator" />

      <div class="description">
        用说话的方式做数据分析。
      </div>
    </div>
  </div>
</template>
