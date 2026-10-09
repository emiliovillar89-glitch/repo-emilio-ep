# Banners — Inmuebles El País

Primera propuesta: **1254 × 90 px**, HTML5 sin dependencias.

Abrir `index.html` desde un servidor local para revisar la pieza y repetir su animación:

```sh
python -m http.server 8000
```

Visitar http://localhost:8000. La pieza está en `banners/1254x90/` con HTML, CSS, JavaScript y el SVG oficial descargado del sitio.

## Comportamiento

Logo de entrada, aparición del titular y subtítulo, y buscador visible al finalizar (4 segundos). Una sola reproducción; al enfocar el campo se detiene la animación. Respeta la preferencia de movimiento reducido. El tamaño es fijo; la página de revisión permite desplazarse horizontalmente.

## Elección de operación

No hay desplegable. Al enviar la consulta se abre un diálogo con Compra, Alquiler y Temporal, conservando el texto. Las tres tarjetas se disponen horizontalmente para respetar los 90 px de altura. Se puede volver a editar con la cruz o Escape; el foco vuelve al campo. La llamada de búsqueda solo se inicia al elegir una operación.

## Conexión real preparada

Se inspeccionó el código público del sitio el 9/10/2026. El formulario envía `message`, `transactionType` (`sale`, `rental`, `temporary_rental`) y `userLanguage=es` como FormData a `POST /api/chat/init`, con `X-Brand: elpais`. Usa cookies de la sesión del navegador y nunca extrae tokens. Una respuesta exitosa devuelve `data.chatId`; se abre `/dashboard/{chatId}`. Si solicita operación, se utiliza `POST /api/chat/{chatId}/resolve-operation`.

**Requiere alojar la pieza bajo el origen exacto https://inmuebles.elpais.com.uy**, por ejemplo en una carpeta de recursos del sitio e incluirla mediante un iframe del mismo origen. Si hay sandbox debe conservar el origen y permitir scripts y ventanas emergentes. No funciona desde GitHub Pages, otro dominio ni iframes con origen opaco: la respuesta observada de la API no habilita CORS para un origen externo.

La consulta de prueba a la API existente devolvió HTTP 201 y 252 resultados. La prueba por la interfaz web devolvió 253 resultados para una frase similar, con dos dormitorios y garaje en Pocitos. No se modificó el servidor. Falta validar la pieza bajo su alojamiento final, los límites de búsquedas anónimas y el recorrido con sesión autenticada.

Se controlan consulta vacía, operación sin elegir, origen incompatible, ventanas bloqueadas, errores y demora. Cuando Gallito requiere preguntas adicionales (`needsFollowUp`), se avisa para continuar desde el sitio; ese recorrido todavía no está integrado al banner.

## Pendiente antes de publicar

- Ubicación final del banner y permisos de iframe. Si debe salir en elpais.com.uy u otro dominio, hace falta un puente autorizado en el servidor o habilitar el origen; no basta con este HTML estático.
- Validación visual y prueba end-to-end del banner alojado en el origen final.
- Plataforma publicitaria, peso, duración y clickTag.

No incluye voz ni carga de imágenes. No se publica automáticamente en hosting. La API inspeccionada es interna y puede cambiar: no hay un contrato público de integración.
