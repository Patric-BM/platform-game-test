import { Player } from "./Player";
import { Platform } from "./Platform";
import { CollisionManager } from "./CollisionManager";

export class CanvasManager {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  player?: Player | null;
  platforms: Platform[];
  collisionManager: CollisionManager;
  imagePlatform: string = "images/platform.png";
  imagePlayer: string[] = ["images/spriteRunRight.png", "images/spriteStandRight.png"];

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d")!;
    this.platforms = [];
    this.player = null;
    this.collisionManager = new CollisionManager();
  }

  public async initialize(): Promise<void> {
    const image1 = await this.loadImage(this.imagePlatform);
    const image2 = await this.loadImage(this.imagePlatform);
    const imagePlayerStanding = await this.loadImage(this.imagePlayer[1]);
    const imagePlayerRunning = await this.loadImage(this.imagePlayer[0]);
    this.player = new Player(this.ctx, imagePlayerRunning, imagePlayerStanding);
    this.platforms = [
      new Platform(this.ctx, image1),
      new Platform(this.ctx, image2, image2.width - 10),
    ];
    this.draw();
    this.loop();

    window.addEventListener("keydown", (event: KeyboardEvent) =>
      this.handleKeyDown(event)
    );
    window.addEventListener("keyup", (event: KeyboardEvent) =>
      this.handleKeyUp(event)
    );
  }

  private loop(): void {
    this.draw();
    this.platforms.forEach((platform) => platform.update());
    this.player?.update();
    this.collisionManager.checkCollisionWithPlatforms(
      this.player!,
      this.platforms
    );
    requestAnimationFrame(() => this.loop());
  }

  public draw(): void {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  private loadImage(src: string): Promise<HTMLImageElement> {
    return new Promise((resolve) => {
      const image = new Image();
      image.onload = () => resolve(image);
      image.src = src;
    });
  }

  public handleKeyDown(event: KeyboardEvent): void {
    switch (event.key) {
      case "ArrowLeft":
        this.handleArrowLeft();
        this.player?.flipImage(true);
        this.player?.setRunning(true);
        break;
      case "ArrowRight":
        this.handleArrowRight();
        this.player?.flipImage(false);
        this.player?.setRunning(true);
        break;
      case "ArrowUp":
        this.handleArrowUp();
        break;
    }
  }

  private handleArrowLeft(): void {
    this.setPlayerVelocityX(-5);
    if (this.player!.x <= 100) {
      this.setPlayerVelocityX(0);
      this.setPlatformsVelocity(5);
    }
  }

  private handleArrowRight(): void {
    this.setPlayerVelocityX(5);
    if (this.player!.x + this.player!.width >= 500) {
      this.setPlayerVelocityX(0);
      this.setPlatformsVelocity(-5);
    }
  }

  private handleArrowUp(): void {
    this.player!.velocityY = -8;
  }

  public handleKeyUp(event: KeyboardEvent): void {
    switch (event.key) {
      case "ArrowLeft":
      case "ArrowRight":
        this.setPlayerVelocityX(0);
        this.setPlatformsVelocity(0);
        this.player?.setRunning(false);
        break;
    }
  }

  private setPlayerVelocityX(velocity: number): void {
    this.player!.velocityX = velocity;
  }

  private setPlatformsVelocity(velocity: number): void {
    this.platforms.forEach((platform) => {
      platform.velocity = velocity;
    });
  }
}
