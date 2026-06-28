import { Database } from "bun:sqlite";

const db = new Database("db/f1data.sqlite");

export interface DriverStanding {
  driverStandingsId: number;
  raceId: number;
  driverId: number;
  points: number;
  position: number;
  positionText: string;
  wins: number;
  driverDisplayName: string;
}

export interface ConstructorStanding {
  constructorStandingsId: number;
  raceId: number;
  constructorId: number;
  points: number;
  position: number;
  positionText: string;
  wins: number;
  name: string;
}

export interface Race {
  raceId: number;
  year: number;
  round: number;
  circuitId: number;
  name: string;
  date: string;
  time: string;
  url: string;
  raceSlug: string;
  circuitName: string;
  circuitRef: string;
  country: string;
  location: string;
  hasData: number;
}

export interface AdaptedRace extends Race {
  circuitByCircuitid: {
    name: string;
    country: string;
    location: string;
    circuitref: string;
  };
}

export function getAllRaces() {
  return db
    .query(
      "SELECT raceId, race_slug as raceSlug, year, name, round, date, time FROM races ORDER BY year DESC, round ASC"
    )
    .all();
}

export function getAllRacesWithWinners() {
  return db
    .query(
      `SELECT r.*, r.race_slug as raceSlug,
    c.name as circuitName, c.circuitRef, c.country, c.location,
    wd.driver_display_name as winnerDriver,
    wc.name as winnerConstructor
    FROM races r
    JOIN circuits c ON r.circuitId = c.circuitId
    LEFT JOIN results res ON r.raceId = res.raceId AND res.position = 1
    LEFT JOIN drivers wd ON res.driverId = wd.driverId
    LEFT JOIN "constructor_teams" wc ON res.constructorId = wc.constructorId
    ORDER BY r.year DESC, r.round ASC`
    )
    .all();
}

export function getAllSeasons() {
  return db.query("SELECT year, url FROM seasons ORDER BY year DESC").all();
}

export function getAllCircuits() {
  return db
    .query("SELECT circuitId, circuitRef, name FROM circuits ORDER BY name ASC")
    .all();
}

export function getAllCircuitsWithStats() {
  return db
    .query(`
      SELECT c.circuitId, c.circuitRef, c.name, c.country,
             cs.raceCount, cs.mostDriverWins, cs.mostCostructorWins
      FROM circuits c
      LEFT JOIN circuitStats cs ON c.circuitId = cs.circuitId
      ORDER BY cs.raceCount DESC
    `)
    .all();
}

export function getRaceBySlug(slug: string) {
  // Try to find race by slug
  // The slug in the new DB might be race_slug column
  return db
    .query("SELECT * FROM races WHERE race_slug = ?")
    .get(slug);
}

export function getRaceById(raceId: number) {
  return db.query("SELECT * FROM races WHERE raceId = ?").get(raceId);
}

export function getCircuitById(circuitId: number) {
  return db.query("SELECT * FROM circuits WHERE circuitId = ?").get(circuitId);
}

export function getResultsByRaceId(raceId: number) {
  return db
    .query(
      `SELECT r.*, 
        d.forename, d.surname, d.code, d.number as driverNumber, d.driver_display_name as driverDisplayName, d.driverRef,
        c.name as teamName, c.constructorRef,
        s.status
       FROM results r
       LEFT JOIN drivers d ON r.driverId = d.driverId
       LEFT JOIN "constructor_teams" c ON r.constructorId = c.constructorId
       LEFT JOIN status s ON r.statusId = s.statusId
       WHERE r.raceId = ?
       ORDER BY r.positionOrder ASC`
    )
    .all(raceId);
}

export function getLapTimesByRaceId(raceId: number) {
  // Limit to avoid massive payloads if not needed, but usually we need all for charts
  return db
    .query(
      `SELECT l.*, d.driver_display_name as driverDisplayName, d.code 
       FROM lapTimes l
       JOIN drivers d ON l.driverId = d.driverId
       WHERE l.raceId = ?
       ORDER BY l.lap ASC`
    )
    .all(raceId);
}

export function getPitStopsByRaceId(raceId: number) {
  return db
    .query(
      `SELECT p.*, d.driver_display_name as driverDisplayName 
       FROM pitStops p
       JOIN drivers d ON p.driverId = d.driverId
       WHERE p.raceId = ?
       ORDER BY p.time ASC`
    )
    .all(raceId);
}

