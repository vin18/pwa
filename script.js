if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/sw.js')
    .then(function (registration) {
      console.log('Service Worker registered with scope:', registration.scope);
    })
    .catch(function (error) {
      console.error('Service Worker registration failed:', error);
    });
}

// function scheduleNotification(delay) {
//   Notification.requestPermission().then((result) => {
//     if (result === 'granted') {
//       navigator.serviceWorker.ready.then((registration) => {
//         registration.showNotification('Vibration Sample', {
//           body: 'Buzz! Buzz!',
//           // icon: '../images/touch/chrome-touch-icon-192x192.png',
//           vibrate: [200, 100, 200, 100, 200, 100, 200],
//           tag: 'vibration-sample',
//         });
//       });
//     }
//   });
// }

function scheduleNotification(delay) {
  const notificationData = {
    title: 'Reminder',
    body: 'This is your scheduled notification!',
    url: 'http://127.0.0.1:5501/index.html',
  };

  navigator.serviceWorker.ready.then((registration) => {
    registration.active.postMessage({
      action: 'scheduleNotification',
      delay: delay, // Delay in milliseconds (e.g., 5000 for 5 seconds)
      notificationData: notificationData,
    });
  });

  // if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
  //   // Post a message to the service worker with the delay and notification data
  //   navigator.serviceWorker.active.postMessage({
  //     action: 'scheduleNotification',
  //     delay: delay, // Delay in milliseconds (e.g., 5000 for 5 seconds)
  //     notificationData: notificationData,
  //   });
  // }
}

// Example: Schedule a notification after 10 seconds
scheduleNotification(3000); // 10,000 milliseconds = 10 seconds
