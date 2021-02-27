
//REGISTER AND INSTALL A SERVICE WORKER (PWA)

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/serviceworker.js')
        .then(function (registration) {
            console.log('Registration successful, scope is:', registration.scope);
        })
        .catch(function (error) {
            console.log('Service worker registration failed, error:', error);
        });
}

// EXECUTE SCROLL FUNCTION ON USER SCROLL
window.onscroll = function() {
	scrollFunction();
};

// GET HEADER
var header = document.getElementById("header");

// GET NAVBAR OFFSET POSITION
var sticky = header.offsetTop;

// Add the sticky class to the header when you reach its scroll position. Remove "sticky" when you leave the scroll position
function scrollFunction() {
  if (window.pageYOffset > sticky) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }
}