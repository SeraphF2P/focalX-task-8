import { useSearchParams } from "react-router-dom";

export const useModalIsOpen = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const key = "modal";
  const isOpen = searchParams.get(key) === "true";

  const setIsOpen = (val: boolean) => {
    const updatedParams = new URLSearchParams(searchParams);

    if (val) {
      updatedParams.set(key, "true");
    } else {
      updatedParams.delete(key);
    }
    setSearchParams(updatedParams);
  };

  return { isOpen, setIsOpen };
};
