'use strict';

const puppeteer = require('puppeteer'); // eslint-disable-line import/no-extraneous-dependencies

//const Instauto = require('instauto');
const Instauto = require('./index');

const Config = require("./Config"); // eslint-disable-line import/no-unresolved

// Optional: Custom logger with timestamps
const log = (fn, ...args) => console[fn](new Date().toISOString(), ...args);
const logger = Object.fromEntries(['log', 'info', 'debug', 'error', 'trace', 'warn'].map((fn) => [fn, (...args) => log(fn, ...args)]));

const options = {
    cookiesPath: './cookies.jsonrm ',

    username: Config.username,
    password: Config.password,

    // Global limit that prevents follow or unfollows (total) to exceed this number over a sliding window of one hour:
    maxFollowsPerHour: 20,
    // Global limit that prevents follow or unfollows (total) to exceed this number over a sliding window of one day:
    maxFollowsPerDay: 150,
    // (NOTE setting the above parameters too high will cause temp ban/throttle)

    maxLikesPerDay: 100,

    // Don't follow users that have a followers / following ratio less than this:
    followUserRatioMin: 0.2,
    // Don't follow users that have a followers / following ratio higher than this:
    followUserRatioMax: 4.0,
    // Don't follow users who have more followers than this:
    followUserMaxFollowers: null,
    // Don't follow users who have more people following them than this:
    followUserMaxFollowing: null,
    // Don't follow users who have less followers than this:
    followUserMinFollowers: null,
    // Don't follow users who have more people following them than this:
    followUserMinFollowing: null,

    // Custom logic filter for user follow
    //shouldFollowUser: null,
    //Example to skip bussiness accounts

    shouldFollowUser: function (data) {
        console.log('isBusinessAccount:', data.isBusinessAccount);
        return !data.isBusinessAccount;
    },

    /* Example to skip accounts with 'crypto' & 'bitcoin' in their bio or username
    shouldFollowUser: function (data) {
      console.log('username:', data.username, 'biography:', data.biography);
      var keywords = ['crypto', 'bitcoin'];
      if (keywords.find(v => data.username.includes(v)) !== undefined || keywords.find(v => data.biography.includes(v)) !== undefined) {
        return false;
      }
      return true;
    }, */

    // NOTE: The dontUnfollowUntilTimeElapsed option is ONLY for the unfollowNonMutualFollowers function
    // This specifies the time during which the bot should not touch users that it has previously followed (in milliseconds)
    // After this time has passed, it will be able to unfollow them again.
    // TODO should remove this option from here
    dontUnfollowUntilTimeElapsed: 3 * 24 * 60 * 60 * 1000,

    // Usernames that we should not touch, e.g. your friends and actual followings
    excludeUsers: [],

    // If true, will not do any actions (defaults to true)
    dryRun: false,

    logger,
};


async function getInstaAuto() {
    let browser;

    try {
        browser = await puppeteer.launch({headless: false});

        // Create a database where state will be loaded/saved to
        const instautoDb = await Instauto.JSONDB({
            // Will store a list of all users that have been followed before, to prevent future re-following.
            followedDbPath: './followed.json',
            // Will store all unfollowed users here
            unfollowedDbPath: './unfollowed.json',
            // Will store all likes here
            likedPhotosDbPath: './liked-photos.json',
        });
        return await Instauto(instautoDb, browser, options);


    } catch (err) {
        console.error(err);
    }

}

module.exports = getInstaAuto;