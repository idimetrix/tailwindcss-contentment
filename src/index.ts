import plugin from "tailwindcss/plugin";

// Exporting the plugin with more flexible options and professional enhancements
export = plugin(
  function containerQueries({ matchUtilities, matchVariant, theme }) {
    let values: Record<string, string> = theme("containers") ?? {};

    // Function to extract numeric value with support for various CSS units
    function parseValue(value: string) {
      let numericValue = value.match(/^(\d+\.\d+|\d+|\.\d+)/)?.[0] ?? null;
      let unit = value.match(/[a-zA-Z%]+$/)?.[0] ?? "px"; // Default to 'px' if no unit is found

      if (numericValue === null) return null;

      return { numeric: parseFloat(numericValue), unit };
    }

    // Enhanced matchUtilities to handle flexible container types and additional modifiers
    matchUtilities(
      {
        "@container": (value, { modifier }) => {
          return {
            "container-type": value,
            "container-name": modifier ?? "default", // Fallback to 'default' if no modifier is provided
          };
        },
      },
      {
        values: {
          DEFAULT: "inline-size",
          normal: "normal",
          block: "block-size",
          flex: "flex-size", // Added new container types for more flexibility
        },
        modifiers: "any",
      },
    );

    // Enhanced matchVariant to support min-width and min-height queries, and multiple units
    matchVariant(
      "@",
      (value = "", { modifier }) => {
        let parsed = parseValue(value);

        if (parsed === null) return [];

        // Supports both width and height-based container queries
        let dimension = modifier?.includes("height")
          ? "min-height"
          : "min-width";
        return `@container ${modifier ?? ""} (${dimension}: ${parsed.numeric}${parsed.unit})`;
      },
      {
        values,
        sort(aVariant, zVariant) {
          let a = parseValue(aVariant.value);
          let z = parseValue(zVariant.value);

          if (a === null || z === null) return 0;

          // Sort values numerically regardless of unit
          if (a.numeric - z.numeric !== 0) return a.numeric - z.numeric;

          let aLabel = aVariant.modifier ?? "";
          let zLabel = zVariant.modifier ?? "";

          // Explicitly move empty labels to the end
          if (aLabel === "" && zLabel !== "") {
            return 1;
          } else if (aLabel !== "" && zLabel === "") {
            return -1;
          }

          // Sort labels alphabetically, ensuring consistent behavior across environments
          return aLabel.localeCompare(zLabel, "en", { numeric: true });
        },
      },
    );
  },
  {
    // Extended the theme to allow users to define their own container sizes and units
    theme: {
      containers: {
        xs: "20rem", // Supports rem, px, em, and percentage units
        sm: "24rem",
        md: "28rem",
        lg: "32rem",
        xl: "36rem",
        "2xl": "42rem",
        "3xl": "48rem",
        "4xl": "56rem",
        "5xl": "64rem",
        "6xl": "72rem",
        "7xl": "80rem",
        custom: "90%", // Added support for percentage values
      },
      units: {
        rem: "rem",
        px: "px",
        em: "em",
        vw: "vw",
        vh: "vh",
      },
    },
  },
);
