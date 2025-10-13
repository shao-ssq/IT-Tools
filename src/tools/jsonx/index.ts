import { Braces } from '@vicons/tabler';
import { defineTool } from '../tool';

export const jsonTools = defineTool({
  name: 'JSON 可视化',
  path: '/jsonx',
  description: '将 JSON、YAML、CSV、XML 和 TOML 转换为暗模式或亮模式下的交互式图形或树。',
  keywords: ['json', 'xml', '可视化'],
  component: () => import('./google.vue'),
  icon: Braces,
  createdAt: new Date('2023-09-14'),
});
