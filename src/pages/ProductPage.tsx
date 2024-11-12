import { getProductThunk } from "@/store/slices/productSlice";
import { useReduxDispatch, useReduxSelector } from "@/store/store";
import { Loading } from "@/ui/Loading";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const ProductPage = () => {
  const navigate = useNavigate();
  const params = useParams();
  const productId = params.id;

  const dispatch = useReduxDispatch();
  useEffect(() => {
    if (productId == null) return;
    dispatch(getProductThunk({ id: productId }));
  }, [dispatch, productId]);

  const { product, loading } = useReduxSelector((state) => state.product);
  const formatDate = (value: string) => {
    const date = new Date(value);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };
  return (
    <section className="  bg-white grid  w-full max-lg:px-8 lg:px-[64px]   ">
      {loading && <Loading />}
      {!loading && product && (
        <div className=" flex flex-col lg:items-start max-lg:justify-around   items-center   h-full relative  md:pl-[277px]   md:pt-28 md:mt-0  px-8 lg:mx-[53px]">
          <button
            className=" max-lg:size-6  size-10 absolute max-md:left-4 max-md:top-4 top-6 md:left-[calc(277px_+_24px)] lg:left-[calc(277px_+_64px)]"
            onClick={() => navigate(-1)}
          >
            <img src="/backButton.svg" />
          </button>
          <h2 className="  lg:mt-7  my-4 uppercase font-bold  max-lg:text-center max-lg:text-3xl text-[60px] leader-[73px]">
            {product?.name}
          </h2>
          <div className=" w-full h-72 lg:h-[373px] max-md:h-40  max-lg:h-60 overflow-hidden   ">
            <img
              className="   h-full max-h-full mx-auto  "
              src={product?.image_url ?? "/product_placeholder.svg"}
              alt={`${product?.name} image`}
            />
          </div>
          <div className=" py-8  flex flex-col gap-8 w-full">
            <div className="flex flex-col gap-8 md:flex-row md:justify-between w-full">
              <span className=" flex gap-6 items-end ">
                <p className=" capitalize font-bold  max-lg:text-3xl text-[60px] leading-[73px]">
                  price:
                </p>
                <p className="max-lg:text-lg max-lg:leading-7 max-lg:h-7 text-[40px]   text-[#808080]/55 max-md:text-2xl   font-medium leading-[48.7px]   h-[48.7px] ">
                  {`${product?.price}$`}
                </p>
              </span>

              <span className=" flex gap-6 items-end  ">
                <p className=" capitalize font-bold  max-lg:text-3xl text-[60px] leading-[73px]">
                  added at:
                </p>
                <p className="max-lg:text-lg max-lg:leading-7 max-lg:h-7 text-[40px]   text-[#808080]/55 max-md:text-2xl   font-medium leading-[48.7px]   h-[48.7px] ">
                  {formatDate(product.created_at)}
                </p>
              </span>
            </div>
            <span className="  flex gap-6 items-end max-md:m-0 mx-auto ">
              <p className=" capitalize font-bold  max-lg:text-3xl text-[60px] leading-[73px]">
                updated at:
              </p>
              <p className="max-lg:text-lg max-lg:leading-7 max-lg:h-7 text-[40px]   text-[#808080]/55 max-md:text-2xl   font-medium leading-[48.7px]   h-[48.7px] ">
                {formatDate(product.updated_at)}
              </p>
            </span>
          </div>
        </div>
      )}
    </section>
  );
};
