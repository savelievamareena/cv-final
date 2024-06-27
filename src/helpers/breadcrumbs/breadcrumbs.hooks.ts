import { BreadcrumbItemType } from "antd/es/breadcrumb/Breadcrumb";
import { useContext, useEffect } from "react";
import { BreadcrumbsContext } from "./breadcrumbs";

export const useBreadcrumbs = (items: BreadcrumbItemType[]) => {
    const { setPaths } = useContext(BreadcrumbsContext);

    useEffect(() => {
        setPaths(items);
    }, [items]);
};
