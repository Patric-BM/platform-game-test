export class Platform {
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  context: CanvasRenderingContext2D;
  velocity: number;
  image: HTMLImageElement;

  constructor(
    context: CanvasRenderingContext2D,
    image: HTMLImageElement,
    x?: number
  ) {
    this.image = image;
    this.width = this.image.width;
    this.height = this.image.height ?? 125;
    this.x = x ?? -1;
    this.y = context.canvas.height - this.height;
    this.color = "blue";
    this.context = context;
    this.velocity = 0;
  }

  private drawImage(): void {
    this.context.drawImage(this.image, this.x, this.y);

  }

  public update(): void {
    this.drawImage();
    this.x += this.velocity;
  }
}
