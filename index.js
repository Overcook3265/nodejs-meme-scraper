import axios from 'axios';
import extractUrls from 'extract-urls';
import fs from 'fs';
import https from 'https';

// let shortUrl;
const webSite = await axios(
  'https://memegen-link-examples-upleveled.netlify.app/',
);

const websiteHtml = webSite.data;

const urls = extractUrls(websiteHtml);

// ===search array for string===
const picUrls = urls.filter(function (str) {
  return str.startsWith('https://api.memegen.link/images/');
});
// ===cut off array after position 10
const firstPicUrls = picUrls.slice(0, 10);

// ===remove width=300 ending where necessary
const firstPicUrlsShort = firstPicUrls.map(function (adress) {
  return adress.replace('?width=300', '');
});

// console.log(firstPicUrlsShort);

// ===attempt at looping with forEach+for loop=== (logs all pics in same name)
firstPicUrlsShort.forEach((shortUrl) => {
  for (let i = 0; i < firstPicUrlsShort.length; i++) {
    const stream = fs.createWriteStream(`./memes/${i}.jpg`);
    https.get(shortUrl, function (response) {
      response.pipe(stream);
    });
  }
});

// // ===attempt at looping with forEach=== (logs all pics in same name)
// firstPicUrlsShort.forEach((shortUrl) => {
//   let i = 1;
//   const stream = fs.createWriteStream(`./memes/${++i}.jpg`);
//   https.get(shortUrl, function (response) {
//     response.pipe(stream);
//   });
// });

// // ===partially working for loop(only gives 9th image)===
// for (shortUrl of firstPicUrlsShort) {
//   let i = 1;
//   const stream = fs.createWriteStream(`./memes/${i++}.jpg`);
//   https.get(shortUrl, function (response) {
//     response.pipe(stream);
//   });
// }

// ===working image downloader===

// const stream = fs.createWriteStream(`./memes/01.jpg`);
// https.get(
//   'https://api.memegen.link/images/bad/your_meme_is_bad/and_you_should_feel_bad.jpg',
//   function (response) {
//     response.pipe(stream);
//   },
// );

// const downloadURI = (uri, name) => {
//   const link = document.createElement('a');
//   link.download = name;
//   link.href = uri;
//   document.body.appendChild(link);
//   link.click();
//   document.body.removeChild(link);
// };
// downloadURI(
//   'https://memecomplete.com/edit/https://api.memegen.link/images/bad/your_meme_is_bad/and_you_should_feel_bad.jpg',
//   '01.jpg',
// );

// const file = new File(['foo'], 'new-note.txt', {
//   type: 'text/plain',
// });
