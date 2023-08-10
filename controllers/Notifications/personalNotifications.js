

// const notify = require('../../models/notification');

// module.exports = (req, res) => {
//   const { user_id } = req.params;
//   const page = parseInt(req.query.page) || 1;
//   const pageSize = 10;

//   notify.findOne({ user_id }, 'notifications.likesNotification notifications.commentNotification notifications.CallNotifications', (error, data) => {
//     if (error) {
//       res.status(500).send(error);
//     } else {
//       const { likesNotification, commentNotification, CallNotifications } = data.notifications;

//       const likesStartIndex = (page - 1) * pageSize;
//       const likesEndIndex = likesStartIndex + pageSize;
//       const paginatedLikesNotification = likesNotification.slice(likesStartIndex, likesEndIndex);

//       const commentStartIndex = (page - 1) * pageSize;
//       const commentEndIndex = commentStartIndex + pageSize;
//       const paginatedCommentNotification = commentNotification.slice(commentStartIndex, commentEndIndex);

//       const callStartIndex = (page - 1) * pageSize;
//       const callEndIndex = callStartIndex + pageSize;
//       const paginatedCallNotifications = CallNotifications.slice(callStartIndex, callEndIndex);

//       const allNotifications = [
//         ...paginatedLikesNotification,
//         ...paginatedCommentNotification,
//         ...paginatedCallNotifications
//       ];

//       res.json(allNotifications);
//     }
//   });
// };

const notify = require('../../models/notification');

module.exports = (req, res) => {
  const { user_id } = req.params;
  const page = parseInt(req.query.page) || 1;
  const pageSize = 10;

  notify.findOne({ user_id }, 'notifications.likesNotification notifications.commentNotification notifications.CallNotifications', (error, data) => {
    if (error) {
      res.status(500).send(error);
    }else if (!data || !data.notifications){
      res.json({message:"notification not found"})
    } else {
      const { likesNotification, commentNotification, CallNotifications } = data.notifications;

      const likesStartIndex = (page - 1) * pageSize;
      const likesEndIndex = likesStartIndex + pageSize;
      const paginatedLikesNotification = likesNotification.slice(likesStartIndex, likesEndIndex);

      const commentStartIndex = (page - 1) * pageSize;
      const commentEndIndex = commentStartIndex + pageSize;
      const paginatedCommentNotification = commentNotification.slice(commentStartIndex, commentEndIndex);

      const callStartIndex = (page - 1) * pageSize;
      const callEndIndex = callStartIndex + pageSize;
      const paginatedCallNotifications = CallNotifications.slice(callStartIndex, callEndIndex);

      const allNotifications = [
        ...paginatedLikesNotification,
        ...paginatedCommentNotification,
        ...paginatedCallNotifications
      ];

      // Sort allNotifications based on the date_added variable in each record
      allNotifications.sort((a, b) => b.date_added.localeCompare(a.date_added));

      res.json(allNotifications);
    }
  });
};
