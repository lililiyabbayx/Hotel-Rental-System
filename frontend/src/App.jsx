import React from 'react';
import { useTranslation } from 'react-i18next';
import LanguageSelector from './components/LanguageSelector';

const App = () => {
  const { t } = useTranslation();

  return (
    <div>
      <LanguageSelector />
      <h1>{t('welcome')}</h1>
      <button>{t('bookNow')}</button>
      <p>{t('tripRecommendations')}</p>
    </div>
  );
};

export default App;
