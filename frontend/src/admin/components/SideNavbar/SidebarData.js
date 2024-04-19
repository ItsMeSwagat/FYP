import { IoIosArrowDropleftCircle } from "react-icons/io";
import {
  FaHome,
  FaProductHunt,
  FaArchive,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import { LuCreditCard } from "react-icons/lu";
import { MdSpaceDashboard, MdDataset } from "react-icons/md";
import { FaUsersRectangle } from "react-icons/fa6";
import { IoCreate } from "react-icons/io5";

export const SidebarData = [
  {
    title: "Dashboard",
    path: "/admin/dashboard",
    icon: <MdSpaceDashboard size={25} />,
  },
  {
    title: "Product",
    path: "",
    icon: <FaProductHunt size={25} />,
    iconClosed: <FaChevronDown />,
    iconOpened: <FaChevronUp />,
    subNav: [
      {
        title: "All Product",
        path: "/admin/products/all",
        icon: <MdDataset />,
      },
      {
        title: "Add Product",
        path: "/admin/product/create",
        icon: <IoCreate />,
      },
    ],
  },
  {
    title: "Order",
    path: "/admin/orders/all",
    icon: <FaArchive size={25} />,
    iconClosed: <FaChevronDown />,
    iconOpened: <FaChevronUp />,
  },
  {
    title: "Users",
    path: "/admin/users",
    icon: <FaUsersRectangle size={25} />,
    iconClosed: <FaChevronDown />,
    iconOpened: <FaChevronUp />,
  },
  {
    title: "Voucher",
    path: "",
    icon: <LuCreditCard size={25} />,
    iconClosed: <FaChevronDown />,
    iconOpened: <FaChevronUp />,
    subNav: [
      {
        title: "All Voucher",
        path: "/admin/allVouchers",
        icon: <MdSpaceDashboard />,
      },
      {
        title: "Add Voucher",
        path: "/admin/voucher/create",
        icon: <MdSpaceDashboard />,
      },
    ],
  },
  {
    title: "Reviews",
    path: "/admin/allProductReview",
    icon: <LuCreditCard size={25} />,
    iconClosed: <FaChevronDown />,
    iconOpened: <FaChevronUp />,
  },
];
