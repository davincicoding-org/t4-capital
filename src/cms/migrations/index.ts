import * as migration_20250630_184123 from './20250630_184123';
import * as migration_20250630_202214 from './20250630_202214';
import * as migration_20250630_214931 from './20250630_214931';
import * as migration_20250630_220424 from './20250630_220424';
import * as migration_20250630_221215 from './20250630_221215';
import * as migration_20250630_221359 from './20250630_221359';

export const migrations = [
  {
    up: migration_20250630_184123.up,
    down: migration_20250630_184123.down,
    name: '20250630_184123',
  },
  {
    up: migration_20250630_202214.up,
    down: migration_20250630_202214.down,
    name: '20250630_202214',
  },
  {
    up: migration_20250630_214931.up,
    down: migration_20250630_214931.down,
    name: '20250630_214931',
  },
  {
    up: migration_20250630_220424.up,
    down: migration_20250630_220424.down,
    name: '20250630_220424',
  },
  {
    up: migration_20250630_221215.up,
    down: migration_20250630_221215.down,
    name: '20250630_221215',
  },
  {
    up: migration_20250630_221359.up,
    down: migration_20250630_221359.down,
    name: '20250630_221359'
  },
];
