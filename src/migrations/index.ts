import * as migration_20260312_131231 from './20260312_131231';
import * as migration_20260314_074104 from './20260314_074104';

export const migrations = [
  {
    up: migration_20260312_131231.up,
    down: migration_20260312_131231.down,
    name: '20260312_131231',
  },
  {
    up: migration_20260314_074104.up,
    down: migration_20260314_074104.down,
    name: '20260314_074104'
  },
];
