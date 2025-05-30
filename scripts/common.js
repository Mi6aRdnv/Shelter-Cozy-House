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
