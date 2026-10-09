# Banners — Inmuebles El País

Primera propuesta: **1254 × 90 px**, HTML5 sin dependencias.

Abrir `index.html` desde un servidor local para revisar la pieza y repetir su animación:

```sh
python -m http.server 8000
```

Visitar http://localhost:8000. La pieza está en `banners/1254x90/` con HTML, CSS, JavaScript y el SVG oficial descargado del sitio.

## Comportamiento

Logo de entrada, aparición del titular y subtítulo, y buscador visible al finalizar (4 segundos). Una sola reproducción; al enfocar el campo se detiene la animación. Respeta la preferencia de movimiento reducido. El tamaño es fijo; la página de revisión permite desplazarse horizontalmente.

## Pendiente antes de publicar

- Confirmar con el equipo web el mecanismo autorizado para enviar una frase y comenzar una búsqueda conversacional. No hay una URL de consulta verificada.
- El botón provisional abre https://inmuebles.elpais.com.uy/ y trata de copiar la frase para pegarla en el sitio. **No ejecuta la búsqueda automáticamente.** El texto de la consulta no se envía a ninguna API.
- Confirmar plataforma publicitaria, límite de peso, duración, clickTag y permisos del iframe. El prototipo requiere ventanas emergentes para abrir el sitio y permisos de portapapeles para copiar (HTTPS o localhost).
- Revisar logo, textos y tamaños antes de la entrega final.

No incluye voz ni carga de imágenes. No se publica automáticamente en un servicio de hosting.
