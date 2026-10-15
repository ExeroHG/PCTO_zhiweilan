/* ==========================================================================
   WEB AUDIO API SINTETIZZATORE GENERATIVO ACTIVE THEORY STYLE - ZHIWEI LAN PORTFOLIO
   ========================================================================== */

class SoundEngine {
    constructor() {
        this.ctx = null;
        this.enabled = false;
        this.initialized = false;

        this.masterGain = null;
        this.ambientFilter = null;
        this.bassOsc = null;
        this.bassGain = null;
        this.arpTimer = null;

        // Scala Pentatonica Minore per Melodia Spaziale Active Theory (A Minor Pentatonic)
        this.scale = [220.00, 261.63, 293.66, 329.63, 392.00, 440.00, 523.25, 587.33, 659.25, 783.99];
        this.noteIndex = 0;
    }

    init() {
        if (!this.initialized) {
            const AudioCtx = window.AudioContext || window.webkitAudioContext;
            if (AudioCtx) {
                this.ctx = new AudioCtx();
                this.initialized = true;
            }
        }
        if (this.ctx && this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    }

    enable() {
        this.init();
        this.enabled = true;
        this.startGenerativeMusic();
    }

    disable() {
        this.enabled = false;
        this.stopGenerativeMusic();
    }

    toggle() {
        if (this.enabled) {
            this.disable();
        } else {
            this.enable();
            this.playHover();
        }
        return this.enabled;
    }

    /* ================= MUSICA AMBIENT MELODICA GENERATIVA ================= */
    startGenerativeMusic() {
        this.init();
        if (!this.ctx) return;

        try {
            if (this.ctx.state === 'suspended') {
                this.ctx.resume();
            }

            if (this.arpTimer) return;

            const now = this.ctx.currentTime;

            // Master Gain
            this.masterGain = this.ctx.createGain();
            this.masterGain.gain.setValueAtTime(0.01, now);
            this.masterGain.gain.linearRampToValueAtTime(0.22, now + 1.0);

            // Filtro Passa Basso
            this.ambientFilter = this.ctx.createBiquadFilter();
            this.ambientFilter.type = 'lowpass';
            this.ambientFilter.frequency.setValueAtTime(650, now);

            // Sub Bass Synth di Sfondo (Frequenza profonda a 55Hz - A1)
            this.bassOsc = this.ctx.createOscillator();
            this.bassGain = this.ctx.createGain();
            this.bassOsc.type = 'sine';
            this.bassOsc.frequency.setValueAtTime(55.00, now);

            this.bassGain.gain.setValueAtTime(0.12, now);
            this.bassOsc.connect(this.bassGain);
            this.bassGain.connect(this.ambientFilter);
            this.bassOsc.start(now);

            this.ambientFilter.connect(this.masterGain);
            this.masterGain.connect(this.ctx.destination);

            // Avvio Sequenziatore Arpeggio Generativo (Sequenza di note Active Theory)
            this.playNextArpNote();
            this.arpTimer = setInterval(() => {
                if (this.enabled) this.playNextArpNote();
            }, 550); // Nota ogni 0.55s per un arpeggio fluido ed etereo

        } catch (e) {
            console.warn('Errore avvio musica generativa:', e);
        }
    }

    playNextArpNote() {
        if (!this.ctx || !this.enabled || !this.ambientFilter) return;

        try {
            const now = this.ctx.currentTime;
            const osc = this.ctx.createOscillator();
            const noteGain = this.ctx.createGain();

            // Selezione nota con variazione melodia
            const freq = this.scale[this.noteIndex % this.scale.length];
            this.noteIndex += (Math.random() > 0.4 ? 1 : 2);

            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, now);

            // Inviluppo nota eterea con lungo riverbero
            noteGain.gain.setValueAtTime(0.001, now);
            noteGain.gain.linearRampToValueAtTime(0.035, now + 0.08);
            noteGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);

            osc.connect(noteGain);
            noteGain.connect(this.ambientFilter);

            osc.start(now);
            osc.stop(now + 1.25);
        } catch (e) {}
    }

    stopGenerativeMusic() {
        if (this.arpTimer) {
            clearInterval(this.arpTimer);
            this.arpTimer = null;
        }

        if (this.ctx && this.masterGain) {
            try {
                const now = this.ctx.currentTime;
                this.masterGain.gain.linearRampToValueAtTime(0.001, now + 0.4);
                setTimeout(() => {
                    if (this.bassOsc) {
                        try { this.bassOsc.stop(); } catch (e) {}
                    }
                }, 400);
            } catch (e) {}
        }
    }

    setModalMuffle(isMuffled) {
        if (!this.enabled || !this.ctx || !this.ambientFilter) return;
        try {
            const now = this.ctx.currentTime;
            this.ambientFilter.frequency.cancelScheduledValues(now);
            if (isMuffled) {
                this.ambientFilter.frequency.exponentialRampToValueAtTime(180, now + 0.3);
            } else {
                this.ambientFilter.frequency.exponentialRampToValueAtTime(650, now + 0.3);
            }
        } catch (e) {}
    }

    /* ================= EFFETTI SONORI SFX ================= */
    playHover() {
        if (!this.enabled || !this.ctx) return;
        try {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            const now = this.ctx.currentTime;

            osc.type = 'sine';
            osc.frequency.setValueAtTime(520, now);
            osc.frequency.exponentialRampToValueAtTime(980, now + 0.04);

            gain.gain.setValueAtTime(0.03, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

            osc.connect(gain);
            gain.connect(this.ctx.destination);

            osc.start(now);
            osc.stop(now + 0.04);
        } catch (e) {}
    }

    playClick() {
        if (!this.enabled || !this.ctx) return;
        try {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            const now = this.ctx.currentTime;

            osc.type = 'triangle';
            osc.frequency.setValueAtTime(280, now);
            osc.frequency.exponentialRampToValueAtTime(140, now + 0.08);

            gain.gain.setValueAtTime(0.05, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

            osc.connect(gain);
            gain.connect(this.ctx.destination);

            osc.start(now);
            osc.stop(now + 0.08);
        } catch (e) {}
    }

    playTransition() {
        if (!this.enabled || !this.ctx) return;
        try {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            const now = this.ctx.currentTime;

            osc.type = 'sine';
            osc.frequency.setValueAtTime(150, now);
            osc.frequency.exponentialRampToValueAtTime(300, now + 0.18);

            gain.gain.setValueAtTime(0.04, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

            osc.connect(gain);
            gain.connect(this.ctx.destination);

            osc.start(now);
            osc.stop(now + 0.18);
        } catch (e) {}
    }

    playModalOpen() {
        if (!this.enabled || !this.ctx) return;
        this.setModalMuffle(true);
        try {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            const now = this.ctx.currentTime;

            osc.type = 'sine';
            osc.frequency.setValueAtTime(300, now);
            osc.frequency.exponentialRampToValueAtTime(800, now + 0.12);

            gain.gain.setValueAtTime(0.04, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

            osc.connect(gain);
            gain.connect(this.ctx.destination);

            osc.start(now);
            osc.stop(now + 0.12);
        } catch (e) {}
    }

    playModalClose() {
        if (!this.enabled || !this.ctx) return;
        this.setModalMuffle(false);
        try {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            const now = this.ctx.currentTime;

            osc.type = 'sine';
            osc.frequency.setValueAtTime(800, now);
            osc.frequency.exponentialRampToValueAtTime(220, now + 0.12);

            gain.gain.setValueAtTime(0.04, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

            osc.connect(gain);
            gain.connect(this.ctx.destination);

            osc.start(now);
            osc.stop(now + 0.12);
        } catch (e) {}
    }
}

window.soundEngine = new SoundEngine();
