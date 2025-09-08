# 🎵 Music Player Desktop App

Reproductor de música hecho con **HTML, CSS y JavaScript**, empaquetado como aplicación de escritorio usando **Electron**.

---

## 🚀 Cómo ejecutar en desarrollo
Si quieres probar el reproductor sin compilar:

```bash
npm install
npm start
```

Esto abrirá la app en una ventana de Electron.

---

## 🖥️ Cómo generar el `.exe` automáticamente (GitHub Actions)

El proyecto ya está configurado con un workflow que compila la aplicación en la nube.

### Pasos:

1. Haz commit y push a la rama `main` de este repositorio.  
2. Entra a la pestaña **Actions** en GitHub.  
3. Selecciona el workflow **Build Windows Electron App**.  
4. Ejecuta el workflow manualmente o espera al push.  
5. Al terminar, en la sección **Artifacts** encontrarás un archivo llamado:

   ```
   MusicPlayer-windows-portable
   ```

   Dentro está el `.exe` listo para descargar y ejecutar en Windows.

---

## 📦 Scripts disponibles

- `npm start` → Ejecuta la app en modo desarrollo.  
- `npm run dist` → Compila un **ejecutable portable** `.exe`.  
- `npm run dist:installer` → Genera un **instalador NSIS** (`setup.exe`).  

---

## 📝 Notas
- La app no necesita instalación de dependencias en el usuario final.  
- El ejecutable generado se encuentra en la carpeta `dist/` (cuando se compila localmente) o en los **Artifacts** de GitHub Actions.  
