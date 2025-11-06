import { Table } from '@vicons/tabler';
import { defineTool } from '../tool';

export const excelTools = defineTool({
  name: 'Chat Excel',
  path: '/excel',
  description: '用说话的方式做数据分析。',
  keywords: ['ChatExcel', '问数', 'Excel'],
  component: () => import('./google.vue'),
  icon: Table,
  createdAt: new Date('2023-09-14'),
});
