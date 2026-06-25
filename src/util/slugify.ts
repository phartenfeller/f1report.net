export default function slugify(input: string): string {
  let str = input;
  str = str.trim();
  str = str.toLowerCase();

  // swap accents
  const fr = 'àáäâèéëêìíïîòóöôùúüûñç·/_,:;';
  const to = 'aaaaeeeeiiiioooouuuunc------';
  for (let i = 0, l = fr.length; i < l; i += 1) {
    str = str.replace(new RegExp(fr.charAt(i), 'g'), to.charAt(i));
  }

  str = str
    .replace(/[^a-z0-9 -]/g, '') // remove invalid chars
    .replace(/\s+/g, '-') // collapse whitespace and replace by -
    .replace(/-+/g, '-'); // collapse dashes

  return str;
}
