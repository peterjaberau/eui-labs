import React, { useState } from 'react';
import { Link } from "react-router-dom"
import {


    logicalCSSWithFallback,
    EuiCollapsibleNav,
    EuiCollapsibleNavGroup,
    EuiHeaderSectionItemButton,
    EuiHeaderLogo,
    EuiHeader,
    EuiIcon,
    EuiButton,
    EuiButtonEmpty,
    EuiPageTemplate,
    EuiPinnableListGroup,
    EuiPinnableListGroupItemProps,
    EuiFlexItem,
    EuiHorizontalRule,
    EuiImage,
    EuiListGroup,
    useGeneratedHtmlId,
    EuiCollapsibleNavBeta,
    EuiCollapsibleNavItem,
    EuiSelectableOption,
    EuiAvatar,
    EuiSelectableProps,
    EuiPopover,
    EuiSelectable,
    EuiPopoverTitle,
    EuiPopoverFooter,
    EuiKeyPadMenu,
    EuiKeyPadMenuItem,
    EuiFlexGroup,
    EuiText,
    EuiSpacer,
    EuiLink,
    useEuiTheme,
    EuiBadge,
    EuiPortal,
    EuiFlyout,
    EuiFlyoutHeader,
    EuiTitle,
    EuiFlyoutBody, EuiHeaderAlert, EuiFlyoutFooter,
    EuiFlyoutResizable,
    EuiFlyoutProps,
} from '@elastic/eui';

import {
    EuiBreadcrumb,
    EuiHeaderBreadcrumbs,
    EuiHeaderSection,
    EuiHeaderSectionItem,
    EuiSelectableMessage,
    EuiSelectableTemplateSitewide,
    EuiHeaderLink, EuiHeaderLinks,
    EuiButtonGroup
} from "@elastic/eui"


import find from 'lodash/find';
import findIndex from 'lodash/findIndex';
import { css } from '@emotion/react';
import { KibanaNavLinks, SecurityGroup } from './collapsible_nav_list';
import contentSvg from '../images/content.svg';
import { useExitPath } from './routing';


const TopLinks: EuiPinnableListGroupItemProps[] = [
    {
        label: 'Home',
        iconType: 'home',
        isActive: true,
        'aria-current': true,
        onClick: () => {},
        pinnable: false,
    },
];
const KibanaLinks: EuiPinnableListGroupItemProps[] = KibanaNavLinks.map(
    (link) => {
        return {
            ...link,
            onClick: () => {},
        };
    }
);
const LearnLinks: EuiPinnableListGroupItemProps[] = [
    { label: 'Docs', onClick: () => {} },
    { label: 'Blogs', onClick: () => {} },
    { label: 'Webinars', onClick: () => {} },
    { label: 'Elastic.co', href: 'https://elastic.co' },
];

