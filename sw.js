// Evento de instalación: Forzamos a que el SW se active de inmediato
self.addEventListener('install', (e) => {
  console.log('PWA: Service Worker Instalado');
  self.skipWaiting(); // <--- Crucial para que GitHub Pages se actualice al instante
});

// Evento de activación: Toma el control de la app sin esperar a reiniciar el navegador
self.addEventListener('activate', (e) => {
  console.log('PWA: Service Worker Activado');
  e.waitUntil(clients.claim()); // Reclama el control de las pestañas abiertas
});

self.addEventListener('fetch', (e) => {
  // Por ahora dejamos pasar las peticiones de red normales directas a internet
  // Esto evita que bloquee tu fetch() de la IP
  e.respondWith(fetch(e.request)); 
});
