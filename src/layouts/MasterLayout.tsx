import { NavLink, Outlet } from "react-router-dom";
import { cn } from "../lib/cn";
import { useReduxDispatch, useReduxSelector } from "../store/store";
import { Avatar } from "../ui/Avatar";
import { Logo } from "../ui/Logo";
import { logOutUser } from "@/store/slices/authSlice";

export const MasterLayout = () => {
  const dispatch = useReduxDispatch();
  const user = useReduxSelector((state) => state.auth.user);
  return (
    <>
      <header className=" fixed top-0 z-40 left-0 w-full  md:w-[277px] bg-[#F2EAE1] ">
        <div className=" max-md:container md:justify-between md:h-screen md:py-8 max-md:mx-auto px-4 max-md:h-28  py-2 flex flex-col justify-between">
          <div className="flex md:gap-8 justify-between md:flex-col md:pb-8  items-center  ">
            <div className="relative">
              <span className=" max-md:hidden absolute -left-3 top-0 h-full w-1 bg-primary" />
              <Logo className=" max-md:w-20 md:h-[23px] md:w-[85px]" />
            </div>
            <Avatar
              className=" bg-primary size-12 md:size-32"
              src={user?.profile_image_url}
            />
            <p className=" font-bold text-[17px]  leading-[21px] ">
              {user?.first_name + " " + user?.last_name}
            </p>
          </div>
          <ul className=" md:justify-start md:flex-1 md:gap-4  max-md:h-10 md:flex-col max-md:divide-x-2 max-md:divide-gray-border flex justify-between  w-full">
            <li className=" max-md:flex-1  ">
              <NavLink
                className={({ isActive }) =>
                  cn(
                    " h-[41px] flex rounded gap-2  justify-center items-center capitalize text-[14px]  font-medium leading-[17px]",
                    {
                      "bg-primary": isActive,
                    }
                  )
                }
                to={"/"}
              >
                <img className=" size-6" src="/products_icon.svg" />
                <span className="sr-only md:not-sr-only">products</span>
              </NavLink>
            </li>
            <li className=" max-md:flex-1  ">
              <NavLink
                className={({ isActive }) =>
                  cn(
                    " h-[41px] flex rounded gap-2  justify-center items-center capitalize text-[14px]  font-medium leading-[17px]",
                    {
                      "bg-primary": isActive,
                    }
                  )
                }
                to={"/order-list"}
              >
                <img className=" size-6" src="/placeholder.svg" />
                <span className="sr-only md:not-sr-only">order list</span>
              </NavLink>
            </li>
            <li className=" max-md:flex-1  ">
              <NavLink
                className={({ isActive }) =>
                  cn(
                    " h-[41px] flex rounded gap-2  justify-center items-center capitalize text-[14px]  font-medium leading-[17px]",
                    {
                      "bg-primary": isActive,
                    }
                  )
                }
                to={"/favorites"}
              >
                <img className=" size-6" src="/placeholder.svg" />
                <span className="sr-only md:not-sr-only">favorites</span>
              </NavLink>
            </li>
            <li className=" max-md:flex-1  md:mt-auto ">
              <button
                onClick={() => dispatch(logOutUser())}
                className={cn(
                  " h-[41px] flex rounded gap-2  m-auto justify-center items-center capitalize text-[14px]  font-medium leading-[17px]"
                )}
              >
                <span className="sr-only md:not-sr-only">logout</span>
                <img
                  className="  max-md:size-6 size-[17px]"
                  src="/sign-out-alt 1.svg"
                />
              </button>
            </li>
          </ul>
        </div>
      </header>
      <main className="flex relative  h-screen   max-lg:pt-28 md:pt-0  md:pl-[277px]  bg-neutral-white">
        <Outlet />
      </main>
    </>
  );
};
