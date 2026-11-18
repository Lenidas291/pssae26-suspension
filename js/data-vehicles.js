/* ==========================================================================
   AETHERIA SUSPENSION SCHOOL · BASE DE DATOS DE VEHÍCULOS Y PRESETS
   Incluye: Aetheria PSSAE26 (Editable), Histórico PSSAE, Benchmark FSAE,
   y otros tipos de vehículos para contraste pedagógico (GT, Touring, Pesado).
   ========================================================================== */

window.AETHERIA_VEHICLES = {
  aetheria_2026: {
    id: 'aetheria_2026',
    archTitle: 'Double Wishbone SLA',
    carName: 'Aetheria PSSAE26',
    badge: 'SCUDERÍA · EDITABLE',
    category: 'Formula SAE · Diseño Actual',
    statusChip: 'pending',
    statusLabel: 'BASE FSAE (EDITABLE CAD)',
    silhouetteType: 'fsae',
    description: 'Configuración base de doble horquilla desigual (SLA - Short Long Arm) para el monoplaza Formula SAE de Politécnico Scudería SAE. Valores iniciales parametrizados bajo reglamento FSAE listos para actualizar con coordenadas finales de CAD.',
    specs: {
      wheelbase: 1550,        // mm (Reglamento FSAE >= 1525 mm)
      trackFront: 1200,       // mm
      trackRear: 1160,        // mm (Reglamento: menor >= 75% del mayor)
      cgHeight: 265,          // mm
      weightDistFront: 46,    // %
      sprungMassWithDriver: 265, // kg aprox
      tireRadius: 228,        // mm (18.0 x 7.5 - 10" Hoosier R20)
      tireWidth: 190,         // mm
      rimDiameterIn: 10,      // pulgadas
      staticCamber: -2.0,     // deg (Benchmark FSAE: 0 a -4°)
      staticToeFront: -0.3,   // deg (Toe-out delantero para turn-in)
      staticToeRear: 0.25,    // deg (Toe-in trasero para estabilidad en tracción)
      kpiAngle: 7.5,          // deg (King Pin Inclination)
      scrubRadius: 14,        // mm (Benchmark FSAE: 5 a 20 mm)
      casterAngle: 4.5,       // deg
      casterTrail: 18,        // mm
      ucaLength: 235,         // mm (Brazo superior más corto - SLA)
      lcaLength: 310,         // mm (Brazo inferior más largo)
      ucaAngleFront: 8.5,     // deg inclinación frontal horquilla sup
      lcaAngleFront: 2.5,     // deg inclinación frontal horquilla inf
      svsaHeightFront: 95,    // mm altura IC vista lateral
      svsaLengthFront: 1180,  // mm longitud SVSA delantero
      svsaHeightRear: 110,    // mm altura IC trasero vista lateral
      svsaLengthRear: 1250,   // mm longitud SVSA trasero
      ackermannPct: 68,       // % geometría de Ackermann
      tieRodOffsetMm: 0,      // mm desalineación respecto al eje al IC (Bump Steer)
      rollAngleDeg: 0,        // deg (simulación dinámica de rolido)
      heaveMm: 0,             // mm (simulación de compresión/squat/dive)
      steerAngleDeg: 0        // deg (ángulo de giro en las ruedas)
    },
    hardpoints3D: {
      // Puntos coordenados (X, Y, Z) en mm según Apunte 2 Pág. 3
      p1_ubj: { name: '1 · Upper Ball Joint (Mangueta Sup.)', x: 0, y: 542, z: 318 },
      p3_lbj: { name: '3 · Lower Ball Joint (Mangueta Inf.)', x: -15, y: 566, z: 132 },
      p2_uca_f: { name: '2 · UCA Inner Front (Chasis Sup. Del.)', x: 115, y: 310, z: 283 },
      p5_uca_r: { name: '5 · UCA Inner Rear (Chasis Sup. Tras.)', x: -110, y: 310, z: 272 },
      p4_lca_f: { name: '4 · LCA Inner Front (Chasis Inf. Del.)', x: 140, y: 256, z: 118 },
      p6_lca_r: { name: '6 · LCA Inner Rear (Chasis Inf. Tras.)', x: -135, y: 256, z: 124 }
    }
  },

  pssae_legacy: {
    id: 'pssae_legacy',
    archTitle: 'Double Wishbone',
    carName: 'PSSAE Modelo Ant.',
    badge: 'HISTÓRICO SCUDERÍA',
    category: 'Formula SAE · Generación Previa',
    statusChip: 'decision',
    statusLabel: 'REFERENCIA HISTÓRICA',
    silhouetteType: 'fsae',
    description: 'Referencia de iteración previa de la scudería: centro de gravedad más elevado, Scrub Radius mayor (mayor esfuerzo/reversibilidad en el volante al frenar) y brazos con menor convergencia cinemática.',
    specs: {
      wheelbase: 1610,
      trackFront: 1220,
      trackRear: 1180,
      cgHeight: 305,
      weightDistFront: 44,
      sprungMassWithDriver: 295,
      tireRadius: 254,        // Llanta 13" más alta
      tireWidth: 185,
      rimDiameterIn: 13,
      staticCamber: -1.2,
      staticToeFront: 0.0,
      staticToeRear: 0.1,
      kpiAngle: 10.5,
      scrubRadius: 32,        // Mayor brazo de palanca en frenada
      casterAngle: 3.2,
      casterTrail: 14,
      ucaLength: 280,         // Brazos casi iguales (menor recuperación de camber en roll)
      lcaLength: 305,
      ucaAngleFront: 4.0,
      lcaAngleFront: 1.0,
      svsaHeightFront: 45,
      svsaLengthFront: 1500,
      svsaHeightRear: 55,
      svsaLengthRear: 1450,
      ackermannPct: 95,
      tieRodOffsetMm: 8,      // Ligero bump steer presente
      rollAngleDeg: 0,
      heaveMm: 0,
      steerAngleDeg: 0
    },
    hardpoints3D: {
      p1_ubj: { name: '1 · Upper Ball Joint (Mangueta Sup.)', x: 0, y: 540, z: 345 },
      p3_lbj: { name: '3 · Lower Ball Joint (Mangueta Inf.)', x: -11, y: 575, z: 145 },
      p2_uca_f: { name: '2 · UCA Inner Front (Chasis Sup. Del.)', x: 125, y: 262, z: 325 },
      p5_uca_r: { name: '5 · UCA Inner Rear (Chasis Sup. Tras.)', x: -125, y: 262, z: 322 },
      p4_lca_f: { name: '4 · LCA Inner Front (Chasis Inf. Del.)', x: 145, y: 270, z: 140 },
      p6_lca_r: { name: '6 · LCA Inner Rear (Chasis Inf. Tras.)', x: -145, y: 270, z: 140 }
    }
  },

  fsae_benchmark: {
    id: 'fsae_benchmark',
    archTitle: 'SLA Pushrod 10"',
    carName: 'FSAE Top Benchmark',
    badge: 'BENCHMARK FSAE',
    category: 'Referencia Literatura (Milliken / OptimumG)',
    statusChip: 'verified',
    statusLabel: 'LITERATURA FSAE',
    silhouetteType: 'fsae',
    description: 'Parámetros óptimos documentados en literatura de competición FSAE (Milliken RCVD / OptimumG): bajo CG, Scrub Radius de 10 mm, Camber de -2.5° ajustado por pirómetro y Roll Center controlado para evitar efecto Jacking.',
    specs: {
      wheelbase: 1530,
      trackFront: 1180,
      trackRear: 1150,
      cgHeight: 245,
      weightDistFront: 47,
      sprungMassWithDriver: 240,
      tireRadius: 203,
      tireWidth: 190,
      rimDiameterIn: 10,
      staticCamber: -2.5,
      staticToeFront: -0.4,
      staticToeRear: 0.3,
      kpiAngle: 6.8,
      scrubRadius: 10,
      casterAngle: 5.2,
      casterTrail: 19,
      ucaLength: 215,
      lcaLength: 295,
      ucaAngleFront: 10.0,
      lcaAngleFront: 3.2,
      svsaHeightFront: 105,
      svsaLengthFront: 1050,
      svsaHeightRear: 120,
      svsaLengthRear: 1120,
      ackermannPct: 55,
      tieRodOffsetMm: 0,
      rollAngleDeg: 0,
      heaveMm: 0,
      steerAngleDeg: 0
    },
    hardpoints3D: {
      p1_ubj: { name: '1 · Upper Ball Joint (Mangueta Sup.)', x: 0, y: 545, z: 292 },
      p3_lbj: { name: '3 · Lower Ball Joint (Mangueta Inf.)', x: -16, y: 568, z: 115 },
      p2_uca_f: { name: '2 · UCA Inner Front (Chasis Sup. Del.)', x: 105, y: 332, z: 254 },
      p5_uca_r: { name: '5 · UCA Inner Rear (Chasis Sup. Tras.)', x: -105, y: 332, z: 242 },
      p4_lca_f: { name: '4 · LCA Inner Front (Chasis Inf. Del.)', x: 130, y: 274, z: 98 },
      p6_lca_r: { name: '6 · LCA Inner Rear (Chasis Inf. Tras.)', x: -130, y: 274, z: 104 }
    }
  },

  gt_corvette: {
    id: 'gt_corvette',
    archTitle: 'Double Wishbone',
    carName: 'C6 Corvette / GT',
    badge: 'GT / DEPORTIVO',
    category: 'Turismo Deportivo (Ref. Imagen)',
    statusChip: 'verified',
    statusLabel: 'COMPARATIVA GT',
    silhouetteType: 'gt',
    description: 'Deportivo de calle/pista con doble horquilla (como aparece en la referencia de Suspension School). Mayor batalla (2685 mm), centro de gravedad más alto que un FSAE y recorrido de suspensión más amplio.',
    specs: {
      wheelbase: 2685,
      trackFront: 1577,
      trackRear: 1542,
      cgHeight: 460,
      weightDistFront: 51,
      sprungMassWithDriver: 1420,
      tireRadius: 330,
      tireWidth: 275,
      rimDiameterIn: 18,
      staticCamber: -1.5,
      staticToeFront: -0.1,
      staticToeRear: 0.15,
      kpiAngle: 8.5,
      scrubRadius: 18,
      casterAngle: 7.0,
      casterTrail: 34,
      ucaLength: 270,
      lcaLength: 380,
      ucaAngleFront: 7.5,
      lcaAngleFront: 2.0,
      svsaHeightFront: 150,
      svsaLengthFront: 1850,
      svsaHeightRear: 175,
      svsaLengthRear: 1750,
      ackermannPct: 75,
      tieRodOffsetMm: 2,
      rollAngleDeg: 0,
      heaveMm: 0,
      steerAngleDeg: 0
    },
    hardpoints3D: {
      p1_ubj: { name: '1 · Upper Ball Joint (Mangueta Sup.)', x: 0, y: 710, z: 480 },
      p3_lbj: { name: '3 · Lower Ball Joint (Mangueta Inf.)', x: -35, y: 755, z: 195 },
      p2_uca_f: { name: '2 · UCA Inner Front (Chasis Sup. Del.)', x: 160, y: 442, z: 444 },
      p5_uca_r: { name: '5 · UCA Inner Rear (Chasis Sup. Tras.)', x: -160, y: 442, z: 432 },
      p4_lca_f: { name: '4 · LCA Inner Front (Chasis Inf. Del.)', x: 190, y: 376, z: 182 },
      p6_lca_r: { name: '6 · LCA Inner Rear (Chasis Inf. Tras.)', x: -190, y: 376, z: 188 }
    }
  },

  touring_e36: {
    id: 'touring_e36',
    archTitle: 'Trailing Arm / MacP.',
    carName: 'E36 BMW / GR86',
    badge: 'TOURING / CALLE',
    category: 'Turismo / Drift (Ref. Imagen)',
    statusChip: 'verified',
    statusLabel: 'COMPARATIVA TOURING',
    silhouetteType: 'gt',
    description: 'Referencia directa de la captura (E36 BMW Wheelbase 2700 mm): suspensión delantera MacPherson / trasera Trailing Arm con alto Caster positivo (+8.5°) para fuerte par autoalineante y ganancia de camber al girar.',
    specs: {
      wheelbase: 2700,
      trackFront: 1418,
      trackRear: 1432,
      cgHeight: 510,
      weightDistFront: 50,
      sprungMassWithDriver: 1350,
      tireRadius: 315,
      tireWidth: 225,
      rimDiameterIn: 17,
      staticCamber: -0.8,
      staticToeFront: 0.15,   // Toe-in positivo para estabilidad en autopista
      staticToeRear: 0.2,
      kpiAngle: 12.5,         // Típico de MacPherson
      scrubRadius: 24,
      casterAngle: 8.5,       // Alto caster (Dirección más firme y autoalineante)
      casterTrail: 42,
      ucaLength: 310,
      lcaLength: 340,
      ucaAngleFront: 5.0,
      lcaAngleFront: 1.5,
      svsaHeightFront: 130,
      svsaLengthFront: 2100,
      svsaHeightRear: 145,    // ~13% anti-squat como en la captura
      svsaLengthRear: 2200,
      ackermannPct: 85,
      tieRodOffsetMm: 4,
      rollAngleDeg: 0,
      heaveMm: 29,            // Rear squatted 29 mm como en el ejemplo visual
      steerAngleDeg: 0
    },
    hardpoints3D: {
      p1_ubj: { name: '1 · Upper Strut / Pivot', x: 0, y: 615, z: 540 },
      p3_lbj: { name: '3 · Lower Ball Joint', x: -50, y: 685, z: 180 },
      p2_uca_f: { name: '2 · Upper Mount Front', x: 90, y: 310, z: 510 },
      p5_uca_r: { name: '5 · Upper Mount Rear', x: -90, y: 310, z: 510 },
      p4_lca_f: { name: '4 · Lower Arm Inner Front', x: 150, y: 345, z: 170 },
      p6_lca_r: { name: '6 · Lower Arm Inner Rear', x: -180, y: 345, z: 176 }
    }
  },

  heavy_duty: {
    id: 'heavy_duty',
    archTitle: 'Camber (+) / Pesado',
    carName: 'Maquinaria / Urbano',
    badge: 'CASO DEL APUNTE',
    category: 'Contraste Pedagógico (Apunte Pág. 1)',
    statusChip: 'verified',
    statusLabel: 'EJEMPLO DEL APUNTE',
    silhouetteType: 'heavy',
    description: 'Caso mencionado en la Pág. 1 de tus apuntes: vehículos urbanos en recta (0° Camber) o maquinaria pesada / agrícola (+ Camber) donde la baja velocidad, la carga vertical extrema y la estabilidad en línea recta son prioridad.',
    specs: {
      wheelbase: 2400,
      trackFront: 1650,
      trackRear: 1650,
      cgHeight: 680,
      weightDistFront: 48,
      sprungMassWithDriver: 3200,
      tireRadius: 420,
      tireWidth: 260,
      rimDiameterIn: 20,
      staticCamber: 1.5,      // + Camber positivo (Apunte Pág. 1)
      staticToeFront: 0.25,   // Toe-in positivo para rectas lentas
      staticToeRear: 0.0,
      kpiAngle: 11.0,
      scrubRadius: 45,        // Scrub positivo amplio
      casterAngle: 2.0,       // Bajo caster = dirección floja/suave a baja velocidad
      casterTrail: 12,
      ucaLength: 350,         // Brazos iguales o largos arriba
      lcaLength: 330,
      ucaAngleFront: 0.0,
      lcaAngleFront: 0.0,
      svsaHeightFront: 60,
      svsaLengthFront: 2400,
      svsaHeightRear: 60,
      svsaLengthRear: 2400,
      ackermannPct: 100,      // 100% Ackermann geométrico a baja velocidad
      tieRodOffsetMm: 0,
      rollAngleDeg: 0,
      heaveMm: 0,
      steerAngleDeg: 0
    },
    hardpoints3D: {
      p1_ubj: { name: '1 · Upper Kingpin', x: 0, y: 760, z: 580 },
      p3_lbj: { name: '3 · Lower Kingpin', x: -12, y: 800, z: 240 },
      p2_uca_f: { name: '2 · Upper Pivot Front', x: 180, y: 410, z: 580 },
      p5_uca_r: { name: '5 · Upper Pivot Rear', x: -180, y: 410, z: 580 },
      p4_lca_f: { name: '4 · Lower Pivot Front', x: 180, y: 470, z: 240 },
      p6_lca_r: { name: '6 · Lower Pivot Rear', x: -180, y: 470, z: 240 }
    }
  }
};
