# Insula · Web (ES / EN / PT / FR)

Sitio estático listo para GitHub + Vercel (plan gratis). No necesita instalar nada ni compilar.

## Qué hay en esta carpeta

| Archivo | Para qué |
|---|---|
| `index.html` | La landing en 4 idiomas |
| `config.js` | **El único archivo que vas a editar**: correo, agenda, links de Polar, dónde guardar leads |
| `gracias.html` | Página a la que Polar manda al cliente después de pagar |
| `privacidad.html`, `terminos.html`, `reembolsos.html` | Páginas legales (Polar y los clientes las piden). Plantillas: revísalas con un abogado |
| `404.html` | Página de error |
| `logo.svg`, `favicon.svg`, `apple-touch-icon.png`, `favicon-512.png`, `og-image.png` | Logo, íconos y la imagen que se ve al compartir el link |
| `vercel.json` | URLs limpias (`/gracias` en vez de `/gracias.html`) y cabeceras de seguridad |
| `google-sheets-apps-script.gs` | Código para guardar los leads en una hoja de Google (gratis) |

La web funciona completa aunque `config.js` tenga todo vacío: los botones de compra y de agenda llevan al formulario, y el formulario abre un correo a manyosa@limly.io. No hay ningún aviso de “modo de prueba”.

## Orden para romper el círculo (web ↔ checkout)

1. **Sube la web** (paso A). Vercel te da gratis una dirección tipo `https://insula-web.vercel.app`.
2. **Crea los checkout links en Polar** usando esa dirección como *Success URL*:
   `https://insula-web.vercel.app/gracias?checkout_id={CHECKOUT_ID}`
3. **Pega los links** en `config.js` (paso C). Vercel actualiza la web sola.

No hace falta dominio propio para nada de esto. Cuando compres uno, lo conectas en Vercel y cambias la *Success URL* en Polar.

## A. Subir a GitHub y Vercel (una sola vez)

1. github.com → **New repository** → nombre `insula-web` → Public o Private → **Create repository**.
2. En la página del repositorio vacío: **uploading an existing file** → arrastra **el contenido** de esta carpeta (no la carpeta) → **Commit changes**.
3. vercel.com → **Add New… → Project** → importa `insula-web` → Framework: **Other** → **Deploy**.
4. Listo: abre la URL `.vercel.app`.

## B. Guardar los leads gratis (elige una)

| Opción | Qué obtienes | Dificultad |
|---|---|---|
| **Google Sheets + Apps Script** (recomendada) | Cada lead es una fila en tu hoja + aviso por correo | 5 min, instrucciones dentro de `google-sheets-apps-script.gs` |
| **Web3Forms** | Cada lead llega a tu correo | 1 min: crea la clave en web3forms.com con tu correo |
| Firebase (Firestore) | Base de datos | Más pasos; útil después para el login de clientes |
| Supabase | Base de datos SQL | Ya soportado en `config.js` |

Puedes activar Sheets y Web3Forms a la vez.

## C. Editar config.js sin descargar nada

GitHub → repositorio → `config.js` → ícono del **lápiz** → cambia el valor entre comillas → **Commit changes**. Vercel publica el cambio en ~1 minuto.

Ejemplo:
```js
calLink: "https://cal.com/manyosa/demo-15",
polar: { starter: "https://buy.polar.sh/polar_cl_XXXX", pro: "https://buy.polar.sh/polar_cl_YYYY" },
googleSheetsUrl: "https://script.google.com/macros/s/XXXX/exec",
```

## Idiomas

El sitio detecta el idioma del navegador. También se puede forzar: `/#es`, `/#en`, `/#pt`, `/#fr` en la landing y `?lang=en` en las demás páginas. El idioma elegido se recuerda entre páginas.

## Aviso sobre Polar

Si creas los links en el **sandbox** de Polar, el checkout mostrará un aviso de prueba (eso es de Polar, no de la web). Para cobrar de verdad, créalos en la cuenta normal (polar.sh), no en sandbox.polar.sh.
