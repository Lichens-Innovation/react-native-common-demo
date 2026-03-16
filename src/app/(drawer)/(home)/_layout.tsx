import { OrientationAwareTabsLayout, TabItem } from '@lichens-innovation/react-native-common';
import { FunctionComponent } from 'react';
import { useTranslation } from 'react-i18next';

const TabLayout: FunctionComponent = () => {
  const { t } = useTranslation();

  const tabs: TabItem[] = [
    {
      name: 'index',
      href: '/',
      title: t('app:formDemo.tabs.simple'),
      icon: 'file-document-outline',
    },
    {
      name: 'form-complex',
      href: '/(drawer)/(home)/form-complex',
      title: t('app:formDemo.tabs.complex'),
      icon: 'hammer-wrench',
    },
    {
      name: 'form-custom',
      href: '/(drawer)/(home)/form-custom',
      title: t('app:formDemo.tabs.custom'),
      icon: 'pencil-box-outline',
    },
    {
      name: 'form-with-grid',
      href: '/(drawer)/(home)/form-with-grid',
      title: t('app:formDemo.tabs.grid'),
      icon: 'view-grid-outline',
    },
    {
      name: 'about',
      href: '/(drawer)/(home)/about',
      title: t('app:about.title'),
      icon: 'information-outline',
    },
  ];

  return <OrientationAwareTabsLayout tabs={tabs} />;
};

export default TabLayout;
