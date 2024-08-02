export class Player {
  public x: number = 0;
  public y: number = 0;
  public width: number;
  public height: number;
  public velocityX: number;
  public velocityY: number;
  private gravity: number;
  public context: CanvasRenderingContext2D;
  private imageRunning: HTMLImageElement;
  private imageStanding: HTMLImageElement;
  private currentImage: HTMLImageElement;
  private frameIndex: number;
  private frameWidth: number;
  private frameHeight: number;
  private totalFrames: number;
  private flipped: boolean = false;
  private isRunning: boolean = false;

  constructor(
    context: CanvasRenderingContext2D,
    imageRunning: HTMLImageElement,
    imageStanding: HTMLImageElement
  ) {
    this.width = 45;
    this.height = 100;
    this.velocityX = 0;
    this.velocityY = 5;
    this.gravity = 0.3;
    this.context = context;
    this.imageRunning = imageRunning;
    this.imageStanding = imageStanding;
    this.currentImage = imageStanding;
    this.frameIndex = 0;
    this.frameWidth = 177; // 10620 / 60
    this.frameHeight = 400;
    this.totalFrames = 60;
  }

  public draw(): void {
    const sx = this.frameIndex * this.frameWidth;
    const sy = 0;

    this.context.save(); // Salva o estado atual do contexto

    if (this.flipped) {
      this.context.translate(this.x + this.width / 2, this.y + this.height / 2);
      this.context.scale(-1, 1);
      this.context.translate(-(this.x + this.width / 2), -(this.y + this.height / 2));
    }

    this.context.drawImage(
      this.currentImage,
      sx,
      sy,
      this.frameWidth,
      this.frameHeight,
      this.x,
      this.y,
      this.width,
      this.height
    );

    this.context.restore(); // Restaura o estado do contexto
  }

  public flipImage(flipped: boolean): void {
    this.flipped = flipped;
  }

  public update(): void {
    this.draw();
    this.y += this.velocityY;
    this.x += this.velocityX;
    if (this.y + this.height + this.velocityY <= this.context.canvas.height) {
      this.velocityY += this.gravity;
    } else {
      this.velocityY = 0;
    }

    // Update frame index
    this.frameIndex = (this.frameIndex + 1) % this.totalFrames;
  }

  public setRunning(isRunning: boolean): void {
    this.isRunning = isRunning;
    if (isRunning) {
      this.currentImage = this.imageRunning;
      this.frameWidth = 341; // 10230 / 30
      this.totalFrames = 30;
      this.width = 110;
    } else {
      this.currentImage = this.imageStanding;
      this.frameWidth = 177; // 10620 / 60
      this.totalFrames = 60;
        this.width = 45;
    }
  }
}

//running 10230x400 30 frames
//standing 10620x400 60 frames