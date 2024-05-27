import express from 'express';
import { 
    loginUser, 
    logoutUser, 
    registerUser, 
    refreshAccessToken, 
    changeCurrentPassword, 
    getCurrentUser, 
    updateUserAvatar, 
    updateUserCoverImage, 
    getUserChannelProfile, 
    getWatchHistory, 
    updateAccountDetails
} from './controllers/user.controller.js';
import { upload } from './middlewares/multer.middleware.js';
import { verifyJWT } from './middlewares/auth.middleware.js';

const app = express();

// Routes
app.route("/register").post(
    upload.fields([
        {
            name: "avatar",
            maxCount: 1
        }, 
        {
            name: "coverImage",
            maxCount: 1
        }
    ]),
    registerUser
);

app.route("/login").post(loginUser);

// Secured routes
app.route("/logout").post(verifyJWT, logoutUser);
app.route("/refresh-token").post(refreshAccessToken);
app.route("/change-password").post(verifyJWT, changeCurrentPassword);
app.route("/current-user").get(verifyJWT, getCurrentUser);
app.route("/update-account").patch(verifyJWT, updateAccountDetails);

app.route("/avatar").patch(verifyJWT, upload.single("avatar"), updateUserAvatar);
app.route("/cover-image").patch(verifyJWT, upload.single("coverImage"), updateUserCoverImage);

app.route("/c/:username").get(verifyJWT, getUserChannelProfile);
app.route("/history").get(verifyJWT, getWatchHistory);

export default app;
