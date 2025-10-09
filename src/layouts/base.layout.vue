<script lang="ts" setup>
import { NIcon, useThemeVars } from 'naive-ui';

import { RouterLink } from 'vue-router';
import { Heart, Home2, Menu2 } from '@vicons/tabler';

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
</script>

<template>
  <MenuLayout class="menu-layout" :class="{ isSmallScreen: styleStore.isSmallScreen }" :collapsed="isCollapsed" :isSmallScreen="styleStore.isSmallScreen">
    <template #sider>
      <div class="sider-main-wrapper">
        <RouterLink v-if="!isCollapsed" to="/" class="hero-wrapper">
          <HeroGradient class="gradient" />
          <div class="text-wrapper">
            <div class="title">
              天工 AI
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

          <CollapsibleToolMenu :tools-by-category="tools" :collapsed="isCollapsed" />

          <div v-if="!isCollapsed" class="footer" />
        </div>
        <button class="sider-toggle-btn-fixed" @click="toggleSider">
          <span v-if="isCollapsed">&gt;</span>
          <span v-else>&lt;</span>
        </button>
      </div>
    </template>

    <template #content>
      <slot />
    </template>
  </MenuLayout>
</template>

<style lang="less" scoped>
// ::v-deep(.n-layout-scroll-container) {
//     @percent: 4%;
//     @position: 25px;
//     @size: 50px;
//     @color: #eeeeee25;
//     background-image: radial-gradient(@color @percent, transparent @percent),
//         radial-gradient(@color @percent, transparent @percent);
//     background-position: 0 0, @position @position;
//     background-size: @size @size;
// }

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
  text-align: center;
  color: #838587;
  margin-top: 20px;
  padding: 20px 0;
}


.sider-main-wrapper {
  position: relative;
  height: 100%;
}

.sider-toggle-btn-fixed {
  position: absolute;
  top: 50%;
  right: -16px;
  transform: translateY(-50%);
  z-index: 100;
  width: 32px;
  height: 48px;
  background: #fff;
  border: 1px solid #eee;
  border-radius: 0 8px 8px 0;
  box-shadow: 0 2px 8px #0001;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #888;
  font-size: 20px;
  transition: background 0.2s, color 0.2s;
}
.sider-toggle-btn-fixed:hover {
  background: v-bind('themeVars.primaryColor');
  color: #fff;
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
.sider-main-wrapper {
.sider-main-wrapper {
.sider-main-wrapper {
