import * as migration_20260228_073015 from './20260228_073015';
import * as migration_20260228_083740_add_blocks_and_order from './20260228_083740_add_blocks_and_order';
import * as migration_20260228_191845 from './20260228_191845';
import * as migration_20260309_083920 from './20260309_083920';
import * as migration_20260309_120000_services_locales_seo from './20260309_120000_services_locales_seo';
import * as migration_20260309_161221_add_seo_blocks from './20260309_161221_add_seo_blocks';

export const migrations = [
  {
    up: migration_20260228_073015.up,
    down: migration_20260228_073015.down,
    name: '20260228_073015',
  },
  {
    up: migration_20260228_083740_add_blocks_and_order.up,
    down: migration_20260228_083740_add_blocks_and_order.down,
    name: '20260228_083740_add_blocks_and_order',
  },
  {
    up: migration_20260228_191845.up,
    down: migration_20260228_191845.down,
    name: '20260228_191845',
  },
  {
    up: migration_20260309_083920.up,
    down: migration_20260309_083920.down,
    name: '20260309_083920',
  },
  {
    up: migration_20260309_120000_services_locales_seo.up,
    down: migration_20260309_120000_services_locales_seo.down,
    name: '20260309_120000_services_locales_seo',
  },
  {
    up: migration_20260309_161221_add_seo_blocks.up,
    down: migration_20260309_161221_add_seo_blocks.down,
    name: '20260309_161221_add_seo_blocks',
  },
];
