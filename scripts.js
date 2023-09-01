const $ = document.getElementById;

setInterval(() => {
  document.querySelectorAll('.carousel').forEach(carousel => {
    let current = parseInt(carousel.dataset.active);
    if (current + 1 === carousel.children.length)
      carousel.dataset.active = "0";
    else
      carousel.dataset.active = (current + 1).toString();
    carousel.querySelectorAll('img').forEach(item => item.classList.add('hide'));
    carousel.children.item(parseInt(carousel.dataset.active)).classList.remove('hide');
  });
}, 4000);
