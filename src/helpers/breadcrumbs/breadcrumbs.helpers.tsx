import { BreadcrumbProps } from "antd/es/breadcrumb/Breadcrumb";
import { NavLink } from "react-router-dom";

export const itemRender: BreadcrumbProps["itemRender"] = (item, _params, items) => {
    if (!item.href) return <span>{item.title}</span>;

    const isLast = item.href === items[items.length - 1].href;

    if (isLast) return <span>{item.title}</span>;

    return <NavLink to={item.href}>{item.title}</NavLink>;
};
