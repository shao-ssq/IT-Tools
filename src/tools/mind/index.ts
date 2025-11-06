import { Sitemap } from '@vicons/tabler';
import { defineTool } from '../tool';

export const mindTools = defineTool({
  name: '脑图（AI）',
  path: '/mind',
  description: '支持多种结构、丰富主题与高度自定义的可视化思维工具。',
  keywords: ['正则', 'regex', '可视化'],
  component: () => import('./google.vue'),
  icon: Sitemap,
});
