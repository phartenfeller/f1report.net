import { marked } from 'marked';
import { getDriverBioStats, type DriverBioStats } from './db';

// Eagerly load every bio as a raw string at build time, keyed by driverRef.
// e.g. "../content/driver-bios/hamilton.md" -> "hamilton"
const bioFiles = import.meta.glob('../content/driver-bios/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

const biosByRef: Record<string, string> = {};
for (const [path, content] of Object.entries(bioFiles)) {
  const ref = path.split('/').pop()!.replace(/\.md$/, '');
  biosByRef[ref] = content;
}

function fillPlaceholders(markdown: string, stats: DriverBioStats): string {
  const map: Record<string, number> = {
    '{{driver_races}}': stats.races,
    '{{driver_wins}}': stats.wins,
    '{{driver_podiums}}': stats.podiums,
    '{{driver_poles}}': stats.poles,
    '{{driver_titles}}': stats.titles,
  };
  return markdown.replace(/\{\{driver_\w+\}\}/g, (token) =>
    token in map ? map[token].toLocaleString('en-US') : token
  );
}

/**
 * Returns the rendered HTML bio for a driver, with live stats substituted, or
 * null if no bio exists for that ref.
 */
export function getDriverBioHtml(
  driverRef: string,
  driverId: number
): string | null {
  const raw = biosByRef[driverRef];
  if (!raw) return null;

  const filled = fillPlaceholders(raw, getDriverBioStats(driverId));
  return marked.parse(filled, { async: false }) as string;
}