// Stats tables
export function getDriverAvgLapTimes(raceId: number) {
  return db.query("SELECT * FROM dri_avg_lapt WHERE raceId = ?").all(raceId);
}
export function getDriverAvgLapTimes70P(raceId: number) {
  return db.query("SELECT * FROM dri_avg_lapt_70_p WHERE raceId = ?").all(raceId);
}
export function getConstructorAvgLapTimes(raceId: number) {
  return db.query(`
    SELECT t.*, c.name 
    FROM con_avg_lapt t
    JOIN "constructor_teams" c ON t.constructorId = c.constructorId
    WHERE t.raceId = ?
  `).all(raceId);
}
export function getConstructorAvgLapTimes70P(raceId: number) {
  return db.query(`
    SELECT t.*, c.name 
    FROM con_avg_lapt_70_p t
    JOIN "constructor_teams" c ON t.constructorId = c.constructorId
    WHERE t.raceId = ?
  `).all(raceId);
}
export function getConstructorAvgPitStops(raceId: number) {
  return db.query(`
    SELECT t.*, c.name 
    FROM con_avg_pitstops t
    JOIN "constructor_teams" c ON t.constructorId = c.constructorId
    WHERE t.raceId = ?
  `).all(raceId);
}

export function getSeasonDriverMainConstructors(year: number) {
  return db.query(`
    SELECT s.driverid as driverId, c.name as teamName, d.driver_display_name as driverDisplayName
    FROM seasonDriverMainCon s
    JOIN "constructor_teams" c ON s.constructorId = c.constructorId
    JOIN drivers d ON s.driverid = d.driverId
    WHERE s.year = ?
  `).all(year);
}

export function getSeasonLastRace(year: number) {
  return db
    .query("SELECT lastraceid FROM seasonLastRace WHERE year = ?")
    .get(year) as { lastraceid: number } | null;
}

export function getDriverStandings(raceId: number) {
  return db
    .query(
      `SELECT ds.*, d.driver_display_name as driverDisplayName 
       FROM driverStandings ds
       JOIN drivers d ON ds.driverId = d.driverId
       WHERE ds.raceId = ?
       ORDER BY ds.position ASC`
    )
    .all(raceId) as DriverStanding[];
}

export function getConstructorStandings(raceId: number) {
  return db
    .query(
      `SELECT cs.*, c.name 
       FROM constructorStandings cs
       JOIN "constructor_teams" c ON cs.constructorId = c.constructorId
       WHERE cs.raceId = ?
       ORDER BY cs.position ASC`
    )
    .all(raceId) as ConstructorStanding[];
}

export function getCurrentData(): {
  lastRace: AdaptedRace | null;
  nextRace: AdaptedRace | null;
  currentSeason: number | null;
  driverStandings: DriverStanding[];
  constructorStandings: ConstructorStanding[];
} {
  // Get last 2 seasons
  const seasons = db
    .query("SELECT year FROM seasons ORDER BY year DESC LIMIT 2")
    .all() as { year: number }[];

    
    // We need races for these seasons to determine last/next race
    // logic: find races where we have data (laptimes > 0)
    // To be efficient, we can check if results exist for the race
    
    // Fetch all races for these seasons
  const years = seasons.map((s) => s.year);
  if (years.length === 0)
    return {
      lastRace: null,
      nextRace: null,
      currentSeason: null,
      driverStandings: [],
      constructorStandings: [],
    };

  const races = db
    .query(
      `
        SELECT r.*, r.race_slug as raceSlug, c.name as circuitName, c.circuitRef, c.country, c.location,
        (SELECT count(*) FROM lapTimes l WHERE l.raceId = r.raceId LIMIT 1) as hasData
        FROM races r
        JOIN circuits c ON r.circuitId = c.circuitId
        WHERE r.year IN (${years.join(",")})
        ORDER BY r.year DESC, r.round ASC -- sort by year desc, then round asc (but for splitting we might want overall sort)
    `
    )
    .all() as Race[];

  // Sort races by date/round globally? Or grouped by season?
  // Gatsby hook: seasons[0] (current), seasons[1] (prev)
  // pastRaces = currentSeason.races.filter(hasData)
  // if empty, check prevSeason.races.filter(hasData)
  // lastRace = pastRaces.sort(round desc)[0]

  const currentSeasonYear = races[0].year;
  const currentSeasonRaces = races.filter((r) => r.year === currentSeasonYear);
  const prevSeasonRaces =
    seasons.length > 1 ? races.filter((r) => r.year === seasons[1].year) : [];

  let pastRaces = currentSeasonRaces.filter((r) => r.hasData > 0);
  if (pastRaces.length === 0) {
    pastRaces = prevSeasonRaces.filter((r) => r.hasData > 0);
  }

  // Sort past races by date/round desc to find the very last one
  pastRaces.sort((a, b) => {
    if (a.year !== b.year) return b.year - a.year;
    return b.round - a.round;
  });

  const lastRace = pastRaces[0] || null;

  // Next Race: future races in current season
  const futureRaces = currentSeasonRaces.filter((r) => r.hasData === 0);
  futureRaces.sort((a, b) => a.round - b.round);
  const nextRace = futureRaces[0] || null;

  // Standings from seasonLastRace of current season
  const seasonLastRace = getSeasonLastRace(currentSeasonYear);
  let driverStandings: DriverStanding[] = [];
  let constructorStandings: ConstructorStanding[] = [];

  if (seasonLastRace) {
    driverStandings = getDriverStandings(seasonLastRace.lastraceid);
    constructorStandings = getConstructorStandings(seasonLastRace.lastraceid);
  }

  // Adapt shape to match what components expect
  // lastRace needs: name, year, raceSlug, circuitByCircuitid: {name, country, circuitref}
  const adaptRace = (r: Race | null): AdaptedRace | null => {
    if (!r) return null;
    return {
      ...r,
      circuitByCircuitid: {
        name: r.circuitName,
        country: r.country,
        location: r.location,
        circuitref: r.circuitRef,
      },
    };
  };

  return {
    lastRace: adaptRace(lastRace),
    nextRace: adaptRace(nextRace),
    currentSeason: currentSeasonYear,
    driverStandings,
    constructorStandings,
  };
}
export function getSeasonByYear(year: number) {
  return db.query("SELECT * FROM seasons WHERE year = ?").get(year);
}

