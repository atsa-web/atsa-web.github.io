const $ = id => document.getElementById(id);

const LILY = .25;
const SURROUNDING_TEXT = .5;
const INTERESTED = 1.5;

function getIntroOpacity() {
  return Math.max(0, 1 - window.scrollY / window.innerHeight * 2);
}

function getOpacity(start) {
  start *= window.innerHeight;
  const maxesAt = window.innerHeight / 1.5;
  if (window.scrollY > start)
    return Math.max(0, Math.min(maxesAt, window.scrollY - start) / maxesAt);
  else
    return 0;
}

function getAgaramPosition() {
  const start = window.innerHeight * SURROUNDING_TEXT; // When to start the animation
  const top = 10; // Where to start the animation in vh
  if (window.scrollY > start)
    return top - (window.scrollY - start) * top / window.innerHeight;
  else
    return top;
}

function getEstPosition() {
  const start = window.innerHeight * SURROUNDING_TEXT; // When to start the animation
  const top = 5; // Where to start the animation in vh
  if (window.scrollY > start)
    return Math.max(0, top - (window.scrollY - start) * top / window.innerHeight);
  else
    return -top;
}

const $intro = $("intro");
const $scroll = $("scroll");
const $text = $("text");
const $lily = $("lily");
const $est2022 = $("est2022");
const $interested = $("interested");
$intro.style.opacity = getIntroOpacity().toString();
$scroll.style.opacity = getIntroOpacity().toString();
$text.style.opacity = getOpacity(SURROUNDING_TEXT).toString();
$lily.style.opacity = getOpacity(LILY).toString();
$est2022.style.opacity = getOpacity(SURROUNDING_TEXT).toString();
$interested.style.opacity = ((window.scrollY < window.innerHeight * INTERESTED) ? 0 : 1).toString();

window.addEventListener("scroll", () => {
  $intro.style.opacity = getIntroOpacity().toString();
  $scroll.style.opacity = getIntroOpacity().toString();
  $text.style.opacity = getOpacity(SURROUNDING_TEXT).toString();
  $text.style.transform = `translate(-50%, -${getAgaramPosition()}vh)`;
  $lily.style.opacity = getOpacity(LILY).toString();
  $est2022.style.opacity = getOpacity(SURROUNDING_TEXT).toString();
  $est2022.style.transform = `translate(-50%, ${getEstPosition()}vh)`;
  $interested.style.opacity = ((window.scrollY < window.innerHeight * INTERESTED) ? 0 : 1).toString();
});

const $one = $("one");
const $two = $("two");
const $three = $("three");

$interested.addEventListener("click", () => {
  $one.classList.remove("active");
  $two.classList.add("active");
});

// Screen two

const $count = $("count");

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

$("back").addEventListener("click", e => {
  e.preventDefault();
  $two.classList.remove("active");
  $one.classList.add("active");
});

$("proceed").addEventListener("click", e => {
  e.preventDefault();
  $two.classList.remove("active");
  $three.classList.add("active");
});

// Screen three

$('back2').addEventListener('click', e => {
  e.preventDefault();
  $('three').classList.remove('active');
  $('two').classList.add('active');
});

const $submit = $("submit");
const $error = $("error");

$three.addEventListener("submit", e => {
  e.preventDefault();
  $submit.disabled = true;
  $submit.innerText = "Submitting...";

  $error.style.display = "block";
  $error.innerText = "Starting umami";

  if (typeof umami !== "undefined") umami.track('Placed order!', { name: $('name').value, email: $('email').value });

  $error.innerText = "Passed umami";

  const scriptURL = "https://script.google.com/macros/s/AKfycbwgarcin585RL5SeEE4f_sd8IxtfGA8aOnW9vkBX0KaCuimh5LBJ1NpAVKEljc4Qtth/exec";

  let requestBody = new FormData();
  requestBody.set("size", document.querySelector("#size .selected").innerText);
  requestBody.set("number", $("count").innerText);
  requestBody.set("name", $("name").value);
  $error.innerText = JSON.stringify(requestBody);
  console.log("Submitting", requestBody);

  fetch(scriptURL,
    {
      method: "POST",
      body: requestBody,
    })
    .then(response => {
      $submit.disabled = false;
      $submit.innerText = "Count me in!";
      // Hide any errors that were already displayed
      $error.style.display = "none";
      console.log("Success!", response);
      $three.classList.remove("active");
      $("confirmationPage").classList.add("active");
    })
    .catch(error => {
      if (typeof umami !== "undefined") umami.track("Error occurred", { error: error.message });
      $submit.disabled = false;
      $submit.innerText = "Count me in!";
      $error.innerText = "Error: " + error.message;
      $error.style.display = "block";
      console.log('Error!', error.message);
    });
});
