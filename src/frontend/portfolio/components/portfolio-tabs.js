import React from 'react';
import InfoIcon from '@material-ui/icons/Public';
import ProjectIcon from '@material-ui/icons/ImportantDevices';
import StudiesIcon from '@material-ui/icons/School';

import { Tabs } from './../../theme/containers/tabs';
import { portfolioTabsStyles } from './portfolio-tabs.styles';
import { StudiesContainer } from './../../studies-list/containers/studies-container';
import { PersonalProfile } from './../../personal-profile/components';
import { ProjectsContainer } from './../../projects-list/containers/projects-container';

export const PortfolioTabs = ({ }) => {

    const classes = portfolioTabsStyles();

    const tabs = [
        {
            label: <span>&nbsp;Estudios</span>,
            icon: <StudiesIcon className={classes.iconTab} />
        },
        {
            label: <span>&nbsp;Proyectos</span>,
            icon: <ProjectIcon className={classes.iconTab} />
        },
        {
            label: <span>&nbsp;Información</span>,
            icon: <InfoIcon className={classes.iconTab} />
        },
    ];

    const tabsContent = [
        <StudiesContainer />,
        <ProjectsContainer />,
        <PersonalProfile />,
    ];

    return (
        <section id={'scroll'} className={classes.root}>
            <Tabs
                tabs={tabs}
                tabsContent={tabsContent}
            />
        </section>
    );

};