export function getRacesByYear(year: number) {
  return db.query(`
    SELECT r.*, r.race_slug as raceSlug,
    c.name as circuitName, c.circuitRef, c.country, c.location,
    wd.driver_display_name as winnerDriver,
    wc.name as winnerConstructor
    FROM races r
    JOIN circuits c ON r.circuitId = c.circuitId
    LEFT JOIN results res ON r.raceId = res.raceId AND res.position = 1
    LEFT JOIN drivers wd ON res.driverId = wd.driverId
    LEFT JOIN "constructor_teams" wc ON res.constructorId = wc.constructorId
    WHERE r.year = ?
    ORDER BY r.date ASC
  `).all(year);
}

export function getDriverStandingsBySeason(year: number) {
  // We need stats for all races in the season to build charts
  return db.query(`
    SELECT ds.*, d.driver_display_name as driverDisplayName, r.round, r.name as raceName
    FROM driverStandings ds
    JOIN races r ON ds.raceId = r.raceId
    JOIN drivers d ON ds.driverId = d.driverId
    WHERE r.year = ?
    ORDER BY r.round ASC, ds.position ASC
  `).all(year);
}

export function getConstructorStandingsBySeason(year: number) {
  return db.query(`
    SELECT cs.*, c.name, r.round, r.name as raceName
    FROM constructorStandings cs
    JOIN races r ON cs.raceId = r.raceId
    JOIN "constructor_teams" c ON cs.constructorId = c.constructorId
    WHERE r.year = ?
    ORDER BY r.round ASC, cs.position ASC
  `).all(year);
}



export function getCircuitByRef(ref: string) {
  return db.query(`
    SELECT c.*, cs.*
    FROM circuits c
    LEFT JOIN circuitStats cs ON c.circuitId = cs.circuitId
    WHERE c.circuitRef = ?
  `).get(ref);
}

export function getRacesByCircuitId(circuitId: number) {
  return db.query(`
    SELECT r.*, 
    wd.driver_display_name as winnerDriver,
    wd.driverId as winnerDriverId,
    wc.name as winnerConstructor,
    wc.constructorId as winnerConstructorId
    FROM races r
    LEFT JOIN results res ON r.raceId = res.raceId AND res.position = 1
    LEFT JOIN drivers wd ON res.driverId = wd.driverId
    LEFT JOIN "constructor_teams" wc ON res.constructorId = wc.constructorId
    WHERE r.circuitId = ?
    ORDER BY r.date DESC
  `).all(circuitId);
}

export function getAllDriversSimple() {
  return db.query("SELECT driverId, driver_display_name as driverDisplayName, driverRef FROM drivers").all();
}

export function getAllConstructorsSimple() {
  return db.query('SELECT constructorId, name, constructorRef FROM "constructor_teams"').all();
}

