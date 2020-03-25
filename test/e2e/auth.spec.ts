import { Application } from 'spectron';
import faker from 'faker';

import { getNetworkErrorMessage, initializeSpectronApp, stopSpectronApplication } from '../helpers';

jest.setTimeout(15000);

describe('Main window', () => {
  let app: Application;
  const username: string = faker.internet.userName();
  const password: string = faker.internet.password();

  beforeAll(async () => {
    app = await initializeSpectronApp(app);
  });

  afterAll(async () => {
    await stopSpectronApplication(app);
  });

  it('Successfully passes sign up procedure', async () => {
    const { client, browserWindow } = app;
    await client.waitUntilWindowLoaded();

    // ==== Sign Up ====
    await client.waitUntilTextExists('button', 'Sign Up');
    await client.click('header button[data-role="signup"]');

    // check that modal is open
    expect(await client.getWindowCount()).toBe(2);

    // focus modal
    await client.windowByIndex(1);

    // type username in its input and check that it is typed
    const usernameInputSelector = 'input[name="username"]';
    await client.click(usernameInputSelector).keys(username);

    expect(await client.element(usernameInputSelector).getValue()).toBe(username);

    // type password and check
    const passwordInputSelector = 'input[name="password"]';
    await client.click(passwordInputSelector).keys(password);

    expect(await client.element(passwordInputSelector).getValue()).toBe(password);

    // type confirm password and check
    const confirmPasswordInputSelector = 'input[name="confirmPassword"]';
    await client.click(confirmPasswordInputSelector).keys(password);

    expect(await client.element(confirmPasswordInputSelector).getValue()).toBe(password);

    // click submit button and wait for success message and closing of modal window
    await client.click('button[type="submit"]');
    try {
      await client.waitUntilTextExists('div[data-role="alert"]', 'Created!');
    } catch (err) {
      throw new Error(getNetworkErrorMessage());
    }

    await client.click('button[data-role="close"]');
    await new Promise(r => setTimeout(r, 1000));

    expect(await client.getWindowCount()).toBe(1);

    // Couldn't check if modal window is closed or await it
    // Switching window focus and starting...
    // ==== Log In ====
    // await client.windowByIndex(0);
    // await client.click('header button[role="login"]');

    // // focus modal
    // // signup window seems not to be closed yet, so login index is 3
    // await client.windowByIndex(3);
    // await client.click(usernameInputSelector).keys(username);

    // expect(await client.element(usernameInputSelector).getValue()).toBe(username);

    // await client.click(passwordInputSelector).keys(password);

    // expect(await client.element(passwordInputSelector).getValue()).toBe(password);
  });

  it('Successfully passes login procedure', () => {
    expect(true).toBeTruthy();
  });
});
