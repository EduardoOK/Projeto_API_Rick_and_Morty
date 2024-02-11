// function readyReq(counst = 1) {
//   $.ajax({
//     url: `https://rickandmortyapi.com/api/character/?page=${counst}`,
//     method: 'GET',
//     success: function (data) {
//       const characterList = $('#characterList');

//       $('#characterList').empty();
//       data.results.forEach((character) => {
//         const div = createDiv(character);
//         characterList.append(div);
//       });

//       const navBar = $('.navBar');
//       $('.navBar').empty();
//       navBar.append(createNavBar);
//       $('.btn_next').on('click', btn_next);
//       $('.btn_back').on('click', btn_back);
//     },
//     error: function (error) {
//       console.error('Erro na requisição:', error);
//     },
//   });
// }

function readyReq(counst = 1, name = '') {
  $.ajax({
    url: `https://rickandmortyapi.com/api/character/?page=${counst}&name=${name}`,
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
function createDiv(character) {
  const { image, name, status, species, gender } = character;
  const div = $('<div>', { class: 'character' });
  const elements = $('<img>', {
    src: image,
    alt: name,
  });
  div.append(elements, createDivInfo(name, status, species, gender));
  return div;
}
function createDivInfo(name, status, species, gender) {
  const divInfo = $('<div>', { class: 'info' });
  divInfo.append(
    createSection($('<p>').text(name)),
    createSection(
      identifierStatus(status),
      $('<p>').text(status + ' - ' + species)
    ),
    createSection($('<p>').text('Gender : ' + gender))
  );
  return divInfo;
}
function createSection(funcao, content) {
  return $('<section>').append(funcao, content);
}
function identifierStatus(status) {
  const statusClasses = {
    Alive: 'status_icon',
    Dead: 'status_icon_red',
  };
  const defaultClass = 'status_icon_yellow';
  const selectedClass = statusClasses[status] || defaultClass;
  return $('<span>', { class: selectedClass });
}

function createNavBar() {
  const div = $('<div>', { class: 'btn_go' });
  const divB = $('<div>', { class: 'btn_back' });
  const divN = $('<div>', { class: 'btn_next' });
  divB.text('BACK');
  divN.text('NEXT');

  div.append(divB, divN);
  return div;
}

// var numero = 1;
// function btn_next() {
//   var name = $('#searchInput').val();
//   const counst = numero++ + 1;

//   console.log(counst);
//   $('#characterList').fadeOut('slow', function () {
//     readyReq(counst);
//     console.log(this);
//     $(this).fadeIn('slow');
//     $('html, body').animate({ scrollTop: 0 }, 'slow');
//   });
//   return counst, name;
// }

function btn_next(name) {
  const currentPage = getCurrentPage();
  const nextPage = currentPage + 1;

  console.log(nextPage);
  $('#characterList').fadeOut('slow', function () {
    readyReq(nextPage, name);
    console.log(this);
    $(this).fadeIn('slow');
    $('html, body').animate({ scrollTop: 0 }, 'slow');
  });
}

// function btn_back() {
//   const counst = numero > 1 ? --numero : 1;

//   console.log(counst);
//   $('#characterList').fadeOut('slow', function () {
//     readyReq(counst);
//     console.log(this);
//     $(this).fadeIn('slow');
//     $('html, body').animate({ scrollTop: 0 }, 'slow');
//   });
//   return counst;
// }
function btn_back(name) {
  const currentPage = getCurrentPage();
  const prevPage = Math.max(1, currentPage - 1);

  console.log(prevPage);
  $('#characterList').fadeOut('slow', function () {
    readyReq(prevPage, name);
    console.log(this);
    $(this).fadeIn('slow');
    $('html, body').animate({ scrollTop: 0 }, 'slow');
  });
}

// function searchName(counst = 1) {
//   const name = $('#searchInput').val();
//   $.ajax({
//     url: `https://rickandmortyapi.com/api/character/?page=${counst}&name=${name}`,
//     method: 'GET',
//     success: function (data) {
//       const characterList = $('#characterList');

//       $('#characterList').empty();
//       data.results.forEach((character) => {
//         const div = createDiv(character);
//         characterList.append(div);
//       });
//       $('.navBar').hide();
//       // const navBar = $('.navBar');
//       // $('.navBar').empty();
//       // navBar.append(createNavBar);
//       // $('.btn_next').on('click', btn_next);
//       // $('.btn_back').on('click', btn_back);
//     },
//     error: function (error) {
//       console.error('Erro na requisição:', error);
//     },
//   });
// }
function getCurrentPage() {
  // Obtém a página atual da barra de pesquisa
  return parseInt($('#currentPage').val()) || 1;
}

function setCurrentPage(page) {
  // Atualiza o campo de entrada de página
  $('#currentPage').val(page);
}

function searchName() {
  const name = $('#searchInput').val();
  // Reinicia a página atual quando uma nova pesquisa é realizada
  setCurrentPage(1);
  readyReq(1, name);
}

export { readyReq, searchName };
