import { BoxMultiple } from '@vicons/tabler';
import { defineTool } from '../tool';

export const prompt_m = defineTool({
  name: 'Prompt 合集',
  path: '/prompt_manager',
  description: '各类 AI Prompt，包括文本生成、内容优化、代码辅助、数据分析等。',
  keywords: ['prompt', '合集', 'AI', '生成', '优化', '辅助'],
  component: () => import('./google.vue'),
  icon: BoxMultiple,
  createdAt: new Date('2023-09-14'),
});
