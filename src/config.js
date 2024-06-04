const mode = 'local';
// const mode = 'prod';
// const mode = 'test';
// const mode = 'offLine';

// export const root = 'mainpage';
export const root = 'ams-fornm';
  // export const mainpage = ['MartynenkoAA', 'TatarenkoEG', 'GanakovskiiFS'];
  export const mainpage = [];

export let offlinelang; // if it defined the project use offline mode 
export let apiBase;
export let pathBase = '';
switch ( mode ) {
  case 'local':   apiBase = 'https://asuz.digtp.com/ams_api_tst'; 
                  break;
  case 'prod':    apiBase = `https://${window.location.hostname}/ams_api`;
                  pathBase = `/${root}`
                  break;
  case 'offLine': apiBase = `http://localhost:3000`;
                  offlinelang = 'en';
                  break;
  default:        apiBase = 'https://asuz.digtp.com/ams_api_tst';
}