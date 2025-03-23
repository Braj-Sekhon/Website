import { json } from "@sveltejs/kit";
import { status } from "minecraft-server-util";

const ports = {
  mc: 27789,
  tr: 7789,
};

async function error_data(data, key) {
  data[key] = {
    status: false,
    players_online: "...",
    max_players: "...",
  };
  return true;
}

export async function GET() {
  let data = {};
  for (let i = 0; i < Object.keys(ports).length; i++) {
    const key = Object.keys(ports)[i];
    const port = ports[key];

    try {
      if (key === "mc") {
        const status_data = await status("localhost", port);
        data[key] = {
          status: true,
          players_online: status_data.players.online,
          max_players: status_data.players.max,
        };
      } else if (key === "tr") {
        // I'm using TShock as my terraria server so it has this "api endpoint" thing I can use to get the players.
        // A normal Terraria doesn't have any way to get the players and stuff as far as I know.
        const response = await fetch("http://localhost:7878/status");
        if (response.ok) {
          const status_data = await response.json();
          data[key] = {
            status: true,
            players_online: status_data.playercount,
            max_players: status_data.maxplayers,
          };
        } else {
          await error_data(data, key);
        }
      }
    } catch (error) {
      console.warn(error);
      await error_data(data, key);
    }
  }
  return json(data);
}
