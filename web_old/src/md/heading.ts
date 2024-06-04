import { type CompileContext, type HtmlExtension, type Token } from "micromark-util-types";

const writeHeaderStart = function(ctx: CompileContext, depth: number) {
    ctx.setData("headingRank", depth);
    ctx.lineEndingIfNeeded();
    ctx.raw("<h" + depth + ">");
}

export const fixed = function(depth: number): HtmlExtension {
    return {
        enter: {atxHeading: enterAtxHeading},
    }

    function enterAtxHeading(this: CompileContext, token: Token): undefined {
        writeHeaderStart(this, depth);
    }
}

/*
 * not done yet, don't know how to get the next token to calculate original rank.
export const indented = function(indent: number): HtmlExtension {
    return {
        enter: {atxHeading: enterAtxHeading},
    }

    function enterAtxHeading(this: CompileContext, token: Token): undefined {
        const depth = indent + this.sliceSerialize(token).length;
        writeHeaderStart(this, depth);
    }
}
 */
