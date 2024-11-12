import {
  createProductThunk,
  deleteProductThunk,
  getAllProductThunk,
  ProductType,
  ProductUpdateType,
  updateProductThunk,
} from "@/store/slices/productSlice";
import { useReduxDispatch, useReduxSelector } from "@/store/store";
import { Btn } from "@/ui/Btn";
import { ImageUploadField } from "@/ui/ImageUploadField";
import { Input } from "@/ui/Input";
import { Label } from "@/ui/Label";
import { Modal } from "@/ui/Modal";
import { Portal } from "@/ui/Portal";
import { FormEvent, MouseEventHandler, useState } from "react";

export const Create = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useReduxDispatch();
  const { loading } = useReduxSelector((state) => state.product.events.create);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const product = Object.fromEntries(formData.entries()) as ProductType;
    const res = await dispatch(createProductThunk(product));
    if (res.meta.requestStatus === "fulfilled") {
      await dispatch(getAllProductThunk());
    }
    setIsOpen(false);
  };

  return (
    <>
      <Btn
        className="  font-medium shrink-0 text-[14px] leading-[17px] w-[199px]"
        onClick={() => setIsOpen(true)}
      >
        ADD NEW PRODUCT
      </Btn>
      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <h2 className=" xl:mb-[59px]  text-4xl xl:mt-7 my-4 uppercase font-bold  text-center max-sm:text-3xl xl:text-[60px] xl:leader-[73px]">
          add new item
        </h2>
        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-col xl:gap-[86px] gap-8    items-center lg:items-start "
        >
          <div className="max-w-[415px] lg:max-w-full flex lg:gap-8    w-full lg:flex-row   flex-col gap-4 ">
            <div className=" max-w-[415px]  gap-8 max-lg:gap-4 flex flex-col w-full">
              <Input
                label={
                  <Label className=" mb-[10px] max-lg:mb-0 max-lg:text-lg font-medium text-[32px] leading-[39px]">
                    name
                  </Label>
                }
                name="name"
                type="text"
                placeholder="Enter the product Name"
              />
              <Input
                label={
                  <Label className=" mb-[10px] max-lg:mb-0 max-lg:text-lg font-medium text-[32px] leading-[39px]">
                    price
                  </Label>
                }
                name="price"
                type="number"
                placeholder="Enter the product Price"
                className=" w-full max-w-[415px]"
              />
            </div>
            <ImageUploadField
              wrapperClassName=" max-w-[547px]"
              className="w-full h-[209px] max-lg:h-40  max-w-[547px]"
              name="image"
              label={
                <Label className=" mb-[10px] max-lg:mb-0 max-lg:text-lg font-medium text-[32px] leading-[39px]">
                  image
                </Label>
              }
            />
          </div>
          <Btn
            disabled={loading}
            className=" lg:left-[36%] max-lg:mx-auto relative  px-4 font-medium shrink-0 xl:text-[32px] xl:h-[61px] xl:leading-[39px] w-28 xl:w-[199px]"
            type="submit"
          >
            save
          </Btn>
        </form>
      </Modal>
    </>
  );
};

