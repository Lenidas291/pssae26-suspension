/* ==========================================================================
   PSSAE26 AETHERIA · CURRÍCULO DE ÁNGULOS DE SUSPENSIÓN
   Estructura: 80% Apuntes de Leonardo Galeote + Analogías/Imágenes Reales +
   20% Libros del Cuaderno de Mentorías (Milliken, Carroll Smith, Gillespie).
   ========================================================================== */

window.AETHERIA_CURRICULUM = [
  {
    id: 'intro',
    num: '00',
    shortTitle: '¿Por qué Geometría?',
    title: '¿Por qué es necesaria una Geometría de Suspensión?',
    defaultCamera: 'front_full',
    cameraLabel: 'Vista Frontal Cinemática · Sensación al Volante y Agarre Mecánico',
    primaryAuthor: 'Leonardo Galeote (Apuntes de Suspensión PSSAE · Pág. 1)',
    bookCitation: 'Milliken & Milliken — Race Car Vehicle Dynamics (Cap. 17: Suspension Geometry)',
    lead: 'Al manejar un vehículo teniendo una buena configuración de suspensión dadas las propiedades del coche, el diseño se traduce en dos propósitos esenciales: primero, que la interacción del piloto con el volante sea la más amigable posible (estabilidad, facilidad de manejo, control de respuesta y suavidad); y segundo, que el vehículo explote al máximo el agarre de sus neumáticos.',
    carPhoto: 'assets/car/aetheria_front.jpg',
    carPhotoCaption: 'Vista frontal del PSSAE26 Aetheria mostrando las horquillas superiores e inferiores (Double Wishbone), pushrods y amortiguadores horizontales superiores.',
    analogy: {
      title: 'Analogía Intuitiva: Correr con suelas planas vs correr apoyando solo el tobillo',
      body: 'Imagina intentar cambiar de dirección corriendo a toda velocidad: si plantas toda la suela de tu tenis contra el piso tienes máximo agarre y control en tus piernas; pero si pisas chueco apoyando solo el borde externo del tenis, resbalas y sientes un tirón brusco. La geometría de suspensión son los "tendones y articulaciones" del PSSAE26 Aetheria que mantienen toda la suela del neumático (Contact Patch) plana contra el asfalto mientras le transmiten al piloto una sensación suave y firme en el volante.',
      author: 'Analogía Pedagógica · Leonardo Galeote'
    },
    svgDiagram: `
      <svg viewBox="0 0 320 170" width="100%" height="160">
        <rect width="320" height="170" fill="#081114"/>
        <text x="160" y="22" fill="#6FD0D8" font-family="IBM Plex Mono" font-size="11" text-anchor="middle" font-weight="700">OBJETIVO DUAL DE LA GEOMETRÍA (APUNTE PÁG. 1)</text>
        <rect x="18" y="42" width="130" height="105" fill="#14262A" stroke="#2094A0" stroke-width="1.5"/>
        <text x="83" y="66" fill="#F2F5F5" font-family="Archivo" font-size="12" text-anchor="middle" font-weight="700">1. VOLANTE AMIGABLE</text>
        <text x="83" y="88" fill="#9BB0B3" font-family="IBM Plex Sans" font-size="10.5" text-anchor="middle">• Estabilidad direccional</text>
        <text x="83" y="106" fill="#9BB0B3" font-family="IBM Plex Sans" font-size="10.5" text-anchor="middle">• Facilidad de manejo</text>
        <text x="83" y="124" fill="#9BB0B3" font-family="IBM Plex Sans" font-size="10.5" text-anchor="middle">• Suavidad y respuesta</text>
        <rect x="172" y="42" width="130" height="105" fill="#14262A" stroke="#9A6288" stroke-width="1.5"/>
        <text x="237" y="66" fill="#F2F5F5" font-family="Archivo" font-size="12" text-anchor="middle" font-weight="700">2. MÁXIMO AGARRE</text>
        <text x="237" y="88" fill="#9BB0B3" font-family="IBM Plex Sans" font-size="10.5" text-anchor="middle">• Huella de contacto 100%</text>
        <text x="237" y="106" fill="#9BB0B3" font-family="IBM Plex Sans" font-size="10.5" text-anchor="middle">• Temperatura uniforme</text>
        <text x="237" y="124" fill="#9BB0B3" font-family="IBM Plex Sans" font-size="10.5" text-anchor="middle">• Control de cargas</text>
      </svg>
    `,
    sliders: [
      {
        key: 'rollAngleDeg',
        label: 'Rolido del Chasis en Curva (Body Roll)',
        unit: '°',
        min: -3.5,
        max: 3.5,
        step: 0.1,
        help: 'Simula el rolido lateral en curva y observa arriba cómo se mueven en vivo los Instant Centers (IC) y el Roll Center (RC).'
      },
      {
        key: 'staticCamber',
        label: 'Ángulo de Camber Estático',
        unit: '°',
        min: -5.0,
        max: 3.0,
        step: 0.1,
        help: 'Inclinación inicial del neumático en vista frontal (Benchmark FSAE: 0° a -4°).'
      },
      {
        key: 'cgHeight',
        label: 'Altura del Centro de Gravedad (CG)',
        unit: 'mm',
        min: 180,
        max: 680,
        step: 5,
        help: 'Altura del CG respecto al suelo. Observa su distancia respecto al Roll Center.'
      }
    ],
    samsungNotesCore: [
      {
        title: '¿Por qué debe ser necesaria una geometría de suspensión?',
        body: 'Al manejar un vehículo teniendo una buena configuración de suspensión dadas sus propiedades físicas, se traduce en ser amable con el piloto: que su interacción con el volante brinde estabilidad, facilidad de manejo, control de respuesta y suavidad.',
        author: 'Leonardo Galeote · Apunte Pág. 1'
      },
      {
        title: 'Explotar al máximo el neumático',
        body: 'El segundo gran pilar es lograr que el monoplaza explote al máximo el agarre mecánico de sus neumáticos compensando su deformación bajo cargas laterales y longitudinales.',
        author: 'Leonardo Galeote · Apunte Pág. 1'
      },
      {
        title: 'Perder el miedo a diseñar desde cero',
        body: 'Como ingenieros, el tema de diseñar una suspensión desde cero sin datos previos da miedo. La clave como ingeniero es la iteración, la experimentación y el cálculo de limitantes o análisis de fronteras (dimensiones del chasis, masas con y sin piloto, y coordenadas del CG).',
        author: 'Leonardo Galeote · Apunte Diseño Pág. 1'
      }
    ],
    engineeringComplement: {
      title: 'Complemento Bibliográfico (20%): Sensibilidad de Carga y Parche de Contacto',
      bookSource: 'Libro citado: Milliken & Milliken — Race Car Vehicle Dynamics (Cap. 2 & Cap. 17)',
      body: 'Según Milliken (RCVD), las fuerzas que gobiernan la aceleración lateral y longitudinal del vehículo dependen de mantener la banda de rodadura en contacto uniforme con el pavimento y minimizar la transferencia de carga total mediante un centro de gravedad bajo y una distribución controlada de rigidez al rolido.',
      formula: 'F_y = \\mu(F_z) \\cdot F_z \\cdot \\eta_{\\text{camber}}(\\gamma) \\quad ; \\quad \\Delta F_z = \\frac{m \\cdot a_y \\cdot h_{\\text{CG}}}{\\text{Track Width}}',
      formulaVars: 'Fy: Fuerza lateral en curva | Fz: Carga vertical | γ: Ángulo de Camber respecto al camino | h_CG: Altura del Centro de Gravedad'
    },
    marginQuestions: [
      {
        q: '¿Hay otra razón por la que una geometría de suspensión sea necesaria?',
        a: 'Además de la suavidad en el volante y el agarre máximo de la llanta, controla la velocidad con la que se transfiere el peso en entradas de curva (a través del Roll Center y Pitch Center), evita que el auto cambie de dirección al pasar por un bache (Bump Steer) y garantiza que las horquillas trabajen únicamente a tensión y compresión axial sin doblarse.',
        cite: 'Pregunta de margen · Leonardo Galeote (Pág. 1)'
      },
      {
        q: '¿Cómo afecta directamente al volante?',
        a: 'Las fuerzas de frenado y curveo en el suelo se multiplican por dos brazos de palanca geométricos en la mangueta: el Scrub Radius y el Caster Trail. Si están bien diseñados, el volante transmite con fidelidad cuánto agarre queda; si son excesivos, el volante se vuelve sumamente duro o patea bruscamente las manos del piloto.',
        cite: 'Pregunta de margen · Leonardo Galeote (Pág. 1)'
      },
      {
        q: '¿Existe un "muy buen trabajo" en diseño de suspensión?',
        a: 'Un excelente trabajo en Formula SAE no es copiar ángulos de otro coche, sino lograr que la ganancia cinemática de camber iguale la deformación del neumático y el rolido del chasis, manteniendo temperaturas parejas a lo ancho de la llanta y un esfuerzo de dirección cómodo durante los 22 km del Endurance.',
        cite: 'Pregunta de margen · Leonardo Galeote (Pág. 1)'
      }
    ]
  },

  {
    id: 'camber',
    num: '01',
    shortTitle: 'Camber',
    title: 'Camber: Deformación de la Huella y Diagnóstico por Temperatura',
    defaultCamera: 'camber_thermal',
    cameraLabel: 'Vista Frontal de Llanta · Huella de Contacto y Termografía (T=50°C vs T=20°C)',
    primaryAuthor: 'Leonardo Galeote (Apuntes de Suspensión PSSAE · Pág. 1 y Diseño Pág. 2)',
    bookCitation: 'Carroll Smith — Tune to Win (Cap. 2: The Tire & Pyrometer Reading)',
    lead: 'La razón por la que se le añade Camber o no al vehículo es por el comportamiento en la deformación del neumático. Al aplicar una carga lateral en curva, el neumático se deforma; el Camber negativo compensa este efecto para que toda la huella apoye firme contra el asfalto.',
    carPhoto: 'assets/car/aetheria_front.jpg',
    carPhotoCaption: 'En la vista frontal del PSSAE26 Aetheria se aprecia la inclinación negativa de la parte superior de los neumáticos hacia el chasis (-Camber) para maximizar el apoyo en curvas.',
    analogy: {
      title: 'Analogía Intuitiva: Arrastrar una goma de borrar sobre la mesa',
      body: 'Toma una goma de borrar rectangular y apóyala totalmente plana (0° Camber) sobre tu escritorio. Ahora empújala con fuerza hacia un lado simulando una curva: verás que la goma se dobla, su borde interior se levanta del escritorio y solo queda raspando una esquina. En cambio, si antes de empujarla la inclinas ligeramente hacia adentro (- Camber), en el momento en que la empujas de lado la goma se deforma y toda su cara inferior queda apoyada al 100% contra la mesa.',
      author: 'Analogía basada en el diagrama de Huella de Contacto · Leonardo Galeote (Pág. 1)'
    },
    svgDiagram: `
      <svg viewBox="0 0 340 175" width="100%" height="165">
        <rect width="340" height="175" fill="#081114"/>
        <text x="170" y="18" fill="#6FD0D8" font-family="IBM Plex Mono" font-size="10.5" text-anchor="middle" font-weight="700">ESQUEMA DEL APUNTE: DEFORMACIÓN Y TEMPERATURA (PÁG. 1)</text>
        <!-- 0 Camber -->
        <rect x="26" y="38" width="34" height="62" rx="4" fill="#14262A" stroke="#DCE8E9" stroke-width="1.8"/>
        <line x1="16" y1="100" x2="70" y2="100" stroke="#6FD0D8" stroke-width="2"/>
        <text x="43" y="118" fill="#F2F5F5" font-family="IBM Plex Mono" font-size="10" text-anchor="middle">0° Camber</text>
        <text x="43" y="132" fill="#9BB0B3" font-family="IBM Plex Sans" font-size="9.5" text-anchor="middle">Rectas ciudad</text>
        <!-- + Camber -->
        <g transform="translate(135, 100) rotate(8)">
          <rect x="-17" y="-62" width="34" height="62" rx="4" fill="#14262A" stroke="#E0A84B" stroke-width="1.8"/>
        </g>
        <line x1="108" y1="100" x2="162" y2="100" stroke="#E0A84B" stroke-width="2"/>
        <text x="135" y="118" fill="#E0A84B" font-family="IBM Plex Mono" font-size="10" text-anchor="middle">+ Camber</text>
        <text x="135" y="132" fill="#9BB0B3" font-family="IBM Plex Sans" font-size="9.5" text-anchor="middle">Maquinaria pesada</text>
        <!-- - Camber + Temperatura 50°C vs 20°C -->
        <g transform="translate(248, 100) rotate(-7)">
          <rect x="-17" y="-62" width="34" height="62" rx="4" fill="#14262A" stroke="#2094A0" stroke-width="1.8"/>
          <rect x="0" y="-60" width="16" height="58" fill="rgba(229,107,97,0.55)"/>
          <rect x="-16" y="-60" width="16" height="58" fill="rgba(111,208,216,0.28)"/>
        </g>
        <line x1="215" y1="100" x2="285" y2="100" stroke="#2094A0" stroke-width="2"/>
        <text x="208" y="65" fill="#6FD0D8" font-family="IBM Plex Mono" font-size="9.5">T=20°C</text>
        <text x="272" y="82" fill="#E56B61" font-family="IBM Plex Mono" font-size="9.5">T=50°C</text>
        <text x="250" y="118" fill="#6FD0D8" font-family="IBM Plex Mono" font-size="10" text-anchor="middle">- Camber (FSAE)</text>
        <text x="250" y="132" fill="#9BB0B3" font-family="IBM Plex Sans" font-size="9.5" text-anchor="middle">Mejor en curvas</text>
      </svg>
    `,
    sliders: [
      {
        key: 'staticCamber',
        label: 'Ángulo de Camber Estático',
        unit: '°',
        min: -5.0,
        max: 3.0,
        step: 0.1,
        help: 'FSAE recomienda un benchmark de 0° a -4°. Observa cómo cambian las temperaturas T=50°C vs T=20°C arriba.'
      },
      {
        key: 'rollAngleDeg',
        label: 'Carga Lateral / Rolido en Curva',
        unit: '°',
        min: 0.0,
        max: 3.5,
        step: 0.1,
        help: 'Aplica carga lateral en curva para ver cómo la parte levantada del neumático con -Camber regresa al suelo.'
      },
      {
        key: 'ucaAngleFront',
        label: 'Inclinación Horquilla Superior (Ganancia CCR)',
        unit: '°',
        min: 0.0,
        max: 16.0,
        step: 0.5,
        help: 'Modifica el Camber Change Rate (CCR) al comprimir la suspensión.'
      }
    ],
    samsungNotesCore: [
      {
        title: '0° Camber (Neutro)',
        body: 'En línea recta toda la huella apoya sobre el suelo, pero al aplicar una carga lateral en curva una parte del neumático se despega y la otra se sobrecarga. La ventaja de este se da en el día a día con las rectas de la ciudad.',
        author: 'Leonardo Galeote · Apunte Pág. 1'
      },
      {
        title: '+ Camber (Positivo)',
        body: 'Las aplicaciones se ven con la maquinaria pesada o agrícola, donde la poca velocidad y la estabilidad lenta en línea recta bajo grandes cargas verticales son la prioridad.',
        author: 'Leonardo Galeote · Apunte Pág. 1'
      },
      {
        title: '- Camber (Negativo)',
        body: 'Al aplicar una carga lateral en curva, la parte que parecía despegada en recta regresa al suelo logrando apoyo total. Como se ve en el apunte, esta configuración es mucho mejor en curvas que en rectas.',
        author: 'Leonardo Galeote · Apunte Pág. 1'
      },
      {
        title: '¿Cuál es el mejor Camber? Benchmark FSAE y Tip de Temperaturas',
        body: 'FSAE nos da un benchmark recomendando un Camber de 0° a -4°, pero existe un tip clave: se mide la temperatura de los dos lados del neumático. Si son disparejas las temperaturas (ej. T=50°C de un lado y T=20°C del otro), nos dice que solo una parte de la llanta se usó (menos área traducida en menos agarre). Debemos corregirlo hasta llegar a un balance de temperaturas.',
        author: 'Leonardo Galeote · Apunte Pág. 1'
      }
    ],
    engineeringComplement: {
      title: 'Complemento Bibliográfico (20%): Camber Change Rate (CCR) y Uso del Pirómetro',
      bookSource: 'Libros citados: Carroll Smith — Tune to Win (Cap. 2) & Claude Rouelle — OptimumG',
      body: 'Como se establece en el Apunte de Diseño (Pág. 2) y en Carroll Smith, la ganancia de camber por pulgada de recorrido vertical (Camber Change Rate) depende de la distancia al Centro Instantáneo (FVSA Length). En pista, el pirómetro de aguja confirma si el Camber estático más la ganancia cinemática mantienen la diferencia entre hombro interior y exterior dentro de 5°C a 8°C.',
      formula: '\\text{CCR} = \\tan^{-1}\\left(\\frac{1}{\\text{FVSA}_{\\text{length}}}\\right) \\quad ; \\quad \\text{FVSA}_{\\text{length}} = \\frac{\\text{Track Width} / 2}{1 - \\text{Roll Camber}}',
      formulaVars: 'CCR: Camber Change Rate (grados/pulgada) | FVSA Length: Distancia al IC frontal | Roll Camber = Wheel Camber Angle / Chassis Roll Angle'
    },
    marginQuestions: [
      {
        q: '¿Por qué se gana o se pierde Camber cuando trabaja la suspensión?',
        a: 'Por la diferencia de longitud e inclinación entre la horquilla superior (más corta, SLA) y la horquilla inferior (más larga). Al subir la rueda en un bache o en el apoyo de una curva, el brazo superior describe un arco más cerrado y tira de la parte alta de la llanta hacia adentro del chasis, ganando Camber negativo.',
        cite: 'Pregunta de margen · Leonardo Galeote (Pág. 1)'
      },
      {
        q: '¿Qué pasa si ponemos demasiado Camber negativo (ej. -4.5°) para las rectas?',
        a: 'En las zonas de frenado en línea recta el neumático solo apoya sobre una franja angosta interior (que sube a >50°C mientras el exterior queda frío a 20°C), provocando bloqueo prematuro de frenos y alargando la distancia de frenado.',
        cite: 'Análisis Térmico · Leonardo Galeote (Pág. 1) & Carroll Smith'
      }
    ]
  },

  {
    id: 'toe',
    num: '02',
    shortTitle: 'Toe Angles',
    title: 'Toe Angles (Convergencia / Divergencia) y Control de Bump Steer',
    defaultCamera: 'top_toe',
    cameraLabel: 'Vista Superior en Planta · Toe Neutro (0°), Toe Positivo (In) y Toe Negativo (Out)',
    primaryAuthor: 'Leonardo Galeote (Apuntes de Suspensión PSSAE · Pág. 2 y Pág. 7)',
    bookCitation: 'Thomas D. Gillespie — Fundamentals of Vehicle Dynamics (Cap. 6: Steering & Cornering)',
    lead: 'Básicamente los Toe Angles son la dirección a la que apuntan las llantas si las vemos desde el frente o desde arriba. La añadidura de un "Toe In" o "Toe Out" nos ayuda a elegir entre estabilidad a altas velocidades en recta o agilidad de entrada en curva.',
    carPhoto: 'assets/car/aetheria_top_susp.jpg',
    carPhotoCaption: 'Vista superior real del PSSAE26 Aetheria donde se aprecian los triángulos de las horquillas delanteras, los tirantes de dirección (tie-rods) y el sistema de amortiguación superior.',
    analogy: {
      title: 'Analogía Intuitiva: Esquiar en "Cuña / Pizza" (Toe In) vs Patinar con puntas abiertas (Toe Out)',
      body: 'Cuando alguien aprende a esquiar en nieve y quiere ir estable en línea recta sin desviarse, junta ligeramente las puntas de los esquís hacia adentro ("Pizza" = Toe Positivo / Toe In): si el cuerpo intenta irse a un lado, el esquí contrario ya está apuntando para regresarlo al centro. En cambio, un patinador de velocidad que quiere girar rapidísimo hacia una esquina abre las puntas de los pies hacia afuera (Toe Negativo / Toe Out), porque el pie interior ya apunta hacia la curva antes siquiera de girar el torso.',
      author: 'Analogía Pedagógica · Leonardo Galeote'
    },
    svgDiagram: `
      <svg viewBox="0 0 340 165" width="100%" height="160">
        <rect width="340" height="165" fill="#081114"/>
        <text x="170" y="18" fill="#6FD0D8" font-family="IBM Plex Mono" font-size="10.5" text-anchor="middle" font-weight="700">ESQUEMA DEL APUNTE: TOE NEUTRO / POSITIVO / NEGATIVO (PÁG. 2)</text>
        <!-- Toe Neutro -->
        <line x1="40" y1="60" x2="76" y2="60" stroke="#9BB0B3" stroke-width="2"/>
        <line x1="58" y1="60" x2="58" y2="120" stroke="#9BB0B3" stroke-width="2"/>
        <rect x="32" y="45" width="12" height="30" fill="#14262A" stroke="#FFF" stroke-width="1.5"/>
        <rect x="72" y="45" width="12" height="30" fill="#14262A" stroke="#FFF" stroke-width="1.5"/>
        <text x="58" y="142" fill="#F2F5F5" font-family="IBM Plex Mono" font-size="10" text-anchor="middle">Toe Neutro (0°)</text>
        <!-- Toe Positivo (In) -->
        <line x1="152" y1="60" x2="188" y2="60" stroke="#9BB0B3" stroke-width="2"/>
        <line x1="170" y1="60" x2="170" y2="120" stroke="#9BB0B3" stroke-width="2"/>
        <g transform="translate(148,60) rotate(12)"><rect x="-6" y="-15" width="12" height="30" fill="#14262A" stroke="#6FD0D8" stroke-width="1.5"/></g>
        <g transform="translate(192,60) rotate(-12)"><rect x="-6" y="-15" width="12" height="30" fill="#14262A" stroke="#6FD0D8" stroke-width="1.5"/></g>
        <text x="170" y="142" fill="#6FD0D8" font-family="IBM Plex Mono" font-size="10" text-anchor="middle">Toe (+) In</text>
        <!-- Toe Negativo (Out) -->
        <line x1="262" y1="60" x2="298" y2="60" stroke="#9BB0B3" stroke-width="2"/>
        <line x1="280" y1="60" x2="280" y2="120" stroke="#9BB0B3" stroke-width="2"/>
        <g transform="translate(258,60) rotate(-12)"><rect x="-6" y="-15" width="12" height="30" fill="#14262A" stroke="#E0A84B" stroke-width="1.5"/></g>
        <g transform="translate(302,60) rotate(12)"><rect x="-6" y="-15" width="12" height="30" fill="#14262A" stroke="#E0A84B" stroke-width="1.5"/></g>
        <text x="280" y="142" fill="#E0A84B" font-family="IBM Plex Mono" font-size="10" text-anchor="middle">Toe (-) Out</text>
      </svg>
    `,
    sliders: [
      {
        key: 'staticToeFront',
        label: 'Toe Delantero (+ Toe In / - Toe Out)',
        unit: '°',
        min: -2.0,
        max: 2.0,
        step: 0.05,
        help: 'Positivo (+) apunta las llantas hacia adentro; Negativo (-) las abre hacia afuera para mejorar la entrada en curva.'
      },
      {
        key: 'staticToeRear',
        label: 'Toe Trasero (+ Toe In / - Toe Out)',
        unit: '°',
        min: -1.5,
        max: 2.0,
        step: 0.05,
        help: 'En el eje trasero un Toe(-) ocasiona derrape en curvas; se prefiere Toe(0) o ligero Toe(+).'
      },
      {
        key: 'tieRodOffsetMm',
        label: 'Desalineación de Rótulas Dirección (Bump Steer)',
        unit: 'mm',
        min: -25,
        max: 25,
        step: 1,
        help: 'Como indica la Pág. 7 del apunte: si las rótulas no intersectan en el eje del IC, aparece Bump Steer.'
      }
    ],
    samsungNotesCore: [
      {
        title: 'Estabilidad a altas velocidades vs Derrape en curvas (Pág. 2)',
        body: 'La añadidura de un "Toe In" o "Toe Out" nos ayuda a la estabilidad de vehículos a altas velocidades. Existen configuraciones que nos dan diversas ventajas, como usar Toe(+) o ligero Toe Out controlado adelante y Toe(0) o Toe(+) en la parte trasera.',
        author: 'Leonardo Galeote · Apunte Pág. 2'
      },
      {
        title: 'Peligro del Toe (-) en el eje trasero',
        body: 'Algunas configuraciones como un Toe(-) en la parte trasera ocasionan derrape (sobreviraje) en curvas, esto porque se centra la carga en ambas ruedas que al apuntar en direcciones divergentes desestabilizan la cola del vehículo.',
        author: 'Leonardo Galeote · Apunte Pág. 2'
      },
      {
        title: 'Alineación sucesiva de rótulas contra el Bump Steer (Pág. 7)',
        body: 'Como dato fundamental: la forma en la que acomodamos el sucesivo de rótulas también afecta. La alineación de nuestras rótulas en todo momento es importante en el movimiento vertical: trazando un eje, todas deben intersectarse para evitar el Bump Steer.',
        author: 'Leonardo Galeote · Apunte Pág. 7'
      }
    ],
    engineeringComplement: {
      title: 'Complemento Bibliográfico (20%): Cinemática de Bump Steer',
      bookSource: 'Libro citado: Carroll Smith — Tune to Win (Cap. 4) & Milliken RCVD',
      body: 'Para que el ángulo Toe permanezca constante cuando la rueda sube y baja en un bache, el tirante de dirección (Tie-Rod) debe tener una longitud e inclinación tales que su proyección pase exactamente por el Centro Instantáneo (IC) de las horquillas.',
      formula: '\\Delta \\delta_{\\text{bump}}(z) = 0 \\iff \\text{Proyección(Tie-Rod)} \\cap \\text{Proyección(UCA, LCA)} = \\text{I.C.}',
      formulaVars: 'Δδ_bump: Cambio involuntario de ángulo Toe durante el recorrido vertical z de la suspensión'
    },
    marginQuestions: [
      {
        q: '¿Qué geometrías evitan el cambio del ángulo TOE?',
        a: 'Aquellas donde las 3 rótulas del lado del chasis (horquilla superior, horquilla inferior y cremallera de dirección) y las 3 rótulas del lado de la mangueta están alineadas sobre rectas que convergen en el mismo Centro Instantáneo de Rotación (IC).',
        cite: 'Pregunta de margen · Leonardo Galeote (Pág. 2 y Pág. 7)'
      },
      {
        q: '¿Por qué se hace más impredecible el coche cuando este ángulo cambia solo?',
        a: 'Porque al frenar o pisar un desnivel en plena curva la suspensión se comprime y la llanta gira sola sin que el piloto haya movido el volante, cambiando repentinamente la trayectoria del monoplaza.',
        cite: 'Pregunta de margen · Leonardo Galeote (Pág. 2)'
      },
      {
        q: '¿Cómo ayuda el TOE Out (-) en la parte delantera?',
        a: 'Al apuntar ligeramente hacia afuera, la rueda interior de la curva ya tiene pre-iniciado un ángulo de giro mayor hacia adentro del viraje, dando una respuesta inicial (turn-in) mucho más ágil en los circuitos revirados de Formula SAE.',
        cite: 'Pregunta de margen · Leonardo Galeote (Pág. 2)'
      }
    ]
  },

  {
    id: 'kpi_scrub',
    num: '03',
    shortTitle: 'KPI & Scrub Radius',
    title: 'King Pin Angle (KPA / KPI) y Scrub Radius',
    defaultCamera: 'front_upright',
    cameraLabel: 'Vista Frontal de Mangueta · Eje KPI, Rótulas y Brazo de Palanca Scrub Radius',
    primaryAuthor: 'Leonardo Galeote (Apuntes de Suspensión PSSAE · Págs. 2–3 y Diseño Pág. 1)',
    bookCitation: 'Thomas D. Gillespie — Fundamentals of Vehicle Dynamics (Cap. 7: Steering Axis & Scrub)',
    lead: 'El King Pin Angle (KPA o KPI) es el eje sobre el cual gira nuestro neumático al dar dirección (definido por las rótulas como apoyos fijos). La distancia en el suelo entre el eje vertical del neumático y el punto que toca el suelo del KPI Axis es el Scrub Radius.',
    carPhoto: 'assets/car/aetheria_nose_side.jpg',
    carPhotoCaption: 'Detalle tres cuartos delantero del PSSAE26 Aetheria mostrando el empaquetamiento de los brazos de suspensión hacia el interior de la mangueta y el rin.',
    analogy: {
      title: 'Analogía Intuitiva: Sostener una cubeta pegada al cuerpo vs con el brazo estirado',
      body: 'El Scrub Radius es literalmente un brazo de palanca entre la llanta y tus manos en el volante. Imagina que alguien golpea tu mano hacia atrás: si tienes el puño pegado a tu hombro (Scrub Radius pequeño de 5 a 20 mm como recomienda FSAE), apenas te gira el torso. Pero si tienes el brazo totalmente extendido hacia un lado (Scrub Radius enorme), cualquier golpe o frenada en un bache te hará girar el hombro con violencia (reversibilidad brusca en el volante).',
      author: 'Analogía basada en el Brazo de Palanca · Leonardo Galeote (Pág. 3)'
    },
    svgDiagram: `
      <svg viewBox="0 0 340 175" width="100%" height="165">
        <rect width="340" height="175" fill="#081114"/>
        <text x="170" y="18" fill="#6FD0D8" font-family="IBM Plex Mono" font-size="10.5" text-anchor="middle" font-weight="700">ESQUEMA DEL APUNTE: KPI, SCRUB RADIUS Y FRENADO (PÁGS. 2–3)</text>
        <line x1="30" y1="142" x2="310" y2="142" stroke="#9BB0B3" stroke-width="1.8"/>
        <!-- Llanta -->
        <rect x="175" y="38" width="64" height="104" rx="6" fill="#14262A" stroke="#FFF" stroke-width="2"/>
        <!-- Vertical axis -->
        <line x1="207" y1="26" x2="207" y2="155" stroke="#6FD0D8" stroke-width="1.8" stroke-dasharray="4 3"/>
        <!-- KPI Axis -->
        <line x1="152" y1="26" x2="184" y2="155" stroke="#E0A84B" stroke-width="2" stroke-dasharray="5 3"/>
        <!-- Horquillas rojas -->
        <line x1="65" y1="62" x2="160" y2="52" stroke="#E56B61" stroke-width="3.2"/>
        <line x1="65" y1="122" x2="177" y2="120" stroke="#E56B61" stroke-width="3.2"/>
        <!-- Flecha roja y azul -->
        <line x1="207" y1="65" x2="207" y2="125" stroke="#E56B61" stroke-width="2.5"/>
        <text x="278" y="88" fill="#E56B61" font-family="IBM Plex Mono" font-size="9.5" text-anchor="middle">Flecha Roja:</text>
        <text x="278" y="101" fill="#E56B61" font-family="IBM Plex Mono" font-size="9.5" text-anchor="middle">Agarre / Frenado</text>
        <text x="195" y="166" fill="#E0A84B" font-family="IBM Plex Mono" font-size="10" text-anchor="middle">↔ Scrub Radius (5–20 mm FSAE)</text>
      </svg>
    `,
    sliders: [
      {
        key: 'kpiAngle',
        label: 'King Pin Angle (KPI / KPA)',
        unit: '°',
        min: 0.0,
        max: 16.0,
        step: 0.25,
        help: 'Inclinación del eje de dirección. Como dice tu apunte: necesitar hasta 16° complica la geometría y hace rudo el manejo.'
      },
      {
        key: 'scrubRadius',
        label: 'Scrub Radius (Distancia en el suelo)',
        unit: 'mm',
        min: -20,
        max: 55,
        step: 1,
        help: 'FSAE propone un Scrub Radius de entre 5 a 20 mm (Apunte Diseño Pág. 1).'
      }
    ],
    samsungNotesCore: [
      {
        title: '¿Por qué está ahí el eje KPI? (Apunte Pág. 2)',
        body: 'El neumático no gira sobre un eje vertical perfecto, sino porque ahí están los anclajes de las rótulas superior e inferior. Lo que en mecánica de materiales serían "apoyos fijos", aquí las rótulas solo permiten el giro y la rotación de dirección del neumático.',
        author: 'Leonardo Galeote · Apunte Pág. 2'
      },
      {
        title: '¿Y este de qué sirve al frenar? Flecha Roja y Flecha Azul (Pág. 3)',
        body: 'Al frenar con el vehículo se producen fuerzas en nuestro neumático:\n• Flecha Roja: Agarre / fuerza longitudinal de la llanta.\n• Flecha Azul: Momento de giro del neumático alrededor del eje de dirección.\nAl ser el Scrub Radius un brazo de palanca con la dirección, entre mayor sea este, más fácil se gira estáticamente, pero dinámicamente las fuerzas retornan en la reversibilidad del volante de una manera brusca.',
        author: 'Leonardo Galeote · Apunte Pág. 3'
      },
      {
        title: 'Scrub Radius Positivo vs Negativo y Regla FSAE (5 a 20 mm)',
        body: 'Un Scrub Radius negativo puede generar ganancia de Toe Out y requiere un KPA de hasta 16°, lo cual complica la geometría de suspensión y hace muy rudo de manejar el vehículo. En cambio, un Scrub positivo moderado es beneficioso en camino irregular, da estabilidad en línea recta y buena reversibilidad. Para FSAE se propone un Scrub Radius de entre 5 a 20 mm (o 35–45% de referencia del conjunto).',
        author: 'Leonardo Galeote · Apunte Pág. 3 y Diseño Pág. 1'
      }
    ],
    engineeringComplement: {
      title: 'Complemento Bibliográfico (20%): Momento sobre el Eje Kingpin y Efecto Jacking',
      bookSource: 'Libro citado: Thomas D. Gillespie — Fundamentals of Vehicle Dynamics (Cap. 7)',
      body: 'Cuando una rueda frena sobre una superficie con diferente coeficiente de fricción (o con diferente carga vertical en entrada de curva), el momento transmitido a la columna de dirección es directamente proporcional al Scrub Radius. Además, el ángulo KPI provoca que al girar el volante se gane camber positivo en razón de KPI · (1 - cos δ).',
      formula: 'M_{\\text{dirección}} = F_{x,\\text{frenado}} \\cdot r_{\\text{scrub}} \\quad ; \\quad \\Delta \\gamma_{\\text{KPI}}(\\delta) = +\\theta_{\\text{KPI}} \\cdot (1 - \\cos \\delta)',
      formulaVars: 'M_dirección: Torque en el eje de giro (Flecha azul) | F_x: Fuerza en la llanta (Flecha roja) | r_scrub: Scrub Radius'
    },
    marginQuestions: [
      {
        q: '¿Cómo afecta el KPI a la ganancia de Camber?',
        a: 'Un KPI alto hace que al girar el volante la rueda gane Camber POSITIVO (inclinándose hacia afuera en la parte superior) y levante el frente del chasis (efecto Jacking). Por eso en FSAE mantenemos un KPI moderado (6°–8°) y usamos Caster positivo para contrarrestarlo y ganar Camber negativo al girar.',
        cite: 'Pregunta de margen · Leonardo Galeote (Pág. 3)'
      }
    ]
  },

  {
    id: 'caster',
    num: '04',
    shortTitle: 'Caster',
    title: 'Caster: Torque Correctivo (M = F · D) y Ganancia de Camber (-)',
    defaultCamera: 'side_upright',
    cameraLabel: 'Vista Lateral del Rin · Eje de las 2 Rótulas, Puntos P1 y P2, y Torque Correctivo',
    primaryAuthor: 'Leonardo Galeote (Apuntes de Suspensión PSSAE · Pág. 4)',
    bookCitation: 'Milliken & Milliken — Race Car Vehicle Dynamics (Cap. 17: Caster & Trail)',
    lead: 'El Caster es el ángulo formado por el trazo de las 2 rótulas viendo el neumático del lado del rin. Básicamente, lo que hace el Caster positivo es oponerse al movimiento del volante fuera de la dirección recta mediante un torque correctivo y hacernos ganar Camber negativo al girar la llanta.',
    carPhoto: 'assets/car/aetheria_side.jpg',
    carPhotoCaption: 'Vista lateral del PSSAE26 Aetheria #88. En esta vista lateral se define la inclinación del eje que une la rótula superior e inferior (Caster Angle).',
    analogy: {
      title: 'Analogía Clásica del Apunte: La Rueda del Carrito de Supermercado',
      body: 'Observa las rueditas locas de un carrito de supermercado: el perno vertical que gira está adelantado (Punto P1) respecto al punto donde la rueda de goma toca el piso (Punto P2). Gracias a esa distancia D (Trail), apenas empujas el carrito hacia adelante, la rueda se alinea sola inmediatamente detrás del perno. Si intentas girar la rueda con el pie mientras avanza, sientes una fuerza ("Torque correctivo" M = F · D) que la obliga a regresar a la posición recta.',
      author: 'Analogía del Apunte · Leonardo Galeote (Pág. 4)'
    },
    svgDiagram: `
      <svg viewBox="0 0 340 175" width="100%" height="165">
        <rect width="340" height="175" fill="#081114"/>
        <text x="170" y="18" fill="#6FD0D8" font-family="IBM Plex Mono" font-size="10.5" text-anchor="middle" font-weight="700">ESQUEMA DEL APUNTE: POSITIVE CASTER Y PUNTOS P1 / P2 (PÁG. 4)</text>
        <line x1="25" y1="140" x2="315" y2="140" stroke="#9BB0B3" stroke-width="1.8"/>
        <circle cx="145" cy="90" r="50" fill="#14262A" stroke="#FFF" stroke-width="2"/>
        <circle cx="145" cy="90" r="28" fill="none" stroke="#6FD0D8" stroke-width="1.5"/>
        <!-- Eje vertical P2 -->
        <line x1="145" y1="30" x2="145" y2="152" stroke="#9BB0B3" stroke-width="1.4" stroke-dasharray="3 3"/>
        <!-- Eje Caster P1 -->
        <line x1="122" y1="30" x2="178" y2="140" stroke="#E56B61" stroke-width="2.4"/>
        <text x="135" y="158" fill="#E56B61" font-family="IBM Plex Mono" font-size="10">P2</text>
        <text x="180" y="158" fill="#6FD0D8" font-family="IBM Plex Mono" font-size="10">P1</text>
        <text x="162" y="168" fill="#E0A84B" font-family="IBM Plex Mono" font-size="9.5" text-anchor="middle">↔ D (Trail)</text>
        <text x="260" y="65" fill="#6FD0D8" font-family="IBM Plex Mono" font-size="11" font-weight="700" text-anchor="middle">M = F · D</text>
        <text x="260" y="88" fill="#F2F5F5" font-family="IBM Plex Sans" font-size="10" text-anchor="middle">Bajo Caster = Dir. Floja</text>
        <text x="260" y="106" fill="#F2F5F5" font-family="IBM Plex Sans" font-size="10" text-anchor="middle">Alto Caster = Dir. Dura</text>
        <text x="260" y="126" fill="#D28EC0" font-family="IBM Plex Mono" font-size="10" text-anchor="middle">+Caster → Gana Camber(-)</text>
      </svg>
    `,
    sliders: [
      {
        key: 'casterAngle',
        label: 'Ángulo de Caster (Positive Caster)',
        unit: '°',
        min: -2.0,
        max: 10.0,
        step: 0.25,
        help: 'Bajo Caster = Dirección floja | Alto Caster = Dirección dura y mayor ganancia de Camber(-) al girar.'
      },
      {
        key: 'casterTrail',
        label: 'Distancia D entre P1 y P2 (Caster Trail)',
        unit: 'mm',
        min: 0,
        max: 50,
        step: 1,
        help: 'Brazo de palanca D que produce el torque correctivo M = F · D.'
      },
      {
        key: 'steerAngleDeg',
        label: 'Giro de la Llanta con el Volante (Steer)',
        unit: '°',
        min: -28,
        max: 28,
        step: 1,
        help: 'Gira la llanta para comprobar el beneficio del apunte: "Al girar la llanta, ganamos camber (-)".'
      }
    ],
    samsungNotesCore: [
      {
        title: '¿Cómo funciona el Positive Caster? Puntos P1 y P2 (Pág. 4)',
        body: 'La rueda busca alinearse al punto de contacto con el suelo (del caster) y seguir la dirección hacia la que se empuja. Hay dos puntos en el suelo (P1 y P2) separados por una distancia D, donde se produce un torque "correctivo" (M = F · D) que fuerza al neumático a regresar a una posición recta.',
        author: 'Leonardo Galeote · Apunte Pág. 4'
      },
      {
        title: 'Bajo Caster vs Alto Caster',
        body: '• Bajo Caster: Dirección floja (poca resistencia al girar el volante).\n• Alto Caster: Dirección dura (gran par autoalineante que se opone a sacar el volante de la recta).',
        author: 'Leonardo Galeote · Apunte Pág. 4'
      },
      {
        title: 'Beneficio Principal en Curvas',
        body: 'Caster positivo: Al girar la llanta con el volante, ganamos automáticamente Camber negativo (-) en la rueda exterior de la curva.',
        author: 'Leonardo Galeote · Apunte Pág. 4'
      }
    ],
    engineeringComplement: {
      title: 'Complemento Bibliográfico (20%): Ganancia Trigonométrica de Camber por Giro',
      bookSource: 'Libro citado: Milliken & Milliken — Race Car Vehicle Dynamics (Cap. 17)',
      body: 'Cuando el eje de las rótulas está inclinado hacia atrás un ángulo θ_caster, al rotar la mangueta un ángulo de dirección δ alrededor de ese eje inclinado, el plano de la rueda se inclina hacia el interior de la curva siguiendo una relación sinusoidal directa:',
      formula: 'M_{\\text{correctivo}} = F_y \\cdot D \\quad ; \\quad \\Delta \\gamma(\\delta) \\approx -\\theta_{\\text{caster}} \\cdot \\sin(\\delta) + \\theta_{\\text{KPI}} \\cdot (1 - \\cos(\\delta))',
      formulaVars: 'M_correctivo: Par autoalineante en el volante | Fy: Fuerza lateral | D: Distancia P1 a P2 | δ: Ángulo de giro de dirección'
    },
    marginQuestions: [
      {
        q: '¿Qué efectos tiene el Caster negativo?',
        a: 'Invierte la posición de P1 detrás de P2: el torque deja de ser correctivo y tiende a girar el volante aún más hacia la curva de forma inestable, además de hacer que la rueda exterior gane Camber positivo (perdiendo agarre).',
        cite: 'Pregunta de margen · Leonardo Galeote (Pág. 4)'
      },
      {
        q: '¿Qué pasa con el Caster en el eje trasero?',
        a: 'Como se explica en la Pág. 6 de tu apunte: si en la rueda trasera una horquilla es horizontal y la otra está inclinada (para dar Anti-Squat), cuando la suspensión sube en un bache el ángulo de Caster trasero cambia dinámicamente (la mangueta rota sobre sus anclajes), haciendo que el porcentaje de Anti-Squat disminuya durante la compresión.',
        cite: 'Pregunta de margen · Leonardo Galeote (Pág. 4 y Pág. 6)'
      },
      {
        q: 'Más Caster significa más Camber (-): ¿Cómo se da esta ganancia?',
        a: 'Porque el eje de giro no es vertical sino inclinado hacia atrás; por lo tanto, girar la rueda alrededor de un eje inclinado proyecta una parte de ese giro como inclinación lateral (Camber negativo en la rueda exterior y Camber hacia la curva en la interior).',
        cite: 'Pregunta de margen · Leonardo Galeote (Pág. 4)'
      }
    ]
  },

  {
    id: 'roll_center',
    num: '05',
    shortTitle: 'Roll Center & Brazos',
    title: 'Roll Center, Centros Instantáneos (I.C.) y Longitud de Brazos (SLA)',
    defaultCamera: 'front_full',
    cameraLabel: 'Vista Frontal Widescreen · Movimiento Dinámico del I.C. y del Roll Center en Rolido',
    primaryAuthor: 'Leonardo Galeote (Apuntes de Suspensión PSSAE · Págs. 5, 6 y 7 + Diseño Págs. 2–3)',
    bookCitation: 'Milliken & Milliken — Race Car Vehicle Dynamics (Cap. 16 & Cap. 17: Roll Center & SLA)',
    lead: 'El Roll Center es el eje de referencia sobre el cual rota el coche en presencia de fuerzas laterales (curvas). Además, el tamaño de los brazos de suspensión sí importa: en coches de carreras la constante de diseño son brazos cortos arriba y brazos largos abajo.',
    carPhoto: 'assets/car/aetheria_front.jpg',
    carPhotoCaption: 'En la vista frontal real del PSSAE26 Aetheria puedes observar cómo el brazo superior (UCA) es más corto y tiene mayor inclinación que el brazo inferior (LCA) para controlar el Roll Center y la ganancia de Camber.',
    analogy: {
      title: 'Analogía Intuitiva: El Trapecio Desigual vs un Rectángulo Rígido',
      body: 'Imagina sostener un libro verticalmente entre tus dos manos (la mano de arriba es el brazo superior y la de abajo es el brazo inferior). Si ambos brazos miden exactamente lo mismo (un rectángulo), cuando tu cuerpo se inclina hacia afuera en una curva el libro se inclina contigo y pierde apoyo. Pero si tu brazo superior es más corto (trapecio SLA), al subir las manos el brazo corto jala la parte superior del libro hacia ti, manteniéndolo firme contra el piso.',
      author: 'Analogía de Geometría de Brazos · Leonardo Galeote (Pág. 7)'
    },
    svgDiagram: `
      <svg viewBox="0 0 340 175" width="100%" height="165">
        <rect width="340" height="175" fill="#081114"/>
        <text x="170" y="18" fill="#6FD0D8" font-family="IBM Plex Mono" font-size="10.5" text-anchor="middle" font-weight="700">ESQUEMA DEL APUNTE: TAMAÑO DE BRAZOS Y ESFUERZOS (PÁG. 7)</text>
        <!-- Brazos sup cortos -->
        <polygon points="36,48 84,48 96,86 24,86" fill="none" stroke="#6FD0D8" stroke-width="2"/>
        <text x="60" y="104" fill="#6FD0D8" font-family="IBM Plex Mono" font-size="9.5" text-anchor="middle">Sup. Cortos (SLA)</text>
        <text x="60" y="117" fill="#9BB0B3" font-family="IBM Plex Sans" font-size="9" text-anchor="middle">Gana Camber(-)</text>
        <!-- Brazos iguales -->
        <rect x="134" y="48" width="68" height="38" fill="none" stroke="#DCE8E9" stroke-width="2"/>
        <text x="168" y="104" fill="#F2F5F5" font-family="IBM Plex Mono" font-size="9.5" text-anchor="middle">Brazos Iguales</text>
        <text x="168" y="117" fill="#9BB0B3" font-family="IBM Plex Sans" font-size="9" text-anchor="middle">Rola con chasis</text>
        <!-- Brazos sup largos -->
        <polygon points="234,48 314,48 298,86 250,86" fill="none" stroke="#E56B61" stroke-width="2"/>
        <text x="274" y="104" fill="#E56B61" font-family="IBM Plex Mono" font-size="9.5" text-anchor="middle">Sup. Largos</text>
        <text x="274" y="117" fill="#9BB0B3" font-family="IBM Plex Sans" font-size="9" text-anchor="middle">Pierde agarre</text>
        <!-- Nota de Esfuerzos -->
        <rect x="24" y="128" width="292" height="34" fill="#14262A" stroke="#5E2E4F"/>
        <text x="170" y="149" fill="#F2F5F5" font-family="IBM Plex Mono" font-size="9.5" text-anchor="middle">Esfuerzos en Horquillas: SOLO Tensión y Compresión normal (Pág. 7)</text>
      </svg>
    `,
    sliders: [
      {
        key: 'rollAngleDeg',
        label: 'Simular Rolido en Curva (Body Roll → Mueve IC y RC)',
        unit: '°',
        min: -3.5,
        max: 3.5,
        step: 0.1,
        help: '¡Mueve este control y observa arriba cómo se desplazan en vivo los Instant Centers (IC) y el Roll Center (RC)!'
      },
      {
        key: 'ucaLength',
        label: 'Longitud Horquilla Superior (Cortos / Iguales / Largos)',
        unit: 'mm',
        min: 170,
        max: 390,
        step: 5,
        help: 'Compara brazos superiores cortos (< 310 mm) vs iguales (= 310 mm) vs largos (> 310 mm).'
      },
      {
        key: 'ucaAngleFront',
        label: 'Inclinación Horquilla Superior (Proyección al IC)',
        unit: '°',
        min: -2.0,
        max: 16.0,
        step: 0.5,
        help: 'Cambia la intersección de las líneas naranjas punteadas para acercar o alejar el Instant Center (IC).'
      },
      {
        key: 'lcaAngleFront',
        label: 'Inclinación Horquilla Inferior',
        unit: '°',
        min: -3.0,
        max: 10.0,
        step: 0.5,
        help: 'Ajusta la altura del Roll Center buscando menos Body Roll y previniendo el efecto Jacking.'
      }
    ],
    samsungNotesCore: [
      {
        title: '¿Cómo encontramos o medimos el Roll Center? (3 Pasos · Pág. 5)',
        body: '① Proyectamos la línea que llevan las horquillas izquierda y derecha (líneas naranjas/rojas punteadas) hasta hallar los Instant Centers (I.C.).\n② Trazamos una línea desde el centro del Contact Patch hasta donde se intersectan los ejes de las proyecciones de las horquillas (línea azul punteada).\n③ La intersección de ambas proyecciones azules es el Roll Center.',
        author: 'Leonardo Galeote · Apunte Pág. 5'
      },
      {
        title: 'Brazos de suspensión: ¿El tamaño importa? En este caso sí... (Pág. 7)',
        body: 'La constante de diseño en coches de carreras son Brazos cortos arriba y Brazos largos abajo (El brazo superior de la doble horquilla es más pequeño que el inferior por la ganancia de camber).\n• Si tenemos brazos superiores más largos: al entrar en una curva la rueda exterior tiende a girar junto con el chasis y pierde agarre.\n• Desventaja de brazos MUY cortos: al bajar el chasis cerca del suelo tenemos una ganancia muy extrema de camber, perdiendo contact patch.',
        author: 'Leonardo Galeote · Apunte Págs. 6 y 7'
      },
      {
        title: '¿Cómo se comportan los esfuerzos en las horquillas? (Pág. 7)',
        body: 'De lo que se pensaría comúnmente es que las horquillas cargan al coche completo a flexión, lo cual está en lo incorrecto: sobre las horquillas solamente se presentan esfuerzos normales de compresión y tensión en cada uno de los dos brazos.',
        author: 'Leonardo Galeote · Apunte Pág. 7'
      }
    ],
    engineeringComplement: {
      title: 'Complemento Bibliográfico (20%): Migración Dinámica del Roll Center y Efecto Jacking',
      bookSource: 'Libros citados: Milliken & Milliken — RCVD (Cap. 16) & OptimumG',
      body: 'El Roll Center no permanece quieto: cuando el chasis rola en curva, los ángulos de las horquillas izquierda y derecha cambian de forma asimétrica, provocando que el IC exterior se acerque y el IC interior se aleje. Esto desplaza el Roll Center lateralmente (ΔY) y verticalmente (ΔZ). Como anotas en el Apunte de Diseño (Pág. 2), se debe proponer una altura de Roll Center que reduzca el Body Roll sin generar efecto Jacking.',
      formula: 'M_{\\text{roll}} = m_s \\cdot a_y \\cdot (h_{\\text{CG}} - z_{\\text{RC}}) \\quad ; \\quad F_{\\text{jacking}} = F_y \\cdot \\frac{z_{\\text{RC}}}{\\text{TW}/2}',
      formulaVars: 'M_roll: Momento de rolido | h_CG: Altura del CG | z_RC: Altura del Roll Center | F_jacking: Fuerza vertical que levanta el chasis'
    },
    marginQuestions: [
      {
        q: 'Si se busca tener un Centro de Gravedad bajo por estabilidad, ¿qué tiende a girar más: lo más pegado al suelo o lo más lejano (brazos superiores)?',
        a: 'Como el Roll Center está cerca del suelo, la parte superior de la llanta y los brazos superiores están a mayor radio de giro respecto al eje de rolido, por lo que sufren un mayor desplazamiento lateral al inclinarse el chasis. Por eso el brazo superior debe ser más corto para compensar ese arco.',
        cite: 'Pregunta de margen · Leonardo Galeote (Pág. 7)'
      }
    ]
  },

  {
    id: 'pitch_anti',
    num: '06',
    shortTitle: 'Pitch / Anti-Dive & Squat',
    title: 'Pitch Center, Geometrías Anti-Dive y Anti-Squat (Reparto 20% / 80%)',
    defaultCamera: 'side_full',
    cameraLabel: 'Vista Lateral Completa · Pitch Center, SVSA, % Anti-Dive y % Anti-Squat',
    primaryAuthor: 'Leonardo Galeote (Apuntes de Suspensión PSSAE · Págs. 5, 6, 9 y 10)',
    bookCitation: 'Thomas D. Gillespie — Fundamentals of Vehicle Dynamics (Caps. 4 & 5: Anti-Squat & Anti-Dive)',
    lead: 'El Pitch Center es el eje de referencia sobre el cual rota nuestro vehículo ante fuerzas longitudinales (frenado y aceleración). Las antigeometrías no cambian la transferencia de carga total, sino que dividen qué porcentaje viaja por los brazos rígidos de suspensión y qué porcentaje comprimen los resortes.',
    carPhoto: 'assets/car/aetheria_side.jpg',
    carPhotoCaption: 'Perfil lateral del PSSAE26 Aetheria #88. La inclinación de los anclajes de las horquillas en esta vista lateral define el SVSA (Side View Swing Arm) para el Anti-Dive y el Anti-Squat.',
    analogy: {
      title: 'Analogía Intuitiva: Frenar en bicicleta con los codos bloqueados vs flexionados',
      body: 'Imagina frenar de golpe con el freno delantero de una bicicleta: si doblas los codos suavemente (0% Anti-Dive), tus brazos actúan como resortes y tu pecho baja absorbiendo los baches. Si en cambio bloqueas los codos totalmente rectos e inclinados (100% Anti-Dive), tu cuerpo no baja nada, toda la fuerza viaja directo por tus huesos rígidos hacia el manubrio, pero si pasas por una piedra en ese instante la llanta delantera rebotará y perderá contacto con el suelo.',
      author: 'Analogía basada en la nota de Rebote en Frenada · Leonardo Galeote (Pág. 9)'
    },
    svgDiagram: `
      <svg viewBox="0 0 340 175" width="100%" height="165">
        <rect width="340" height="175" fill="#081114"/>
        <text x="170" y="18" fill="#6FD0D8" font-family="IBM Plex Mono" font-size="10.5" text-anchor="middle" font-weight="700">DIAGRAMA DEL APUNTE: REPARTO DE CARGAS 20% / 80% (PÁG. 10)</text>
        <rect x="95" y="30" width="150" height="28" fill="#14262A" stroke="#6FD0D8" stroke-width="1.5"/>
        <text x="170" y="48" fill="#F2F5F5" font-family="Archivo" font-size="11.5" text-anchor="middle" font-weight="700">TRANSFERENCIA DE CARGA</text>
        <line x1="140" y1="58" x2="85" y2="82" stroke="#E0A84B" stroke-width="2"/>
        <line x1="200" y1="58" x2="255" y2="82" stroke="#6FD0D8" stroke-width="2"/>
        <rect x="16" y="82" width="142" height="76" fill="#14262A" stroke="#E0A84B" stroke-width="1.5"/>
        <text x="87" y="102" fill="#E0A84B" font-family="IBM Plex Mono" font-size="12" text-anchor="middle" font-weight="700">20% ESLABONES</text>
        <text x="87" y="120" fill="#B8CACC" font-family="IBM Plex Sans" font-size="9.5" text-anchor="middle">Elementos mecánicos rígidos</text>
        <text x="87" y="135" fill="#B8CACC" font-family="IBM Plex Sans" font-size="9.5" text-anchor="middle">(Sin comprimir el resorte)</text>
        <text x="87" y="150" fill="#E0A84B" font-family="IBM Plex Mono" font-size="9" text-anchor="middle">→ Directo a neumáticos</text>
        <rect x="182" y="82" width="142" height="76" fill="#14262A" stroke="#6FD0D8" stroke-width="1.5"/>
        <text x="253" y="102" fill="#6FD0D8" font-family="IBM Plex Mono" font-size="12" text-anchor="middle" font-weight="700">80% RESORTES</text>
        <text x="253" y="120" fill="#B8CACC" font-family="IBM Plex Sans" font-size="9.5" text-anchor="middle">Distribuido a resortes</text>
        <text x="253" y="135" fill="#B8CACC" font-family="IBM Plex Sans" font-size="9.5" text-anchor="middle">y amortiguadores</text>
        <text x="253" y="150" fill="#6FD0D8" font-family="IBM Plex Mono" font-size="9" text-anchor="middle">→ Absorbe irregularidades</text>
      </svg>
    `,
    sliders: [
      {
        key: 'svsaHeightRear',
        label: 'Front Bushing / Altura IC Trasero (Anti-Squat)',
        unit: 'mm',
        min: 0,
        max: 280,
        step: 5,
        help: 'Eleva el pivote / IC en vista lateral para aumentar el porcentaje de Anti-Squat.'
      },
      {
        key: 'svsaHeightFront',
        label: 'Inclinación Horquillas Delanteras / Altura IC (Anti-Dive)',
        unit: 'mm',
        min: 0,
        max: 280,
        step: 5,
        help: 'Aumenta el ángulo Φ hacia el IC delantero para incrementar el % Anti-Dive en frenada.'
      },
      {
        key: 'heaveMm',
        label: 'Rear Squat / Compresión Longitudinal',
        unit: 'mm',
        min: -35,
        max: 45,
        step: 1,
        help: 'Simula la compresión (ej. 29 mm de squat como en tu imagen de referencia).'
      }
    ],
    samsungNotesCore: [
      {
        title: '¿Cómo encontramos el Pitch Center y el IC Lateral? (Págs. 6 y 9)',
        body: '① Proyectamos el eje en el cual se intersectan nuestras 2 uniones de Rótula-Chasis en las horquillas inferiores y superiores.\n② Marcamos el punto de encuentro que será el I.C. (a distancia SVSA Length y altura SVSA Height).\n③ Trazamos una línea recta desde el centro del Contact Patch al punto del I.C.\n④ Proyectamos una línea vertical del Centro de Gravedad al suelo para obtener el porcentaje de Anti-Dive o Anti-Squat.',
        author: 'Leonardo Galeote · Apunte Págs. 6 y 9'
      },
      {
        title: 'Fórmula y Efecto Físico del Anti-Dive (Pág. 9)',
        body: '% Anti-Dive = (X / h) · tan(Φ) × 100.\nEl Anti-Dive NO causa cambios de carga total, sino que divide la fuerza de carga entre los brazos de suspensión y los resortes. ¡Ojo!: un exceso de Anti-Dive causará el brinco de nuestro auto al botar las llantas en frenada.',
        author: 'Leonardo Galeote · Apunte Pág. 9'
      },
      {
        title: 'Anti-Squat y Reparto de Transferencia de Carga (20% vs 80% · Pág. 10)',
        body: 'El Anti-Squat juega un papel muy importante en la tracción del vehículo al acelerar. Si definimos un 20% de antigeometría:\n• 20% se distribuye en elementos mecánicos rígidos (se canaliza directo a los neumáticos sin comprimir el resorte).\n• 80% es soportado y distribuido a los resortes y amortiguadores.',
        author: 'Leonardo Galeote · Apunte Pág. 10'
      }
    ],
    engineeringComplement: {
      title: 'Complemento Bibliográfico (20%): Ecuaciones de Anti-Dive y Anti-Squat',
      bookSource: 'Libros citados: Thomas D. Gillespie — Fundamentals of Vehicle Dynamics & Milliken RCVD (Cap. 18)',
      body: 'En los puntos coordenados del Apunte de Diseño (Pág. 3), la diferencia de altura entre los anclajes interiores delanteros (Puntos 2 y 4) y traseros (Puntos 5 y 6) de las horquillas define el ángulo del SVSA y, por tanto, el porcentaje exacto de Anti-Dive y Anti-Squat:',
      formula: '\\% \\text{Anti-Dive} = \\frac{X}{h} \\cdot \\tan(\\phi) \\times 100 \\quad ; \\quad \\% \\text{Anti-Squat} = \\frac{X}{h} \\cdot \\tan(\\beta) \\times 100',
      formulaVars: 'X: Distancia longitudinal de contact patch al CG | h: Altura del CG respecto al suelo | Φ, β: Ángulo de la línea del Contact Patch al I.C.'
    },
    marginQuestions: [
      {
        q: '¿Cómo afecta la acomodación de las horquillas (una delante y otra atrás) para el Anti-Dive y Anti-Squat?',
        a: 'Como muestras en la Pág. 6: si en la llanta trasera la horquilla inferior tiene 0° de inclinación pero la superior está inclinada hacia arriba/adelante, al subir la rueda el chasis hace que la rueda se mueva sobre una dirección inclinada, cambiando el ángulo de Caster y haciendo que disminuya el Anti-Squat o Anti-Dive conforme se comprime.',
        cite: 'Pregunta de margen · Leonardo Galeote (Pág. 6)'
      },
      {
        q: '¿Cómo afecta la movilidad del CG y el Anti-Squat a la tracción del neumático?',
        a: 'Un porcentaje moderado de Anti-Squat (15%–25%) envía carga vertical instantáneamente al neumático trasero por los eslabones rígidos al acelerar, mejorando la tracción inicial; pero si es excesivo, impide que el amortiguador trabaje sobre baches y produce pérdida de tracción por rebote.',
        cite: 'Pregunta de margen · Leonardo Galeote (Pág. 10)'
      },
      {
        q: '¿Se puede reducir el Bump Steer alineando la barra de dirección con el CIR de la vista lateral?',
        a: 'Sí, alinear el tirante de dirección tanto con el IC frontal como con el SVSA lateral evita que la rotación de Caster durante el Anti-Dive modifique el ángulo Toe en las frenadas.',
        cite: 'Pregunta de margen · Leonardo Galeote (Pág. 9)'
      }
    ]
  },

  {
    id: 'ackermann',
    num: '07',
    shortTitle: 'Ackermann & Slip Angle',
    title: 'Geometría de Ackermann y Ángulo de Deriva (Slip Angle)',
    defaultCamera: 'top_ackermann',
    cameraLabel: 'Vista Superior de Giro · Círculos Concéntricos (Mismo Centro) y Slip Angle',
    primaryAuthor: 'Leonardo Galeote (Apuntes de Suspensión PSSAE · Pág. 8)',
    bookCitation: 'Milliken & Milliken — Race Car Vehicle Dynamics (Cap. 2 & Cap. 19: Ackermann & Slip Angle)',
    lead: 'La geometría de Ackermann busca resolver el hecho de que las ruedas de dirección giren formando círculos de diferente radio pero con un "mismo centro". Al mismo tiempo, como el neumático no es puramente "duro" y se deforma, aparece el Slip Angle.',
    carPhoto: 'assets/car/aetheria_wing_iso.jpg',
    carPhotoCaption: 'Vista en ángulo superior del tren delantero del PSSAE26 Aetheria. En curvas cerradas de Autocross y Skidpad, la rueda interior debe girar más grados que la exterior.',
    analogy: {
      title: 'Analogía Intuitiva: Una fila de soldados dando vuelta en una esquina',
      body: 'Imagina una fila de personas tomadas del brazo dando vuelta en una esquina cerrada: la persona que va por la cuerda interior casi gira sobre su propio eje describiendo un círculo pequeñito (mayor ángulo de giro δ_int), mientras que la persona del extremo exterior tiene que abrirse en un círculo mucho más grande (menor ángulo de giro δ_ext). Eso es Ackermann. Y el Slip Angle es como cuando corres en calcetines sobre piso liso: tus pies apuntan 5° más adentro de la línea real por la que te vas deslizando porque la tela se deforma.',
      author: 'Analogía Pedagógica · Leonardo Galeote'
    },
    svgDiagram: `
      <svg viewBox="0 0 340 175" width="100%" height="165">
        <rect width="340" height="175" fill="#081114"/>
        <text x="170" y="18" fill="#6FD0D8" font-family="IBM Plex Mono" font-size="10.5" text-anchor="middle" font-weight="700">ESQUEMA DEL APUNTE: ACKERMANN Y SLIP ANGLE (PÁG. 8)</text>
        <!-- Centro común -->
        <circle cx="290" cy="135" r="5" fill="#6FD0D8"/>
        <text x="275" y="156" fill="#6FD0D8" font-family="IBM Plex Mono" font-size="9.5" text-anchor="middle">Mismo Centro</text>
        <line x1="55" y1="135" x2="290" y2="135" stroke="#7A8C8F" stroke-dasharray="4 3"/>
        <line x1="55" y1="55" x2="290" y2="135" stroke="#6FD0D8" stroke-dasharray="4 3"/>
        <line x1="125" y1="55" x2="290" y2="135" stroke="#E0A84B" stroke-dasharray="4 3"/>
        <!-- Slip Angle -->
        <rect x="170" y="34" width="150" height="68" fill="#14262A" stroke="#9A6288"/>
        <text x="245" y="52" fill="#D28EC0" font-family="Archivo" font-size="11" text-anchor="middle" font-weight="700">SLIP ANGLE (α)</text>
        <text x="245" y="70" fill="#B8CACC" font-family="IBM Plex Sans" font-size="9.5" text-anchor="middle">Diferencia entre dirección</text>
        <text x="245" y="84" fill="#B8CACC" font-family="IBM Plex Sans" font-size="9.5" text-anchor="middle">del volante y dirección real</text>
        <text x="245" y="96" fill="#6FD0D8" font-family="IBM Plex Mono" font-size="9" text-anchor="middle">por deformación elástica</text>
      </svg>
    `,
    sliders: [
      {
        key: 'steerAngleDeg',
        label: 'Ángulo de Giro en Dirección (Steer Input)',
        unit: '°',
        min: 2,
        max: 28,
        step: 1,
        help: 'Gira el volante para ver la diferencia entre el ángulo de la rueda interior (δi) y la rueda exterior (δo).'
      },
      {
        key: 'ackermannPct',
        label: 'Porcentaje de Ackermann (% Ackermann)',
        unit: '%',
        min: -40,
        max: 120,
        step: 5,
        help: '100% converge exactamente en un mismo centro sobre el eje trasero.'
      }
    ],
    samsungNotesCore: [
      {
        title: 'Geometría de Ackermann: Mismo Centro (Pág. 8)',
        body: 'La geometría de Ackermann es muy curiosa por el problema que quiere resolver: busca que al dar vuelta las ruedas de dirección giren formando círculos de diferente radio pero con un "mismo centro" instantáneo de rotación.',
        author: 'Leonardo Galeote · Apunte Pág. 8'
      },
      {
        title: 'Slip Angle (Ángulo de Deriva)',
        body: 'El Slip Angle es un valor el cual relaciona la dirección real de nuestro neumático y la dirección que con el volante le queremos dar, tomando en cuenta que el neumático no es puramente "duro" y al deformarse en la huella de contacto se presenta este fenómeno.',
        author: 'Leonardo Galeote · Apunte Pág. 8'
      }
    ],
    engineeringComplement: {
      title: 'Complemento Bibliográfico (20%): Sensibilidad de Carga en el Ángulo de Deriva',
      bookSource: 'Libro citado: Milliken & Milliken — Race Car Vehicle Dynamics (Cap. 2 & Cap. 19)',
      body: 'Según Milliken, un neumático con mayor carga vertical (la rueda exterior en una curva) alcanza su máxima fuerza lateral a un Slip Angle ligeramente distinto que el neumático interior descargado. En circuitos de Formula SAE con giros muy cerrados, un porcentaje de Ackermann positivo evita el arrastre del neumático interior.',
      formula: '\\cot(\\delta_{\\text{ext}}) - \\cot(\\delta_{\\text{int}}) = \\frac{\\text{Track Width}}{\\text{Wheelbase}} \\quad ; \\quad \\alpha = \\delta_{\\text{apuntado}} - \\theta_{\\text{trayectoria real}}',
      formulaVars: 'δ_int: Ángulo rueda interior | δ_ext: Ángulo rueda exterior | α: Slip Angle (Ángulo de deriva)'
    },
    marginQuestions: [
      {
        q: '¿Cuál es la relación de Slip Angle y Contact Patch?',
        a: 'Dentro del Contact Patch el caucho se adhiere al piso al entrar a la huella y se estira lateralmente conforme rueda hacia atrás. Esa torsión elástica de la huella es la que genera el Slip Angle y la fuerza lateral en curva.',
        cite: 'Pregunta de margen · Leonardo Galeote (Pág. 8)'
      },
      {
        q: '¿Cómo se juega con los Slip Angles variando la carga en curvas (Menos vs Más)?',
        a: 'Cuando una rueda recibe MÁS carga vertical en curva, la goma se deforma más y requiere un mayor Slip Angle para generar su pico de agarre lateral en comparación con la rueda interior que tiene MENOS carga.',
        cite: 'Pregunta de margen · Leonardo Galeote (Pág. 8)'
      }
    ]
  }
];
