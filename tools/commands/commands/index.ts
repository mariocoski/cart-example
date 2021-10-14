import { Command } from 'commander';
import migrateUp from './migrateUp';
import migrateDown from './migrateDown';
const program = new Command();

program
  .command('migrate:up')
  .description('Migrates database')
  .action(migrateUp);

program
  .command('migrate:down')
  .description('Reverts migrations database')
  .action(migrateDown);

program.parse(process.argv);
