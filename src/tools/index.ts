import type { ToolCategory } from '@/tools/tools.types';
import { googleTool } from '@/tools/google';

export const toolsByCategory: ToolCategory[] = [
  {
    name: 'Text',
    components: [
      googleTool,
    ],
  },
];

export const tools = toolsByCategory.flatMap(({ components }) => components);
export const toolsWithCategory = toolsByCategory.flatMap(({ components, name }) =>
  components.map(tool => ({ category: name, ...tool })),
);

