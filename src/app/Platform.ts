export class Platform {
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  context: CanvasRenderingContext2D;

  constructor(context: CanvasRenderingContext2D) {
    this.x = 200;
    this.y = 300;
    this.width = 200;
    this.height = 50;
    this.color = "blue";
    this.context = context;
  }

  public draw(): void {
    this.context.fillStyle = this.color;
    this.context.fillRect(this.x, this.y, this.width, this.height);
  }

}
