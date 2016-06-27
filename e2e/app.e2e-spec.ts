import { EmotebuilderPage } from './app.po';

describe('emotebuilder App', function() {
  let page: EmotebuilderPage;

  beforeEach(() => {
    page = new EmotebuilderPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
