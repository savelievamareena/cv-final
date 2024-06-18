import { useTranslation } from "react-i18next";

import { PositionsList } from "@/modules/positions";
import { useGenericBreadcrumbs } from "@/hooks";

const PositionsPage = () => {
    const { t } = useTranslation();

    useGenericBreadcrumbs(t("Positions"));

    return <PositionsList />;
};

export default PositionsPage;