export function getAllTimeDriverStats() {
  return db
    .query(`
      SELECT s.*, d.driver_display_name as driverDisplayName, d.driverRef
      FROM dri_alltime_stats s
      JOIN drivers d ON s.driverid = d.driverId
    `)
    .all();
}

export function getAllTimeDriverStatsPrepared() {
  return db.query('SELECT * FROM dri_alltime_stats_prepared').all();
}

/**
 * Constructor All Time Stats
 */
export function getAllTimeConstructorStats() {
  return db
    .query(`
      SELECT s.*, c.name, c.constructorRef
      FROM con_alltime_stats s
      JOIN "constructor_teams" c ON s.constructorid = c.constructorId
    `)
    .all();
}

export function getAllTimeConstructorStatsPrepared() {
  return db.query('SELECT * FROM con_alltime_stats_prepared').all();
}

/**
 * Legacy Constructor Stats
 */
export interface LegacyConstructor {
  legacy_id: number;
  legacy_name: string;
  legacy_color: string;
}

export function getAllLegacyConstructors() {
  return db.query('SELECT * FROM constructor_legacy').all() as LegacyConstructor[];
}

export function getLegacyConstructorStats() {
  return db
    .query(`
      SELECT s.*, l.legacy_name as name, l.legacy_name, l.legacy_color
      FROM legacy_con_alltime_stats s
      JOIN constructor_legacy l ON s.legacy_id = l.legacy_id
    `)
    .all();
}

export function getLegacyConstructorStatsPrepared() {
  return db.query('SELECT * FROM legacy_con_alltime_stats_prepared').all();
}

/**
 * Refs & Slugs Lookups
 */
export function getDriverByRef(ref: string) {
  return db.query("SELECT * FROM drivers WHERE driverRef = ?")
    .get(ref) as { driverId: number; driver_display_name: string, driverRef: string, forename: string, surname: string } | null;
}

export function getConstructorByRef(ref: string) {
  return db.query('SELECT * FROM "constructor_teams" WHERE constructorRef = ?')
    .get(ref) as { constructorId: number; name: string, constructorRef: string } | null;
}

// Simple slugify for legacy names
export function slugify(text: string) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')     // Replace spaces with -
    .replace(/[^\w\-]+/g, '') // Remove all non-word chars
    .replace(/\-\-+/g, '-');  // Replace multiple - with single -
}

export function getLegacyConstructorBySlug(slug: string) {
  const all = getAllLegacyConstructors();
  return all.find(l => slugify(l.legacy_name) === slug) || null;
}

/**
 * Analytics
 */
export function getDriverAnalytics(driverId: number) {
  const res = db.query("SELECT json FROM dri_analytics WHERE driverid = ?").get(driverId) as { json: string } | null;
  return res ? JSON.parse(res.json) : null;
}

export function getConstructorAnalytics(constructorId: number) {
  const res = db.query("SELECT json FROM con_analytics WHERE constructorid = ?").get(constructorId) as { json: string } | null;
  return res ? JSON.parse(res.json) : null;
}

export function getLegacyConstructorAnalytics(legacyId: number) {
  const res = db.query("SELECT json FROM legacy_con_analytics WHERE legacy_id = ?").get(legacyId) as { json: string } | null;
  return res ? JSON.parse(res.json) : null;
}

/**
 * Stats used to resolve the {{driver_*}} placeholders in driver bio markdown.
 * Four come from dri_alltime_stats; titles are derived from driverStandings
 * (the driver's position after the final race of each season).
 */
export interface DriverBioStats {
  races: number;
  wins: number;
  podiums: number;
  poles: number;
  titles: number;
}

export function getDriverBioStats(driverId: number): DriverBioStats {
  const s = db
    .query(
      "SELECT races, wins, podiums, poles FROM dri_alltime_stats WHERE driverid = ?"
    )
    .get(driverId) as
    | { races: number; wins: number; podiums: number; poles: number }
    | null;

  const titlesRow = db
    .query(
      `WITH last_race AS (
         SELECT year, MAX(round) AS mr FROM races GROUP BY year
       )
       SELECT COUNT(*) AS titles
       FROM driverStandings ds
       JOIN races ra ON ra.raceId = ds.raceId
       JOIN last_race lr ON lr.year = ra.year AND lr.mr = ra.round
       WHERE ds.driverId = ? AND ds.position = 1`
    )
    .get(driverId) as { titles: number } | null;

  return {
    races: s?.races ?? 0,
    wins: s?.wins ?? 0,
    podiums: s?.podiums ?? 0,
    poles: s?.poles ?? 0,
    titles: titlesRow?.titles ?? 0,
  };
}
