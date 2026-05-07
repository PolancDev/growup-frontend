// Script para desregistrar Service Workers y limpiar caché
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then(function(registrations) {
    for(let registration of registrations) {
      registration.unregister();
      console.log('Service Worker desregistrado');
    }
  });
}

// Limpiar caché
caches.keys().then(function(names) {
  for (let name of names) {
    caches.delete(name);
    console.log('Caché eliminado:', name);
  }
});

console.log('Limpieza completada. Recarga la página con Ctrl+F5');
