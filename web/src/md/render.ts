import { micromark } from "micromark";
import { fixed } from "./heading";

export const fixedHeadings = function(depth: number, text: string) {
    const fixedHeading = fixed(depth);
    return micromark(text, {htmlExtensions: [fixedHeading]});
}

/*
export const indentedHeadings = function(indent: number, text: string) {
    const indentedHeading = indented(indent);
    return micromark(text, {htmlExtensions: [indentedHeading]});
}
 */
