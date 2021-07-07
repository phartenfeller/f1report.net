/* 
I darkened some, to make them more readable

sources: 
https://www.reddit.com/r/formula1/comments/lfpyfp/f1_2021_team_colors_hex_codes/
https://www.reddit.com/r/formula1/comments/arxt0r/f1_2019_team_colors_hex_codes/
https://www.reddit.com/r/formula1/comments/4v9t9f/f1_team_color_hex_codes/
*/

const colors = {
  McLaren: '#FF8700',
  AlphaTauri: '#2B4562',
  Williams: '#005AFF',
  'Alpine F1 Team': '#0090FF',
  'Red Bull': '#0600EF',
  Ferrari: '#DC0000',
  Mercedes: '#00D2BE',
  'Alfa Romeo': '#900000',
  'Haas F1 Team': '	#000000',
  'Aston Martin': '#006F62',
  Renault: '#e6c317',
  'Racing Point': '#F596C8',
  'Manor Marussia': '#323232',
  Sauber: '#006EFF',
  'Force India': '#FF5F0F',
  'Toro Rosso': '#0000FF',
  Virgin: '#cc0000',
  Lotus: '#FFB800',
  HRT: '#A6904F',
  Jordan: '#CCCC00',
  Minardi: '#E9C010',
  Toyota: '#E71837',
  Jaguar: '#004225',
  Arrows: '#CF6304',
  Prost: '#0B1740',
  Benetton: '#008860',
  BAR: '#B7082F',
};

function getTeamColor(team) {
  if (colors[team]) {
    return colors[team];
  }
  // eslint-disable-next-line no-console
  console.warn(`Unknown team => "${team}". Using fallback color`);
  return '#374151'; // neutral gray
}

export default getTeamColor;
