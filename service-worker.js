import { setActivity, setup } from "./lib/discord.js"


chrome.runtime.onInstalled.addListener(async (details) => {
    if (details.reason !== "install" && details.reason !== "update") return;
    console.info("Plugin installed / updated!")
    console.log("At setup")
    await setup()
    console.log("Finish setup")
});


chrome.runtime.onStartup.addListener(() => {
    console.log("At setup")
    setup()
    console.log("Finish setup")
})

chrome.runtime.onMessage.addListener( (message, sender, sendResponse) => {
    console.log(message.youtubeVideoName)
    setActivity(message.youtubeVideoName, message.youtubeThumbnail, message.startTime)
})