
//REGISTER AND INSTALL A SERVICE WORKER (PWA)

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('serviceworker.js')
        .then(function (registration) {
            console.log('Registration successful, scope is:', registration.scope);
        })
        .catch(function (error) {
            console.log('Service worker registration failed, error:', error);
        });
}
