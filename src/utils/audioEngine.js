/**
 * Audio Engine for "A UNIVERSE CALLED US"
 * Built with Web Audio API synthesizer for zero-dependency romantic ambient
 * soundtracks, soothing lo-fi chords, Taylor Swift "Paper Rings" melodies, and interactive sound effects.
 */

class AudioEngine {
  constructor() {
    this.ctx = null;
    this.isPlayingAmbient = false;
    this.ambientInterval = null;
    this.isMuted = false;
    this.masterGain = null;
    this.currentMode = 'ambient'; // 'ambient' or 'paper-rings'
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.setValueAtTime(1.0, this.ctx.currentTime);
        this.masterGain.connect(this.ctx.destination);
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : 1.0, this.ctx.currentTime);
    }
    return this.isMuted;
  }

  // Play a soft romantic tone
  playTone(freq, duration = 1.2, type = 'sine', gainVal = 0.15) {
    if (!this.ctx || this.isMuted) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1400, this.ctx.currentTime);

      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      gain.gain.setValueAtTime(0.001, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(gainVal, this.ctx.currentTime + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch {
      // Audio context might be restricted before interaction
    }
  }

  // Play sweet interactive sound effects
  playChime() {
    this.init();
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    notes.forEach((f, i) => {
      setTimeout(() => this.playTone(f, 0.8, 'sine', 0.1), i * 75);
    });
  }

  playHeartClick() {
    this.init();
    this.playTone(440, 0.5, 'sine', 0.12);
    setTimeout(() => this.playTone(659.25, 0.7, 'sine', 0.15), 60);
  }

  playMatchSound() {
    this.init();
    const chord = [392.00, 493.88, 587.33, 783.99, 987.77];
    chord.forEach((f, idx) => {
      setTimeout(() => this.playTone(f, 1.8, 'triangle', 0.12), idx * 90);
    });
  }

  playEnvelopeOpen() {
    this.init();
    this.playTone(280, 0.3, 'sine', 0.08);
    setTimeout(() => this.playTone(560, 0.4, 'sine', 0.09), 80);
    setTimeout(() => this.playTone(840, 0.6, 'sine', 0.1), 160);
  }

  playConstellationChime() {
    this.init();
    const starNotes = [659.25, 783.99, 880, 1046.50, 1318.51];
    starNotes.forEach((f, idx) => {
      setTimeout(() => this.playTone(f, 1.4, 'sine', 0.08), idx * 110);
    });
  }

  playHeartbeat(intensity = 1.0) {
    this.init();
    if (!this.ctx || this.isMuted) return;
    try {
      const vol = Math.min(1.0, Math.max(0.1, intensity));
      const now = this.ctx.currentTime;

      // 1. "LUB" (First thump: deep resonant bass punch)
      const osc1 = this.ctx.createOscillator();
      const gain1 = this.ctx.createGain();
      const filter1 = this.ctx.createBiquadFilter();

      filter1.type = 'lowpass';
      filter1.frequency.setValueAtTime(220, now);

      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(78, now);
      osc1.frequency.exponentialRampToValueAtTime(40, now + 0.22);

      gain1.gain.setValueAtTime(0.001, now);
      gain1.gain.linearRampToValueAtTime(vol, now + 0.025);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

      osc1.connect(filter1);
      filter1.connect(gain1);
      gain1.connect(this.masterGain);

      osc1.start(now);
      osc1.stop(now + 0.26);

      // 2. "DUB" (Second thump: slightly higher pitch, quick echo pulse)
      setTimeout(() => {
        if (!this.ctx || this.isMuted) return;
        const now2 = this.ctx.currentTime;
        const osc2 = this.ctx.createOscillator();
        const gain2 = this.ctx.createGain();
        const filter2 = this.ctx.createBiquadFilter();

        filter2.type = 'lowpass';
        filter2.frequency.setValueAtTime(240, now2);

        osc2.type = 'sine';
        osc2.frequency.setValueAtTime(88, now2);
        osc2.frequency.exponentialRampToValueAtTime(46, now2 + 0.25);

        gain2.gain.setValueAtTime(0.001, now2);
        gain2.gain.linearRampToValueAtTime(vol * 0.95, now2 + 0.025);
        gain2.gain.exponentialRampToValueAtTime(0.001, now2 + 0.28);

        osc2.connect(filter2);
        filter2.connect(gain2);
        gain2.connect(this.masterGain);

        osc2.start(now2);
        osc2.stop(now2 + 0.29);
      }, 140);
    } catch {
      // Audio context might be restricted
    }
  }

  playCassetteClick() {
    this.init();
    this.playTone(180, 0.15, 'square', 0.06);
    setTimeout(() => this.playTone(220, 0.2, 'square', 0.05), 100);
  }

  playDoorOpen() {
    this.init();
    const chord = [220, 277.18, 329.63, 440, 554.37];
    chord.forEach((f, i) => {
      setTimeout(() => this.playTone(f, 2.5, 'sine', 0.08), i * 60);
    });
  }

  playProposalSwell() {
    this.init();
    const deepChord = [130.81, 196.00, 261.63, 329.63, 392.00, 523.25];
    chord: deepChord.forEach((f, i) => {
      setTimeout(() => this.playTone(f, 3.5, 'triangle', 0.1), i * 120);
    });
  }

  // Taylor Swift — Paper Rings Upbeat Pop Chorus Synthesizer Hook
  playPaperRingsHook() {
    this.init();
    // Bouncy G -> D -> Em -> C progression with the vocal hook rhythm:
    // "I like shiny things, but I'd marry you with paper rings, uh-huh, that's right!"
    const hookNotes = [
      { f: 392.00, d: 0.22, delay: 0 },    // G4 ("I")
      { f: 440.00, d: 0.22, delay: 180 },  // A4 ("like")
      { f: 493.88, d: 0.25, delay: 360 },  // B4 ("shi-")
      { f: 392.00, d: 0.25, delay: 540 },  // G4 ("ny")
      { f: 329.63, d: 0.35, delay: 720 },  // E4 ("things")
      { f: 392.00, d: 0.22, delay: 1080 }, // G4 ("but")
      { f: 440.00, d: 0.22, delay: 1260 }, // A4 ("I'd")
      { f: 493.88, d: 0.22, delay: 1440 }, // B4 ("mar-")
      { f: 493.88, d: 0.22, delay: 1620 }, // B4 ("ry")
      { f: 440.00, d: 0.22, delay: 1800 }, // A4 ("you")
      { f: 392.00, d: 0.25, delay: 1980 }, // G4 ("with")
      { f: 493.88, d: 0.30, delay: 2160 }, // B4 ("pa-")
      { f: 440.00, d: 0.30, delay: 2360 }, // A4 ("per")
      { f: 392.00, d: 0.50, delay: 2560 }, // G4 ("rings!")
      { f: 493.88, d: 0.18, delay: 2950 }, // B4 ("uh-")
      { f: 587.33, d: 0.35, delay: 3130 }, // D5 ("huh,")
      { f: 493.88, d: 0.20, delay: 3400 }, // B4 ("that's")
      { f: 392.00, d: 0.45, delay: 3600 }, // G4 ("right!")
    ];

    hookNotes.forEach((n) => {
      setTimeout(() => {
        this.playTone(n.f, n.d, 'triangle', 0.12);
        // Add subtle octave bass punch
        this.playTone(n.f / 2, n.d, 'sine', 0.08);
      }, n.delay);
    });
  }

  // Listeners for global UI sync
  listeners = new Set();

  subscribe(listener) {
    this.listeners.add(listener);
    // Send immediate initial state
    try {
      listener(this.getPlaybackState());
    } catch {}
    return () => this.listeners.delete(listener);
  }

  notifyListeners() {
    const state = this.getPlaybackState();
    this.listeners.forEach((fn) => {
      try {
        fn(state);
      } catch {}
    });
  }

  getPlaybackState() {
    return {
      isPlaying: Boolean(this.isPlayingPaperRings),
      currentTime: this.paperRingsAudio ? this.paperRingsAudio.currentTime : 0,
      duration: this.paperRingsAudio && !isNaN(this.paperRingsAudio.duration) && this.paperRingsAudio.duration > 0 ? this.paperRingsAudio.duration : 223.4,
      volume: this.paperRingsAudio ? this.paperRingsAudio.volume : 0.9,
      isMuted: Boolean(this.isMuted)
    };
  }

  // Taylor Swift — Paper Rings Full Audio Track (Real MP3 + Synth fallback)
  getPaperRingsAudio() {
    if (!this.paperRingsAudio) {
      this.paperRingsAudio = new Audio('/assets/paper_rings.mp3');
      this.paperRingsAudio.loop = true;
      this.paperRingsAudio.preload = 'auto';
      this.paperRingsAudio.volume = this.isMuted ? 0 : 0.9;

      this.paperRingsAudio.addEventListener('timeupdate', () => this.notifyListeners());
      this.paperRingsAudio.addEventListener('play', () => {
        this.isPlayingPaperRings = true;
        this.notifyListeners();
      });
      this.paperRingsAudio.addEventListener('pause', () => {
        this.isPlayingPaperRings = false;
        this.notifyListeners();
      });
      this.paperRingsAudio.addEventListener('ended', () => {
        this.isPlayingPaperRings = false;
        this.notifyListeners();
      });
    }
    return this.paperRingsAudio;
  }

  playPaperRingsTrack() {
    this.init();
    const audio = this.getPaperRingsAudio();
    audio.volume = this.isMuted ? 0 : 0.9;
    
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          this.isPlayingPaperRings = true;
          this.notifyListeners();
        })
        .catch(() => {
          this.isPlayingPaperRings = true;
          this.startPaperRingsSynth();
          this.notifyListeners();
        });
    }
    this.isPlayingPaperRings = true;
    this.notifyListeners();
  }

  startPaperRingsSynth() {
    if (this.paperRingsInterval) return;
    const paperRingsPattern = [
      { bass: 196.00, chord: [392.00, 493.88], melody: 392.00 },
      { bass: 196.00, chord: [392.00, 493.88], melody: 440.00 },
      { bass: 164.81, chord: [329.63, 392.00], melody: 493.88 },
      { bass: 164.81, chord: [329.63, 392.00], melody: 392.00 },
      { bass: 130.81, chord: [261.63, 329.63], melody: 440.00 },
      { bass: 130.81, chord: [261.63, 329.63], melody: 392.00 },
      { bass: 146.83, chord: [293.66, 369.99], melody: 493.88 },
      { bass: 146.83, chord: [293.66, 369.99], melody: 587.33 }
    ];

    let step = 0;
    const tick = () => {
      if (!this.isPlayingPaperRings) return;
      const bar = paperRingsPattern[step % paperRingsPattern.length];
      this.playTone(bar.bass, 0.35, 'triangle', 0.12);
      bar.chord.forEach((f) => this.playTone(f, 0.22, 'sine', 0.05));
      if (bar.melody) this.playTone(bar.melody, 0.28, 'triangle', 0.09);
      step++;
    };
    tick();
    this.paperRingsInterval = setInterval(tick, 450);
  }

  stopPaperRingsTrack() {
    this.isPlayingPaperRings = false;
    if (this.paperRingsAudio) {
      this.paperRingsAudio.pause();
    }
    if (this.paperRingsInterval) {
      clearInterval(this.paperRingsInterval);
      this.paperRingsInterval = null;
    }
    this.notifyListeners();
  }

  togglePaperRingsTrack() {
    if (this.isPlayingPaperRings) {
      this.stopPaperRingsTrack();
      return false;
    } else {
      this.playPaperRingsTrack();
      return true;
    }
  }

  seekPaperRings(seconds) {
    if (this.paperRingsAudio) {
      this.paperRingsAudio.currentTime = Math.max(0, Math.min(seconds, this.paperRingsAudio.duration || 223.4));
      this.notifyListeners();
    }
  }

  // Primary Universe Soundtrack: Taylor Swift — Paper Rings
  startAmbientMusic() {
    this.playPaperRingsTrack();
    return true;
  }

  stopAmbientMusic() {
    this.stopPaperRingsTrack();
    return false;
  }

  toggleAmbientMusic() {
    return this.togglePaperRingsTrack();
  }
}

export const sound = new AudioEngine();

