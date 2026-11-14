/* ==========================================================================
   PDF_THUMBNAILS.JS - ARQUITECTURA DE MINIATURAS BASE64 SIN BLOQUEOS CORS
   Expone window.PDF_THUMBNAILS para renderizado síncrono en html2pdf.js
   ========================================================================== */

(function() {
    // Generador de SVG Data URI corporativo de alta nitidez (nunca falla por CORS)
    function createBrandSvgDataUri(title, subtitle, accentColor) {
        const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" width="220" height="140" viewBox="0 0 220 140">
        <defs>
          <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#0a1120"/>
            <stop offset="100%" stop-color="#172544"/>
          </linearGradient>
        </defs>
        <rect width="220" height="140" rx="10" fill="url(#bg)"/>
        <rect x="6" y="6" width="208" height="128" rx="8" fill="none" stroke="${accentColor}" stroke-width="2.5"/>
        <text x="110" y="62" font-family="Arial, Helvetica, sans-serif" font-size="16" font-weight="bold" fill="#ffffff" text-anchor="middle">${title}</text>
        <text x="110" y="86" font-family="Arial, Helvetica, sans-serif" font-size="11" font-weight="bold" fill="${accentColor}" text-anchor="middle">${subtitle}</text>
        <text x="110" y="114" font-family="Arial, Helvetica, sans-serif" font-size="9" fill="#cbd5e1" text-anchor="middle">LUXURY MOTORS ELITE</text>
      </svg>`;
        return "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svg)));
    }

    window.PDF_THUMBNAILS = {
        "assets/logo_pagina.png": createBrandSvgDataUri("LUXURY MOTORS", "ELITE CORP.", "#ffd700"),
        "https://images.unsplash.com/photo-1592198084033-aade902d1aae?auto=format&fit=crop&w=900&q=80": createBrandSvgDataUri("FERRARI", "SF90 STRADALE", "#ff2800"),
        "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&w=900&q=80": createBrandSvgDataUri("LAMBORGHINI", "HURACÁN STO", "#ffd700"),
        "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=900&q=80": createBrandSvgDataUri("PORSCHE", "911 GT3 RS", "#00d2ff"),
        "https://images.unsplash.com/photo-1520031441872-265e4ff70366?auto=format&fit=crop&w=900&q=80": createBrandSvgDataUri("MERCEDES-AMG", "G 63 EDITION 55", "#38bdf8"),
        "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=900&q=80": createBrandSvgDataUri("BMW M8", "COMPETITION", "#00bfff"),
        "https://images.unsplash.com/photo-1614200187524-dc4b892acf16?auto=format&fit=crop&w=900&q=80": createBrandSvgDataUri("AUDI", "RS E-TRON GT", "#38bdf8"),
        "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=900&q=80": createBrandSvgDataUri("DUCATI", "PANIGALE V4 R", "#ff2800"),
        "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=900&q=80": createBrandSvgDataUri("BMW MOTORRAD", "M 1000 RR", "#00d2ff"),
        "https://images.unsplash.com/photo-1609630875171-b1321377ee65?auto=format&fit=crop&w=900&q=80": createBrandSvgDataUri("KAWASAKI", "NINJA H2R", "#00ff88"),
        "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=900&q=80": createBrandSvgDataUri("MV AGUSTA", "BRUTALE 1000", "#ff9800")
    };

    // Intenta cachear en Base64 real (JPEG) si el navegador permite CORS o archivo local
    function cacheImageAsBase64(key, url) {
        const img = new Image();
        img.crossOrigin = "Anonymous";
        img.onload = function() {
            try {
                const canvas = document.createElement("canvas");
                canvas.width = 220;
                canvas.height = 140;
                const ctx = canvas.getContext("2d");
                ctx.drawImage(img, 0, 0, 220, 140);
                const dataUrl = canvas.toDataURL("image/jpeg", 0.9);
                if (dataUrl && dataUrl.startsWith("data:image/jpeg")) {
                    window.PDF_THUMBNAILS[key] = dataUrl;
                }
            } catch (e) {
                // Conserva el SVG Data URI limpio si el canvas está tainted
            }
        };
        img.src = url;
    }

    document.addEventListener("DOMContentLoaded", () => {
        cacheImageAsBase64("assets/logo_pagina.png", "assets/logo_pagina.png");
        Object.keys(window.PDF_THUMBNAILS).forEach((key) => {
            if (key.startsWith("http")) {
                cacheImageAsBase64(key, key);
            }
        });
    });
})();