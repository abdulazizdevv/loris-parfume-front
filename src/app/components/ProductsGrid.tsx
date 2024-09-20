import Link from "next/link";
import { Row, Col } from "antd";
import { IProduct } from "@/services/products";
import { ProductCard } from "@/app/components/ProductCard";
import { AnimatedButton } from "./AnimatedButton";
import { Spinner } from "@chakra-ui/react";
import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

interface ProductsGridProps {
  products: IProduct[];
  collectionSlug?: string;
  categorySlug?: string;
  isLoading: boolean;
  loadMore: () => void;
  hasMore?: boolean;
  totalProducts: number;
}

export const ProductsGrid = ({
  products,
  collectionSlug,
  categorySlug,
  isLoading,
  loadMore,
  hasMore,
  totalProducts,
}: ProductsGridProps) => {
  const allItemsLoaded = products.length >= totalProducts;
  const scrollPositionRef = useRef<number>(0);
  const { t } = useTranslation("common");

  const handleLoadMore = () => {
    scrollPositionRef.current = window.scrollY;
    loadMore();
  };

  useEffect(() => {
    if (!isLoading) {
      window.scrollTo(0, scrollPositionRef.current);
    }
  }, [isLoading]);

  return (
    <>
      <Row className="md:px-3" gutter={[20, 20]}>
        {products.map((product: IProduct) => {
          return (
            <Col key={product.id} xs={12} sm={12} md={8} lg={8} xl={8}>
              <ProductCard
                product={product}
                collectionSlug={collectionSlug}
                categorySlug={categorySlug}
              />
            </Col>
          );
        })}
      </Row>

      <div className="text-center my-8">
        <p className="text-sm text-[#454545] mb-4">
          {t("showingItems", {
            current: products.length,
            total: totalProducts,
          })}
        </p>
        {allItemsLoaded ? (
          <p className="text-xs text-[#454545]">{t("allItemsLoaded")}</p>
        ) : (
          hasMore && (
            <>
              {isLoading ? (
                <div className="w-full flex justify-center py-4">
                  <Spinner size="lg" color="#87754f" />
                </div>
              ) : (
                <AnimatedButton
                  title={t("loadMore")}
                  variant="dark"
                  width="w-full sm:w-[300px]"
                  onClick={handleLoadMore}
                />
              )}
            </>
          )
        )}
      </div>
    </>
  );
};
