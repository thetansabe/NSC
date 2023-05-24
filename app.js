const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    console.log(entry);

    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
    // else{
    //     entry.target.classList.remove('show');
    // }
  });
});

const hiddenElements = document.querySelectorAll(".hidden");
hiddenElements.forEach((el) => observer.observe(el));

//COUNT DOWN
const dayDom = document.getElementById("day");
const hourDom = document.getElementById("hour");
const minDom = document.getElementById("min");
const secDom = document.getElementById("sec");

const targetDate = new Date("August 5, 2023").getTime();

const counter = setInterval(() => {
  const now = new Date().getTime();

  var distance = targetDate - now;

  if (distance <= 0 || distance === undefined) {
    clearInterval(counter);
    dayDom.innerText = "0";
    hourDom.innerText = "0";
    minDom.innerText = "0";
    secDom.innerText = "0";

    return;
  }

  // Time calculations for days, hours, minutes and seconds
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  dayDom.innerText = days;
  hourDom.innerText = hours;
  minDom.innerText = minutes;
  secDom.innerText = seconds;
}, 1000);

//DANH SACH TEN TRUONG
const schoolNames = [
    'ĐH Tôn Đức Thắng',
    'HV Ngân hàng',
    'ĐH Kinh tế quốc dân',
    'ĐH Ngoại thương',
    'ĐH Kinh tế tài chính HCM',
    'ĐH Bách Khoa',
    'ĐH Sư phạm kỹ thuật',
    'ĐH Sài Gòn'
]
const holder = document.getElementById("form_school_list");

document.getElementById("form_school")
    .addEventListener("input", debounce(searchSchool,1000))

function searchSchool(e){
    const val = e.target.value;

    const founds = schoolNames.filter(name => 
        name.toLowerCase().includes(val.toLowerCase()));
    
    renderSchoolList(founds);
}

function renderSchoolList(founds){
    holder.innerHTML = ""
    founds.forEach(name => {
        holder.innerHTML += `<div onclick="schoolSelected(this)">${name.toUpperCase()}</div>`
    })
}

function schoolSelected(div){
    document.getElementById("form_school").value = div.innerText;
    holder.innerHTML = ""
}
//real debounce
function debounce(fn, sleep){
    let timer = null

    return function(...args){
        if(timer) {
            clearTimeout(timer)
            timer = null
        }

        timer = setTimeout(() => {
            fn.apply(this, args)
            timer = null
        }, sleep)
    }
}
