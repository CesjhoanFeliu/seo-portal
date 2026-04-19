# SEO Intelligence Portal

Portal multicliente de auditorías SEO, construido con **Jekyll** y hospedable en **GitHub Pages** con dominio propio.

---

## ¿Qué hace este proyecto?

Cada cliente tiene su propio espacio con:

- **Home del cliente** — Hero + métricas + tarjetas de reportes + sprint/to-do
- **Auditoría SEO 360°** — 11 secciones (Técnico, On-Page, Schema, Off-Page, Contenido/E-E-A-T, Rendimiento, IA/GEO, Sitemaps, Local, Competencia, Plan de Acción)
- **Descarga PDF** — Botón que dispara `Ctrl+P` con un CSS de impresión optimizado (inversión a tema claro, secciones expandidas, preservación de códigos de color)

### URLs generadas

```
/                                         → Landing del portal (lista de clientes)
/auditorias/asm-integrators/              → Home del cliente
/auditorias/asm-integrators/seo-audit/    → Auditoría SEO 360°
```

---

## Estructura del repositorio

```
seo-portal/
├── _config.yml                 ← Configuración Jekyll (aquí va el dominio)
├── CNAME                       ← Archivo que GitHub Pages usa para dominio propio
├── Gemfile                     ← Dependencias (solo si quieres dev local)
├── README.md                   ← Este archivo
│
├── _layouts/                   ← Plantillas reutilizables (editas una vez, aplica a todos)
│   ├── default.html            ← Esqueleto HTML base
│   ├── client-home.html        ← Template home cliente (hero + reportes + sprint)
│   └── audit-report.html       ← Template auditoría (sidebar + contenido)
│
├── _includes/                  ← Componentes compartidos
│   ├── topbar.html             ← Barra de navegación superior
│   └── footer.html             ← Footer del sitio
│
├── _data/clients/              ← Datos de cada cliente (YAML)
│   └── asm-integrators.yml     ← Datos: nombre, dominio, stats, reportes, sprint, scores
│
├── assets/
│   ├── css/
│   │   ├── main.css            ← Estilos generales (dark theme + lime)
│   │   ├── audit.css           ← Estilos específicos de la auditoría
│   │   └── print.css           ← Estilos de impresión PDF
│   └── js/
│       └── main.js             ← Colapsables, scroll-spy, PDF trigger
│
├── auditorias/                 ← Una carpeta por cliente
│   └── asm-integrators/
│       ├── index.html          ← Front matter + vacío (usa layout client-home)
│       └── seo-audit.html      ← Contenido completo de la auditoría
│
└── index.html                  ← Landing del portal
```

---

## Deployment en GitHub Pages con dominio propio

### 1. Crear repositorio en GitHub

```bash
cd seo-portal/
git init
git add .
git commit -m "Initial commit: SEO portal with ASM Integrators"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/seo-portal.git
git push -u origin main
```

### 2. Activar GitHub Pages

En tu repo de GitHub:

1. Ve a **Settings** → **Pages**
2. En **Source**, selecciona: **Deploy from a branch**
3. Branch: **main** · Folder: **/ (root)**
4. Click **Save**

GitHub compilará Jekyll automáticamente (tarda 1–2 minutos la primera vez).

### 3. Configurar dominio propio

**En el repo:**

Edita `CNAME` y pon tu subdominio:

```
auditorias.tudominio.com
```

Edita `_config.yml` y actualiza la línea `url:`:

```yaml
url: "https://auditorias.tudominio.com"
```

Haz commit + push.

**En tu proveedor DNS (Cloudflare, Namecheap, GoDaddy, etc.):**

Añade un registro **CNAME**:

| Tipo  | Nombre       | Valor                      |
|-------|--------------|----------------------------|
| CNAME | auditorias   | TU-USUARIO.github.io       |

