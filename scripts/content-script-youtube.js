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

if (url === null || url === undefined){
    console.error("Fail to get current page url")
    return
}

let pageTitle = document.title

if (pageTitle === null || pageTitle === undefined){
    console.error("Fail to get current page title")
    return
}

// If the url matches a youtube url at 2024, that has the v=.* query param
if (getVideoId.test(url)){
    let videoId = getVideoId.match(url) // should have two regex group, the outter with v=XXX& and XXX
    if (videoId === null || videoId === undefined || videoId.length != 2) {
        console.error(`Error when trying to parse Youtube URL ${videoId}`)
        return
    } 

    let videoTitle = pageTitle.replace(cleanPageTitle, "")
    if (videoTitle === null || videoTitle === undefined) {
        console.error(`Error when trying to parse Video Title ${videoTitle}`)
        return
    }

    let thumbnail = new YoutubeThumbnail(videoId)
    let date = new Date()

    let message = new YoutubeMessage(videoTitle, thumbnail.getThumbnailUrl(), +date)
    chrome.tabs.sendMessage(message)
}
