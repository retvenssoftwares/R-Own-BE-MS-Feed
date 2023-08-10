
const Event = require('../../models/events');
const profile = require('../../models/Profile');
const saved = require('../../models/saved');
const category = require('../../models/eventCategory');

module.exports = async (req, res) => {
  try {
    const pageSize = 6;
    const page = parseInt(req.query.page) || 1; // Use req.query.page to get the current page number

    const skip = (page - 1) * pageSize;

    const { User_id } = req.params;

    const events = await Event.find().sort({date_added:-1}).skip(skip).limit(pageSize);
    const profiles = await profile.find({ User_id });
    const save = await saved.find({ user_id:User_id });
    const categorys = await category.find({});

    const result = events.map(event => {
      const matchingProfile = profiles.find(profile => profile.User_id === event.User_id);
      const matchingcategory = categorys.find(data => data.category_id === event.category_id);
      const matchingSavedBlog = save.find(profile =>
        profile.saveall_id.Events.some(savedBlog => savedBlog.eventid === event.event_id)
      );

      let saved = 'not saved';


      if (matchingSavedBlog) {
        saved = 'saved';
      }
      return {

        // category_name: matchingcategory ? matchingcategory.category_name : null,
        // User_name: matchingProfile ? matchingProfile.User_name : null,
        // Full_name: matchingProfile ? matchingProfile.Full_name : null,
        // Profile_pic: matchingProfile ? matchingProfile.Profile_pic : null,
        // category_name:event.category_name,
        User_name:event.User_name,
        Full_name:event.Full_name,
        Profile_pic:event.Profile_pic,
        verificationStatus: event.verificationStatus,
        event_title: event.event_title,
        event_start_date: event.event_start_date,
        event_id: event.event_id,
        event_thumbnail: event.event_thumbnail,
        event_description: event.event_description,
        location: event.location,
        event_category: event.event_category,
        price: event.price,
        display_status:event.display_status,
        saved: saved,
      };
    });

    if (result.length > 0) {
      res.json([{
        page,
        pageSize, 
        events: result
      }]);
    } else {
      res.json([{ message: 'You have reached the end' }]);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Something went wrong' });
  }
};
