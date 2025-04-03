import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Product } from "../../types/Product";
import { fetchProducts } from "../../api/mockApi";
import ProductCard from "../products/ProductCard";

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  padding: 20px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    gap: 15px;
    padding: 15px;
  }

  @media (max-width: 480px) {
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
    gap: 10px;
    padding: 10px;
  }
`;

interface GridViewProps {
  storeId?: string;
  productIds?: string[];
  displayMode?: "default" | "compact" | "expanded";
}

const GridView: React.FC<GridViewProps> = ({
  storeId,
  productIds,
  displayMode = "default",
}) => {
  const [products, setProducts] = useState<Product[]>([]);
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

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>Erreur: {error}</div>;

  return (
    <GridContainer className={`grid-${displayMode}`}>
      {products.map((product: Product) => (
        <ProductCard
          key={product.id}
          product={product}
          displayMode={displayMode}
        />
      ))}
    </GridContainer>
  );
};

export default GridView;
