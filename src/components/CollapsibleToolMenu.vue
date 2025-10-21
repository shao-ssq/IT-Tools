<script setup lang="ts">
import { useStorage } from '@vueuse/core';
import { useThemeVars } from 'naive-ui';
import { RouterLink, useRoute } from 'vue-router';
import MenuIconItem from './MenuIconItem.vue';
import type { Tool, ToolCategory } from '@/tools/tools.types';

const props = withDefaults(defineProps<{ toolsByCategory?: ToolCategory[] }>(), { toolsByCategory: () => [] });
const { toolsByCategory } = toRefs(props);
const route = useRoute();

const makeLabel = (tool: Tool) => () => h(RouterLink, { to: tool.path }, { default: () => tool.name });
const makeIcon = (tool: Tool) => () => h(MenuIconItem, { tool });

const collapsedCategories = useStorage<Record<string, boolean>>(
  'menu-tool-option:collapsed-categories',
  {},
  undefined,
  {
    deep: true,
    serializer: {
      read: v => (v ? JSON.parse(v) : null),
      write: v => JSON.stringify(v),
    },
  },
);

function toggleCategoryCollapse({ name }: { name: string }) {
  collapsedCategories.value[name] = !collapsedCategories.value[name];
}

const menuOptions = computed(() =>
  toolsByCategory.value.map(({ name, components }) => ({
    name,
    isCollapsed: collapsedCategories.value[name],
    tools: components.map(tool => ({
      label: makeLabel(tool),
      icon: makeIcon(tool),
      key: tool.path,
    })),
  })),
);
const SERVER_URL = import.meta.env.VITE_API_BASE_URL;
function addVisits() {
  fetch(`${SERVER_URL}/api/visits`, { method: 'POST' })
    .then(() => fetch(`${SERVER_URL}/api/visits`))
    .then(res => res.json())
    .then((data) => {
      const el = document.getElementById('visitCount');
      // eslint-disable-next-line max-statements-per-line
      if (el) { el.textContent = data; }
    });
}

const themeVars = useThemeVars();
</script>

<template>
  <div v-for="{ name, tools, isCollapsed } of menuOptions" :key="name">
    <div ml-6px mt-12px flex cursor-pointer items-center op-60 @click="toggleCategoryCollapse({ name })">
      <span :class="{ 'rotate-0': isCollapsed, 'rotate-90': !isCollapsed }" text-16px lh-1 op-50 transition-transform>
        <icon-mdi-chevron-right />
      </span>

      <span ml-8px text-13px>
        {{ name }}
      </span>
    </div>

    <n-collapse-transition :show="!isCollapsed">
      <div class="menu-wrapper">
        <div class="toggle-bar" @click="toggleCategoryCollapse({ name })" />

        <n-menu
          class="menu"
          :value="route.path"
          :collapsed-width="64"
          :collapsed-icon-size="22"
          :options="tools"
          :indent="8"
          :default-expand-all="true"
          @select="addVisits"
        />
      </div>
    </n-collapse-transition>
  </div>
</template>

<style scoped lang="less">
.menu-wrapper {
  display: flex;
  flex-direction: row;
  .menu {
    flex: 1;
    margin-bottom: 5px;

    ::v-deep(.n-menu-item-content::before) {
      left: 0;
      right: 13px;
    }
    ::v-deep(.n-menu-item .n-menu-item-content__icon .menu-icon-item) {
      position: relative;
      top: 1.5px; /* 可调成 1~2px 之间试试 */
    }
    ::v-deep(.n-menu-item .n-menu-item-content--selected .n-menu-item-content__icon .menu-icon-item) {
      color: #2E8BE6;
    }
    ::v-deep(.n-menu-item .n-menu-item-content--selected .n-menu-item-content-header .router-link-active) {
      color: #2E8BE6;
    }
    ::v-deep(.n-menu-item-content.n-menu-item-content--selected)::before {
      background-color: #F5F8FC; /* 深蓝灰 */
      border-radius: 6px;
      transition: all 0.3s ease;
      border: #5AA9F2 2px;
    }
  }

  .toggle-bar {
    width: 24px;
    opacity: 0.1;
    transition: opacity ease 0.2s;
    position: relative;
    cursor: pointer;

    &::before {
      width: 2px;
      height: 100%;
      content: ' ';
      background-color: v-bind('themeVars.textColor3');
      border-radius: 2px;
      position: absolute;
      top: 0;
      left: 14px;
    }

    &:hover {
      opacity: 0.5;
    }
  }
}
</style>
