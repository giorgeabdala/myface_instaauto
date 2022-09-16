const see_story = require('./see_story');
const follonw_follower = require('./follow_followers');


async function start_boot(){
    while (true){
        //gera numero aleatorio entre 0 e 1
        let random = Math.random();
        //se o numero for menor que 0.5 ele vai ver uma historia
        if (random < 0.5){
            await see_story.start_see_story();
        }else{
            await follonw_follower.start_follow_followers();
        }
   }
}


start_boot();








