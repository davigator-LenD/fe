import React, { ReactNode } from 'react'

interface CompoundHeadingProps {
    children: ReactNode
}

export const CompoundHeading: React.FC<CompoundHeadingProps> = ({ children }) => {
    const modifiedChildren = React.Children.map(children, (child, index) => {
        const style = index === 0 ? `font-[700] text-4xl` : `text-2xl font-[300]` // Tailwind CSS classes

        return React.cloneElement(child as React.ReactElement, { style })
    })

    return <div>{modifiedChildren}</div>
}
interface HeadingProps {
    children: ReactNode
    style?: string
}

export const Heading: React.FC<HeadingProps> = ({ children, style }) => <div className={style}>{children}</div>

interface SubHeadingProps {
    children: ReactNode
    style?: string
}

export const SubHeading: React.FC<SubHeadingProps> = ({ children, style }) => <div className={style}>{children}</div>
