import { DiscordSDK } from "@discord/embedded-app-sdk"

const DISCORD_CLIENT_ID = process.env.DISCORD_CLIENT_ID
const discordSdk = new DiscordSDK(DISCORD_CLIENT_ID)


export async function setup() {
  await discordSdk.ready()
  const { code } = await discordSdk.commands.authorize({
    client_id: DISCORD_CLIENT_ID,
    response_type: "code",
    state: "",
    prompt: "none",
    scope: [
      "identify",
      "rpc.activities.write"
    ],
  });

  const response = await fetch('localhost:3001/api/token', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			code,
		}),
	});
	const { access_token } = await response.json();

	// Authenticate with Discord client (using the access_token)
	auth = await discordSdk.commands.authenticate({
		access_token,
	});

	if (auth == null) {
		throw new Error('Authenticate command failed');
	}
}


export async function setActivity(youtubeVideoName, youtubeThumbnail, startTime) {
  await discordSdk.commands.setActivity({
    activity: {
      type: 0,
      details: 'Watching Youtube',
      state: youtubeVideoName,
      assets: {
        Watching_Youtube: youtubeThumbnail,
      },
      timestamps: {
        start: startTime
      },
    }
  });
}
