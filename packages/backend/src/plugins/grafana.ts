import { createTemplateAction } from '@backstage/plugin-scaffolder-node';
import fs from 'fs/promises';

export const grafanaAction = createTemplateAction({
  id: 'grafana:dashboard:create',
  handler: async ({ workspacePath }) => {
    const dashboard = JSON.parse(
      await fs.readFile(`${workspacePath}/dashboard.json`, 'utf-8'),
    );

    await fetch('https://blambackstage.grafana.net/api/dashboards/db', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.GRAFANA_TOKEN}`,
      },
      method: 'POST',
      body: JSON.stringify({ dashboard }),
    });
  },
});
