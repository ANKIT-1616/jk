/**
 * Web Audio API synthesizer for tactile romantic micro-interactions:
 * - Dot connect chime
 * - Envelope opening paper rustle / seal pop
 * - Music box notes for "Can't Help Falling in Love"
 */

class RomanticAudio {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private musicBoxInterval: number | null = null;
  private isMusicBoxPlaying: boolean = false;

  private initContext() {
    if (!this.ctx && typeof window !== "undefined") {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (muted && this.isMusicBoxPlaying) {
      this.stopMusicBox();
    }
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  /**
   * Delicate glass/celesta chime when a dot is connected
   */
  public playDotChime(index: number = 0) {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const baseFreq = 523.25; // C5
      // Pentatonic scale progression
      const scale = [1, 9/8, 5/4, 3/2, 5/3, 2, 9/4, 5/2, 3, 10/3];
      const freq = baseFreq * scale[index % scale.length];

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.4);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.45);
    } catch {
      // Audio fallback silent
    }
  }

  /**
   * Soft paper rustle / pop sound when opening the envelope seal
   */
  public playSealPop() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "triangle";
      osc.frequency.setValueAtTime(160, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(60, this.ctx.currentTime + 0.12);

      gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.15);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.18);
    } catch {
      // Audio fallback silent
    }
  }

  /**
   * Romantic celestial chord when connect-the-dots is completed
   */
  public playSuccessFanfare() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const chord = [523.25, 659.25, 783.99, 1046.5]; // C major chord arpeggio
      chord.forEach((freq, idx) => {
        setTimeout(() => {
          if (!this.ctx) return;
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();

          osc.type = "sine";
          osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

          gain.gain.setValueAtTime(0.07, this.ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.8);

          osc.connect(gain);
          gain.connect(this.ctx.destination);

          osc.start();
          osc.stop(this.ctx.currentTime + 0.85);
        }, idx * 120);
      });
    } catch {
      // Audio fallback silent
    }
  }

  /**
   * Procedural vintage music-box rendition of "Can't Help Falling in Love"
   */
  public startMusicBox(onStep?: (noteIdx: number) => void) {
    if (this.isMuted) return;
    this.stopMusicBox();
    this.initContext();
    if (!this.ctx) return;

    this.isMusicBoxPlaying = true;

    // Melody notes for "Wise men say only fools rush in, but I can't help falling in love with you"
    // G4, B4, D5, G4, A4, B4, C5, B4, A4, G4, F#4, G4, E4...
    const melody: { f: number; d: number }[] = [
      { f: 392.00, d: 500 }, // G4 (Wise)
      { f: 493.88, d: 500 }, // B4 (men)
      { f: 587.33, d: 900 }, // D5 (say)
      { f: 392.00, d: 500 }, // G4 (on-)
      { f: 440.00, d: 500 }, // A4 (-ly)
      { f: 493.88, d: 500 }, // B4 (fools)
      { f: 523.25, d: 500 }, // C5 (rush)
      { f: 493.88, d: 500 }, // B4 (in)
      { f: 440.00, d: 900 }, // A4
      { f: 392.00, d: 500 }, // G4 (but)
      { f: 369.99, d: 500 }, // F#4 (I)
      { f: 392.00, d: 500 }, // G4 (can't)
      { f: 329.63, d: 500 }, // E4 (help)
      { f: 392.00, d: 600 }, // G4 (fall-)
      { f: 440.00, d: 500 }, // A4 (-ing)
      { f: 493.88, d: 500 }, // B4 (in)
      { f: 523.25, d: 500 }, // C5 (love)
      { f: 493.88, d: 600 }, // B4 (with)
      { f: 440.00, d: 500 }, // A4 (you)
      { f: 392.00, d: 1400 }, // G4
    ];

    let current = 0;

    const playNext = () => {
      if (!this.isMusicBoxPlaying || !this.ctx) return;
      const note = melody[current];
      
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      // Music box bell timbre
      osc.type = "sine";
      osc.frequency.setValueAtTime(note.f, this.ctx.currentTime);

      gain.gain.setValueAtTime(0.09, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + (note.d / 1000) * 0.95);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + (note.d / 1000));

      if (onStep) onStep(current);

      current = (current + 1) % melody.length;
      this.musicBoxInterval = window.setTimeout(playNext, note.d);
    };

    playNext();
  }

  public stopMusicBox() {
    this.isMusicBoxPlaying = false;
    if (this.musicBoxInterval) {
      clearTimeout(this.musicBoxInterval);
      this.musicBoxInterval = null;
    }
  }

  public isPlaying(): boolean {
    return this.isMusicBoxPlaying;
  }
}

export const romanticAudio = new RomanticAudio();
