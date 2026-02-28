import * as migration_20260228_073015 from './20260228_073015';
import * as migration_20260228_083740_add_blocks_and_order from './20260228_083740_add_blocks_and_order';

export const migrations = [
  {
    up: migration_20260228_073015.up,
    down: migration_20260228_073015.down,
    name: '20260228_073015',
  },
  {
    up: migration_20260228_083740_add_blocks_and_order.up,
    down: migration_20260228_083740_add_blocks_and_order.down,
    name: '20260228_083740_add_blocks_and_order'
  },
];
