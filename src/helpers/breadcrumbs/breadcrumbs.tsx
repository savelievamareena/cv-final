import { PropsWithChildren, createContext, useCallback, useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { Breadcrumb } from "antd";
import { BreadcrumbItemType } from "antd/es/breadcrumb/Breadcrumb";
import { itemRender } from "./breadcrumbs.helpers";

import styles from "./breadcrumbs.module.scss";

const initialValue = {
    setPaths: (paths: BreadcrumbItemType[]) => {
        console.log(paths.length);
    },
};

export const BreadcrumbsContext = createContext(initialValue);

const BreadcrumbsProvider = ({ children }: PropsWithChildren) => {
    const [items, setItems] = useState<BreadcrumbItemType[]>([]);

    const setPaths = useCallback(
        (paths: BreadcrumbItemType[]) => {
            setItems(paths);
        },
        [setItems]
    );

    const contextValue = useMemo(() => ({ setPaths }), []);

    const location = useLocation();

    useEffect(() => {
        return () => setItems([]);
    }, [location.pathname]);

    return (
        <>
            <Breadcrumb
                className={styles.breadcrumb}
                itemRender={itemRender}
                separator=">"
                items={items}
            />
            <BreadcrumbsContext.Provider value={contextValue}>
                {children}
            </BreadcrumbsContext.Provider>
        </>
    );
};

export default BreadcrumbsProvider;