const HeaderUpdates = () => {
    const { euiTheme } = useEuiTheme();

    const [isFlyoutVisible, setIsFlyoutVisible] = useState(false);
    const [isPopoverVisible, setIsPopoverVisible] = useState(false);
    const newsFeedFlyoutId = useGeneratedHtmlId({ prefix: 'newsFeedFlyout' });
    const newsFeedFlyoutTitleId = useGeneratedHtmlId({
        prefix: 'newsFeedFlyoutTitle',
    });
    const newsFeedPopoverId = useGeneratedHtmlId({ prefix: 'newsFeedPopover' });

    const alerts = [
        {
            title: 'Control access to features',
            text: 'Show or hide applications and features per space in Kibana.',
            action: <EuiLink href="">Learn about feature controls</EuiLink>,
            date: '1 May 2019',
            badge: <EuiBadge>7.1</EuiBadge>,
        },
        {
            title: 'Kibana 7.0 is turning heads',
            text: 'Simplified navigation, responsive dashboards, dark mode… pick your favorite.',
            action: (
                <EuiLink
                    target="_blank"
                    external
                    href="https://www.elastic.co/blog/kibana-7-0-0-released"
                >
                    Read the blog
                </EuiLink>
            ),
            date: '10 April 2019',
            badge: <EuiBadge color="hollow">7.0</EuiBadge>,
        },
        {
            title: 'Enter dark mode',
            text: 'Kibana now supports the easy-on-the-eyes theme across the entire UI.',
            action: <EuiLink href="">Go to Advanced Settings</EuiLink>,
            date: '10 April 2019',
            badge: <EuiBadge color="hollow">7.0</EuiBadge>,
        },
        {
            title: 'Pixel-perfect Canvas is production ready',
            text: 'Your creative space for visualizing data awaits.',
            action: (
                <EuiLink
                    target="_blank"
                    external
                    href="https://www.elastic.co/webinars/intro-to-canvas-a-new-way-to-tell-visual-stories-in-kibana"
                >
                    Watch the webinar
                </EuiLink>
            ),
            date: '26 March 2019',
            badge: <EuiBadge color="hollow">6.7</EuiBadge>,
        },
        {
            title: '6.7 release notes',
            text: 'Stay up-to-date on the latest and greatest features.',
            action: (
                <EuiLink
                    target="_blank"
                    external
                    href="https://www.elastic.co/guide/en/kibana/6.7/release-notes-6.7.0.html"
                >
                    Check out the docs
                </EuiLink>
            ),
            date: '26 March 2019',
            badge: <EuiBadge color="hollow">6.7</EuiBadge>,
        },
        {
            title: 'Rollups made simple in Kibana',
            text: 'Save space and preserve the integrity of your data directly in the UI.',
            action: (
                <EuiLink
                    target="_blank"
                    external
                    href="https://www.elastic.co/blog/how-to-create-manage-and-visualize-elasticsearch-rollup-data-in-kibana"
                >
                    Read the blog
                </EuiLink>
            ),
            date: '10 January 2019',
            badge: <EuiBadge color="hollow">6.5</EuiBadge>,
        },
    ];

    const closeFlyout = () => {
        setIsFlyoutVisible(false);
    };

    const closePopover = () => {
        setIsPopoverVisible(false);
    };

    const showFlyout = () => {
        setIsFlyoutVisible(!isFlyoutVisible);
    };

    const showPopover = () => {
        setIsPopoverVisible(!isPopoverVisible);
    };

    const bellButton = (
        <EuiHeaderSectionItemButton
            aria-controls="headerFlyoutNewsFeed"
            aria-expanded={isFlyoutVisible}
            aria-haspopup="true"
            aria-label={'Alerts feed: Updates available'}
            onClick={() => showFlyout()}
            notification={true}
        >
            <EuiIcon type="bell" />
        </EuiHeaderSectionItemButton>
    );

    const cheerButton = (
        <EuiHeaderSectionItemButton
            aria-controls="headerPopoverNewsFeed"
            aria-expanded={isPopoverVisible}
            aria-haspopup="true"
            aria-label={"News feed: Updates available'"}
            onClick={showPopover}
            notification={6}
        >
            <EuiIcon type="cheer" />
        </EuiHeaderSectionItemButton>
    );

    const flyout = (
        <EuiPortal>
            <EuiFlyout
                onClose={closeFlyout}
                size="s"
                id={newsFeedFlyoutId}
                aria-labelledby={newsFeedFlyoutTitleId}
            >
                <EuiFlyoutHeader hasBorder>
                    <EuiTitle size="s">
                        <h2 id={newsFeedFlyoutTitleId}>What&apos;s new</h2>
                    </EuiTitle>
                </EuiFlyoutHeader>
                <EuiFlyoutBody>
                    {alerts.map((alert, i) => (
                        <EuiHeaderAlert
                            key={`alert-${i}`}
                            title={alert.title}
                            action={alert.action}
                            text={alert.text}
                            date={alert.date}
                            badge={alert.badge}
                        />
                    ))}
                </EuiFlyoutBody>
                <EuiFlyoutFooter>
                    <EuiFlexGroup justifyContent="spaceBetween" alignItems="center">
                        <EuiFlexItem grow={false}>
                            <EuiButtonEmpty
                                iconType="cross"
                                onClick={closeFlyout}
                                flush="left"
                            >
                                Close
                            </EuiButtonEmpty>
                        </EuiFlexItem>
                        <EuiFlexItem grow={false}>
                            <EuiText color="subdued" size="s">
                                <p>Version 7.0</p>
                            </EuiText>
                        </EuiFlexItem>
                    </EuiFlexGroup>
                </EuiFlyoutFooter>
            </EuiFlyout>
        </EuiPortal>
    );

    const popover = (
        <EuiPopover
            id={newsFeedPopoverId}
            ownFocus
            repositionOnScroll
            button={cheerButton}
            isOpen={isPopoverVisible}
            closePopover={closePopover}
            panelPaddingSize="none"
        >
            <EuiPopoverTitle paddingSize="s">What&apos;s new</EuiPopoverTitle>
            <div
                style={{
                    maxHeight: '40vh',
                    overflowY: 'auto',
                    padding: euiTheme.size.s,
                }}
            >
                <EuiSpacer size="s" />
                {alerts.map((alert, i) => (
                    <EuiHeaderAlert
                        key={`alert-${i}`}
                        title={alert.title}
                        action={alert.action}
                        text={alert.text}
                        date={alert.date}
                        badge={alert.badge}
                    />
                ))}
            </div>
            <EuiPopoverFooter paddingSize="s">
                <EuiText color="subdued" size="s">
                    <p>Version 7.0</p>
                </EuiText>
            </EuiPopoverFooter>
        </EuiPopover>
    );

    return (
        <>
            {bellButton}
            {popover}
            {isFlyoutVisible && flyout}
        </>
    );
};

