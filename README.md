# Banner HTML 300x600 - Penca Ovación

Banner estático e interactivo inspirado en la landing de Penca Ovación para promocionar una penca del Mundial 2026 con un carrusel extensible de coleccionables.

## Archivos

- `index.html`: estructura del anuncio de 300x600 con el módulo de carrusel.
- `styles.css`: dirección visual, layout fijo, animaciones y estados accesibles del carrusel.
- `script.js`: datos de coleccionables, render dinámico, navegación e indicadores.

## Coleccionables

Para sumar nuevos coleccionables en los próximos meses, agregá un objeto al arreglo `collectibles` en `script.js`. El carrusel actualiza automáticamente las tarjetas, el contador y los indicadores.

## Uso

Abrí `index.html` en un navegador o servilo con un servidor estático:

```bash
python3 -m http.server 8000
```

Luego visitá `http://localhost:8000`.
