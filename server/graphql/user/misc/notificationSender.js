import User from "../../../components/user/user.model.js"; // the db
import NotificationData from "./notificationData.js";

const NotificationSender = {
    /* 
    ARGUMENTS:
        recipient -> A username string, or mongodb User object of who to send the notificaiton to
        allowDuplicate -> boolean specifying whether the message should be sent despite a duplicate notification already existing with the recipient
        notification -> an object following the notification template shown below

    RETURN VALUE -> True if it was successful, false otherwise
        
    EXAMPLE NOTIFICATION YOU COULD SEND

    const notification = {
        read: false,
        sender: jwtPayload.username,
        message: `liked your post!`,
        type: "like",
        target: post.title,
        timestamp: new Date(),
    };
    */
    sendNotification: async function (recipient, allowDuplicate, notification) {
        let userToNotify = recipient;

        // if the user is not an object, fetch the object from the db
        if (typeof(userToNotify) == "string") {
            userToNotify = await User.findOne({
                username: recipient,
                enabled: true,
            });

            if (!userToNotify) {
                throw new Error("Cannot find intended recipient"); 
            }
        }

        let shouldNotify = true;
        
        // SENDING CHECKS ------------------------------------------------
        // make sure no dup notifications already exist with the recipient
        if (!allowDuplicate) {
            for (let i = 0; i < userToNotify.notifications.length; i++) {
                const currentNotification = userToNotify.notifications[i];

                if (
                    currentNotification.sender == notification.sender &&
                    currentNotification.message == notification.message &&
                    currentNotification.target == notification.target
                ) {
                    shouldNotify = false;
                    break;
                }
            }
        }
        // check to make sure the recipient is not yourself
        if (userToNotify.username == notification.sender) {
            shouldNotify = false;
        }
        // ---------------------------------------------------------------

        // finally, send the message if it passed all the checks
        if (shouldNotify) {
            userToNotify.notifications.unshift(notification);

            // if the recipient has reached the max notifications, remove the oldest one
            if (userToNotify.notifications.length > NotificationData.maxNotifications) {
                userToNotify.notifications.pop();
            }
            
            // save the notification to the db
            await userToNotify.save();

            return true;
        }
    }
};

export default NotificationSender;
