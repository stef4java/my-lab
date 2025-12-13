import {DefaultTheme} from 'vitepress';

import {designPatternSidebar} from "./01_DesignPattern";
import {blogSetupSidebar} from "./98_BlogSetup";

export const sidebar: DefaultTheme.Sidebar = {
    ...designPatternSidebar,
    ...blogSetupSidebar
};