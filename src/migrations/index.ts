import * as migration_0001_initial_schema from './0001_initial_schema'

export const migrations = [
  {
    up: migration_0001_initial_schema.up,
    down: migration_0001_initial_schema.down,
    name: '0001_initial_schema',
  },
]
