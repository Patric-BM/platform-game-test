import { Player } from "./Player";
import { Platform } from "./Platform";

export class CollisionManager {
  public checkCollision(player: Player, platform: Platform): void {
    if (
      player.y + player.height <= platform.y &&
      player.y + player.height + player.velocityY >= platform.y &&
      player.x + player.width >= platform.x &&
      player.x <= platform.x + platform.width
    ) {
      // Collision detected, handle it
      player.velocityY = 0;
    }
  }
  public checkCollisionWithPlatforms(
    player: Player,
    platforms: Platform[]
  ): void {
    platforms.forEach((platform) => {
      if (
        player.y + player.height <= platform.y &&
        player.y + player.height + player.velocityY >= platform.y &&
        player.x + player.width >= platform.x &&
        player.x <= platform.x + platform.width
      ) {
        player.velocityY = 0;
      }
    });
  }
}
