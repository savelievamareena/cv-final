import { useTranslation } from "react-i18next";

import { useGenericBreadcrumbs } from "@/hooks";
import { PositionsList } from "@/modules/positions";

const PositionsPage = () => {
    const { t } = useTranslation();

    useGenericBreadcrumbs(t("Positions"));

    return <PositionsList />;
};

export default PositionsPage;
