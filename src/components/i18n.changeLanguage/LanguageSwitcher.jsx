import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher = ({ isProductsPage }) => {
  const { i18n } = useTranslation();
  
  const handleLanguageChange = (event) => {
    const lang = event.target.value;
    i18n.changeLanguage(lang).catch(err => console.error('Language change error:', err));
  };

  return (
    <div className={`ml-4 ${isProductsPage ? 'text-black' : 'text-white'}`}>
      <select onChange={handleLanguageChange} className="bg-transparent border border-gray-400 p-2 rounded">
        <option value="en">English</option>
        <option value="es">Español</option>
        <option value="fr">Français</option>
        <option value="ru">Русский</option>
        {/* Add other languages here */}
      </select>
    </div>
  );
};

export default LanguageSwitcher;
