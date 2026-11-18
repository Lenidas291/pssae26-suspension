/* ==========================================================================
   PSSAE26 AETHERIA · RENDERIZADOR BLUEPRINT WIDESCREEN (100% ANCHO HORIZONTAL)
   Visualiza en tiempo real la migración de los Centros Instantáneos (IC) y
   del Roll Center (RC) durante el Rolido en Curva, con estética táctica NieR.
   ========================================================================== */

window.AetheriaBlueprintRenderer = {
  draw(canvas, cameraMode, vehicle, kin) {
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    const w = Math.max(480, rect.width);
    const h = Math.max(340, rect.height);

    if (canvas.width !== Math.round(w * dpr) || canvas.height !== Math.round(h * dpr)) {
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
    }

    ctx.save();
    ctx.scale(dpr, dpr);

    // 1. Fondo Blueprint Táctico PSSAE
    ctx.fillStyle = '#081114';
    ctx.fillRect(0, 0, w, h);
    this.drawTacticalGrid(ctx, w, h);

    const specs = vehicle.specs;

    switch (cameraMode) {
      case 'side_full':
        this.drawSideFullView(ctx, w, h, vehicle, specs, kin);
        break;
      case 'camber_thermal':
        this.drawCamberThermalView(ctx, w, h, vehicle, specs, kin);
        break;
      case 'top_toe':
        this.drawTopToeView(ctx, w, h, vehicle, specs, kin);
        break;
      case 'front_upright':
        this.drawFrontUprightKPIView(ctx, w, h, vehicle, specs, kin);
        break;
      case 'side_upright':
        this.drawSideUprightCasterView(ctx, w, h, vehicle, specs, kin);
        break;
      case 'top_ackermann':
        this.drawTopAckermannView(ctx, w, h, vehicle, specs, kin);
        break;
      case 'front_full':
      default:
        this.drawFrontFullView(ctx, w, h, vehicle, specs, kin);
        break;
    }

    ctx.restore();
  },

  drawTacticalGrid(ctx, w, h) {
    const step = 32;
    ctx.strokeStyle = 'rgba(34, 56, 60, 0.38)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    for (let x = step; x < w; x += step) {
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
    }
    for (let y = step; y < h; y += step) {
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
    }
    ctx.stroke();

    // Cruces tácticas estilo NieR en la retícula
    ctx.fillStyle = 'rgba(111, 208, 216, 0.22)';
    for (let x = step * 3; x < w; x += step * 4) {
      for (let y = step * 2; y < h; y += step * 3) {
        ctx.fillRect(x - 3, y - 0.5, 6, 1);
        ctx.fillRect(x - 0.5, y - 3, 1, 6);
      }
    }
  },

  drawGroundLine(ctx, x1, x2, groundY) {
    ctx.strokeStyle = '#9BB0B3';
    ctx.lineWidth = 1.8;
    ctx.beginPath();
    ctx.moveTo(x1, groundY);
    ctx.lineTo(x2, groundY);
    ctx.stroke();

    ctx.strokeStyle = 'rgba(155, 176, 179, 0.32)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    for (let x = x1 + 8; x < x2 - 4; x += 14) {
      ctx.moveTo(x, groundY);
      ctx.lineTo(x - 9, groundY + 11);
    }
    ctx.stroke();
  },

  drawCGIcon(ctx, x, y, r = 11, label = 'CG') {
    ctx.save();
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fillStyle = '#0E1B1E';
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#FFFFFF';
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.arc(x, y, r, 0, Math.PI / 2);
    ctx.closePath();
    ctx.fillStyle = '#FFFFFF';
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.arc(x, y, r, Math.PI, Math.PI * 1.5);
    ctx.closePath();
    ctx.fillStyle = '#FFFFFF';
    ctx.fill();

    ctx.fillStyle = '#FFFFFF';
    ctx.font = '600 10.5px "IBM Plex Mono", monospace';
    ctx.textAlign = 'center';
    ctx.fillText(label, x, y - r - 6);
    ctx.restore();
  },

  drawICMarker(ctx, x, y, label = 'IC', color = '#E0A84B', isGhost = false) {
    ctx.save();
    ctx.globalAlpha = isGhost ? 0.35 : 1.0;
    ctx.strokeStyle = color;
    ctx.lineWidth = isGhost ? 1.2 : 2.2;
    ctx.beginPath();
    ctx.arc(x, y, isGhost ? 6 : 9, 0, Math.PI * 2);
    ctx.stroke();

    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, isGhost ? 2.5 : 3.5, 0, Math.PI * 2);
    ctx.fill();

    ctx.font = '700 11px "IBM Plex Mono", monospace';
    ctx.textAlign = 'center';
    ctx.fillText(label, x, y - 14);
    ctx.restore();
  },

  /* ========================================================================
     1. VISTA FRONTAL WIDESCREEN CON MIGRACIÓN EN VIVO DE IC Y ROLL CENTER
     Aprovecha todo el ancho horizontal para dar total libertad al Instant Center
     ======================================================================== */
  drawFrontFullView(ctx, w, h, vehicle, specs, kin) {
    const groundY = h - 54;
    this.drawGroundLine(ctx, 24, w - 24, groundY);

    const centerX = w / 2;
    // Escala calibrada para que el vehículo ocupe el centro y deje amplio espacio a los lados para los Instant Centers
    const maxDisplayedSpanMm = Math.max(specs.trackFront * 2.55, Math.min(3800, kin.fvsaLengthMm * 2.15));
    const scale = Math.min((w * 0.84) / maxDisplayedSpanMm, (h * 0.54) / Math.max(300, specs.tireRadius * 2));

    const halfTrackPx = (specs.trackFront / 2) * scale;
    const tireW_px = Math.max(24, specs.tireWidth * scale);
    const tireH_px = Math.max(60, specs.tireRadius * 2 * scale);

    const leftWheelX = centerX - halfTrackPx;
    const rightWheelX = centerX + halfTrackPx;

    const deg2rad = Math.PI / 180;
    const rollRad = (specs.rollAngleDeg || 0) * deg2rad;

    // Puntos exteriores en mangueta izquierda y derecha
    const ubjLeftX = centerX - kin.y1_ubj * scale;
    const ubjLeftY = groundY - kin.z1_ubj * scale;
    const lbjLeftX = centerX - kin.y3_lbj * scale;
    const lbjLeftY = groundY - kin.z3_lbj * scale;

    const ubjRightX = centerX + kin.y1_ubj * scale;
    const ubjRightY = ubjLeftY;
    const lbjRightX = centerX + kin.y3_lbj * scale;
    const lbjRightY = lbjLeftY;

    // Pivotes interiores dinámicos según el ángulo de rolido en curva
    const ucaLeftRad = kin.ucaAngleLeftDyn * deg2rad;
    const lcaLeftRad = kin.lcaAngleLeftDyn * deg2rad;
    const ucaRightRad = kin.ucaAngleRightDyn * deg2rad;
    const lcaRightRad = kin.lcaAngleRightDyn * deg2rad;

    const ucaInLeftX = ubjLeftX + specs.ucaLength * scale * Math.cos(ucaLeftRad);
    const ucaInLeftY = ubjLeftY + specs.ucaLength * scale * Math.sin(ucaLeftRad);
    const lcaInLeftX = lbjLeftX + specs.lcaLength * scale * Math.cos(lcaLeftRad);
    const lcaInLeftY = lbjLeftY + specs.lcaLength * scale * Math.sin(lcaLeftRad);

    const ucaInRightX = ubjRightX - specs.ucaLength * scale * Math.cos(ucaRightRad);
    const ucaInRightY = ubjRightY + specs.ucaLength * scale * Math.sin(ucaRightRad);
    const lcaInRightX = lbjRightX - specs.lcaLength * scale * Math.cos(lcaRightRad);
    const lcaInRightY = lbjRightY + specs.lcaLength * scale * Math.sin(lcaRightRad);

    // Coordenadas en pantalla de los Instant Centers ESTÁTICOS (Fantasma 0° Roll)
    const icStaticForLeft_X = centerX - kin.icFrontY * scale;
    const icStaticForRight_X = centerX + kin.icFrontY * scale;
    const icStatic_Y = groundY - kin.icFrontZ * scale;
    const rcStatic_Y = groundY - kin.rollCenterStaticZ * scale;

    // Coordenadas en pantalla de los Instant Centers DINÁMICOS (Bajo Rolido)
    const icDynForLeft_X = centerX + kin.icForLeftWheel_Y * scale;
    const icDynForLeft_Y = groundY - kin.icForLeftWheel_Z * scale;

    const icDynForRight_X = centerX + kin.icForRightWheel_Y * scale;
    const icDynForRight_Y = groundY - kin.icForRightWheel_Z * scale;

    const rcDyn_X = centerX + kin.rollCenterDynY * scale;
    const rcDyn_Y = groundY - kin.rollCenterZ * scale;

    // A. Si hay Rolido activo, dibujar primero la posición estática en fantasma y el vector de migración
    if (Math.abs(specs.rollAngleDeg) > 0.05 || Math.abs(specs.heaveMm) > 0.5) {
      this.drawICMarker(
        ctx,
        Math.min(w - 30, Math.max(30, icStaticForLeft_X)),
        Math.min(groundY - 12, Math.max(28, icStatic_Y)),
        'IC₀ (Estático)',
        '#7A8C8F',
        true
      );
      this.drawICMarker(
        ctx,
        Math.min(w - 30, Math.max(30, icStaticForRight_X)),
        Math.min(groundY - 12, Math.max(28, icStatic_Y)),
        'IC₀ (Estático)',
        '#7A8C8F',
        true
      );

      // Punto RC Estático fantasma
      ctx.save();
      ctx.globalAlpha = 0.45;
      ctx.strokeStyle = '#9BB0B3';
      ctx.beginPath();
      ctx.arc(centerX, rcStatic_Y, 5, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();
    }

    // B. Paso 1 del Apunte: Proyección de las horquillas hacia los Instant Centers Dinámicos
    if (kin.fvsaLengthMm < 4400) {
      ctx.save();
      ctx.setLineDash([5, 4]);
      ctx.strokeStyle = 'rgba(224, 168, 75, 0.65)';
      ctx.lineWidth = 1.4;
      ctx.beginPath();
      // Rueda izquierda hacia su IC dinámico (a la derecha)
      ctx.moveTo(ubjLeftX, ubjLeftY);
      ctx.lineTo(icDynForLeft_X, icDynForLeft_Y);
      ctx.moveTo(lbjLeftX, lbjLeftY);
      ctx.lineTo(icDynForLeft_X, icDynForLeft_Y);

      // Rueda derecha hacia su IC dinámico (a la izquierda)
      ctx.moveTo(ubjRightX, ubjRightY);
      ctx.lineTo(icDynForRight_X, icDynForRight_Y);
      ctx.moveTo(lbjRightX, lbjRightY);
      ctx.lineTo(icDynForRight_X, icDynForRight_Y);
      ctx.stroke();

      // C. Paso 2 del Apunte: Trazar línea desde el centro del Contact Patch hasta el IC (Línea Teal punteada)
      ctx.strokeStyle = '#6FD0D8';
      ctx.lineWidth = 1.8;
      ctx.beginPath();
      ctx.moveTo(leftWheelX, groundY);
      ctx.lineTo(icDynForLeft_X, icDynForLeft_Y);
      ctx.moveTo(rightWheelX, groundY);
      ctx.lineTo(icDynForRight_X, icDynForRight_Y);
      ctx.stroke();
      ctx.restore();

      // Marcadores de los Instant Centers Dinámicos (Con libertad horizontal completa)
      const clampX_L = Math.min(w - 36, Math.max(36, icDynForLeft_X));
      const clampY_L = Math.min(groundY - 12, Math.max(30, icDynForLeft_Y));
      const clampX_R = Math.min(w - 36, Math.max(36, icDynForRight_X));
      const clampY_R = Math.min(groundY - 12, Math.max(30, icDynForRight_Y));

      this.drawICMarker(ctx, clampX_L, clampY_L, `I.C. Ext (${kin.icForLeftWheel_Y}, ${kin.icForLeftWheel_Z})`, '#E0A84B', false);
      this.drawICMarker(ctx, clampX_R, clampY_R, `I.C. Int (${kin.icForRightWheel_Y}, ${kin.icForRightWheel_Z})`, '#6FD0D8', false);
    }

    // D. Chasis central PSSAE26 Aetheria (con amortiguadores horizontales superiores como en la foto real)
    ctx.save();
    const chassisMidX = (lcaInLeftX + lcaInRightX) * 0.5;
    const chassisTopY = (ucaInLeftY + ucaInRightY) * 0.5 - 12;
    const chassisBotY = (lcaInLeftY + lcaInRightY) * 0.5 + 10;
    const chassisW = Math.abs(lcaInRightX - lcaInLeftX);
    const chassisH = Math.max(36, chassisBotY - chassisTopY);

    ctx.translate(centerX, rcDyn_Y);
    ctx.rotate(rollRad * 0.45);
    ctx.translate(-centerX, -rcDyn_Y);

    // Monocasco oscuro con detalle Teal y Ciruela de PSSAE26 Aetheria
    ctx.fillStyle = 'rgba(14, 27, 30, 0.92)';
    ctx.strokeStyle = '#DCE8E9';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(chassisMidX - chassisW / 2, chassisTopY, chassisW, chassisH, 6);
    ctx.fill();
    ctx.stroke();

    // Amortiguadores horizontales amarillos en la parte superior del monocasco (como en aetheria_front.jpg)
    if (vehicle.silhouetteType === 'fsae') {
      ctx.fillStyle = '#E0A84B';
      ctx.fillRect(chassisMidX - chassisW * 0.35, chassisTopY - 7, chassisW * 0.28, 6);
      ctx.fillRect(chassisMidX + chassisW * 0.07, chassisTopY - 7, chassisW * 0.28, 6);
      // Main Roll Hoop superior
      ctx.strokeStyle = '#9BB0B3';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.arc(chassisMidX, chassisTopY - 8, chassisW * 0.24, Math.PI, 0);
      ctx.stroke();
    }
    ctx.restore();

    // E. Horquillas Superiores (UCA - Ciruela/Plum) e Inferiores (LCA - Teal) + Pushrods
    ctx.save();
    // Pushrods diagonales hacia los dampers superiores (como en las fotos reales de PSSAE26)
    ctx.strokeStyle = 'rgba(220, 232, 233, 0.55)';
    ctx.lineWidth = 1.8;
    ctx.beginPath();
    ctx.moveTo(lbjLeftX + 6, lbjLeftY - 4);
    ctx.lineTo(ucaInLeftX + 6, ucaInLeftY - 12);
    ctx.moveTo(lbjRightX - 6, lbjRightY - 4);
    ctx.lineTo(ucaInRightX - 6, ucaInRightY - 12);
    ctx.stroke();

    // Horquillas Superiores (UCA)
    ctx.strokeStyle = '#D28EC0';
    ctx.lineWidth = 3.5;
    ctx.beginPath();
    ctx.moveTo(ubjLeftX, ubjLeftY);
    ctx.lineTo(ucaInLeftX, ucaInLeftY);
    ctx.moveTo(ubjRightX, ubjRightY);
    ctx.lineTo(ucaInRightX, ucaInRightY);
    ctx.stroke();

    // Horquillas Inferiores (LCA)
    ctx.strokeStyle = '#6FD0D8';
    ctx.lineWidth = 3.8;
    ctx.beginPath();
    ctx.moveTo(lbjLeftX, lbjLeftY);
    ctx.lineTo(lcaInLeftX, lcaInLeftY);
    ctx.moveTo(lbjRightX, lbjRightY);
    ctx.lineTo(lcaInRightX, lcaInRightY);
    ctx.stroke();
    ctx.restore();

    // F. Neumáticos Izquierdo y Derecho con Camber Dinámico
    const camOutRad = (parseFloat(kin.dynamicCamberOuter) * Math.PI) / 180;
    const camInRad = (parseFloat(kin.dynamicCamberInner) * Math.PI) / 180;
    this.drawFrontTire(ctx, leftWheelX, groundY, tireW_px, tireH_px, -camOutRad, `RUEDA EXT (${kin.dynamicCamberOuter}°)`);
    this.drawFrontTire(ctx, rightWheelX, groundY, tireW_px, tireH_px, camInRad, `RUEDA INT (${kin.dynamicCamberInner}°)`);

    // G. Centro de Gravedad (CG) y Roll Center Dinámico (RC) con vector de migración
    const cgX = centerX + Math.sin(rollRad) * (specs.cgHeight * scale);
    const cgY = groundY - Math.cos(rollRad) * (specs.cgHeight * scale);
    this.drawCGIcon(ctx, cgX, cgY, 10, 'CG');

    // Flecha de migración desde RC estático a RC dinámico
    if (Math.hypot(rcDyn_X - centerX, rcDyn_Y - rcStatic_Y) > 2) {
      ctx.save();
      ctx.strokeStyle = '#E56B61';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(centerX, rcStatic_Y);
      ctx.lineTo(rcDyn_X, rcDyn_Y);
      ctx.stroke();
      ctx.restore();
    }

    // Punto Roll Center Dinámico (Intersección de ambas líneas azules del Paso 3)
    ctx.save();
    ctx.fillStyle = '#5E2E4F';
    ctx.strokeStyle = '#6FD0D8';
    ctx.lineWidth = 2.2;
    ctx.beginPath();
    ctx.arc(rcDyn_X, rcDyn_Y, 6.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#FFFFFF';
    ctx.font = '700 11px "IBM Plex Mono", monospace';
    ctx.textAlign = 'left';
    ctx.fillText(
      `Roll Center (ΔY: ${kin.rollCenterDynY} mm, Z: ${kin.rollCenterZ} mm)`,
      rcDyn_X + 12,
      rcDyn_Y + 4
    );
    ctx.restore();

    // Etiqueta inferior
    ctx.fillStyle = '#DCE8E9';
    ctx.font = '600 11.5px "IBM Plex Mono", monospace';
    ctx.textAlign = 'center';
    ctx.fillText(
      `${kin.armSizeType} · FVSA Base: ${kin.fvsaLengthMm} mm · Rolido Chasis: ${specs.rollAngleDeg}°`,
      centerX,
      groundY + 34
    );
  },

  drawFrontTire(ctx, bottomCenterX, groundY, wTire, hTire, camberRad, label) {
    ctx.save();
    ctx.translate(bottomCenterX, groundY);
    ctx.rotate(camberRad);

    ctx.fillStyle = '#14262A';
    ctx.strokeStyle = '#EAF1F2';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(-wTire / 2, -hTire, wTire, hTire, 5);
    ctx.fill();
    ctx.stroke();

    ctx.setLineDash([3, 3]);
    ctx.strokeStyle = '#6FD0D8';
    ctx.beginPath();
    ctx.moveTo(0, -hTire - 14);
    ctx.lineTo(0, 8);
    ctx.stroke();
    ctx.restore();

    ctx.fillStyle = '#9BB0B3';
    ctx.font = '600 10px "IBM Plex Mono", monospace';
    ctx.textAlign = 'center';
    ctx.fillText(label, bottomCenterX, groundY - hTire - 18);
  },

  /* ========================================================================
     2. VISTA LATERAL COMPLETA WIDESCREEN (Pitch Center, Anti-Dive y Anti-Squat)
     ======================================================================== */
  drawSideFullView(ctx, w, h, vehicle, specs, kin) {
    const groundY = h - 58;
    this.drawGroundLine(ctx, 28, w - 28, groundY);

    const rearAxleX = w * 0.24;
    const frontAxleX = w * 0.76;
    const wbPx = frontAxleX - rearAxleX;
    const pxPerMm = wbPx / specs.wheelbase;

    const tireR_px = Math.max(32, Math.min(56, specs.tireRadius * pxPerMm));
    const rearWheelY = groundY - tireR_px;
    const frontWheelY = groundY - tireR_px;
    const squatPx = specs.heaveMm * pxPerMm * 1.4;

    ctx.save();
    ctx.translate(0, squatPx * 0.65);
    this.drawVehicleSideSilhouette(ctx, vehicle.silhouetteType, rearAxleX, frontAxleX, rearWheelY, tireR_px);
    ctx.restore();

    this.drawSideWheel(ctx, rearAxleX, rearWheelY, tireR_px);
    this.drawSideWheel(ctx, frontAxleX, frontWheelY, tireR_px);

    const cgX = rearAxleX + wbPx * (specs.weightDistFront / 100);
    const cgY = groundY - Math.max(40, specs.cgHeight * pxPerMm * 1.35) + squatPx * 0.5;

    ctx.save();
    ctx.setLineDash([6, 5]);
    ctx.strokeStyle = 'rgba(223, 231, 232, 0.42)';
    ctx.lineWidth = 1.4;
    ctx.beginPath();
    ctx.moveTo(rearAxleX, groundY);
    ctx.lineTo(frontAxleX, cgY);
    ctx.stroke();

    ctx.fillStyle = '#B4C6C9';
    ctx.font = '600 11px "IBM Plex Mono", monospace';
    ctx.fillText('100% Línea Transferencia Carga', frontAxleX + 10, cgY + 4);
    ctx.restore();

    const icX = rearAxleX + Math.min(wbPx * 0.85, specs.svsaLengthRear * pxPerMm * 0.55);
    const icY = groundY - Math.max(12, specs.svsaHeightRear * pxPerMm * 1.35);

    const slopeAnti = (groundY - icY) / (icX - rearAxleX);
    const antiLineAtFrontY = groundY - slopeAnti * wbPx;

    ctx.save();
    ctx.strokeStyle = '#6FD0D8';
    ctx.lineWidth = 2.6;
    ctx.beginPath();
    ctx.moveTo(rearAxleX, groundY);
    ctx.lineTo(frontAxleX, antiLineAtFrontY);
    ctx.stroke();

    ctx.fillStyle = '#6FD0D8';
    ctx.beginPath();
    ctx.arc(frontAxleX, antiLineAtFrontY, 4.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.font = '700 12px "IBM Plex Mono", monospace';
    ctx.fillText(`Anti-Squat: ${kin.antiSquatPct}% | Anti-Dive: ${kin.antiDivePct}%`, frontAxleX - 120, antiLineAtFrontY - 10);
    ctx.restore();

    ctx.save();
    ctx.strokeStyle = '#E0A84B';
    ctx.lineWidth = 3.8;
    ctx.beginPath();
    ctx.moveTo(rearAxleX, rearWheelY);
    ctx.lineTo(icX, icY);
    ctx.stroke();
    ctx.restore();

    this.drawICMarker(ctx, icX, icY, 'IC (SVSA)', '#E0A84B');
    this.drawCGIcon(ctx, cgX, cgY, 12, 'CG');

    const dimY = groundY + 32;
    ctx.strokeStyle = '#7A8C8F';
    ctx.lineWidth = 1.3;
    ctx.beginPath();
    ctx.moveTo(rearAxleX, groundY + 4);
    ctx.lineTo(rearAxleX, dimY + 6);
    ctx.moveTo(frontAxleX, groundY + 4);
    ctx.lineTo(frontAxleX, dimY + 6);
    ctx.moveTo(rearAxleX, dimY);
    ctx.lineTo(frontAxleX, dimY);
    ctx.stroke();

    const wbInches = (specs.wheelbase / 25.4).toFixed(1);
    const wbLabel = `Wheelbase ${specs.wheelbase} mm (${wbInches}")`;
    ctx.fillStyle = '#081114';
    const textW = ctx.measureText(wbLabel).width + 24;
    ctx.fillRect((rearAxleX + frontAxleX) / 2 - textW / 2, dimY - 8, textW, 18);
    ctx.fillStyle = '#DCE8E9';
    ctx.font = '600 11px "IBM Plex Mono", monospace';
    ctx.textAlign = 'center';
    ctx.fillText(wbLabel, (rearAxleX + frontAxleX) / 2, dimY + 4);
  },

  drawSideWheel(ctx, cx, cy, r) {
    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(20, 38, 42, 0.88)';
    ctx.fill();
    ctx.lineWidth = 2.5;
    ctx.strokeStyle = '#DCE8E9';
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(cx, cy, r * 0.55, 0, Math.PI * 2);
    ctx.lineWidth = 1.6;
    ctx.strokeStyle = '#E56B61';
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(cx, cy, 4, 0, Math.PI * 2);
    ctx.fillStyle = '#FFFFFF';
    ctx.fill();
    ctx.restore();
  },

  drawVehicleSideSilhouette(ctx, type, rearX, frontX, wheelY, r) {
    ctx.save();
    ctx.strokeStyle = 'rgba(220, 232, 233, 0.78)';
    ctx.lineWidth = 1.8;
    const wb = frontX - rearX;

    if (type === 'fsae') {
      // Silueta inspirada directamente en el render lateral del PSSAE26 Aetheria #88
      ctx.beginPath();
      ctx.moveTo(rearX - r * 1.1, wheelY + r * 0.65);
      ctx.lineTo(frontX + r * 1.4, wheelY + r * 0.68);
      ctx.lineTo(frontX + r * 1.55, wheelY + r * 0.35);
      ctx.lineTo(frontX + r * 0.35, wheelY - r * 0.25);
      ctx.lineTo(rearX + wb * 0.62, wheelY - r * 0.55);
      ctx.lineTo(rearX + wb * 0.42, wheelY - r * 1.9);
      ctx.lineTo(rearX + wb * 0.36, wheelY - r * 1.9);
      ctx.lineTo(rearX + wb * 0.08, wheelY - r * 0.65);
      ctx.lineTo(rearX - r * 0.8, wheelY - r * 0.5);
      ctx.stroke();

      // Endplate del Alerón Trasero #88 PSSAE26
      ctx.strokeStyle = '#6FD0D8';
      ctx.beginPath();
      ctx.rect(rearX - r * 1.25, wheelY - r * 2.05, r * 1.05, r * 0.82);
      ctx.stroke();
      ctx.fillStyle = '#6FD0D8';
      ctx.font = '700 10px "IBM Plex Mono", monospace';
      ctx.fillText('88', rearX - r * 0.85, wheelY - r * 1.55);
    } else if (type === 'heavy') {
      ctx.beginPath();
      ctx.moveTo(rearX - r * 1.2, wheelY + r * 0.4);
      ctx.lineTo(frontX + r * 1.2, wheelY + r * 0.4);
      ctx.lineTo(frontX + r * 1.2, wheelY - r * 1.2);
      ctx.lineTo(frontX - wb * 0.15, wheelY - r * 1.3);
      ctx.lineTo(frontX - wb * 0.22, wheelY - r * 2.2);
      ctx.lineTo(rearX + wb * 0.15, wheelY - r * 2.2);
      ctx.lineTo(rearX + wb * 0.15, wheelY - r * 0.8);
      ctx.lineTo(rearX - r * 1.2, wheelY - r * 0.8);
      ctx.closePath();
      ctx.stroke();
    } else {
      ctx.beginPath();
      ctx.moveTo(rearX - r * 1.35, wheelY + r * 0.55);
      ctx.lineTo(frontX + r * 1.35, wheelY + r * 0.6);
      ctx.lineTo(frontX + r * 1.3, wheelY - r * 0.25);
      ctx.lineTo(frontX - wb * 0.05, wheelY - r * 0.55);
      ctx.lineTo(frontX - wb * 0.28, wheelY - r * 1.45);
      ctx.lineTo(rearX + wb * 0.18, wheelY - r * 1.45);
      ctx.lineTo(rearX - r * 0.35, wheelY - r * 0.68);
      ctx.lineTo(rearX - r * 1.3, wheelY - r * 0.55);
      ctx.closePath();
      ctx.stroke();
    }
    ctx.restore();
  },

  /* ========================================================================
     3. VISTA DE CAMBER, DEFORMACIÓN Y TERMOGRAFÍA (T=50°C vs T=20°C)
     ======================================================================== */
  drawCamberThermalView(ctx, w, h, vehicle, specs, kin) {
    const groundY = h - 58;
    this.drawGroundLine(ctx, 28, w - 28, groundY);

    // 1. Los 3 Casos del Apunte (0° Camber, + Camber, - Camber) a la izquierda
    const tireCenterX = w * 0.28;
    const tireW = 104;
    const tireH = 190;
    const camberDeg = parseFloat(kin.dynamicCamberOuter);
    const camberRad = (camberDeg * Math.PI) / 180;

    ctx.save();
    ctx.translate(tireCenterX, groundY);
    ctx.rotate(camberRad);

    ctx.fillStyle = '#14262A';
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 2.4;
    ctx.beginPath();
    ctx.roundRect(-tireW / 2, -tireH, tireW, tireH, 10);
    ctx.fill();
    ctx.stroke();

    ctx.setLineDash([4, 4]);
    ctx.strokeStyle = '#6FD0D8';
    ctx.beginPath();
    ctx.moveTo(0, -tireH - 22);
    ctx.lineTo(0, 14);
    ctx.stroke();
    ctx.restore();

    // Huella de contacto activa sobre el piso
    const patchFactor = kin.contactPatchPct / 100;
    const patchW = tireW * patchFactor;
    const shiftX = camberDeg * 2.8;
    ctx.fillStyle = kin.contactPatchPct >= 88 ? '#2094A0' : '#E0A84B';
    ctx.fillRect(tireCenterX - patchW / 2 + shiftX, groundY - 6, patchW, 10);

    // Flecha de Carga Lateral
    if (specs.rollAngleDeg > 0.1) {
      ctx.save();
      ctx.strokeStyle = '#E56B61';
      ctx.fillStyle = '#E56B61';
      ctx.lineWidth = 2.8;
      ctx.beginPath();
      ctx.moveTo(tireCenterX - 130, groundY - tireH / 2);
      ctx.lineTo(tireCenterX - tireW / 2 - 10, groundY - tireH / 2);
      ctx.stroke();
      ctx.font = '700 11px "IBM Plex Mono", monospace';
      ctx.fillText('Al aplicar carga lateral →', tireCenterX - 130, groundY - tireH / 2 - 10);
      ctx.restore();
    }

    // 2. Termografía del Neumático (T=50°C vs T=20°C de tu apunte Pág. 1) a la derecha
    const thermX = w * 0.68;
    const thermW = 150;
    const thermH = 190;
    const thermTop = groundY - thermH;
    const bandW = thermW / 3;

    const getTempColor = (t) => {
      if (t >= 48) return 'rgba(229, 107, 97, 0.85)';
      if (t >= 34) return 'rgba(32, 148, 160, 0.85)';
      return 'rgba(111, 208, 216, 0.32)';
    };

    ctx.fillStyle = getTempColor(kin.tOuter);
    ctx.fillRect(thermX - thermW / 2, thermTop, bandW, thermH);
    ctx.fillStyle = getTempColor(kin.tCenter);
    ctx.fillRect(thermX - thermW / 2 + bandW, thermTop, bandW, thermH);
    ctx.fillStyle = getTempColor(kin.tInner);
    ctx.fillRect(thermX - thermW / 2 + bandW * 2, thermTop, bandW, thermH);

    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 2.2;
    ctx.strokeRect(thermX - thermW / 2, thermTop, thermW, thermH);

    ctx.fillStyle = '#FFFFFF';
    ctx.font = '700 14px "IBM Plex Mono", monospace';
    ctx.textAlign = 'center';
    ctx.fillText(`T=${kin.tOuter}°C`, thermX - bandW, thermTop + thermH / 2);
    ctx.fillText(`T=${kin.tCenter}°C`, thermX, thermTop + thermH / 2);
    ctx.fillText(`T=${kin.tInner}°C`, thermX + bandW, thermTop + thermH / 2);

    ctx.font = '600 10.5px "IBM Plex Mono", monospace';
    ctx.fillStyle = '#6FD0D8';
    ctx.fillText('EXTERIOR', thermX - bandW, thermTop - 10);
    ctx.fillText('CENTRO', thermX, thermTop - 10);
    ctx.fillText('INTERIOR', thermX + bandW, thermTop - 10);

    ctx.fillStyle = '#DCE8E9';
    ctx.font = '600 11.5px "IBM Plex Mono", monospace';
    ctx.textAlign = 'center';
    ctx.fillText(
      `Camber Dinámico: ${kin.dynamicCamberOuter}° · Área Huella Efectiva: ${kin.contactPatchPct}% · Diferencial Térmico: Δ${kin.tempSpread}°C`,
      w / 2,
      groundY + 34
    );
  },

  /* ========================================================================
     4. VISTA EN PLANTA: TOE ANGLES (Neutro, Positivo, Negativo)
     ======================================================================== */
  drawTopToeView(ctx, w, h, vehicle, specs, kin) {
    const cx = w / 2;
    const cy = h / 2;
    const chLen = h * 0.56;
    const chTrack = Math.min(w * 0.36, 360);

    const frontY = cy - chLen / 2;
    const rearY = cy + chLen / 2;
    const leftX = cx - chTrack / 2;
    const rightX = cx + chTrack / 2;

    ctx.strokeStyle = '#9BB0B3';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(cx, frontY);
    ctx.lineTo(cx, rearY);
    ctx.moveTo(leftX, frontY);
    ctx.lineTo(rightX, frontY);
    ctx.moveTo(leftX, rearY);
    ctx.lineTo(rightX, rearY);
    ctx.stroke();

    const visualScale = 6.5;
    const frontToeRad = (parseFloat(kin.dynamicToeFront) * visualScale * Math.PI) / 180;
    const rearToeRad = (specs.staticToeRear * visualScale * Math.PI) / 180;

    this.drawTopWheelWithRay(ctx, leftX, frontY, frontToeRad, `DEL IZQ (${kin.dynamicToeFront}°)`);
    this.drawTopWheelWithRay(ctx, rightX, frontY, -frontToeRad, `DEL DER (${kin.dynamicToeFront}°)`);
    this.drawTopWheelWithRay(ctx, leftX, rearY, rearToeRad, `TRAS IZQ (${specs.staticToeRear}°)`);
    this.drawTopWheelWithRay(ctx, rightX, rearY, -rearToeRad, `TRAS DER (${specs.staticToeRear}°)`);

    const toeFrontVal = parseFloat(kin.dynamicToeFront);
    let toeLabel = 'TOE NEUTRO (0°)';
    if (toeFrontVal > 0.05) toeLabel = 'TOE POSITIVO (TOE IN · Convergencia → Estabilidad Alta Velocidad)';
    if (toeFrontVal < -0.05) toeLabel = 'TOE NEGATIVO (TOE OUT · Divergencia → Entrada Ágil en Curva)';

    ctx.fillStyle = '#6FD0D8';
    ctx.font = '700 12px "IBM Plex Mono", monospace';
    ctx.textAlign = 'center';
    ctx.fillText(toeLabel, cx, h - 18);
  },

  drawTopWheelWithRay(ctx, x, y, angleRad, label) {
    const wWheel = 28;
    const hWheel = 58;
    ctx.save();
    ctx.translate(x, y);

    ctx.setLineDash([3, 3]);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.beginPath();
    ctx.moveTo(0, -hWheel - 28);
    ctx.lineTo(0, hWheel / 2);
    ctx.stroke();

    ctx.rotate(angleRad);
    ctx.setLineDash([]);
    ctx.fillStyle = '#14262A';
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(-wWheel / 2, -hWheel / 2, wWheel, hWheel, 4);
    ctx.fill();
    ctx.stroke();

    ctx.strokeStyle = '#6FD0D8';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, -hWheel / 2);
    ctx.lineTo(0, -hWheel - 26);
    ctx.stroke();
    ctx.restore();

    ctx.fillStyle = '#B4C6C9';
    ctx.font = '600 10px "IBM Plex Mono", monospace';
    ctx.textAlign = 'center';
    ctx.fillText(label, x, y + hWheel / 2 + 16);
  },

  /* ========================================================================
     5. VISTA FRONTAL DE MANGUETA: KPI Y SCRUB RADIUS
     ======================================================================== */
  drawFrontUprightKPIView(ctx, w, h, vehicle, specs, kin) {
    const groundY = h - 58;
    this.drawGroundLine(ctx, 30, w - 30, groundY);

    const tireX = w * 0.56;
    const tireW = 108;
    const tireH = 200;

    ctx.fillStyle = '#14262A';
    ctx.strokeStyle = '#EAF1F2';
    ctx.lineWidth = 2.4;
    ctx.beginPath();
    ctx.roundRect(tireX - tireW / 2, groundY - tireH, tireW, tireH, 8);
    ctx.fill();
    ctx.stroke();

    ctx.save();
    ctx.setLineDash([5, 4]);
    ctx.strokeStyle = '#6FD0D8';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(tireX, groundY - tireH - 32);
    ctx.lineTo(tireX, groundY + 18);
    ctx.stroke();
    ctx.restore();

    const srPx = specs.scrubRadius * 2.2;
    const kpiGroundX = tireX - srPx;
    const kpiRad = (specs.kpiAngle * Math.PI) / 180;

    const lbjY = groundY - 48;
    const ubjY = groundY - tireH + 28;
    const lbjX = kpiGroundX - (groundY - lbjY) * Math.tan(kpiRad);
    const ubjX = kpiGroundX - (groundY - ubjY) * Math.tan(kpiRad);

    ctx.strokeStyle = '#E56B61';
    ctx.lineWidth = 4.2;
    ctx.beginPath();
    ctx.moveTo(ubjX, ubjY);
    ctx.lineTo(ubjX - 180, ubjY + 20);
    ctx.moveTo(lbjX, lbjY);
    ctx.lineTo(lbjX - 195, lbjY + 10);
    ctx.stroke();

    [
      { x: ubjX, y: ubjY },
      { x: lbjX, y: lbjY }
    ].forEach((pt) => {
      ctx.fillStyle = '#FFFFFF';
      ctx.strokeStyle = '#0E1B1E';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(pt.x, pt.y, 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    });

    ctx.save();
    ctx.setLineDash([6, 4]);
    ctx.strokeStyle = '#E0A84B';
    ctx.lineWidth = 2.4;
    ctx.beginPath();
    ctx.moveTo(ubjX - 28 * Math.tan(kpiRad), ubjY - 28);
    ctx.lineTo(kpiGroundX + 18 * Math.tan(kpiRad), groundY + 18);
    ctx.stroke();
    ctx.restore();

    ctx.strokeStyle = '#E56B61';
    ctx.fillStyle = '#E56B61';
    ctx.lineWidth = 2.8;
    ctx.beginPath();
    ctx.moveTo(tireX, groundY - 85);
    ctx.lineTo(tireX, groundY - 14);
    ctx.stroke();
    ctx.font = '700 11px "IBM Plex Mono", monospace';
    ctx.fillText('Flecha Roja: Agarre / Frenado', tireX + 68, groundY - 45);

    ctx.strokeStyle = '#6FD0D8';
    ctx.lineWidth = 2.4;
    ctx.beginPath();
    ctx.arc(ubjX, ubjY - 10, 24, -Math.PI * 0.8, Math.PI * 0.2);
    ctx.stroke();
    ctx.fillStyle = '#6FD0D8';
    ctx.fillText(`Flecha Azul: Momento Giro (${kin.scrubTorqueNm} N·m)`, ubjX - 45, ubjY - 40);

    const dimY = groundY + 30;
    ctx.fillStyle = '#E0A84B';
    ctx.font = '700 12px "IBM Plex Mono", monospace';
    ctx.textAlign = 'center';
    ctx.fillText(
      `Scrub Radius: ${specs.scrubRadius} mm · King Pin Angle (KPI): ${specs.kpiAngle}°`,
      w / 2,
      dimY + 10
    );
  },

  /* ========================================================================
     6. VISTA LATERAL DEL RIN: CASTER Y TRAIL (M = F · D)
     ======================================================================== */
  drawSideUprightCasterView(ctx, w, h, vehicle, specs, kin) {
    const groundY = h - 58;
    this.drawGroundLine(ctx, 30, w - 30, groundY);

    const wheelX = w * 0.45;
    const rTire = 96;
    const wheelY = groundY - rTire;

    this.drawSideWheel(ctx, wheelX, wheelY, rTire);

    const p2X = wheelX;
    ctx.save();
    ctx.setLineDash([4, 4]);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.45)';
    ctx.beginPath();
    ctx.moveTo(p2X, wheelY - rTire - 24);
    ctx.lineTo(p2X, groundY + 24);
    ctx.stroke();
    ctx.restore();

    const trailPx = Math.max(-35, specs.casterTrail * 2.5);
    const p1X = wheelX + trailPx;
    const casterRad = (specs.casterAngle * Math.PI) / 180;

    const topExtendY = wheelY - rTire - 26;
    const topX = p1X - (groundY - topExtendY) * Math.tan(casterRad);

    ctx.strokeStyle = '#E56B61';
    ctx.lineWidth = 2.6;
    ctx.beginPath();
    ctx.moveTo(topX, topExtendY);
    ctx.lineTo(p1X, groundY);
    ctx.stroke();

    const ubjY = wheelY - rTire * 0.52;
    const lbjY = wheelY + rTire * 0.52;
    const ubjX = p1X - (groundY - ubjY) * Math.tan(casterRad);
    const lbjX = p1X - (groundY - lbjY) * Math.tan(casterRad);

    [
      { x: ubjX, y: ubjY },
      { x: lbjX, y: lbjY }
    ].forEach((pt) => {
      ctx.fillStyle = '#6FD0D8';
      ctx.beginPath();
      ctx.arc(pt.x, pt.y, 5.5, 0, Math.PI * 2);
      ctx.fill();
    });

    ctx.fillStyle = '#E56B61';
    ctx.font = '700 11.5px "IBM Plex Mono", monospace';
    ctx.textAlign = 'center';
    ctx.fillText('P2 (Contacto)', p2X - 24, groundY + 20);
    ctx.fillStyle = '#6FD0D8';
    ctx.fillText('P1 (Eje Caster)', p1X + 28, groundY + 20);

    ctx.fillStyle = '#E0A84B';
    ctx.fillText(
      `Trail D = ${specs.casterTrail} mm · Torque Correctivo M = F · D = ${kin.casterAligningTorqueNm} N·m · Ganancia Camber: ${kin.casterCamberGain}°`,
      w / 2,
      groundY + 38
    );
  },

  /* ========================================================================
     7. VISTA SUPERIOR: ACKERMANN Y SLIP ANGLE (α)
     ======================================================================== */
  drawTopAckermannView(ctx, w, h, vehicle, specs, kin) {
    const carX = w * 0.30;
    const frontY = h * 0.25;
    const rearY = h * 0.74;
    const halfTrackPx = 68;

    const leftX = carX - halfTrackPx;
    const rightX = carX + halfTrackPx;

    const turnCenterX = w * 0.82;
    const turnCenterY = rearY;

    ctx.save();
    ctx.setLineDash([5, 4]);
    ctx.strokeStyle = 'rgba(155, 176, 179, 0.5)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(leftX, rearY);
    ctx.lineTo(turnCenterX, turnCenterY);
    ctx.stroke();

    const ackOffset = (100 - specs.ackermannPct) * 0.85;
    ctx.strokeStyle = '#6FD0D8';
    ctx.beginPath();
    ctx.moveTo(leftX, frontY);
    ctx.lineTo(turnCenterX, turnCenterY - ackOffset);
    ctx.stroke();

    ctx.strokeStyle = '#E0A84B';
    ctx.beginPath();
    ctx.moveTo(rightX, frontY);
    ctx.lineTo(turnCenterX, turnCenterY);
    ctx.stroke();
    ctx.restore();

    this.drawICMarker(ctx, turnCenterX, turnCenterY, 'Mismo Centro de Giro', '#6FD0D8');

    ctx.strokeStyle = '#DCE8E9';
    ctx.lineWidth = 2.2;
    ctx.beginPath();
    ctx.moveTo(leftX, frontY);
    ctx.lineTo(rightX, frontY);
    ctx.moveTo(leftX, rearY);
    ctx.lineTo(rightX, rearY);
    ctx.moveTo(carX, frontY);
    ctx.lineTo(carX, rearY);
    ctx.stroke();

    const dOutRad = (parseFloat(kin.deltaOuterDeg) * Math.PI) / 180;
    const dInRad = (parseFloat(kin.deltaInnerDeg) * Math.PI) / 180;

    this.drawTopWheelWithRay(ctx, leftX, frontY, dOutRad, `EXT δo=${kin.deltaOuterDeg}°`);
    this.drawTopWheelWithRay(ctx, rightX, frontY, dInRad, `INT δi=${kin.deltaInnerDeg}°`);
    this.drawTopWheelWithRay(ctx, leftX, rearY, 0, 'TRAS EXT');
    this.drawTopWheelWithRay(ctx, rightX, rearY, 0, 'TRAS INT');
  }
};
