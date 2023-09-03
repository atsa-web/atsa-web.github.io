const $ = id => document.getElementById(id);
const $count = $('count');
const $form = $('form');
const $order = $('order');

$('sand').addEventListener('click', () => {
  umami.track('Clicked sand');
  $('form').dataset.color = 'sand';
  $('one').classList.remove('active');
  $('two').classList.add('active');
});

$('chocolate').addEventListener('click', () => {
  umami.track('Clicked chocolate');
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

$('three').addEventListener('submit', e => {
  e.preventDefault();
  umami.track('Filled personal details', { name: $('name').value, email: $('email').value });
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
  // CLear the address because they don't want shipping
  $('address1').value = "";
  $('address2').value = "";
  $('address3').value = "";
  $('shipping').classList.add('hide');
  $('four').classList.remove('active');
  $('five').classList.add('active');
});

$('four').addEventListener('submit', e => {
  e.preventDefault();
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

const toBase64 = file => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => resolve(reader.result);
  reader.onerror = reject;
});

$('five').addEventListener('submit', async e => {
  e.preventDefault();
  $order.disabled = true;
  $order.innerText = 'Placing...';
  umami.track('Placed order!', { name: $('name').value, email: $('email').value });
  const scriptURL = 'https://script.google.com/macros/s/AKfycbwTXw5-WZncPhSUEjgNJe65bCPbWNuwWPXY3yOm3kwxytnqZd7WVwbavCZxJJ_zP9qW/exec';
  let requestBody = new FormData();
  if (!$form.dataset.color) {
    alert('There is no sweatshirt color chosen! Please refresh the page and try again.');
    return;
  }
  requestBody.set('color', $form.dataset.color);
  requestBody.set('size', document.querySelector('#size .selected').innerText);
  requestBody.set('number', $('count').innerText);
  requestBody.set('name', $('name').value);
  requestBody.set('email', $('email').value);
  requestBody.set('phone', $('phone').value);
  requestBody.set('address1', $('address1').value);
  requestBody.set('address2', $('address2').value);
  requestBody.set('address3', $('address3').value);
  requestBody.set('confirmation', (await toBase64($('confirmation').files[0])).toString());
  console.log(requestBody);

  fetch(scriptURL,
    {
      method: 'POST',
      body: requestBody,
    })
    .then(response => {
      $order.disabled = false;
      $order.innerText = 'Place my order!';
      $('error').style.display = 'none';
      console.log('Success!', response);
      $('five').classList.remove('active');
      $('confirmationPage').classList.add('active');
    })
    .catch(error => {
      umami.track('Error occurred', { error: error.message });
      $order.disabled = false;
      $order.innerText = 'Place my order!';
      $('error').innerText = 'Error: ' + error.message;
      $('error').style.display = 'block';
      console.log('Error!', error.message);
    });
});
