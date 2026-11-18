/* ==========================================================================
   PSSAE26 AETHERIA · MOTOR CINEMÁTICO CON MIGRACIÓN DINÁMICA DE IC Y RC
   Calcula posiciones estáticas y dinámicas (bajo Rolido en Curva y Compresión)
   de los Centros Instantáneos (IC Izquierdo y Derecho) y del Roll Center (RC).
   ========================================================================== */

window.AetheriaKinematics = {
  compute(specs) {
    const deg2rad = Math.PI / 180;
    const rad2deg = 180 / Math.PI;

    const halfTrack = specs.trackFront / 2; // mm
    const tireR = specs.tireRadius;         // mm

    // 1. Puntos Exteriores Base en Mangueta (Puntos 1 y 3)
    const kpiGroundY = halfTrack - specs.scrubRadius;
    const kpiRad = specs.kpiAngle * deg2rad;
    const casterRad = specs.casterAngle * deg2rad;

    const z3_lbj = Math.round(tireR * 0.56);
    const z1_ubj = Math.round(tireR * 1.36);
    const dzBallJoints = z1_ubj - z3_lbj;

    const y3_lbj = Math.round(kpiGroundY + z3_lbj * Math.tan(kpiRad));
    const y1_ubj = Math.round(kpiGroundY + z1_ubj * Math.tan(kpiRad));
    const x1_ubj = 0;
    const x3_lbj = Math.round(dzBallJoints * Math.tan(casterRad));

    // Función auxiliar para hallar el IC de un lado dado el ángulo de UCA y LCA respecto al suelo
    function solveSideIC(yU, zU, yL, zL, ucaAngleDeg, lcaAngleDeg) {
      const mU = Math.tan(ucaAngleDeg * deg2rad);
      const mL = Math.tan(lcaAngleDeg * deg2rad);
      const diff = mL - mU;
      if (Math.abs(diff) > 0.006) {
        const yIC = (zU - zL - yU * mU + yL * mL) / diff;
        const zIC = zU - (yU - yIC) * mU;
        const fvsa = Math.max(220, Math.abs(halfTrack - yIC));
        return { yIC, zIC, fvsa };
      }
      return { yIC: -4500, zIC: (zU + zL) * 0.5, fvsa: 4500 };
    }

    // 2. Estado Estático (Sin Rolido, Roll = 0°)
    const staticSide = solveSideIC(
      y1_ubj,
      z1_ubj,
      y3_lbj,
      z3_lbj,
      specs.ucaAngleFront,
      specs.lcaAngleFront
    );

    const fvsaLengthMm = staticSide.fvsa;
    const icStaticY = staticSide.yIC;
    const icStaticZ = staticSide.zIC;
    const rcStaticZ = fvsaLengthMm < 4400
      ? Math.max(-120, Math.min(350, icStaticZ * (halfTrack / (halfTrack - icStaticY))))
      : 0;

    // 3. Estado Dinámico bajo Rolido en Curva (Body Roll = rollAngleDeg)
    // Cuando el chasis rola un ángulo φ (rollAngleDeg):
    // - La rueda exterior se comprime: z_chasis baja de ese lado, aumentando el ángulo relativo de las horquillas,
    //   y como el brazo superior (UCA) es más corto que el inferior (LCA), gira más grados (relación L_lca / L_uca).
    // - La rueda interior se extiende: disminuye el ángulo de sus horquillas.
    const rollDeg = specs.rollAngleDeg || 0;
    const armRatio = specs.lcaLength / Math.max(120, specs.ucaLength); // > 1 en SLA (brazo sup corto)

    // Variación angular cinemática de los brazos en el lado exterior (izquierdo en pantalla) e interior (derecho)
    const ucaAngleLeftDyn = specs.ucaAngleFront + rollDeg * (1.15 * armRatio) + (specs.heaveMm * 0.08 * armRatio);
    const lcaAngleLeftDyn = specs.lcaAngleFront + rollDeg * 0.72 + (specs.heaveMm * 0.05);

    const ucaAngleRightDyn = specs.ucaAngleFront - rollDeg * (1.15 * armRatio) + (specs.heaveMm * 0.08 * armRatio);
    const lcaAngleRightDyn = specs.lcaAngleFront - rollDeg * 0.72 + (specs.heaveMm * 0.05);

    const leftDynIC = solveSideIC(y1_ubj, z1_ubj, y3_lbj, z3_lbj, ucaAngleLeftDyn, lcaAngleLeftDyn);
    const rightDynIC = solveSideIC(y1_ubj, z1_ubj, y3_lbj, z3_lbj, ucaAngleRightDyn, lcaAngleRightDyn);

    // En coordenadas globales del vehículo (Centro = 0, Izquierda = -Y, Derecha = +Y):
    // Rueda Izquierda tiene Contact Patch en (-halfTrack, 0) y su IC proyecta hacia la derecha en (+X_icL, Z_icL)
    // donde X_icL = -leftDynIC.yIC
    const cpLeftY = -halfTrack;
    const icForLeftWheel_Y = -leftDynIC.yIC;
    const icForLeftWheel_Z = leftDynIC.zIC;

    // Rueda Derecha tiene Contact Patch en (+halfTrack, 0) y su IC proyecta hacia la izquierda en (rightDynIC.yIC, Z_icR)
    const cpRightY = halfTrack;
    const icForRightWheel_Y = rightDynIC.yIC;
    const icForRightWheel_Z = rightDynIC.zIC;

    // Intersección de la línea [CP_Left -> IC_Left] con la línea [CP_Right -> IC_Right] = Roll Center Dinámico (rcDynY, rcDynZ)
    const mLineLeft = icForLeftWheel_Z / Math.max(10, icForLeftWheel_Y - cpLeftY);
    const mLineRight = icForRightWheel_Z / Math.min(-10, icForRightWheel_Y - cpRightY);

    let rcDynY = 0;
    let rcDynZ = rcStaticZ;
    if (Math.abs(mLineLeft - mLineRight) > 0.001) {
      // z = mLineLeft * (y - cpLeftY) = mLineRight * (y - cpRightY)
      rcDynY = (mLineLeft * cpLeftY - mLineRight * cpRightY) / (mLineLeft - mLineRight);
      rcDynZ = mLineLeft * (rcDynY - cpLeftY);
    }
    rcDynY = Math.max(-450, Math.min(450, rcDynY));
    rcDynZ = Math.max(-140, Math.min(360, rcDynZ));

    // Pivotes interiores estáticos/dinámicos para dibujo
    const ucaRad = specs.ucaAngleFront * deg2rad;
    const lcaRad = specs.lcaAngleFront * deg2rad;
    const y2_uca = Math.round(y1_ubj - specs.ucaLength * Math.cos(ucaRad));
    const z2_uca = Math.round(z1_ubj - specs.ucaLength * Math.sin(ucaRad));
    const y4_lca = Math.round(y3_lbj - specs.lcaLength * Math.cos(lcaRad));
    const z4_lca = Math.round(z3_lbj - specs.lcaLength * Math.sin(lcaRad));

    // 4. Camber Change Rate (CCR) y Camber Dinámico
    const fvsaInches = fvsaLengthMm / 25.4;
    const ccrDegPerInch = Math.atan(1 / fvsaInches) * rad2deg;
    const rollCamberRatio = 1 - (halfTrack / fvsaLengthMm);
    const slaFactor = (1.0 - (specs.ucaLength / specs.lcaLength)) * 1.45;

    const steerRad = Math.abs(specs.steerAngleDeg) * deg2rad;
    const casterCamberGain = -specs.casterAngle * Math.sin(steerRad) + specs.kpiAngle * (1 - Math.cos(steerRad));
    const heaveInches = specs.heaveMm / 25.4;
    const bumpCamberGain = -heaveInches * ccrDegPerInch * (0.65 + slaFactor);
    const rollCamberRecovery = (1 - Math.max(0.1, rollCamberRatio + slaFactor * 0.25)) * Math.abs(rollDeg);

    const dynamicCamberOuter = specs.staticCamber + rollCamberRecovery + bumpCamberGain + (specs.steerAngleDeg !== 0 ? casterCamberGain : 0);
    const dynamicCamberInner = specs.staticCamber - rollCamberRecovery + bumpCamberGain - (specs.steerAngleDeg !== 0 ? casterCamberGain : 0);

    // 5. Termografía del Neumático (Ti, Tc, To) y Área de Huella
    const effectiveRoadCamber = dynamicCamberOuter + (rollDeg > 0 ? 0.35 * rollDeg : 0);
    const baseTemp = 36 + Math.abs(rollDeg) * 4;
    const tempGradient = -effectiveRoadCamber * 8.2;
    const tInner = Math.round(Math.max(18, Math.min(85, baseTemp + tempGradient * 0.95)));
    const tOuter = Math.round(Math.max(18, Math.min(85, baseTemp - tempGradient * 0.85)));
    const tCenter = Math.round((tInner + tOuter) * 0.5 + 2 - Math.abs(tempGradient) * 0.12);
    const tempSpread = Math.abs(tInner - tOuter);
    const contactPatchPct = Math.round(Math.max(42, Math.min(99, 98 - Math.pow(Math.abs(effectiveRoadCamber), 1.45) * 9.5)));

    // 6. Vista Lateral: Pitch Center, % Anti-Dive y % Anti-Squat
    const xFrontToCg = specs.wheelbase * ((100 - specs.weightDistFront) / 100);
    const xRearToCg = specs.wheelbase * (specs.weightDistFront / 100);
    const tanPhiFront = specs.svsaHeightFront / Math.max(200, specs.svsaLengthFront);
    const tanBetaRear = specs.svsaHeightRear / Math.max(200, specs.svsaLengthRear);

    const antiDivePct = Math.max(0, Math.min(120, (xFrontToCg / specs.cgHeight) * tanPhiFront * 100));
    const antiSquatPct = Math.max(0, Math.min(120, (xRearToCg / specs.cgHeight) * tanBetaRear * 100));
    const rigidLinkLoadPct = Math.round(Math.min(100, (antiDivePct + antiSquatPct) / 2));
    const springDamperLoadPct = Math.max(0, 100 - rigidLinkLoadPct);

    // 7. Fuerzas de Dirección (Scrub Radius y Caster Trail)
    const normalWheelLoadN = (specs.sprungMassWithDriver * 9.81) * 0.28;
    const brakingForceN = normalWheelLoadN * 1.15;
    const corneringForceN = normalWheelLoadN * 1.35;
    const scrubTorqueNm = brakingForceN * (specs.scrubRadius / 1000);
    const casterAligningTorqueNm = corneringForceN * (specs.casterTrail / 1000);

    // 8. Ackermann y Bump Steer
    const steerInput = Math.abs(specs.steerAngleDeg) || 12;
    const ackRatio = specs.ackermannPct / 100;
    const cotCenter = 1 / Math.tan(steerInput * deg2rad);
    const geomOffset = (specs.trackFront / specs.wheelbase) * 0.5 * ackRatio;
    const deltaInnerDeg = Math.atan(1 / Math.max(0.15, cotCenter - geomOffset)) * rad2deg;
    const deltaOuterDeg = Math.atan(1 / Math.max(0.15, cotCenter + geomOffset)) * rad2deg;

    const bumpSteerDeg = (specs.tieRodOffsetMm * (specs.heaveMm / 25.4)) * 0.14;
    const dynamicToeFront = specs.staticToeFront + bumpSteerDeg;

    let armSizeType = 'Brazos Superiores Cortos (SLA · Ideal Competición)';
    if (Math.abs(specs.ucaLength - specs.lcaLength) <= 12) {
      armSizeType = 'Brazos Iguales (Pierde camber en rolido)';
    } else if (specs.ucaLength > specs.lcaLength) {
      armSizeType = 'Brazos Superiores Largos (Gira con chasis y pierde agarre)';
    } else if (specs.ucaLength < specs.lcaLength * 0.62) {
      armSizeType = 'Brazos Sup. MUY Cortos (Ganancia extrema al bajar chasis)';
    }

    return {
      halfTrack,
      kpiGroundY,
      z1_ubj,
      y1_ubj,
      z3_lbj,
      y3_lbj,
      y2_uca,
      z2_uca,
      y4_lca,
      z4_lca,
      // Estáticos
      icFrontY: icStaticY,
      icFrontZ: icStaticZ,
      rollCenterStaticZ: Math.round(rcStaticZ),
      // Dinámicos bajo Rolido (Body Roll)
      icForLeftWheel_Y: Math.round(icForLeftWheel_Y),
      icForLeftWheel_Z: Math.round(icForLeftWheel_Z),
      icForRightWheel_Y: Math.round(icForRightWheel_Y),
      icForRightWheel_Z: Math.round(icForRightWheel_Z),
      ucaAngleLeftDyn,
      lcaAngleLeftDyn,
      ucaAngleRightDyn,
      lcaAngleRightDyn,
      rollCenterDynY: Math.round(rcDynY),
      rollCenterZ: Math.round(rcDynZ),
      fvsaLengthMm: Math.round(fvsaLengthMm),
      fvsaInches: fvsaInches.toFixed(1),
      ccrDegPerInch: ccrDegPerInch.toFixed(2),
      dynamicCamberOuter: dynamicCamberOuter.toFixed(2),
      dynamicCamberInner: dynamicCamberInner.toFixed(2),
      casterCamberGain: casterCamberGain.toFixed(2),
      tInner,
      tCenter,
      tOuter,
      tempSpread,
      contactPatchPct,
      antiDivePct: antiDivePct.toFixed(1),
      antiSquatPct: antiSquatPct.toFixed(1),
      rigidLinkLoadPct,
      springDamperLoadPct,
      scrubTorqueNm: scrubTorqueNm.toFixed(1),
      casterAligningTorqueNm: casterAligningTorqueNm.toFixed(1),
      deltaInnerDeg: deltaInnerDeg.toFixed(1),
      deltaOuterDeg: deltaOuterDeg.toFixed(1),
      bumpSteerDeg: bumpSteerDeg.toFixed(2),
      dynamicToeFront: dynamicToeFront.toFixed(2),
      armSizeType
    };
  }
};
