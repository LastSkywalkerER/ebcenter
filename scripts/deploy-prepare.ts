/**
 * Deploy preparation: migrations + seed.
 * - FORCE_SEED=1: Fresh DB (migrate:fresh) + full seed
 * - Default: Incremental migrate (only new migrations) + seed
 *
 * Run: npx tsx scripts/deploy-prepare.ts
 * Or: yarn deploy:prepare
 */
import { execSync } from 'child_process'

const forceSeed = process.env.FORCE_SEED === '1'

function run(cmd: string, description: string): void {
  console.log(`[deploy-prepare] ${description}...`)
  execSync(cmd, {
    stdio: 'inherit',
    env: { ...process.env, FORCE_SEED: forceSeed ? '1' : undefined },
  })
}

try {
  if (forceSeed) {
    console.log('[deploy-prepare] FORCE_SEED=1: resetting DB and seeding from scratch')
    run(
      'npx cross-env NODE_OPTIONS=--no-deprecation payload migrate:fresh --force-accept-warning',
      'Migrate fresh (drop + recreate)'
    )
  } else {
    run(
      'npx cross-env NODE_OPTIONS=--no-deprecation payload migrate --force',
      'Migrate (incremental)'
    )
  }
  run('npx tsx scripts/seed.ts', 'Seed')
  console.log('[deploy-prepare] Done')
} catch (err) {
  console.error('[deploy-prepare] Failed:', err)
  process.exit(1)
}
