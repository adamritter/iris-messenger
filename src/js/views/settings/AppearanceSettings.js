import iris from 'iris-lib';

import Component from '../../BaseComponent';
import Nostr from '../../Nostr';
import { translate as t } from '../../translations/Translation';

export default class AppearanceSettings extends Component {
  state = {
    colorScheme: 'dark',
  };

  render() {
    return (
      <>
        <div class="centered-container">
          <h3>{t('Appearance')}</h3>
          <p>
            <label for="colorScheme">{t('color_scheme')}</label>
            <select
              id="colorScheme"
              name="colorScheme"
              onChange={(e) => this.onChange(e)}
              value={this.state.colorScheme}
            >
              <option value="default">{t('system_default')}</option>
              <option value="light">{t('light')}</option>
              <option value="dark">{t('dark')}</option>
            </select>
          </p>
        </div>
      </>
    );
  }

  componentDidMount() {
    const myPub = iris.session.getKey().secp256k1.rpub;
    // TODO use Nostr.private
    Nostr.public.get({ path: 'settings/colorScheme', authors: [myPub] }, (entry) => {
      this.setState({ colorScheme: entry.value });
    });
  }

  onChange(e) {
    Nostr.public.set('settings/colorScheme', e.target.value);
  }
}
