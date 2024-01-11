import axios from 'axios';
import extractUrls from 'extract-urls';

const webSite = await axios(
  'https://memegen-link-examples-upleveled.netlify.app/',
);

const websiteHtml = webSite.data;
// console.log(websiteHtml.substring(1, 10000));

const urls = extractUrls(websiteHtml);
//console.log(urls);

const picUrls = urls.filter(function (str) {
  return str.includes(
    'https://memecomplete.com/edit/https://api.memegen.link/images/',
  );
});
console.log(picUrls);
console.log(picUrls.length);
