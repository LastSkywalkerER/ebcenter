import * as migration_20260228_073015 from './20260228_073015';
import * as migration_20260228_083740_add_blocks_and_order from './20260228_083740_add_blocks_and_order';
import * as migration_20260228_191845 from './20260228_191845';
import * as migration_20260309_083920 from './20260309_083920';
import * as migration_20260309_120000_services_locales_seo from './20260309_120000_services_locales_seo';
import * as migration_20260309_161221_add_seo_blocks from './20260309_161221_add_seo_blocks';
import * as migration_20260309_200000_add_contacts_global from './20260309_200000_add_contacts_global';
import * as migration_20260310_140000_add_badge_principles_consultation_blocks from './20260310_140000_add_badge_principles_consultation_blocks'
import * as migration_20260310_150000_add_footer_quick_links_title from './20260310_150000_add_footer_quick_links_title'
import * as migration_20260311_200000_add_knowledge_base_and_new_blocks from './20260311_200000_add_knowledge_base_and_new_blocks'
import * as migration_20260311_210000_add_stats_and_section_fields from './20260311_210000_add_stats_and_section_fields'
import * as migration_20260311_220000_add_principles_section_tag from './20260311_220000_add_principles_section_tag'

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
  {
    up: migration_20260309_200000_add_contacts_global.up,
    down: migration_20260309_200000_add_contacts_global.down,
    name: '20260309_200000_add_contacts_global',
  },
  {
    up: migration_20260310_140000_add_badge_principles_consultation_blocks.up,
    down: migration_20260310_140000_add_badge_principles_consultation_blocks.down,
    name: '20260310_140000_add_badge_principles_consultation_blocks',
  },
  {
    up: migration_20260310_150000_add_footer_quick_links_title.up,
    down: migration_20260310_150000_add_footer_quick_links_title.down,
    name: '20260310_150000_add_footer_quick_links_title',
  },
  {
    up: migration_20260311_200000_add_knowledge_base_and_new_blocks.up,
    down: migration_20260311_200000_add_knowledge_base_and_new_blocks.down,
    name: '20260311_200000_add_knowledge_base_and_new_blocks',
  },
  {
    up: migration_20260311_210000_add_stats_and_section_fields.up,
    down: migration_20260311_210000_add_stats_and_section_fields.down,
    name: '20260311_210000_add_stats_and_section_fields',
  },
  {
    up: migration_20260311_220000_add_principles_section_tag.up,
    down: migration_20260311_220000_add_principles_section_tag.down,
    name: '20260311_220000_add_principles_section_tag',
  },
];
