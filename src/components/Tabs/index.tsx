import React, { Fragment, useState } from 'react'

import './index.css'

interface ITabProps {
    label: string
    children: JSX.Element
}

const Tab = ({ children }: ITabProps): JSX.Element => {
    return <div>{children}</div>
}

interface ITabsProps {
    children: React.ReactElement<ITabProps>[]
    title: string
}

const Tabs = ({ children, title }: ITabsProps): JSX.Element => {
    const [activeIndex, setActiveIndex] = useState(0)

    const handleTabClick = (index: number): void => {
        setActiveIndex(index)
    }

    return (
        <Fragment>
            <div className="tabs">
                <h2 className="tabs-title">{title}</h2>
                <div className="tabs-buttons">
                    {children.map((child, index) => (
                        <button
                            className={
                                index === activeIndex
                                    ? 'tab-button-active'
                                    : 'tab-button'
                            }
                            key={index}
                            onClick={() => {
                                handleTabClick(index)
                            }}
                        >
                            {child.props.label}
                        </button>
                    ))}
                </div>
            </div>
            {children[activeIndex]}
        </Fragment>
    )
}

export { Tab, Tabs }
