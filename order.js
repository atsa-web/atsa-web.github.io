const $ = id => document.getElementById(id);
const $count = $('count');
const $form = $('form');

$('sand').addEventListener('click', () => {
  $('form').dataset.color = 'sand';
  $('one').classList.remove('active');
  $('two').classList.add('active');
});

$('chocolate').addEventListener('click', () => {
  $('form').dataset.color = 'chocolate';
  $('one').classList.remove('active');
  $('two').classList.add('active');
});

// Screen two

document.querySelectorAll('ul li').forEach(elem => {
  elem.addEventListener('click', e => {
    document.querySelectorAll('ul li').forEach(li => li.classList.remove('selected'));
    e.target.classList.add('selected');
  });
});

$('less').addEventListener('click', e => {
  e.preventDefault();
  if (parseInt($count.innerText) > 1)
    $count.innerText = (parseInt($count.innerText) - 1).toString();
});

$('more').addEventListener('click', e => {
  e.preventDefault();
  $count.innerText = (parseInt($count.innerText) + 1).toString();
});

$('back').addEventListener('click', e => {
  e.preventDefault();
  $('two').classList.remove('active');
  $('one').classList.add('active');
});

$('proceed').addEventListener('click', e => {
  e.preventDefault();
  $('two').classList.remove('active');
  $('three').classList.add('active');
});

// Screen three

$('back2').addEventListener('click', e => {
  e.preventDefault();
  $('three').classList.remove('active');
  $('two').classList.add('active');
});

$('proceed2').addEventListener('click', e => {
  e.preventDefault();
  $('three').classList.remove('active');
  $('four').classList.add('active');
});

// Screen four

$('back3').addEventListener('click', e => {
  e.preventDefault();
  $('three').classList.add('active');
  $('four').classList.remove('active');
});

$('noShipping').addEventListener('click', e => {
  e.preventDefault();
  $('shipping').classList.add('hide');
  $('four').classList.remove('active');
  $('five').classList.add('active');
});

$('yesShipping').addEventListener('click', e => {
  e.preventDefault();
  if ($('address1').value.trim().length === 0) {
    alert('Please enter a shipping address!');
    return;
  }
  $('shipping').classList.remove('hide');
  $('four').classList.remove('active');
  $('five').classList.add('active');
});

// Screen five

$('back4').addEventListener('click', e => {
  e.preventDefault();
  $('four').classList.add('active');
  $('five').classList.remove('active');
});

$('order').addEventListener('click', e => {
  e.preventDefault();
  const scriptURL = 'https://script.google.com/macros/s/AKfycbxnlcVuSxtIijViM9KyjuHdXCQ8vcG8OW1fivF_aXyKPiGkCccbiMfxfc58KraPP5aZ/exec';
  let requestBody = new FormData($form);
  requestBody.set('color', $form.dataset.color);
  requestBody.set('size', document.querySelector('#size .selected').innerText);
  requestBody.set('number', $('count').innerText);
  console.log(requestBody)
  fetch(scriptURL, { method: 'POST', body: requestBody})
    .then(response => {
      console.log('Success!', response);
    })
    .catch(error => {
      console.log('Error!', error.message);
    });
});
