import { Wand } from '@vicons/tabler';
import { defineTool } from '../tool';

export const promptTools = defineTool({
  name: 'Prompt 优化',
  path: '/prompt',
  description: '提升AI对话质量，从优化Prompt开始',
  keywords: ['prompt', '提示词', '优化'],
  component: () => import('./google.vue'),
  icon: Wand,
});
