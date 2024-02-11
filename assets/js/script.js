import { readyReq, searchName } from './functions.js';

$(document).ready(function () {
  $('#searchButton').on('click', searchName);

  readyReq();
});
