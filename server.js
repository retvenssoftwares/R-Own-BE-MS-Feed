const express = require('express');
const path = require('path')
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
require("./db/conn");


//Feed Api
const feedapi = require('./routers/Feed/userPostrouter');
const post = require('./routers/Feed/savedPostrouter');
const comment = require('./routers/Feed/commentFeedrouter');
const likefeed = require('./routers/Feed/likeFeedrouter');
const getcomment = require('./routers/Feed/getCommentrouter');
const getPost = require('./routers/Feed/getPostrouter');
const allpost = require('./routers/Feed/getAllpostrouter');
const replyComments = require('./routers/Feed/commentReplyRouter')
const getallpostbyid = require('./routers/Feed/getpostdataByuseridrouter');
const patchPollUserId = require('./routers/Feed/patchUseridinOptionsRouter')
const getlikebypost = require('./routers/Feed/getLikebypostidrouter')
const pollsvotes = require('./routers/Feed/getpollsvotesbypostidrouter')
const getpostbypostid = require('./routers/Feed/getPostByPostidRouter')
const updatepost = require('./routers/Feed/updatePostRouter')
const postcountwithdate = require('./routers/Feed/getPostCountWithDateRouter')
const newFeedCache = require('./routers/Feed/newFeedCacheRouter')
const newfeedapi = require('./routers/Feed/getpostofcoonrouter')

////////////////////////////////////////

//Explore
const getExplorePosts = require('./routers/Explore/explorePostsRouter')
const getpeople = require('./routers/Explore/explorePeoplerouter')
const Event = require('./routers/Explore/exploreEventrouter')
const Blog = require('./routers/Explore/exploreBlogrouter')
const getalljob = require('./routers/Explore/getalljobrouter')
const getexploreHotels = require('./routers/Explore/explorehotelrouter')
const getService = require('./routers/Explore/exploreServicesrouter')
const searchpostbycaption = require('./routers/Explore/searchexplorepostrouter')
const searchByJob = require('./routers/Explore/exploreSearchJobRouter')
const searchpeople = require('./routers/Explore/explorePeoplesearchrouter')
const searchblog = require('./routers/Explore/exploreSearchblogrouter')
const eventSearch = require('./routers/Explore/exploreEventsSearchRouter')
const hotelSearch = require('./routers/Explore/explorehotelSearchrouter')
const serviceSearch = require('./routers/Explore/exploreSearchServicesRouter')

//////////////////////////////////////////////////////////////////////////

//Notifications get
const getPersonalNotifications = require('./routers/Notification/personalNotificationRouter')
const getconnectionNotifications = require('./routers/Notification/getConnectionNotificationRouter')

///////////////////////////////////////////////////////////////////////////

//location
const location = require('./routers/location/getLocationrouter');
const countries = require('./routers/location/getAllcountryrouter');
const state = require('./routers/location/getAllstatesrouter');
const cities = require('./routers/location/getAllcitiesrouter');
const fetchcoutries = require('./routers/location/fetchAllCountryRouter');

//Mesibo
const chat = require('./routers/Mesibo/chatNotificatiosnrouter')
const call = require('./routers/Mesibo/callingNotifyRouter')

app.use(express.static(path.join(__dirname, '/client/retvens-admin-panel/build')))




app.use(express.json());

//Notyfications
app.use(getPersonalNotifications)
app.use(getconnectionNotifications)

//Mesibo
app.use(chat)
app.use(call)

//Explore
app.use(getExplorePosts)
app.use(getpeople)
app.use(Event)
app.use(Blog)
app.use(getalljob)
app.use(getService)
app.use(searchpostbycaption)
app.use(searchByJob)
app.use(getexploreHotels)
app.use(searchpeople)
app.use(serviceSearch)
app.use(eventSearch)
app.use(searchblog)
app.use(hotelSearch)

//location
app.use(location)
app.use(countries)
app.use(state)
app.use(cities)
app.use(fetchcoutries)

//Feed
app.use(post)
app.use(comment)
app.use(getPost)
app.use(feedapi)
app.use(getcomment)
app.use(replyComments)
app.use(patchPollUserId)
app.use(allpost)
app.use(getallpostbyid)
app.use(getlikebypost)
app.use(pollsvotes)
app.use(getpostbypostid)
app.use(updatepost)
app.use(postcountwithdate)
app.use(newFeedCache)
app.use(newfeedapi)

app.get('/', (req, res) => {
    res.send('Congrats you have reached backend sevices.')
    res.sendStatus(200)
  })

const PORT = 8000;
app.listen(PORT,() =>{
    console.log(`connnection is setup at ${PORT}`);
 });
