import {
  EuiAvatar,
  EuiHeader,
  EuiHeaderLink,
  EuiHeaderLogo,
  EuiHeaderSectionItem,
  EuiHeaderSectionItemButton,
  EuiPageBody,
  EuiPageSection,
  EuiPageTemplate,
} from "@elastic/eui";
import { Outlet } from "react-router-dom";
import { useState } from "react";

// MANTINE
import { Box, NavLink } from "@mantine/core";
import { IconFingerprint, IconChevronRight } from "@tabler/icons-react";
const data = [
  {
    default: true,
    icon: IconFingerprint,
    label: "Videos",
    rightSection: <IconChevronRight size="1rem" stroke={1.5} />,
    children: [
      {
        href: "/streams",
        label: "Streams",
      },
      {
        href: "/recs",
        label: "Recordings",
      },
      {
        href: "/metrics",
        label: "Metrics",
      },
      {
        href: "/ltd",
        label: "Transcoder",
      },
    ],
  },
  {
    icon: IconFingerprint,
    label: "Analytics",
    rightSection: <IconChevronRight size="1rem" stroke={1.5} />,
    children: [
      {
        href: "/events",
        label: "Events",
      },
      {
        href: "/configs",
        label: "Configure",
      },
    ],
  },
  {
    icon: IconFingerprint,
    label: "Storage",
    rightSection: <IconChevronRight size="1rem" stroke={1.5} />,
    children: [],
  },
  {
    icon: IconFingerprint,
    label: "Settings",
    rightSection: <IconChevronRight size="1rem" stroke={1.5} />,
    children: [],
  },
];

const RootLayout = () => {
  const [active, setActive] = useState("");

  const pathName = window.location.pathname;
  console.log(pathName);
  const items = data.map((item) => (
    <NavLink
      href="#required-for-focus"
      key={item.label}
      active={item.label === active}
      label={item.label}
      description={item.description}
      rightSection={item.rightSection}
      icon={<item.icon size="1rem" stroke={1.5} />}
      onClick={() => setActive(item.label)}
      childrenOffset={30}
      defaultOpened={item.default}
    >
      {item.children.map((i) => (
        <NavLink
          href={i.href}
          key={i.label}
          label={i.label}
          variant="subtle"
          active={i.href === pathName}
        />
      ))}
    </NavLink>
  ));
  return (
    <>
      <EuiHeader theme="dark" style={{ zIndex: 0 }}>
        <EuiHeaderSectionItem>
          <EuiHeaderLogo iconType="/logo.png" iconTitle="ALSS">
            ALSS
          </EuiHeaderLogo>
          <EuiHeaderLink href="https://github.com/CE-Thesis-2023">
            Code
          </EuiHeaderLink>
        </EuiHeaderSectionItem>
        <EuiHeaderSectionItem>
          <EuiHeaderSectionItemButton>
            <EuiAvatar name="User" size="s" color="#95F8F7"></EuiAvatar>
          </EuiHeaderSectionItemButton>
        </EuiHeaderSectionItem>
      </EuiHeader>
      <EuiPageTemplate panelled>
        <EuiPageTemplate.Sidebar style={{ padding: 0 }} sticky>
          <Box w={"100%"}>{items}</Box>
        </EuiPageTemplate.Sidebar>
        <main>
          <EuiPageBody>
            <EuiPageSection>
              <Outlet />
            </EuiPageSection>
          </EuiPageBody>
        </main>
      </EuiPageTemplate>
    </>
  );
};

export default RootLayout;
