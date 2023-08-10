// const notify = require('../../models/notification');

// module.exports = (req, res) => {
//   const { user_id } = req.params;
//   const page = parseInt(req.query.page) || 1;
//   const pageSize = 10;

//   notify.findOne({ user_id }, 'notifications.requestNotification notifications.acceptNotification', (error, data) => {
//     if (error) {
//       res.status(500).send(error);

        
//     } 
//     else if (!data || !data.notifications){
//       res.json({message:"notification not found"})
//     }else {
//       const { requestNotification, acceptNotification  } = data.notifications;

//       const requestStartIndex = (page - 1) * pageSize;
//       const requestEndIndex = requestStartIndex + pageSize;
//       const paginatedrequestNotification = requestNotification.slice(requestStartIndex, requestEndIndex);

//       const acceptStartIndex = (page - 1) * pageSize;
//       const acceptEndIndex = acceptStartIndex + pageSize;
//       const paginatedacceptNotification = acceptNotification.slice(acceptStartIndex, acceptEndIndex);

      
//       const allNotifications = [
//         ...paginatedrequestNotification,
//         ...paginatedacceptNotification
        
//       ];

//       // Sort allNotifications based on the date_added variable in each record
//       // allNotifications.sort((a, b) => b.date_added - a.date_added);

//       res.json(allNotifications);
//     }
//   });
// };


const notify = require('../../models/notification');

module.exports = (req, res) => {
  const { user_id } = req.params;
  const page = parseInt(req.query.page) || 1;
  const pageSize = 10;

  notify.findOne({ user_id }, 'notifications.requestNotification notifications.acceptNotification', (error, data) => {
    if (error) {
      res.status(500).send(error);
    } else if (!data || !data.notifications) {
      res.json({ message: "notification not found" });
    } else {
      const { requestNotification, acceptNotification } = data.notifications;

      const requestStartIndex = (page - 1) * pageSize;
      const requestEndIndex = requestStartIndex + pageSize;
      const paginatedrequestNotification = requestNotification.slice(requestStartIndex, requestEndIndex);

      const acceptStartIndex = (page - 1) * pageSize;
      const acceptEndIndex = acceptStartIndex + pageSize;
      const paginatedacceptNotification = acceptNotification.slice(acceptStartIndex, acceptEndIndex);

      const allNotifications = [
        ...paginatedrequestNotification,
        ...paginatedacceptNotification
      ];

      // Sort allNotifications based on the date_added variable in each record
      allNotifications.sort((a, b) => b.date_added.localeCompare(a.date_added));

      res.json(allNotifications);
    }
  });
};
