import { prompt_m } from '@/tools/prompt_manager';
import type { ToolCategory } from '@/tools/tools.types';
import { jsonTools } from '@/tools/jsonx';
import { promptTools } from '@/tools/prompt';
import { regexTools } from '@/tools/regex';
import { aipptTools } from '@/tools/ppt';
import { mindTools } from '@/tools/mind';
import { codeMap } from '@/tools/code';
import { mermaid } from '@/tools/mermaid';

export const toolsByCategory: ToolCategory[] = [
  {
    name: 'text',
    components: [
      jsonTools,
      promptTools,
      prompt_m,
      regexTools,
    ],
  },
  {
    name: '设计',
    components: [
      aipptTools,
      mindTools,
      mermaid,
    ],
  },
  {
    name: 'Code',
    components: [
      codeMap,
    ],
  },
];

export const tools = toolsByCategory.flatMap(({ components }) => components);
export const toolsWithCategory = toolsByCategory.flatMap(({ components, name }) =>
  components.map(tool => ({ category: name, ...tool })),
);
