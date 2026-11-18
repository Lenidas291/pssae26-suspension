/* ==========================================================================
   PSSAE26 AETHERIA · CONTROLADOR PRINCIPAL (FLUJO NIER:AUTOMATA + SIMULADOR)
   Autor de Apuntes Base: Leonardo Galeote · Politécnico Scudería SAE
   ========================================================================== */

(function () {
  const STORAGE_KEY_VEHICLES = 'pssae26_aetheria_vehicles_v3';
  const STOCK_VEHICLES = JSON.parse(JSON.stringify(window.AETHERIA_VEHICLES));

  const CAR_PHOTOS = [
    {
      src: 'assets/car/aetheria_side.jpg',
      title: 'VISTA LATERAL · PSSAE26 AETHERIA #88',
      caption: 'Perfil aerodinámico y batalla (Wheelbase) con librea oficial Ink, Teal y Ciruela.'
    },
    {
      src: 'assets/car/aetheria_front.jpg',
      title: 'VISTA FRONTAL · DOBLE HORQUILLA (SLA) & PUSHROD',
      caption: 'Geometría frontal de horquillas desiguales, pushrods y amortiguadores horizontales superiores.'
    },
    {
      src: 'assets/car/aetheria_top_susp.jpg',
      title: 'VISTA SUPERIOR · EMPAQUETAMIENTO DE SUSPENSIÓN DELANTERA',
      caption: 'Triángulos de suspensión superior/inferior, bieletas de dirección y rockers con dampers gemelos.'
    },
    {
      src: 'assets/car/aetheria_nose_side.jpg',
      title: 'DETALLE 3/4 · "TOGETHER, WE ARE STRONGER"',
      caption: 'Integración de alerón delantero, nariz de impacto y anclajes interiores al monocasco.'
    },
    {
      src: 'assets/car/aetheria_wing_iso.jpg',
      title: 'PERSPECTIVA ISOMÉTRICA · "TOGETHER, WE GO FURTHER"',
      caption: 'Flujo hacia los pontones y brazo de suspensión delantero del PSSAE26 Aetheria.'
    }
  ];

  const state = {
    currentScreen: 'screenMainMenu',
    activeTopicId: 'camber',
    activeVehicleId: 'aetheria_2026',
    activeCamera: 'camber_thermal',
    bgSlideIndex: 0,
    vehicles: loadSavedVehicles()
  };

  function loadSavedVehicles() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY_VEHICLES);
      if (raw) {
        return Object.assign(JSON.parse(JSON.stringify(window.AETHERIA_VEHICLES)), JSON.parse(raw));
      }
    } catch (e) {
      console.warn('Error leyendo almacenamiento local:', e);
    }
    return JSON.parse(JSON.stringify(window.AETHERIA_VEHICLES));
  }

  function saveVehicles() {
    try {
      localStorage.setItem(STORAGE_KEY_VEHICLES, JSON.stringify(state.vehicles));
    } catch (e) {
      console.warn('Error guardando vehículos:', e);
    }
  }

  function getCurrentTopic() {
    return window.AETHERIA_CURRICULUM.find((t) => t.id === state.activeTopicId) || window.AETHERIA_CURRICULUM[0];
  }

  function getCurrentVehicle() {
    return state.vehicles[state.activeVehicleId] || state.vehicles.aetheria_2026;
  }

  function getStockVehicle(id) {
    return STOCK_VEHICLES[id] || STOCK_VEHICLES.aetheria_2026;
  }

  /* ========================================================================
     NAVEGACIÓN ENTRE PANTALLAS (MENÚ NIER -> SUSPENSIÓN -> TEMAS -> ÁNGULOS)
     ======================================================================== */
  function showScreen(screenId) {
    state.currentScreen = screenId;
    document.querySelectorAll('.app-screen').forEach((sc) => {
      sc.classList.toggle('active', sc.id === screenId);
    });

    // Ocultar fondo animado de fotos cuando estemos dentro del laboratorio widescreen para máxima nitidez
    const bgEl = document.getElementById('animatedCarBg');
    if (bgEl) {
      bgEl.style.display = screenId === 'screenStudyAngles' ? 'none' : 'block';
    }

    if (screenId === 'screenStudyAngles') {
      // Asegurar redimensionado del canvas a 100% ancho horizontal tras hacer visible la pantalla
      requestAnimationFrame(() => {
        updateStudyLab();
      });
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  /* ========================================================================
     CARRUSEL DE FONDO ANIMADO CON LAS 5 FOTOS DEL PSSAE26 AETHERIA
     ======================================================================== */
  function initAnimatedCarBackground() {
    const slides = document.querySelectorAll('.car-bg-slide');
    if (!slides.length) return;

    setInterval(() => {
      state.bgSlideIndex = (state.bgSlideIndex + 1) % slides.length;
      slides.forEach((sl, idx) => {
        sl.classList.toggle('active', idx === state.bgSlideIndex);
      });
    }, 5500);

    // Miniaturas interactivas en la tarjeta de vista previa del Menú Principal
    const thumbsContainer = document.getElementById('nierCarThumbs');
    const showcaseImg = document.getElementById('nierShowcaseImg');
    const showcaseTitle = document.getElementById('nierShowcaseTitle');
    const showcaseCaption = document.getElementById('nierShowcaseCaption');

    if (thumbsContainer && showcaseImg) {
      thumbsContainer.innerHTML = CAR_PHOTOS.map(
        (p, idx) => `
        <button type="button" class="nier-thumb-btn ${idx === 0 ? 'active' : ''}" data-photo-idx="${idx}" title="${p.title}">
          <img src="${p.src}" alt="${p.title}" />
        </button>
      `
      ).join('');

      thumbsContainer.querySelectorAll('.nier-thumb-btn').forEach((btn) => {
        btn.addEventListener('click', () => {
          const idx = parseInt(btn.getAttribute('data-photo-idx'), 10);
          const photo = CAR_PHOTOS[idx];
          showcaseImg.src = photo.src;
          if (showcaseTitle) showcaseTitle.textContent = photo.title;
          if (showcaseCaption) showcaseCaption.textContent = photo.caption;

          thumbsContainer.querySelectorAll('.nier-thumb-btn').forEach((b, i) => {
            b.classList.toggle('active', i === idx);
          });
        });
      });
    }
  }

  /* ========================================================================
     EVENTOS DE BOTONES DE MENÚ Y ELEMENTOS BLOQUEADOS
     ======================================================================== */
  function initMenuNavigation() {
    // Navegación entre pantallas desbloqueadas
    document.querySelectorAll('[data-nav-target]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const target = btn.getAttribute('data-nav-target');
        if (target) showScreen(target);
      });
    });

    // Efecto visual de bloqueo estilo NieR cuando hacen clic en módulos futuros bloqueados
    document.querySelectorAll('.nier-menu-btn.locked').forEach((btn) => {
      btn.addEventListener('click', () => {
        btn.classList.remove('shake');
        void btn.offsetWidth; // reflow
        btn.classList.add('shake');
        const msgEl = document.getElementById('nierSystemNotice');
        if (msgEl) {
          const moduleName = btn.getAttribute('data-module-name') || 'Este módulo';
          msgEl.textContent = `// AVISO DEL SISTEMA: [${moduleName}] bloqueado en esta versión. Accede a [SUSPENSIÓN ➔ ESTUDIO-APRENDIZAJE ➔ ÁNGULOS DE SUSPENSIÓN].`;
        }
      });
    });
  }

  /* ========================================================================
     PANTALLA 4: LABORATORIO DE ÁNGULOS DE SUSPENSIÓN
     ======================================================================== */
  function renderTopAngleTabs() {
    const strip = document.getElementById('angleTabsStrip');
    if (!strip) return;

    strip.innerHTML = window.AETHERIA_CURRICULUM.map((topic) => {
      const isActive = topic.id === state.activeTopicId;
      return `
        <button type="button" class="angle-tab-item ${isActive ? 'active' : ''}" data-topic-id="${topic.id}">
          ${topic.shortTitle}
        </button>
      `;
    }).join('');

    strip.querySelectorAll('.angle-tab-item').forEach((btn) => {
      btn.addEventListener('click', () => {
        state.activeTopicId = btn.getAttribute('data-topic-id');
        const topic = getCurrentTopic();
        // Cambia automáticamente la cámara del modelo cuando cambiamos de ángulo de suspensión
        state.activeCamera = topic.defaultCamera;
        renderTopAngleTabs();
        updateStudyLab();
      });
    });
  }

  function renderVehiclePresets() {
    const matrix = document.getElementById('vehiclePresetMatrix');
    if (!matrix) return;

    matrix.innerHTML = Object.values(state.vehicles)
      .map((veh) => {
        const isActive = veh.id === state.activeVehicleId;
        return `
        <button type="button" class="preset-tile ${isActive ? 'active' : ''}" data-veh-id="${veh.id}">
          <span class="arch-name">${veh.archTitle}</span>
          <span class="car-name">${veh.carName}</span>
        </button>
      `;
      })
      .join('');

    matrix.querySelectorAll('.preset-tile').forEach((tile) => {
      tile.addEventListener('click', () => {
        state.activeVehicleId = tile.getAttribute('data-veh-id');
        renderVehiclePresets();
        updateStudyLab();
      });
    });
  }

  function renderSliders(topic, vehicle) {
    const container = document.getElementById('slidersGrid');
    if (!container) return;

    const stockSpecs = getStockVehicle(vehicle.id).specs;

    container.innerHTML = topic.sliders
      .map((s) => {
        const currentVal = vehicle.specs[s.key];
        const stockVal = stockSpecs[s.key];
        const isModified = Math.abs(currentVal - stockVal) > 0.001;

        let formattedReadout = `${currentVal} ${s.unit}`;
        if (s.unit === 'mm') {
          formattedReadout = `${currentVal} mm (${(currentVal / 25.4).toFixed(2)}")`;
        }

        return `
        <div class="slider-block">
          <div class="slider-top-row">
            <label class="slider-label" for="slider_${s.key}">${s.label}</label>
            <div class="slider-value-group">
              <span class="slider-readout" id="readout_${s.key}">${formattedReadout}</span>
              <button type="button" class="btn-stock ${isModified ? 'is-modified' : ''}" data-reset-key="${s.key}">
                Stock
              </button>
            </div>
          </div>
          <input
            type="range"
            id="slider_${s.key}"
            class="aetheria-slider"
            data-param-key="${s.key}"
            data-unit="${s.unit}"
            min="${s.min}"
            max="${s.max}"
            step="${s.step}"
            value="${currentVal}"
          />
          <p class="slider-help-text">${s.help}</p>
        </div>
      `;
      })
      .join('');

    container.querySelectorAll('.aetheria-slider').forEach((input) => {
      input.addEventListener('input', (e) => {
        const key = e.target.getAttribute('data-param-key');
        const unit = e.target.getAttribute('data-unit');
        const val = parseFloat(e.target.value);
        vehicle.specs[key] = val;
        saveVehicles();

        const readoutEl = document.getElementById(`readout_${key}`);
        if (readoutEl) {
          readoutEl.textContent =
            unit === 'mm' ? `${val} mm (${(val / 25.4).toFixed(2)}")` : `${val} ${unit}`;
        }

        const kin = window.AetheriaKinematics.compute(vehicle.specs);
        updateCanvasAndTelemetry(topic, vehicle, kin);
      });
    });

    container.querySelectorAll('.btn-stock').forEach((btn) => {
      btn.addEventListener('click', () => {
        const key = btn.getAttribute('data-reset-key');
        vehicle.specs[key] = stockSpecs[key];
        saveVehicles();
        updateStudyLab();
      });
    });
  }

  function updateCanvasAndTelemetry(topic, vehicle, kin) {
    const captionEl = document.getElementById('canvasTopCaption');
    if (captionEl) {
      captionEl.textContent = `${topic.cameraLabel} · ${vehicle.carName} (${vehicle.archTitle}) · Rolido: ${vehicle.specs.rollAngleDeg}°`;
    }

    const teleBar = document.getElementById('fullwidthTelemetryBar');
    if (teleBar) {
      teleBar.innerHTML = `
        <div class="tele-item">
          <span class="tele-label">Camber Din. Exterior</span>
          <span class="tele-value">${kin.dynamicCamberOuter}° (${kin.ccrDegPerInch}°/in)</span>
        </div>
        <div class="tele-item">
          <span class="tele-label">Roll Center (ΔY, Z)</span>
          <span class="tele-value">Y: ${kin.rollCenterDynY} mm | Z: ${kin.rollCenterZ} mm</span>
        </div>
        <div class="tele-item">
          <span class="tele-label">Instant Center Ext (IC)</span>
          <span class="tele-value">(${kin.icForLeftWheel_Y}, ${kin.icForLeftWheel_Z}) mm</span>
        </div>
        <div class="tele-item">
          <span class="tele-label">Instant Center Int (IC)</span>
          <span class="tele-value">(${kin.icForRightWheel_Y}, ${kin.icForRightWheel_Z}) mm</span>
        </div>
        <div class="tele-item">
          <span class="tele-label">Anti-Dive / Anti-Squat</span>
          <span class="tele-value">${kin.antiDivePct}% / ${kin.antiSquatPct}%</span>
        </div>
        <div class="tele-item">
          <span class="tele-label">Huella / Temp (Ti vs To)</span>
          <span class="tele-value">${kin.contactPatchPct}% (${kin.tInner}°C / ${kin.tOuter}°C)</span>
        </div>
      `;
    }

    const canvas = document.getElementById('suspensionCanvas');
    window.AetheriaBlueprintRenderer.draw(canvas, state.activeCamera, vehicle, kin);
  }

  /* ========================================================================
     SECCIÓN INFERIOR A ANCHO COMPLETO: 80% APUNTES LEONARDO GALEOTE +
     ANALOGÍAS Y FOTOS REALES + 20% LIBROS NOTEBOOKLM
     ======================================================================== */
  function renderHorizontalKnowledgeSection(topic, vehicle, kin) {
    const container = document.getElementById('fullwidthKnowledgeSection');
    if (!container) return;

    container.innerHTML = `
      <!-- 1. Encabezado del Ángulo y Créditos de Autoría -->
      <header class="knowledge-header-banner">
        <div>
          <span class="nier-system-tag">// TEMA 01 · ÁNGULOS DE SUSPENSIÓN · MÓDULO ${topic.num}</span>
          <h1 class="knowledge-title">${topic.title}</h1>
          <p class="knowledge-lead">${topic.lead}</p>
        </div>
        <div class="author-citation-badges">
          <span class="nier-badge">80% APUNTES DE AUTOR: ${topic.primaryAuthor.toUpperCase()}</span>
          <span class="nier-badge plum">20% LIBRO CITADO: ${topic.bookCitation.toUpperCase()}</span>
        </div>
      </header>

      <!-- 2. Bloque Principal (80%): Apuntes de Mentoría de Leonardo Galeote (A lo ancho de la pantalla) -->
      <section class="horizontal-panel">
        <div class="horizontal-panel-header">
          <h2 class="horizontal-panel-title">Desarrollo Conceptual y Casos Prácticos (80% Base de Apuntes)</h2>
          <span class="author-tag">Autor: Leonardo Galeote · Politécnico Scudería SAE</span>
        </div>
        <div class="notes-horizontal-grid">
          ${topic.samsungNotesCore
            .map(
              (item) => `
            <article class="note-card">
              <h4>${item.title}</h4>
              <p>${item.body}</p>
              <div class="note-author-foot">Fuente: ${item.author}</div>
            </article>
          `
            )
            .join('')}
        </div>
      </section>

      <!-- 3. Bloque Visual Horizontal: Analogía Física + Diagrama del Apunte + Foto Real PSSAE26 Aetheria -->
      <section class="horizontal-panel">
        <div class="horizontal-panel-header">
          <h2 class="horizontal-panel-title">Analogía Física, Esquema del Apunte y Aplicación en PSSAE26 Aetheria</h2>
          <span class="author-tag">Autor: Leonardo Galeote · Ejemplos Interactivos</span>
        </div>
        <div class="analogy-visual-grid">
          <div class="analogy-box">
            <span class="nier-system-tag">// ANALOGÍA PRÁCTICA PARA NUEVOS MIEMBROS</span>
            <h4>${topic.analogy.title}</h4>
            <p style="color:#C7D6D8;font-size:14px;line-height:1.6;margin:0;">${topic.analogy.body}</p>
            <div style="margin-top:auto;padding-top:10px;font-family:var(--font-mono);font-size:11px;color:var(--teal300);">
              Crédito: ${topic.analogy.author}
            </div>
          </div>

          <div class="svg-diagram-card">
            ${topic.svgDiagram}
            <span style="font-family:var(--font-mono);font-size:10.5px;color:#9BB0B3;margin-top:8px;">
              Recreación vectorial del apunte de Leonardo Galeote
            </span>
          </div>

          <div class="car-photo-evidence-card">
            <img src="${topic.carPhoto}" alt="PSSAE26 Aetheria - ${topic.shortTitle}" />
            <div class="photo-caption">
              <strong style="color:var(--teal300);font-family:var(--font-mono);display:block;margin-bottom:4px;">
                EVIDENCIA EN NUESTRO MONOPLAZA (PSSAE26 AETHERIA):
              </strong>
              ${topic.carPhotoCaption}
            </div>
          </div>
        </div>
      </section>

      <!-- 4. Preguntas de Reflexión al Margen del Apunte (Horizontal) -->
      <section class="horizontal-panel">
        <div class="horizontal-panel-header">
          <h2 class="horizontal-panel-title">Preguntas al Margen del Apunte Resueltas</h2>
          <span class="author-tag">Preguntas formuladas por: Leonardo Galeote</span>
        </div>
        <div class="margin-qa-horizontal-grid">
          ${topic.marginQuestions
            .map(
              (mq) => `
            <div class="qa-card">
              <h4 class="qa-card-q">❓ ${mq.q}</h4>
              <p class="qa-card-a">${mq.a}</p>
              <div class="qa-card-cite">${mq.cite}</div>
            </div>
          `
            )
            .join('')}
        </div>
      </section>

      <!-- 5. Complemento Bibliográfico (20%): Cuaderno de Mentorías en Gemini NotebookLM -->
      <section class="horizontal-panel">
        <div class="horizontal-panel-header">
          <h2 class="horizontal-panel-title">${topic.engineeringComplement.title}</h2>
          <span class="author-tag">${topic.engineeringComplement.bookSource}</span>
        </div>
        <div class="book-complement-grid">
          <div>
            <p style="font-size:14.5px;color:#C7D6D8;line-height:1.65;margin-top:0;">
              ${topic.engineeringComplement.body}
            </p>
            <div style="font-family:var(--font-mono);font-size:11.5px;color:var(--plum400);margin-top:12px;">
              Referencia del Cuaderno de Mentorías de Suspensión · ${topic.bookCitation}
            </div>
          </div>
          <div class="formula-hud-box">
            <div class="formula-hud-main">${formatFormulaReadable(topic.engineeringComplement.formula)}</div>
            <div class="formula-hud-vars">${topic.engineeringComplement.formulaVars}</div>
          </div>
        </div>
      </section>
    `;
  }

  function formatFormulaReadable(raw) {
    return raw
      .replace(/\\text\{([^}]+)\}/g, '$1')
      .replace(/\\frac\{([^}]+)\}\{([^}]+)\}/g, '($1) / ($2)')
      .replace(/\\cdot/g, '·')
      .replace(/\\quad/g, '   ')
      .replace(/\\tan\^\{-1\}/g, 'arctan')
      .replace(/\\tan/g, 'tan')
      .replace(/\\sin/g, 'sin')
      .replace(/\\cos/g, 'cos')
      .replace(/\\cot/g, 'cot')
      .replace(/\\Delta/g, 'Δ')
      .replace(/\\gamma/g, 'γ')
      .replace(/\\theta/g, 'θ')
      .replace(/\\delta/g, 'δ')
      .replace(/\\phi/g, 'φ')
      .replace(/\\beta/g, 'β')
      .replace(/\\mu/g, 'μ')
      .replace(/\\eta/g, 'η')
      .replace(/\\approx/g, '≈')
      .replace(/\\iff/g, '⇔')
      .replace(/\\cap/g, '∩')
      .replace(/\\%/g, '%')
      .replace(/\\left\(/g, '(')
      .replace(/\\right\)/g, ')')
      .replace(/_/g, '');
  }

  function updateStudyLab() {
    const topic = getCurrentTopic();
    const vehicle = getCurrentVehicle();
    const kin = window.AetheriaKinematics.compute(vehicle.specs);

    renderSliders(topic, vehicle);
    updateCanvasAndTelemetry(topic, vehicle, kin);
    renderHorizontalKnowledgeSection(topic, vehicle, kin);
  }

  function init() {
    initAnimatedCarBackground();
    initMenuNavigation();
    renderTopAngleTabs();
    renderVehiclePresets();

    const btnResetStockAll = document.getElementById('btnBackToStockAll');
    if (btnResetStockAll) {
      btnResetStockAll.addEventListener('click', () => {
        const stock = getStockVehicle(state.activeVehicleId);
        state.vehicles[state.activeVehicleId].specs = JSON.parse(JSON.stringify(stock.specs));
        saveVehicles();
        updateStudyLab();
      });
    }

    window.addEventListener('resize', () => {
      if (state.currentScreen === 'screenStudyAngles') {
        const topic = getCurrentTopic();
        const vehicle = getCurrentVehicle();
        const kin = window.AetheriaKinematics.compute(vehicle.specs);
        updateCanvasAndTelemetry(topic, vehicle, kin);
      }
    });
  }

  document.addEventListener('DOMContentLoaded', init);
})();
