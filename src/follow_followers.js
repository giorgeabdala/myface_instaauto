const {BotFactory} = require("./instauto/conecction");
const {optionsFollowFollowers} = require("./config/Options");

let Bot = {
    instauto: null,
    page: null,
}

async function start_follow_followers(headless = false) {
    follow_followers(optionsFollowFollowers);
    await Bot.instauto.sleep(10 * 60 * 1000);
    console.log('Done running');
    await Bot.instauto.sleep(15000);
}

async function follow_followers(headless = false, options = optionsFollowFollowers, sleep = 60) {
    try {

        Bot = await BotFactory(headless);
        await Bot.instauto.set_sleep(sleep);
        await Bot.instauto.followUsersFollowers(options);
    } catch (err) {
        console.error(err);
    } finally {
        console.log('Closing browser');
        if (Bot.instauto) await Bot.instauto.close();
    }
}


module.exports = {start_follow_followers, follow_followers};