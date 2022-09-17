'use strict';

const Config = require("./Config");
const Chalk = require("chalk");
const {findGenderByName} = require("../gender");


// Optional: Custom logger with timestamps
const log = (fn, ...args) => console[fn](new Date().toISOString(), ...args);
const logger = Object.fromEntries(['log', 'info', 'debug', 'error', 'trace', 'warn'].map((fn) => [fn, (...args) => log(fn, ...args)]));

const optionsFollowFollowers = {
    usersToFollowFollowersOf: Config.usersToFollowFollowersOf,
    maxFollowsTotal: 60,
    skipPrivate: false,
    enableLikeImages: true,
    likeImagesMax: 2,
}

const optionsStory = {
    urlInstagram: 'https://www.instagram.com/',
    xpath_close_story: '//div[@class="_ac0g"]/button[@class="_abl-" ]',
    xpath_like_story: '//span/button[@class="_abl-" ]',
    xpath_next_story: '//button[@aria-label="Next"]',
    xpath_first_story: '//button[@class="_aam8"]',
    like_percent: 0.6
};

const options = {
    cookiesPath: './cookies.jsonrm ',

    username: Config.username,
    password: Config.password,

    // Global limit that prevents follow or unfollows (total) to exceed this number over a sliding window of one hour:
    maxFollowsPerHour: 26,
    // Global limit that prevents follow or unfollows (total) to exceed this number over a sliding window of one day:
    maxFollowsPerDay: 200,
    // (NOTE setting the above parameters too high will cause temp ban/throttle)
    maxLikesPerDay: 100,
    // Don't follow users that have a followers / following ratio less than this:
    followUserRatioMin: 0.2,
    // Don't follow users that have a followers / following ratio higher than this:
    followUserRatioMax: 8.0,
    // Don't follow users who have more followers than this:
    followUserMaxFollowers: null,
    // Don't follow users who have more people following them than this:
    followUserMaxFollowing: null,
    // Don't follow users who have less followers than this:
    followUserMinFollowers: 100,
    // Don't follow users who have more people following them than this:
    followUserMinFollowing: null,

    // Custom logic filter for user follow
    //shouldFollowUser: null,
    //Example to skip bussiness accounts
    shouldFollowUser: function (data) {
        //ignora contas comerciais e profissionais
        console.log(Chalk.blue('isBusinessAccount:', data.isBusinessAccount));
        console.log(Chalk.blue('isProfessionalAccount:', data.isProfessionalAccount));
        console.log(Chalk.blue('fullName:', data.fullName));
        if (data.isBusinessAccount || data.isProfessionalAccount) return false;
        //ignora Homens
        const first_name = data.fullName.split(' ')[0];
        const gender = findGenderByName(first_name);
        console.log(Chalk.red(first_name));
        console.log(Chalk.red('gender:', gender));
        if (gender === 'M') return false;

        //ignora Keywords
        console.log(Chalk.blue('username:', data.username));
        console.log(Chalk.blue('Bio:', data.biography));
        let keywords = Config.KeyExcludes;
        return !(keywords.find(v => data.username.includes(v)) !== undefined || keywords.find(v => data.biography.includes(v)) !== undefined);
    },

    // NOTE: The dontUnfollowUntilTimeElapsed option is ONLY for the unfollowNonMutualFollowers function
    dontUnfollowUntilTimeElapsed: 30 * 24 * 60 * 60 * 1000,

    // Usernames that we should not touch, e.g. your friends and actual followings
    excludeUsers: [],

    // If true, will not do any actions (defaults to true)
    dryRun: false,

    logger,
};

module.exports = {options, optionsStory, optionsFollowFollowers};