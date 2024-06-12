import { routes } from "@/router";
import { Flex } from "antd";

import styles from "./navigation.module.scss";
import classNames from "classnames";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

const AuthNavigation = () => {
    const { t } = useTranslation();

    return (
        <Flex gap="1.5rem">
            <NavLink
                to={routes.auth.login}
                className={({ isActive }) =>
                    classNames(styles.navLink, { [styles.active]: isActive })
                }
            >
                {t("auth.login")}
            </NavLink>
            <NavLink
                to={routes.auth.signUp}
                className={({ isActive }) =>
                    classNames(styles.navLink, { [styles.active]: isActive })
                }
            >
                {t("auth.signup")}
            </NavLink>
            <NavLink
                to={routes.auth.verification}
                className={({ isActive }) =>
                    classNames(styles.navLink, { [styles.active]: isActive })
                }
            >
                {t("auth.verifyMail")}
            </NavLink>
        </Flex>
    );
};

export default AuthNavigation;
