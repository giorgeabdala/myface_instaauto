const {optionsStory: options} = require("./config/Options");
const {BotFactory} = require("./instauto/conecction");

let Bot = {
    instauto: null,
    page: null,
}

async function start_see_story() {
    try {
        await init();
        //gera numero aleatorio entre 3 e 10. Esse numero é a quantidade de vezes que o script irá entrar para ver os stories
        let count = Math.floor(Math.random() * (10 - 3 + 1)) + 3;

        for (let i = 0; i < count; i++) {
            await open_insta();

            //gera número randômico entre 3 e 10. Quantidade de storuy quer irá visualizar.
            let see_max = Math.floor(Math.random() * (10 - 3 + 1)) + 3;
            for (let seeing = 0; seeing < see_max; seeing++) {
                await see_story();
             }
            await close_story();
            await random_sleep();
        }
        await close();

        }
        catch (err) {
        console.error(err);
    }
}

async function see_story() {
    try {
        await Bot.instauto.sleep(1000);
        //verifica se a page tem o botão de pausar. Só aparece na tela de stories
        const is_story_screen = await Bot.page.$x(options.xpath_close_story);
        if (is_story_screen.length < 1)
            await first_story();
        await Bot.instauto.sleep(1000);
        //gera um numeror aleatorio entre 0 e 1 para definir se dar like ou não.
        const isLike = Math.random() <= options.like_percent;
        if (isLike)
            return like_story();
       return  next_story();

    } catch (err) {
        console.error(err + "Error in see story");
        return false;
    }

}

async function next_story() {
    await Bot.instauto.sleep(2000);
    await Bot.page.waitForXPath(options.xpath_next_story);
    const buttons = await Bot.page.$x(options.xpath_next_story);
    return buttons[0].click();
}

async function like_story(){
    try {
        console.log("Liking Story...");
        await Bot.page.waitForXPath(options.xpath_like_story);
        const button = await Bot.page.$x(options.xpath_like_story);
        await button[0].click();
        return next_story();
    } catch (err) {
        console.error(err + "Error in like story");
    }

}

async function close_story() {
    try {
        await Bot.instauto.sleep(2000);
        console.log("Closing Story...");
        await Bot.page.waitForXPath(options.xpath_close_story);
        const buttons = await Bot.page.$x(options.xpath_close_story);
        return buttons[0].click();
    } catch (err) {
        console.error(err + "Error in close story. Maybe not have story");
    }

}

async function first_story() {
    try {
        await Bot.page.waitForXPath(options.xpath_first_story);
        const buttons = await Bot.page.$x(options.xpath_first_story);
        await Bot.instauto.sleep(1000);
        return buttons[0].click();
    } catch (err) {
        console.error(err + "Error in open first story");
    }

}

async function random_sleep() {
    try {
        //gera um numero entre 2 minutos e 10 minutos
        const random = Math.floor(Math.random() * (300000 - 120000 + 1)) + 120000;
        console.log("Waiting " + random/60000 + " minutes");
        await Bot.instauto.sleep(random);
    } catch (err) {
        console.error(err + "Error in random sleep");
    }


}

async function open_insta() {
    try {
        await Bot.page.goto(options.urlInstagram);
        await Bot.page.setViewport({width: 1280, height: 800});
        await Bot.instauto.sleep(3000);
        return true;
    } catch (err) {
        console.error(err + "Error in open insta");
        return false;
    }

}

async function init(headless = false) {
    Bot = await BotFactory(headless);

}

async function close() {
    await Bot.instauto.close();
}

//start_see_story();

module.exports = {like_story, init, open_insta, close_story, first_story, next_story, see_story, close, start_see_story};

