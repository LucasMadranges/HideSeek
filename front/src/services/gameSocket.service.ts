// src/services/gameSocket.service.ts
import {io} from "socket.io-client";
import type {Socket} from "socket.io-client";

interface Position {
  lng: number;
  lat: number;
}

interface GameData {
  zone_localisation: Position & { radius: number };
  time: string;
}

interface GameResponse {
  id: string;
  zone_localisation: Position & { radius: number };
  time: string;
  error?: string;
}

interface PlayerData {
  playerId: string;
  username: string;
  position: Position;
}

export class GameSocketService {
  private readonly socket: Socket;

  constructor() {
    this.socket = io("http://localhost:3000");

    this.socket.on("connect", () => {
      console.log("Connecté au serveur de jeu");
    });

    this.socket.on("error", (error) => {
      console.error("Erreur socket:", error);
    });
  }

  createGame(gameData: GameData): Promise<GameResponse> {
    return new Promise((resolve, reject) => {
      this.socket.emit("createGame", gameData, (response: GameResponse) => {
        if (response.error) {
          reject(new Error(response.error));
        } else {
          resolve(response);
        }
      });
    });
  }

  joinGame(gameId: string, position: Position): void {
    this.socket.emit("joinGame", {gameId, position});
  }

  updatePosition(gameId: string, position: Position): void {
    this.socket.emit("updatePosition", {gameId, position});
  }

  onPlayerJoined(callback: (data: PlayerData) => void): void {
    this.socket.on("playerJoined", callback);
  }

  onPlayerLeft(callback: (data: { playerId: string }) => void): void {
    this.socket.on("playerLeft", callback);
  }

  onPlayerMoved(callback: (data: PlayerData) => void): void {
    this.socket.on("playerMoved", callback);
  }

  disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
}
