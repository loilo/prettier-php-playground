if('serviceWorker' in navigator) {window.addEventListener('load', () => {navigator.serviceWorker.register('/prettier-php-playground/sw.js', { scope: '/prettier-php-playground/' })})}