DNS tarda entre 5 min y 24h en propagar. Al entrar, HTTPS se activa solo (certificado gratis de Let's Encrypt).

**De vuelta en GitHub:**

Settings → Pages → Custom domain → pega `auditorias.tudominio.com` → Save. Marca "Enforce HTTPS" cuando se active.

---

## Cómo añadir un nuevo cliente

Son **3 pasos** y no requieren tocar ni CSS ni layouts.

### Paso 1 — Duplicar el archivo de datos del cliente

```bash
cp _data/clients/asm-integrators.yml _data/clients/nuevo-cliente.yml
```

Abre `_data/clients/nuevo-cliente.yml` y edita:

- `name`: Nombre del cliente
- `slug`: URL-friendly (ej: `empresa-xyz`) — debe coincidir con la carpeta
- `domain`: dominio del cliente
- `description`: breve descripción del negocio
- `stats`: las métricas que quieres mostrar en el home
- `reports`: las tarjetas de reportes (pon `link: ""` si aún no está listo)
- `sprint`: el sprint actual con las tareas
- `audit_scores`: los 9 scores de la auditoría

### Paso 2 — Duplicar la carpeta de auditorías

```bash
cp -r auditorias/asm-integrators auditorias/nuevo-cliente
```

Edita `auditorias/nuevo-cliente/index.html` y actualiza el front matter:

```yaml
---
layout: client-home
title: Nuevo Cliente
client_slug: nuevo-cliente
client_name: Nuevo Cliente
client_domain: nuevocliente.com
permalink: /auditorias/nuevo-cliente/
---
```

Edita `auditorias/nuevo-cliente/seo-audit.html`:

- Actualiza el front matter con el nuevo `client_slug` y `permalink`
- Reemplaza el contenido de las secciones por los hallazgos específicos de esta auditoría
- Mantén la estructura de `<section class="a-section">` intacta para que el sidebar siga funcionando

### Paso 3 — Commit + push

```bash
git add .
git commit -m "Add client: Nuevo Cliente"
git push
```

GitHub Pages recompila automáticamente en 1–2 min. El cliente aparece en la landing y sus reportes quedan en `/auditorias/nuevo-cliente/`.

---

## Desarrollo local (opcional)

No es necesario para que GitHub Pages compile, pero si quieres previsualizar cambios antes de hacer push:

```bash
# Prerrequisito: Ruby 2.7+ y Bundler
bundle install
bundle exec jekyll serve
# → http://localhost:4000
```

---

## Personalización

**Colores** — edita variables en la primera sección de `assets/css/main.css`:

```css
:root {
  --lime: #a3e635;       /* acento principal */
  --bg: #0b0f0b;         /* fondo */
  /* ... */
}
```

**Tipografía** — cambia el import de Google Fonts en `_layouts/default.html` y las variables `--font-sans` / `--font-mono` en `main.css`.

**Logo** — reemplaza el bloque `.brand-mark` en `_includes/topbar.html` por una imagen o SVG personalizado. El favicon está inline como data URI en `default.html` (cámbialo por un `<link rel="icon" href="/assets/img/favicon.svg">` si prefieres archivo).

**Navegación** — edita `_includes/topbar.html`.

---

## Checklist de lanzamiento

- [ ] Editar `_config.yml` con tu dominio real
- [ ] Editar `CNAME` con tu subdominio real
- [ ] Crear repo en GitHub y hacer push inicial
- [ ] Activar GitHub Pages en Settings → Pages
- [ ] Configurar registro CNAME en tu DNS
- [ ] Esperar propagación y activar "Enforce HTTPS"
- [ ] Reemplazar los datos de ASM Integrators por tu primer cliente real (o mantener como ejemplo y añadir otro)
- [ ] Verificar que `Ctrl+P` en `/auditorias/*/seo-audit/` genera un PDF correcto

---

## Stack técnico

- **Jekyll 3.x** (compatible con GitHub Pages, sin build local requerido)
- **Liquid** para templating
- **YAML** para datos de clientes
- **HTML + CSS + JS vanilla** — sin frameworks ni build step
- **Google Fonts**: Manrope + JetBrains Mono
- **Print CSS** con `@media print` para generación de PDF vía navegador

Sin dependencias de runtime en producción — solo archivos estáticos servidos por GitHub Pages.
