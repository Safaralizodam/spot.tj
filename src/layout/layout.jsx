



import React, { useState } from 'react';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import SearchIcon from '@mui/icons-material/Search';
import { useTranslation } from 'react-i18next';
import LoginModal from '../components/loginModal/loginModal';
import LanguageSwitcher from '../components/i18n.changeLanguage/LanguageSwitcher';

const top100Films = [
  { title: 'Рестораны' },
  { title: 'Красота и здоровье' },
  { title: 'Всё для дома' },
];

const Layout = () => {
  const [openLogin, setOpenLogin] = useState(false);
  const [selectedTitle, setSelectedTitle] = useState('');
  const [age, setAge] = useState('');
  const [user, setUser] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const isProductsPage = location.pathname === '/products';

  const { t, i18n } = useTranslation();

  const handleLanguageChange = (event) => {
    const lang = event.target.value;
    i18n.changeLanguage(lang).catch(err => console.error('Language change error:', err));
  };

  const handleOpenLogin = () => setOpenLogin(true);
  const handleCloseLogin = () => setOpenLogin(false);

  const handleLogin = async (credentials) => {
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });

      if (response.ok) {
        const data = await response.json();
        setUser({
          username: data.username,
          avatar: data.avatarUrl,
        });
        handleCloseLogin();
      } else {
        console.error('Login failed');
      }
    } catch (error) {
      console.error('An error occurred during login:', error);
    }
  };

  const handleSelectChange = (event) => {
    const title = event.target.value;
    setSelectedTitle(title);
    navigate(`/products?filter=${title}`);
  };

  const handleAgeChange = (event) => {
    setAge(event.target.value);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <div className={`flex flex-col min-h-screen ${isProductsPage ? 'text-black' : 'text-white'}`}>
      <header className={`top-0 left-0 right-0 ${isProductsPage ? 'bg-white fixed shadow-lg' : 'bg-transparent'} p-4 flex items-start z-20`}>
        <div className="items-center">
          <Link to="/" className="flex items-center space-x-2">
            <img
              src={isProductsPage ? 'src/assets/img/wertyuiasdfghj-removebg-preview.png' : 'src/assets/img/trfgyuhiojnhbvgfyhujn-removebg-preview.png'}
              alt="Logo"
              className="h-10 w-[40%] object-contain"
            />
            <h1 className="text-3xl font-bold">spot.tj</h1>
          </Link>
        </div>
        <div className="w-[50%] flex flex-col ml-[50px] mr-[40px]">
          <div className="w-[100%] flex items-center flex-grow">
            <Autocomplete
              id="highlights-demo"
              options={top100Films}
              getOptionLabel={(option) => option.title}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder={t('searchPlaceholder')}
                  variant="outlined"
                  className="w-full"
                  InputProps={{
                    ...params.InputProps,
                    style: { color: isProductsPage ? 'black' : 'black', backgroundColor: isProductsPage ? 'transparent' : 'white' },
                  }}
                  InputLabelProps={{
                    style: { color: isProductsPage ? 'black' : 'black' },
                  }}
                />
              )}
              className="flex-grow"
            />
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <Select
                  id="age-select"
                  value={age}
                  onChange={handleAgeChange}
                  style={{ color: 'black', backgroundColor: 'white' }}
                >
                  <MenuItem value={10}>{t("Dushanbe")}</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <button className="px-[14px] py-[15px] bg-red-600 text-white rounded-r-lg hover:bg-red-700 transition">
              <SearchIcon />
            </button>
          </div>
          <div className="w-[100%] text-start">
            <select
              id="filter-select-1"
              value={selectedTitle}
              onChange={handleSelectChange}
              className={`p-2 focus:outline-none w-[120px] ${isProductsPage ? 'bg-transparent text-black' : 'bg-transparent text-gray-400'}`}
            >
              <option value="Рестораны">{t("Resturans")}</option>
              <option value="Турецкая">{t("turkish")}</option>
              <option value="Бургеры">{t("burgers")}</option>
              <option value="Пицца">{t("pizza")}</option>
              <option value="Десерты">{t("desserts")}</option>
              <option value="Национальная">{t("national")}</option>
              <option value="Плов">{t("plov")}</option>
              <option value="Стейки">{t("steaks")}</option>
              <option value="Суши">{t("sushi")}</option>
            </select>
            <select
              id="filter-select-2"
              value={selectedTitle}
              onChange={handleSelectChange}
              className={`p-2 focus:outline-none w-[180px] ${isProductsPage ? 'bg-transparent text-black' : 'bg-transparent text-gray-400'}`}
            >
              <option value="Всё для дома">{t("Everything for home")}</option>
              <option value="Мебель на заказ">{t("customFurniture")}</option>
              <option value="Стирка ковров">{t("carpetCleaning")}</option>
              <option value="Уборка дома">{t("houseCleaning")}</option>
              <option value="Ковры">{t("carpets")}</option>
              <option value="Бытовая техника">{t("appliances")}</option>
              <option value="Шторы и Жалюзи">{t("curtainsAndBlinds")}</option>
              <option value="Кухонные товары">{t("kitchenGoods")}</option>
            </select>
            <select
              id="filter-select-3"
              value={selectedTitle}
              onChange={handleSelectChange}
              className={`p-2 focus:outline-none w-[170px] ${isProductsPage ? 'bg-transparent text-black' : 'bg-transparent text-gray-400'}`}
            >
              <option value="Красота и здоровье">{t("Beauty and health")}</option>
              <option value="Макияж">{t("makeup")}</option>
              <option value="Косметика">{t("cosmetics")}</option>
              <option value="Маникюр">{t("manicure")}</option>
              <option value="Бани и сауны">{t("saunas")}</option>
              <option value="Массаж">{t("massage")}</option>
              <option value="Косметология">{t("cosmetology")}</option>
              <option value="Стоматология">{t("dentistry")}</option>
            </select>
            <select
              id="filter-select-4"
              value={selectedTitle}
              onChange={handleSelectChange}
              className={`p-2 focus:outline-none w-[100px] ${isProductsPage ? 'bg-transparent text-black' : 'bg-transparent text-gray-400'}`}
            >
              <option value="">{t("more")}</option>
              <option value="Химчистка">{t("dryCleaning")}</option>
              <option value="Ателье">{t("atelier")}</option>
              <option value="Фитнес">{t("fitness")}</option>
              <option value="Десятинка">{t("desyatinka")}</option>
              <option value="Кондитерская">{t("confectionery")}</option>
              <option value="Интернет-кафе">{t("internetCafe")}</option>
            </select>
          </div>
        </div>
        <div>
          <LanguageSwitcher isProductsPage={isProductsPage} />
        </div>
        <div className="flex items-center space-x-2 mt-[10px] ml-[110px]">
          {!user ? (
           <>
              <button
                className={`px-4 py-2 rounded-lg transition mr-[20px] ${isProductsPage ? 'bg-gray-300 text-black' : 'bg-transparent border text-white'}`}
                onClick={handleOpenLogin}
              >
                {t('LOGIN')}
              </button>
              <button
                className={`px-4 py-2 rounded-lg hover:bg-red-700 transition ${isProductsPage ? 'bg-red-500 text-black' : 'bg-red-600 text-white'}`}
              >
                {t('REGISTER')}
              </button>
            </>
          ) : (
            <>
              <img src={user.avatar} alt={user.username} className="w-8 h-8 rounded-full" />
              <span>{user.username}</span>
              <button
                className={`px-4 py-2 rounded-lg transition ${isProductsPage ? 'bg-gray-800 text-white hover:bg-gray-700' : 'bg-gray-300 text-black hover:bg-gray-200'}`}
                onClick={handleLogout}
              >
                {t('Logout')}
              </button>
            </>
          )}
        </div>
      </header>
      <main className="flex-grow w-[100%]">
        <Outlet />
      </main>
      <footer className="p-4 text-center text-black">
        <img className="w-full h-auto object-cover ml-[-40px]" src="src/assets/img/sdfghoiuytre-removebg-preview (1).png" alt="Footer Image" />
        <p className="mt-2 text-sm font-medium">© 2024 {t("allRightsReserved")}</p>
      </footer>
      <LoginModal open={openLogin} handleClose={handleCloseLogin} onLogin={handleLogin} />
    </div>
  );
};

export default Layout;