const HeaderUserMenu = () => {
    const headerUserPopoverId = useGeneratedHtmlId({
        prefix: "headerUserPopover",
    })
    const [isOpen, setIsOpen] = useState(false)

    const onMenuButtonClick = () => {
        setIsOpen(!isOpen)
    }

    const closeMenu = () => {
        setIsOpen(false)
    }

    const button = (
        <EuiHeaderSectionItemButton
            aria-controls={headerUserPopoverId}
            aria-expanded={isOpen}
            aria-haspopup="true"
            aria-label="Account menu"
            onClick={onMenuButtonClick}
        >
            <EuiAvatar name="John Username" size="s" />
        </EuiHeaderSectionItemButton>
    )

    return (
        <EuiPopover id={headerUserPopoverId} button={button} isOpen={isOpen} anchorPosition="downRight" closePopover={closeMenu} panelPaddingSize="m">
            <div style={{ width: 300 }}>
                <EuiFlexGroup gutterSize="m" responsive={false}>
                    <EuiFlexItem grow={false}>
                        <EuiAvatar name="John Username" size="xl" />
                    </EuiFlexItem>

                    <EuiFlexItem>
                        <EuiText>
                            <p>John Username</p>
                        </EuiText>

                        <EuiSpacer size="m" />

                        <EuiFlexGroup>
                            <EuiFlexItem>
                                <EuiFlexGroup justifyContent="spaceBetween">
                                    <EuiFlexItem grow={false}>
                                        <EuiLink>Edit profile</EuiLink>
                                    </EuiFlexItem>

                                    <EuiFlexItem grow={false}>
                                        <EuiLink>Log out</EuiLink>
                                    </EuiFlexItem>
                                </EuiFlexGroup>
                            </EuiFlexItem>
                        </EuiFlexGroup>
                    </EuiFlexItem>
                </EuiFlexGroup>
            </div>
        </EuiPopover>
    )
}

const HeaderSpacesMenu = () => {
    const headerSpacesPopoverId = useGeneratedHtmlId({
        prefix: "headerSpacesPopover",
    })
    const spacesValues: EuiSelectableOption[] = [
        {
            label: "Sales team",
            prepend: <EuiAvatar type="space" name="Sales Team" size="s" />,
            checked: "on",
        },
        {
            label: "Engineering",
            prepend: <EuiAvatar type="space" name="Engineering" size="s" />,
        },
        {
            label: "Security",
            prepend: <EuiAvatar type="space" name="Security" size="s" />,
        },
        {
            label: "Default",
            prepend: <EuiAvatar type="space" name="Default" size="s" />,
        },
    ]

    const additionalSpaces = [
        {
            label: "Sales team 2",
            prepend: <EuiAvatar type="space" name="Sales Team 2" size="s" />,
        },
        {
            label: "Engineering 2",
            prepend: <EuiAvatar type="space" name="Engineering 2" size="s" />,
        },
        {
            label: "Security 2",
            prepend: <EuiAvatar type="space" name="Security 2" size="s" />,
        },
        {
            label: "Default 2",
            prepend: <EuiAvatar type="space" name="Default 2" size="s" />,
        },
    ]

    const [spaces, setSpaces] = useState<EuiSelectableOption[]>(spacesValues)
    const [selectedSpace, setSelectedSpace] = useState(spaces.filter((option) => option.checked)[0])
    const [isOpen, setIsOpen] = useState(false)

    const isListExtended = () => {
        return spaces.length > 4 ? true : false
    }

    const onMenuButtonClick = () => {
        setIsOpen(!isOpen)
    }

    const closePopover = () => {
        setIsOpen(false)
    }

    const onChange: EuiSelectableProps["onChange"] = (options) => {
        setSpaces(options)
        setSelectedSpace(options.filter((option) => option.checked)[0])
        setIsOpen(false)
    }

    const addMoreSpaces = () => {
        setSpaces(spaces.concat(additionalSpaces))
    }

    const button = (
        <EuiHeaderSectionItemButton
            aria-controls={headerSpacesPopoverId}
            aria-expanded={isOpen}
            aria-haspopup="true"
            aria-label="Spaces menu"
            onClick={onMenuButtonClick}
        >
            {selectedSpace.prepend}
        </EuiHeaderSectionItemButton>
    )

    return (
        <EuiPopover
            id={headerSpacesPopoverId}
            button={button}
            isOpen={isOpen}
            anchorPosition="downLeft"
            closePopover={closePopover}
            panelPaddingSize="none"
        >
            <EuiSelectable
                {...({
                    searchable: isListExtended(),
                    searchProps: {
                        placeholder: "Find a space",
                        compressed: true,
                    },
                } as Partial<EuiSelectableProps>)}
                options={spaces}
                singleSelection="always"
                style={{ width: 300 }}
                onChange={onChange}
                listProps={{
                    rowHeight: 40,
                    showIcons: false,
                }}
            >
                {(list, search) => (
                    <>
                        <EuiPopoverTitle paddingSize="s">{search || "Your spaces"}</EuiPopoverTitle>
                        {list}
                        <EuiPopoverFooter paddingSize="s">
                            <EuiButton size="s" fullWidth onClick={addMoreSpaces} disabled={isListExtended()}>
                                Add more spaces
                            </EuiButton>
                        </EuiPopoverFooter>
                    </>
                )}
            </EuiSelectable>
        </EuiPopover>
    )
}

