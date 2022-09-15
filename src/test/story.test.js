const seeStory = require("../see_story");


beforeAll(async () => {
    await seeStory.init(true);
} );

afterAll(async () => {
    await seeStory.close();
}  );

describe('Testa as funções de visualização de story', () => {
    jest.setTimeout(300000);

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




} );