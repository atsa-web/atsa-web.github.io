const $ = id => document.getElementById(id);

const LILY = .25;
const SURROUNDING_TEXT = .5;
const INTERESTED = 1.5;

function getIntroOpacity() {
  return Math.max(0, 1 - window.scrollY / window.innerHeight);
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
const introBg = $("introBg");
const $bg = $("bg");
const $text = $("text");
const $lily = $("lily");
const $est2022 = $("est2022");
const $interested = $("interested");
$intro.style.opacity = getIntroOpacity().toString();
$scroll.style.opacity = getIntroOpacity().toString();
introBg.style.opacity = getIntroOpacity().toString();
$bg.style.opacity = getOpacity(LILY).toString();
$text.style.opacity = getOpacity(SURROUNDING_TEXT).toString();
$lily.style.opacity = getOpacity(LILY).toString();
$est2022.style.opacity = getOpacity(SURROUNDING_TEXT).toString();
$interested.style.opacity = ((window.scrollY < window.innerHeight * INTERESTED) ? 0 : 1).toString();

window.addEventListener("scroll", () => {
  $intro.style.opacity = getIntroOpacity().toString();
  $scroll.style.opacity = getIntroOpacity().toString();
  introBg.style.opacity = getIntroOpacity().toString();
  $bg.style.opacity = getOpacity(LILY).toString();
  $text.style.opacity = getOpacity(SURROUNDING_TEXT).toString();
  $text.style.transform = `translate(-50%, -${getAgaramPosition()}vh)`;
  $lily.style.opacity = getOpacity(LILY).toString();
  $est2022.style.opacity = getOpacity(SURROUNDING_TEXT).toString();
  $est2022.style.transform = `translate(-50%, ${getEstPosition()}vh)`;
  $interested.style.opacity = ((window.scrollY < window.innerHeight * INTERESTED) ? 0 : 1).toString();
});

$interested.addEventListener("click", () => {
  $("one").classList.remove("active");
  $("two").classList.add("active");
  introBg.style.display = "none";
});

// Screen two

const $count = $('count');

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
  $("two").classList.remove("active");
  $("one").classList.add("active");
  introBg.style.display = "block";
});

$("proceed").addEventListener("click", e => {
  e.preventDefault();
  $("two").classList.remove("active");
  $("three").classList.add("active");
});
