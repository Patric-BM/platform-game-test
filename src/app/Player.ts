export class Player {
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  velocityX: number;
  velocityY: number;
  gravity: number;
  context: CanvasRenderingContext2D;
  keys: { [key: string]: boolean } = {
    ArrowLeft: false,
    ArrowRight: false,
  };

  constructor(context: CanvasRenderingContext2D) {
    this.x = 0;
    this.y = 0;
    this.width = 50;
    this.height = 50;
    this.color = "red";
    this.velocityX = 0;
    this.velocityY = 5;
    this.gravity = 0.3;
    this.context = context;
  }

  public draw(): void {
   
    this.context.fillStyle = this.color;
    this.context.fillRect(this.x, this.y, this.width, this.height);
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
  }
}
