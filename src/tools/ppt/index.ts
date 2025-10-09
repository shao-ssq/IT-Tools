import { DeviceAnalytics } from '@vicons/tabler';
import { defineTool } from '../tool';

export const aipptTools = defineTool({
  name: '智能 PPT 助手',
  path: '/ppt',
  description: 'AI驱动，快速打造专业、多种风格的PPT',
  keywords: ['PPT生成', 'AI驱动', '可视化'],
  component: () => import('./google.vue'),
  icon: DeviceAnalytics,
});
