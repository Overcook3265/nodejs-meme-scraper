import fs from 'node:fs';
import https from 'node:https';
import axios from 'axios';
import extractUrls from 'extract-urls';

// let shortUrl;
// ===get website code===
const webSite = await axios(
  'https://memegen-link-examples-upleveled.netlify.app/',
);
// ===extract html===
const websiteHtml = webSite.data;
// console.log(websiteHtml.slice(0, 5000));

// ===extract urls as arrays===
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

// === create directory ===
const folderName = './memes/';

try {
  if (!fs.existsSync(folderName)) {
    fs.mkdirSync(folderName);
  }
} catch (err) {
  console.error(err);
}

// === async attempt 2 digit naming attempt at looping with forEach+for loop === (still wrong pics but proper names)

// // something with targeting ONLY the current index in the second part, not the for each?

// for (let i = 1; i <= firstPicUrlsShort.length; i++) {
//   const nr = i.toLocaleString(undefined, { minimumIntegerDigits: 2 });
//   const stream = fs.createWriteStream(`./memes/${nr}.jpg`);
//   https.get(firstPicUrlsShort[i], function (response) {
//     response.pipe(stream);
//   });
// }

// === Test with async await

// start of array loop
let nr = 1;
for (const shortUrl of firstPicUrlsShort) {
  const stream = fs.createWriteStream(
    `./memes/${nr.toLocaleString(undefined, { minimumIntegerDigits: 2 })}.jpg`,
  );
  // console.log(`Created image ${nr}`);
  nr++;
  https.get(shortUrl, function (response) {
    response.pipe(stream);
  });
}

// create name
// create file at location
//

// // === commented async attempt 2 digit naming attempt at looping with forEach+for loop === (still wrong pics but proper names)

// // start of array loop
// for (const shortUrl of firstPicUrlsShort) {
//   // start of file naming and creation loop
//   for (let i = 1; i <= firstPicUrlsShort.length; i++) {
//     // declaration of 2 digit filename
//     const nr = i.toLocaleString(undefined, { minimumIntegerDigits: 2 });
//     // creation of empty file with proper name at location
//     const stream = fs.createWriteStream(`./memes/${nr}.jpg`);
//     console.log(`Created image ${nr}`);
//     // fetching of image data from adress declared in url
//     https.get(shortUrl, function (response) {
//       response.pipe(stream);
//       console.log(`Wrote image ${nr}`);
//     });
//   }
// }

// // === 2 digit naming attempt at looping with forEach+for loop=== (still wrong pics but proper names)
// firstPicUrlsShort.forEach((shortUrl) => {
//   for (let i = 1; i <= firstPicUrlsShort.length; i++) {
//     const nr = i.toLocaleString(undefined, { minimumIntegerDigits: 2 });
//     const stream = fs.createWriteStream(`./memes/${nr}.jpg`);
//     https.get(shortUrl, function (response) {
//       response.pipe(stream);
//     });
//   }
// });

// // ===attempt at looping with forEach+for loop=== (logs 10 pics but the wrong ones + duplicates)
// function firstPicUrlsShort.forEach((shortUrl) => {
//    for (let i = 1; i < firstPicUrlsShort.length; i++) {
//     const stream = fs.createWriteStream(`./memes/${i}.jpg`);
//      https.get(shortUrl, function (response) {
//       response.pipe(stream);
//     });
//   }
// });

// // ===attempt at looping with forEach+for loop=== (logs 10 pics but the wrong ones + duplicates)
// firstPicUrlsShort.forEach((shortUrl) => {
//   for (let i = 1; i < firstPicUrlsShort.length; i++) {
//     const stream = fs.createWriteStream(`./memes/${i}.jpg`);
//     https.get(shortUrl, function (response) {
//       response.pipe(stream);
//     });
//   }
// });

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
