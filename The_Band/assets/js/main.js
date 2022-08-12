const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const header = $(".header");
const Slider__item = $$(".Slider__item");
const Buys = $$(".tour__infor button");
const close = $(".table__head button");
const close2 = $(".footer2 button");
const table = $(".ticket__modal");
const bar = $(".header__item:last-child");
function show(e) {
    table.style.display = "block";
}
console.log(header);
function hide(e) {
    table.style.display = "none";
}
Buys.forEach((Buy) => {
    Buy.addEventListener("click", show);
});
close2.addEventListener("click", hide);
close.addEventListener("click", hide);
table.addEventListener("click", hide);
bar.onclick = () => {
    header.classList.toggle("height");
};
let i = 0;
carowsel();
function carowsel() {
    if (i > Slider__item.length - 1) {
        i = 0;
    }
    $(".Slider__item.active").classList.remove("active");
    Slider__item[i].classList.add("active");
    i++;
    setTimeout(carowsel, 3000);
}
