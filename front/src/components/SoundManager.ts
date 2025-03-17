export class SoundManager {
  private sounds: HTMLAudioElement[] = [];

  constructor(soundUrls: string[]) {
    this.initializeSounds(soundUrls);
  }

  public playRandom(): HTMLAudioElement | undefined {
    const randomSound = this.sounds[Math.floor(Math.random() * this.sounds.length)];
    if (randomSound) {
      randomSound.currentTime = 0;
      randomSound.play()
        .catch(error => console.log("Erreur lors de la lecture du son:", error));
      return randomSound;
    }
    return undefined;
  }

  private initializeSounds(soundUrls: string[]) {
    this.sounds = soundUrls.map(url => {
      const audio = new Audio(url);
      audio.preload = "auto";
      return audio;
    });
  }
}
