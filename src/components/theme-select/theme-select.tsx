import { themeService } from "@/services/theme-service/theme-service";
import { useAppThemePref } from "@/services/theme-service/theme-service.hooks";
import { Select } from "antd";

const options = [
    { label: "Browser pref", value: "default" },
    { label: "Dark", value: "dark" },
    { label: "Light", value: "light" },
];

const ThemeSelect = () => {
    const pref = useAppThemePref();

    return (
        <Select
            value={pref ?? undefined}
            options={options}
            onChange={(pref) => {
                themeService.updateTheme(pref);
            }}
        />
    );
};

export default ThemeSelect;
