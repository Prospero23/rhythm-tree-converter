export default class Fraction {
    numerator: number
    denominator: number

    constructor(numerator: number, denominator: number){
        this.numerator = numerator
        this.denominator = denominator
    }

    /**
     * Adds another fraction to this one, mutating the current instance.
     * @param number Fraction to add
     */
    add(number: Fraction): void {
        if (number.denominator === this.denominator) {
            this.numerator += number.numerator;
            return;
        }

        // Find the least common denominator (LCD)
        const lcd = this.leastCommonDenom(this.denominator, number.denominator);
        const multiplierThis = lcd / this.denominator;
        const multiplierOther = lcd / number.denominator;

        this.numerator = this.numerator * multiplierThis + number.numerator * multiplierOther;
        this.denominator = lcd;
    }
    
    /**
     * 
     * @param number number to divide by
     * @returns result as NEW fraction
     */
    divide(number: number | Fraction): Fraction{
        if (typeof number === 'number'){
            const newDenominator = this.denominator * number
            return new Fraction(this.numerator, newDenominator)    
        }

        return new Fraction(this.numerator * number.denominator, this.denominator * number.numerator)
    }

    multiply(number: number): Fraction{
        const newNumerator = this.numerator * number
        return new Fraction (newNumerator, this.denominator)
    }

    /**
     * Returns NEW reduced version of fraction using gcd
     * @returns result as NEW fraction
     */
    reduce(): Fraction{
        const gcd = this.greatestCommonDenom(this.numerator, this.denominator)
        return new Fraction(this.numerator/gcd, this.denominator/gcd)
    }

    simplify(): number{
        return this.numerator / this.denominator
    }

    toString(): string{
        return `${this.numerator}/${this.denominator}`
    }

    private greatestCommonDenom(a: number, b: number): number{
        return b ? this.greatestCommonDenom(b, a%b) : a;
    }

    private leastCommonDenom(a: number, b: number): number {
        return (a * b) / this.greatestCommonDenom(a, b);
    }
}