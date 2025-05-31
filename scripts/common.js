// BURGER
{
  const burgerButton = document.querySelector('.burger-btn');
  const burger = document.querySelector('.burger');
  const burgerWrapper = document.querySelector('.burger-wrapper');

  burgerButton.addEventListener('click', () => {
    burgerWrapper.classList.toggle('burger-wrapper--active');
    burgerButton.classList.toggle('burger-btn--active');
    burger.classList.toggle('burger--active');
  });
  burgerWrapper.addEventListener('click', (event) => {
    if (!event.target.classList.contains('burger')) {
      burgerWrapper.classList.remove('burger-wrapper--active');
      burgerButton.classList.remove('burger-btn--active');
      burger.classList.remove('burger--active');
    }
  });
}

// POPUP
{
  const POPUP_LISTENING_AREA = document.querySelector('.popup-listening-area');
  const POPUP = document.querySelector('.wrapper-popup');
  const popupContent = document.querySelector('.popup__content');
  let paginationItem;
  POPUP.addEventListener('click', (event) => {
    if (!event.target.closest('.popup__content')) {
      POPUP.classList.remove('wrapper-popup--active');
      document.querySelector('html').classList.remove('noscroll');
    }
  });
  let currentIndex;
  POPUP_LISTENING_AREA.addEventListener('click', (event) => {
    if (event.target.closest('.card')) {
      paginationItem = event.target.closest('.card');
      POPUP.classList.add('wrapper-popup--active');
      document.querySelector('html').classList.add('noscroll');
      currentIndex = paginationItem.dataset.index;
      fetch('../../data/pets.json')
        .then((result) => result.json())
        .then((data) => {
          popupContent.innerHTML = `<div class="popup__img-box"><img src="${data[currentIndex].img}" alt="image of ${data[currentIndex].breed}"></div>
                                <div class="popup__text-content">
                                    <div class="popup__title-content">
                                        <h3 class="popup__title">${data[currentIndex].name}</h3>
                                        <p class="popup__subtitle">${data[currentIndex].type} - ${data[currentIndex].breed}</p>
                                    </div>
                                    <p class="popup__text">${data[currentIndex].description}</p>
                                    <ul class="popup__list">
                                        <li class="popup__list-elm">
                                            <p class="popup__list-paragraph"><span class="popup__text-emphasis">Age: </span>${data[currentIndex].age}</p>
                                        </li>
                                        <li class="popup__list-elm">
                                            <p class="popup__list-paragraph"><span class="popup__text-emphasis">Inoculations: </span>${data[currentIndex].inoculations}</p>
                                        </li>
                                        <li class="popup__list-elm">
                                            <p class="popup__list-paragraph"><span class="popup__text-emphasis">Diseases: </span>${data[currentIndex].diseases}</p>
                                        </li>
                                        <li class="popup__list-elm">
                                            <p class="popup__list-paragraph"><span class="popup__text-emphasis">Parasites: </span>${data[currentIndex].parasites}</p>
                                        </li>
                                    </ul>
                                </div>`;
        });
    }
  });
}
