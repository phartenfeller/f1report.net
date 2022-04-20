#!node
/* eslint-disable no-console */

const encodeEmail = (e) => {
  const b = Buffer.from(e).toString('base64');
  const res = [];
  for (let i = 0; i < b.length; i += 1) {
    res[i] = b.charCodeAt(i).toString();
  }
  return res.join('-');
};

console.log(encodeEmail('hello@f1report.net'));
