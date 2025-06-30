import * as migration_20250630_184123 from './20250630_184123';
import * as migration_20250630_202214 from './20250630_202214';

export const migrations = [
  {
    up: migration_20250630_184123.up,
    down: migration_20250630_184123.down,
    name: '20250630_184123',
  },
  {
    up: migration_20250630_202214.up,
    down: migration_20250630_202214.down,
    name: '20250630_202214'
  },
];
