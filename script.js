/**
 * КУПЕЧЕСКОЕ СЛОВО: Построй дело на века
 * Бизнес-игра по курсу «Основы российской государственности» (Указ № 809 & Пентабазис)
 * Авторы: Котухов Сергей, Сиволод Дмитрий, Ветер Михаил
 */

(() => {
  'use strict';

  // ==========================================================================
  // 1. БАЗА ДАННЫХ: 8 КАРТОЧЕК-ДИЛЕММ С 3-МЯ СТРАТЕГИЯМИ
  // ==========================================================================
  const SCENARIOS = [
    {
      id: 1,
      docCode: "ВЕКСЕЛЬ № 1882-01",
      cityStamp: "С.-ПЕТЕРБУРГЪ",
      pentabasis: "ЧЕЛОВЕК И ТРУД",
      decree: "СОЗИДАТЕЛЬНЫЙ ТРУДЪ",
      avatar: "🧈",
      charRole: "ПОСТАВЩИКЪ СЫРЬЯ",
      charName: "Поставщикъ Ашотъ & пальмовый маргаринъ",
      title: "Сырьевой соблазнъ: Маргаринъ, Альпы или Кооперативъ?",
      narrative: "Поставщик поднял цены на фермерское сливочное масло на 40% из-за ранней распутицы. Знакомый «темщик» шепчет: «Бери технический маргарин, с ванилином никто не отличит, маржа икс-три!». Приказчик требует выписать альпийское масло за тройную цену.",
      marketNews: "БИРЖА: Цены на вологодское масло подскочили на 40% из-за ранней распутицы!",
      choiceA: {
        title: "УШЛЫЙ ТЕМЩИКЪ",
        badge: "СХЕМА 🦊",
        text: "«Закупаем технический маргарин! Где деньги, Лебовски?!»",
        deltas: { capital: 25, honor: -25, city: -15 },
        feedback: "Живот скрутило у половины студгородка. По району поползли нехорошие слухи, полицмейстер принюхивается к выпечке.",
        doctrineNote: "Указ № 809: Фальсификация ради минутной наживы разрушает доверие и губит купеческую репутацию."
      },
      choiceB: {
        title: "НАИВНЫЙ ИДЕАЛИСТЪ",
        badge: "СВЯТОША 🕊️",
        text: "«Купить альпийское масло по тройной цене за счет всего остатка кассы»",
        deltas: { capital: -30, honor: 20, city: 10 },
        feedback: "Масло божественное, но в кассе свистит ветер. Если так сорить золотом — лавка закроется до конца недели!",
        doctrineNote: "Указ № 809 & ОРГ: Слепая расточительность без трезвого расчета неизбежно ведет к кассовому разрыву."
      },
      choiceC: {
        title: "КУПЕЧЕСКАЯ ХВАТКА",
        badge: "РАСЧЕТЪ 👑",
        text: "«Создать артель с пекарями и выбить оптовую скидку 30% напрямую с вологодского завода»",
        deltas: { capital: 10, honor: 15, city: 15 },
        feedback: "Купеческая смекалка в действии! Объединив объемы с соседями, вы снизили цену на треть и получили свежайшее натуральное масло.",
        doctrineNote: "Указ № 809: Созидательный честный труд, кооперация и соборность побеждают любые кризисы."
      }
    },
    {
      id: 2,
      docCode: "ВЕКСЕЛЬ № 1882-02",
      cityStamp: "МОСКВА",
      pentabasis: "СЕМЬЯ И ДИНАСТИЯ",
      decree: "ГУМАНИЗМ И КРЕПКАЯ СЕМЬЯ",
      avatar: "🥖",
      charRole: "МАСТЕРЪ-ПЕКАРЬ",
      charName: "Старшій пекарь Данила & новорожденный сынъ",
      title: "Кадровый вопросъ: Роддомъ, Пиръ или Семейная смѣна?",
      narrative: "У твоего лучшего мастера-пекаря Данилы родился первенец-богатырь! Он просит отпустить его встретить жену из роддома и выдать аванс. Но сегодня вечер пятницы, у прилавка толпа голодных горожан!",
      marketNews: "МОСКВА: Пятничный ажиотаж в торговых рядах, спрос на свежие сайки утроен!",
      choiceA: {
        title: "УШЛЫЙ ТЕМЩИКЪ",
        badge: "СХЕМА 🦊",
        text: "«Бизнес есть бизнес! Никаких отгулов, работать в две смены под угрозой штрафа»",
        deltas: { capital: 20, honor: -25, city: -15 },
        feedback: "Выпечка распродана, но Данила со слезами подал расчет. Коллектив озлобился, бариста смотрит волком.",
        doctrineNote: "Указ № 809: Отношение к человеку как к бездушному винтику уничтожает команду и преданность делу."
      },
      choiceB: {
        title: "НАИВНЫЙ ИДЕАЛИСТЪ",
        badge: "СВЯТОША 🕊️",
        text: "«Закрыть лавку на весь вечер, выдать годовой оклад и устроить пир на весь район за счет кассы!»",
        deltas: { capital: -30, honor: 25, city: 15 },
        feedback: "Район погулял на славу, но касса пуста. Арендодатель уже стучит в дверь, требуя золотых за аренду!",
        doctrineNote: "Указ № 809 & ОРГ: Щедрость должна опираться на экономическую устойчивость, а не на самоликвидацию бизнеса."
      },
      choiceC: {
        title: "КУПЕЧЕСКАЯ ХВАТКА",
        badge: "РАСЧЕТЪ 👑",
        text: "«Отпустить мастера с премией на колыбель, а самому встать к печи вместе со старшим сыном»",
        deltas: { capital: 5, honor: 20, city: 20 },
        feedback: "Покупатели поражены: сам хозяин в фартуке у печи! Семья пекаря предана на всю жизнь, а лавка получила статус образцовой.",
        doctrineNote: "Указ № 809: Личный пример, почитание отцовства и семейный дух создают нерушимый коллектив."
      }
    },
    {
      id: 3,
      docCode: "ВЕКСЕЛЬ № 1882-03",
      cityStamp: "НИЖНIЙ НОВГОРОДЪ",
      pentabasis: "ГОСУДАРСТВО И ЗАКОН",
      decree: "ПАРТНЕРСТВО «В БЕЛУЮ»",
      avatar: "📑",
      charRole: "БУХГАЛТЕРЪ-СХЕМЩИКЪ",
      charName: "Бухгалтеръ-схемщикъ Аркадій & серая касса",
      title: "Налоги и конверты: Тайный ларь, Переплата или Грантъ?",
      narrative: "Ушлый бухгалтер Аркадий предлагает спрятать треть выручки в потайной ларь и платить приказчикам в конвертах. Молодой стряпчий, напротив, советует отдать в казну всё до копейки.",
      marketNews: "НИЖНИЙ: Казенная палата ужесточает надзор за сбором гильдейских податей!",
      choiceA: {
        title: "УШЛЫЙ ТЕМЩИКЪ",
        badge: "СХЕМА 🦊",
        text: "«Прятать выручку в чулок! Налоги платят только простофили»",
        deltas: { capital: 25, honor: -25, city: -20 },
        feedback: "Золото в кармане звенит, но при каждом звоне судейского колокольчика у тебя холодеет в животе.",
        doctrineNote: "Указ № 809: Теневые махинации крадут будущее у города, лишая детей школ и больниц."
      },
      choiceB: {
        title: "НАИВНЫЙ ИДЕАЛИСТЪ",
        badge: "СВЯТОША 🕊️",
        text: "«Заплатить налоги вперед на три года и пожертвовать казну на парады!»",
        deltas: { capital: -30, honor: 20, city: 15 },
        feedback: "Чиновники рассыпались в похвалах, но оборотных средств на закупку муки не осталось совсем.",
        doctrineNote: "Указ № 809 & ОРГ: Финансовая дисциплина требует баланса: налоги платятся по закону, а не из тщеславия."
      },
      choiceC: {
        title: "КУПЕЧЕСКАЯ ХВАТКА",
        badge: "РАСЧЕТЪ 👑",
        text: "«Вести прозрачные книги и подать проект на земский грант для ремесленных производств»",
        deltas: { capital: 15, honor: 15, city: 20 },
        feedback: "Земство выделило безвозвратную ссуду на новую подовую печь! Белый учет открыл доступ к казенному содействию.",
        doctrineNote: "Указ № 809: Законность и честное партнерство с институтами развития государства дают устойчивую прибыль."
      }
    },
    {
      id: 4,
      docCode: "ВЕКСЕЛЬ № 1882-04",
      cityStamp: "ЯРОСЛАВЛЬ",
      pentabasis: "ОБЩЕСТВО И ВЗАИМОВЫРУЧКА",
      decree: "ВЗАИМОПОМОЩЬ И КОЛЛЕКТИВИЗМ",
      avatar: "☕",
      charRole: "СОСѢДНИЙ КУПЕЦЪ",
      charName: "Семейная кофейня купцовъ Соколовыхъ",
      title: "Кризисъ у соседа: Добивать, Раздавать или Выручать?",
      narrative: "У соседней семейной кофейни прорвало трубу и залило печи перед праздниками. Перекуп советует переманить их гостей клеветой, а сердобольный приказчик — бесплатно кормить их за наш счет.",
      marketNews: "ЯРОСЛАВЛЬ: Авария на Волжском водопроводе парализовала торговлю в нижнем посаде!",
      choiceA: {
        title: "УШЛЫЙ ТЕМЩИКЪ",
        badge: "СХЕМА 🦊",
        text: "«Запустить крикунов: „Соседи протухли — идите к нам!“ Добивай конкурента!»",
        deltas: { capital: 25, honor: -30, city: -15 },
        feedback: "В гильдейском собрании тебе публично отказали в подаче руки. В спину шепчут: «Крыса первой гильдии».",
        doctrineNote: "Указ № 809: Людоедский социальный дарвинизм разрушает дух солидарности и общественное доверие."
      },
      choiceB: {
        title: "НАИВНЫЙ ИДЕАЛИСТЪ",
        badge: "СВЯТОША 🕊️",
        text: "«Взять на себя все долги соседей и бесплатно раздавать их выпечку себе в убыток»",
        deltas: { capital: -30, honor: 20, city: 15 },
        feedback: "Святая простота! Твоя доброта похвальна, но твой собственный кассовый баланс ушел в глубокий минус.",
        doctrineNote: "Указ № 809 & ОРГ: Помощь ближнему должна быть разумной; утопающий не спасет другого, если потонет сам."
      },
      choiceC: {
        title: "КУПЕЧЕСКАЯ ХВАТКА",
        badge: "РАСЧЕТЪ 👑",
        text: "«Одолжить запасную печь, пустить их мастеров в ночную смену и сделать совместный праздничный каравай»",
        deltas: { capital: 10, honor: 20, city: 20 },
        feedback: "Настоящее купеческое братство! Соседи спасены, прибыль поделена по совести, город восхищен солидарностью.",
        doctrineNote: "Указ № 809: Коллективизм, соборность и взаимопомощь веками делали русское купечество непобедимым."
      }
    },
    {
      id: 5,
      docCode: "ВЕКСЕЛЬ № 1882-05",
      cityStamp: "КАЗАНЬ",
      pentabasis: "ДУХОВНОСТЬ И КУЛЬТУРА",
      decree: "ПРИОРИТЕТ ДУХОВНОГО НАД МАТЕРИАЛЬНЫМ",
      avatar: "🎪",
      charRole: "ТРЕШЪ-СКОМОРОХЪ",
      charName: "Трешъ-скоморохъ Владъ & срамный хайпъ",
      title: "Реклама лавки: Срамной фарсъ, Тишина или Семейный праздникъ?",
      narrative: "Скандальный скоморох предлагает устроить пошлый пранк прямо в лавке ради дикого хайпа. Либо вовсе закрыть ставни от греха? Либо организовать праздник пряничной росписи для детей?",
      marketNews: "КАЗАНЬ: Городская управа ввела штрафы за непотребный балаганный шум на ярмарках!",
      choiceA: {
        title: "УШЛЫЙ ТЕМЩИКЪ",
        badge: "СХЕМА 🦊",
        text: "«Хайп не пахнет! Запускаем срамных скоморохов и бьем в медные тазы!»",
        deltas: { capital: 20, honor: -35, city: -20 },
        feedback: "Зеваки поглазели, но порядочные семейные покупатели обходят лавку за три версты. Гимназистам запретили вход.",
        doctrineNote: "Указ № 809: Попустительство низменным инстинктам и деструктивному хайпу уничтожает культурный авторитет дела."
      },
      choiceB: {
        title: "НАИВНЫЙ ИДЕАЛИСТЪ",
        badge: "СВЯТОША 🕊️",
        text: "«Запереть ставни, снять вывеску и не тратить ни копейки на оповещение людей»",
        deltas: { capital: -25, honor: 10, city: -5 },
        feedback: "Греха нет, но и лавку никто не видит. Свежий хлеб черствеет, приказчики скучают без покупателей.",
        doctrineNote: "Указ № 809 & ОРГ: Скромность украшает, но купец обязан возвещать о добрых плодах своих трудов."
      },
      choiceC: {
        title: "КУПЕЧЕСКАЯ ХВАТКА",
        badge: "РАСЧЕТЪ 👑",
        text: "«Устроить семейный фестиваль казанского чак-чака с бесплатным мастер-классом для сирот и родителей»",
        deltas: { capital: 10, honor: 20, city: 25 },
        feedback: "Очередь выстроилась до Кремля! Газеты вышли с хвалебными статьями, а семьи стали постоянными гостями лавки.",
        doctrineNote: "Указ № 809: Просвещение, семейный досуг и созидательная культура рождают преданность на долгие годы."
      }
    },
    {
      id: 6,
      docCode: "ВЕКСЕЛЬ № 1882-06",
      cityStamp: "ЕКАТЕРИНБУРГЪ",
      pentabasis: "СТРАНА И ИДЕНТИЧНОСТЬ",
      decree: "ПАТРИОТИЗМ И ЕДИНСТВО НАРОДОВ",
      avatar: "🍩",
      charRole: "ИНОЗЕМНЫЙ АГЕНТЪ",
      charName: "Иноземный конгломератъ «Lucky Donut VIP»",
      title: "Ассортиментъ: Чужой франчайзингъ, Сухари или Уральскiй Калачъ?",
      narrative: "Иноземный негоциант предлагает сменить вывеску на заморскую «Lucky Donut» и продавать мороженые пончики с химией. Либо сушить пресные сухари? Либо разработать аутентичный сибирский калач?",
      marketNews: "УРАЛ: Ярмарочный комитет констатирует взрывной спрос на самобытные сибирские ремесла!",
      choiceA: {
        title: "УШЛЫЙ ТЕМЩИКЪ",
        badge: "СХЕМА 🦊",
        text: "«Вешаем вывеску „Lucky Donut VIP“ и заваливаем лавку импортной химией»",
        deltas: { capital: 20, honor: -25, city: -20 },
        feedback: "Купили пару раз ради яркой этикетки, но вкус оказался бумажным. Вывеска выцвела, уважение земляков потеряно.",
        doctrineNote: "Указ № 809: Забвение национального культурного кода и раболепие перед чужим превращают дело в пустую декорацию."
      },
      choiceB: {
        title: "НАИВНЫЙ ИДЕАЛИСТЪ",
        badge: "СВЯТОША 🕊️",
        text: "«Печь исключительно твердые пресные сухари по рецепту XII века без сахара и соли!»",
        deltas: { capital: -25, honor: 15, city: 5 },
        feedback: "Аутентично до зубовного скрежета, но горожане не могут разгрызть ваши изделия. Склад забит неликвидом.",
        doctrineNote: "Указ № 809 & ОРГ: Традиция — это передача живого огня, а не поклонение окаменевшему пеплу."
      },
      choiceC: {
        title: "КУПЕЧЕСКАЯ ХВАТКА",
        badge: "РАСЧЕТЪ 👑",
        text: "«Запустить линейку „Уральскiй Калачъ“: таежная брусника, кедровый орех и фирменная берестяная коробка»",
        deltas: { capital: 15, honor: 15, city: 20 },
        feedback: "Триумф! Гости Екатеринбурга увозят коробки с калачами как главный сувенир города, губернатор вручил знак качества!",
        doctrineNote: "Указ № 809: Опора на родные богатства, традицию и самобытный стиль рождает национальных лидеров."
      }
    },
    {
      id: 7,
      docCode: "ВЕКСЕЛЬ № 1882-07",
      cityStamp: "САМАРА",
      pentabasis: "ОБЩЕСТВО И СРЕДА",
      decree: "СЛУЖЕНИЕ ОБЩЕСТВУ И МЕЦЕНАТСТВО",
      avatar: "🏮",
      charRole: "МѢЩАНСКIЙ СТАРОСТА",
      charName: "Мещанскій комитетъ & темный дворъ",
      title: "Городская среда: Глухой заборъ, Золотой фонтанъ или Скверъ?",
      narrative: "Во дворе рядом с твоей лавкой — заросший пустырь, где по ночам шалят лихие люди. Темщик советует огородиться колючей проволокой. Идеалист требует отдать всю прибыль в городскую кассу. Купец видит здесь место для сквера!",
      marketNews: "САМАРА: Мещанская управа учредила льготную аренду купцам, облагораживающим набережные!",
      choiceA: {
        title: "УШЛЫЙ ТЕМЩИКЪ",
        badge: "СХЕМА 🦊",
        text: "«Поставить глухой трехметровый забор: моя хата с краю, я вам не ЖКХ!»",
        deltas: { capital: 15, honor: -20, city: -30 },
        feedback: "Клиенты боятся ходить мимо мрачного темного двора. Вечером улица вымирает, выручка лавки стремительно падает.",
        doctrineNote: "Указ № 809: Равнодушие к среде обитания бумерангом бьет по безопасности и благополучию предпринимателя."
      },
      choiceB: {
        title: "НАИВНЫЙ ИДЕАЛИСТЪ",
        badge: "СВЯТОША 🕊️",
        text: "«Спустить всю казну лавки на мраморные фонтаны и позолоту на пустыре!»",
        deltas: { capital: -30, honor: 25, city: 25 },
        feedback: "Красота неописуемая, но поставщики муки выставили неустойку. Денег на расчетном счете — круглый ноль!",
        doctrineNote: "Указ № 809 & ОРГ: Меценатство должно быть соизмеримо с силами; разорившийся меценат больше никого не одарит."
      },
      choiceC: {
        title: "КУПЕЧЕСКАЯ ХВАТКА",
        badge: "РАСЧЕТЪ 👑",
        text: "«Поставить фонари, обустроить лавочки с газонами и открыть уютную чайную веранду»",
        deltas: { capital: 10, honor: 20, city: 25 },
        feedback: "Весь район теперь гуляет в благоустроенном сквере! Аромат выпечки манит гостей, а выручка лавки выросла на треть.",
        doctrineNote: "Указ № 809: Традиция русского меценатства: преображая город вокруг, купец возвышает и свое дело."
      }
    },
    {
      id: 8,
      docCode: "ВЕКСЕЛЬ № 1882-08",
      cityStamp: "РОСТОВЪ-НА-ДОНУ",
      pentabasis: "ПРЕЕМСТВЕННОСТЬ ПОКОЛЕНИЙ",
      decree: "ИСТОРИЧЕСКАЯ ПАМЯТЬ И ДИНАСТИЯ",
      avatar: "🏪",
      charRole: "СЕТЕВОЙ МОНОПОЛИСТЪ",
      charName: "Сетевой перекупъ «Вейпъ-Алко-Торгъ»",
      title: "Будущее дѣла: Продать подъ кабакъ, Раздать или Торговый Домъ?",
      narrative: "Крупный синдикат предлагает выкупить твой бизнес за большие наличные, чтобы снести пекарню и открыть злачный кабак. Это твой финальный выбор, определяющий судьбу твоего имени в веках!",
      marketNews: "ДОН: Столичные дельцы агрессивно скупают торговые места в купеческом центре!",
      choiceA: {
        title: "УШЛЫЙ ТЕМЩИКЪ",
        badge: "СХЕМА 🦊",
        text: "«Продать всё под кабак и улететь кутить в Ниццу!»",
        deltas: { capital: 35, honor: -45, city: -35 },
        feedback: "В кармане ассигнации, но земляки проклинают твою фамилию. Вместо хлебного духа — пьяные драки под окнами бывших друзей.",
        doctrineNote: "Указ № 809: Продажа плодов созидательного труда ради пошлой праздности — духовная смерть предпринимателя."
      },
      choiceB: {
        title: "НАИВНЫЙ ИДЕАЛИСТЪ",
        badge: "СВЯТОША 🕊️",
        text: "«Завещать лавку дальним проходимцам и раздать всё зерно первому встречному»",
        deltas: { capital: -30, honor: 15, city: -10 },
        feedback: "Зерно растащили спекулянты и перепродали втрое дороже на черном рынке. Дело предков прекратило существование.",
        doctrineNote: "Указ № 809 & ОРГ: Бездумная растрата наследия без заботы о династии и преемственности губит вековой труд."
      },
      choiceC: {
        title: "КУПЕЧЕСКАЯ ХВАТКА",
        badge: "РАСЧЕТЪ 👑",
        text: "«Отказать перекупам! Передать дело детям, учредить стипендию для юных пекарей и заложить фабрику»",
        deltas: { capital: 25, honor: 25, city: 25 },
        feedback: "Торговый Домъ с твоим купеческим гербом вошел в историю! Фамилия стала символом надежности и созидания державы!",
        doctrineNote: "Указ № 809: Преемственность поколений, верность купеческому слову и служение Отечеству строят дело на века!"
      }
    }
  ];

  // Варианты купеческого жребия (Кубик 1-6)
  const DICE_EVENTS = [
    {
      roll: 1,
      icon: "⚀",
      name: "Набег ревизоров из Казенной Палаты",
      desc: "Придирчивый чиновник нашел пылинку на весовых гирях и выписал крупный штраф.",
      deltas: { capital: -15, honor: 0, city: 0 }
    },
    {
      roll: 2,
      icon: "⚁",
      name: "Злые сплетни на торгу",
      desc: "Конкуренты пустили слух, будто в вашей муке завелся долгоносик. Покупатели колеблются.",
      deltas: { capital: 0, honor: -15, city: 0 }
    },
    {
      roll: 3,
      icon: "⚂",
      name: "Ничья на Нижегородской ярмарке",
      desc: "Сделка сошлась в ноль, но вам удалось выгодно сбыть остатки вчерашней сдобы.",
      deltas: { capital: 5, honor: 5, city: 0 }
    },
    {
      roll: 4,
      icon: "⚃",
      name: "Выгодная партия крымского сахара",
      desc: "Удалось перехватить обоз с тростниковым сахаром со скидкой 40% прямо с баржи!",
      deltas: { capital: 15, honor: 0, city: 10 }
    },
    {
      roll: 5,
      icon: "⚄",
      name: "Похвала Архиерея и Городской Думы",
      desc: "Ваш калач освятили на городском празднике, прихожане повалили за благословенным хлебом!",
      deltas: { capital: 10, honor: 20, city: 15 }
    },
    {
      roll: 6,
      icon: "⚅",
      name: "КУПЕЧЕСКИЙ КУШ! Казенный заказ флота!",
      desc: "Подписан прямой контракт на снабжение сухарями Балтийского флота Его Величества!",
      deltas: { capital: 25, honor: 15, city: 15 }
    }
  ];

  // ==========================================================================
  // 2. WEB AUDIO API SYNTHESIZER (БЕЗ ВНЕШНИХ MP3)
  // ==========================================================================
  class MerchantSoundEngine {
    constructor() {
      this.ctx = null;
      this.enabled = localStorage.getItem('merchant_sound_enabled') !== 'false';
    }

    initContext() {
      if (!this.ctx) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (AudioCtx) {
          this.ctx = new AudioCtx();
        }
      }
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
    }

    toggle() {
      this.enabled = !this.enabled;
      localStorage.setItem('merchant_sound_enabled', this.enabled);
      return this.enabled;
    }

    // Звон золотых монет (Капитал / Успех)
    playCoin() {
      if (!this.enabled) return;
      this.initContext();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      [880, 1320, 1760].forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.06);

        gain.gain.setValueAtTime(0.15, now + idx * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.06 + 0.35);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now + idx * 0.06);
        osc.stop(now + idx * 0.06 + 0.4);
      });
    }

    // Удар купеческой печати (Выбор пути)
    playStamp() {
      if (!this.enabled) return;
      this.initContext();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(140, now);
      osc.frequency.exponentialRampToValueAtTime(40, now + 0.12);

      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.2);
    }

    // Грохот броска костей на ярмарке
    playDiceRoll() {
      if (!this.enabled) return;
      this.initContext();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      for (let i = 0; i < 6; i++) {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'square';
        osc.frequency.setValueAtTime(200 + Math.random() * 300, now + i * 0.07);

        gain.gain.setValueAtTime(0.08, now + i * 0.07);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.07 + 0.05);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now + i * 0.07);
        osc.stop(now + i * 0.07 + 0.06);
      }
    }

    // Фанфары победы (Грамота)
    playVictory() {
      if (!this.enabled) return;
      this.initContext();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const chord = [523.25, 659.25, 783.99, 1046.50]; // C Major
      chord.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + idx * 0.1);

        gain.gain.setValueAtTime(0.2, now + idx * 0.1);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.1 + 0.8);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now + idx * 0.1);
        osc.stop(now + idx * 0.1 + 0.9);
      });
    }

    // Звук банкротства / позора
    playLoss() {
      if (!this.enabled) return;
      this.initContext();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const notes = [330, 311, 293, 220]; // Dissonant drop
      notes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(freq, now + idx * 0.18);

        gain.gain.setValueAtTime(0.18, now + idx * 0.18);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.18 + 0.35);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now + idx * 0.18);
        osc.stop(now + idx * 0.18 + 0.4);
      });
    }
  }

  // ==========================================================================
  // 3. ДВИЖОК ИГРЫ: СОСТОЯНИЕ И ЛОГИКА
  // ==========================================================================
  class MerchantGame {
    constructor() {
      this.sound = new MerchantSoundEngine();
      this.turn = 0;
      this.capital = 50;
      this.honor = 50;
      this.city = 50;
      this.history = [];
      this.gameOver = false;
      this.inModal = false;
      this.diceUsed = false;

      // DOM Elements Cache
      this.dom = {
        // Stats
        numCapital: document.getElementById('numCapital'),
        numHonor: document.getElementById('numHonor'),
        numCity: document.getElementById('numCity'),
        barCapital: document.getElementById('barCapital'),
        barHonor: document.getElementById('barHonor'),
        barCity: document.getElementById('barCity'),
        ghostCapital: document.getElementById('ghostCapital'),
        ghostHonor: document.getElementById('ghostHonor'),
        ghostCity: document.getElementById('ghostCity'),
        deltaCapital: document.getElementById('deltaCapital'),
        deltaHonor: document.getElementById('deltaHonor'),
        deltaCity: document.getElementById('deltaCity'),
        cardScaleCapital: document.getElementById('cardScaleCapital'),
        cardScaleHonor: document.getElementById('cardScaleHonor'),
        cardScaleCity: document.getElementById('cardScaleCity'),

        // Turn Info
        turnValue: document.getElementById('turnValue'),
        cardDocCode: document.getElementById('cardDocCode'),
        cardPentabasisText: document.getElementById('cardPentabasisText'),
        cardDecreeText: document.getElementById('cardDecreeText'),

        // Card Content & Ticker
        marketTicker: document.getElementById('marketTicker'),
        charAvatar: document.getElementById('charAvatar'),
        charRole: document.getElementById('charRole'),
        charName: document.getElementById('charName'),
        dilemmaTitle: document.getElementById('dilemmaTitle'),
        dilemmaText: document.getElementById('dilemmaText'),
        btnRollDice: document.getElementById('btnRollDice'),

        // 3 Choices
        btnChoiceA: document.getElementById('btnChoiceA'),
        choiceAText: document.getElementById('choiceAText'),
        choiceAPreview: document.getElementById('choiceAPreview'),

        btnChoiceB: document.getElementById('btnChoiceB'),
        choiceBText: document.getElementById('choiceBText'),
        choiceBPreview: document.getElementById('choiceBPreview'),

        btnChoiceC: document.getElementById('btnChoiceC'),
        choiceCText: document.getElementById('choiceCText'),
        choiceCPreview: document.getElementById('choiceCPreview'),

        // Header controls
        btnSound: document.getElementById('btnSound'),
        soundIcon: document.getElementById('soundIcon'),
        btnFullscreen: document.getElementById('btnFullscreen'),
        btnQr: document.getElementById('btnQr'),
        btnAbout: document.getElementById('btnAbout'),
        btnRestart: document.getElementById('btnRestart'),

        // Feedback Modal
        modalFeedback: document.getElementById('modalFeedback'),
        gazetteTurnInfo: document.getElementById('gazetteTurnInfo'),
        gazetteChoiceEcho: document.getElementById('gazetteChoiceEcho'),
        gazetteFeedbackText: document.getElementById('gazetteFeedbackText'),
        gazetteDeltaBadges: document.getElementById('gazetteDeltaBadges'),
        gazetteDoctrineNote: document.getElementById('gazetteDoctrineNote'),
        btnNextTurn: document.getElementById('btnNextTurn'),

        // Dice Fortune Modal
        modalDice: document.getElementById('modalDice'),
        diceCube: document.getElementById('diceCube'),
        diceResultHeading: document.getElementById('diceResultHeading'),
        diceResultText: document.getElementById('diceResultText'),
        diceDeltaBadge: document.getElementById('diceDeltaBadge'),
        btnRollNow: document.getElementById('btnRollNow'),
        btnCloseDice: document.getElementById('btnCloseDice'),

        // Game Over Modal
        modalGameOver: document.getElementById('modalGameOver'),
        gameOverTitle: document.getElementById('gameOverTitle'),
        gameOverSub: document.getElementById('gameOverSub'),
        gameOverDesc: document.getElementById('gameOverDesc'),
        gameOverLesson: document.getElementById('gameOverLesson'),
        lossCapital: document.getElementById('lossCapital'),
        lossHonor: document.getElementById('lossHonor'),
        lossCity: document.getElementById('lossCity'),
        btnRestartFromLoss: document.getElementById('btnRestartFromLoss'),

        // Victory Diploma Modal
        modalVictory: document.getElementById('modalVictory'),
        diplomaRankTitle: document.getElementById('diplomaRankTitle'),
        diplomaRankDesc: document.getElementById('diplomaRankDesc'),
        finalCapitalVal: document.getElementById('finalCapitalVal'),
        finalHonorVal: document.getElementById('finalHonorVal'),
        finalCityVal: document.getElementById('finalCityVal'),
        finalCapitalStatus: document.getElementById('finalCapitalStatus'),
        finalHonorStatus: document.getElementById('finalHonorStatus'),
        finalCityStatus: document.getElementById('finalCityStatus'),
        btnPrintDiploma: document.getElementById('btnPrintDiploma'),
        btnRestartFromVictory: document.getElementById('btnRestartFromVictory'),

        // QR Modal
        modalQr: document.getElementById('modalQr'),
        qrCodeContainer: document.getElementById('qrCodeContainer'),
        qrUrlInput: document.getElementById('qrUrlInput'),
        btnCopyUrl: document.getElementById('btnCopyUrl'),
        copyUrlLabel: document.getElementById('copyUrlLabel'),
        btnPresetGithub: document.getElementById('btnPresetGithub'),
        btnPresetCurrent: document.getElementById('btnPresetCurrent'),
        btnCloseQr: document.getElementById('btnCloseQr'),

        // About Modal
        modalAbout: document.getElementById('modalAbout'),
        btnCloseAbout: document.getElementById('btnCloseAbout'),
        btnConfirmAbout: document.getElementById('btnConfirmAbout')
      };

      this.init();
    }

    init() {
      this.updateSoundButtonUI();
      this.renderQrCode();
      this.bindEvents();
      this.startNewGame();
    }

    startNewGame() {
      this.turn = 0;
      this.capital = 50;
      this.honor = 50;
      this.city = 50;
      this.history = [];
      this.gameOver = false;
      this.inModal = false;
      this.diceUsed = false;

      // Reset dice button
      if (this.dom.btnRollDice) {
        this.dom.btnRollDice.disabled = false;
        this.dom.btnRollDice.innerHTML = `<span class="btn-icon">🎲</span><span class="btn-dice-label">ЖРЕБIЙ (1 РАЗЪ)</span>`;
        this.dom.btnRollDice.setAttribute('title', 'Испытать купеческую удачу на ярмарке [D]');
      }

      // Close all modals
      this.hideModal(this.dom.modalFeedback);
      this.hideModal(this.dom.modalDice);
      this.hideModal(this.dom.modalGameOver);
      this.hideModal(this.dom.modalVictory);
      this.hideModal(this.dom.modalQr);
      this.hideModal(this.dom.modalAbout);

      this.updateStatsUI();
      this.renderCurrentScenario();
      this.clearHoverPreview();
    }

    bindEvents() {
      // 3 Choice Buttons
      this.dom.btnChoiceA.addEventListener('click', () => this.makeChoice('A'));
      this.dom.btnChoiceB.addEventListener('click', () => this.makeChoice('B'));
      if (this.dom.btnChoiceC) {
        this.dom.btnChoiceC.addEventListener('click', () => this.makeChoice('C'));
      }

      // Hover Previews
      this.dom.btnChoiceA.addEventListener('mouseenter', () => this.previewChoiceDeltas('A'));
      this.dom.btnChoiceA.addEventListener('mouseleave', () => this.clearHoverPreview());
      this.dom.btnChoiceA.addEventListener('focus', () => this.previewChoiceDeltas('A'));
      this.dom.btnChoiceA.addEventListener('blur', () => this.clearHoverPreview());

      this.dom.btnChoiceB.addEventListener('mouseenter', () => this.previewChoiceDeltas('B'));
      this.dom.btnChoiceB.addEventListener('mouseleave', () => this.clearHoverPreview());
      this.dom.btnChoiceB.addEventListener('focus', () => this.previewChoiceDeltas('B'));
      this.dom.btnChoiceB.addEventListener('blur', () => this.clearHoverPreview());

      if (this.dom.btnChoiceC) {
        this.dom.btnChoiceC.addEventListener('mouseenter', () => this.previewChoiceDeltas('C'));
        this.dom.btnChoiceC.addEventListener('mouseleave', () => this.clearHoverPreview());
        this.dom.btnChoiceC.addEventListener('focus', () => this.previewChoiceDeltas('C'));
        this.dom.btnChoiceC.addEventListener('blur', () => this.clearHoverPreview());
      }

      // Dice roll trigger
      if (this.dom.btnRollDice) {
        this.dom.btnRollDice.addEventListener('click', () => this.openDiceModal());
      }
      if (this.dom.btnRollNow) {
        this.dom.btnRollNow.addEventListener('click', () => this.rollDice());
      }
      if (this.dom.btnCloseDice) {
        this.dom.btnCloseDice.addEventListener('click', () => this.closeDiceModal());
      }

      // Next Turn Button in Gazette Modal
      this.dom.btnNextTurn.addEventListener('click', () => this.advanceFromFeedback());

      // Restart Buttons
      this.dom.btnRestart.addEventListener('click', () => this.startNewGame());
      this.dom.btnRestartFromLoss.addEventListener('click', () => this.startNewGame());
      this.dom.btnRestartFromVictory.addEventListener('click', () => this.startNewGame());

      // Sound Toggle
      this.dom.btnSound.addEventListener('click', () => {
        const enabled = this.sound.toggle();
        this.updateSoundButtonUI();
        if (enabled) this.sound.playCoin();
      });

      // Fullscreen Toggle
      if (this.dom.btnFullscreen) {
        this.dom.btnFullscreen.addEventListener('click', () => this.toggleFullscreen());
      }

      // QR Modal
      this.dom.btnQr.addEventListener('click', () => this.openQrModal());
      this.dom.btnCloseQr.addEventListener('click', () => this.hideModal(this.dom.modalQr));
      this.dom.btnCopyUrl.addEventListener('click', () => this.copyGameUrl());

      if (this.dom.qrUrlInput) {
        this.dom.qrUrlInput.addEventListener('input', () => {
          this.renderQrCode(this.dom.qrUrlInput.value.trim());
        });
      }

      if (this.dom.btnPresetGithub) {
        this.dom.btnPresetGithub.addEventListener('click', () => {
          const ghUrl = "https://github.com/s74001468-lab/Merchant-or-Speculator-";
          this.dom.qrUrlInput.value = ghUrl;
          this.renderQrCode(ghUrl);
        });
      }

      if (this.dom.btnPresetCurrent) {
        this.dom.btnPresetCurrent.addEventListener('click', () => {
          const curUrl = window.location.href.split('#')[0];
          this.dom.qrUrlInput.value = curUrl;
          this.renderQrCode(curUrl);
        });
      }

      // About Modal
      this.dom.btnAbout.addEventListener('click', () => this.showModal(this.dom.modalAbout));
      this.dom.btnCloseAbout.addEventListener('click', () => this.hideModal(this.dom.modalAbout));
      this.dom.btnConfirmAbout.addEventListener('click', () => this.hideModal(this.dom.modalAbout));

      // Print Diploma Button
      this.dom.btnPrintDiploma.addEventListener('click', () => window.print());

      // Keyboard Shortcuts for Presenters
      window.addEventListener('keydown', (e) => this.handleKeydown(e));
    }

    handleKeydown(e) {
      if (['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) return;

      // Close open informational modals on Escape
      if (e.key === 'Escape') {
        if (!this.dom.modalQr.hidden) this.hideModal(this.dom.modalQr);
        if (!this.dom.modalAbout.hidden) this.hideModal(this.dom.modalAbout);
        if (!this.dom.modalDice.hidden && this.dom.btnCloseDice.hidden === false) {
          this.closeDiceModal();
        }
        return;
      }

      // Next Turn on Space / Enter if Feedback Modal is open
      if (!this.dom.modalFeedback.hidden) {
        if (e.code === 'Space' || e.key === 'Enter') {
          e.preventDefault();
          this.advanceFromFeedback();
        }
        return;
      }

      // Roll or close dice on Space/Enter if dice modal is open
      if (!this.dom.modalDice.hidden) {
        if (e.code === 'Space' || e.key === 'Enter') {
          e.preventDefault();
          if (!this.dom.btnRollNow.hidden && !this.dom.btnRollNow.disabled) {
            this.rollDice();
          } else if (!this.dom.btnCloseDice.hidden) {
            this.closeDiceModal();
          }
        }
        return;
      }

      // If game is over or modals are open, block game choices
      if (this.gameOver || !this.dom.modalGameOver.hidden || !this.dom.modalVictory.hidden) {
        return;
      }

      if (e.key === '1') {
        e.preventDefault();
        this.makeChoice('A');
      } else if (e.key === '2') {
        e.preventDefault();
        this.makeChoice('B');
      } else if (e.key === '3') {
        e.preventDefault();
        this.makeChoice('C');
      } else if (e.key === 'd' || e.key === 'D' || e.key === 'в' || e.key === 'В') {
        e.preventDefault();
        this.openDiceModal();
      } else if (e.key === 'f' || e.key === 'F' || e.key === 'а' || e.key === 'А') {
        e.preventDefault();
        this.toggleFullscreen();
      } else if (e.key === 'q' || e.key === 'Q' || e.key === 'й' || e.key === 'Й') {
        e.preventDefault();
        this.openQrModal();
      } else if (e.key === 'm' || e.key === 'M' || e.key === 'ь' || e.key === 'Ь') {
        e.preventDefault();
        const enabled = this.sound.toggle();
        this.updateSoundButtonUI();
        if (enabled) this.sound.playCoin();
      } else if (e.key === 'r' || e.key === 'R' || e.key === 'к' || e.key === 'К') {
        e.preventDefault();
        this.startNewGame();
      }
    }

    toggleFullscreen() {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(err => console.warn(err));
      } else {
        document.exitFullscreen().catch(err => console.warn(err));
      }
    }

    updateSoundButtonUI() {
      const enabled = this.sound.enabled;
      this.dom.soundIcon.textContent = enabled ? '🔊' : '🔇';
      this.dom.btnSound.setAttribute('title', enabled ? 'Звук включен [M]' : 'Звук выключен [M]');
    }

    renderCurrentScenario() {
      if (this.turn >= SCENARIOS.length) {
        this.triggerVictory();
        return;
      }

      const card = SCENARIOS[this.turn];
      this.dom.turnValue.textContent = `ХОДЪ ${this.turn + 1} / 8`;
      this.dom.cardDocCode.textContent = card.docCode;
      this.dom.cardPentabasisText.textContent = `ПЕНТАБАЗИС: ${card.pentabasis}`;
      this.dom.cardDecreeText.textContent = `УКАЗ № 809: ${card.decree}`;

      if (this.dom.marketTicker) {
        this.dom.marketTicker.textContent = card.marketNews;
      }

      this.dom.charAvatar.textContent = card.avatar;
      this.dom.charRole.textContent = card.charRole;
      this.dom.charName.textContent = card.charName;

      this.dom.dilemmaTitle.textContent = card.title;
      this.dom.dilemmaText.textContent = card.narrative;

      // Choice A (Темщик)
      this.dom.choiceAText.textContent = card.choiceA.text;
      this.renderChoicePreviewBadges(this.dom.choiceAPreview, card.choiceA.deltas);

      // Choice B (Идеалист)
      this.dom.choiceBText.textContent = card.choiceB.text;
      this.renderChoicePreviewBadges(this.dom.choiceBPreview, card.choiceB.deltas);

      // Choice C (Купеческая хватка)
      if (this.dom.choiceCText && card.choiceC) {
        this.dom.choiceCText.textContent = card.choiceC.text;
        this.renderChoicePreviewBadges(this.dom.choiceCPreview, card.choiceC.deltas);
      }
    }

    renderChoicePreviewBadges(container, deltas) {
      if (!container) return;
      container.innerHTML = `
        <span class="preview-item ${deltas.capital >= 0 ? 'pos' : 'neg'}">💰 ${deltas.capital >= 0 ? '+' : ''}${deltas.capital} Капитал</span>
        <span class="preview-item ${deltas.honor >= 0 ? 'pos' : 'neg'}">📜 ${deltas.honor >= 0 ? '+' : ''}${deltas.honor} Имя</span>
        <span class="preview-item ${deltas.city >= 0 ? 'pos' : 'neg'}">🏛️ ${deltas.city >= 0 ? '+' : ''}${deltas.city} Город</span>
      `;
    }

    // ========================================================================
    // ДЕЛЬТА-ХОВЕР: ПРЕДПРОСМОТР ИЗМЕНЕНИЙ НА ШКАЛАХ
    // ========================================================================
    previewChoiceDeltas(choiceLetter) {
      if (this.turn >= SCENARIOS.length) return;
      const card = SCENARIOS[this.turn];
      let deltas;
      if (choiceLetter === 'A') deltas = card.choiceA.deltas;
      else if (choiceLetter === 'B') deltas = card.choiceB.deltas;
      else if (choiceLetter === 'C') deltas = card.choiceC.deltas;
      if (!deltas) return;

      this.applyGhostPreview(this.dom.ghostCapital, this.dom.deltaCapital, this.dom.cardScaleCapital, this.capital, deltas.capital);
      this.applyGhostPreview(this.dom.ghostHonor, this.dom.deltaHonor, this.dom.cardScaleHonor, this.honor, deltas.honor);
      this.applyGhostPreview(this.dom.ghostCity, this.dom.deltaCity, this.dom.cardScaleCity, this.city, deltas.city);
    }

    applyGhostPreview(ghostElem, deltaElem, cardElem, currentVal, delta) {
      const targetVal = Math.max(0, Math.min(100, currentVal + delta));
      const isPositive = delta >= 0;

      // Show delta badge
      deltaElem.textContent = `${isPositive ? '+' : ''}${delta}`;
      deltaElem.className = `meter-delta-pill visible ${isPositive ? 'pos' : 'neg'}`;

      // Show ghost fill indicator
      const left = Math.min(currentVal, targetVal);
      const width = Math.abs(targetVal - currentVal);
      ghostElem.style.left = `${left}%`;
      ghostElem.style.width = `${width}%`;
      ghostElem.classList.add('show-ghost');

      cardElem.classList.add('preview-active');
    }

    clearHoverPreview() {
      [this.dom.ghostCapital, this.dom.ghostHonor, this.dom.ghostCity].forEach(el => {
        el.classList.remove('show-ghost');
        el.style.width = '0%';
      });

      [this.dom.deltaCapital, this.dom.deltaHonor, this.dom.deltaCity].forEach(el => {
        el.classList.remove('visible');
      });

      [this.dom.cardScaleCapital, this.dom.cardScaleHonor, this.dom.cardScaleCity].forEach(el => {
        el.classList.remove('preview-active');
      });
    }

    // ========================================================================
    // ХОД И ВЫБОР РЕШЕНИЯ
    // ========================================================================
    makeChoice(choiceLetter) {
      if (this.gameOver || this.inModal) return;
      const card = SCENARIOS[this.turn];
      let choice;
      if (choiceLetter === 'A') choice = card.choiceA;
      else if (choiceLetter === 'B') choice = card.choiceB;
      else if (choiceLetter === 'C') choice = card.choiceC;
      if (!choice) return;

      this.sound.playStamp();
      this.clearHoverPreview();

      // Apply deltas
      this.capital = Math.max(0, Math.min(100, this.capital + choice.deltas.capital));
      this.honor = Math.max(0, Math.min(100, this.honor + choice.deltas.honor));
      this.city = Math.max(0, Math.min(100, this.city + choice.deltas.city));

      // Store history
      this.history.push({
        turn: this.turn,
        choiceLetter,
        deltas: choice.deltas
      });

      this.updateStatsUI();

      // Check if instant bankruptcy triggered
      const lossReason = this.checkBankruptcy();
      if (lossReason) {
        this.triggerLoss(lossReason);
        return;
      }

      // Otherwise show Gazette Feedback modal
      this.showFeedbackModal(card, choice, choiceLetter);
    }

    updateStatsUI() {
      this.dom.numCapital.textContent = this.capital;
      this.dom.numHonor.textContent = this.honor;
      this.dom.numCity.textContent = this.city;

      this.dom.barCapital.style.width = `${this.capital}%`;
      this.dom.barHonor.style.width = `${this.honor}%`;
      this.dom.barCity.style.width = `${this.city}%`;

      // Low resource color alert
      this.dom.numCapital.style.color = this.capital <= 20 ? 'var(--cinnabar)' : 'var(--ink-black)';
      this.dom.numHonor.style.color = this.honor <= 20 ? 'var(--cinnabar)' : 'var(--ink-black)';
      this.dom.numCity.style.color = this.city <= 20 ? 'var(--cinnabar)' : 'var(--ink-black)';
    }

    showFeedbackModal(card, choice, choiceLetter) {
      this.inModal = true;
      this.dom.gazetteTurnInfo.textContent = `ХОДЪ ${this.turn + 1} ИЗЪ 8 • РЕШЕНIЕ ПРИНЯТО`;
      this.dom.gazetteChoiceEcho.textContent = `Вы выбрали: ${choice.text}`;
      this.dom.gazetteFeedbackText.textContent = choice.feedback;
      this.dom.gazetteDoctrineNote.innerHTML = `<strong>🏛️ ВЫВОДЪ:</strong> ${choice.doctrineNote}`;

      // Badges
      const d = choice.deltas;
      this.dom.gazetteDeltaBadges.innerHTML = `
        <div class="delta-badge ${d.capital >= 0 ? 'pos' : 'neg'}">
          <span>💰 Капитал:</span> <strong>${d.capital >= 0 ? '+' : ''}${d.capital}</strong>
        </div>
        <div class="delta-badge ${d.honor >= 0 ? 'pos' : 'neg'}">
          <span>📜 Имя:</span> <strong>${d.honor >= 0 ? '+' : ''}${d.honor}</strong>
        </div>
        <div class="delta-badge ${d.city >= 0 ? 'pos' : 'neg'}">
          <span>🏛️ Город:</span> <strong>${d.city >= 0 ? '+' : ''}${d.city}</strong>
        </div>
      `;

      this.showModal(this.dom.modalFeedback);
      this.dom.btnNextTurn.focus();
    }

    advanceFromFeedback() {
      this.hideModal(this.dom.modalFeedback);
      this.inModal = false;
      this.turn++;

      if (this.turn >= SCENARIOS.length) {
        this.triggerVictory();
      } else {
        this.renderCurrentScenario();
      }
    }

    // ========================================================================
    // КУПЕЧЕСКИЙ ЖРЕБИЙ (ИСПЫТАНИЕ УДАЧИ 1 РАЗ ЗА ИГРУ)
    // ========================================================================
    openDiceModal() {
      if (this.diceUsed || this.gameOver || this.inModal) return;
      this.inModal = true;
      this.dom.diceCube.textContent = "🎲";
      this.dom.diceCube.classList.remove('rolling');
      this.dom.diceResultHeading.textContent = "Бросаем кости на сукно...";
      this.dom.diceResultText.textContent = "Купец, надейся на верный глаз, трезвый расчёт и милость фортуны!";
      this.dom.diceDeltaBadge.innerHTML = "";
      this.dom.btnRollNow.hidden = false;
      this.dom.btnRollNow.disabled = false;
      this.dom.btnCloseDice.hidden = true;

      this.showModal(this.dom.modalDice);
    }

    rollDice() {
      if (this.diceUsed) return;
      this.dom.btnRollNow.disabled = true;
      this.sound.playDiceRoll();
      this.dom.diceCube.classList.add('rolling');

      setTimeout(() => {
        this.dom.diceCube.classList.remove('rolling');
        const rollIndex = Math.floor(Math.random() * DICE_EVENTS.length);
        const event = DICE_EVENTS[rollIndex];

        this.dom.diceCube.textContent = event.icon;
        this.dom.diceResultHeading.textContent = `${event.roll} ОЧКОВ: ${event.name}`;
        this.dom.diceResultText.textContent = event.desc;

        // Apply deltas
        const d = event.deltas;
        this.capital = Math.max(0, Math.min(100, this.capital + d.capital));
        this.honor = Math.max(0, Math.min(100, this.honor + d.honor));
        this.city = Math.max(0, Math.min(100, this.city + d.city));
        this.updateStatsUI();

        // Render delta badge
        let badgesHtml = '';
        if (d.capital !== 0) {
          badgesHtml += `<span class="preview-item ${d.capital > 0 ? 'pos' : 'neg'}">💰 ${d.capital > 0 ? '+' : ''}${d.capital} Капитал</span> `;
        }
        if (d.honor !== 0) {
          badgesHtml += `<span class="preview-item ${d.honor > 0 ? 'pos' : 'neg'}">📜 ${d.honor > 0 ? '+' : ''}${d.honor} Имя</span> `;
        }
        if (d.city !== 0) {
          badgesHtml += `<span class="preview-item ${d.city > 0 ? 'pos' : 'neg'}">🏛️ ${d.city > 0 ? '+' : ''}${d.city} Город</span>`;
        }
        if (d.capital === 0 && d.honor === 0 && d.city === 0) {
          badgesHtml = `<span class="preview-item neutral">⚖️ Без перемен на весах</span>`;
        }
        this.dom.diceDeltaBadge.innerHTML = badgesHtml;

        if (d.capital >= 15 || d.honor >= 15) {
          this.sound.playCoin();
        } else if (d.capital < 0 || d.honor < 0) {
          this.sound.playLoss();
        }

        // Mark dice as used
        this.diceUsed = true;
        this.dom.btnRollNow.hidden = true;
        this.dom.btnCloseDice.hidden = false;
        this.dom.btnCloseDice.focus();

        if (this.dom.btnRollDice) {
          this.dom.btnRollDice.disabled = true;
          this.dom.btnRollDice.innerHTML = `<span class="btn-icon">✓</span><span class="btn-dice-label">ЖРЕБIЙ БРОШЕНЪ</span>`;
          this.dom.btnRollDice.setAttribute('title', 'Жребий уже использован в этой партии');
        }
      }, 700);
    }

    closeDiceModal() {
      this.hideModal(this.dom.modalDice);
      this.inModal = false;

      // Check if dice roll caused bankruptcy
      const lossReason = this.checkBankruptcy();
      if (lossReason) {
        this.triggerLoss(lossReason);
      }
    }

    // ========================================================================
    // ПРОВЕРКА ПОРАЖЕНИЯ (МГНОВЕННОЕ БАНКРОТСТВО)
    // ========================================================================
    checkBankruptcy() {
      if (this.capital <= 0) return 'capital';
      if (this.honor <= 0) return 'honor';
      if (this.city <= 0) return 'city';
      return null;
    }

    triggerLoss(reason) {
      this.gameOver = true;
      this.inModal = true;
      this.sound.playLoss();

      this.dom.lossCapital.textContent = this.capital;
      this.dom.lossHonor.textContent = this.honor;
      this.dom.lossCity.textContent = this.city;

      if (reason === 'capital') {
        this.dom.gameOverTitle.textContent = "КАССОВЫЙ РАЗРЫВЪ!";
        this.dom.gameOverSub.textContent = "Крах финансовой устойчивости лавки";
        this.dom.gameOverDesc.textContent = "Лебовски так и не нашёл деньги. Слепой наивный идеализм и благотворительность без рентабельности опустошили кассу до нуля. Арендаторы выставили имущество на торги.";
        this.dom.gameOverLesson.textContent = "Указ № 809 & ОРГ: Бизнес обязан быть рентабелен и жизнеспособен! Созидание невозможно без финансовой грамотности и умения вести счет деньгам.";
      } else if (reason === 'honor') {
        this.dom.gameOverTitle.textContent = "ПОТЕРЯ КУПЕЧЕСКОЙ ЧЕСТИ!";
        this.dom.gameOverSub.textContent = "Моральный крах и изгнание из гильдии";
        this.dom.gameOverDesc.textContent = "У тебя полный кошелёк золота, но в городе с тобой больше никто не здоровается, мастера уволились, а покупатели ушли. В России бизнес без совести долго не живёт (Указ № 809 доказан!).";
        this.dom.gameOverLesson.textContent = "Указ № 809: Приоритет духовного над материальным — не абстракция, а непреложный закон долговечности предпринимательства.";
      } else if (reason === 'city') {
        this.dom.gameOverTitle.textContent = "ГОРОДЪ В УПАДКЕ!";
        this.dom.gameOverSub.textContent = "Разрушение среды и гибель платежеспособного спроса";
        this.dom.gameOverDesc.textContent = "Ты выжимал все соки из района, не вкладываясь в людей и общее благо. Покупатели разъехались, и твой бизнес рухнул вместе со средой вокруг.";
        this.dom.gameOverLesson.textContent = "Пентабазис (Общество и Страна): Дело процветает лишь тогда, когда процветает земля, на которой оно стоит.";
      }

      this.showModal(this.dom.modalGameOver);
    }

    // ========================================================================
    // ФИНАЛ: ПОБЕДА И ЖАЛОВАННАЯ ГРАМОТА
    // ========================================================================
    triggerVictory() {
      this.gameOver = true;
      this.inModal = true;
      this.sound.playVictory();

      this.dom.finalCapitalVal.textContent = this.capital;
      this.dom.finalHonorVal.textContent = this.honor;
      this.dom.finalCityVal.textContent = this.city;

      this.dom.finalCapitalStatus.textContent = this.capital >= 70 ? "Богатая казна" : (this.capital >= 40 ? "Устойчивая прибыль" : "На грани дефицита");
      this.dom.finalHonorStatus.textContent = this.honor >= 70 ? "Безупречная честь" : (this.honor >= 40 ? "Доброе имя" : "Сомнительная слава");
      this.dom.finalCityStatus.textContent = this.city >= 70 ? "Гордость губернии" : (this.city >= 40 ? "Польза обществу" : "Скудный вклад");

      // Определение купеческого звания
      if (this.capital >= 55 && this.honor >= 55 && this.city >= 55) {
        this.dom.diplomaRankTitle.textContent = "КУПЕЦЪ 1-Й ГИЛЬДИИ И МЕЦЕНАТЪ";
        this.dom.diplomaRankDesc.textContent = "Высший пилотаж созидательного бизнеса! Вы доказали, что традиционные духовно-нравственные ценности, трезвый купеческий расчёт и созидательный честный труд — главный секрет долговечного дела и процветания державы.";
      } else if (this.honor < 40 || this.city < 40) {
        this.dom.diplomaRankTitle.textContent = "СУЕТОЛОГЪ-ТЕМЩИКЪ";
        this.dom.diplomaRankDesc.textContent = "Вы чудом не прогорели, но репутация висит на волоске. Сиюминутная нажива обогатила карман, но в долгую темные схемы всегда ведут к краху и презрению земляков.";
      } else {
        this.dom.diplomaRankTitle.textContent = "ДОБРОТНЫЙ ЛАВОЧНИКЪ";
        this.dom.diplomaRankDesc.textContent = "Бизнес выжил и приносит стабильный доход, но есть куда расти в масштабе меценатства и служении обществу. Сделайте следующий шаг к 1-й гильдии!";
      }

      this.showModal(this.dom.modalVictory);
    }

    // ========================================================================
    // ВСПОМОГАТЕЛЬНЫЕ МЕТОДЫ МОДАЛОК И QR
    // ========================================================================
    showModal(modal) {
      if (modal) modal.removeAttribute('hidden');
    }

    hideModal(modal) {
      if (modal) modal.setAttribute('hidden', '');
    }

    openQrModal() {
      this.showModal(this.dom.modalQr);
      this.renderQrCode();
    }

    renderQrCode(customUrl) {
      if (!this.dom.qrCodeContainer) return;
      
      let targetUrl = customUrl;
      if (!targetUrl && this.dom.qrUrlInput) {
        targetUrl = this.dom.qrUrlInput.value.trim();
      }
      if (!targetUrl) {
        // If local, point to the real GitHub repository by default so phones scan & open it
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
          targetUrl = "https://github.com/s74001468-lab/Merchant-or-Speculator-";
        } else {
          targetUrl = window.location.href.split('#')[0];
        }
      }

      if (this.dom.qrUrlInput && !customUrl) {
        this.dom.qrUrlInput.value = targetUrl;
      }

      this.dom.qrCodeContainer.innerHTML = '';

      if (typeof QRCode !== 'undefined') {
        new QRCode(this.dom.qrCodeContainer, {
          text: targetUrl,
          width: 220,
          height: 220,
          colorDark: "#1C1917",
          colorLight: "#FFFFFF",
          correctLevel: QRCode.CorrectLevel.M
        });
      }
    }

    copyGameUrl() {
      const url = this.dom.qrUrlInput ? this.dom.qrUrlInput.value.trim() : window.location.href;
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(url).then(() => {
          this.dom.copyUrlLabel.textContent = "СКОПИРОВАНО! ✓";
          setTimeout(() => {
            this.dom.copyUrlLabel.textContent = "СКОПИРОВАТЬ";
          }, 2000);
        }).catch(() => {
          this.fallbackCopy(url);
        });
      } else {
        this.fallbackCopy(url);
      }
    }

    fallbackCopy(text) {
      const textArea = document.createElement("textarea");
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand('copy');
        this.dom.copyUrlLabel.textContent = "СКОПИРОВАНО! ✓";
        setTimeout(() => {
          this.dom.copyUrlLabel.textContent = "СКОПИРОВАТЬ";
        }, 2000);
      } catch (err) {
        console.warn('Copy failed', err);
      }
      document.body.removeChild(textArea);
    }
  }

  // Initialize on DOM Ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new MerchantGame());
  } else {
    new MerchantGame();
  }
})();
