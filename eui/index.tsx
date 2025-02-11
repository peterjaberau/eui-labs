import * as react from 'react';
import { AppHeaderComponent } from './components/AppHeaderComponent';
import { AppPageComponent } from './components/AppPageComponent';
import {EuiPage, EuiPageBody, EuiPageSidebar, EuiSpacer, EuiPageHeader, EuiPageSection, EuiButton} from "@elastic/eui";
import * as React from "react";
import {EuiPageTemplate} from "@elastic/eui";


export function EuiApp() {
  return (
    <>
        <AppHeaderComponent/>

        <EuiPageTemplate>
            <EuiPageTemplate.Sidebar>
                sidebar
            </EuiPageTemplate.Sidebar>
            <EuiPageTemplate.Header
             breadcrumbs={[
                 {
                     href: '#',
                     text: 'Breadcrumb 1'
                 },
                 {
                     href: '#',
                     text: 'Breadcrumb 2'
                 },
                 {
                     href: '#',
                     text: 'Current'
                 }
             ]}
             description="Example of a description."
             iconType="globe"
             pageTitle="Page title"
             rightSideItems={[
                 <EuiButton fill>Add something</EuiButton>,
                 <EuiButton>Do something</EuiButton>
             ]}
             restrictWidth={false}
            />
            <EuiPageTemplate.Section>
                content
            </EuiPageTemplate.Section>
            <EuiPageTemplate.BottomBar>
                bottom bar
            </EuiPageTemplate.BottomBar>


        </EuiPageTemplate>


    </>
);
}
