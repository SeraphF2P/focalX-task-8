import {
  ChangeEvent,
  ComponentPropsWithoutRef,
  ReactNode,
  useState,
} from "react";
import { cn } from "../lib/cn";

type ImageUploadFieldProps = ComponentPropsWithoutRef<"input"> & {
  label?: ReactNode;
  wrapperClassName?: string;
};

export const ProfileImageUpload = ({
  className,
  wrapperClassName,
  label,
  defaultValue,
  ...props
}: ImageUploadFieldProps) => {
  const [selectedImage, setSelectedImage] = useState(defaultValue ?? null);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  if (selectedImage == null && defaultValue) {
    setSelectedImage(defaultValue);
  }
  return (
    <div
      className={cn(
        " flex   flex-col justify-end gap-[6px] w-full      ",
        wrapperClassName
      )}
    >
      {label ? label : <></>}
      <div
        className={cn(
          "size-[100px]  relative border border-dashed overflow-hidden  bg-[#F8F8FF] border-[#384EB7]/30 rounded",
          className
        )}
      >
        {selectedImage ? (
          <img
            src={`${selectedImage}`}
            alt="Selected"
            className="  absolute inset-0  size-full object-cover rounded "
          />
        ) : (
          <div className="border  pointer-events-none border-dashed flex flex-col justify-center items-center rounded bg-[#F8F8FF] border-[#384EB7]/30 absolute inset-0">
            <img
              className=" w-[40%] h-[36%]  "
              src="/Upload icon.svg"
              alt="Upload icon"
            />
          </div>
        )}
        <input
          {...props}
          type="file"
          className="  absolute opacity-0  inset-0 "
          onChange={handleChange}
        />
      </div>
    </div>
  );
};
