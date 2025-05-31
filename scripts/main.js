// CAROUSEL
{
  const slidesContainer = document.querySelector('.slides');
  const SLIDER_BUTTON_LEFT = document.querySelector('.slider__btn-left');
  const SLIDER_BUTTON_RIGHT = document.querySelector('.slider__btn-right');
  let slide = document.createElement('div');
  slide.classList.add('card');
  const collectionLeft = document.querySelector('.collection-left');
  const collectionActive = document.querySelector('.collection-active');
  const collectionRight = document.querySelector('.collection-right');
  let indexes = [0, 1, 2, 3, 4, 5, 6, 7];
  function getRandomIndexOfArray(arr) {
    return Math.floor(Math.random() * arr.length);
  }
  let currentOrder = [];
  let newOrder = [];

  let randomIndex;
  function getOrder() {
    newOrder = [];
    while (newOrder.length < 3) {
      randomIndex = getRandomIndexOfArray(indexes);
      if (!currentOrder.includes(indexes[randomIndex]))
        newOrder.push(indexes[randomIndex]);
      indexes.splice(randomIndex, 1);
    }
    indexes = [0, 1, 2, 3, 4, 5, 6, 7];
    return newOrder;
  }
  currentOrder = getOrder();
  newOrder = getOrder();

  function createSlides(data, order, collection) {
    for (let i = 0; i < order.length; i++) {
      slide = document.createElement('div');
      slide.classList.add('card');
      slide.innerHTML = `<div class="card__img-box"><img src="${data[order[i]].img}" alt="image ${data[order[i]].breed}" class="card__img"></div>
                        <h3 class="card__title">${data[order[i]].name}</h3>
                        <button class="card__btn" type="button">Learn more</button>`;
      slide.dataset.index = order[i];
      collection.appendChild(slide);
    }
  }

  function moveLeft() {
    slidesContainer.classList.add('transition-left');
    SLIDER_BUTTON_LEFT.removeEventListener('click', moveLeft);
    SLIDER_BUTTON_RIGHT.removeEventListener('click', moveRight);
  }
  function moveRight() {
    slidesContainer.classList.add('transition-right');
    SLIDER_BUTTON_LEFT.removeEventListener('click', moveLeft);
    SLIDER_BUTTON_RIGHT.removeEventListener('click', moveRight);
  }

  fetch('../../data/pets.json')
    .then((result) => result.json())
    .then((data) => {
      // INITIALIZATION
      createSlides(data, newOrder, collectionLeft);
      createSlides(data, currentOrder, collectionActive);
      newOrder = getOrder();
      createSlides(data, newOrder, collectionRight);

      // EVENT LISTENING
      SLIDER_BUTTON_LEFT.addEventListener('click', moveLeft);
      SLIDER_BUTTON_RIGHT.addEventListener('click', moveRight);

      slidesContainer.addEventListener('animationend', (animationEvent) => {
        if (animationEvent.animationName === 'move-left') {
          slidesContainer.classList.remove('transition-left');
          collectionRight.innerHTML = collectionActive.innerHTML;
          collectionActive.innerHTML = collectionLeft.innerHTML;
          collectionLeft.innerHTML = '';
          currentOrder = newOrder;
          newOrder = getOrder();
          createSlides(data, newOrder, collectionLeft);
        } else {
          slidesContainer.classList.remove('transition-right');
          collectionLeft.innerHTML = collectionActive.innerHTML;
          collectionActive.innerHTML = collectionRight.innerHTML;
          collectionRight.innerHTML = '';
          currentOrder = newOrder;
          newOrder = getOrder();
          createSlides(data, newOrder, collectionRight);
        }
        SLIDER_BUTTON_LEFT.addEventListener('click', moveLeft);
        SLIDER_BUTTON_RIGHT.addEventListener('click', moveRight);
      });
      return data;
    });
}
