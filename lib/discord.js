import { DiscordSDK } from "@discord/embedded-app-sdk"

const SERVER_ADDRESS = process.env.SERVER_ADDRESS
const DISCORD_CLIENT_ID = process.env.CLIENT_ID
const discordSdk = new DiscordSDK(DISCORD_CLIENT_ID)
console.log(DISCORD_CLIENT_ID)

export async function c(){
  await discordSdk.ready();
}


export async function setup() {
  console.log("Before network ready")
  console.log("Afer network ready")
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

  console.log("The auth token was fetched")
  const response = await fetch(SERVER_ADDRESS + "/api/token", {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			code,
		}),
	});
  console.log("The responds are taken")
	const { access_token } = await response.json();
  console.log("I got the access token")
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
