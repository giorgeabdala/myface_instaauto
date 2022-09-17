const See_story = require('./see_story');
const Follow_followers = require("./follow_followers");

async function start_boot(){
    while (true){
        const activity = Math.floor(Math.random() * 3);

        switch (activity) {
            case 0:
                await See_story.start_see_story(true);
                break;
            case 1:
                await Follow_followers.follow_followers(true,  30);
                break;
            case 2:
                await Follow_followers.unfollow_non_followers(true );
                break;

        }
   }
}

start_boot();

