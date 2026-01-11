import { createSystem, defaultConfig } from "@chakra-ui/react";

/**
 * Chakra UI Custom System
 * -----------------------
 * Defines the design tokens and fonts for Chakra UI.
 *
 * Responsibilities:
 * - Set default fonts for heading and body to "Montserrat, sans-serif".
 * - Extend Chakra UI default system to include the custom theme.
 * - Exported as `system` and passed to `ChakraProvider` in the app entry.
 */

export const system = createSystem(defaultConfig, {
  theme: {
    tokens: {
      fonts: {
        heading: { value: "Montserrat, sans-serif" },
        body: { value: "Montserrat, sans-serif" },
      },
    },
  },
});
