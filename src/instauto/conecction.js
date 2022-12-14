'use strict';

const puppeteer = require('puppeteer');
const {options  }   = require('../config/Options');
const Instauto = require('./index');

const Bot = {
    instauto: null,
    page: null,
}



let instance_InstaAuto = null;


async function getInstance(head_less = false) {
    let browser, instance;

    try {
        browser = await puppeteer.launch({headless: head_less});

        // Create a database where state will be loaded/saved to
        const instautoDb = await Instauto.JSONDB({
            // Will store a list of all users that have been followed before, to prevent future re-following.
            followedDbPath: './followed.json',
            // Will store all unfollowed users here
            unfollowedDbPath: './unfollowed.json',
            // Will store all likes here
            likedPhotosDbPath: './liked-photos.json',
        });
        instance =  await Instauto(instautoDb, browser, options);


    } catch (err) {
        console.error(err);
    }
    return instance;
}

async function getInstaAuto(headless= false) {
    if (instance_InstaAuto === null || !instance_InstaAuto.getBrowser.isConnected() ||  instance_InstaAuto.getPage().isClosed()) {
        return getInstance(headless);
    }
    return instance_InstaAuto;
}

async function BotFactory(headless = false) {
    try {
        Bot.instauto = await getInstaAuto(headless);
        Bot.page = await Bot.instauto.getPage();
        return Bot;
    } catch (err) {
        console.error(err + "Error in init");
        throw new Error(err);
    }


}



module.exports = {BotFactory};