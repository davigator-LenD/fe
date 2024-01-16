import { describe, expect, it } from 'vitest'
const hi = (name: string) => `Hi ${name}!`

describe('Hi module', () => {
    it("should return 'Hi John!'", () => {
        expect(hi('John')).toBe('Hi John!')
    })
})
