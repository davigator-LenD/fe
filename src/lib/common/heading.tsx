import React from 'react'
export const Text = ({ children }: React.PropsWithChildren) => <div className="flex flex-col">{children}</div>
export const Heading = ({ children }: React.PropsWithChildren) => <h1 className="text-4xl font-[700]">{children}</h1>
const SubHeading = ({ children }: React.PropsWithChildren) => <h3 className="text-2xl font-[300]">{children}</h3>
Text.Heading = Heading
Text.SubHeading = SubHeading
