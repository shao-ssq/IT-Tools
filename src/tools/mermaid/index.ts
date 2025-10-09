import { Sitemap } from '@vicons/tabler';
import { defineTool } from '../tool';

export const mindTools = defineTool({
  name: 'Smart Mermaid',
  path: '/mermaid',
  description: '自动生成流程图、时序图、类图，一键可视化复杂逻辑。',
  keywords: ['正则', 'regex', '可视化'],
  component: () => import('./google.vue'),
  icon: Sitemap,
});