const HeaderAppMenu = () => {
    const headerAppPopoverId = useGeneratedHtmlId({ prefix: "headerAppPopover" })
    const headerAppKeyPadMenuId = useGeneratedHtmlId({
        prefix: "headerAppKeyPadMenu",
    })

    const [isOpen, setIsOpen] = useState(false)

    const onMenuButtonClick = () => {
        setIsOpen(!isOpen)
    }

    const closeMenu = () => {
        setIsOpen(false)
    }

    const button = (
        <EuiHeaderSectionItemButton
            aria-controls={headerAppKeyPadMenuId}
            aria-expanded={isOpen}
            aria-haspopup="true"
            aria-label="Apps menu with 1 new app"
            notification="1"
            onClick={onMenuButtonClick}
        >
            <EuiIcon type="apps" size="m" />
        </EuiHeaderSectionItemButton>
    )

    return (
        <EuiPopover id={headerAppPopoverId} button={button} isOpen={isOpen} anchorPosition="downRight" closePopover={closeMenu}>
            <EuiKeyPadMenu id={headerAppKeyPadMenuId} style={{ width: 288 }}>
                <EuiKeyPadMenuItem label="Discover">
                    <EuiIcon type="discoverApp" size="l" />
                </EuiKeyPadMenuItem>

                <EuiKeyPadMenuItem label="Dashboard">
                    <EuiIcon type="dashboardApp" size="l" />
                </EuiKeyPadMenuItem>

                <EuiKeyPadMenuItem label="Dev Tools">
                    <EuiIcon type="devToolsApp" size="l" />
                </EuiKeyPadMenuItem>

                <EuiKeyPadMenuItem label="Machine Learning">
                    <EuiIcon type="machineLearningApp" size="l" />
                </EuiKeyPadMenuItem>

                <EuiKeyPadMenuItem label="Graph">
                    <EuiIcon type="graphApp" size="l" />
                </EuiKeyPadMenuItem>

                <EuiKeyPadMenuItem label="Visualize">
                    <EuiIcon type="visualizeApp" size="l" />
                </EuiKeyPadMenuItem>

                <EuiKeyPadMenuItem label="Timelion" betaBadgeLabel="Beta">
                    <EuiIcon type="timelionApp" size="l" />
                </EuiKeyPadMenuItem>
            </EuiKeyPadMenu>
        </EuiPopover>
    )
}

const SubHeaderRightMenu = () => {
    const { euiTheme } = useEuiTheme();
    const [flyoutType, setFlyoutType] = useState('overlay');
    const [flyoutSide, setFlyoutSide] = useState('right');

    const [isFlyoutVisible, setIsFlyoutVisible] = useState(false);
    const gearFlyoutId = useGeneratedHtmlId({ prefix: 'gearFlyout' });
    const gearFlyoutTitleId = useGeneratedHtmlId({
        prefix: 'gearFlyoutTitle',
    });


    const closeFlyout = () => {
        setIsFlyoutVisible(false);
    };


    const showFlyout = () => {
        setIsFlyoutVisible(!isFlyoutVisible);
    };


    const gearButton = (
        <EuiHeaderSectionItemButton
            aria-expanded={isFlyoutVisible}
            onClick={() => showFlyout()}
        >
            <EuiIcon type="gear" />
        </EuiHeaderSectionItemButton>
    );



    const flyout = (
        <EuiPortal>
            <EuiFlyoutResizable
                maxWidth={1000} minWidth={300}
                ownFocus={false}
                type={flyoutType as EuiFlyoutProps['type']}
                side={flyoutSide as EuiFlyoutProps['side']}
                onClose={closeFlyout}
                size="s"
                id={gearFlyoutId}
                aria-labelledby={gearFlyoutTitleId}
            >
                <EuiFlyoutHeader hasBorder>
                    <EuiTitle size="m">
                        <h2 id={gearFlyoutTitleId}>A resizable flyout</h2>
                    </EuiTitle>
                </EuiFlyoutHeader>
                <EuiFlyoutBody>
                    <EuiText>
                        <p>
                            This flyout is resizable by both mouse drag and arrow keys (when
                            the resizable edge is focused). Both push and overlay flyouts can
                            be resizable, on either side.
                        </p>
                    </EuiText>
                    <EuiSpacer />
                    <EuiTitle size="xxs">
                        <h3>Flyout type</h3>
                    </EuiTitle>
                    <EuiSpacer size="s" />
                    <EuiButtonGroup
                        legend="Flyout type"
                        options={[
                            { id: 'overlay', label: 'Overlay' },
                            { id: 'push', label: 'Push' },
                        ]}
                        idSelected={flyoutType}
                        onChange={(id) => setFlyoutType(id)}
                    />
                    <EuiSpacer />
                    <EuiTitle size="xxs">
                        <h3>Flyout side</h3>
                    </EuiTitle>
                    <EuiButtonGroup
                        legend="Flyout side"
                        options={[
                            { id: 'right', label: 'Right' },
                            { id: 'left', label: 'Left' },
                        ]}
                        idSelected={flyoutSide}
                        onChange={(id) => setFlyoutSide(id)}
                    />
                </EuiFlyoutBody>
                <EuiFlyoutFooter>
                    <EuiFlexGroup justifyContent="spaceBetween" alignItems="center">
                        <EuiFlexItem grow={false}>
                            <EuiButtonEmpty
                                iconType="cross"
                                onClick={closeFlyout}
                                flush="left"
                            >
                                Close
                            </EuiButtonEmpty>
                        </EuiFlexItem>
                        <EuiFlexItem grow={false}>
                            <EuiText color="subdued" size="s">
                                <p>Version 7.0</p>
                            </EuiText>
                        </EuiFlexItem>
                    </EuiFlexGroup>
                </EuiFlyoutFooter>
            </EuiFlyoutResizable>
        </EuiPortal>
    );



    return (
        <>
            {gearButton}
            {isFlyoutVisible && flyout}
        </>
    );
};

