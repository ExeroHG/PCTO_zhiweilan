/* ==========================================================================
   INTERNAZIONALIZZAZIONE (i18n) ITALIANO / INGLESE - ZHIWEI LAN PORTFOLIO
   ========================================================================== */

const i18n = {
    it: {
        status: "STATUS: PCTO COMPLETED 2026 // SYSTEM ONLINE",
        eyebrow_home: "PCTO 2025/2026 // ITT ALLIEVI-SANGALLO, TERNI",
        hero_sub: "Web & Mobile Developer. Tre stage nel 2026: un sito web in Spagna e due app a Terni.",

        eyebrow_about: "01 // CHI SONO",
        statement: "Studente di Informatica. In tre stage ho imparato strumenti nuovi in pochi giorni e li ho messi subito in un progetto vero.",
        lead_about: "Frequento l'ITT Allievi-Sangallo di Terni. Prima SCSS e Hugo in Spagna, poi Flutter, BLoC e Supabase in Italia.",
        lang_it: "Italiano",
        lang_zh: "Cinese",
        lang_en: "Inglese",
        lang_es: "Spagnolo (base)",

        eyebrow_work: "02 // I MIEI STAGE",
        title_work: "Tre stage,<br>tre progetti",
        sub_work: "Passa il mouse su uno stage e guarda cosa succede alle particelle. Clicca per aprire la scheda.",
        stage1_grp: "SITO WEB ALL'ESTERO",
        stage1_desc: "Refactoring del sito di un'accademia di coding: da Bootstrap a SCSS.",
        stage1_loc: "A Coruña, Spagna",
        stage2_grp: "APP MOBILE E FRONTEND",
        stage2_desc: "App per liste e checklist, con architettura BLoC e temi personalizzabili.",
        stage2_loc: "Freeday15 SRL, Terni",
        stage3_grp: "APP MULTIPLAYER E BACKEND",
        stage3_desc: "App di quiz in tempo reale, da soli o in sfida. Ho costruito tutto il backend.",
        stage3_loc: "Authentica S.p.A., Terni",

        eyebrow_skills: "03 // COMPETENZE",
        sub_skills: "Clicca su una tecnologia per evidenziare dove è stata utilizzata nei tre progetti.",
        cat_mobile: "Mobile",
        cat_arch: "Architettura",
        cat_backend: "Backend",
        cat_web: "Web",
        cat_tools: "Strumenti",
        cat_languages: "Lingue",

        eyebrow_learn: "04 // COSA HO IMPARATO",
        title_learn: "Dai tre<br>stage",
        learn1_t: "Il codice va scritto per chi lo leggerà",
        learn1_d: "A Code Monsters ho visto quanto un HTML pulito renda facili le modifiche future.",
        learn2_t: "Una buona struttura fa risparmiare tempo",
        learn2_d: "Con BLoC e Repository, in List-Up! ogni parte dell'app ha un compito preciso.",
        learn3_t: "Il client non è affidabile",
        learn3_d: "In QuizShare i punteggi si calcolano nel database, così nessuno può barare.",
        learn4_t: "Si impara facendo, in squadra",
        learn4_d: "Branch, pull request e due lingue di lavoro mi hanno reso più autonomo.",

        eyebrow_end: "05 // DOMANDE",
        title_end: "Domande?",
        sub_end: "Posso spiegare più nel dettaglio uno stage, per esempio come sincronizzo il timer di QuizShare o perché ho tolto Bootstrap dall'HTML.",

        close_btn: "CHIUDI [X]",

        // Modale QuizShare
        m1_role: "Full-stack e mobile | Authentica S.p.A., Terni | 14-25 settembre 2026",
        m1_desc: "QuizShare è un'app di quiz multiplayer in tempo reale che si gioca da smartphone o browser. Ho curato l'interfaccia Flutter e ingegnerizzato l'intero backend serverless su Supabase e PostgreSQL.",
        m1_key_t: "Punti Chiave dello Sviluppo",
        m1_k1: "Backend Serverless & RLS: Disegno dello schema database PostgreSQL con regole di sicurezza Row Level Security per la protezione dati.",
        m1_k2: "Sincronizzazione Realtime (WebSocket): Compensazione dinamica del clock drift tra server e client per assicurare un timer di countdown perfettamente identico per tutti i giocatori.",
        m1_k3: "Calcolo Punteggio via RPC: Risposte e classifiche elaborate atomicamente nel database tramite Stored Procedures (RPC) per prevenire manomissioni lato client.",
        m1_k4: "Autenticazione Flessibile & RBAC: Login come ospite (UUID locale) o utente registrato con codice OTP via e-mail e gestione ruoli moderatore.",
        m1_arch_t: "Flusso Architetturale",
        m1_stat1: "Cifre PIN stanza",
        m1_stat2: "Timer risposta",
        m1_stat3: "Categorie Quiz",

        // Modale List-Up!
        m2_role: "Front-end mobile | Freeday15 SRL (Authentica Group), Terni | 3-20 giugno 2026",
        m2_desc: "List-Up! è un'applicazione mobile e web per la gestione avanzata di liste e checklist. Ho sviluppato l'architettura client-side in coppia con un collega backendista.",
        m2_key_t: "Punti Chiave dello Sviluppo",
        m2_k1: "BLoC & Clean Architecture: Separazione netta tra interfaccia, logica dello stato ed erogazione dati per un codice reattivo e modulare.",
        m2_k2: "Repository Pattern & Modalità Mock: Livello dati astratto con supporto a sorgente mock per testare l'intera app offline senza server.",
        m2_k3: "Dynamic Theme Engine (Material 3): Gestione personalizzata del tema che inietta palette di colori, font Google e Dark Mode in tempo reale.",
        m2_k4: "Stato Preservato (IndexedStack): Navigazione tra schermate senza re-rendering dell'interfaccia.",
        m2_stat1: "BLoC integrati",
        m2_stat2: "Repository Pattern",
        m2_stat3: "Sorgenti dati (Mock/DB)",

        // Modale Code Monsters
        m3_role: "Front-end web | A Coruña, Spagna | 8 gennaio - 6 febbraio 2026",
        m3_desc: "Code Monsters è un'accademia di programmazione e competenze digitali in Spagna. Nel mio primo stage PCTO all'estero, ho eseguito il refactoring completo del loro sito in Hugo e Bootstrap 5.",
        m3_key_t: "Punti Chiave dello Sviluppo",
        m3_k1: "Refactoring SCSS Modulare (BEM): Eliminazione delle classi utility Bootstrap dall'HTML sostituendole con classi personalizzate (cm-*).",
        m3_k2: "Separazione Struttura e Stile: Organizzazione degli stili in partials (_variables, _buttons, _grid) compilati da Hugo Pipes.",
        m3_k3: "Workflow Git & Pull Request: Lavoro in team bilingue (inglese/spagnolo) su branch separati con risoluzione dei merge conflicts.",
        m3_stat1: "Classi utility nell'HTML",
        m3_stat2: "Settimane refactoring",
        m3_stat3: "Lingue di lavoro"
    },
    en: {
        status: "STATUS: PCTO COMPLETED 2026 // SYSTEM ONLINE",
        eyebrow_home: "PCTO 2025/2026 // ITT ALLIEVI-SANGALLO, TERNI",
        hero_sub: "Web & Mobile Developer. Three internships in 2026: a website in Spain and two apps in Terni.",

        eyebrow_about: "01 // ABOUT ME",
        statement: "Computer Science student. Across three internships I learned new tools in a few days and applied them immediately in real projects.",
        lead_about: "Attending ITT Allievi-Sangallo in Terni. First SCSS and Hugo in Spain, then Flutter, BLoC, and Supabase in Italy.",
        lang_it: "Italian",
        lang_zh: "Chinese",
        lang_en: "English",
        lang_es: "Spanish (basic)",

        eyebrow_work: "02 // MY INTERNSHIPS",
        title_work: "Three internships,<br>three projects",
        sub_work: "Hover over an internship to watch particle reaction. Click to open details.",
        stage1_grp: "ABROAD WEBSITE",
        stage1_desc: "Refactoring a coding academy website: from Bootstrap to SCSS.",
        stage1_loc: "A Coruña, Spain",
        stage2_grp: "MOBILE & FRONTEND APP",
        stage2_desc: "List and checklist app with BLoC architecture and custom theme engine.",
        stage2_loc: "Freeday15 SRL, Terni",
        stage3_grp: "MULTIPLAYER & BACKEND APP",
        stage3_desc: "Real-time quiz app, solo or multiplayer. Built the entire backend from scratch.",
        stage3_loc: "Authentica S.p.A., Terni",

        eyebrow_skills: "03 // SKILLS & TECH",
        sub_skills: "Click on a technology to highlight where it was used across the projects.",
        cat_mobile: "Mobile",
        cat_arch: "Architecture",
        cat_backend: "Backend",
        cat_web: "Web",
        cat_tools: "Tools",
        cat_languages: "Languages",

        eyebrow_learn: "04 // WHAT I LEARNED",
        title_learn: "From three<br>internships",
        learn1_t: "Code must be written for those who read it",
        learn1_d: "At Code Monsters I saw how clean HTML makes future changes effortless.",
        learn2_t: "A good architecture saves time",
        learn2_d: "With BLoC and Repository, every part of List-Up! has a precise responsibility.",
        learn3_t: "The client is not trustworthy",
        learn3_d: "In QuizShare scores are calculated inside the database so no one can cheat.",
        learn4_t: "You learn by doing, in a team",
        learn4_d: "Branches, pull requests, and working in two languages made me independent.",

        eyebrow_end: "05 // QUESTIONS",
        title_end: "Questions?",
        sub_end: "I can explain any internship in more detail, such as clock drift sync in QuizShare or why I removed Bootstrap from HTML.",

        close_btn: "CLOSE [X]",

        // Modal QuizShare
        m1_role: "Full-stack & mobile | Authentica S.p.A., Terni | Sept 14-25, 2026",
        m1_desc: "QuizShare is a real-time multiplayer quiz app playable on mobile or web browsers. I created the Flutter interface and engineered the entire serverless backend on Supabase and PostgreSQL.",
        m1_key_t: "Key Development Highlights",
        m1_k1: "Serverless Backend & RLS: Designed PostgreSQL schema with Row Level Security rules for data protection.",
        m1_k2: "Realtime Sync (WebSocket): Dynamic clock drift compensation between server and clients to ensure identical countdown timers.",
        m1_k3: "RPC Score Calculation: Answers and leaderboards computed atomically in the database via RPC Stored Procedures to prevent client-side tampering.",
        m1_k4: "Flexible Auth & RBAC: Guest login (local UUID) or registered user with email OTP code and moderator role management.",
        m1_arch_t: "Architectural Flow",
        m1_stat1: "Room PIN digits",
        m1_stat2: "Response timer",
        m1_stat3: "Quiz Categories",

        // Modal List-Up!
        m2_role: "Front-end mobile | Freeday15 SRL (Authentica Group), Terni | June 3-20, 2026",
        m2_desc: "List-Up! is a cross-platform mobile and web application for advanced list and checklist management. I developed client-side architecture alongside a backend engineer.",
        m2_key_t: "Key Development Highlights",
        m2_k1: "BLoC & Clean Architecture: Clear separation between UI, state logic, and data layer for reactive and modular code.",
        m2_k2: "Repository Pattern & Mock Mode: Abstracted data layer with mock source support for testing the app offline without a server.",
        m2_k3: "Dynamic Theme Engine (Material 3): Custom theme manager injecting real-time color palettes, Google fonts, and Dark Mode.",
        m2_k4: "Preserved State (IndexedStack): Screen navigation without UI re-rendering.",
        m2_stat1: "BLoC modules",
        m2_stat2: "Repository Patterns",
        m2_stat3: "Data sources (Mock/DB)",

        // Modal Code Monsters
        m3_role: "Front-end web | A Coruña, Spain | Jan 8 - Feb 6, 2026",
        m3_desc: "Code Monsters is a programming and digital skills academy in Spain. In my first overseas internship, I performed a complete site refactoring in Hugo and Bootstrap 5.",
        m3_key_t: "Key Development Highlights",
        m3_k1: "Modular SCSS Refactoring (BEM): Replaced Bootstrap utility classes in HTML with custom SCSS classes (cm-*).",
        m3_k2: "Structure & Style Separation: Organized styles into partials (_variables, _buttons, _grid) compiled via Hugo Pipes.",
        m3_k3: "Git Workflow & Pull Requests: Worked in a bilingual team (English/Spanish) on feature branches with merge conflict resolution.",
        m3_stat1: "Utility classes in HTML",
        m3_stat2: "Refactoring weeks",
        m3_stat3: "Working languages"
    }
};

