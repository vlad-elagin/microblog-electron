import { Application } from 'spectron';
import electronPath from 'electron';
import path from 'path';
import faker from 'faker';

import { getNetworkErrorMessage } from '../helpers/messages';

jest.setTimeout(10000);

describe('Main window', () => {
  let app: Application;
  const username: string = faker.internet.userName();
  const password: string = faker.internet.password();

  beforeAll(() => {
    app = new Application({
      // @ts-ignore
      path: electronPath,
      args: [path.join(__dirname, '..', '..')]
    });

    return app.start();
  });

  afterAll(() => {
    if (app.isRunning()) {
      return app.stop();
    }
  });

  it('Can register new user', async () => {
    const { client, browserWindow } = app;
    await client.waitUntilWindowLoaded();

    // ==== Sign Up ====
    await client.waitUntilTextExists('button', 'Sign Up');
    await client.click('header button:last-of-type');

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
      await client.waitUntilTextExists('div[role="alert"]', 'Created!');
    } catch (err) {
      throw new Error(getNetworkErrorMessage());
    }
  });
});
