# Mercedes AMG Petronas · 300 × 600

Abrir `index.html` directamente en el navegador o servir esta carpeta con `python -m http.server 8000`.

Banner HTML/CSS/JavaScript sin dependencias. Arrastrar el auto o usar flechas del teclado. Una indicación animada invita a arrastrar; los botones laterales ARRIBA y ABAJO muestran las fotografías superior e inferior. Pulsar el mismo botón de nuevo o la indicación de giro vuelve a las vistas alrededor. No hay paginado. El giro inicial dura dos vueltas (10,4 segundos) y se detiene al interactuar, ocultar la pestaña o al finalizar; respeta movimiento reducido.

## Imágenes

Diez recortes entregados por el usuario, con ajustes globales uniformes de color: saturación +12% y curva tonal suave (negros más profundos y medios ligeramente elevados). No se utilizó regeneración de imágenes ni se alteraron geometría, textos, logos o máscaras. Dimensiones y canal alfa idénticos a cada recorte original. `image-checks.json` documenta la comprobación. `color-comparison.jpg` muestra un antes/después.

## Enlaces y hosting

`clickTag` está declarado en `index.html` con el destino de la colección. El botón SOLICITAR lee ese valor al hacer clic. La superficie del giro no abre enlaces.

Para alojar las imágenes externamente: cambiar `assetBase` en `script.js` para las diez vistas, los atributos `src` de `index.html` para logos/cocardas y la URL de fondo en `style.css`. Usar HTTPS. Mantener los nombres `car-00.png` a `car-09.png`.

## Entrega a Google Ad Manager

Incluye `ad.size` 300×600 y `clickTag`. Comprimir solamente `index.html`, `style.css`, `script.js` y `assets/` con index.html en la raíz. No incluir README, comparativa ni archivos de verificación. El ZIP local conserva todas las imágenes; su peso debe cotejarse con el límite específico del soporte antes de cargarlo. No se cargó ni validó en una cuenta de Ad Manager. Si se usan imágenes alojadas externamente, tráfico debe confirmar que ese formato de creatividad y sus políticas admiten esas solicitudes.

## Verificación

Sintaxis JavaScript revisada. Giro con cursor y vista superior comprobados en navegador. Diez imágenes con alfa intacto. Pendiente validación de carga y seguimiento de clic en el Ad Manager de destino.


## Recursos alojados (29/10/2026)

Esta versión carga todas las imágenes desde https://servicios.elpais.com.uy/coleccionables/mercedes-300x600_/assets/ mediante HTTPS. El ZIP ahora contiene solamente index.html, style.css y script.js; requiere conexión al servidor. Se conservan los recursos en assets/ del repositorio como respaldo, pero no se incluyen en el ZIP. El diseño, animaciones y clickTag se mantienen. La carga final debe validarse en Ad Manager.


## Entrega consolidada

El index.html de entrega incorpora todos sus estilos y JavaScript. El ZIP contiene únicamente ese HTML; las imágenes se siguen cargando desde el servidor de El País. No necesita los archivos style.css y script.js externos, que quedan como fuentes de referencia. Esto evita mezclar los estilos de otros formatos al extraer o subir varios banners.
