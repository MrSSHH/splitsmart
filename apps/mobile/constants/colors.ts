export const theme = {
  colors: {
    // --- FOUNDATION (The "Canvas") ---
    /** The deepest layer. Use for the main screen container.
     * Slightly blue-tinted to reduce OLED "smearing" compared to #000. */
    background: "#0B0F14",

    /** Layer 1 elevation. Use for containers, cards, and list items.
     * Provides visual separation from the background. */
    card: "#121821",

    /** Structural lines. Use for hair-line dividers between list items
     * or as a 1px stroke around cards to define their shape. */
    border: "#1F2933",

    // --- TYPOGRAPHY (The "Content") ---
    /** Highest emphasis. Use for account balances, headers, and
     * critical data points that must be readable at a glance. */
    textPrimary: "#E6EDF3",

    /** Medium emphasis. Use for sub-headers, descriptions,
     * and secondary labels (e.g., "Account Number"). */
    textSecondary: "#9AA4AF",

    /** Low emphasis. Use for metadata, timestamps, or
     * disclaimer text that shouldn't distract the user. */
    textMuted: "#6B7280",

    // --- INTERACTION (The "Actions") ---
    /** Brand identity. Use for primary action buttons (e.g., "Transfer"),
     * active tab icons, and progress bars. */
    primary: "#3B82F6",

    /** Feedback state. Use for the 'underlayColor' in Touchables
     * to give users visual confirmation that a press was registered. */
    primaryPressed: "#2563EB",

    // --- SEMANTIC STATES (The "Financial Logic") ---
    /** Growth/Income. Use for positive price movements,
     * successful transaction badges, and "Receive" buttons. */
    success: "#22C55E",

    /** Loss/Danger. Use for negative price movements,
     * withdrawal actions, or "Delete Account" alerts. */
    danger: "#EF4444",

    /** Caution/Pending. Use for "In Review" transactions,
     * low balance alerts, or unverified account states. */
    warning: "#F59E0B",

    // --- UTILITY (Optional but helpful) ---
    /** Overlay for modals. Apply with 0.5 opacity
     * to dim the background when a popup is active. */
    overlay: "rgba(0, 0, 0, 0.7)",

    // --- AUTH SPECIFIC ---
    /** Background for text inputs. Darker than the card to look "hollow." */
    inputBackground: "#090D11",

    /** The border of the input when not selected. */
    inputBorder: "#1F2933",

    /** The border when the user is typing. Use Primary Blue. */
    inputFocus: "#3B82F6",

    /** For "Forgot Password?" or "Create Account" links. */
    linkText: "#3B82F6",

    /** Validation text color for "Password too short" etc. */
    errorText: "#EF4444",
  },
};
