import { useMetaContext } from "@/context";
import { NotificationBing } from "iconsax-react";

export function Header() {
  const appMetaData = useMetaContext();

  // const menuRight = useRef<Menu>(null);
  // const items: MenuItem[] = [
  //   {
  //     items: [
  //       {
  //         label: "Logout",
  //         icon: "pi pi-sign-out",
  //         command: () => console.log("Logged out"),
  //       },
  //     ],
  //   },
  // ];

  return (
    <div className="flex flex-row h-28 items-center justify-between border-b-[1px] border-neutral-20 p-10 sticky top-0 z-50 bg-white">
      <div className="context text-3xl text-secondary-bleu-100 leading-lg">
        {appMetaData.title}
      </div>
      <div className="space-x-4 flex flex-row items-center">
        <NotificationBing className="w-6 h-6 text-secondary-bleu-60" />
        {/* <Avatar
          className="w-8"
          image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png"
          shape="circle"
          onClick={(event) => menuRight.current?.toggle(event)}
          aria-controls="popup_menu_right"
          aria-haspopup
        />
        <Menu
          model={items}
          popup
          ref={menuRight}
          id="popup_menu_right"
          className="w-40 bg-gray-100 !border-0 shadow-none"
          popupAlignment="right"
        /> */}
      </div>
    </div>
  );
}
