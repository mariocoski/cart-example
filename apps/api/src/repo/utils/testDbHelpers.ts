import * as shell from 'shelljs';

export const TEST_DB_CONTAINER_NAME = 'postgres-test';

export const useTestDb = () => {
  if (!shell.which('docker')) {
    shell.echo('unable to find docker - ensure docker command is available');
    shell.exit(1);
  }

  // shell.exec(`docker rm --force ${TEST_DB_CONTAINER_NAME}`, { silent: true });

  shell.exec(
    `docker run -d -p 5432:5432 --name ${TEST_DB_CONTAINER_NAME} -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=secret -e POSTGRES_DB=cart postgres:13.4-alpine`,
    { silent: true }
  );

  shell.exec('npm run migrate:up');
};

export const shutDownTestDb = () => {
  if (!shell.which('docker')) {
    shell.echo('unable to find docker - ensure docker command is available');
    shell.exit(1);
  }

  shell.exec(`docker rm --force ${TEST_DB_CONTAINER_NAME}`, { silent: true });
};
