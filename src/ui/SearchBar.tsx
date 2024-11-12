import { useClickOutside } from "@/hooks/useClickOutSide";
import { ProductType } from "@/store/slices/productSlice";
import { useReduxSelector } from "@/store/store";
import { ElementRef, useRef, useState } from "react";
import { Link } from "react-router-dom";

export const SearchBar = () => {
  const products = useReduxSelector((state) => state.product.products);
  const searchBarRef = useRef<ElementRef<"input">>(null);
  const [filteredProducts, setFilteredProducts] = useState<
    (ProductType & { id: string })[]
  >([]);
  const searchHandler = (text: string) => {
    const searchText = text.trim().toLowerCase();
    if (searchText === "") {
      setFilteredProducts(products);
      return;
    }
    const regex = new RegExp(searchText, "ig");
    const filtered = products.filter((product) => {
      return regex.test(product.name);
    });
    setFilteredProducts(filtered.slice(0, 5));
  };
  const ref = useClickOutside(() => {
    if (searchBarRef?.current) {
      searchBarRef.current.value = "";
    }
    setFilteredProducts([]);
  });
  return (
    <div className=" relative mx-auto w-full max-w-[644px]">
      <div className="relative  w-full max-w-[644px]">
        <input
          ref={searchBarRef}
          onChange={(e) => {
            const text = e.target.value;
            searchHandler(text);
          }}
          className="px-2 placeholder:text-[12px] placeholder:text-gray-placeholder leading-[15px] rounded h-[44px] w-full border border-gray-border"
          placeholder="Search product by name"
        />
        <img
          className="size-4 absolute right-4 top-[14px]"
          src="/search_icon.svg"
          alt="search icon"
        />
      </div>
      {searchBarRef?.current?.value !== "" && filteredProducts.length > 0 && (
        <section
          ref={ref}
          className=" absolute top-full divide-y py-2 divide-gray-border z-50 left-0 w-full bg-white shadow rounded flex flex-col justify-center  px-4  mt-4"
        >
          {filteredProducts.map((product) => {
            return (
              <Link
                to={`/product/${product.id}`}
                key={product.id}
                className=" relative py-4 flex items-center"
              >
                <span className=" pl-2">{product.name}</span>
                <svg width="24" height="24" fill="none" viewBox="0 0 16 16">
                  <path
                    fill="#333"
                    d="M6.94 4 6 4.94 9.053 8 6 11.06l.94.94 4-4-4-4Z"
                  />
                </svg>

                <div className="  w-1 bg-primary absolute -left-2 top-1 bottom-1 " />
              </Link>
            );
          })}
        </section>
      )}
      {searchBarRef?.current?.value !== "" && filteredProducts.length == 0 && (
        <section
          ref={ref}
          className=" absolute top-full z-50 left-0 w-full bg-white shadow rounded flex flex-col justify-center py-8 px-4 gap-4 mt-4"
        >
          no search result
        </section>
      )}
    </div>
  );
};
