# Banners — Inmuebles El País

Propuesta HTML5 de **1254 × 90 px**, sin dependencias.

## Vista previa

```sh
python -m http.server 8000
```

Abrir http://localhost:8000. `index.html` permite repetir la animación. La pieza está en `banners/1254x90/`.

## Diseño

Fondo claro con degradado beige cálido, naranja en palabras del titular, Gallito en el subtítulo y botón de búsqueda. Campo blanco redondeado, inspirado en la referencia del sitio. Se conserva el logo oficial multicolor.

## Comportamiento final

El logo entra, aparecen titular y subtítulo, y se muestra el buscador. El campo escribe, mantiene y borra tres consultas de ejemplo en secuencia. Tiene cursor de texto; al hacer clic abre **https://inmuebles.elpais.com.uy/** en una nueva pestaña. El botón Buscar tiene el mismo destino. Se puede activar con teclado.

Es una demostración animada: no admite escritura dentro del banner ni envía los ejemplos como búsquedas. La consulta real se escribe en el sitio de destino. No hay selector de operación ni integración de API, cookies o portapapeles.

Respeta movimiento reducido con una frase estática y pausa al ocultar la pestaña. La introducción dura unos 4 segundos; la escritura se repite mientras la página está visible.

## Google Ad Manager

`index.html` del banner declara `var clickTag = "https://inmuebles.elpais.com.uy/";` y `ad.size` de 1254×90. Ambos enlaces usan ese destino configurable. Para el ZIP, comprimir **el contenido** de `banners/1254x90/` (index.html en la raíz, style.css, script.js y assets/logo.svg). No incluir la página de revisión de la raíz del repositorio.

Tráfico debe validar la creatividad en GAM, destino/seguimiento de clics, ventanas nuevas y duración permitida para la animación repetida. Pendiente la revisión visual en navegador y la validación del ZIP en GAM. No se publica automáticamente en hosting.
