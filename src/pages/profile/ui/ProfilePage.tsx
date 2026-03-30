import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Header } from '../../../widgets/header';
import { Footer } from '../../../widgets/footer/ui/Footer';
import { useAuth } from '../../../app/providers/AuthProvider';
import { useFavorites } from '../../../app/providers/FavoritesProvider';
import { useCart } from '../../../app/providers/CartProvider';
<<<<<<< HEAD
import { useOrders } from '../../../app/providers/OrdersProvider';
=======
>>>>>>> 5c0ad7cdce73cb99d468f0f9b95fe04e6c412adf
import { AddToCartButton } from '../../../features/add-to-cart/ui/AddToCartButton';
import './ProfilePage.css';

export const ProfilePage: React.FC = () => {
  const { user, logout } = useAuth();
  const { favorites, removeFromFavorites } = useFavorites();
  const { addToCart } = useCart();
<<<<<<< HEAD
  const { orders } = useOrders();
  const navigate = useNavigate();
  const location = useLocation();
  const [isEditing, setIsEditing] = useState(false);
  const [sellerForm, setSellerForm] = useState({
    shopName: '',
    shopDescription: '',
    category: '',
    phone: '',
    inn: '',
    address: '',
    bankName: '',
    bik: '',
    accountNumber: ''
  });
  const [isSellerFormSubmitted, setIsSellerFormSubmitted] = useState(false);
  const [sellerStatus, setSellerStatus] = useState<'none' | 'pending' | 'approved' | 'rejected'>('none');

  useEffect(() => {
    const savedSeller = localStorage.getItem('sellerApplication');
    if (savedSeller) {
      const data = JSON.parse(savedSeller);
      setSellerForm(data.form);
      setSellerStatus(data.status);
      setIsSellerFormSubmitted(data.status !== 'none');
    }
  }, []);

=======
  const navigate = useNavigate();
  const location = useLocation();
  const [isEditing, setIsEditing] = useState(false);
  
>>>>>>> 5c0ad7cdce73cb99d468f0f9b95fe04e6c412adf
  const getTabFromUrl = () => {
    const params = new URLSearchParams(location.search);
    return params.get('tab') || 'profile';
  };
  
  const [activeTab, setActiveTab] = useState(getTabFromUrl());

  useEffect(() => {
    setActiveTab(getTabFromUrl());
  }, [location.search]);

  const [formData, setFormData] = useState({
<<<<<<< HEAD
    firstName: user?.name?.split(' ')[0] || '',
    lastName: user?.name?.split(' ')[1] || '',
    birthDate: '1990-01-01',
    gender: 'male',
    city: '',
    street: '',
    house: '',
=======
    firstName: 'Иван',
    lastName: 'Иванов',
    birthDate: '1990-01-01',
    gender: 'male',
    city: 'Москва',
    street: 'Тверская',
    house: '15',
>>>>>>> 5c0ad7cdce73cb99d468f0f9b95fe04e6c412adf
    phone: '+7(999)-123-45-67'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

<<<<<<< HEAD
  const handleSellerInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSellerForm(prev => ({ ...prev, [name]: value }));
  };

=======
>>>>>>> 5c0ad7cdce73cb99d468f0f9b95fe04e6c412adf
  const handleGenderChange = (gender: string) => {
    setFormData(prev => ({ ...prev, gender }));
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleTabChange = (tab: string) => {
    navigate(`/profile?tab=${tab}`);
  };

  const handleGoHome = () => {
    navigate('/');
  };

  const handleAddToCartFromFavorites = (product: any) => {
    addToCart(product);
    removeFromFavorites(product.id);
  };

<<<<<<< HEAD
  const handleSellerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!sellerForm.shopName || !sellerForm.shopDescription || !sellerForm.category || !sellerForm.phone || !sellerForm.inn) {
      alert('Пожалуйста, заполните все обязательные поля');
      return;
    }

    const application = {
      form: sellerForm,
      status: 'pending',
      date: new Date().toISOString()
    };
    
    localStorage.setItem('sellerApplication', JSON.stringify(application));
    setSellerStatus('pending');
    setIsSellerFormSubmitted(true);
    alert('Ваша заявка отправлена на рассмотрение!');
  };

=======
>>>>>>> 5c0ad7cdce73cb99d468f0f9b95fe04e6c412adf
  const renderContent = () => {
    switch(activeTab) {
      case 'profile':
        return (
          <div className="profile-section">
            <h2 className="section-title">Мои данные</h2>
            
            <div className="info-block">
              <h3 className="block-title">Личная информация</h3>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Имя *</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder="Введите имя"
                    />
                  ) : (
                    <p className="info-value">{formData.firstName}</p>
                  )}
                </div>
                
                <div className="form-group">
                  <label>Фамилия *</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder="Введите фамилию"
                    />
                  ) : (
                    <p className="info-value">{formData.lastName}</p>
                  )}
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Дата рождения *</label>
                  {isEditing ? (
                    <input
                      type="date"
                      name="birthDate"
                      value={formData.birthDate}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <p className="info-value">{formData.birthDate}</p>
                  )}
                </div>
                
                <div className="form-group">
                  <label>Пол</label>
                  {isEditing ? (
                    <div className="gender-options">
                      <label className="gender-label">
                        <input
                          type="radio"
                          name="gender"
                          checked={formData.gender === 'male'}
                          onChange={() => handleGenderChange('male')}
                        />
                        <span>Мужской</span>
                      </label>
                      <label className="gender-label">
                        <input
                          type="radio"
                          name="gender"
                          checked={formData.gender === 'female'}
                          onChange={() => handleGenderChange('female')}
                        />
                        <span>Женский</span>
                      </label>
                    </div>
                  ) : (
                    <p className="info-value">
                      {formData.gender === 'male' ? 'Мужской' : 'Женский'}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="info-block">
              <h3 className="block-title">Адрес</h3>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Город *</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="Введите город"
                    />
                  ) : (
                    <p className="info-value">{formData.city}</p>
                  )}
                </div>
                
                <div className="form-group">
                  <label>Улица *</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="street"
                      value={formData.street}
                      onChange={handleInputChange}
                      placeholder="Введите улицу"
                    />
                  ) : (
                    <p className="info-value">{formData.street}</p>
                  )}
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Дом *</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="house"
                      value={formData.house}
                      onChange={handleInputChange}
                      placeholder="Введите номер дома"
                    />
                  ) : (
                    <p className="info-value">{formData.house}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="info-block">
              <h3 className="block-title">Номер телефона</h3>
              <div className="form-group">
                {isEditing ? (
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+7(***)-***-**-**"
                  />
                ) : (
                  <p className="info-value phone">{formData.phone}</p>
                )}
              </div>
            </div>

            {!isEditing && (
              <button className="edit-btn mobile-edit" onClick={() => setIsEditing(true)}>
                <svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
                </svg>
                Изменить
              </button>
            )}
          </div>
        );