class LanguageManager {
    constructor() {
        this.currentLang = localStorage.getItem('site_lang') || 'it';
    }

    init() {
        this.applyLanguage(this.currentLang);

        const langBtn = document.getElementById('langToggle');
        if (langBtn) {
            langBtn.addEventListener('click', () => {
                const nextLang = this.currentLang === 'it' ? 'en' : 'it';
                this.setLanguage(nextLang);
                if (window.soundEngine) window.soundEngine.playClick();
            });
        }
    }

    setLanguage(lang) {
        if (!i18n[lang]) return;
        this.currentLang = lang;
        localStorage.setItem('site_lang', lang);
        this.applyLanguage(lang);
    }

    applyLanguage(lang) {
        const dict = i18n[lang];
        if (!dict) return;

        // Aggiorna etichetta pulsante
        const langBtn = document.getElementById('langToggle');
        if (langBtn) {
            langBtn.textContent = `LANG [${lang.toUpperCase()}]`;
        }

        // Traduci tutti gli elementi con data-i18n
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.dataset.i18n;
            if (dict[key]) {
                if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                    el.placeholder = dict[key];
                } else {
                    el.innerHTML = dict[key];
                }
            }
        });
    }
}

window.langManager = new LanguageManager();
document.addEventListener('DOMContentLoaded', () => window.langManager.init());
