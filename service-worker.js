import { setActivity, setup } from "./lib/discord.js"


chrome.runtime.onInstalled.addListener((details) => {
    if (details.reason !== "install" && details.reason !== "update") return;
    chrome.contextMenus.create({
        "id": "sampleContextMenu",
        "title": "Sample Context Menu",
        "contexts": ["selection"]
    });
});


chrome.runtime.onStartup.addListener(() => {
    setup()
})

chrome.runtime.onMessage.addListener( (message, sender, sendResponse) => {
    console.info(message.youtubeVideoName)
    setActivity(message.youtubeVideoName, message.youtubeThumbnail, message.startTime)
})