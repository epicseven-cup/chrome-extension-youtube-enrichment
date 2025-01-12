import { DiscordSDK } from "@discord/embedded-app-sdk"

const DISCORD_CLIENT_ID = ""
const discordSdk = new DiscordSDK(DISCORD_CLIENT_ID)


export async function setup() {
  await discordSdk.ready()
  // Pop open the OAuth permission modal and request for access to scopes listed in scope array below
  const { code } = await discordSdk.commands.authorize({
    client_id: YOUR_OAUTH2_CLIENT_ID,
    response_type: 'code',
    state: '',
    prompt: 'none',
    scope: ['identify', 'applications.commands'],
  });

  // Retrieve an access_token from your application's server
  const response = await fetch('/.proxy/api/token', {
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
