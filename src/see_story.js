const getInstaAuto = require("./instaauto_conecction");


const Instaauto = {
    browser: null,
    page: null,
}

const options = {
    urlInstagram: 'https://www.instagram.com/',
    xpath_close_story: '//div[@class="_ac0g"]/button[@class="_abl-" ]',
    xpath_like_story: '//span/button[@class="_abl-" ]',
    xpath_next_story: '//button[@aria-label="Next"]',
    xpath_firs_story: '//button[@class="_aam8"]'
}


//porcentagem de storys que será likeado
const LIKE_PERCENT = 0.6;


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

        }
        catch (err) {
        console.error(err);
    }
}

async function see_story() {
    await Instaauto.browser.sleep(1000);
    //verifica se a page tem o botão de pausar. Só aparece na tela de stories
    const is_story_screen = await Instaauto.page.$x(options.xpath_close_story);
    if (is_story_screen.length < 1)
        await first_story();
    await Instaauto.browser.sleep(1000);
    //gera um numeror aleatorio entre 0 e 1
    const random = Math.random();
    const isLike = random <= LIKE_PERCENT;
    isLike ? await like_story() : await next_story();
}

async function next_story() {
    await Instaauto.browser.sleep(2000);
    await Instaauto.page.waitForXPath(options.xpath_next_story);
    const buttons = await Instaauto.page.$x(options.xpath_next_story);
    await buttons[0].click();
}

async function like_story(){
    try {
        console.log("Fazendo like na story...");
        await Instaauto.page.waitForXPath(options.xpath_like_story);
        const button = await Instaauto.page.$x(options.xpath_like_story);
        await button[0].click();
        next_story();
    } catch (err) {
        console.error(err + "Erro ao dar like");
    }

}

async function close_story() {
    try {
        await Instaauto.browser.sleep(1000);
        console.log("Closing Story...");
        await Instaauto.page.waitForXPath(options.xpath_close_story);
        const buttons = await Instaauto.page.$x(options.xpath_close_story);
        await buttons[0].click();
    } catch (err) {
        console.error(err + "Erro ao fechar story. Provavelmente já está fechado");
    }

}

async function first_story() {
   // await Instaauto.page.waitForXPath(options.xpath_firs_story);
    const buttons = await Instaauto.page.$x(options.xpath_firs_story);
    await buttons[0].click();
}

async function random_sleep() {
    //gera um numero entre 2 minutos e 10 minutos
    const random = Math.floor(Math.random() * (300000 - 120000 + 1)) + 120000;
    console.log("esperando " + random/60000 + " minutos");
    await Instaauto.browser.sleep(random);

}

async function open_insta() {
    await Instaauto.page.goto(options.urlInstagram);
    await Instaauto.page.setViewport({width: 1280, height: 800});
    await Instaauto.browser.sleep(3000);
}

async function init() {
    Instaauto.browser = await getInstaAuto();
    Instaauto.page = await Instaauto.browser.getPage();
}

start_see_story();