export const Update = ({
  product,
}: {
  product: ProductType & { id: string };
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useReduxDispatch();
  const { loading } = useReduxSelector((state) => state.product.events.update);
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.stopPropagation();
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const updateProduct = Object.fromEntries(
      formData.entries()
    ) as ProductUpdateType;
    const res = await dispatch(
      updateProductThunk({
        id: product.id,
        ...updateProduct,
      })
    );
    if (res.meta.requestStatus === "fulfilled") {
      setIsOpen(false);
    }
  };

  return (
    <>
      <Btn
        className="w-[81px] max-xl:w-16 h-[34px] capitalize  font-medium shrink-0 text-[14px] leading-[17px] "
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(true);
        }}
      >
        Edit
      </Btn>
      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <h2 className="xl:mb-[59px]  text-4xl xl:mt-7 my-4 uppercase font-bold  text-center max-sm:text-3xl xl:text-[60px] xl:leader-[73px]">
          edit item
        </h2>
        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-col xl:gap-[86px] gap-8    items-center lg:items-start"
        >
          <div className="max-w-[415px] lg:max-w-full flex lg:gap-8    w-full lg:flex-row   flex-col gap-4  ">
            <div className=" max-w-[415px]  gap-8 max-lg:gap-4 flex flex-col w-full">
              <Input
                defaultValue={product.name}
                label={
                  <Label className=" mb-[10px] max-lg:mb-0 max-lg:text-lg font-medium text-[32px] leading-[39px]">
                    name
                  </Label>
                }
                name="name"
                type="text"
                placeholder="Enter the product Name"
              />
              <Input
                defaultValue={product.price}
                label={
                  <Label className=" mb-[10px] max-lg:mb-0 max-lg:text-lg font-medium text-[32px] leading-[39px]">
                    price
                  </Label>
                }
                name="price"
                type="number"
                placeholder="Enter the product Price"
                className=" w-full max-w-[415px]"
              />
            </div>
            <ImageUploadField
              preview={product.image_url}
              wrapperClassName=" max-w-[547px]"
              className="w-full h-[209px]  max-lg:h-40   max-w-[547px]"
              name="image"
              label={
                <Label className=" mb-[10px] max-lg:mb-0 max-lg:text-lg font-medium text-[32px] leading-[39px]">
                  image
                </Label>
              }
            />
          </div>
          <Btn
            disabled={loading}
            className=" lg:left-[36%] max-lg:mx-auto relative  px-4 font-medium shrink-0 xl:text-[32px] xl:h-[61px] xl:leading-[39px] w-28 xl:w-[199px]"
            type="submit"
          >
            save
          </Btn>
        </form>
      </Modal>
    </>
  );
};

export const Delete = ({ productId }: { productId: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useReduxDispatch();
  const { loading } = useReduxSelector((state) => state.product.events.delete);
  const handleDelete: MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.stopPropagation();
    const res = await dispatch(deleteProductThunk({ id: productId }));
    if (res.meta.requestStatus === "fulfilled") {
      setIsOpen(false);
    }
  };

  return (
    <>
      <Btn
        variant="secondary"
        className="w-[81px] max-xl:w-16 h-[34px]   font-medium shrink-0 text-[14px] leading-[17px]"
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(true);
        }}
      >
        Delete
      </Btn>
      {isOpen ? (
        <Portal>
          <section className=" fixed z-50 top-0 left-0 size-full flex justify-center items-center    ">
            <div
              onClick={(e) => {
                e.stopPropagation();
                setIsOpen(false);
              }}
              className="bg-black/50 cursor-not-allowed   backdrop-blur-[30px] absolute inset-0 "
            />
            <div className=" px-8 text-center flex items-center justify-center rounded-[20px] max-w-[948px]  w-full h-[321px] mx-4 bg-neutral-white  relative    ">
              <div className="gap-[100px] max-w-[628px] flex flex-col  justify-center  items-center   ">
                <p className=" uppercase font-semibold text-[22px] leading-[26.8px]">
                  Are you sure you want to delete the product?
                </p>
                <div className="flex w-full justify-between space-x-2 mt-4">
                  <Btn
                    className=" capitalize max-w-[199px] w-full h-[61px] font-medium text-[32px] leading-[39px]"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsOpen(false);
                    }}
                  >
                    Cancel
                  </Btn>
                  <Btn
                    disabled={loading}
                    className=" capitalize max-w-[199px] w-full h-[61px] font-medium text-[32px] leading-[39px]"
                    onClick={handleDelete}
                  >
                    Delete
                  </Btn>
                </div>
              </div>
            </div>
          </section>
        </Portal>
      ) : null}
    </>
  );
};
