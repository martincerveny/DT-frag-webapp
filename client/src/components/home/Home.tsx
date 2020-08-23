/** @jsx jsx */
import React from 'react';
import styled from '@emotion/styled';
import {css, jsx} from '@emotion/core';
import {AssignmentDashboard} from "../assignment/assignmentDashboard/AssignmentDashboard";

const HomeComponent: React.FC = () => {
    return (
        <AssignmentDashboard/>
    );
};

const StyledHome = styled(HomeComponent)``;

export const Home = (props: any) => <StyledHome {...props} />;
