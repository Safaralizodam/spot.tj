import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { axiosList } from '../../utils/axiosRequest/axiosRequest';
import StarIcon from '@mui/icons-material/Star';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const location = useLocation();
  const filter = new URLSearchParams(location.search).get('filter') || '';

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axiosList.get();
        setProducts(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const filteredProducts = products.filter(product =>
    filter === '' ||
    product.categori1 === filter ||
    product.categori2 === filter ||
    product.categori3 === filter
  );

  // Group products only by categori1
  const productsByCategory = filteredProducts.reduce((acc, product) => {
    if (!acc[product.categori1]) acc[product.categori1] = [];
    acc[product.categori1].push(product);
    return acc;
  }, {});

  if (loading) return <div className="text-center mt-10 text-gray-500">Loading...</div>;
  if (error) return <div className="text-center mt-10 text-red-500">Error: {error}</div>;

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow container mx-auto py-6 px-4">
        {/* Display the selected product at the top if available */}
        {selectedProduct && (
          <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg mb-8">
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 text-black">Душанбе › Поесть {selectedProduct?.name}</h1>
            <img
              src={selectedProduct.avatar}
              alt={selectedProduct.name}
              className="w-full h-auto mb-4"
            />
            <p className="text-lg mb-4 flex items-center"><StarIcon /> {selectedProduct.rating}</p>
            <div className='w-full flex flex-wrap justify-between mb-4'>
              <p className="p-2 rounded bg-slate-200 text-sm sm:text-base mb-2">{selectedProduct.categori1}</p>
              <p className="p-2 rounded bg-slate-200 text-sm sm:text-base mb-2">{selectedProduct.categori2}</p>
              <p className="p-2 rounded bg-slate-200 text-sm sm:text-base mb-2">{selectedProduct.categori3}</p>
            </div>
            <p className="text-lg mb-4"><strong>Location:</strong> {selectedProduct.location.latitude}, {selectedProduct.location.longitude}</p>
            <button
              onClick={() => setSelectedProduct(null)}
              className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
            >
              Back
            </button>
          </div>
        )}

        {/* List remaining filtered products */}
        <div>
          {Object.entries(productsByCategory).map(([category, categoryProducts]) => (
            <div key={category} className="mb-8">
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold pb-4">{category}</h2>
              <div className="flex flex-col space-y-4">
                {categoryProducts.map((product) => (
                  <button
                    key={product.id}
                    onClick={() => handleProductClick(product)}
                    className="w-full flex flex-col md:flex-row border rounded-lg shadow-lg overflow-hidden p-4 bg-white hover:bg-gray-100 transition duration-200"
                  >
                    <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-4">
                      <img
                        src={product.avatar}
                        alt={product.name}
                        className="w-full h-60 object-cover"
                      />
                    </div>
                    <div className="flex-grow text-start">
                      <h2 className="text-lg sm:text-xl md:text-2xl font-semibold pb-2">{product.name}</h2>
                      <p className=" text-lg text-gray-500 flex items-center mb-2"><StarIcon /> {product.rating}</p>
                      <div className='flex flex-wrap'>
                        <p className="p-2 rounded bg-gray-200 text-sm sm:text-base mb-2 m-[10px]">{product.categori1}</p>
                        <p className="p-2 rounded bg-gray-200 text-sm sm:text-base mb-2 m-[10px]">{product.categori2}</p>
                        <p className="p-2 rounded bg-gray-200 text-sm sm:text-base mb-2 m-[10px]">{product.categori3}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Products;
