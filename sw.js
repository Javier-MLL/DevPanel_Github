// Service Worker básico para cumplir los requisitos de instalación de la PWA
self.addEventListener('install', (e) => {
  console.log('PWA: Service Worker Instalado');
});

self.addEventListener('fetch', (e) => {
  // Aquí se controlan las peticiones sin conexión en PWAs avanzadas
});
