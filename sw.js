// Listening for messages from the main app
self.addEventListener('message', (event) => {
  const { action, delay, notificationData } = event.data;

  if (action === 'scheduleNotification') {
    // Set a timeout to show a notification after the specified delay
    setInterval(() => {
      self.registration.showNotification(notificationData.title, {
        body: notificationData.body,
        icon: notificationData.icon || '/icon.png',
        badge: notificationData.badge || '/badge.png',
        data: notificationData.url,
      });
    }, delay);
  }
});

// Handle notification click
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  const url = event.notification.data;
  event.waitUntil(clients.openWindow(url));
});
