import { ArrowsShuffle } from '@vicons/tabler';
import { defineTool } from '../tool';

export const mermaid = defineTool({
  name: '流程图（AI）',
  path: '/mermaid',
  description: 'AI 自动生成流程图、时序图、类图，一键可视化复杂逻辑。',
  keywords: ['流程图', '时序图', '类图'],
  component: () => import('./google.vue'),
  icon: ArrowsShuffle,
});
