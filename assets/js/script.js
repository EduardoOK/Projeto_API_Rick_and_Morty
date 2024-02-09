import { readyReq, btn_next, btn_back } from './functions.js';

$(document).ready(function () {
  $('#searchButton').on('click', function teste() {
    console.log('teste');
  });
  $('.btn_next').on('click', btn_next);
  $('.btn_back').on('click', btn_back);
  readyReq();
});
