const express = require("express");
const router = express.Router();

const{signup,Login,getProfile,updateUserProfile} = require("../controllers/userController");
const{auth} = require("../middleware/auth");


// Profile routes
router.get("/getprofile", auth, getProfile);
router.put("/profile", auth, updateUserProfile);
router.post("/Signup",signup);
router.post("/Login",Login);

const {createPost, deletePost ,getMyPosts, getPosts} = require("../controllers/postController");
router.post("/createpost", auth, createPost);
router.get("/getpost", getPosts);
router.get("/myposts", auth, getMyPosts); 
router.delete("/post/delete/:id", auth, deletePost);


module.exports = router;