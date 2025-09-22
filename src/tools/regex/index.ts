import { Brackets } from '@vicons/tabler';
import { defineTool } from '../tool';

export const regexTools = defineTool({
  name: '正则可视化',
  path: '/regex',
  description: '正则表达式可视化分析、编辑与实时测试',
  keywords: ['正则', 'regex', '可视化'],
  component: () => import('./google.vue'),
  icon: Brackets,
});
