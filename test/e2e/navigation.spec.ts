import { Application } from 'spectron';

import { initializeSpectronApp, stopSpectronApplication } from '../helpers';

jest.setTimeout(10 * 1000);

describe('Navigation', () => {
  let app: Application;

  const navbarSelector = 'nav[data-role="navbar"';
  const headingSelector = 'h1[data-role="page-heading"]';
  const homeLinkSelector = 'a[data-role="link-home"]';
  const chartsLinkSelector = 'a[data-role="link-charts"]';
  const homePageHeading = 'Welcome to Microblog!';
  const chartsPageHeading = 'Charts';

  beforeAll(async () => {
    app = await initializeSpectronApp();
    await app.client.waitUntilWindowLoaded();
  });

  afterAll(() => stopSpectronApplication(app));

  it('Renders navigation', async () => {
    const { client } = app;

    expect(await client.isExisting(navbarSelector)).toBeTruthy();
    expect(await client.isExisting(homeLinkSelector)).toBeTruthy();
    expect(await client.isExisting(chartsLinkSelector)).toBeTruthy();
  });

  it('Loads landing page when first time loaded', async () => {
    const { client } = app;

    expect(await client.isExisting(headingSelector)).toBeTruthy();
    expect(await client.element(headingSelector).getText()).toBe(homePageHeading);
  });

  it('Navigates to charts page when nav button is clicked', async () => {
    const { client } = app;

    await client.click(chartsLinkSelector);
    expect(await client.element(headingSelector).getText()).toBe(chartsPageHeading);
  });

  it('Navigates back to homepage', async () => {
    const { client } = app;

    await client.click(homeLinkSelector);
    expect(await client.element(headingSelector).getText()).toBe(homePageHeading);
  });
});
