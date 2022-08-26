import React, { useState } from "react";
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col } from "reactstrap";
import classnames from "classnames";
import _ from "lodash";
import './style.css'

export interface ITabProperties {
    title: string;
    component: JSX.Element;
}

type IProps = {
    tabs: ITabProperties[];
};

const SubNavBar = (props: IProps) => {
    const [activeTab, setActiveTab] = useState("1");

    function getTabId(index: number) {
        return (index + 1).toString();
    }

    return (
        <div className="sub-nav-bar">
            <Nav tabs>
                {props.tabs.map((tab, index) => {
                    let tabId: string = getTabId(index);
                    return (
                        <NavItem key={index}>
                            <NavLink className={classnames({ active: activeTab === tabId })} onClick={() => setActiveTab(tabId)}>
                                {tab.title}
                            </NavLink>
                        </NavItem>
                    );
                })}
            </Nav>
            <TabContent activeTab={activeTab}>
                {props.tabs.map((tab, index) => {
                    let tabId: string = getTabId(index);
                    return (
                        <TabPane key={index} tabId={tabId}>
                            <Row>
                                <Col sm="12">
                                    {tab.component}
                                </Col>
                            </Row>
                        </TabPane>
                    );
                })}
            </TabContent>
        </div>
    );
};

export default SubNavBar;
