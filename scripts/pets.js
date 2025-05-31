// PAGINATION
const PAGINATION_CONTAINER = document.querySelector('.pagination-container');
{
  const numberOfPageBtn = document.querySelector(
    '.pagination-nav__counter-btn'
  );
  const LEFT_BUTTON = document.querySelector('.left-btn');
  const RIGHT_BUTTON = document.querySelector('.right-btn');
  const FIRST_PAGE_BUTTON = document.querySelector('.first-page-btn');
  const LAST_PAGE_BUTTON = document.querySelector('.last-page-btn');

  // getting the pagination size and the necessary quantity of items
  let numberOfPage = 1;
  let quantityOfPages = 0;
  let quantityOfItems = 0;
  function getQuantity() {
    if (window.innerWidth < 655) {
      quantityOfPages = 16;
      quantityOfItems = 3;
    } else if (window.innerWidth > 655 && window.innerWidth < 965) {
      quantityOfPages = 8;
      quantityOfItems = 6;
    } else if (window.innerWidth > 965) {
      quantityOfPages = 6;
      quantityOfItems = 8;
    }
  }

  function getOrder() {
    function getRandomIndexOfArray(arr) {
      return Math.floor(Math.random() * arr.length);
    }
    let randomIndex;
    let order = [];
    let indexes;
    while (order.length < 48) {
      indexes = [0, 1, 2, 3, 4, 5, 6, 7];
      while (indexes.length !== 0) {
        randomIndex = getRandomIndexOfArray(indexes);
        order.push(indexes[randomIndex]);
        indexes.splice(randomIndex, 1);
      }
    }
    return order;
  }
  let order = getOrder();

  function createItems(data) {
    PAGINATION_CONTAINER.innerHTML = '';
    numberOfPageBtn.innerHTML = numberOfPage;
    let item;
    let temp;
    for (let i = 0; i < quantityOfItems; i++) {
      temp = quantityOfItems * (numberOfPage - 1);
      item = document.createElement('div');
      item.classList.add('card');
      item.innerHTML = `
            <div class="card__img-box"><img src="${data[order[i + temp]].img}" alt="image of ${data[order[i + temp]].breed}"></div>
            <h3 class="card__title">${data[order[i + temp]].name}</h3>
            <button class="card__btn" type="button">Learn more</button>`;
      item.dataset.index = order[i + temp];
      PAGINATION_CONTAINER.appendChild(item);
    }
  }

  fetch('../../data/pets.json')
    .then((result) => result.json())
    .then((data) => {
      getQuantity();
      createItems(data);
      LAST_PAGE_BUTTON.addEventListener('click', moveToLastPage);
      RIGHT_BUTTON.addEventListener('click', moveRight);

      window.addEventListener('resize', () => {
        let changes = false;
        if (window.innerWidth < 655 && quantityOfItems != 3) {
          quantityOfPages = 16;
          quantityOfItems = 3;
          changes = true;
        } else if (
          window.innerWidth > 655 &&
          window.innerWidth < 965 &&
          quantityOfItems != 6
        ) {
          quantityOfPages = 8;
          quantityOfItems = 6;
          changes = true;
        } else if (window.innerWidth > 965 && quantityOfItems != 8) {
          quantityOfPages = 6;
          quantityOfItems = 8;
          changes = true;
        }
        if (changes) {
          numberOfPage = 1;
          numberOfPageBtn.innerHTML = numberOfPage;
          createItems(data);
          RIGHT_BUTTON.classList.remove('--disable');
          RIGHT_BUTTON.addEventListener('click', moveRight);
          LEFT_BUTTON.classList.add('--disable');
          LEFT_BUTTON.removeEventListener('click', moveLeft);
          FIRST_PAGE_BUTTON.removeEventListener('click', moveToFirstPage);
          FIRST_PAGE_BUTTON.classList.add('--disable');
          LAST_PAGE_BUTTON.classList.remove('--disable');
          LAST_PAGE_BUTTON.addEventListener('click', moveToLastPage);
        }
      });
      function moveRight() {
        numberOfPage += 1;
        if (numberOfPage === quantityOfPages) {
          RIGHT_BUTTON.classList.add('--disable');
          RIGHT_BUTTON.removeEventListener('click', moveRight);
          LAST_PAGE_BUTTON.classList.add('--disable');
          LAST_PAGE_BUTTON.removeEventListener('click', moveToLastPage);
        } else if (numberOfPage === 2) {
          LEFT_BUTTON.classList.remove('--disable');
          LEFT_BUTTON.addEventListener('click', moveLeft);
        }
        FIRST_PAGE_BUTTON.classList.remove('--disable');
        FIRST_PAGE_BUTTON.addEventListener('click', moveToFirstPage);
        createItems(data);
      }
      function moveLeft() {
        numberOfPage -= 1;
        if (numberOfPage === 1) {
          LEFT_BUTTON.classList.add('--disable');
          LEFT_BUTTON.removeEventListener('click', moveLeft);
          FIRST_PAGE_BUTTON.removeEventListener('click', moveToFirstPage);
          FIRST_PAGE_BUTTON.classList.add('--disable');
        } else if (numberOfPage === quantityOfPages - 1) {
          RIGHT_BUTTON.classList.remove('--disable');
          RIGHT_BUTTON.addEventListener('click', moveRight);
        }
        LAST_PAGE_BUTTON.classList.remove('--disable');
        LAST_PAGE_BUTTON.addEventListener('click', moveToLastPage);
        createItems(data);
      }
      function moveToFirstPage() {
        numberOfPage = 1;
        LEFT_BUTTON.classList.add('--disable');
        LEFT_BUTTON.removeEventListener('click', moveLeft);
        RIGHT_BUTTON.classList.remove('--disable');
        RIGHT_BUTTON.addEventListener('click', moveRight);

        FIRST_PAGE_BUTTON.classList.add('--disable');
        LAST_PAGE_BUTTON.classList.remove('--disable');
        FIRST_PAGE_BUTTON.removeEventListener('click', moveToFirstPage);
        LAST_PAGE_BUTTON.addEventListener('click', moveToLastPage);
        createItems(data);
      }
      function moveToLastPage() {
        numberOfPage = quantityOfPages;
        LEFT_BUTTON.classList.remove('--disable');
        LEFT_BUTTON.addEventListener('click', moveLeft);
        RIGHT_BUTTON.classList.add('--disable');
        RIGHT_BUTTON.removeEventListener('click', moveRight);

        LAST_PAGE_BUTTON.classList.add('--disable');
        FIRST_PAGE_BUTTON.classList.remove('--disable');
        LAST_PAGE_BUTTON.removeEventListener('click', moveToLastPage);
        FIRST_PAGE_BUTTON.addEventListener('click', moveToFirstPage);
        createItems(data);
      }
      return data;
    });
}
