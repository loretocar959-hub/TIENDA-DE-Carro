/* ==========================================================================
   APP.JS - LÓGICA PRINCIPAL SPA, CARRITO, CHECKOUT Y GENERADOR PDF INFALIBLE
   Arquitectura por Ing. Juancito Peña Vizcaíno
   ========================================================================== */

(() => {
        "use strict";

        // ==========================================================================
        // 1. RESPALDO EMBEBIDO (FALLBACK PARA PROTOCOLO LOCAL FILE://)
        // ==========================================================================
        const FALLBACK_CATALOG_DATA = {
            vehiculos: [{
                    codigo: 1001,
                    marca: "Ferrari",
                    logo: "https://upload.wikimedia.org/wikipedia/de/c/c0/Scuderia_Ferrari_Logo.svg",
                    tipo: "Deportivo",
                    modelo: "SF90 Stradale Assetto Fiorano",
                    caracteristicas: "1,000 HP Híbrido V8 Biturbo | 0-100 km/h en 2.5s | Vel. Máx 340 km/h",
                    imagen: "https://images.unsplash.com/photo-1592198084033-aade902d1aae?auto=format&fit=crop&w=900&q=80",
                    numeroPuertas: 2,
                    motor: "4.0L V8 Twin-Turbo + 3 Motores Eléctricos",
                    combustible: "Híbrido",
                    categoria: "vehiculos",
                    precio_compra: 460000,
                    precio_venta: 525000,
                    precio_alquiler_hora: 350,
                    precio_alquiler_dia: 2400,
                    oferta_alquiler: "15% OFF Fin de Semana VIP",
                    existencia: 3
                },
                {
                    codigo: 1002,
                    marca: "Lamborghini",
                    logo: "https://upload.wikimedia.org/wikipedia/en/d/df/Lamborghini_Logo.svg",
                    tipo: "Deportivo",
                    modelo: "Huracán STO Performante",
                    caracteristicas: "640 HP V10 Atmosférico | Aerodinámica Squadra Corse | 0-100 km/h en 3.0s",
                    imagen: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&w=900&q=80",
                    numeroPuertas: 2,
                    motor: "5.2L V10 Aspiración Natural",
                    combustible: "Gasolina Premium",
                    categoria: "vehiculos",
                    precio_compra: 310000,
                    precio_venta: 365000,
                    precio_alquiler_hora: 290,
                    precio_alquiler_dia: 1950,
                    oferta_alquiler: "Entrega Aeropuerto Gratis",
                    existencia: 4
                },
                {
                    codigo: 1003,
                    marca: "Porsche",
                    logo: "https://upload.wikimedia.org/wikipedia/de/7/70/Porsche_Logo.svg",
                    tipo: "Deportivo",
                    modelo: "911 GT3 RS (992)",
                    caracteristicas: "525 HP Boxer 6 Cilindros | Sistema DRS Activo | 0-100 km/h en 3.2s",
                    imagen: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=900&q=80",
                    numeroPuertas: 2,
                    motor: "4.0L Flat-6 Atmosférico 9,000 RPM",
                    combustible: "Gasolina Premium",
                    categoria: "vehiculos",
                    precio_compra: 245000,
                    precio_venta: 289000,
                    precio_alquiler_hora: 220,
                    precio_alquiler_dia: 1500,
                    oferta_alquiler: "Seguro Platinum Incluido",
                    existencia: 5
                },
                {
                    codigo: 1004,
                    marca: "Mercedes-AMG",
                    logo: "https://upload.wikimedia.org/wikipedia/commons/9/90/Mercedes-Logo.svg",
                    tipo: "SUV",
                    modelo: "G 63 AMG Edition 55",
                    caracteristicas: "585 HP V8 Biturbo | Tracción Integral 4MATIC | Interior Cuero Nappa",
                    imagen: "https://images.unsplash.com/photo-1520031441872-265e4ff70366?auto=format&fit=crop&w=900&q=80",
                    numeroPuertas: 5,
                    motor: "4.0L V8 Biturbo AMG",
                    combustible: "Gasolina Premium",
                    categoria: "vehiculos",
                    precio_compra: 195000,
                    precio_venta: 235000,
                    precio_alquiler_hora: 180,
                    precio_alquiler_dia: 1250,
                    oferta_alquiler: "Chofer Ejecutivo Opcional",
                    existencia: 6
                },
                {
                    codigo: 1005,
                    marca: "BMW",
                    logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/BMW.svg",
                    tipo: "Sedán de Lujo",
                    modelo: "M8 Competition Gran Coupé",
                    caracteristicas: "625 HP M TwinPower Turbo | 0-100 km/h en 3.2s | Sonido Bowers & Wilkins",
                    imagen: "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=900&q=80",
                    numeroPuertas: 4,
                    motor: "4.4L V8 M TwinPower Turbo",
                    combustible: "Gasolina Premium",
                    categoria: "vehiculos",
                    precio_compra: 142000,
                    precio_venta: 168000,
                    precio_alquiler_hora: 140,
                    precio_alquiler_dia: 950,
                    oferta_alquiler: "Kilometraje Ilimitado VIP",
                    existencia: 4
                },
                {
                    codigo: 1006,
                    marca: "Audi",
                    logo: "https://upload.wikimedia.org/wikipedia/commons/9/92/Audi-Logo_2016.svg",
                    tipo: "Deportivo",
                    modelo: "RS e-tron GT Carbon",
                    caracteristicas: "646 HP 100% Eléctrico | Carga Ultra Rápida 800V | 0-100 km/h en 3.3s",
                    imagen: "https://images.unsplash.com/photo-1614200187524-dc4b892acf16?auto=format&fit=crop&w=900&q=80",
                    numeroPuertas: 4,
                    motor: "Dual Motor Eléctrico Quattro",
                    combustible: "Eléctrico",
                    categoria: "vehiculos",
                    precio_compra: 135000,
                    precio_venta: 159000,
                    precio_alquiler_hora: 130,
                    precio_alquiler_dia: 890,
                    oferta_alquiler: "Carga Rápida Cortesía",
                    existencia: 5
                }
            ],
            motos: [{
                    codigo: 2001,
                    marca: "Ducati",
                    logo: "https://upload.wikimedia.org/wikipedia/commons/6/66/Ducati_red_logo.svg",
                    tipo: "Superbike",
                    modelo: "Panigale V4 R Corse",
                    caracteristicas: "240.5 HP Desmosedici Stradale R | Alerones Fibra de Carbono | 16,500 RPM",
                    imagen: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=900&q=80",
                    numeroPuertas: 0,
                    motor: "998cc Desmosedici Stradale V4",
                    combustible: "Gasolina Premium",
                    categoria: "motos",
                    precio_compra: 39000,
                    precio_venta: 46500,
                    precio_alquiler_hora: 75,
                    precio_alquiler_dia: 480,
                    oferta_alquiler: "Casco Carbono AGV Incluido",
                    existencia: 4
                },
                {
                    codigo: 2002,
                    marca: "BMW Motorrad",
                    logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/BMW.svg",
                    tipo: "Superbike",
                    modelo: "M 1000 RR Competition",
                    caracteristicas: "212 HP ShiftCam | Rines de Carbono M | Frenos M Performance",
                    imagen: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=900&q=80",
                    numeroPuertas: 0,
                    motor: "999cc 4 Cilindros en Línea Titanium",
                    combustible: "Gasolina Premium",
                    categoria: "motos",
                    precio_compra: 33500,
                    precio_venta: 39800,
                    precio_alquiler_hora: 65,
                    precio_alquiler_dia: 420,
                    oferta_alquiler: "20% OFF Alquiler +3 Días",
                    existencia: 5
                },
                {
                    codigo: 2003,
                    marca: "Kawasaki",
                    logo: "https://upload.wikimedia.org/wikipedia/commons/1/15/Kawasaki_Logo_vert.svg",
                    tipo: "Hyperbike",
                    modelo: "Ninja H2R Track Edition",
                    caracteristicas: "310 HP Supercharged | Chasis Multitubular | Pintura Autorreparable",
                    imagen: "https://images.unsplash.com/photo-1609630875171-b1321377ee65?auto=format&fit=crop&w=900&q=80",
                    numeroPuertas: 0,
                    motor: "998cc 4 Cilindros Sobrecomprimido",
                    combustible: "Gasolina Premium",
                    categoria: "motos",
                    precio_compra: 51000,
                    precio_venta: 58900,
                    precio_alquiler_hora: 95,
                    precio_alquiler_dia: 620,
                    oferta_alquiler: "Asistencia Técnica Pista",
                    existencia: 2
                },
                {
                    codigo: 2004,
                    marca: "MV Agusta",
                    logo: "https://upload.wikimedia.org/wikipedia/commons/3/3a/MV_Agusta_Logo.svg",
                    tipo: "Naked Exclusiva",
                    modelo: "Brutale 1000 Nürburgring",
                    caracteristicas: "215 HP Escape Arrow Titanio | Edición Limitada 150 Unidades",
                    imagen: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=900&q=80",
                    numeroPuertas: 0,
                    motor: "998cc 4 Cilindros Válvulas Radiales",
                    combustible: "Gasolina Premium",
                    categoria: "motos",
                    precio_compra: 41000,
                    precio_venta: 48500,
                    precio_alquiler_hora: 80,
                    precio_alquiler_dia: 510,
                    oferta_alquiler: "Seguro Todo Riesgo VIP",
                    existencia: 3
                }
            ]
        };

        // ==========================================================================
        // 2. ESTADO GLOBAL DE LA APLICACIÓN
        // ==========================================================================
        const SECURITY_DEPOSIT_PER_RENTAL = 500;
        let allVehicles = [];
        let activeCategory = "todos";
        let searchQuery = "";
        let cart = [];
        let selectedRentalVehicle = null;

        // ==========================================================================
        // 3. UTILIDADES DE FORMATO Y SEGURIDAD HTML
        // ==========================================================================
        function formatCurrency(amount) {
            return new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
                minimumFractionDigits: 2
            }).format(amount);
        }

        function escapeHtml(text) {
            if (text === null || text === undefined) return "";
            return String(text)
                .replace(/&/g, "&amp;")
                .replace(/</g, "&lt;")
                .replace(/>/g, "&gt;")
                .replace(/"/g, "&quot;")
                .replace(/'/g, "&#039;");
        }

        function resolvePdfImage(path) {
            if (window.PDF_THUMBNAILS && window.PDF_THUMBNAILS[path]) {
                return window.PDF_THUMBNAILS[path];
            }
            return path;
        }

        function generateDocumentCode() {
            const randomNum = Math.floor(100000 + Math.random() * 900000);
            return `LME-${randomNum}`;
        }

        // ==========================================================================
        // 4. CARGA ASÍNCRONA DE DATOS (FETCH + FALLBACK)
        // ==========================================================================
        async function loadCatalogData() {
            try {
                const response = await fetch("vehiculo.json");
                if (!response.ok) throw new Error("No se pudo cargar vehiculo.json vía HTTP");
                const data = await response.json();
                allVehicles = [...(data.vehiculos || []), ...(data.motos || [])];
            } catch (error) {
                console.warn("Cargando catálogo desde respaldo embebido (modo local file://):", error.message);
                allVehicles = [...FALLBACK_CATALOG_DATA.vehiculos, ...FALLBACK_CATALOG_DATA.motos];
            }
            renderCatalog();
        }

        // ==========================================================================
        // 5. RENDERIZADO DINÁMICO DEL CATÁLOGO
        // ==========================================================================
        function renderCatalog() {
            const grid = document.getElementById("catalogGrid");
            const emptyState = document.getElementById("emptyState");
            const counter = document.getElementById("inventoryCounter");

            const filtered = allVehicles.filter((item) => {
                const matchesCat = activeCategory === "todos" || item.categoria === activeCategory;
                const q = searchQuery.trim().toLowerCase();
                const matchesSearch = !q ||
                    item.marca.toLowerCase().includes(q) ||
                    item.modelo.toLowerCase().includes(q) ||
                    item.tipo.toLowerCase().includes(q) ||
                    item.motor.toLowerCase().includes(q) ||
                    String(item.codigo).includes(q);
                return matchesCat && matchesSearch;
            });

            counter.textContent = `${filtered.length} ${filtered.length === 1 ? "Unidad Disponible" : "Unidades Disponibles"}`;

            if (filtered.length === 0) {
                grid.innerHTML = "";
                emptyState.classList.remove("d-none");
                return;
            }

            emptyState.classList.add("d-none");

            grid.innerHTML = filtered
                .map((item) => {
                    const doorsText = item.categoria === "motos" ? "Motocicleta (0 Puertas)" : `${item.numeroPuertas} Puertas`;
                    return `
        <article class="col-12 col-md-6 col-lg-4">
          <div class="vehicle-card">
            <div class="card-img-container">
              <span class="promo-badge-floating"><i class="fas fa-fire me-1"></i>${escapeHtml(item.oferta_alquiler)}</span>
              <span class="type-badge-floating">${escapeHtml(item.tipo.toUpperCase())}</span>
              <img src="${escapeHtml(item.imagen)}" alt="${escapeHtml(item.marca)} ${escapeHtml(item.modelo)}" class="card-vehicle-img" loading="lazy">
            </div>

            <div class="p-3 p-xl-4 d-flex flex-column flex-grow-1">
              <div class="d-flex align-items-center gap-2 mb-2">
                <img src="${escapeHtml(item.logo)}" alt="${escapeHtml(item.marca)}" class="brand-logo-mini" onerror="this.style.display='none'">
                <div>
                  <h3 class="card-vehicle-title">${escapeHtml(item.marca)} ${escapeHtml(item.modelo)}</h3>
                  <span class="card-vehicle-code">Código VIP: #${item.codigo}</span>
                </div>
              </div>

              <p class="card-vehicle-desc mb-3">${escapeHtml(item.caracteristicas)}</p>

              <div class="specs-grid mb-3">
                <div class="spec-item"><i class="fas fa-door-open"></i> ${doorsText}</div>
                <div class="spec-item"><i class="fas fa-gas-pump"></i> ${escapeHtml(item.combustible)}</div>
                <div class="spec-item col-span-2" style="grid-column: span 2;">
                  <i class="fas fa-cogs"></i> ${escapeHtml(item.motor)}
                </div>
                <div class="spec-item" style="grid-column: span 2;">
                  <i class="fas fa-check-circle text-info"></i> Stock Físico: <strong class="text-info">${item.existencia} unid.</strong>
                </div>
              </div>

              <div class="pricing-panel mb-3">
                <div class="d-flex justify-content-between align-items-center mb-1">
                  <span class="small text-white">Precio Venta Directa:</span>
                  <span class="price-sale-value">${formatCurrency(item.precio_venta)}</span>
                </div>
                <div class="d-flex justify-content-between align-items-center mb-1">
                  <span class="small text-white">Alquiler por Día (24h):</span>
                  <span class="price-rent-day">${formatCurrency(item.precio_alquiler_dia)} /día</span>
                </div>
                <div class="d-flex justify-content-between align-items-center">
                  <span class="small text-white">Alquiler por Hora:</span>
                  <span class="price-rent-hour">${formatCurrency(item.precio_alquiler_hora)} /hora</span>
                </div>
              </div>

              <div class="row g-2">
                <div class="col-6">
                  <button type="button" class="btn btn-elite-orange w-100 fw-bold py-2 btn-open-rental" data-codigo="${item.codigo}">
                    🔑 Alquilar
                  </button>
                </div>
                <div class="col-6">
                  <button type="button" class="btn btn-elite-primary w-100 fw-bold py-2 btn-direct-buy" data-codigo="${item.codigo}">
                    🛒 Comprar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </article>`;
                })
                .join("");
        }

        // ==========================================================================
        // 6. MODAL INTERACTIVO DE ALQUILER & CÁLCULO REACTIVO
        // ==========================================================================
        function openRentalModal(codigo) {
            const vehicle = allVehicles.find((v) => v.codigo === Number(codigo));
            if (!vehicle) return;

            selectedRentalVehicle = vehicle;

            document.getElementById("rentalVehicleId").value = vehicle.codigo;
            document.getElementById("rentalVehicleImg").src = vehicle.imagen;
            document.getElementById("rentalVehicleCategory").textContent = vehicle.tipo.toUpperCase();
            document.getElementById("rentalVehicleName").textContent = `${vehicle.marca} ${vehicle.modelo}`;
            document.getElementById("rentalVehicleCode").textContent = `Código VIP: #${vehicle.codigo}`;
            document.getElementById("rentalRateDayDisplay").textContent = `${formatCurrency(vehicle.precio_alquiler_dia)}/día`;
            document.getElementById("rentalRateHourDisplay").textContent = `${formatCurrency(vehicle.precio_alquiler_hora)}/h`;

            // Valores iniciales por defecto
            document.getElementById("modeDia").checked = true;
            document.getElementById("rentalDurationInput").value = 3;
            document.getElementById("rentalStartDate").value = "2026-10-27";

            updateRentalCalculation();

            const modalEl = document.getElementById("rentalModal");
            const modalInstance = bootstrap.Modal.getOrCreateInstance(modalEl);
            modalInstance.show();
        }

        function updateRentalCalculation() {
            if (!selectedRentalVehicle) return;

            const isDayMode = document.getElementById("modeDia").checked;
            const duration = Math.max(1, parseInt(document.getElementById("rentalDurationInput").value, 10) || 1);
            const unitRate = isDayMode ? selectedRentalVehicle.precio_alquiler_dia : selectedRentalVehicle.precio_alquiler_hora;
            const modeLabel = isDayMode ? "Día(s)" : "Hora(s)";

            document.getElementById("rentalDurationLabel").textContent = isDayMode ? "Cantidad de Días:" : "Cantidad de Horas:";
            document.getElementById("calcUnitRate").textContent = `${formatCurrency(unitRate)} / ${isDayMode ? "día" : "hora"}`;
            document.getElementById("calcDurationText").textContent = `${duration} ${modeLabel}`;

            const rentalSubtotal = unitRate * duration;
            document.getElementById("calcRentalSubtotal").textContent = formatCurrency(rentalSubtotal);
        }

        function addRentalToCart() {
            if (!selectedRentalVehicle) return;

            const isDayMode = document.getElementById("modeDia").checked;
            const duration = Math.max(1, parseInt(document.getElementById("rentalDurationInput").value, 10) || 1);
            const startDate = document.getElementById("rentalStartDate").value || "2026-10-27";
            const unitRate = isDayMode ? selectedRentalVehicle.precio_alquiler_dia : selectedRentalVehicle.precio_alquiler_hora;
            const modality = isDayMode ? "Día(s)" : "Hora(s)";
            const unitTotal = unitRate * duration;

            const cartKey = `ALQUILER-${selectedRentalVehicle.codigo}-${modality}-${duration}-${startDate}`;
            const existing = cart.find((item) => item.cartKey === cartKey);

            if (existing) {
                existing.cantidad += 1;
            } else {
                cart.push({
                    cartKey,
                    codigo: selectedRentalVehicle.codigo,
                    marca: selectedRentalVehicle.marca,
                    modelo: selectedRentalVehicle.modelo,
                    imagen: selectedRentalVehicle.imagen,
                    operacion: "ALQUILER",
                    modalidad: modality,
                    duracion: duration,
                    fechaInicio: startDate,
                    precioUnitario: unitTotal,
                    tarifaBase: unitRate,
                    cantidad: 1
                });
            }

            const modalInstance = bootstrap.Modal.getInstance(document.getElementById("rentalModal"));
            if (modalInstance) modalInstance.hide();

            updateCartUI();

            Swal.fire({
                icon: "success",
                title: "Reserva Agregada",
                text: `${selectedRentalVehicle.marca} ${selectedRentalVehicle.modelo} (${duration} ${modality}) añadida a tu orden.`,
                background: "#0d121c",
                color: "#ffffff",
                confirmButtonColor: "#00bfff",
                timer: 2000,
                showConfirmButton: false
            });
        }

        // ==========================================================================
        // 7. COMPRA DIRECTA & GESTIÓN DEL CARRITO
        // ==========================================================================
        function addDirectPurchaseToCart(codigo) {
            const vehicle = allVehicles.find((v) => v.codigo === Number(codigo));
            if (!vehicle) return;

            const cartKey = `VENTA-${vehicle.codigo}`;
            const existing = cart.find((item) => item.cartKey === cartKey);

            if (existing) {
                if (existing.cantidad >= vehicle.existencia) {
                    Swal.fire({
                        icon: "warning",
                        title: "Stock Máximo Alcanzado",
                        text: `Solo disponemos de ${vehicle.existencia} unidades físicas de este modelo.`,
                        background: "#0d121c",
                        color: "#ffffff",
                        confirmButtonColor: "#ff9800"
                    });
                    return;
                }
                existing.cantidad += 1;
            } else {
                cart.push({
                    cartKey,
                    codigo: vehicle.codigo,
                    marca: vehicle.marca,
                    modelo: vehicle.modelo,
                    imagen: vehicle.imagen,
                    operacion: "VENTA",
                    modalidad: "Compra Directa",
                    duracion: null,
                    fechaInicio: null,
                    precioUnitario: vehicle.precio_venta,
                    tarifaBase: vehicle.precio_venta,
                    cantidad: 1
                });
            }

            updateCartUI();

            Swal.fire({
                icon: "success",
                title: "Unidad Añadida a Compra",
                text: `${vehicle.marca} ${vehicle.modelo} lista para facturación oficial.`,
                background: "#0d121c",
                color: "#ffffff",
                confirmButtonColor: "#00bfff",
                timer: 1800,
                showConfirmButton: false
            });
        }

        function calculateTotals() {
            let grossSubtotal = 0;
            let rentalUnitsCount = 0;
            let hasSales = false;
            let hasRentals = false;

            cart.forEach((item) => {
                grossSubtotal += item.precioUnitario * item.cantidad;
                if (item.operacion === "ALQUILER") {
                    hasRentals = true;
                    rentalUnitsCount += item.cantidad;
                } else {
                    hasSales = true;
                }
            });

            const securityDeposit = rentalUnitsCount * SECURITY_DEPOSIT_PER_RENTAL;
            const totalGeneral = grossSubtotal + securityDeposit;

            return {
                grossSubtotal,
                securityDeposit,
                totalGeneral,
                hasSales,
                hasRentals,
                rentalUnitsCount
            };
        }

        function updateCartUI() {
            const totalItems = cart.reduce((acc, item) => acc + item.cantidad, 0);
            document.getElementById("floatingCartBadge").textContent = totalItems;
            document.getElementById("heroCartCount").textContent = totalItems;

            const container = document.getElementById("cartItemsContainer");
            const totals = calculateTotals();
            document.getElementById("cartModalTotalDisplay").textContent = `${formatCurrency(totals.totalGeneral)} USD`;
            document.getElementById("checkoutFinalAmount").textContent = `${formatCurrency(totals.totalGeneral)} USD`;
            document.getElementById("checkoutDepositLabel").textContent = `${formatCurrency(totals.securityDeposit)} USD`;

            // Actualizar etiqueta de tipo de documento en Checkout
            const docLabel = document.getElementById("checkoutDocTypeLabel");
            if (totals.hasSales && totals.hasRentals) {
                docLabel.textContent = "Factura de Venta + Contrato Alquiler";
            } else if (totals.hasRentals) {
                docLabel.textContent = "Contrato de Alquiler Oficial";
            } else {
                docLabel.textContent = "Factura de Venta Oficial";
            }

            if (cart.length === 0) {
                container.innerHTML = `
        <div class="text-center py-5">
          <i class="fas fa-shopping-bag fa-3x text-info mb-3"></i>
          <h5 class="text-white fw-bold">Tu orden ejecutiva está vacía</h5>
          <p class="text-light mb-0">Selecciona cualquier vehículo o motocicleta del catálogo para alquilar o comprar.</p>
        </div>`;
                return;
            }

            const salesItems = cart.filter((i) => i.operacion === "VENTA");
            const rentalItems = cart.filter((i) => i.operacion === "ALQUILER");

            let html = "";

            if (salesItems.length > 0) {
                html += `<h6 class="text-warning fw-bold text-uppercase mb-2"><i class="fas fa-award me-2"></i>Adquisiciones Vehiculares (Compra Directa)</h6>`;
                html += buildCartSectionTable(salesItems);
            }

            if (rentalItems.length > 0) {
                html += `<h6 class="text-info fw-bold text-uppercase mt-4 mb-2"><i class="fas fa-key me-2"></i>Contratos de Arrendamiento Ejecutivo (Alquiler)</h6>`;
                html += buildCartSectionTable(rentalItems);
            }

            html += `
      <div class="elite-summary-box p-3 mt-4">
        <div class="row g-2 align-items-center">
          <div class="col-md-7">
            <p class="small text-white mb-1"><i class="fas fa-check-circle text-info me-1"></i> Impuestos & Tasas Corporativas: <strong>$0.00 (Exento Zona Franca VIP)</strong></p>
            <p class="small text-white mb-0"><i class="fas fa-shield-alt text-warning me-1"></i> Fianza de Garantía Reembolsable: <strong>$500.00 USD por unidad alquilada</strong></p>
          </div>
          <div class="col-md-5 text-md-end">
            <div class="d-flex justify-content-between justify-content-md-end gap-4 mb-1">
              <span class="text-white">Subtotal Bruto:</span>
              <strong class="text-white">${formatCurrency(totals.grossSubtotal)}</strong>
            </div>
            <div class="d-flex justify-content-between justify-content-md-end gap-4 mb-1">
              <span class="text-white">Fianza Reembolsable:</span>
              <strong class="text-warning">${formatCurrency(totals.securityDeposit)}</strong>
            </div>
            <div class="d-flex justify-content-between justify-content-md-end gap-4 pt-2 border-top border-info">
              <span class="fw-bold text-info">TOTAL GENERAL:</span>
              <strong class="fs-5 text-warning">${formatCurrency(totals.totalGeneral)}</strong>
            </div>
          </div>
        </div>
      </div>`;

            container.innerHTML = html;
        }

        function buildCartSectionTable(items) {
            const rows = items
                .map((item) => {
                    const detailText =
                        item.operacion === "VENTA" ?
                        "Adquisición Vehicular Definitiva" :
                        `Alquiler: ${item.duracion} ${item.modalidad} (Desde ${item.fechaInicio})`;
                    const subtotal = item.precioUnitario * item.cantidad;

                    return `
        <tr>
          <td><img src="${escapeHtml(item.imagen)}" alt="${escapeHtml(item.modelo)}" class="cart-thumb-img"></td>
          <td>
            <strong class="text-info d-block">${escapeHtml(item.marca)} ${escapeHtml(item.modelo)}</strong>
            <small class="text-light">Código: #${item.codigo}</small>
          </td>
          <td><span class="text-white small">${escapeHtml(detailText)}</span></td>
          <td class="text-warning fw-bold">${formatCurrency(item.precioUnitario)}</td>
          <td>
            <div class="btn-group btn-group-sm" role="group">
              <button type="button" class="btn btn-outline-info btn-qty-dec" data-key="${escapeHtml(item.cartKey)}">-</button>
              <span class="btn btn-dark disabled text-white fw-bold">${item.cantidad}</span>
              <button type="button" class="btn btn-outline-info btn-qty-inc" data-key="${escapeHtml(item.cartKey)}">+</button>
            </div>
          </td>
          <td class="text-white fw-bold">${formatCurrency(subtotal)}</td>
          <td class="text-end">
            <button type="button" class="btn btn-sm btn-outline-danger btn-remove-item" data-key="${escapeHtml(item.cartKey)}" title="Eliminar">
              <i class="fas fa-trash"></i>
            </button>
          </td>
        </tr>`;
                })
                .join("");

            return `
      <div class="table-responsive">
        <table class="elite-cart-table">
          <thead>
            <tr>
              <th>Unidad</th>
              <th>Vehículo</th>
              <th>Modalidad / Detalle</th>
              <th>Precio Unit.</th>
              <th>Cant.</th>
              <th>Subtotal</th>
              <th></th>
            </tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>
      </div>`;
        }

        // ==========================================================================
        // 8. RESTAURACIÓN DE DATOS FICTICIOS VIP (1-CLICK)
        // ==========================================================================
        function fillDemoVipData() {
            document.getElementById("clientName").value = "Ing. Juancito Peña Vizcaíno";
            document.getElementById("clientId").value = "001-1234567-8";
            document.getElementById("clientLicense").value = "DO-8874125-VIP (Vigente)";
            document.getElementById("clientPhone").value = "+1 (809) 555-0199";
            document.getElementById("clientEmail").value = "juancito.pena@luxurymotors.com";
            document.getElementById("clientAddress").value = "Av. Anacaona #105, Torre Bella Vista, Santo Domingo, D.N.";
            document.getElementById("cardNumber").value = "4532 8901 2345 8899";
            document.getElementById("cardExpiry").value = "12/28";
            document.getElementById("cardCvv").value = "789";
        }

        // ==========================================================================
        // 9. GENERACIÓN INFALIBLE DE PDF OFICIAL (LME-XXXXXX)
        // ==========================================================================
        function forceCleanupBootstrapModals() {
            const openModals = document.querySelectorAll(".modal.show");
            openModals.forEach((modalEl) => {
                const instance = bootstrap.Modal.getInstance(modalEl);
                if (instance) instance.hide();
            });

            document.querySelectorAll(".modal-backdrop").forEach((el) => el.remove());
            document.body.classList.remove("modal-open");
            document.body.style.removeProperty("padding-right");
            document.body.style.removeProperty("overflow");
        }

        function processCheckoutAndGeneratePdf() {
            if (cart.length === 0) {
                Swal.fire({
                    icon: "warning",
                    title: "Carrito Vacío",
                    text: "Agrega al menos un vehículo para generar la factura o contrato.",
                    background: "#0d121c",
                    color: "#ffffff"
                });
                return;
            }

            const form = document.getElementById("checkoutForm");
            if (!form.checkValidity()) {
                form.reportValidity();
                return;
            }

            const clientName = document.getElementById("clientName").value.trim();
            const clientId = document.getElementById("clientId").value.trim();
            const clientLicense = document.getElementById("clientLicense").value.trim();
            const clientPhone = document.getElementById("clientPhone").value.trim();
            const clientEmail = document.getElementById("clientEmail").value.trim();
            const clientAddress = document.getElementById("clientAddress").value.trim();
            const cardNumber = document.getElementById("cardNumber").value.trim();
            const last4 = cardNumber.slice(-4) || "8899";

            const totals = calculateTotals();
            const docCode = generateDocumentCode();
            const now = new Date();
            const formattedDateTime = now.toLocaleDateString("es-DO") + " " + now.toLocaleTimeString("es-DO", { hour: "2-digit", minute: "2-digit" });

            // Determinar Título y Nombre Exacto del Archivo PDF
            let docTitle = "";
            let filename = "";
            const includeClauses = totals.hasRentals;

            if (totals.hasSales && totals.hasRentals) {
                docTitle = "FACTURA DE VENTA Y CONTRATO DE ALQUILER";
                filename = `factura_de_venta_y_contrato_de_alquiler_${docCode}.pdf`;
            } else if (totals.hasRentals) {
                docTitle = "CONTRATO DE ALQUILER Y ACUERDO DE RESPONSABILIDAD";
                filename = `contrato_de_alquiler_y_acuerdo_de_responsabilidad_${docCode}.pdf`;
            } else {
                docTitle = "FACTURA DE VENTA";
                filename = `factura_de_venta_${docCode}.pdf`;
            }

            const logoDataUri = resolvePdfImage("assets/logo_pagina.png");

            // Filas de la tabla del documento
            const tableRowsHtml = cart
                .map((item, idx) => {
                    const thumbUri = resolvePdfImage(item.imagen);
                    const isSale = item.operacion === "VENTA";
                    const badgeStyle = isSale ?
                        "background:#dcfce7 !important; color:#166534 !important; border:1px solid #86efac;" :
                        "background:#e0f2fe !important; color:#075985 !important; border:1px solid #7dd3fc;";
                    const detailText = isSale ?
                        "Adquisición Vehicular Definitiva" :
                        `Alquiler: ${item.duracion} ${item.modalidad} (Desde ${item.fechaInicio})`;
                    const rowSubtotal = item.precioUnitario * item.cantidad;

                    return `
        <tr style="border-bottom: 1px solid #e2e8f0; background:#ffffff !important;">
          <td style="padding: 7px 5px; text-align:center; color:#111111 !important; font-weight:bold;">${idx + 1}</td>
          <td style="padding: 7px 5px; text-align:center;">
            <img src="${thumbUri}" style="width:55px; height:38px; object-fit:cover; border-radius:4px; border:1px solid #cbd5e1;" />
          </td>
          <td style="padding: 7px 6px; color:#111111 !important;">
            <strong style="color:#111111 !important; font-size:10px;">${escapeHtml(item.marca)} ${escapeHtml(item.modelo)}</strong><br>
            <span style="color:#555555 !important; font-size:8.5px;">Cód: #${item.codigo}</span>
          </td>
          <td style="padding: 7px 5px; text-align:center;">
            <span style="display:inline-block; padding:2px 6px; border-radius:4px; font-size:8.5px; font-weight:bold; ${badgeStyle}">
              ${item.operacion}
            </span>
          </td>
          <td style="padding: 7px 6px; color:#333333 !important; font-size:9px;">${escapeHtml(detailText)}</td>
          <td style="padding: 7px 5px; text-align:right; color:#111111 !important;">${formatCurrency(item.precioUnitario)}</td>
          <td style="padding: 7px 5px; text-align:center; color:#111111 !important; font-weight:bold;">${item.cantidad}</td>
          <td style="padding: 7px 6px; text-align:right; color:#111111 !important; font-weight:bold;">${formatCurrency(rowSubtotal)}</td>
        </tr>`;
                })
                .join("");

            // Bloque de Cláusulas Legales y Doble Firma (Alquiler / Mixto) vs Garantía (Solo Venta)
            const clausesHtml = includeClauses ?
                `
      <!-- Acuerdo de Responsabilidad y Términos de Alquiler (OBLIGATORIO EN ALQUILER - BLINDADO CON !IMPORTANT) -->
      <div style="margin-top: 15px; padding: 10px 14px; background: #fafafa !important; border: 1px solid #e5e5e5; border-radius: 6px; font-size: 9.5px; color: #333333 !important; line-height: 1.45;">
        <h5 style="margin: 0 0 6px 0; font-size: 10.5px; font-weight: bold; color: #111111 !important; text-transform: uppercase;">
          Acuerdo de Responsabilidad y Términos de Alquiler:
        </h5>
        <p style="margin: 0 0 4px 0; color: #333333 !important;"><strong style="color: #111111 !important;">1. Custodia del Bien:</strong> El arrendatario se compromete a operar la unidad bajo las leyes de tránsito vigentes, no exceder los límites de velocidad y mantener el vehículo en óptimas condiciones mecánicas y estéticas.</p>
        <p style="margin: 0 0 4px 0; color: #333333 !important;"><strong style="color: #111111 !important;">2. Cobertura & Deducible:</strong> La unidad cuenta con póliza de seguro completa con deducible del 10% en caso de colisión comprobada. Daños por negligencia, ingesta de alcohol o sustancias ilícitas son de responsabilidad exclusiva del arrendatario.</p>
        <p style="margin: 0 0 4px 0; color: #333333 !important;"><strong style="color: #111111 !important;">3. Política de Combustible:</strong> La unidad se entrega con tanque lleno y debe ser devuelta en las mismas condiciones. De lo contrario, se aplicará el cargo estándar de reposición.</p>
      </div>

      <!-- Firmas de Responsabilidad (BLINDADAS CONTRA TEXTO INVISIBLE) -->
      <table style="width: 100%; margin-top: 30px; font-size: 10px; text-align: center;" cellpadding="0" cellspacing="0">
        <tr>
          <td style="width: 45%; vertical-align: top;">
            <div style="border-top: 1px solid #333; padding-top: 6px; margin: 0 20px;">
              <strong style="color: #111111 !important;">LUXURY MOTORS ELITE CORP.</strong><br>
              <span style="font-size: 9px; color: #555555 !important;">Firma Autorizada / Departamento Comercial</span>
            </div>
          </td>
          <td style="width: 10%;"></td>
          <td style="width: 45%; vertical-align: top;">
            <div style="border-top: 1px solid #333; padding-top: 6px; margin: 0 20px;">
              <strong style="color: #111111 !important;">${escapeHtml(clientName)}</strong><br>
              <span style="font-size: 9px; color: #555555 !important;">Doc ID: ${escapeHtml(clientId)} (Cliente / Arrendatario)</span>
            </div>
          </td>
        </tr>
      </table>` :
                `
      <!-- Bloque de Entrega Venta -->
      <div style="margin-top: 20px; padding: 10px; background: #fdfdfd !important; border-left: 3px solid #2e7d32; font-size: 9.5px; color: #444444 !important;">
        <strong style="color: #111111 !important;">Garantía de Satisfacción:</strong> Unidad vendida con garantía certificada de 3 años o 60,000 km, traspaso legal garantizado y asistencia vial 24/7 de cortesía durante el primer año.
      </div>`;

            const depositRowHtml =
                totals.securityDeposit > 0 ?
                `<tr>
            <td style="padding: 3px 0; color: #333333 !important;">Fianza Garantía Reembolsable:</td>
            <td style="padding: 3px 0; text-align: right; color: #111111 !important; font-weight: bold;">${formatCurrency(totals.securityDeposit)}</td>
          </tr>` :
                "";

            // Plantilla HTML Pura con Fondo Blanco y Estilos Inline Blindados
            const htmlStringDefinitivo = `
      <div class="pdf-doc-root" style="font-family: Arial, Helvetica, sans-serif; background: #ffffff !important; color: #333333 !important; padding: 12px 16px; width: 100%; box-sizing: border-box;">
        
        <!-- 1. ENCABEZADO CENTRADO -->
        <div style="text-align: center; margin-bottom: 14px;">
          <img src="${logoDataUri}" style="height: 56px; width: auto; object-fit: contain; margin-bottom: 6px;" />
          <h2 style="margin: 0; font-size: 18px; font-weight: bold; color: #111111 !important; letter-spacing: 1.5px;">
            LUXURY MOTORS ELITE CORP.
          </h2>
          <p style="margin: 3px 0 8px 0; font-size: 9.5px; color: #333333 !important;">
            Av. Anacaona #105, Torre Empresarial Elite, Piso 14 | Tel: +1 (809) 555-ELITE | info@luxurymotors.com
          </p>
          <div style="display: inline-block; background: #111111 !important; color: #ffffff !important; font-size: 13px; font-weight: bold; padding: 4px 18px; border-radius: 4px; text-transform: uppercase;">
            ${docTitle}
          </div>
        </div>

        <!-- 2. METADATOS Y CLIENTE -->
        <table style="width: 100%; background: #f8f9fa !important; border: 1px solid #e9ecef; border-radius: 6px; padding: 8px 12px; margin-bottom: 14px; font-size: 9.5px;" cellpadding="4" cellspacing="0">
          <tr>
            <td style="width: 52%; vertical-align: top; color: #333333 !important;">
              <div style="font-weight: bold; color: #111111 !important; margin-bottom: 4px; border-bottom: 1px solid #dee2e6; padding-bottom: 2px;">DATOS DEL CLIENTE:</div>
              <div style="color: #333333 !important;"><strong style="color: #111111 !important;">Nombre:</strong> ${escapeHtml(clientName)}</div>
              <div style="color: #333333 !important;"><strong style="color: #111111 !important;">Identificación:</strong> ${escapeHtml(clientId)}</div>
              ${includeClauses ? `<div style="color: #333333 !important;"><strong style="color: #111111 !important;">Licencia Conducir:</strong> ${escapeHtml(clientLicense)}</div>` : ""}
              <div style="color: #333333 !important;"><strong style="color: #111111 !important;">Teléfono:</strong> ${escapeHtml(clientPhone)}</div>
              <div style="color: #333333 !important;"><strong style="color: #111111 !important;">Email:</strong> ${escapeHtml(clientEmail)}</div>
              <div style="color: #333333 !important;"><strong style="color: #111111 !important;">Dirección:</strong> ${escapeHtml(clientAddress)}</div>
            </td>
            <td style="width: 48%; vertical-align: top; color: #333333 !important;">
              <div style="font-weight: bold; color: #111111 !important; margin-bottom: 4px; border-bottom: 1px solid #dee2e6; padding-bottom: 2px;">DETALLES DE LA TRANSACCIÓN:</div>
              <div style="color: #333333 !important;"><strong style="color: #111111 !important;">No. Documento:</strong> ${docCode}</div>
              <div style="color: #333333 !important;"><strong style="color: #111111 !important;">Fecha & Hora:</strong> ${formattedDateTime}</div>
              <div style="color: #333333 !important;"><strong style="color: #111111 !important;">Método de Pago:</strong> Tarjeta Corporativa •••• ${escapeHtml(last4)}</div>
              <div style="color: #333333 !important;"><strong style="color: #111111 !important;">Estado:</strong> <span style="color: #2e7d32 !important; font-weight: bold;">Procesado & Confirmado</span></div>
              <div style="color: #333333 !important;"><strong style="color: #111111 !important;">Agente Emisor:</strong> Sistema Automatizado JPV Pro</div>
            </td>
          </tr>
        </table>

        <!-- 3. TABLA DE VEHÍCULOS / PRODUCTOS -->
        <table style="width: 100%; border-collapse: collapse; font-size: 9.5px; margin-bottom: 14px;" cellpadding="0" cellspacing="0">
          <thead>
            <tr style="background: #111111 !important; color: #ffffff !important;">
              <th style="width: 4%; padding: 7px 4px; text-align: center; color: #ffffff !important;">#</th>
              <th style="width: 12%; padding: 7px 4px; text-align: center; color: #ffffff !important;">Foto</th>
              <th style="width: 28%; padding: 7px 6px; text-align: left; color: #ffffff !important;">Vehículo / Modelo</th>
              <th style="width: 11%; padding: 7px 4px; text-align: center; color: #ffffff !important;">Tipo</th>
              <th style="width: 21%; padding: 7px 6px; text-align: left; color: #ffffff !important;">Detalle</th>
              <th style="width: 10%; padding: 7px 5px; text-align: right; color: #ffffff !important;">Precio</th>
              <th style="width: 4%; padding: 7px 4px; text-align: center; color: #ffffff !important;">Cant.</th>
              <th style="width: 10%; padding: 7px 6px; text-align: right; color: #ffffff !important;">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            ${tableRowsHtml}
          </tbody>
        </table>

        <!-- 4. RESUMEN DE TOTALES -->
        <table style="width: 100%; margin-top: 8px; font-size: 10px;" cellpadding="0" cellspacing="0">
          <tr>
            <td style="width: 56%; vertical-align: top; padding-right: 14px;">
              <p style="margin: 0; color: #777777 !important; font-size: 9.5px; line-height: 1.4;">
                * Este documento constituye una certificación legal y comercial de los servicios y compras pactadas con Luxury Motors Elite Corp. Todo vehículo cuenta con inspección técnica certificada de 150 puntos.
              </p>
            </td>
            <td style="width: 44%; vertical-align: top;">
              <table style="width: 100%; font-size: 10px;" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding: 3px 0; color: #333333 !important;">Subtotal Bruto:</td>
                  <td style="padding: 3px 0; text-align: right; color: #111111 !important; font-weight: bold;">${formatCurrency(totals.grossSubtotal)}</td>
                </tr>
                ${depositRowHtml}
                <tr>
                  <td style="padding: 3px 0; color: #333333 !important;">Impuestos & Tasas:</td>
                  <td style="padding: 3px 0; text-align: right; color: #111111 !important;">$0.00 (Exento)</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0 0 0; border-top: 2px solid #111111; font-size: 14px; font-weight: 800; color: #111111 !important;">TOTAL GENERAL:</td>
                  <td style="padding: 6px 0 0 0; border-top: 2px solid #111111; text-align: right; font-size: 14px; font-weight: 800; color: #111111 !important;">${formatCurrency(totals.totalGeneral)}</td>
                </tr>
              </table>
            </td>
          </tr>
        </table>

        <!-- 5. CLÁUSULAS LEGALES Y DOBLE FIRMA / GARANTÍA -->
        ${clausesHtml}

        <!-- 6. PIE DE PÁGINA DEL DOCUMENTO -->
        <div style="margin-top: 20px; border-top: 1px dashed #cccccc; padding-top: 8px; text-align: center; font-size: 8.5px; color: #888888 !important;">
          Documento generado automáticamente por el Sistema E-Commerce & Alquiler de Vehículos Premium | Arquitectura por Ing. Juancito Peña
        </div>
      </div>`;

    // Cerrar modales y limpiar backdrop ANTES de invocar html2pdf() para evitar congelamientos
    forceCleanupBootstrapModals();

    Swal.fire({
      title: "Generando Documento Oficial...",
      html: `Emitiendo <strong>${escapeHtml(filename)}</strong> con certificación digital.`,
      allowOutsideClick: false,
      background: "#0d121c",
      color: "#ffffff",
      didOpen: () => {
        Swal.showLoading();
      }
    });

    const opt = {
      margin: [8, 8, 8, 8],
      filename: filename,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: {
        scale: 2,
        scrollY: 0,
        scrollX: 0,
        useCORS: true,
        logging: false
      },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" }
    };

    setTimeout(() => {
      html2pdf()
        .set(opt)
        .from(htmlStringDefinitivo)
        .save()
        .then(() => {
          cart = [];
          updateCartUI();

          Swal.fire({
            icon: "success",
            title: "¡Transacción VIP Completada!",
            html: `Se ha descargado tu documento oficial:<br><strong style="color:#00d2ff;">${escapeHtml(filename)}</strong>`,
            background: "#0d121c",
            color: "#ffffff",
            confirmButtonColor: "#00bfff"
          });
        })
        .catch((err) => {
          console.error("Error generando PDF:", err);
          Swal.fire({
            icon: "error",
            title: "Error en Emisión PDF",
            text: "Ocurrió un inconveniente técnico al renderizar el archivo.",
            background: "#0d121c",
            color: "#ffffff"
          });
        });
    }, 350);
  }

  // ==========================================================================
  // 10. EVENT LISTENERS & DELEGACIÓN DE EVENTOS
  // ==========================================================================
  document.addEventListener("DOMContentLoaded", () => {
    loadCatalogData();
    updateCartUI();

    // Tabs de Categoría
    document.querySelectorAll("#categoryTabs .nav-link").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        document.querySelectorAll("#categoryTabs .nav-link").forEach((b) => b.classList.remove("active"));
        e.currentTarget.classList.add("active");
        activeCategory = e.currentTarget.dataset.category;
        renderCatalog();
      });
    });

    // Buscador en Tiempo Real
    const searchInput = document.getElementById("searchInput");
    const clearSearchBtn = document.getElementById("clearSearchBtn");

    searchInput.addEventListener("input", (e) => {
      searchQuery = e.target.value;
      clearSearchBtn.classList.toggle("d-none", searchQuery.length === 0);
      renderCatalog();
    });

    clearSearchBtn.addEventListener("click", () => {
      searchInput.value = "";
      searchQuery = "";
      clearSearchBtn.classList.add("d-none");
      renderCatalog();
    });

    document.getElementById("resetFiltersBtn").addEventListener("click", () => {
      activeCategory = "todos";
      searchQuery = "";
      searchInput.value = "";
      clearSearchBtn.classList.add("d-none");
      document.querySelectorAll("#categoryTabs .nav-link").forEach((b) => {
        b.classList.toggle("active", b.dataset.category === "todos");
      });
      renderCatalog();
    });

    // Delegación de Botones en Tarjetas (Alquilar / Comprar)
    document.getElementById("catalogGrid").addEventListener("click", (e) => {
      const rentBtn = e.target.closest(".btn-open-rental");
      if (rentBtn) {
        openRentalModal(rentBtn.dataset.codigo);
        return;
      }

      const buyBtn = e.target.closest(".btn-direct-buy");
      if (buyBtn) {
        addDirectPurchaseToCart(buyBtn.dataset.codigo);
      }
    });

    // Eventos Reactivos del Modal de Alquiler
    document.querySelectorAll('input[name="rentalMode"]').forEach((radio) => {
      radio.addEventListener("change", updateRentalCalculation);
    });
    document.getElementById("rentalDurationInput").addEventListener("input", updateRentalCalculation);
    document.getElementById("confirmAddRentalBtn").addEventListener("click", addRentalToCart);

    // Eventos del Carrito (Incrementar, Decrementar, Eliminar, Vaciar)
    document.getElementById("cartItemsContainer").addEventListener("click", (e) => {
      const incBtn = e.target.closest(".btn-qty-inc");
      const decBtn = e.target.closest(".btn-qty-dec");
      const remBtn = e.target.closest(".btn-remove-item");

      if (incBtn) {
        const item = cart.find((i) => i.cartKey === incBtn.dataset.key);
        if (item) {
          item.cantidad += 1;
          updateCartUI();
        }
      } else if (decBtn) {
        const idx = cart.findIndex((i) => i.cartKey === decBtn.dataset.key);
        if (idx !== -1) {
          if (cart[idx].cantidad > 1) {
            cart[idx].cantidad -= 1;
          } else {
            cart.splice(idx, 1);
          }
          updateCartUI();
        }
      } else if (remBtn) {
        cart = cart.filter((i) => i.cartKey !== remBtn.dataset.key);
        updateCartUI();
      }
    });

    document.getElementById("clearCartBtn").addEventListener("click", () => {
      if (cart.length === 0) return;
      cart = [];
      updateCartUI();
    });

    // Avanzar al Checkout
    document.getElementById("proceedToCheckoutBtn").addEventListener("click", () => {
      if (cart.length === 0) {
        Swal.fire({
          icon: "info",
          title: "Orden Vacía",
          text: "Agrega al menos un vehículo o motocicleta antes de pasar a caja.",
          background: "#0d121c",
          color: "#ffffff",
          confirmButtonColor: "#00bfff"
        });
        return;
      }

      const cartModal = bootstrap.Modal.getInstance(document.getElementById("cartModal"));
      if (cartModal) cartModal.hide();

      const checkoutModal = bootstrap.Modal.getOrCreateInstance(document.getElementById("checkoutModal"));
      checkoutModal.show();
    });

    // Botón 1-Click Datos Ficticios VIP
    document.getElementById("fillDemoDataBtn").addEventListener("click", () => {
      fillDemoVipData();
      Swal.fire({
        icon: "info",
        title: "Datos VIP Restablecidos",
        text: "Formulario completado con las credenciales corporativas de prueba.",
        background: "#0d121c",
        color: "#ffffff",
        timer: 1400,
        showConfirmButton: false
      });
    });

    // Procesar Pago y Generar PDF Oficial
    document.getElementById("processPaymentAndPdfBtn").addEventListener("click", processCheckoutAndGeneratePdf);
  });
})();