import { FileDiff } from '@vicons/tabler';
import { defineTool } from '../tool';

export const googleTool = defineTool({
  name: 'Google',
  path: '/baidu',
  description: 'Search the web with Google',
  keywords: ['google', 'search', 'web'],
  component: () => import('./google.vue'),
  icon: FileDiff,
  createdAt: new Date('2023-09-14'),
});
