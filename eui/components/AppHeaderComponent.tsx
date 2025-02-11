import {
  EuiAvatar,
  EuiBreadcrumb,
  EuiButton,
  EuiFlexGroup,
  EuiFlexItem,
  EuiHeader,
  EuiHeaderBreadcrumbs,
  EuiHeaderLogo,
  EuiHeaderSection,
  EuiHeaderSectionItem,
  EuiHeaderSectionItemButton,
  EuiIcon,
  EuiKeyPadMenu,
  EuiKeyPadMenuItem,
  EuiLink,
  EuiPopover,
  EuiPopoverFooter,
  EuiPopoverTitle,
  EuiSelectable,
  EuiSelectableMessage,
  EuiSelectableOption,
  EuiSelectableProps,
  EuiSelectableTemplateSitewide,
  EuiSpacer,
  EuiText,
  useGeneratedHtmlId,
  EuiHeaderLink, EuiHeaderLinks,
  EuiFlyout,
  EuiPortal,
  EuiButtonEmpty,
  EuiBadge,
  EuiFlyoutBody, EuiFlyoutFooter, EuiFlyoutHeader,
  EuiTitle,
  EuiHeaderAlert,
  useEuiTheme
} from "@elastic/eui"
import React, { useState } from "react"
import { Link } from "react-router-dom"



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


export const AppHeaderComponent = () => {
  const renderLogo = () => <EuiHeaderLogo iconType="logoElastic" href="#" onClick={(e) => e.preventDefault()} aria-label="Go to home page">Logo</EuiHeaderLogo>

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

  return (
      <EuiHeader>
        <EuiHeaderSection>
          <EuiHeaderSectionItem>{renderLogo()}</EuiHeaderSectionItem>
          <EuiHeaderSectionItem>
            <HeaderSpacesMenu />
          </EuiHeaderSectionItem>
        </EuiHeaderSection>

        {renderBreadcrumbs()}

        <EuiHeaderSection side="right">
          <EuiHeaderSectionItem>
            <HeaderUpdates />
          </EuiHeaderSectionItem>

          <EuiHeaderSectionItem>
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
            </EuiHeaderLinks>
          </EuiHeaderSectionItem>

          <EuiHeaderSectionItem>{search}</EuiHeaderSectionItem>

          <EuiHeaderSectionItem>
            <HeaderUserMenu />
          </EuiHeaderSectionItem>

          <EuiHeaderSectionItem>
            <HeaderAppMenu />
          </EuiHeaderSectionItem>
        </EuiHeaderSection>
      </EuiHeader>
  )
}
