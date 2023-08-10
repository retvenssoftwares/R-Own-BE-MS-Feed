
const profile = require('../../models/Profile');
const blocked = require('../../models/blockedByUser');
const blocker = require('../../models/blockedUser');

let currentPage = 1;

module.exports = async (req, res) => {
  try {
    const pageSize = 10;
    const page = parseInt(req.query.page) || 1; // Use req.query.page to get the current page number

    const skip = (page - 1) * pageSize;
    const { User_id } = req.params;
    const userGetpost = await profile.findOne({ User_id: User_id }, 'requests connections verificationStatus display_status');

    const hotelpost = await profile.find({}, 'Profile_pic User_id User_name userBio Full_name Role Mesibo_account requests connections verificationStatus display_status Created_On').sort({Created_On:-1});

    
    const Blockuser = await blocker.findOne({ User_id:User_id });
    const Blockbyuser = await blocked.findOne({ User_id:User_id });

    const totalPosts = hotelpost.length;

    const pagedPosts = hotelpost.slice(skip, skip + pageSize);

  

    if (pagedPosts.length > 0) {
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
        } else if (confirmedUserIds.includes(profile.User_id)) {
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
    } else {
      res.json([{ message: 'You have reached the end' }]);
    }

    currentPage++;
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Something went wrong' });
  }
};