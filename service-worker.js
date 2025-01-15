import { setActivity, setup } from "./lib/discord.js"


chrome.runtime.onInstalled.addListener((details) => {
    if (details.reason !== "install" && details.reason !== "update") return;
    console.info("Plugin installed / updated!")
});


chrome.runtime.onStartup.addListener(() => {

    setup()
})

chrome.runtime.onMessage.addListener( (message, sender, sendResponse) => {
    console.info(message.youtubeVideoName)
    setActivity(message.youtubeVideoName, message.youtubeThumbnail, message.startTime)
})