import { initFederation } from '@angular-architects/native-federation';

console.log('--- SHELL BOOTSTRAP START ---');

// Los remotos se configuran en /assets/federation.manifest.json (se puede sobreescribir por entorno sin recompilar).
initFederation('/assets/federation.manifest.json')
  .then(() => console.log('✅ Federation initialized successfully'))
  .catch(err => {
    // Si falla, es probable que student no esté en marcha o devuelva HTML (404)
    console.warn('⚠️ Nota: Algunos remotos no cargaron (ignora esto si estás en desarrollo local):', err.message);
  })
  .finally(() => {
    console.log('🚀 Bootstrapping application...');
    import('./bootstrap');
  });
