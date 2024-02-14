import { readyReq, searchName } from './functions.js';

$(document).ready(function () {
  $('#searchButton').on('click', searchName);
  readyReq();

  $('#about').on('click', function () {
    $('main').load('./assets/html/ajax/about.html');
    const page = $(this).attr('href').substring(1); // Remove o '#'
    $('#searchNone').hide();
    window.location.hash = page;
    document.title = page;
  });
});