const FlyoutComponent = () => {
    const { euiTheme } = useEuiTheme();
    const [flyoutType, setFlyoutType] = useState('overlay');
    const [flyoutSide, setFlyoutSide] = useState('right');

    const [isFlyoutVisible, setIsFlyoutVisible] = useState(false);
    const childFlyoutId = useGeneratedHtmlId({ prefix: 'childFlyout' });
    const childFlyoutTitleId = useGeneratedHtmlId({
        prefix: 'childFlyoutTitle',
    });


    const closeFlyout = () => {
        setIsFlyoutVisible(false);
    };


    const showFlyout = () => {
        setIsFlyoutVisible(!isFlyoutVisible);
    };


    const gearButton = (
        <EuiHeaderSectionItemButton
            aria-expanded={isFlyoutVisible}
            onClick={() => showFlyout()}
        >
            <EuiIcon type="gear" />
        </EuiHeaderSectionItemButton>
    );



    const flyout = (
        <EuiPortal>
            <EuiFlyoutResizable
                maxWidth={1000} minWidth={300}
                ownFocus={false}
                type={flyoutType as EuiFlyoutProps['type']}
                side={flyoutSide as EuiFlyoutProps['side']}
                onClose={closeFlyout}
                size="s"
                id={childFlyoutId}
                aria-labelledby={childFlyoutTitleId}
            >
                <EuiFlyoutHeader hasBorder>
                    <EuiTitle size="m">
                        <h2 id={childFlyoutTitleId}>A resizable flyout</h2>
                    </EuiTitle>
                </EuiFlyoutHeader>
                <EuiFlyoutBody>
                    <EuiText>
                        <p>
                            This flyout is resizable by both mouse drag and arrow keys (when
                            the resizable edge is focused). Both push and overlay flyouts can
                            be resizable, on either side.
                        </p>
                    </EuiText>
                    <EuiSpacer />
                    <EuiTitle size="xxs">
                        <h3>Flyout type</h3>
                    </EuiTitle>
                    <EuiSpacer size="s" />
                    <EuiButtonGroup
                        legend="Flyout type"
                        options={[
                            { id: 'overlay', label: 'Overlay' },
                            { id: 'push', label: 'Push' },
                        ]}
                        idSelected={flyoutType}
                        onChange={(id) => setFlyoutType(id)}
                    />
                    <EuiSpacer />
                    <EuiTitle size="xxs">
                        <h3>Flyout side</h3>
                    </EuiTitle>
                    <EuiButtonGroup
                        legend="Flyout side"
                        options={[
                            { id: 'right', label: 'Right' },
                            { id: 'left', label: 'Left' },
                        ]}
                        idSelected={flyoutSide}
                        onChange={(id) => setFlyoutSide(id)}
                    />
                </EuiFlyoutBody>
                <EuiFlyoutFooter>
                    <EuiFlexGroup justifyContent="spaceBetween" alignItems="center">
                        <EuiFlexItem grow={false}>
                            <EuiButtonEmpty
                                iconType="cross"
                                onClick={closeFlyout}
                                flush="left"
                            >
                                Close
                            </EuiButtonEmpty>
                        </EuiFlexItem>
                        <EuiFlexItem grow={false}>
                            <EuiText color="subdued" size="s">
                                <p>Version 7.0</p>
                            </EuiText>
                        </EuiFlexItem>
                    </EuiFlexGroup>
                </EuiFlyoutFooter>
            </EuiFlyoutResizable>
        </EuiPortal>
    );



    return (
        <>
            {gearButton}
            {isFlyoutVisible && flyout}
        </>
    );
};


