# Mercedes AMG Petronas · 300 × 600

Abrir `index.html` directamente en el navegador o servir esta carpeta con `python -m http.server 8000`.

Banner HTML/CSS/JavaScript sin dependencias. Arrastrar el auto o usar flechas del teclado. Botones ↑ y ↓ muestran las fotografías superior e inferior. El giro inicial dura dos vueltas (10,4 segundos) y se detiene al interactuar, ocultar la pestaña o al finalizar; respeta movimiento reducido.

## Imágenes

Diez recortes entregados por el usuario, con ajustes globales uniformes de color: saturación +12% y curva tonal suave (negros más profundos y medios ligeramente elevados). No se utilizó regeneración de imágenes ni se alteraron geometría, textos, logos o máscaras. Dimensiones y canal alfa idénticos a cada recorte original. `image-checks.json` documenta la comprobación. `color-comparison.jpg` muestra un antes/después.

## Enlaces y hosting

`clickTag` está declarado en `index.html` con el destino de la colección. El botón SOLICITAR lee ese valor al hacer clic. La superficie del giro no abre enlaces.

Para alojar las imágenes externamente: cambiar `assetBase` en `script.js` para las diez vistas, los atributos `src` de `index.html` para logos/cocardas y la URL de fondo en `style.css`. Usar HTTPS. Mantener los nombres `car-00.png` a `car-09.png`.

## Entrega a Google Ad Manager

Incluye `ad.size` 300×600 y `clickTag`. Comprimir solamente `index.html`, `style.css`, `script.js` y `assets/` con index.html en la raíz. No incluir README, comparativa ni archivos de verificación. El ZIP local conserva todas las imágenes; su peso debe cotejarse con el límite específico del soporte antes de cargarlo. No se cargó ni validó en una cuenta de Ad Manager. Si se usan imágenes alojadas externamente, tráfico debe confirmar que ese formato de creatividad y sus políticas admiten esas solicitudes.

## Verificación

Sintaxis JavaScript revisada. Giro con cursor y vista superior comprobados en navegador. Diez imágenes con alfa intacto. Pendiente validación de carga y seguimiento de clic en el Ad Manager de destino.
