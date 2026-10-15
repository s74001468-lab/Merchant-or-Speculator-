/**
 * КУПЕЧЕСКОЕ СЛОВО: Построй дело на века
 * Бизнес-игра по курсу «Основы российской государственности» (Указ № 809 & Пентабазис)
 * Авторы: Котухов Сергей, Сиволод Дмитрий, Ветер Михаил
 */

(() => {
  'use strict';

  // ==========================================================================
  // 1. БАЗА ДАННЫХ: 8 КАРТОЧЕК-ДИЛЕММ
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
      title: "Сырьевой соблазнъ: Маргаринъ или Масло?",
      narrative: "Поставщик поднял цены на фермерское сливочное масло на 40%. Знакомый «темщик» шепчет: «Брат, бери технический маргарин, с ванилином под пиво никто не отличит, маржа икс-три!».",
      choiceA: {
        text: "«Закупаем маргарин! Где деньги, Лебовски?!»",
        deltas: { capital: 20, honor: -25, city: -15 },
        feedback: "Живот скрутило у половины студгородка. По району поползли нехорошие слухи.",
        doctrineNote: "Указ № 809: Фальсификация ради минутной наживы разрушает доверие и губит репутацию."
      },
      choiceB: {
        text: "«Договориться с соседями-пекарями о совместной оптовой закупке настоящего масла»",
        deltas: { capital: -5, honor: 15, city: 15 },
        feedback: "Как говорил Стэтхэм: «Лучше меньше маржи в кармане, чем маргарин на совести». Клиенты в восторге!",
        doctrineNote: "Указ № 809: Созидательный честный труд и партнерство — залог устойчивого долголетия дела."
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
      title: "Кадровый вопросъ: Роддомъ или Часъ Пикъ?",
      narrative: "Твой лучший пекарь просит отпустить его пораньше и выдать аванс — у него родился ребенок, нужно встретить жену из роддома. Но сегодня пятница и час пик!",
      choiceA: {
        text: "«Бизнес есть бизнес! Выйдет на смену как миленький, иначе штраф»",
        deltas: { capital: 15, honor: -20, city: -15 },
        feedback: "Пекарь выгорел и ищет новую работу, а бариста смотрит на тебя как на людоеда.",
        doctrineNote: "Указ № 809: Отношение к сотрудникам как к винтикам разрушает мотивацию и сеет вражду."
      },
      choiceB: {
        text: "«Выписать премию на коляску, подарить корзину выпечки и самому встать за кассу на вечер!»",
        deltas: { capital: -10, honor: 20, city: 20 },
        feedback: "Пекарь готов работать с тобой всю жизнь, а история про доброго шефа разлетелась по местным пабликам!",
        doctrineNote: "Указ № 809: Крепкая семья, милосердие и уважение к отцовству создают преданный коллектив."
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
      title: "Налоги и конверты: Серая схемка или Грантъ?",
      narrative: "Знакомый бухгалтер предлагает «мутную схемку»: дробить ИП, не бить чеки после 18:00 и платить зарплату в конвертах. Экономия — 150 тысяч в месяц!",
      choiceA: {
        text: "«Работаем в серую! Налоги — для слабаков»",
        deltas: { capital: 25, honor: -20, city: -25 },
        feedback: "В кассе густо, но при каждом звонке с незнакомого номера у тебя дергается глаз.",
        doctrineNote: "Указ № 809: Теневая экономика крадет будущее у города, лишая детей школ и больниц."
      },
      choiceB: {
        text: "«Платим в белую и подаем заявку на региональный грант для молодых предпринимателей»",
        deltas: { capital: 10, honor: 15, city: 20 },
        feedback: "Государство одобрило грант в 500 000 ₽ на новую подовую печь! Спать с чистой совестью — бесценно.",
        doctrineNote: "Указ № 809: Законность и честность открывают доступ к институтам развития государства."
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
      title: "Кризисъ у соседа: Добивать или Выручать?",
      narrative: "У соседней семейной кофейни прорвало трубу и сгорела кофемашина прямо перед выходными. Ты можешь переманить всех их клиентов грязной рекламой или одолжить им свою запасную рожковую машину.",
      choiceA: {
        text: "«Запустить таргет: „Соседи закрылись — идите к нам!“ Добивай конкурента!»",
        deltas: { capital: 20, honor: -25, city: -10 },
        feedback: "В предпринимательском чате города тебя окрестили «крысой 1-й гильдии».",
        doctrineNote: "Указ № 809: Агрессивный эгоизм и каннибализм отравляют дух солидарности в обществе."
      },
      choiceB: {
        text: "«Одолжить аппарат и запустить совместную акцию „Выручаем соседей“»",
        deltas: { capital: 5, honor: 20, city: 20 },
        feedback: "Купеческое братство в деле! Соседи в знак благодарности поделились контактами лучших поставщиков кофе.",
        doctrineNote: "Указ № 809: Коллективизм и соборность веками делали русское купечество непобедимым."
      }
    },
    {
      id: 5,
      docCode: "ВЕКСЕЛЬ № 1882-05",
      cityStamp: "КАЗАНЬ",
      pentabasis: "ДУХОВНОСТЬ И КУЛЬТУРА",
      decree: "ПРИОРИТЕТ ДУХОВНОГО НАД МАТЕРИАЛЬНЫМ",
      avatar: "🎪",
      charRole: "ТРЕШЪ-БЛОГЕРЪ",
      charName: "Трешъ-скоморохъ Владъ & срамный хайпъ",
      title: "Реклама и блогеры: Трешъ-хайпъ или Семьи?",
      narrative: "Скандальный треш-блогер предлагает прорекламировать твою пекарню через пошлый пранк прямо в торговом зале. Охваты будут бешеные!",
      choiceA: {
        text: "«Хайп не пахнет! Снимаем треш-рилс!»",
        deltas: { capital: 15, honor: -30, city: -15 },
        feedback: "Школьники посмеялись, но постоянные семейные покупатели обходят твою вывеску стороной.",
        doctrineNote: "Указ № 809: Распространение деструктивного контента уничтожает культурный авторитет дела."
      },
      choiceB: {
        text: "«Отказать треш-блогеру и устроить бесплатный воскресный мастер-класс по выпечке для детей с родителями»",
        deltas: { capital: 10, honor: 20, city: 15 },
        feedback: "Полный зал счастливых семей! Родители скупают круассаны и калачи коробками.",
        doctrineNote: "Указ № 809: Просвещение, семейный досуг и созидательная культура рождают преданность на года."
      }
    },
    {
      id: 6,
      docCode: "ВЕКСЕЛЬ № 1882-06",
      cityStamp: "ЕКАТЕРИНБУРГЪ",
      pentabasis: "СТРАНА И ИДЕНТИЧНОСТЬ",
      decree: "ПАТРИОТИЗМ И ЕДИНСТВО НАРОДОВ",
      avatar: "🍩",
      charRole: "ИНОЗЕМНЫЙ АГЕНТЪ ФРАНШИЗЫ",
      charName: "Иноземный конгломератъ «Lucky Donut VIP»",
      title: "Импортозамещение: Чужой франчайзингъ или Свой калачъ?",
      narrative: "Иностранная франшиза предлагает тебе сменить вывеску на шаблонный английский бренд и продавать замороженные импортные донаты. Или создать свое меню по старинным кубанским и русским рецептам из местных продуктов?",
      choiceA: {
        text: "«Вешаем вывеску „Lucky Donut VIP“ и размораживаем химозные пончики»",
        deltas: { capital: 10, honor: -15, city: -20 },
        feedback: "Очередной безликий ларёк с синтетическим тестом, закрывшийся через три месяца.",
        doctrineNote: "Указ № 809: Забвение национального культурного кода превращает бизнес в пустую декорацию."
      },
      choiceB: {
        text: "«Запускаем линейку „Сделано в России“: калачи по купеческим рецептам, сбитень и локальные ягоды»",
        deltas: { capital: 20, honor: 15, city: 20 },
        feedback: "Туристы и горожане выстраиваются в очередь за настоящим аутентичным вкусом русской выпечки!",
        doctrineNote: "Указ № 809: Опора на традиции и отечественные богатства — неиссякаемый источник силы."
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
      title: "Городская среда: Моя хата съ краю или Скверъ?",
      narrative: "Во дворе рядом с твоей пекарней разбитая детская площадка и темно по вечерам. Местные жители собирают средства на ремонт и освещение.",
      choiceA: {
        text: "«Моя хата с краю, я вам не ЖКХ!»",
        deltas: { capital: 5, honor: -15, city: -25 },
        feedback: "Вечером мимо тёмного двора к тебе просто боятся ходить покупатели. Выручка лавки стремительно падает.",
        doctrineNote: "Указ № 809: Равнодушие к среде обитания бумерангом бьёт по благополучию предпринимателя."
      },
      choiceB: {
        text: "«По традициям Третьякова и Морозова: оплатить фонари, поставить лавочки и сделать уютную веранду»",
        deltas: { capital: -10, honor: 25, city: 25 },
        feedback: "Весь район теперь гуляет в благоустроенном сквере, а вечерняя выручка пекарни выросла вдвое!",
        doctrineNote: "Указ № 809: Традиция русского меценатства: преображая город вокруг, купец возвышает и своё дело."
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
      title: "Будущее дѣла: Продать подъ алкомаркетъ или Торговый Домъ?",
      narrative: "Крупный сетевой перекуп предлагает выкупить твой бизнес, чтобы закрыть пекарню и открыть на этом месте алкомаркет и вейп-шоп. Деньги предлагает хорошие, сразу на руки.",
      choiceA: {
        text: "«Продаем под алкомаркет и улетаем чиллить!»",
        deltas: { capital: 30, honor: -40, city: -35 },
        feedback: "Деньги быстро разлетелись, а на месте любимой пекарни теперь шумят и дебоширят под окнами.",
        doctrineNote: "Указ № 809: Продажа дела под спаивание людей — предательство созидания ради лёгких денег."
      },
      choiceB: {
        text: "«Отказать! Расширить дело с семьей и основать „Торговый Домъ“, который не стыдно передать детям»",
        deltas: { capital: 20, honor: 25, city: 25 },
        feedback: "Твоя фамилия на купеческой вывеске стала символом высшего знака качества в городе!",
        doctrineNote: "Указ № 809: Преемственность поколений и созидание династии — венец купеческого служения."
      }
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
  // 3. QR-КОД ГЕНЕРАТОР: ИСПОЛЬЗУЕТСЯ СТАНДАРТНЫЙ QRCODE.MIN.JS
  // ==========================================================================

  // ==========================================================================
  // 4. ДВИЖОК ИГРЫ: СОСТОЯНИЕ И ЛОГИКА
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

        // Card Content
        charAvatar: document.getElementById('charAvatar'),
        charRole: document.getElementById('charRole'),
        charName: document.getElementById('charName'),
        dilemmaTitle: document.getElementById('dilemmaTitle'),
        dilemmaText: document.getElementById('dilemmaText'),
        choiceAText: document.getElementById('choiceAText'),
        choiceBText: document.getElementById('choiceBText'),
        choiceAPreview: document.getElementById('choiceAPreview'),
        choiceBPreview: document.getElementById('choiceBPreview'),
        btnChoiceA: document.getElementById('btnChoiceA'),
        btnChoiceB: document.getElementById('btnChoiceB'),

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

      // Close all modals
      this.hideModal(this.dom.modalFeedback);
      this.hideModal(this.dom.modalGameOver);
      this.hideModal(this.dom.modalVictory);
      this.hideModal(this.dom.modalQr);
      this.hideModal(this.dom.modalAbout);

      this.updateStatsUI();
      this.renderCurrentScenario();
      this.clearHoverPreview();
    }

    bindEvents() {
      // Choice Buttons
      this.dom.btnChoiceA.addEventListener('click', () => this.makeChoice('A'));
      this.dom.btnChoiceB.addEventListener('click', () => this.makeChoice('B'));

      // Hover Previews
      this.dom.btnChoiceA.addEventListener('mouseenter', () => this.previewChoiceDeltas('A'));
      this.dom.btnChoiceA.addEventListener('mouseleave', () => this.clearHoverPreview());
      this.dom.btnChoiceA.addEventListener('focus', () => this.previewChoiceDeltas('A'));
      this.dom.btnChoiceA.addEventListener('blur', () => this.clearHoverPreview());

      this.dom.btnChoiceB.addEventListener('mouseenter', () => this.previewChoiceDeltas('B'));
      this.dom.btnChoiceB.addEventListener('mouseleave', () => this.clearHoverPreview());
      this.dom.btnChoiceB.addEventListener('focus', () => this.previewChoiceDeltas('B'));
      this.dom.btnChoiceB.addEventListener('blur', () => this.clearHoverPreview());

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
      // Don't trigger if typing in an input
      if (['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) return;

      // Close open informational modals on Escape
      if (e.key === 'Escape') {
        if (!this.dom.modalQr.hidden) this.hideModal(this.dom.modalQr);
        if (!this.dom.modalAbout.hidden) this.hideModal(this.dom.modalAbout);
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

      // If game is over or modals are open, block game choices
      if (this.gameOver || !this.dom.modalGameOver.hidden || !this.dom.modalVictory.hidden) {
        return;
      }

      if (e.key === '1' || e.key === 'ArrowLeft') {
        e.preventDefault();
        this.makeChoice('A');
      } else if (e.key === '2' || e.key === 'ArrowRight') {
        e.preventDefault();
        this.makeChoice('B');
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

      this.dom.charAvatar.textContent = card.avatar;
      this.dom.charRole.textContent = card.charRole;
      this.dom.charName.textContent = card.charName;

      this.dom.dilemmaTitle.textContent = card.title;
      this.dom.dilemmaText.textContent = card.narrative;

      // Choice A
      this.dom.choiceAText.textContent = card.choiceA.text;
      this.renderChoicePreviewBadges(this.dom.choiceAPreview, card.choiceA.deltas);

      // Choice B
      this.dom.choiceBText.textContent = card.choiceB.text;
      this.renderChoicePreviewBadges(this.dom.choiceBPreview, card.choiceB.deltas);
    }

    renderChoicePreviewBadges(container, deltas) {
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
      const deltas = choiceLetter === 'A' ? card.choiceA.deltas : card.choiceB.deltas;

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
      const choice = choiceLetter === 'A' ? card.choiceA : card.choiceB;

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
    // ПРОВЕРКА ПОРАЖЕНИЯ (МГНОВЕННЫЙ БАНКРОТСТВО)
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
        this.dom.gameOverDesc.textContent = "Лебовски так и не нашёл деньги. Добрые намерения без финансовой грамотности привели к закрытию лавки.";
        this.dom.gameOverLesson.textContent = "Указ № 809 & ОРГ: Бизнес должен быть рентабелен и жизнеспособен, иначе все созидательные замыслы останутся несбыточными мечтами.";
      } else if (reason === 'honor') {
        this.dom.gameOverTitle.textContent = "ПОТЕРЯ КУПЕЧЕСКОЙ ЧЕСТИ!";
        this.dom.gameOverSub.textContent = "Моральный крах и изгнание из гильдии";
        this.dom.gameOverDesc.textContent = "У тебя полный кошелёк, но в городе с тобой больше никто не здоровается, сотрудники уволились, а клиенты ушли. В России бизнес без совести долго не живёт (Указ № 809 доказан!).";
        this.dom.gameOverLesson.textContent = "Указ № 809: Приоритет духовного над материальным — не абстракция, а закон долговечности предпринимательства.";
      } else if (reason === 'city') {
        this.dom.gameOverTitle.textContent = "ГОРОДЪ В УПАДКЕ!";
        this.dom.gameOverSub.textContent = "Разрушение среды и гибель спроса";
        this.dom.gameOverDesc.textContent = "Ты выжимал все соки из района, не вкладываясь в людей. Покупатели разъехались, и твой бизнес рухнул вместе со средой вокруг.";
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
      if (this.capital >= 60 && this.honor >= 60 && this.city >= 60) {
        this.dom.diplomaRankTitle.textContent = "КУПЕЦЪ 1-Й ГИЛЬДИИ И МЕЦЕНАТЪ";
        this.dom.diplomaRankDesc.textContent = "Высший пилотаж! Вы доказали, что традиционные духовно-нравственные ценности и созидательный честный труд — главный секрет устойчивой прибыли и процветания державы.";
      } else if (this.honor < 35 || this.city < 35) {
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
      modal.removeAttribute('hidden');
    }

    hideModal(modal) {
      modal.setAttribute('hidden', '');
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
