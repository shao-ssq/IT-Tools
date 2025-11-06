import { Hierarchy } from '@vicons/tabler';
import { defineTool } from '../tool';

export const codeMap = defineTool({
  name: 'CodeSearch',
  path: '/code',
  createdAt: new Date('2025-09-20T10:00:00Z'),
  description: 'CNC 代码检索，支持跨项目、跨仓库的代码搜索和依赖关系分析',
  keywords: ['代码', '检索', '搜索', '依赖分析', '跨项目', '跨仓库', '理解'],
  component: () => import('./google.vue'),
  icon: Hierarchy,
});
