import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Product } from "../../types/Product";
import { fetchProducts } from "../../api/mockApi";

interface CarouselContainerProps {
  displayMode?: "default" | "compact" | "expanded";
}

const CarouselContainer = styled.div<CarouselContainerProps>`
  max-width: ${(props) =>
    props.displayMode === "expanded" ? "1000px" : "800px"};
  margin: 0 auto;
  position: relative;

  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

const CarouselSlide = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px;

  @media (max-width: 768px) {
    padding: 15px;
  }

  @media (max-width: 480px) {
    padding: 10px;
  }
`;

const NavigationButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.5);
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  color: white;
  font-size: 20px;
  cursor: pointer;
  z-index: 2;

  &:hover {
    background: rgba(0, 0, 0, 0.8);
  }

  &.prev {
    left: 10px;
  }

  &.next {
    right: 10px;
  }

  @media (max-width: 768px) {
    width: 35px;
    height: 35px;
    font-size: 18px;
  }

  @media (max-width: 480px) {
    width: 30px;
    height: 30px;
    font-size: 16px;
  }
`;

interface ProductDetailsProps {
  displayMode?: "default" | "compact" | "expanded";
}

const ProductDetails = styled.div<ProductDetailsProps>`
  text-align: center;
  max-width: ${(props) => {
    if (props.displayMode === "compact") return "400px";
    if (props.displayMode === "expanded") return "800px";
    return "600px";
  }};
  
  img {
    max-width: 100%;
    max-height: ${(props) => {
      if (props.displayMode === "compact") return "200px";
      if (props.displayMode === "expanded") return "400px";
      return "300px";
    }};
    object-fit: contain;
  }
  
  h2 {
    margin: 10px 0;
    font-size: ${(props) =>
      props.displayMode === "compact" ? "20px" : "24px"};
  }
  
  .price {
    font-size: ${(props) =>
      props.displayMode === "compact" ? "18px" : "20px"};
    font-weight: bold;
    color: #4a4a4a
    font-size: ${(props) =>
      props.displayMode === "compact" ? "18px" : "20px"};
    font-weight: bold;
    color: #4a4a4a;
  }
  
  .description {
    margin: 15px 0;
    display: ${(props) => (props.displayMode === "compact" ? "none" : "block")};
  }
  
  button {
    background: #4CAF50;
    border: none;
    padding: 10px 20px;
    color: white;
    border-radius: 4px;
    cursor: pointer;
    display: ${(props) => (props.displayMode === "compact" ? "none" : "block")};
    margin: 0 auto;
  }
  
  @media (max-width: 768px) {
    h2 {
      font-size: ${(props) =>
        props.displayMode === "compact" ? "18px" : "20px"};
    }
    
    .price {
      font-size: ${(props) =>
        props.displayMode === "compact" ? "16px" : "18px"};
    }
    
    button {
      padding: 8px 16px;
    }
  }
  
  @media (max-width: 480px) {
    h2 {
      font-size: ${(props) =>
        props.displayMode === "compact" ? "16px" : "18px"};
    }
    
    .price {
      font-size: ${(props) =>
        props.displayMode === "compact" ? "14px" : "16px"};
    }
    
    .description {
      font-size: 14px;
    }
    
    button {
      padding: 6px 12px;
      font-size: 14px;
    }
  }
`;

interface CarouselViewProps {
  storeId?: string;
  productIds?: string[];
  displayMode?: "default" | "compact" | "expanded";
}

const CarouselView: React.FC<CarouselViewProps> = ({
  storeId,
  productIds,
  displayMode = "default",
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const data = await fetchProducts(storeId);

        // Filtrer par productIds si spécifiés
        const filteredData = productIds
          ? data.filter((product) => productIds.includes(product.id))
          : data;

        setProducts(filteredData);
        setCurrentIndex(0); // Réinitialiser l'index lorsque les produits changent
        setError(null);
      } catch (err) {
        setError("Erreur lors du chargement des produits");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [storeId, productIds]);

  const goToPrevious = () => {
    const newIndex =
      currentIndex === 0 ? products.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const newIndex =
      currentIndex === products.length - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>Erreur: {error}</div>;
  if (products.length === 0) return <div>Aucun produit disponible</div>;

  const currentProduct = products[currentIndex];

  return (
    <CarouselContainer displayMode={displayMode}>
      <NavigationButton className="prev" onClick={goToPrevious}>
        &#8249;
      </NavigationButton>

      <CarouselSlide>
        <ProductDetails displayMode={displayMode}>
          <img src={currentProduct.imageUrl} alt={currentProduct.name} />
          <h2>{currentProduct.name}</h2>
          <div className="price">
            {currentProduct.price} {currentProduct.currency}
          </div>
          <p className="description">{currentProduct.description}</p>
          <button>Acheter</button>
        </ProductDetails>
      </CarouselSlide>

      <NavigationButton className="next" onClick={goToNext}>
        &#8250;
      </NavigationButton>
    </CarouselContainer>
  );
};

export default CarouselView;
