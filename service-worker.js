// O service worker guarda somente os arquivos estáticos da demonstração.
// Nenhum dado de cliente, conta ou venda real é armazenado aqui.
const CACHE_NAME = "bellatrix-static-v2";
const APP_FILES = [
  "./",
  "./index.html",
  "./style.css",
  "./script.js",
  "./manifest.webmanifest",
  "./icons/bellatrix-192.png",
  "./icons/bellatrix-512.png",
  "./assets/pet-apaixonado-sem-fundo.svg",
  "./assets/pet-bravo-sem-fundo.svg",
  "./assets/pet-dormindo-sem-fundo.svg",
  "./assets/pet-happy-sem-fundo.svg",
  "./assets/pet-neutral-sem-fundo.svg",
  "./assets/pet-pensativo-sem-fundo.svg",
  "./assets/pet-rindo-sem-fundo.svg",
  "./assets/pet-surprised-sem-fundo.svg",
  "./assets/pet-triste-sem-fundo.svg",
  "./assets/pet-winking-sem-fundo.svg"
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_FILES)));
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(
      keys.filter((key) => key.startsWith("bellatrix-static-") && key !== CACHE_NAME)
        .map((key) => caches.delete(key))
    ))
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  const requestUrl = new URL(event.request.url);
  if (requestUrl.origin !== self.location.origin) return;

  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request).then((response) => {
      if (response.ok && response.type === "basic") {
        const copy = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
      }
      return response;
    }))
  );
});
