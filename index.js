import axios from 'axios';
import extractUrls from 'extract-urls';
import fs from 'fs';
import https from 'https';

const webSite = await axios(
  'https://memegen-link-examples-upleveled.netlify.app/',
);

const websiteHtml = webSite.data;

const urls = extractUrls(websiteHtml);

const picUrls = urls.filter(function (str) {
  return str.includes(
    'https://memecomplete.com/edit/https://api.memegen.link/images/',
  );
});
const firstPicUrls = picUrls.slice(0, 10);
console.log(firstPicUrls);

//===working image downloader===
// const stream = fs.createWriteStream('01.jpg');
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
