var slider = document.querySelector(".slider-slides"), slide = document.querySelectorAll(".slide-parent"), prev = document.querySelector(".prev"), next = document.querySelector(".next"), i = 0, radio = document.querySelectorAll(".radios input"), end = 2, timeout = null;

//This code is pretty ugly and you will probably dont know what i did but i will soon remake it so stay tuned :D

//i is the current slide index

//timeout is for touchscreen

//Because you dont want radio buttons for the last slides / dont want it to continue scrolling even tho its at the end i use the variable end. This is also how many slides are currently shown but variables and stuff will be changed

window.addEventListener("load", () => {
  radio[i].checked = true;
});

if (window.innerWidth <= 1200) {
  end = 1;
}

//---------------------------------------------------For touchscreens---------------------------------------------------

slider.addEventListener("scroll", () => {
  // i dont want to snap it to the current slide while you are scrolling so it only scroll to the current slide if the scroll event wasn't triggered for 100ms and when the user stopped touching the screen because it would snap to the slide while the user is touching the screen otherwise
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
  //I scroll to the card by checking the distance from the left top corner of the slide to the side of the entire slider and then add one to i so it looks at the distance of the next slide
  if (i == 0) {
    i = (slide.length - end);
  } else {
    i--;
  }
  radio[i].checked = true;
  //getBoundingClientRect is viewport based so i have to subtract the distance from the slider to the left side
  scroll = slide[i].getBoundingClientRect().left - slider.getBoundingClientRect().left;
  slider.scrollBy({
    left: scroll,
    top: 0,
    behavior: "smooth"
  });
});

//-----------------------------------------------------Next button------------------------------------------------------

next.addEventListener("click", () => {
  if (i == slide.length - end) {
    i = 0;
  } else {
    i++;
  }
  radio[i].checked = true;
  scroll = (slide[i].getBoundingClientRect().left - slider.getBoundingClientRect().left);
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
