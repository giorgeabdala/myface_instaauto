'use strict';

const puppeteer = require('puppeteer');
const {options  }   = require('./Options');
//const Instauto = require('instauto');
const Instauto = require('./index');
const Config = require("./Config"); // eslint-disable-line import/no-unresolved
let instance_InstaAuto = null;
let instance_InstaAuto_headless = null;

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


async function getInstaAuto_headless() {
    if (instance_InstaAuto_headless === null) {
        return getInstance(true);

} }


async function getInstaAuto(headless= false) {
    if(headless) return getInstaAuto_headless();
    if (instance_InstaAuto === null) {
        return getInstance(false);
    }
    return instance_InstaAuto;
}

module.exports = getInstaAuto;