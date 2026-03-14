import { makeAutoObservable } from 'mobx';
import { makePersistable } from 'mobx-persist-store';
import { mmkvStorageForMobxPersist } from '@lichens-innovation/react-native-common';

export const APP_SKIN_IDS = {
  lichens: 'lichens',
  red: 'red',
  spotd: 'spotd',
} as const;

export type AppSkinId = keyof typeof APP_SKIN_IDS;

const DEFAULT_APP_SKIN_ID: AppSkinId = 'lichens';

class SettingsStore {
  appSkinId: AppSkinId = DEFAULT_APP_SKIN_ID;

  constructor() {
    makeAutoObservable(this);
    makePersistable(this, {
      name: 'SettingsStore',
      properties: ['appSkinId'],
      storage: mmkvStorageForMobxPersist,
    });
  }

  setAppSkinId(id: AppSkinId) {
    this.appSkinId = id;
  }
}

export const settingsStore = new SettingsStore();
