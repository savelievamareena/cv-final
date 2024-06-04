import { NavLink, useParams } from "react-router-dom";
import classNames from "classnames";
import { RouteParams, routes } from "@/router";

import styles from "./nav-panel.module.scss";

export const NavPanel = () => {
    const { [RouteParams.UserId]: userId } = useParams();

    if (!userId) return <></>;

    return (
        <nav className={styles.navPanel}>
            <NavLink
                className={({ isActive }) =>
                    classNames(styles.navLink, { [styles.navLink_active]: isActive })
                }
                to={routes.users.profile(userId)}
            >
                Profile
            </NavLink>
            <NavLink
                className={({ isActive }) =>
                    classNames(styles.navLink, { [styles.navLink_active]: isActive })
                }
                to={routes.users.skills(userId)}
            >
                Skills
            </NavLink>
            <NavLink
                className={({ isActive }) =>
                    classNames(styles.navLink, { [styles.navLink_active]: isActive })
                }
                to={routes.users.languages(userId)}
            >
                Languages
            </NavLink>
            <NavLink
                className={({ isActive }) =>
                    classNames(styles.navLink, { [styles.navLink_active]: isActive })
                }
                to={routes.users.cvs(userId)}
            >
                CVs
            </NavLink>
        </nav>
    );
};
