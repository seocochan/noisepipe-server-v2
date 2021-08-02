import { Options } from '@mikro-orm/core';
import { SqlHighlighter } from '@mikro-orm/sql-highlighter';

import { Logger } from '@nestjs/common';
import 'dotenv/config';

const logger = new Logger('ORM');
const config = {
  entities: ['./dist/src/modules/**/*.orm-entity.js'],
  entitiesTs: ['./src/modules/**/*.orm-entity.ts'],
  type: 'postgresql',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dbName: process.env.DB_NAME,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  highlighter: new SqlHighlighter(),
  debug: true,
  logger: logger.log.bind(logger),
  migrations: {
    tableName: '_migrations',
    path: process.cwd() + '/src/infrastructure/database/migrations',
  },
} as Options;

export default config;
