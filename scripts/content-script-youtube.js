import { setActivity } from "../lib/discord";


class YoutubeMessage {
    constructor(youtubeVideoName, youtubeThumbnail, startTime){
        this.youtubeVideoName = youtubeVideoName 
        this.youtubeThumbnail = youtubeThumbnail
        this.startTime = startTime
    }
}


class YoutubeThumbnail {
    constructor(youtubeVideoId){
        this.youtubeVideoId = youtubeVideoId
    }

    getThumbnailUrl() {
        let imageBasePath = "https://i.ytimg.com/v"
        let defaultImage = "hqdefault.jpg"
        return `${imageBasePath}/${this.youtubeVideoId}/${defaultImage}`
    }
}
const getVideoId = /v=(.*?)&/
const cleanPageTitle = /^\(\d\)|-\sYouTube$/
let url = document.URL
// If the url matches a youtube url at 2024, that has the v=.* query param
if (getVideoId.test(url)){
    let videoId = getVideoId.match(url) // should have two regex group, the outter with v=XXX& and XXX
    if (videoId === null || videoId === undefined || videoId.length != 2) {
        console.error(`Error when trying to parse Youtube URL ${videoId}`)
        return
    } 

    let pageTitle = document.title.replace(cleanPageTitle, "")
    if (pageTitle === null || pageTitle === undefined) {
        console.error(`Error when trying to parse Page Title ${pageTitle}`)
        return
    }
    let message = new YoutubeMessage()
    chrome.tabs.sendMessage()
}
