const {BotFactory} = require("./instauto/conecction");
const {optionsFollowFollowers} = require("./config/Options");

let Bot = {
    instauto: null,
    page: null,
}

async function follow_followers(headless = false, sleep = 60, options = optionsFollowFollowers) {
    try {
        if(Bot.page == null || Bot.page.isClosed()) Bot = await BotFactory(headless);
        await Bot.instauto.set_sleep(sleep);
        await Bot.instauto.followUsersFollowers(options);
        await Bot.instauto.sleep(10 * sleep * 1000);
    } catch (err) {
        console.error(err);
    } finally {
        console.log('Closing browser');
        if (Bot.instauto) await Bot.instauto.close();
    }
}

async function unfollow_non_followers(headless = false, max = 10) {
    try {
        if(Bot.page == null || Bot.page.isClosed()) Bot = await BotFactory(headless);
        await Bot.instauto.unfollowNonMutualFollowers( {limit: max} );
    } catch (err) {
        console.error(err);
    } finally {
        console.log('Closing browser');
        if (Bot.instauto) await Bot.instauto.close();
    }
}


module.exports = {follow_followers, unfollow_non_followers};