import { validator } from '@metal-box/type'

export const v = {
    max: (maxNum: number) =>
        validator((x: number, e) => {
            if (x > maxNum)
                e.push({
                    error_type: 'max_value_error',
                    message: `Value ${x} is greater than ${maxNum}`,
                })
            return x <= maxNum
        }),
    min: (minNum: number) =>
        validator((x: number, e) => {
            if (x < minNum)
                e.push({
                    error_type: 'min_value_error',
                    message: `Value ${x} is less than ${minNum}`,
                })
            return x >= minNum
        }),
    oneOf: <T>(arr: T[]) =>
        validator((x: T, e) => {
            if (!arr.includes(x))
                e.push({
                    error_type: 'one_of_error',
                    message: `Value ${x} is not one of [${arr.join(', ')}]`,
                })
            return arr.includes(x)
        }),
} as const
