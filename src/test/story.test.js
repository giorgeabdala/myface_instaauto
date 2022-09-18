const seeStory = require("../see_story");
const followFollowers = require("../follow_followers");
const BotFactory = require("../instauto/conecction").BotFactory;
const {optionsFollowFollowers} = require("../config/Options");
const {findGenderByName} = require("../gender");

beforeAll(async () => {
    await seeStory.init();
}  );

afterAll(async () => {
    await seeStory.close();
}  );

describe('Testa as funções de visualização de story', () => {
    jest.setTimeout(300000);

    it('Testa a factory do Bot', async () => {
        expect(await BotFactory(true)).resolves;
    } );


    it('Testa se está abrindo o insta', async () => {
        open = await seeStory.open_insta();
        return expect(open).toBe(true);
    } );

    it('Testa se está visualizando o primeiro story ', async () => {
        await seeStory.open_insta();
        return expect(seeStory.first_story()).resolves;
    } );

    it ('Testa se está fechando o story', async () => {
        await seeStory.open_insta();
        await seeStory.first_story();
        close = await seeStory.close_story();
        return expect(close).resolves;
    } );

    it ('Testa se está passando para o próximo story', async () => {
        await seeStory.open_insta();
        await seeStory.first_story();
        return expect(seeStory.next_story()).resolves;
    } );

    it('Testa se está dando like na story', async () => {
        await seeStory.open_insta();
        await seeStory.first_story();
        return expect(seeStory.like_story()).resolves;
    } );

    it('Testa se está visualizando o story', async () => {
        await seeStory.open_insta();
        return expect(seeStory.see_story()).resolves;
    } );

    it('Testa a função de fechar Instaauto e Browser', async () => {
        return expect(await seeStory.close()).resolves;
    } );

} );

describe("Testa a função de seguir seguidores", () => {
    jest.setTimeout(300000);

    it('Testa se está buscando o gender corretamente', async () => {
        return expect(await findGenderByName("João")).toBe('M');
    } );

it("Deve começar a seguir os seguidores", async () => {
        options = optionsFollowFollowers;
        options.maxFollowsTotal = 1;
        options.likeImagesMax = 1;
        return expect(await followFollowers.follow_followers(true, options, 1)).resolves;
    })


    });




