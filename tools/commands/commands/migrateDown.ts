import * as shell from 'shelljs';

require('dotenv').config({
  example: '.env.example',
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
});

export default function migrateUp() {
  const migration = shell.exec(
    `npx ts-node node_modules/typeorm/cli.js --config apps/api/src/database/config/typeorm_config.ts migration:revert`
  );
  if (migration.code !== 0) {
    shell.echo('failed to migrate database');
    shell.exit(1);
  }

  process.exit(0);
}
