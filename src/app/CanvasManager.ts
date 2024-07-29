import { Player } from "./Player";
import { Platform } from "./Platform";
import { CollisionManager } from "./CollisionManager";

export class CanvasManager {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  player: Player;
  platform: Platform;
  collisionManager: CollisionManager;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d")!;
    this.player = new Player(this.ctx);
    this.platform = new Platform(this.ctx);
    this.collisionManager = new CollisionManager(this.player, this.platform);
  }

  public initialize(): void {
    this.draw();
    this.animationFrame();

    window.addEventListener("keydown", () => this.handleKeyDown.bind(this));
    window.addEventListener("keyup", () => this.handleKeyUp.bind(this));
  }

  private animationFrame(): void {
    this.draw();
    requestAnimationFrame( () => this.animationFrame() );
  }

  public draw(): void {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.player.update();
    this.platform.draw();
    this.collisionManager.checkCollision();
  }

  public handleKeyDown(event: KeyboardEvent): void {
    switch (event.key) {
      case "ArrowLeft":
        this.player.velocityX = -2;
        break;
      case "ArrowRight":
        this.player.velocityX = 2;
        break;
      case "ArrowUp":
        this.player.velocityY = -8;
        break;
    }
  }

  public handleKeyUp(event: KeyboardEvent): void {
    switch (event.key) {
      case "ArrowLeft":
      case "ArrowRight":
        this.player.velocityX = 0;
        break;
    }
  }
}
