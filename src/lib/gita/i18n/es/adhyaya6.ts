import type { GitaOverlay } from "../../types.ts";

/** Adhyaya 6, El yoga del autocontrol (traducido de la versión en inglés). */
export const es6: GitaOverlay = {
  title: "El yoga del autocontrol (meditación)",
  context:
    "Krishna enseña ahora la práctica de la meditación (dhyāna). Debemos elevarnos con nuestro propio esfuerzo: la mente puede ser nuestro mejor amigo o nuestro peor enemigo. Describe cómo sentarse a meditar e insiste en el equilibrio en la comida, el sueño, el trabajo y el juego. Arjuna objeta con sinceridad que la mente es tan difícil de controlar como el viento. Krishna le da la razón y le ofrece la respuesta: práctica y desapego. Termina con una promesa: nadie que intente hacer el bien llega jamás a un mal final.",
  crux: [
    "Elévese con su propio esfuerzo; su mente puede ser su amiga o su enemiga.",
    "El equilibrio en la comida, el sueño, el trabajo y el juego hace posible el yoga.",
    "La mente inquieta se doma con práctica y desapego; ningún esfuerzo sincero se pierde.",
  ],
  shlokas: {
    "6.5": {
      words: ["uno debe elevar", "a sí mismo por sí mismo", "no debe dejarse hundir", "uno mismo solamente", "amigo", "enemigo"],
      meaning: "Uno debe elevarse con su propio esfuerzo y nunca dejarse hundir. Porque solo usted es su propio amigo, y solo usted es su propio enemigo.",
      situation: {
        title: "La voz de su cabeza",
        story:
          "Antes de cada examen de matemáticas, una voz en la cabeza de Riya le dice: «Eres un desastre en matemáticas. ¿Para qué intentarlo?». Esa voz es su propia mente actuando como रिपु, una enemiga. Un día su profesora le pide que escriba lo que le diría a una amiga en la misma situación: «Has practicado. Entiendes más que el mes pasado. Ve pregunta a pregunta». Riya empieza a decírselo a sí misma. Sus notas mejoran poco a poco, pero su miedo baja rápido. Nadie puede elevarle por usted, pero usted siempre puede hacerlo por sí mismo (उद्धरेदात्मनात्मानम्).",
      },
      reflect: "¿Qué le dice su voz interior cuando las cosas salen mal? ¿Cómo podría hacer que le hablara como un amigo (बन्धु)?",
      questions: [
        {
          prompt: "Según el 6.5, ¿quién es nuestro amigo y quién nuestro enemigo?",
          options: ["Nosotros mismos somos a la vez nuestro amigo y nuestro enemigo", "Los compañeros son amigos y los profesores enemigos", "La suerte es nuestra amiga y la mala suerte nuestra enemiga", "No tenemos ni amigos ni enemigos"],
          hint: "आत्मैव … बन्धुः (uno mismo es el amigo), आत्मैव रिपुः (uno mismo es el enemigo).",
          explanation: "आत्मैव ह्यात्मनो बन्धुः, आत्मैव रिपुरात्मनः: solo el yo es amigo del yo, y solo el yo es su enemigo. El shloka siguiente (6.6) explica cuándo ocurre cada cosa.",
        },
        {
          prompt: "Kabir no ha entrado en el equipo de la escuela y dice: «Nunca seré bueno en nada». ¿Qué respuesta sigue el 6.5?",
          options: [
            "Darse cuenta de que ese pensamiento le hunde y elegir palabras que le eleven: «Entrenaré y lo volveré a intentar»",
            "Seguir repitiendo que no vale nada",
            "Esperar a que otra persona arregle sus sentimientos",
            "Culpar al entrenador de todo",
          ],
          hint: "न आत्मानम् अवसादयेत्: no se deje hundir.",
          explanation: "उद्धरेत् (que eleve) y न अवसादयेत् (que no hunda) están ambos en optativo: «uno debería». La Gita pone el volante en nuestras propias manos.",
        },
      ],
    },
    "6.17": {
      words: ["de quien es equilibrado en la comida y el recreo", "equilibrado en el esfuerzo en el trabajo", "equilibrado en el sueño y la vigilia", "el yoga", "destructor de la pena", "se vuelve"],
      meaning: "Para quien es equilibrado en la comida y el recreo, equilibrado en el esfuerzo en el trabajo y equilibrado en el sueño y la vigilia, el yoga se convierte en destructor de la pena.",
      situation: {
        title: "La rutina de la semana de exámenes",
        story:
          "Durante la semana de exámenes, Dev decide estudiar toda la noche, saltarse el desayuno y dejar de jugar al fútbol. El miércoles no puede concentrarse, le duele la cabeza y olvida cosas que sabía bien. Su amiga Tara hace lo contrario: ocho horas de sueño, comidas como es debido, un paseo corto por la tarde y estudio concentrado entre medias. Se siente tranquila y recuerda más. El shloka usa una y otra vez la palabra युक्त: equilibrado, justo. Ni demasiado ni demasiado poco: comida, juego, trabajo y sueño en su proporción. Ese equilibrio es en sí una forma de yoga, y elimina mucho sufrimiento innecesario (दुःखहा).",
      },
      reflect: "¿Cuál de los cuatro (comida, juego, trabajo, sueño) está más desequilibrado en su semana ahora mismo?",
      questions: [
        {
          prompt: "¿Qué significa la palabra युक्त en el 6.17?",
          options: ["Equilibrado, moderado, en su justa medida", "Lo más posible", "Totalmente evitado", "Hecho en secreto"],
          hint: "El shloka anterior (6.16) advierte contra el exceso y la escasez.",
          explanation: "El 6.16 dice que el yoga no es para quien come demasiado o demasiado poco, ni para quien duerme demasiado o demasiado poco. El 6.17 da el lado positivo: युक्त, equilibrado, en todo.",
        },
        {
          prompt: "¿Qué plan para la semana de exámenes sigue el 6.17?",
          options: [
            "Sueño regular, comidas como es debido, un poco de ejercicio y estudio concentrado",
            "Estudiar toda la noche y saltarse comidas",
            "Dormir 12 horas y estudiar solo 1",
            "Jugar a videojuegos todo el día para relajarse",
          ],
          hint: "आहार, विहार, चेष्टा, स्वप्न, अवबोध: todos युक्त.",
          explanation: "El equilibrio en la comida (आहार), el recreo (विहार), el esfuerzo (चेष्टा), el sueño (स्वप्न) y la vigilia (अवबोध) estabiliza la mente, y una mente estable es la que mejor aprende.",
        },
      ],
    },
    "6.34": {
      words: ["inquieta", "la mente", "turbulenta, que agita", "fuerte y obstinada", "el control", "como (controlar) el viento", "muy difícil de hacer"],
      meaning: "Arjuna dijo: La mente es inquieta, oh, Krishna, turbulenta, fuerte y obstinada. Creo que controlarla es tan difícil como controlar el viento.",
      situation: {
        title: "Cinco minutos de concentración",
        story:
          "La escuela empieza a hacer cinco minutos de silencio antes de la primera clase. Ananya cierra los ojos y, en diez segundos, su mente está en el almuerzo, luego en una canción, luego en una discusión de ayer y luego en sus uñas. Abre los ojos, frustrada: «Esto se me da fatal». Su profesora sonríe y le lee este shloka. ¡Hasta Arjuna, el mejor arquero de su época, admitió que la mente es como el viento! Ananya se da cuenta de que una mente que divaga no es un fracaso personal; así son las mentes. La pregunta es qué hacer al respecto, y Krishna lo responde en el shloka siguiente.",
      },
      reflect: "Siéntese en silencio un minuto. ¿A cuántos sitios distintos se fue su mente? No juzgue: solo cuente.",
      questions: [
        {
          prompt: "¿Con qué compara Arjuna la dificultad de controlar la mente?",
          options: ["Con controlar el viento", "Con levantar una montaña", "Con cruzar el océano", "Con contar las estrellas"],
          hint: "वायोरिव सुदुष्करम् (tan difícil como el viento).",
          explanation: "वायोः इव: «como (el control) del viento». Arjuna atribuye a la mente cuatro cualidades: चञ्चल (inquieta), प्रमाथि (que agita), बलवत् (fuerte), दृढ (obstinada).",
        },
        {
          prompt: "¿Por qué resulta alentador que esta queja venga de Arjuna?",
          options: [
            "Incluso un gran guerrero disciplinado encontraba difícil controlar la mente, así que tener dificultades es normal",
            "Demuestra que la mente nunca se puede controlar",
            "Muestra que Arjuna era perezoso",
            "Significa que la meditación es solo para guerreros",
          ],
          hint: "Krishna no le regaña; le da la razón (6.35).",
          explanation: "La sinceridad de Arjuna hace humana la enseñanza. Krishna responde असंशयम्, «sin duda», la mente es difícil de controlar, y luego da el método: अभ्यास y वैराग्य.",
        },
      ],
    },
    "6.35": {
      words: ["sin duda", "oh, el de brazos poderosos", "difícil de controlar", "inquieta", "con la práctica", "con el desapego", "se pone bajo control"],
      meaning: "Krishna dijo: Sin duda, oh, el de brazos poderosos, la mente es inquieta y difícil de controlar. Pero, oh, hijo de Kunti, se pone bajo control con la práctica y el desapego.",
      situation: {
        title: "Entrenar la mente como un músculo",
        story:
          "Ishaan no es capaz de estudiar más de diez minutos sin mirar el móvil. Prueba dos cosas. Práctica (अभ्यास): cada día estudia con un temporizador, empezando por 15 minutos y añadiendo 5 cada semana. Cuando su mente divaga, la trae de vuelta con suavidad, sin regañarse. Desapego (वैराग्य): se da cuenta de que la mayoría de las notificaciones no importan de verdad y pierde el interés por mirarlas, así que las desactiva mientras estudia. A los dos meses puede concentrarse 45 minutos. La mente no dejó de ser inquieta; se entrenó, como un músculo.",
      },
      reflect: "Elija una pequeña práctica diaria (अभ्यास) y una distracción por la que perder interés (वैराग्य). Pruebe las dos durante una semana.",
      questions: [
        {
          prompt: "¿Qué dos medios da Krishna para controlar la mente?",
          options: ["La práctica (अभ्यास) y el desapego (वैराग्य)", "El ayuno y el silencio", "El miedo y el castigo", "El sueño y el descanso"],
          hint: "अभ्यासेन (con la práctica) … वैराग्येण च (y con el desapego).",
          explanation: "अभ्यासेन (con la práctica) y वैराग्येण (con el desapasionamiento) están en instrumental (तृतीया): son los medios. El Yoga Sutra 1.12 de Patanjali nombra la misma pareja: अभ्यासवैराग्याभ्यां तन्निरोधः.",
        },
        {
          prompt: "¿Qué plan usa a la vez अभ्यास y वैराग्य para mejorar la concentración?",
          options: [
            "Estudiar a diario con un temporizador y perder el interés por las notificaciones innecesarias desactivándolas",
            "Estudiar solo cuando le apetezca",
            "Tirar el móvil una vez y no practicar nunca",
            "Regañarse cada vez que la mente divaga",
          ],
          hint: "Una parte crea un hábito; la otra afloja la atracción de las distracciones.",
          explanation: "अभ्यास es el esfuerzo constante y repetido; वैराग्य es perder el ansia por lo que distrae. Juntos estabilizan la mente con el tiempo; ninguno funciona bien por separado.",
        },
      ],
    },
    "6.6": {
      words: ["el yo es amigo de esa persona", "por quien", "el yo ha sido conquistado por el yo", "pero para quien no lo ha conquistado", "actúa con hostilidad", "como un enemigo"],
      meaning: "Para quien ha conquistado el yo (la mente) por medio del yo, el yo es un amigo. Pero para quien no lo ha conquistado, ese mismo yo actúa con hostilidad, como un enemigo.",
      situation: {
        title: "Dos estudiantes, una mente cada uno",
        story:
          "Meera y Kabir tienen grandes metas para su examen de acceso. Meera ha ido construyendo hábitos poco a poco: se levanta a la misma hora, estudia antes de mirar el móvil y sale a caminar cuando está estresada. Ahora su mente trabaja para ella: le recuerda el plan y la calma (बन्धु). Kabir no lo ha hecho. Su mente le sabotea: «un capítulo más», «empiezo mañana», «total, vas a suspender» (शत्रुवत्). El mismo tipo de mente, resultados opuestos. El 6.6 explica el 6.5: la mente se convierte en amiga cuando la hemos entrenado, y en enemiga cuando es ella la que nos dirige. Nadie puede hacer esta conquista por nosotros, pero la recompensa es el mejor aliado que tendremos jamás.",
      },
      reflect: "¿En qué ámbito de su vida su mente ya es su amiga? ¿Dónde sigue actuando como una enemiga?",
      questions: [
        {
          prompt: "Según el 6.6, ¿cuándo se convierte el yo en amigo de uno?",
          options: ["Cuando el yo (la mente) ha sido conquistado por uno mismo", "Cuando los demás nos elogian", "Cuando conseguimos todo lo que queremos", "Cuando evitamos todas las dificultades"],
          hint: "येनात्मैवात्मना जितः (aquel que se ha conquistado a sí mismo).",
          explanation: "येन आत्मा एव आत्मना जितः: aquel por quien el yo ha sido conquistado por el yo; para esa persona, el yo es un बन्धु. Aquí आत्मा se usa para la mente y los sentidos.",
        },
        {
          prompt: "En el 6.5 y el 6.6 la palabra आत्मा aparece muchas veces. ¿A qué se refiere sobre todo aquí?",
          options: [
            "A uno mismo: la mente y los sentidos, que pueden estar entrenados o no",
            "A otra persona",
            "Solo al cuerpo físico",
            "A un dios en el cielo",
          ],
          hint: "La misma palabra es a la vez el conquistador y el conquistado.",
          explanation: "En sánscrito, आत्मन् significa a menudo «uno mismo». En estos shlokas abarca el yo inferior (la mente inquieta y los sentidos) y el yo superior que lo entrena. El contexto decide el sentido.",
        },
      ],
    },
    "6.19": {
      words: ["como una lámpara", "en un lugar sin viento", "no parpadea", "esa es la comparación que se da", "del yogui de mente controlada", "que practica el yoga del Ser"],
      meaning: "Como una lámpara en un lugar sin viento no parpadea: esa es la comparación que se usa para el yogui de mente controlada que medita en el Ser.",
      situation: {
        title: "Concentración en la sala de examen",
        story:
          "En la sala de los «board exams» (exámenes nacionales que se hacen en la India al final de la Clase 10 y de la Clase 12), las sillas chirrían, alguien tose y el vigilante va de un lado a otro. Tara lo nota todo, pero su atención se queda en la demostración de geometría como una llama firme. Los ruidos son como el viento al otro lado de una ventana cerrada (निवात): están ahí, pero no agitan la llama. Lleva meses practicando meditaciones breves, y esto es lo que le han dado. La imagen de la Gita es sencilla y exacta: una llama que no parpadea. La concentración no es tensión ni fuerza; es una firmeza serena y luminosa que ilumina todo aquello en lo que se posa.",
      },
      reflect: "¿Cuáles son los «vientos» que hacen parpadear su mente mientras estudia? ¿Cuál podría ser su «lugar sin viento»?",
      questions: [
        {
          prompt: "¿Qué imagen se usa en el 6.19 para la mente controlada de un yogui?",
          options: ["La llama de una lámpara en un lugar sin viento, que no parpadea", "Una hoja de loto en el agua", "Un río que desemboca en el mar", "Un árbol en una tormenta"],
          hint: "दीपो निवातस्थो नेङ्गते (la lámpara sin viento no parpadea).",
          explanation: "दीपः (lámpara) निवातस्थः (situada donde no hay viento) न इङ्गते (no vacila). La hoja de loto era la imagen del 5.10, para actuar sin mancharse.",
        },
        {
          prompt: "¿Qué sugiere esta imagen sobre la concentración verdadera?",
          options: [
            "Que es serena, firme y luminosa, no tensa ni forzada",
            "Que consiste en dejar fuera el mundo a la fuerza",
            "Que significa no tener nunca ningún pensamiento",
            "Que solo es posible en una cueva",
          ],
          hint: "Una llama es luz, no esfuerzo.",
          explanation: "Una llama resguardada sigue ardiendo y dando luz; simplemente no vacila. Así, la mente del yogui permanece viva y atenta, pero sin alterarse. यतचित्त significa «aquel cuya mente está refrenada».",
        },
      ],
    },
    "6.40": {
      words: ["ni aquí ni en el más allá", "destrucción para él", "no existe", "quien hace el bien", "nadie", "un mal final", "querido mío"],
      meaning: "Oh, Partha, para esa persona no hay destrucción, ni en este mundo ni en el otro. Nadie que haga el bien, querido amigo, llega jamás a un mal final.",
      situation: {
        title: "El esfuerzo que «fracasó»",
        story:
          "Arjuna acababa de hacer una pregunta preocupada (6.37–39): ¿qué le pasa a quien intenta sinceramente el camino pero no llega? ¿Se pierde por los dos lados? Dev conoce ese miedo. Se preparó durante un año para la olimpiada nacional de ciencias y no se clasificó. Le parece una pérdida total. Pero su profesor le señala lo que se ha quedado: ahora resuelve problemas que nadie más de la clase sabe resolver, ha aprendido disciplina y tiene amigos del campamento de preparación. Un año después, esas capacidades le llevan con facilidad a través de sus «board exams» (los exámenes nacionales de la India). La respuesta de Krishna, que llama a Arjuna con cariño तात (querido mío), es que ningún esfuerzo sincero hacia el bien se pierde nunca.",
      },
      reflect: "Piense en algo por lo que trabajó mucho y que no salió bien. ¿Qué le dio que todavía conserva?",
      questions: [
        {
          prompt: "¿Qué promesa hace Krishna en el 6.40?",
          options: ["Nadie que haga el bien llega jamás a un mal final", "Todo el que lo intente ganará todas las competiciones", "Solo se salvan los perfectos", "El esfuerzo es inútil si no se alcanza la meta"],
          hint: "न हि कल्याणकृत्कश्चिद्दुर्गतिं … गच्छति (nadie que haga el bien llega a un mal final).",
          explanation: "कल्याणकृत् (quien hace el bien) … न दुर्गतिं गच्छति (no va a un mal estado). Los shlokas siguientes dicen que esa persona continúa el viaje en un nacimiento posterior (6.41–43).",
        },
        {
          prompt: "¿A qué pregunta de Arjuna responde este shloka?",
          options: [
            "¿Qué le pasa a quien intenta sinceramente el camino del yoga pero no llega?",
            "¿Cuántas flechas hacen falta para ganar la guerra?",
            "¿Quién será rey después de la guerra?",
            "¿Por qué el cielo es azul?",
          ],
          hint: "Arjuna la hizo en el 6.37–39, después de oír lo difícil que es controlar la mente.",
          explanation: "Tras oír que la mente es difícil de domar (6.34–35), a Arjuna le preocupaba el योगभ्रष्ट, quien se desvía antes de llegar a la meta. La respuesta tranquilizadora de Krishna es que el esfuerzo sincero nunca se destruye.",
        },
      ],
    },
  },
};
