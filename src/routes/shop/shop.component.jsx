import { useContext } from "react";
import "./shop.styles.scss";
import { ProductsContext } from "../../contexts/products.context";
import ProductCard from "../../components/porduct-card/product-card.component";
const Shop = () => {
  const { products } = useContext(ProductsContext);
  return (
    <div className="products-container">
      {products.map((product) => (
        <ProductCard key={product.key} product={product} />
      ))}
    </div>
  );
};

export default Shop;
