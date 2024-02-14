import { createDiv, createNavBar } from './createElements.js';

function readyReq(pages = 1, name = '') {
  $.ajax({
    url: `https://rickandmortyapi.com/api/character/?page=${pages}&name=${name}`,
    method: 'GET',
    success: function (data) {
      const characterList = $('#characterList');
      $('#characterList').empty();
      data.results.forEach((character) => {
        const div = createDiv(character);
        characterList.append(div);
      });

      const navBar = $('.navBar');
      $('.navBar').empty();
      navBar.append(createNavBar);
      $('.btn_next').on('click', function () {
        btn_next(name);
      });
      $('.btn_back').on('click', function () {
        btn_back(name);
      });
    },
    error: function (error) {
      console.error('Erro na requisição:', error);
    },
  });
}

var numero = 1;

function btn_next(name) {
  const nextPage = numero++ + 1;
  $('#characterList').fadeOut('slow', function () {
    readyReq(nextPage, name);
    $(this).fadeIn('slow');
    $('html, body').animate({ scrollTop: 0 }, 'slow');
  });
}

function btn_back(name) {
  const prevPage = numero > 1 ? --numero : 1;

  $('#characterList').fadeOut('slow', function () {
    readyReq(prevPage, name);
    $(this).fadeIn('slow');
    $('html, body').animate({ scrollTop: 0 }, 'slow');
  });
}

function searchName() {
  numero = 1;
  const name = $('#searchInput').val();
  readyReq(1, name);
}

export { readyReq, searchName };
