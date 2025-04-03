import React from "react";
import styled from "styled-components";
import { Product } from "../../types/Product";

interface CardProps {
  displayMode?: "default" | "compact" | "expanded";
}

const Card = styled.div<CardProps>`
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;
  height: ${(props) => (props.displayMode === "compact" ? "300px" : "auto")};

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }

  @media (max-width: 768px) {
    height: ${(props) => (props.displayMode === "compact" ? "250px" : "auto")};
  }

  @media (max-width: 480px) {
    height: ${(props) => (props.displayMode === "compact" ? "220px" : "auto")};
  }
`;

const ImageContainer = styled.div<CardProps>`
  height: ${(props) => {
    if (props.displayMode === "compact") return "150px";
    if (props.displayMode === "expanded") return "250px";
    return "200px";
  }};
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s;
  }

  ${Card}:hover & img {
    transform: scale(1.05);
  }

  @media (max-width: 768px) {
    height: ${(props) => {
      if (props.displayMode === "compact") return "120px";
      if (props.displayMode === "expanded") return "200px";
      return "150px";
    }};
  }

  @media (max-width: 480px) {
    height: ${(props) => {
      if (props.displayMode === "compact") return "100px";
      if (props.displayMode === "expanded") return "150px";
      return "120px";
    }};
  }
`;

const ContentContainer = styled.div`
  padding: 15px;

  @media (max-width: 480px) {
    padding: 10px;
  }
`;

const ProductName = styled.h3<CardProps>`
  margin: 0 0 10px 0;
  font-size: ${(props) => (props.displayMode === "compact" ? "16px" : "18px")};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  @media (max-width: 480px) {
    font-size: ${(props) =>
      props.displayMode === "compact" ? "14px" : "16px"};
    margin-bottom: 5px;
  }
`;

const ProductPrice = styled.div<CardProps>`
  font-weight: bold;
  font-size: ${(props) => (props.displayMode === "compact" ? "14px" : "16px")};
  color: #4a4a4a;

  @media (max-width: 480px) {
    font-size: ${(props) =>
      props.displayMode === "compact" ? "12px" : "14px"};
  }
`;

const ProductCategory = styled.div<CardProps>`
  display: ${(props) =>
    props.displayMode === "compact" ? "none" : "inline-block"};
  font-size: 12px;
  background: #f1f1f1;
  color: #666;
  padding: 3px 8px;
  border-radius: 4px;
  margin-top: 10px;

  @media (max-width: 480px) {
    font-size: 10px;
    padding: 2px 6px;
  }
`;

const ButtonContainer = styled.div<CardProps>`
  padding: 0 15px 15px;
  display: ${(props) => (props.displayMode === "compact" ? "none" : "block")};

  @media (max-width: 480px) {
    padding: 0 10px 10px;
  }
`;

const BuyButton = styled.button`
  background: #4caf50;
  color: white;
  border: none;
  width: 100%;
  padding: 10px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;

  &:hover {
    background: #45a049;
  }

  @media (max-width: 480px) {
    padding: 8px;
    font-size: 12px;
  }
`;

interface ProductCardProps {
  product: Product;
  displayMode?: "default" | "compact" | "expanded";
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  displayMode = "default",
}) => {
  return (
    <Card displayMode={displayMode}>
      <ImageContainer displayMode={displayMode}>
        <img
          src={product.imageUrl || "/placeholder-image.png"}
          alt={product.name}
        />
      </ImageContainer>

      <ContentContainer>
        <ProductName displayMode={displayMode}>{product.name}</ProductName>
        <ProductPrice displayMode={displayMode}>
          {product.price} {product.currency}
        </ProductPrice>
        <ProductCategory displayMode={displayMode}>
          {product.category}
        </ProductCategory>
      </ContentContainer>

      <ButtonContainer displayMode={displayMode}>
        <BuyButton>Acheter</BuyButton>
      </ButtonContainer>
    </Card>
  );
};

export default ProductCard;
