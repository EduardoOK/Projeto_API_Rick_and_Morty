function readyReq(counst = 1) {
  $.ajax({
    url: `https://rickandmortyapi.com/api/character/?page=${counst}`,
    method: 'GET',
    success: function (data) {
      const characterList = $('#characterList');
      $('#characterList').empty();
      data.results.forEach((character) => {
        const div = createDiv(character);
        characterList.append(div);
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

var numero = 1;
function btn_next() {
  const counst = numero++ + 1;

  console.log(counst);
  $('#characterList').fadeOut('slow', function () {
    readyReq(counst);
    console.log(this);
    $(this).fadeIn('slow');
    $('html, body').animate({ scrollTop: 0 }, 'slow');
  });
  return counst;
}

function btn_back() {
  const counst = numero > 1 ? --numero : 1;

  console.log(counst);
  $('#characterList').fadeOut('slow', function () {
    readyReq(counst);
    console.log(this);
    $(this).fadeIn('slow');
    $('html, body').animate({ scrollTop: 0 }, 'slow');
  });
  return counst;
}

export { readyReq, btn_next, btn_back };