<<<<<<< HEAD
=======
 case 'favorites':
  return (
    <div className="profile-section">
      <h2 className="section-title">Избранное</h2>
      {favorites.length === 0 ? (
        <div className="empty-state">
          <svg width="60" height="60" viewBox="0 0 16 16" fill="#ccc">
            <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
          </svg>
          <p>В избранном пока ничего нет</p>
          <button className="home-link" onClick={handleGoHome}>
            Перейти к покупкам
          </button>
        </div>
      ) : (
        <div className="favorites-grid">
          {favorites.map(product => (
            <div key={product.id} className="favorite-card">
              <div className="favorite-image">
                <img src={product.image} alt={product.name} />
              </div>
              <div className="favorite-info">
                <div className="favorite-details">
                  <h3 className="favorite-brand">{product.brand}</h3>
                  <p className="favorite-name">{product.name}</p>
                </div>
                <p className="favorite-price">{product.price.toLocaleString()} ₽</p>
                <button 
                  className="add-to-cart-favorite"
                  onClick={() => handleAddToCartFromFavorites(product)}
                >
                  В корзину
                </button>
              </div>
              <button 
                className="remove-favorite"
                onClick={() => removeFromFavorites(product.id)}
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
>>>>>>> 5c0ad7cdce73cb99d468f0f9b95fe04e6c412adf
      case 'orders':
        return (
          <div className="profile-section">
            <h2 className="section-title">Мои заказы</h2>
<<<<<<< HEAD
            {orders.length === 0 ? (
              <div className="empty-state">
                <svg width="80" height="80" viewBox="0 0 24 24" fill="#ccc">
                  <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/>
                </svg>
                <p>У вас пока нет заказов</p>
                <button className="home-link" onClick={handleGoHome}>
                  Перейти к покупкам
                </button>
              </div>
            ) : (
              <div className="orders-list">
                {orders.map(order => (
                  <div key={order.id} className="order-card">
                    <div className="order-header">
                      <div className="order-info">
                        <span className="order-number">Заказ #{order.id.slice(-6)}</span>
                        <span className="order-date">{new Date(order.date).toLocaleDateString('ru-RU')}</span>
                      </div>
                      <div className={`order-status status-${order.status}`}>
                        {order.status === 'pending' && 'Ожидает оплаты'}
                        {order.status === 'processing' && 'В обработке'}
                        {order.status === 'shipped' && 'Отправлен'}
                        {order.status === 'delivered' && 'Доставлен'}
                        {order.status === 'cancelled' && 'Отменен'}
                      </div>
                    </div>
                    <div className="order-items">
                      {order.items.slice(0, 3).map(item => (
                        <div key={item.id} className="order-item">
                          <img src={item.image} alt={item.name} className="order-item-image" />
                          <div className="order-item-info">
                            <div className="order-item-name">{item.name}</div>
                            <div className="order-item-brand">{item.brand}</div>
                            <div className="order-item-price">{item.price.toLocaleString()} ₽</div>
                          </div>
                        </div>
                      ))}
                      {order.items.length > 3 && (
                        <div className="order-more">и еще {order.items.length - 3} товаров</div>
                      )}
                    </div>
                    <div className="order-footer">
                      <div className="order-total">
                        <span>Итого:</span>
                        <span>{order.total.toLocaleString()} ₽</span>
                      </div>
                      <button className="order-details-btn" onClick={() => navigate(`/order/${order.id}`)}>
                        Подробнее
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
=======
            <div className="empty-state">
              <p>У вас пока нет заказов</p>
              <button className="home-link" onClick={handleGoHome}>
                Перейти к покупкам
              </button>
            </div>
>>>>>>> 5c0ad7cdce73cb99d468f0f9b95fe04e6c412adf
          </div>
        );
      case 'notifications':
        return (
          <div className="profile-section">
            <h2 className="section-title">Уведомления</h2>
            <div className="empty-state">
              <p>Новых уведомлений нет</p>
            </div>
          </div>
        );
<<<<<<< HEAD
      case 'favorites':
        return (
          <div className="profile-section">
            <h2 className="section-title">Избранное</h2>
            {favorites.length === 0 ? (
              <div className="empty-state">
                <svg width="80" height="80" viewBox="0 0 16 16" fill="#ccc">
                  <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
                </svg>
                <p>В избранном пока ничего нет</p>
                <button className="home-link" onClick={handleGoHome}>
                  Перейти к покупкам
                </button>
              </div>
            ) : (
              <div className="favorites-grid">
                {favorites.map(product => (
                  <div key={product.id} className="favorite-card">
                    <div className="favorite-image">
                      <img src={product.image} alt={product.name} />
                      <button 
                        className="remove-favorite"
                        onClick={() => removeFromFavorites(product.id)}
                      >
                        ×
                      </button>
                    </div>
                    <div className="favorite-info">
                      <h3 className="favorite-brand">{product.brand}</h3>
                      <p className="favorite-name">{product.name}</p>
                      <p className="favorite-price">{product.price.toLocaleString()} ₽</p>
                      <button 
                        className="add-to-cart-favorite"
                        onClick={() => handleAddToCartFromFavorites(product)}
                      >
                        В корзину
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
=======
>>>>>>> 5c0ad7cdce73cb99d468f0f9b95fe04e6c412adf
      case 'seller':
        return (
          <div className="profile-section">
            <h2 className="section-title">Стать продавцом</h2>
<<<<<<< HEAD
            
            {sellerStatus === 'pending' && (
              <div className="seller-status pending">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="#f39c12">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                </svg>
                <h3>Заявка на рассмотрении</h3>
                <p>Ваша заявка отправлена. Мы свяжемся с вами в течение 3 рабочих дней.</p>
              </div>
            )}
            
            {sellerStatus === 'approved' && (
              <div className="seller-status approved">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="#4caf50">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                </svg>
                <h3>Поздравляем! Вы стали продавцом</h3>
                <p>Теперь вы можете добавлять свои товары на платформу.</p>
                <button className="add-product-btn">Добавить товар</button>
              </div>
            )}
            
            {sellerStatus === 'rejected' && (
              <div className="seller-status rejected">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="#f44336">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                </svg>
                <h3>Заявка отклонена</h3>
                <p>К сожалению, ваша заявка не прошла проверку. Вы можете подать заявку снова.</p>
                <button className="retry-btn" onClick={() => {
                  setIsSellerFormSubmitted(false);
                  setSellerStatus('none');
                  setSellerForm({
                    shopName: '',
                    shopDescription: '',
                    category: '',
                    phone: '',
                    inn: '',
                    address: '',
                    bankName: '',
                    bik: '',
                    accountNumber: ''
                  });
                  localStorage.removeItem('sellerApplication');
                }}>Подать заявку снова</button>
              </div>
            )}
            
            {!isSellerFormSubmitted && sellerStatus === 'none' && (
              <form className="seller-form" onSubmit={handleSellerSubmit}>
                <div className="form-section">
                  <h3>Информация о магазине</h3>
                  <div className="form-group">
                    <label>Название магазина *</label>
                    <input
                      type="text"
                      name="shopName"
                      value={sellerForm.shopName}
                      onChange={handleSellerInputChange}
                      placeholder="Введите название магазина"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Описание магазина *</label>
                    <textarea
                      name="shopDescription"
                      value={sellerForm.shopDescription}
                      onChange={handleSellerInputChange}
                      placeholder="Расскажите о своем магазине, ассортименте"
                      rows={4}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Категория товаров *</label>
                    <select
                      name="category"
                      value={sellerForm.category}
                      onChange={handleSellerInputChange}
                      required
                    >
                      <option value="">Выберите категорию</option>
                      <option value="ФУТБОЛКИ">Футболки</option>
                      <option value="ЗИПКИ">Зипки</option>
                      <option value="СВИТЕРЫ">Свитеры</option>
                      <option value="ШТАНЫ">Штаны</option>
                      <option value="КУРТКИ">Куртки</option>
                      <option value="АКССЕСУАРЫ">Аксессуары</option>
                    </select>
                  </div>
                </div>

                <div className="form-section">
                  <h3>Контактная информация</h3>
                  <div className="form-group">
                    <label>Телефон *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={sellerForm.phone}
                      onChange={handleSellerInputChange}
                      placeholder="+7 (___) ___-__-__"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>ИНН *</label>
                    <input
                      type="text"
                      name="inn"
                      value={sellerForm.inn}
                      onChange={handleSellerInputChange}
                      placeholder="ИНН"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Юридический адрес</label>
                    <input
                      type="text"
                      name="address"
                      value={sellerForm.address}
                      onChange={handleSellerInputChange}
                      placeholder="Город, улица, дом"
                    />
                  </div>
                </div>

                <div className="form-section">
                  <h3>Банковские реквизиты</h3>
                  <div className="form-group">
                    <label>Название банка</label>
                    <input
                      type="text"
                      name="bankName"
                      value={sellerForm.bankName}
                      onChange={handleSellerInputChange}
                      placeholder="Название банка"
                    />
                  </div>
                  <div className="form-group">
                    <label>БИК</label>
                    <input
                      type="text"
                      name="bik"
                      value={sellerForm.bik}
                      onChange={handleSellerInputChange}
                      placeholder="БИК"
                    />
                  </div>
                  <div className="form-group">
                    <label>Расчетный счет</label>
                    <input
                      type="text"
                      name="accountNumber"
                      value={sellerForm.accountNumber}
                      onChange={handleSellerInputChange}
                      placeholder="Расчетный счет"
                    />
                  </div>
                </div>

                <div className="seller-agreement">
                  <input type="checkbox" id="agreement" required />
                  <label htmlFor="agreement">
                    Я согласен с условиями оферты и подтверждаю достоверность предоставленных данных
                  </label>
                </div>

                <button type="submit" className="submit-seller-btn">
                  Отправить заявку
                </button>
              </form>
            )}
=======
            <div className="empty-state">
              <p>Заполните форму чтобы стать продавцом</p>
            </div>
>>>>>>> 5c0ad7cdce73cb99d468f0f9b95fe04e6c412adf
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="profile-page">
      <Header 
        title="ЛИЧНЫЙ КАБИНЕТ" 
        subtitle="" 
        backgroundImage="/images-main/profile-header.jpg" 
        showOverlay={false} 
      />
      
      <main className="profile-main">
        <div className="profile-container">
          <div className="profile-layout">
            <aside className="profile-menu">
              <div className="menu-items">
                <button 
                  className={`menu-item ${activeTab === 'profile' ? 'active' : ''}`}
                  onClick={() => handleTabChange('profile')}
                >
                  <svg width="20" height="20" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                  </svg>
                  Мои данные
                </button>
                
                <button 
                  className={`menu-item ${activeTab === 'orders' ? 'active' : ''}`}
                  onClick={() => handleTabChange('orders')}
                >
                  <svg width="20" height="20" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5z"/>
                  </svg>
                  Мои заказы
                </button>
                
                <button 
                  className={`menu-item ${activeTab === 'notifications' ? 'active' : ''}`}
                  onClick={() => handleTabChange('notifications')}
                >
                  <svg width="20" height="20" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z"/>
                  </svg>
                  Уведомления
                </button>
                
                <button 
                  className={`menu-item ${activeTab === 'favorites' ? 'active' : ''}`}
                  onClick={() => handleTabChange('favorites')}
                >
                  <svg width="20" height="20" viewBox="0 0 16 16" fill="currentColor">
                    <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
                  </svg>
                  Избранное
                  {favorites.length > 0 && <span className="menu-badge">{favorites.length}</span>}
                </button>
                
                <button 
                  className={`menu-item ${activeTab === 'seller' ? 'active' : ''}`}
                  onClick={() => handleTabChange('seller')}
                >
                  <svg width="20" height="20" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
                  </svg>
                  Стать продавцом
                </button>
              </div>

              <button className="logout-btn" onClick={handleLogout}>
                <svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor">
                  <path fillRule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"/>
                  <path fillRule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
                </svg>
                Выйти
              </button>
            </aside>

            <div className="profile-content-wrapper">
              <div className="profile-header">
                <div className="profile-header-left">
                  <button className="back-home-btn" onClick={handleGoHome}>
                    <svg width="20" height="20" viewBox="0 0 16 16" fill="currentColor">
                      <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
                    </svg>
                    На главную
                  </button>
                  <h1 className="profile-title">Личный кабинет</h1>
                </div>
                {activeTab === 'profile' && !isEditing && (
                  <button className="edit-btn desktop-edit" onClick={() => setIsEditing(true)}>
                    <svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor">
                      <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
                    </svg>
                    Изменить
                  </button>
                )}
                {activeTab === 'profile' && isEditing && (
                  <div className="edit-actions">
                    <button className="save-btn" onClick={handleSave}>Сохранить</button>
                    <button className="cancel-btn" onClick={() => setIsEditing(false)}>Отмена</button>
                  </div>
                )}
              </div>

              {renderContent()}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};