const KibanaApp = () => {
    const [isFlyoutVisible, setIsFlyoutVisible] = useState(false);
    const [flyoutType, setFlyoutType] = useState('overlay');
    const [flyoutSide, setFlyoutSide] = useState('right');
    const flyoutTitleId = useGeneratedHtmlId({
        prefix: 'simpleFlyoutTitle',
    });
    let flyout;
    if (isFlyoutVisible) {
        flyout = (
            <EuiFlyoutResizable
                type={flyoutType as EuiFlyoutProps['type']}
                side={flyoutSide as EuiFlyoutProps['side']}
                onClose={() => setIsFlyoutVisible(false)}
                aria-labelledby={flyoutTitleId}
            >
                <EuiFlyoutHeader hasBorder>
                    <EuiTitle size="m">
                        <h2 id={flyoutTitleId}>A resizable flyout</h2>
                    </EuiTitle>
                </EuiFlyoutHeader>
                <EuiFlyoutBody>
                    <EuiText>
                        <p>
                            This flyout is resizable by both mouse drag and arrow keys (when
                            the resizable edge is focused). Both push and overlay flyouts can
                            be resizable, on either side.
                        </p>
                    </EuiText>
                    <EuiSpacer />
                    <EuiTitle size="xxs">
                        <h3>Flyout type</h3>
                    </EuiTitle>
                    <EuiSpacer size="s" />
                    <EuiButtonGroup
                        legend="Flyout type"
                        options={[
                            { id: 'overlay', label: 'Overlay' },
                            { id: 'push', label: 'Push' },
                        ]}
                        idSelected={flyoutType}
                        onChange={(id) => setFlyoutType(id)}
                    />
                    <EuiSpacer />
                    <EuiTitle size="xxs">
                        <h3>Flyout side</h3>
                    </EuiTitle>
                    <EuiButtonGroup
                        legend="Flyout side"
                        options={[
                            { id: 'right', label: 'Right' },
                            { id: 'left', label: 'Left' },
                        ]}
                        idSelected={flyoutSide}
                        onChange={(id) => setFlyoutSide(id)}
                    />
                </EuiFlyoutBody>
            </EuiFlyoutResizable>
        );
    }

    const exitPath = useExitPath();
    const [navIsOpen, setNavIsOpen] = useState(true);
    /**
     * Accordion toggling
     */
    const [openGroups, setOpenGroups] = useState(
        JSON.parse(String(localStorage.getItem('openNavGroups'))) || [
            'Kibana',
            'Learn',
        ]
    );
    // Save which groups are open and which are not with state and local store
    const toggleAccordion = (isOpen: boolean, title?: string) => {
        if (!title) return;
        const itExists = openGroups.includes(title);
        if (isOpen) {
            if (itExists) return;
            openGroups.push(title);
        } else {
            const index = openGroups.indexOf(title);
            if (index > -1) {
                openGroups.splice(index, 1);
            }
        }
        setOpenGroups([...openGroups]);
        localStorage.setItem('openNavGroups', JSON.stringify(openGroups));
    };
    /**
     * Pinning
     */
    const [pinnedItems, setPinnedItems] = useState<
        EuiPinnableListGroupItemProps[]
    >(JSON.parse(String(localStorage.getItem('pinnedItems'))) || []);
    const addPin = (item: any) => {
        if (!item || find(pinnedItems, { label: item.label })) {
            return;
        }
        item.pinned = true;
        const newPinnedItems = pinnedItems ? pinnedItems.concat(item) : [item];
        setPinnedItems(newPinnedItems);
        localStorage.setItem('pinnedItems', JSON.stringify(newPinnedItems));
    };
    const removePin = (item: any) => {
        const pinIndex = findIndex(pinnedItems, { label: item.label });
        if (pinIndex > -1) {
            item.pinned = false;
            const newPinnedItems = pinnedItems;
            newPinnedItems.splice(pinIndex, 1);
            setPinnedItems([...newPinnedItems]);
            localStorage.setItem('pinnedItems', JSON.stringify(newPinnedItems));
        }
    };
    function alterLinksWithCurrentState(
        links: EuiPinnableListGroupItemProps[],
        showPinned = false
    ): EuiPinnableListGroupItemProps[] {
        return links.map((link) => {
            const { pinned, ...rest } = link;
            return {
                pinned: showPinned ? pinned : false,
                ...rest,
            };
        });
    }
    function addLinkNameToPinTitle(listItem: EuiPinnableListGroupItemProps) {
        return `Pin ${listItem.label} to top`;
    }
    function addLinkNameToUnpinTitle(listItem: EuiPinnableListGroupItemProps) {
        return `Unpin ${listItem.label}`;
    }

    const renderBreadcrumbs = () => {
        const breadcrumbs: EuiBreadcrumb[] = [
            {
                text: "Management",
                href: "#",
                onClick: (e) => {
                    e.preventDefault()
                },
                "data-test-subj": "breadcrumbsAnimals",
                className: "customClass",
            },
            {
                text: "Truncation test is here for a really long item",
                href: "#",
                onClick: (e) => {
                    e.preventDefault()
                },
            },
            {
                text: "Hidden",
                href: "#",
                onClick: (e) => {
                    e.preventDefault()
                },
            },
            {
                text: "Users",
                href: "#",
                onClick: (e) => {
                    e.preventDefault()
                },
            },
            {
                text: "Create",
            },
        ]

        return <EuiHeaderBreadcrumbs aria-label="Header breadcrumbs example" breadcrumbs={breadcrumbs} />
    }
    const search = (
        <EuiSelectableTemplateSitewide
            options={[]}
            searchProps={{
                compressed: true,
            }}
            popoverButton={
                <EuiHeaderSectionItemButton aria-label="Sitewide search">
                    <EuiIcon type="search" size="m" />
                </EuiHeaderSectionItemButton>
            }
            emptyMessage={
                <EuiSelectableMessage style={{ minHeight: 300 }}>
                    <p>
                        Please see the component page for{" "}
                        <Link to="/forms/selectable">
                            <strong>EuiSelectableTemplateSitewide</strong>
                        </Link>{" "}
                        on how to configure your sitewide search.
                    </p>
                </EuiSelectableMessage>
            }
        />
    )

    const collapsibleNavId = useGeneratedHtmlId({ prefix: 'collapsibleNav' });
    const collapsibleNav = (
        <EuiCollapsibleNav
            id={collapsibleNavId}
            aria-label="Main navigation"
            isOpen={navIsOpen}
            draggable={true}
            closeButtonPosition={"inside"}
            isDocked={true}
            maxWidth={600}
            button={
                <EuiHeaderSectionItemButton
                    aria-label="Toggle main navigation"
                    onClick={() => setNavIsOpen(!navIsOpen)}
                >
                    <EuiIcon type={'menu'} size="m" aria-hidden="true" />
                </EuiHeaderSectionItemButton>
            }
            onClose={() => setNavIsOpen(false)}
            // Accessibility - Add scroll to nav on very small screens
            css={css`
        @media (max-height: 15em) {
          ${logicalCSSWithFallback('overflow-y', 'auto')}
        }
      `}
        >
            {/* Dark deployments section */}
            <EuiFlexItem grow={false} style={{ flexShrink: 0 }}>
                <EuiCollapsibleNavGroup isCollapsible={false} background="dark">
                    <EuiListGroup
                        maxWidth="none"
                        gutterSize="none"
                        size="s"
                        listItems={[
                            {
                                label: 'Manage deployment',
                                href: '#',
                                iconType: 'logoCloud',
                                iconProps: {
                                    color: 'ghost',
                                },
                            },
                        ]}
                    />
                </EuiCollapsibleNavGroup>
            </EuiFlexItem>
            {/* Shaded pinned section always with a home item */}
            <EuiFlexItem grow={false} style={{ flexShrink: 0 }}>
                <EuiCollapsibleNavGroup
                    background="light"
                    style={{ maxHeight: '40vh' }}
                    className="eui-yScroll"
                >
                    <EuiPinnableListGroup
                        aria-label="Pinned links" // A11y : Since this group doesn't have a visible `title` it should be provided an accessible description
                        listItems={alterLinksWithCurrentState(TopLinks).concat(
                            alterLinksWithCurrentState(pinnedItems, true)
                        )}
                        unpinTitle={addLinkNameToUnpinTitle}
                        onPinClick={removePin}
                        maxWidth="none"
                        color="text"
                        gutterSize="none"
                        size="s"
                    />
                </EuiCollapsibleNavGroup>
            </EuiFlexItem>
            <EuiHorizontalRule margin="none" />
            {/* BOTTOM */}
            <EuiFlexItem
                className="eui-yScroll"
                // Accessibility - Allows nav items to be seen and interacted with on very small screen sizes
                css={css`
          @media (max-height: 15em) {
            flex: 1 0 auto;
          }
        `}
            >
                {/* Kibana section */}
                <EuiCollapsibleNavGroup
                    title={
                        <a
                            className="eui-textInheritColor"
                            href="#/navigation/collapsible-nav"
                            onClick={(e) => e.stopPropagation()}
                        >
                            Kibana
                        </a>
                    }
                    buttonElement="div"
                    iconType="logoKibana"
                    isCollapsible={true}
                    initialIsOpen={openGroups.includes('Kibana')}
                    onToggle={(isOpen: boolean) => toggleAccordion(isOpen, 'Kibana')}
                >
                    <EuiPinnableListGroup
                        aria-label="Kibana" // A11y : EuiCollapsibleNavGroup can't correctly pass the `title` as the `aria-label` to the right HTML element, so it must be added manually
                        listItems={alterLinksWithCurrentState(KibanaLinks)}
                        pinTitle={addLinkNameToPinTitle}
                        onPinClick={addPin}
                        maxWidth="none"
                        color="subdued"
                        gutterSize="none"
                        size="s"
                    />
                </EuiCollapsibleNavGroup>
                {/* Security callout */}
                {SecurityGroup}
                {/* Learn section */}
                <EuiCollapsibleNavGroup
                    title={
                        <a
                            className="eui-textInheritColor"
                            href="#/navigation/collapsible-nav"
                            onClick={(e) => e.stopPropagation()}
                        >
                            Training
                        </a>
                    }
                    buttonElement="div"
                    iconType="training"
                    isCollapsible={true}
                    initialIsOpen={openGroups.includes('Learn')}
                    onToggle={(isOpen: boolean) => toggleAccordion(isOpen, 'Learn')}
                >
                    <EuiPinnableListGroup
                        aria-label="Learn" // A11y : EuiCollapsibleNavGroup can't correctly pass the `title` as the `aria-label` to the right HTML element, so it must be added manually
                        listItems={alterLinksWithCurrentState(LearnLinks)}
                        pinTitle={addLinkNameToPinTitle}
                        onPinClick={addPin}
                        maxWidth="none"
                        color="subdued"
                        gutterSize="none"
                        size="s"
                    />
                </EuiCollapsibleNavGroup>
            </EuiFlexItem>
            <EuiFlexItem grow={false}>
                {/* Span fakes the nav group into not being the first item and therefore adding a top border */}
                <span />
                <EuiCollapsibleNavGroup>
                    <EuiButton fill fullWidth iconType="plusInCircleFilled">
                        Add data
                    </EuiButton>
                </EuiCollapsibleNavGroup>
            </EuiFlexItem>
        </EuiCollapsibleNav>
    );

    const collapsibleNavBeta = (
        <EuiCollapsibleNavBeta initialIsCollapsed={false} side="left"
                               id={collapsibleNavId}
        >
            <EuiCollapsibleNavBeta.Body>
                <EuiCollapsibleNavItem
                    icon="logoElasticsearch"
                    isCollapsible={false}
                    items={[
                        {
                            href: '#',
                            title: 'Get started'
                        },
                        {
                            renderItem: () => {}
                        },
                        {
                            onClick: () => {},
                            title: 'Discover'
                        },
                        {
                            href: '#',
                            title: 'Dashboards'
                        },
                        {
                            href: '#',
                            title: 'Visualize library'
                        },
                        {
                            items: [
                                {
                                    href: '#',
                                    title: 'Anomaly detection'
                                },
                                {
                                    href: '#',
                                    title: 'Data frame analytics'
                                },
                                {
                                    items: [
                                        {
                                            href: '#',
                                            title: 'Sub item 1'
                                        },
                                        {
                                            href: '#',
                                            title: 'Sub item 2'
                                        }
                                    ],
                                    title: 'Sub group'
                                }
                            ],
                            title: 'Machine learning'
                        },
                        {
                            renderItem: () => {}
                        },
                        {
                            renderItem: () => {}
                        },
                        {
                            href: '#',
                            title: 'Indices'
                        },
                        {
                            href: '#',
                            title: 'Transforms'
                        },
                        {
                            href: '#',
                            title: 'Indexing API'
                        },
                        {
                            renderItem: () => {}
                        },
                        {
                            href: '#',
                            title: 'API keys'
                        }
                    ] as any}
                    title="Elasticsearch"
                />
            </EuiCollapsibleNavBeta.Body>
            <EuiCollapsibleNavBeta.Footer>
                <EuiCollapsibleNavItem
                    icon="clock"
                    items={[
                        {
                            href: '#',
                            icon: 'visMapRegion',
                            title: 'Lorem ipsum'
                        },
                        {
                            href: '#',
                            icon: 'visPie',
                            title: 'Consectetur cursus'
                        },
                        {
                            href: '#',
                            icon: 'visMetric',
                            title: 'Ultricies tellus'
                        }
                    ]}
                    title="Recent"
                />
                <EuiCollapsibleNavItem
                    icon="editorCodeBlock"
                    items={[
                        {
                            href: '#',
                            title: 'Console'
                        },
                        {
                            href: '#',
                            title: 'Search profiler'
                        },
                        {
                            href: '#',
                            title: 'Grok debugger'
                        },
                        {
                            href: '#',
                            title: 'Painless lab'
                        }
                    ]}
                    title="Developer tools"
                />
                <EuiCollapsibleNavItem
                    icon="gear"
                    items={[
                        {
                            items: [
                                {
                                    href: '#',
                                    title: 'Integrations'
                                },
                                {
                                    href: '#',
                                    title: 'Fleet'
                                },
                                {
                                    href: '#',
                                    title: 'Osquery'
                                },
                                {
                                    href: '#',
                                    title: 'Stack monitoring'
                                },
                                {
                                    href: '#',
                                    title: 'Stack management'
                                }
                            ],
                            title: 'Management'
                        },
                        {
                            href: '#',
                            linkProps: {
                                target: '_blank'
                            },
                            title: 'Users and roles'
                        },
                        {
                            href: '#',
                            linkProps: {
                                target: '_blank'
                            },
                            title: 'Performance'
                        },
                        {
                            href: '#',
                            linkProps: {
                                target: '_blank'
                            },
                            title: 'Billing and subscription'
                        }
                    ]}
                    title="Project settings"
                />

            </EuiCollapsibleNavBeta.Footer>
        </EuiCollapsibleNavBeta>

        )

    const leftTopHeaderSectionItems = [
        // collapsibleNav,
        <EuiHeaderLogo href={exitPath} iconType="logoElastic">
            Elastic
        </EuiHeaderLogo>,

        <HeaderSpacesMenu />
    ];



    const leftSectionItems = [
        collapsibleNavBeta,
    ];


    return (
        <>
            <EuiHeader
                theme="dark"
                position="fixed"
                sections={[
                    {
                        items: leftTopHeaderSectionItems,
                    },
                    {
                        items: [
                            <>{search}</>,
                            <HeaderUpdates />,
                            <EuiHeaderLinks aria-label="App navigation links example">
                                {(closeMobilePopover) => (
                                    <>
                                        <EuiHeaderLink isActive onClick={closeMobilePopover}>
                                            Docs
                                        </EuiHeaderLink>

                                        <EuiHeaderLink onClick={closeMobilePopover}>Code</EuiHeaderLink>

                                        <EuiHeaderLink iconType="help" onClick={closeMobilePopover}>
                                            Help
                                        </EuiHeaderLink>
                                    </>
                                )}
                            </EuiHeaderLinks>,
                            <HeaderUserMenu />,
                            <HeaderAppMenu />
                        ],
                    },
                ]}
            />
            <EuiHeader
                position="fixed"
                sections={[
                    {
                        items: leftSectionItems,
                    },
                    {
                        items: [
                            <SubHeaderRightMenu />
                        ]
                    }

                ]}
            />
            <EuiPageTemplate>
                <EuiPageTemplate.EmptyPrompt>
                    <EuiImage size="fullWidth" alt="Fake paragraph" url={contentSvg} />
                </EuiPageTemplate.EmptyPrompt>
            </EuiPageTemplate>
        </>
    );
};


export default KibanaApp;
