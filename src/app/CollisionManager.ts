import { Player } from "./Player";
import { Platform } from "./Platform";

export class CollisionManager {
  player: Player;
  platform: Platform;

  constructor(player: Player, platform: Platform) {
	this.player = player;
	this.platform = platform;
  }

  public checkCollision(): void {
	if (
	  this.player.x < this.platform.x + this.platform.width &&
	  this.player.x + this.player.width > this.platform.x &&
	  this.player.y < this.platform.y + this.platform.height &&
	  this.player.y + this.player.height > this.platform.y
	) {
	  // Collision detected, handle it
	  this.player.velocityY = 0;
	  this.player.y = this.platform.y - this.player.height;
	}
  }
}
