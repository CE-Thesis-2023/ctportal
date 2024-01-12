import {
    EuiAvatar,
    EuiHeader,
    EuiHeaderLink,
    EuiHeaderLogo,
    EuiHeaderSectionItem,
    EuiHeaderSectionItemButton,
    EuiPageBody,
    EuiPageSection,
    EuiPageTemplate
} from '@elastic/eui';
import {Outlet} from 'react-router-dom';

import {appendIconComponentCache} from '@elastic/eui/es/components/icon/icon';

import {icon as EuiIconApmTrace} from '@elastic/eui/es/components/icon/assets/apm_trace';
import {icon as EuiIconArrowDown} from '@elastic/eui/es/components/icon/assets/arrow_down';
import {icon as EuiIconArrowLeft} from '@elastic/eui/es/components/icon/assets/arrow_left';
import {icon as EuiIconControlsHorizontal} from '@elastic/eui/es/components/icon/assets/controls_horizontal';
import {icon as EuiIconDocuments} from '@elastic/eui/es/components/icon/assets/documents';
import {icon as EuiIconInputOutput} from '@elastic/eui/es/components/icon/assets/inputOutput';
import {icon as EuiIconMenu} from '@elastic/eui/es/components/icon/assets/menu';
import {icon as EuiIconSortRight} from '@elastic/eui/es/components/icon/assets/sortRight';
import {icon as EuiIconTimeline} from '@elastic/eui/es/components/icon/assets/timeline';
import {icon as EuiIconVideoPlayer} from '@elastic/eui/es/components/icon/assets/videoPlayer';
import {icon as EuiIconVisarea} from '@elastic/eui/es/components/icon/assets/vis_area';


// MANTINE
import {NavLink} from '@mantine/core';

appendIconComponentCache({
    arrowDown: EuiIconArrowDown,
    arrowLeft: EuiIconArrowLeft,
    documents: EuiIconDocuments,
    menu: EuiIconMenu,
    visArea: EuiIconVisarea,
    videoPlayer: EuiIconVideoPlayer,
    timeline: EuiIconTimeline,
    controlsHorizontal: EuiIconControlsHorizontal,
    apmTrace: EuiIconApmTrace,
    inputOutput: EuiIconInputOutput,
    sortRight: EuiIconSortRight,
});

function RootLayout() {
    return (
        <>
            <EuiHeader theme='dark' position='fixed'>
                <EuiHeaderSectionItem>
                    <EuiHeaderLogo iconType='/logo.png' iconTitle='ALSS'>
                        ALSS
                    </EuiHeaderLogo>
                    <EuiHeaderLink href='https://github.com/CE-Thesis-2023'>
                        Code
                    </EuiHeaderLink>
                </EuiHeaderSectionItem>
                <EuiHeaderSectionItem>
                    <EuiHeaderSectionItemButton>
                        <EuiAvatar name='User' size='s' color='#95F8F7'></EuiAvatar>
                    </EuiHeaderSectionItemButton>
                </EuiHeaderSectionItem>
            </EuiHeader>
            <EuiPageTemplate panelled>
                <EuiPageTemplate.Sidebar sticky>
                    <NavLink label="Videos" childrenOffset={30}>
                        <NavLink label="Streams" href="#required-for-focus"/>
                        <NavLink label="Recordings" href="#required-for-focus"/>
                        <NavLink label="Metrics" href="#required-for-focus"/>
                    </NavLink>
                    <NavLink childrenOffset={30} label="Analytics">
                        <NavLink label="XXX" href="#required-for-focus"/>
                        <NavLink label="YYY" href="#required-for-focus"/>
                        <NavLink label="ZZZ" href="#required-for-focus"/>
                    </NavLink>
                    <NavLink childrenOffset={30} label="Storage">
                        <NavLink label="XXX" href="#required-for-focus"/>
                        <NavLink label="YYY" href="#required-for-focus"/>
                        <NavLink label="ZZZ" href="#required-for-focus"/>
                    </NavLink>
                    <NavLink childrenOffset={30} label="Settings">
                        <NavLink label="XXX" href="#required-for-focus"/>
                        <NavLink label="YYY" href="#required-for-focus"/>
                        <NavLink label="ZZZ" href="#required-for-focus"/>
                    </NavLink>
                </EuiPageTemplate.Sidebar>
                <main>
                    <EuiPageBody>
                        <EuiPageSection>
                            <Outlet/>
                        </EuiPageSection>
                    </EuiPageBody>
                </main>
            </EuiPageTemplate>
        </>
    );
}

export default RootLayout;
