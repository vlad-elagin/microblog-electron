import { Application } from 'spectron';
import faker from 'faker';

import { getNetworkErrorMessage, initializeSpectronApp, stopSpectronApplication } from '../helpers';

jest.setTimeout(15 * 1000);

describe('Auth flow', () => {
  let app: Application;
  // usernames are stored lowercased in DB
  const username: string = faker.internet.userName().toLowerCase();
  const password: string = faker.internet.password();

  const passwordInputSelector = 'input[name="password"]';
  const usernameInputSelector = 'input[name="username"]';
  const loginButtonSelector = 'header button[data-role="login"]';
  const signupButtonSelector = 'header button[data-role="signup"]';
  const logoutButtonSelector = 'header button[data-role="logout"]';
  const submitButtonSelector = 'button[type="submit"]';
  const closeButtonSelector = 'button[data-role="close"]';

  beforeAll(async () => {
    app = await initializeSpectronApp();
    await app.client.waitUntilWindowLoaded();
  });

  afterAll(() => stopSpectronApplication(app));

  it('Successfully passes sign up procedure', async () => {
    const { client } = app;

    await client.click(signupButtonSelector);

    // check that modal is open
    expect(await client.getWindowCount()).toBe(2);

    // focus modal
    await client.windowByIndex(1);

    expect(await client.isExisting(usernameInputSelector)).toBeTruthy();

    // type username in its input and check that it is typed
    await client.click(usernameInputSelector).keys(username);
    expect(await client.element(usernameInputSelector).getValue()).toBe(username);

    // type password and check
    await client.click(passwordInputSelector).keys(password);
    expect(await client.element(passwordInputSelector).getValue()).toBe(password);

    // type confirm password and check
    const confirmPasswordInputSelector = 'input[name="confirmPassword"]';
    await client.click(confirmPasswordInputSelector).keys(password);
    expect(await client.element(confirmPasswordInputSelector).getValue()).toBe(password);

    // click submit button and wait for success message and closing of modal window
    await client.click(submitButtonSelector);

    try {
      await client.waitUntilTextExists('div[role="alert"]', 'Created!');
    } catch (err) {
      throw new Error(getNetworkErrorMessage());
    }

    await client.click(closeButtonSelector);
    await client.waitUntil(async () => (await client.getWindowCount()) === 1);
    await client.windowByIndex(0);

    expect(await client.getWindowCount()).toBe(1);
  });

  it('Successfully passes login procedure', async () => {
    const { client } = app;
    await client.click(loginButtonSelector);

    // check that modal is open
    expect(await client.getWindowCount()).toBe(2);

    // focus modal
    await client.windowByIndex(1);
    await client.click(usernameInputSelector).keys(username);
    expect(await client.element(usernameInputSelector).getValue()).toBe(username);

    await client.click(passwordInputSelector).keys(password);
    expect(await client.element(passwordInputSelector).getValue()).toBe(password);

    await client.click(submitButtonSelector);
    try {
      await client.waitUntilTextExists('div[role="alert"]', 'Logged in!');
    } catch (err) {
      throw new Error(getNetworkErrorMessage());
    }

    await client.click(closeButtonSelector);
    await client.waitUntil(async () => (await client.getWindowCount()) === 1);
    await client.windowByIndex(0);

    expect(await client.getWindowCount()).toBe(1);
  });

  it('Successfully passes logout procedure', async () => {
    const { client } = app;
    await client.waitUntilTextExists('header', `Microblog Electron App`);
    await client.waitUntilTextExists('header', `Hello, ${username}`);
    await client.click(logoutButtonSelector);

    expect(await client.isExisting(logoutButtonSelector)).toBeFalsy();
    expect(await client.isExisting(loginButtonSelector)).toBeTruthy();
    expect(await client.isExisting(signupButtonSelector)).toBeTruthy();
  });
});
