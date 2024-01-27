import { createTools, type Tailwindest } from 'tailwindest'

export const tw = createTools<Tw>()
export type Tw = Tailwindest<
    {
        color:
            | 'primary-logo'
            | 'primary-icon'
            | 'primary-box'
            | 'primary-toggleBG'
            | 'primary-textfieldBOX'
            | 'background'
    },
    {
        fontFamily: 'eng' | 'kor'
        fontSize: '8xl' | '6xl' | '4xl' | '3xl' | '2xl' | 'xl'
    }
>
