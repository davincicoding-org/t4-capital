import * as migration_20250630_184123 from './20250630_184123';
import * as migration_20250630_202214 from './20250630_202214';
import * as migration_20250630_214931 from './20250630_214931';
import * as migration_20250630_220424 from './20250630_220424';
import * as migration_20250630_221215 from './20250630_221215';
import * as migration_20250630_221359 from './20250630_221359';
import * as migration_20250701_113839 from './20250701_113839';
import * as migration_20250704_093454 from './20250704_093454';
import * as migration_20250704_105158 from './20250704_105158';
import * as migration_20250704_110913 from './20250704_110913';

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
    name: '20250630_221359',
  },
  {
    up: migration_20250701_113839.up,
    down: migration_20250701_113839.down,
    name: '20250701_113839',
  },
  {
    up: migration_20250704_093454.up,
    down: migration_20250704_093454.down,
    name: '20250704_093454',
  },
  {
    up: migration_20250704_105158.up,
    down: migration_20250704_105158.down,
    name: '20250704_105158',
  },
  {
    up: migration_20250704_110913.up,
    down: migration_20250704_110913.down,
    name: '20250704_110913'
  },
];
