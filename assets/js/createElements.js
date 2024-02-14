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

export { createDiv, createNavBar };
