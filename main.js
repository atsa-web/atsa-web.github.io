const $ = id => document.getElementById(id);

const LILY = 2;
const SURROUNDING_TEXT = 3;
const INTERESTED = 5;

function getIntroOpacity() {
  return Math.max(0, 1 - window.scrollY / (window.innerHeight * 2));
}

function getOpacity(start) {
  start *= window.innerHeight;
  const maxesAt = start + window.innerHeight * 2;
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
const $iceage = $("iceage");
const $text = $("text");
const $lily = $("lily");
const $est2022 = $("est2022");
const $interested = $("interested");
$intro.style.opacity = getIntroOpacity().toString();
$scroll.style.opacity = getIntroOpacity().toString();
$iceage.style.opacity = getIntroOpacity().toString();
$text.style.opacity = getOpacity(SURROUNDING_TEXT).toString();
$lily.style.opacity = getOpacity(LILY).toString();
// $("bg").style.opacity = getOpacity(LILY).toString();
$est2022.style.opacity = getOpacity(SURROUNDING_TEXT).toString();
$interested.style.opacity = getOpacity(INTERESTED).toString();

window.addEventListener("scroll", () => {
  $intro.style.opacity = getIntroOpacity().toString();
  $scroll.style.opacity = getIntroOpacity().toString();
  $iceage.style.opacity = getIntroOpacity().toString();
  $text.style.opacity = getOpacity(SURROUNDING_TEXT).toString();
  $text.style.transform = `translate(-50%, -${getAgaramPosition()}vh)`;
  $lily.style.opacity = getOpacity(LILY).toString();
  // $("bg").style.opacity = getOpacity(LILY).toString();
  $est2022.style.opacity = getOpacity(SURROUNDING_TEXT).toString();
  $est2022.style.transform = `translate(-50%, ${getEstPosition()}vh)`;
  $interested.style.opacity = getOpacity(INTERESTED).toString();
});

$interested.addEventListener("click", () => {
  $("one").classList.remove("active");
  $("two").classList.add("active");
  $iceage.style.display = "none";
});

$("back").addEventListener("click", e => {
  e.preventDefault();
  $("two").classList.remove("active");
  $("one").classList.add("active");
  $iceage.style.display = "block";
});

$("proceed").addEventListener("click", e => {
  e.preventDefault();
  $("two").classList.remove("active");
  $("three").classList.add("active");
});
