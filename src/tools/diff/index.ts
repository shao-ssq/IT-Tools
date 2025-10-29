import { Braces } from '@vicons/tabler';
import { defineTool } from '../tool';

export const jsonTools = defineTool({
  name: '文本对比',
  path: '/diff',
  description: 'GitHub样式的文本对比模式，更加适合程序员',
  keywords: ['json', 'xml', '可视化'],
  component: () => import('./google.vue'),
  icon: Braces,
  createdAt: new Date('2025-10-29'),
});
