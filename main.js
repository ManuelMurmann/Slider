var slider = document.querySelector(".slider-slides"),
    slide = document.querySelectorAll(".slide-parent"),
    prev = document.querySelector(".prev"),
    next = document.querySelector(".next"),
    radios = document.querySelector(".radios"),
    i = 0, //defines at what slide you want start, counting from 0
    slidesShown = 2, //how many should be shown at a time
    slidesToScroll = 2; //how many should be scrolled at a time
    //touchscreens
    timeout = null,
    touchend = true,
    count = 1; //for radio button creation

//----------------------------------------------------Setup-------------------------------------------------------------

window.addEventListener("load", () => {
  radio[i].checked = true;
  scroll = slide[i].getBoundingClientRect().left - slider.getBoundingClientRect().left;
  slider.scrollBy({left: scroll, top: 0});
});

//breakpoints have to be created manually

if (window.innerWidth <= 1200) {
  slidesShown = 1;
  slidesToScroll = 1;
}

slider.style.gridTemplateColumns = `repeat(${slide.length}, calc(100% / ${slidesShown}))`

while (count <= slide.length - slidesShown + 1 || count <= slide.length / slidesToScroll) {
  var radioInput = document.createElement('input');
  radioInput.setAttribute('type', 'radio')
  radioInput.setAttribute('name', 'radio')
  radios.appendChild(radioInput)
  count++
}

var radio = document.querySelectorAll(".radios input")


//---------------------------------------------------For touchscreens---------------------------------------------------

slider.addEventListener("scroll", () => {
  // snaps to current slide after not scrolling for 100ms and if the user is not touching the screen
  doScroll = true
  if (timeout !== null) {
    clearTimeout(timeout)
  }
  timeout = setTimeout(() => {
    doScroll = false;
    if (touchend == true) {
      scroll = slide[i].getBoundingClientRect().left - slider.getBoundingClientRect().left;
      slider.scrollBy({
        left: scroll,
        top: 0,
        behavior: "smooth"
      });
    }
  }, 100)
})

slider.addEventListener("touchend", () => {
  touchend = true
  if (!doScroll) {
    setTimeout(() => {
      scroll = slide[i].getBoundingClientRect().left - slider.getBoundingClientRect().left;
      slider.scrollBy({
        left: scroll,
        top: 0,
        behavior: "smooth"
      });
    }, 100)
  }
})

slider.addEventListener("touchstart", () => {
  touchend = false
})

slider.addEventListener("touchmove", () => {
  setInterval(() => {
    slide.forEach((item, index) => {
      scroll2 = Math.round(item.getBoundingClientRect().left - slider.getBoundingClientRect().left);
      if (scroll2 <= item.getBoundingClientRect().width / 2) {
        i = index;
        radio[i].checked = true;
      }
    })
  }, 100)
})

//---------------------------------------------------Previous button----------------------------------------------------

prev.addEventListener("click", () => {
  if (i == 0) {
    i = slide.length - slidesShown;
  } else if (i - slidesToScroll < 0) {
    i = 0;
    radio[i].checked = true;
    scroll = slide[i].getBoundingClientRect().left - slider.getBoundingClientRect().left;
    slider.scrollBy({
      left: scroll,
      top: 0,
      behavior: "smooth"
    });
  } else {
    i -= slidesToScroll;
  }
  radio[i].checked = true;
  scroll = slide[i].getBoundingClientRect().left - slider.getBoundingClientRect().left;
  slider.scrollBy({
    left: scroll,
    top: 0,
    behavior: "smooth"
  });
});

//-----------------------------------------------------Next button------------------------------------------------------

next.addEventListener("click", () => {
  if (i == slide.length - slidesShown) {
    i = 0;
  } else if (i + slidesToScroll > slide.length - slidesShown) {
    i = slide.length - slidesShown;
    radio[i - 1].checked = true;
    scroll = slide[i].getBoundingClientRect().left - slider.getBoundingClientRect().left;
    slider.scrollBy({
      left: scroll,
      top: 0,
      behavior: "smooth"
    });
  } else {
    i += slidesToScroll;
  }
  radio[i].checked = true;
  scroll = slide[i].getBoundingClientRect().left - slider.getBoundingClientRect().left;
  slider.scrollBy({
    left: scroll,
    top: 0,
    behavior: "smooth"
  });
});

//----------------------------------------------------Radio buttons-----------------------------------------------------

radio.forEach((item, index) => {
  radio[index].addEventListener("click", () => {
    i = index;
    scroll = slide[i].getBoundingClientRect().left - slider.getBoundingClientRect().left;
    slider.scrollBy({
      left: scroll,
      top: 0,
      behavior: "smooth"
    });
  })
});
