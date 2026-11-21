import type { GitaOverlay } from "../../types.ts";

/** Adhyaya 14, Las tres gunas (traducido de la versión en inglés). */
export const es14: GitaOverlay = {
  title: "Las tres gunas",
  context:
    "Krishna explica las tres cualidades (गुण, gunas) de la naturaleza que tiñen todo lo que pensamos, sentimos y hacemos. Sattva es claridad, calma y bondad; rajas es energía, deseo e inquietud; tamas es torpeza, pereza y confusión. Las tres nos atan de maneras distintas. Describe cómo reconocer cada una, y Arjuna pregunta cómo vive una persona que ha ido más allá de las tres. Krishna describe a alguien firme en el placer y el dolor, en el elogio y la crítica, y dice que la devoción inquebrantable eleva a la persona más allá de las gunas.",
  crux: [
    "Tres fuerzas (sattva, rajas, tamas) dan forma a cada estado de ánimo y a cada acción.",
    "Notar qué guna está activa le ayuda a elegir qué hacer a continuación.",
    "La devoción constante nos lleva más allá de las tres.",
  ],
  shlokas: {
    "14.9": {
      words: ["sattva (claridad, bondad)", "ata a la felicidad", "rajas (energía inquieta)", "a la actividad", "cubriendo el conocimiento", "tamas (torpeza)", "al descuido"],
      meaning: "Sattva ata a la felicidad, rajas a la actividad inquieta, oh Bharata, mientras que tamas, cubriendo el conocimiento, ata al descuido.",
      situation: {
        title: "Tres tipos de domingo",
        story:
          "Ishaan nota que hay tres tipos de domingo. Algunos se despierta temprano, se siente tranquilo, lee, ayuda a su madre y se siente feliz y lúcido (sattva). Otros está inquieto: salta de un juego a otro, quiere cosas nuevas, no puede estarse quieto y termina el día agotado (rajas). Y algunos se queda en la cama hasta el mediodía, mira el móvil sin rumbo, olvida los deberes y se siente pesado y apagado (tamas). Su profesor llama a esto las tres गुण. Todos tenemos las tres; la habilidad está en notar cuál manda en este momento y moverse con suavidad hacia la claridad.",
      },
      reflect: "¿Qué guna fue la más fuerte en usted hoy? ¿Qué le ayudó, o le ayudaría, a moverse hacia sattva?",
      questions: [
        {
          prompt: "Según 14.9, ¿qué hace tamas?",
          options: ["Cubre el conocimiento y ata al descuido", "Trae felicidad y claridad", "Hace que uno esté muy ocupado y activo", "Hace sabio a uno"],
          hint: "ज्ञानमावृत्य तु तमः प्रमादे सञ्जयति (tamas, cubriendo el conocimiento, ata al descuido).",
          explanation:
            "Sattva → सुख (felicidad), rajas → कर्म (acción inquieta), tamas → प्रमाद (descuido), después de cubrir (आवृत्य) primero el conocimiento.",
        },
        {
          prompt: "Ananya no puede estarse quieta, cambia de tarea constantemente y lo quiere todo a la vez. ¿Qué guna es la más fuerte?",
          options: ["Rajas", "Sattva", "Tamas", "Ninguna"],
          hint: "रजः कर्मणि (rajas, a la actividad): rajas ata a la actividad inquieta.",
          explanation:
            "La inquietud, el ansia y la actividad constante son señales de rajas. 14.12 las enumera: codicia, actividad constante, inquietud y anhelo.",
        },
      ],
    },
    "14.17": {
      words: ["de sattva surge el conocimiento", "de rajas, la codicia", "descuido y engaño", "surgen de tamas", "y también la ignorancia"],
      meaning: "De sattva surge el conocimiento, de rajas la codicia, y de tamas vienen el descuido, el engaño y la ignorancia.",
      situation: {
        title: "Qué crece de dónde",
        story:
          "La clase de Meera hace un experimento: una planta recibe sol y agua, otra demasiado fertilizante, y otra se deja en un armario oscuro. La primera crece sana, la segunda se dispara y luego se marchita, y la tercera se queda pálida y débil. Su profesora lo relaciona con 14.17. Una mente tranquila y clara (sattva) hace crecer el conocimiento. Una mente inquieta y ansiosa (rajas) hace crecer la codicia: siempre quiere más. Una mente apagada y perezosa (tamas) hace crecer el descuido y la confusión. Si quiere aprender bien, fíjese en qué «tierra» está plantando su estudio.",
      },
      reflect: "¿Qué le ayuda a entrar en un estado claro y tranquilo (sáttvico) antes de estudiar? ¿Dormir, dar un paseo, una habitación tranquila?",
      questions: [
        {
          prompt: "Según 14.17, ¿qué surge de sattva?",
          options: ["El conocimiento (ज्ञान)", "La codicia", "El descuido", "El engaño"],
          hint: "सत्त्वात्सञ्जायते ज्ञानम् (de sattva surge el conocimiento).",
          explanation:
            "सत्त्वात् (de sattva, ablativo) सञ्जायते (nace) ज्ञानम् (el conocimiento). De rajas viene लोभ (codicia); de tamas vienen प्रमाद (descuido), मोह (engaño) y अज्ञान (ignorancia).",
        },
        {
          prompt: "Kabir se queda jugando hasta las 2 de la madrugada, luego no oye el despertador y se olvida de su examen. ¿De qué guna son estos frutos?",
          options: ["De tamas: descuido y confusión", "De sattva: conocimiento", "Solo de la buena suerte", "De la sabiduría"],
          hint: "प्रमादमोहौ तमसो (el descuido y el engaño vienen de tamas).",
          explanation:
            "Dormir de más, olvidar y sentirse pesado son प्रमाद y मोह, señales de tamas (vea también 14.8: tamas ata mediante el descuido, la pereza y el sueño).",
        },
      ],
    },
    "14.5": {
      words: ["sattva, rajas y tamas", "las cualidades (gunas)", "nacidas de la naturaleza (prakriti)", "atan", "en el cuerpo", "al Ser encarnado imperecedero"],
      meaning: "Sattva, rajas y tamas, las cualidades nacidas de la naturaleza, atan al cuerpo al Ser encarnado imperecedero, oh el de los brazos poderosos.",
      situation: {
        title: "Incluso lo bueno puede atar",
        story:
          "Riya es una estudiante modelo: tranquila, amable, trabajadora, sáttvica casi siempre. Pero ha empezado a sentirse superior a los demás y se disgusta si alguien saca mejor nota que ella. Su abuelo le señala algo sutil de 14.5: las tres gunas atan, incluso sattva. Sattva ata por el apego a la felicidad y al conocimiento (14.6), y por el orgullo de ser «buena». Rajas ata por el ansia, y tamas por la pereza. Riya se da cuenta de que la meta no es solo ser sáttvica, sino ir más allá incluso de eso: ser buena sin aferrarse a ser buena.",
      },
      reflect: "¿Hay alguna buena cualidad de la que esté un poco orgulloso? ¿Cómo podría incluso eso convertirse en una forma de atadura?",
      questions: [
        {
          prompt: "Según 14.5, ¿qué hacen las tres gunas?",
          options: ["Atan al cuerpo al Ser imperecedero", "Liberan al Ser del cuerpo", "Destruyen al Ser", "No tienen ningún efecto"],
          hint: "निबध्नन्ति … देहिनमव्ययम् (atan... al encarnado imperecedero).",
          explanation:
            "निबध्नन्ति = atan. El Ser (देही, el encarnado) es अव्यय, imperecedero, y sin embargo las gunas lo atan a identificarse con el cuerpo.",
        },
        {
          prompt: "Según este capítulo, ¿también ata sattva (la bondad)?",
          options: ["Sí: por el apego a la felicidad y al conocimiento (14.6), aunque es la mejor de las tres", "No, solo ata tamas", "No, sattva hace a uno completamente libre", "Sattva no existe"],
          hint: "14.5 dice que las tres (गुणाः) atan.",
          explanation:
            "14.6: sattva, al ser pura e iluminadora, ata por el apego a la felicidad y al conocimiento. Es la mejor guna para cultivar, pero la meta final es ir más allá de las tres (14.20, 14.26).",
        },
      ],
    },
    "14.24": {
      words: ["igual en el dolor y en la alegría", "establecido en el Ser", "para quien un terrón, una piedra y el oro son iguales", "igual ante lo agradable y lo desagradable", "firme, sabio", "igual ante la crítica y el elogio de sí mismo"],
      meaning: "Quien es igual en el dolor y en la alegría, establecido en el Ser, quien ve igual un terrón, una piedra y el oro, quien es igual ante lo agradable y lo desagradable, firme, e igual ante la crítica y el elogio de sí mismo...",
      situation: {
        title: "¿Oro o piedra?",
        story:
          "Por su cumpleaños, Dev recibe un reloj barato de su mejor amigo y uno caro de un tío lejano. Se da cuenta de que valora más el barato, por el cariño que hay detrás. Eso le hace pensar en समलोष्टाश्मकाञ्चनः, «un terrón, una piedra y el oro son iguales» para la persona firme. No significa que el oro no sirva para nada; significa que el precio no decide su paz ni su valía. Esa misma persona es स्वस्थः, literalmente «establecida en el Ser» (¡en hindi también significa «sano»!): el equilibrio interior es una forma de salud que ni el dinero, ni el elogio, ni la crítica pueden dar o quitar.",
      },
      reflect: "¿Cuál de sus pertenencias valora más? ¿Es la más cara? ¿Por qué sí o por qué no?",
      questions: [
        {
          prompt: "¿Qué significa समलोष्टाश्मकाञ्चनः?",
          options: ["Aquel para quien un terrón, una piedra y el oro son iguales", "Aquel que colecciona oro", "Aquel que vive en una casa de piedra", "Aquel que odia el oro"],
          hint: "सम (igual) + लोष्ट (terrón) + अश्म (piedra) + काञ्चन (oro).",
          explanation:
            "Un compuesto बहुव्रीहि (posesivo): aquel para quien el terrón, la piedra y el oro son सम (iguales). Describe al गुणातीत, el que ha ido más allá de las tres gunas (14.25 completa la descripción).",
        },
        {
          prompt: "Según 14.24, ¿en qué pares es «igual» quien está más allá de las gunas?",
          options: ["Dolor y alegría, lo agradable y lo desagradable, crítica y elogio", "Solo día y noche", "Solo verano e invierno", "Solo personas ricas y pobres"],
          hint: "समदुःखसुखः … तुल्यप्रियाप्रियो … तुल्यनिन्दात्मसंस्तुतिः (igual en el dolor y la alegría... ante lo agradable y lo desagradable... ante la crítica y el elogio).",
          explanation:
            "La misma ecuanimidad aparece en 2.48, en 12.18–19 y aquí: firmeza ante los opuestos. En 14.24 es la señal de quien ha ido más allá de las gunas.",
        },
      ],
    },
    "14.21": {
      words: ["¿por qué señales?", "estas tres gunas", "es quien ha ido más allá", "oh Señor", "¿cuál es su conducta?", "¿cómo va más allá?"],
      meaning: "Arjuna dijo: Oh Señor, ¿por qué señales se reconoce a quien ha ido más allá de estas tres gunas? ¿Cuál es la conducta de esa persona? ¿Y cómo se va más allá de estas tres gunas?",
      situation: {
        title: "Hacer las preguntas adecuadas",
        story:
          "Arjuna hace tres preguntas en un solo verso: ¿cómo se reconoce a esa persona (लिङ्ग), cómo se comporta (आचार) y cómo se llega allí (उपाय)? El entrenador de debate de Kabir usa este verso para enseñar a investigar. Para cualquier tema, pregunte tres cosas: ¿Cómo es? ¿Cómo funciona en la práctica? ¿Cómo se llega a ello? Aplicado al ideal de la Gita, las respuestas de Krishna llegan en 14.22–26: esa persona no se inmuta cuando las gunas van y vienen, se mantiene firme en cada par de opuestos y alcanza ese estado mediante una devoción inquebrantable. Una buena pregunta es la mitad de la respuesta.",
      },
      reflect: "Elija una meta que tenga. ¿Puede responder sobre ella a las tres preguntas de Arjuna: sus señales, su conducta y el camino hacia ella?",
      questions: [
        {
          prompt: "¿Sobre qué tres cosas pregunta Arjuna en 14.21?",
          options: ["Las señales, la conducta y la manera de ir más allá de las gunas", "El tamaño del ejército, las armas y la estrategia", "La familia, la ciudad y la edad de Krishna", "El tiempo, la hora y el lugar"],
          hint: "कैर्लिङ्गैः … किमाचारः … कथं … अतिवर्तते (¿por qué señales... cuál es su conducta... cómo va más allá?).",
          explanation:
            "लिङ्ग (señales), आचार (conducta) y कथम् (cómo, el medio). Krishna responde a las tres en 14.22–26.",
        },
        {
          prompt: "¿Qué significa गुणातीत (el que está más allá de las gunas)?",
          options: ["Quien ya no está gobernado por sattva, rajas ni tamas, y las observa con calma", "Quien no tiene ninguna cualidad, ni buena ni mala", "Quien es siempre perezoso", "Quien es muy rico"],
          hint: "14.23: las gunas actúan, y esa persona permanece inmóvil.",
          explanation:
            "En 14.23 Krishna dice que esa persona permanece como indiferente, sabiendo que «son las gunas las que actúan», y no vacila. Las gunas siguen operando en el cuerpo y la mente; la persona ya no está atada por ellas.",
        },
      ],
    },
    "14.26": {
      words: ["y quien … a Mí", "inquebrantable, indivisa", "mediante el yoga de la devoción", "sirve, adora", "yendo plenamente más allá de estas gunas", "se hace apto para ser uno con Brahman"],
      meaning: "Quien me sirve con devoción inquebrantable va plenamente más allá de estas gunas y se hace apto para ser uno con Brahman.",
      situation: {
        title: "Subir por encima del tiempo atmosférico",
        story:
          "En un vuelo, Ananya ve cómo el avión sube a través de nubes grises de lluvia (tamas), luego de capas movidas y con viento (rajas), luego de cimas de nubes blancas y brillantes (sattva), y por fin hasta un cielo azul despejado por encima de todo el mal tiempo. El piloto explica que, por encima de cierta altura, el tiempo atmosférico simplemente queda debajo. Ananya piensa en 14.26. Las gunas son como el tiempo atmosférico de la mente: seguirán cambiando. La respuesta de Krishna a «¿cómo me elevo por encima de ellas?» no es una técnica para controlar el tiempo, sino una devoción constante e indivisa (अव्यभिचारी भक्ति), que le eleva hasta donde el tiempo ya no le gobierna.",
      },
      reflect: "¿Qué le da una sensación de firmeza que no depende de su estado de ánimo de ese día?",
      questions: [
        {
          prompt: "Según 14.26, ¿cómo se va más allá de las tres gunas?",
          options: ["Mediante la devoción inquebrantable (अव्यभिचारी भक्तियोग)", "Durmiendo más", "Estando muy ocupado", "Coleccionando oro"],
          hint: "योऽव्यभिचारेण भक्तियोगेन सेवते (quien sirve con el yoga de la devoción inquebrantable).",
          explanation:
            "अव्यभिचारेण भक्तियोगेन: mediante el yoga de la devoción que nunca se desvía. Esto responde a la pregunta कथम्? (¿cómo?) de Arjuna en 14.21.",
        },
        {
          prompt: "¿Qué significa en la práctica una devoción अव्यभिचारी (inquebrantable)?",
          options: ["Un amor constante que no se enciende y se apaga según el ánimo o las circunstancias", "Rezar solo cuando se tienen problemas", "Cambiar cada día lo que se adora", "Devoción solo en los días de fiesta"],
          hint: "व्यभिचार = desviarse, vacilar; अ- = no.",
          explanation:
            "अव्यभिचारी significa constante e indivisa. Como no depende de si sattva, rajas o tamas está activa ese día, eleva a la persona por encima de ellas (ब्रह्मभूयाय कल्पते, se hace apta para ser una con Brahman).",
        },
      ],
    },
  },
};
