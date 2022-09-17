const {BotFactory} = require("./instauto/conecction");
const {optionsFollowFollowers} = require("./config/Options");

let Bot = {
    instauto: null,
    browser: null,
}

async function start_follow_followers(sleep, headless = false) {
    if(!Bot.instauto) Bot = await BotFactory(headless);
    follow_followers(headless,optionsFollowFollowers, sleep);
    await Bot.instauto.sleep(10 * 60 * 1000);
    console.log('Done running');
    await Bot.instauto.sleep(15000);
}

async function follow_followers(headless = false, options = optionsFollowFollowers, sleep = 60) {
    try {
        if(!Bot.instauto) Bot = await BotFactory(headless);
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