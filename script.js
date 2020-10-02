$(function () {
  setTimeout(function () {
    $(".fly-in-text1L").removeClass("hidden")
  }, 500)
  setTimeout(function () {
    $(".fly-in-text2R").removeClass("hidden")
  }, 500)
})

$(window).load(function () {
  setTimeout(function () {
    $(".fly-in-text1L"), "fadeOut"
  }, 1000)
  setTimeout(function () {
    $(".fly-in-text2R"), "fadeOut"
  }, 1000)
})

const slideshowImages = document.querySelectorAll(".cycle .slideshow-img")
const nextImageDelay = 3000
let currentImageCounter = 0
slideshowImages[currentImageCounter].style.opacity = 1
setInterval(nextImage, nextImageDelay)

function nextImage() {
  slideshowImages[currentImageCounter].style.zIndex = -2
  const tempCounter = currentImageCounter
  setTimeout(() => {
    slideshowImages[tempCounter].style.opacity = 0
  }, 1000)

  currentImageCounter = (currentImageCounter + 1) % slideshowImages.length
  slideshowImages[currentImageCounter].style.opacity = 0.4
  slideshowImages[currentImageCounter].style.zIndex = -1
}

var audio

// hide pause button
$("#pause").hide()

// initialize
initAudio($("#playlist li:first-child"))

function initAudio(element) {
  var song = element.attr("song")
  var title = element.text()
  var cover = element.attr("cover")
  var artist = element.attr("artist")

  // create audio object
  audio = new Audio("audio/" + song)

  if (!audio.currentTime) {
    $("#duration").html("0.00")
  }

  // insert audio info
  $(".artist").text(artist)
  $(".title").text(title)

  // insert cover
  $("img.cover").attr("src", "images/covers/" + cover)

  $("#playlist li").removeClass("active")
  element.addClass("active")
}
// Play Button
$("#play").click(function () {
  audio.play()
  $("#play").hide()
  $("#pause").show()
  $("#duration").fadeIn(400)
  showDuration()
})
// Pause Button
$("#pause").click(function () {
  audio.pause()
  $("#pause").hide()
  $("#play").show()
})
// Time Duration
function showDuration() {
  $(audio).bind("timeupdate", function () {
    // get hours and minutes
    var s = parseInt(audio.currentTime % 60)
    var m = parseInt(audio.currentTime / 60) % 60
    // add 0 if less than 10
    if (s < 10) {
      s = "0" + s
    }
    $("#duration").html(m + "." + s)
    var value = 0
    if (audio.currentTime > 0) {
      value = Math.floor((100 / audio.duration) * audio.currentTime)
    }
    $(".orange-juice").css("width", value + "%")
  })
}

// next button
$("#next").click(function () {
  audio.pause()
  var next = $("#playlist li.active").next()
  if (next.length == 0) {
    next = $("#playlist li:first-child")
  }
  initAudio(next)
  audio.play()
  showDuration()
})

// Prev Button
$("#prev").click(function () {
  audio.pause()
  var prev = $("#playlist li.active").prev()
  if (prev.length == 0) {
    prev = $("#playlist li:last-child")
  }
  initAudio(prev)
  audio.play()
  showDuration()
})
