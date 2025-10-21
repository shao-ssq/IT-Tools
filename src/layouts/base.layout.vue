<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { NIcon, useThemeVars } from 'naive-ui';
import { RouterLink } from 'vue-router';
import { Menu2 } from '@vicons/tabler';
import { storeToRefs } from 'pinia';
import HeroGradient from '../assets/hero-gradient.svg?component';
import MenuLayout from '../components/MenuLayout.vue';
import NavbarButtons from '../components/NavbarButtons.vue';
import { useStyleStore } from '@/stores/style.store';
import { config } from '@/config';
import type { ToolCategory } from '@/tools/tools.types';
import { useToolStore } from '@/tools/tools.store';
import { useTracker } from '@/modules/tracker/tracker.services';
import CollapsibleToolMenu from '@/components/CollapsibleToolMenu.vue';

const themeVars = useThemeVars();
const styleStore = useStyleStore();
const version = config.app.version;
const commitSha = config.app.lastCommitSha.slice(0, 7);

const { tracker } = useTracker();
const { t } = useI18n();

const toolStore = useToolStore();
const { favoriteTools, toolsByCategory } = storeToRefs(toolStore);

const tools = computed<ToolCategory[]>(() => [
  ...(favoriteTools.value.length > 0 ? [{ name: t('tools.categories.favorite-tools'), components: favoriteTools.value }] : []),
  ...toolsByCategory.value,
]);

const isCollapsed = ref(false);
function toggleSider() {
  isCollapsed.value = !isCollapsed.value;
}

const visitCount = ref<string>('加载中...');
const SERVER_URL = import.meta.env.VITE_API_BASE_URL;
async function updateVisits() {
  await new Promise(resolve => setTimeout(resolve, 200));
  try {
    const res = await fetch(`${SERVER_URL}/api/visits`, { method: 'GET' });
    // eslint-disable-next-line max-statements-per-line
    if (!res.ok) { throw new Error(`HTTP ${res.status}`); }
    const data = await res.json();
    visitCount.value = String(data);
  }
  catch (e) {
    visitCount.value = '错误';
  }
}
// 等组件挂载后再调用（避免 DOM 未就绪 / SSR 问题）
onMounted(() => {
  updateVisits();
});
</script>

<template>
  <MenuLayout class="menu-layout" :class="{ isSmallScreen: styleStore.isSmallScreen }" :collapsed="isCollapsed" :is-small-screen="styleStore.isSmallScreen">
    <template #sider>
      <div class="sider-main-wrapper">
        <RouterLink v-if="!isCollapsed" to="/" class="hero-wrapper">
          <HeroGradient class="gradient" />
          <div class="text-wrapper">
            <div class="title">
              天工智匣
            </div>
            <div class="divider" />
            <div class="subtitle">
              {{ $t('home.subtitle') }}
            </div>
          </div>
        </RouterLink>

        <div class="sider-content" :class="{ collapsed: isCollapsed }">
          <div v-if="styleStore.isSmallScreen && !isCollapsed" flex flex-col items-center>
            <locale-selector w="90%" />

            <div flex justify-center>
              <NavbarButtons />
            </div>
          </div>

          <CollapsibleToolMenu :tools-by-category="tools" :collapsed="isCollapsed"/>

          <div v-if="!isCollapsed" class="footer">
            访问量：<span id="visitCount">{{visitCount}}</span>
          </div>
        </div>
        <button class="sider-toggle-btn-fixed" :class="{ collapsed: isCollapsed }" aria-label="Toggle menu" @click="toggleSider">
          <NIcon>
            <Menu2 />
          </NIcon>
        </button>
      </div>
    </template>

    <template #content>
      <slot />
    </template>
  </MenuLayout>
</template>

<style lang="less" scoped>
.support-button {
  background: rgb(37, 99, 108);
  background: linear-gradient(48deg, rgba(37, 99, 108, 1) 0%, rgba(59, 149, 111, 1) 60%, rgba(20, 160, 88, 1) 100%);
  color: #fff !important;
  transition: padding ease 0.2s !important;

  &:hover {
    color: #fff;
    padding-left: 30px;
    padding-right: 30px;
  }
}

.footer {
  position: absolute;
  bottom: 0;
  left: 0;
  color: rgb(51, 100, 174);
  width: 100%;
  text-align: center;
  padding: 10px;
}

.sider-main-wrapper {
  position: relative;
  height: 100%;
}

.sider-toggle-btn-fixed {
  position: fixed;
  top: 150px;
  left: 0;
  transform: translateY(-50%) translateX(-50%);
  z-index: 9999;
  width: 50px;
  height: 50px;
  background: transparent;
  border: none;
  outline: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.2s, left 0.2s;
  box-shadow: none;
}
.sider-toggle-btn-fixed.collapsed {
  left: 10px;
}
.sider-toggle-btn-fixed:not(.collapsed) {
  left: 18px; /* 侧边栏展开宽度，根据实际宽度调整 */
}

.hamburger-icon {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 24px;
  height: 24px;
  gap: 5px;
}
.hamburger-icon span {
  display: block;
  width: 24px;
  height: 3px;
  background: #16c172;
  border-radius: 2px;
  transition: background 0.2s;
}
.sider-toggle-btn-fixed.collapsed .hamburger-icon span {
  background: #16c172;
}

.sider-content {
  padding-top: 160px;
  padding-bottom: 200px;
}

.hero-wrapper {
  position: absolute;
  display: block;
  left: 0;
  width: 100%;
  z-index: 10;
  overflow: hidden;

  .gradient {
    margin-top: -65px;
  }

  .text-wrapper {
    position: absolute;
    left: 0;
    width: 100%;
    text-align: center;
    top: 16px;
    color: #fff;

    .title {
      font-size: 25px;
      font-weight: 600;
    }

    .divider {
      width: 50px;
      height: 2px;
      border-radius: 4px;
      background-color: v-bind('themeVars.primaryColor');
      margin: 0 auto 5px;
    }

    .subtitle {
      font-size: 16px;
    }
  }
}
</style>
