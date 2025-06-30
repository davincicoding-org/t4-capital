import * as migration_20250630_184123 from './20250630_184123';

export const migrations = [
  {
    up: migration_20250630_184123.up,
    down: migration_20250630_184123.down,
    name: '20250630_184123'
  },
];
