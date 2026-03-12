import * as migration_20260312_131231 from './20260312_131231';

export const migrations = [
  {
    up: migration_20260312_131231.up,
    down: migration_20260312_131231.down,
    name: '20260312_131231'
  },
];
