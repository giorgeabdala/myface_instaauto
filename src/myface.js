const getInstaAuto = require("./instaauto_conecction");

async function likeFeed() {
    const instauto = await getInstaAuto();
    await instauto.followUser('cisenir');
    await instauto.likeUserFeed('cisenir');
    await instauto.end();

}

async function FollowFollowers() {
    try {
        const instauto = await getInstaAuto();
        const usersToFollowFollowersOf = ['ciliosclub'];
        const unfollowedCount = 0;
        const totalmaxFollows = 150;
        let loopCount = 0;


        while (true) {

            console.log('loopCount: ', loopCount+1);

            // Now go through each of these and follow a certain amount of their followers
            await instauto.followUsersFollowers({
                usersToFollowFollowersOf,
                maxFollowsTotal: 150,
                skipPrivate: true,
                enableLikeImages: true,
                likeImagesMax: 3,
            });

            await instauto.sleep(10 * 60 * 1000);

            console.log('Done running');

            await instauto.sleep(30000);

        }

    } catch (err) {
        console.error(err);
    } finally {
        console.log('Closing browser');
        if (browser) await browser.close();
    }


}

FollowFollowers();





