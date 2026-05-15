import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../../widgets/header';
import { Footer } from '../../widgets/footer/ui/Footer';
import { useAuth } from '../../app/providers/AuthProvider';
import { getProductsByBrand, addProduct, updateProduct, deleteProduct, getProducts } from '../../shared/data/products';
import { Product } from '../../shared/types';
import './AdminPanel.css';

export const AdminPanel: React.FC = () => {
  const navigate = useNavigate();
  const { user, isBrandAdmin, isAdmin, isLoading } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    price: '',
    image: '',
    description: '',
    category: ''
  });

  useEffect(() => {
    if (!isLoading && !isBrandAdmin && !isAdmin) {
      navigate('/');
      return;
    }
    loadProducts();
  }, [isLoading, isBrandAdmin, isAdmin, navigate]);

  const loadProducts = () => {
    setLoading(true);
    let brandProducts: Product[] = [];
    
    if (isAdmin) {
      brandProducts = getProducts();
    } else if (user?.brandId) {
      brandProducts = getProductsByBrand(user.brandId);
    }
    
    setProducts(brandProducts);
    setLoading(false);
  };

  const stats = {
    total: products.length,
    categories: products.filter((v, i, a) => a.findIndex(t => t.category === v.category) === i).length,
    brands: products.filter((v, i, a) => a.findIndex(t => t.brand === v.brand) === i).length,
    avgPrice: Math.round(products.reduce((sum, p) => sum + p.price, 0) / (products.length || 1))
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddProduct = () => {
    setEditingProduct(null);
    setFormData({
      name: '',
      brand: user?.brandId?.toUpperCase() || '',
      price: '',
      image: '',
      description: '',
      category: ''
    });
    setShowForm(true);
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      brand: product.brand,
      price: product.price.toString(),
      image: product.image,
      description: product.description,
      category: product.category
    });
    setShowForm(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const productData = {
      name: formData.name,
      brand: formData.brand,
      price: parseInt(formData.price),
      image: formData.image || '/images-main/default-product.jpg',
      description: formData.description,
      category: formData.category
    };

    if (editingProduct) {
      updateProduct(editingProduct.id, productData);
    } else {
      addProduct(productData);
    }

    loadProducts();
    setShowForm(false);
  };

  const handleDeleteProduct = (id: string) => {
    if (window.confirm('Вы уверены, что хотите удалить этот товар?')) {
      deleteProduct(id);
      loadProducts();
    }
  };

  if (isLoading || loading) {
    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>Загрузка...</div>;
  }

  if (!isBrandAdmin && !isAdmin) {
    return null;
  }

  return (
    <div className="admin-panel">
      <Header title="АДМИН ПАНЕЛЬ" subtitle="Управление товарами" showOverlay={false} />
      
      <main className="admin-main">
        <div className="admin-container">
          <div className="admin-stats">
            <div className="stat-card">
              <div className="stat-info">
                <h3>Всего товаров</h3>
                <div className="stat-number">{stats.total}</div>
              </div>
              <div className="stat-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="7" width="20" height="14" rx="2" />
                  <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                </svg>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-info">
                <h3>Категории</h3>
                <div className="stat-number">{stats.categories}</div>
              </div>
              <div className="stat-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 7h-4.18A3 3 0 0 0 16 5.18V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v1.18A3 3 0 0 0 8.18 7H4" />
                  <path d="M4 7v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7" />
                </svg>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-info">
                <h3>Бренды</h3>
                <div className="stat-number">{stats.brands}</div>
              </div>
              <div className="stat-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2a10 10 0 1 0 10 10 10 10 0 0 0-10-10z" />
                  <path d="M12 6v6l4 2" />
                </svg>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-info">
                <h3>Средняя цена</h3>
                <div className="stat-number">{stats.avgPrice.toLocaleString()} ₽</div>
              </div>
              <div className="stat-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2v20M17 7H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              </div>
            </div>
          </div>

          <div className="admin-header">
            <div>
              <h1>Управление товарами</h1>
              <div className="brand-badge">
                {isAdmin ? 'Все бренды' : `Бренд: ${user?.brandId?.toUpperCase()}`}
              </div>
            </div>
            <button className="add-product-btn" onClick={handleAddProduct}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 5v14M5 12h14" />
              </svg>
              Добавить товар
            </button>
          </div>

          {showForm && (
            <div className="product-form">
              <h2>{editingProduct ? 'Редактировать товар' : 'Новый товар'}</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-grid">
                  <div className="form-group">
                    <label>Название *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      placeholder="Введите название товара"
                    />
                  </div>
                  <div className="form-group">
                    <label>Бренд *</label>
                    <input
                      type="text"
                      name="brand"
                      value={formData.brand}
                      onChange={handleInputChange}
                      required
                      disabled={!isAdmin}
                      placeholder="Название бренда"
                    />
                  </div>
                  <div className="form-group">
                    <label>Цена *</label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      required
                      placeholder="0 ₽"
                    />
                  </div>
                  <div className="form-group">
                    <label>Категория *</label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Выберите категорию</option>
                      <option value="ФУТБОЛКИ">ФУТБОЛКИ</option>
                      <option value="ЗИПКИ">ЗИПКИ</option>
                      <option value="СВИТЕРЫ">СВИТЕРЫ</option>
                      <option value="ШТАНЫ">ШТАНЫ</option>
                      <option value="КУРТКИ">КУРТКИ</option>
                      <option value="АКССЕСУАРЫ">АКССЕСУАРЫ</option>
                    </select>
                  </div>
                  <div className="form-group full-width">
                    <label>URL изображения</label>
                    <input
                      type="text"
                      name="image"
                      value={formData.image}
                      onChange={handleInputChange}
                      placeholder="/images-main/product.jpg"
                    />
                  </div>
                  <div className="form-group full-width">
                    <label>Описание</label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows={3}
                      placeholder="Описание товара..."
                    />
                  </div>
                </div>
                <div className="form-actions">
                  <button type="submit" className="save-btn">
                    {editingProduct ? 'Сохранить изменения' : 'Добавить товар'}
                  </button>
                  <button type="button" className="cancel-btn" onClick={() => setShowForm(false)}>
                    Отмена
                  </button>
                </div>
              </form>
            </div>
          )}

          <div className="products-list">
            <h2>Товары</h2>
            {products.length === 0 ? (
              <div className="empty-state">
                <p>Нет товаров. Нажмите "Добавить товар" чтобы создать первый товар.</p>
              </div>
            ) : (
              <table className="products-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Изображение</th>
                    <th>Название</th>
                    <th>Бренд</th>
                    <th>Цена</th>
                    <th>Категория</th>
                    <th>Действия</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map(product => (
                    <tr key={product.id}>
                      <td>{product.id}</td>
                      <td>
                        <img src={product.image} alt={product.name} className="product-thumb" />
                      </td>
                      <td>{product.name}</td>
                      <td>{product.brand}</td>
                      <td>{product.price.toLocaleString()} ₽</td>
                      <td>{product.category}</td>
                      <td>
                        <button className="edit-btn" onClick={() => handleEditProduct(product)}>
                          Редактировать
                        </button>
                        <button className="delete-btn" onClick={() => handleDeleteProduct(product.id)}>
                          Удалить
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};