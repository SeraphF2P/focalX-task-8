import { ReactNode } from "react";
import { Portal } from "./Portal";
type ModalPropsType = {
  children?: ReactNode;
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
};
export const Modal = ({ children, isOpen, setIsOpen }: ModalPropsType) => {
  return (
    <>
      {isOpen ? (
        <Portal>
          <section
            onClick={(e) => {
              e.stopPropagation();
            }}
            className="z-30 fixed top-0 left-0 size-full  bg-white  "
          >
            <div className=" flex flex-col lg:items-start  items-center   h-full relative mt-28 md:pl-[277px]   md:pt-28 md:mt-0  px-8 lg:mx-[53px]">
              {children}
              <button
                className=" max-sm:size-6  size-10 absolute max-md:left-4 max-md:top-4 top-6 md:left-[calc(277px_+_24px)] lg:left-[calc(277px_+_64px)]"
                onClick={() => setIsOpen(false)}
              >
                <img src="/backButton.svg" />
              </button>
            </div>
          </section>
        </Portal>
      ) : null}
    </>
  );
};
