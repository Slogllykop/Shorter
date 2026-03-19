/**
 * Barrel re-export for dashboard actions.
 * The actual implementations live in actions/auth.ts and actions/links.ts.
 */

export type { AuthResult } from "./actions/auth";
export { sendOtp, signOut } from "./actions/auth";
export type { LinkData, LinkResult } from "./actions/links";
export {
    createLink,
    deleteLink,
    getLinks,
    updateLink,
} from "./actions/links";
