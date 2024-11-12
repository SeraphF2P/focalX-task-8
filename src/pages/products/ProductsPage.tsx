import { useViewportWidth } from "@/hooks/useViewportWidth";
import { getAllProductThunk } from "@/store/slices/productSlice";
import { useReduxDispatch, useReduxSelector } from "@/store/store";
import { Loading } from "@/ui/Loading";
import { Pagination } from "@/ui/Pagination";
import { SearchBar } from "@/ui/SearchBar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as ProductForm from "./components/ProductForm";

export const ProductsPage = () => {
  const { viewportWidth } = useViewportWidth();
  const limit = viewportWidth > 1280 ? 8 : viewportWidth > 1024 ? 6 : 4;
  const [currentPageNum, setCurrentPageNum] = useState(1);
  const dispatch = useReduxDispatch();
  const { products, loading } = useReduxSelector((state) => state.product);
  useEffect(() => {
    dispatch(getAllProductThunk());
  }, [dispatch]);
  const navigate = useNavigate();
  return (
    <section className="relative py-8 h-full  w-full px-4 xl:px-[109px] flex flex-col items-end gap-4 justify-center">
      <SearchBar />
      <ProductForm.Create />
      {loading ? (
        <Loading />
      ) : (
        <>
          <section className="gap-[40px] h-full  max-lg:gap-4   w-full xl:grid-cols-4 xl:grid-rows-[repeat(2,188px)]     overflow-hidden grid grid-cols-2 lg:grid-cols-3 grid-rows-2">
            {products
              .slice((currentPageNum - 1) * limit, currentPageNum * limit)
              .map((product) => (
                <div
                  key={product.id}
                  className="group cursor-pointer  size-36 md:size-40 mx-auto relative xl:size-[208px] rounded-2xl bg-white overflow-hidden custom-drop-shadow"
                >
                  <span className="sr-only">go to {product.name} page</span>
                  <img
                    className="absolute inset-0 h-full max-h-full   mx-auto   mix-blend-darken "
                    src={product.image_url ?? "/product_placeholder.svg"}
                    alt={`${product.name} product image`}
                  />
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/product/${product.id}`);
                    }}
                    className="absolute opacity-0 group-hover:opacity-100 transition-opacity bg-[#F2EAE1]/70 flex justify-center items-center inset-0 size-full"
                  >
                    <div className="w-[170px] flex-col h-[103px] flex justify-between text-center items-center">
                      <h3 className="font-medium max-lg:text-lg text-[30px] leading-[36.5px]">
                        {product.name}
                      </h3>
                      <div className="flex gap-2">
                        <ProductForm.Update product={product} />
                        <ProductForm.Delete productId={product.id} />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </section>
          <Pagination
            currentPage={currentPageNum}
            onPageChange={(page) => setCurrentPageNum(page)}
            totalPages={Math.ceil(products.length / limit)}
          />
        </>
      )}
    </section>
  );
};
