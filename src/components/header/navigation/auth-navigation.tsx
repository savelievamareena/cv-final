import { Flex } from "antd";
import classNames from "classnames";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";

import styles from "./navigation.module.scss";
import { routes } from "@/router";

const AuthNavigation = () => {
    const { t } = useTranslation();

    return (
        <Flex gap="1.5rem" align="center">
            <NavLink
                to={routes.auth.login}
                className={({ isActive }) =>
                    classNames(styles.navLink, { [styles.active]: isActive })
                }
            >
                <span>{t("auth.login")}</span>
            </NavLink>
            <NavLink
                to={routes.auth.signUp}
                className={({ isActive }) =>
                    classNames(styles.navLink, { [styles.active]: isActive })
                }
            >
                <span>{t("auth.signup")}</span>
            </NavLink>
            <NavLink
                to={routes.auth.verification}
                className={({ isActive }) =>
                    classNames(styles.navLink, { [styles.active]: isActive })
                }
            >
                <span>{t("auth.verifyMail")}</span>
            </NavLink>
        </Flex>
    );
};

export default AuthNavigation;
