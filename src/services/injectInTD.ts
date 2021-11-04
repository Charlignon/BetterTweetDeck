import {getExtensionUrl, getExtensionVersion} from '../helpers/webExtensionHelpers';
import {BTDSettingsAttribute, BTDVersionAttribute} from '../types/btdCommonTypes';
import {getValidatedSettings} from './backgroundSettings';

export async function injectInTD() {
  // If we're already injected, nothing to do.
  if (document.querySelector('[' + BTDSettingsAttribute + ']')) {
    return true;
  }

  // Get the settings from the browser.
  const settings = await getValidatedSettings();

  // Inject.
  const toInject = document.createElement('script');
  toInject.src = getExtensionUrl('build/inject.js');
  toInject.setAttribute(BTDSettingsAttribute, JSON.stringify(settings));
  toInject.setAttribute(BTDVersionAttribute, getExtensionVersion());
  document.head.appendChild(toInject);

  return new Promise<void>((resolve, reject) => {
    const body = document.querySelector('body');

    if (!body) {
      return reject(new Error('No <body> tag was found in the page. what?'));
    }

    const bodyObserver = new MutationObserver(() => {
      if (document.querySelector('body')) {
        bodyObserver.disconnect();
        return resolve();
      }
    });

    bodyObserver.observe(body, {
      attributes: true,
    });
  });
}
