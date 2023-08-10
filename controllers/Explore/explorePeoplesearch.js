

const profile = require('../../models/Profile');
const blocked = require('../../models/blockedByUser');
const blocker = require('../../models/blockedUser');

// GET API endpoint for retrieving posts based on search query with pagination
module.exports = async (req, res) => {
  try {
    const keyword = req.params.keyword; // Assuming the keyword is provided in the request body
    const pageSize = 10;
    const page = parseInt(req.query.page) || 1; // Assuming the page number is provided as a query parameter
    const User_id = req.params.User_id; // Assuming the User_id is provided in the request parameters

    const searchQuery = {
      $or: [
        { User_name: { $regex: new RegExp(keyword, 'i') } },
        { Full_name: { $regex: new RegExp(keyword, 'i') } },
        { 'normalUserInfo.jobTitle': { $regex: new RegExp(keyword, 'i') } }
        
      ]
    };

    const Blockuser = await blocker.findOne({ User_id:User_id });
    const Blockbyuser = await blocked.findOne({ User_id:User_id });

    const totalPosts = await profile.countDocuments(searchQuery);
    const totalPages = Math.ceil(totalPosts / pageSize);

    if (page > totalPages) {
      return res.json([{ message: "You have reached the end" }]);
    }

    const pagedPosts = await profile
      .find(searchQuery, 'Profile_pic User_id User_name Full_name userBio Role Mesibo_account verificationStatus connections requests display_status Created_On').sort({Created_On:-1})
      .skip((page - 1) * pageSize)
      .limit(pageSize);

    const userGetpost = await profile.findOne({ User_id: User_id }, 'requests connections verificationStatus display_status');


    const connectedUserIds = pagedPosts.filter((profile) => {
      return profile.connections.some((connection) => connection.user_id === User_id);
    }).map((profile) => profile.User_id);

    const requestedUserIds = pagedPosts.filter((profile) => {
      return profile.requests.some((request) => request.user_id === User_id);
    }).map((profile) => profile.User_id);

    const confirmedUserIds = pagedPosts.filter((profile) => {
      return userGetpost.requests.some((request) => request.user_id === profile.User_id);
    }).map((profile) => profile.User_id);


    const pagedPostsModified = pagedPosts.map((profile) => {
      let connectionStatus = "Not Connected";
      if (connectedUserIds.includes(profile.User_id)) {
        connectionStatus = "Connected";
      } else if (requestedUserIds.includes(profile.User_id)) {
        connectionStatus = "Requested";
      }else if (confirmedUserIds.includes(profile.User_id)) {
        connectionStatus = "Confirm Request";
      }
      let Blocked = 'no';
      let blockbyuser='no';

      if (Blockuser) {
        const blocked = Blockuser.blockedUser;
        const isblocked = blocked.some((block) => block.user_id === profile.User_id);
        Blocked = isblocked ? 'yes' : 'no';
      }
      if (Blockbyuser) {
        const blocked = Blockbyuser.blockedByUser;
        const isblocked = blocked.some((block) => block.user_id === profile.User_id);
        blockbyuser = isblocked ? 'yes' : 'no';
      }

      return { ...profile._doc, connectionStatus,Blocked,blockbyuser };
    });

    res.json([{
      page,
      pageSize,
      posts: pagedPostsModified.map(({ connections, requests, ...rest }) => rest)
    }]);
  } catch (error) {
    console.error(error);
    res.status(500).send([{ message: 'Something went wrong' }]);
  }
};

