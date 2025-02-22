const MuiStyles = {
  styleOutlineBrownBorder: {
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "grey",
      },
      "&:hover fieldset": {
        borderColor: "#414651",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#A47764",
      },
    },
  },
  buttonStyles: {
    brownDefaultBg: {
      backgroundColor: "#79716B", // Default background
      border: "2px solid rgba(255, 255, 255, 0.12)",
      "&:hover": {
        backgroundColor: "#6B5B53", // Slightly darker and muted brown
      },
    },

    bluePrimaryBg: {
      backgroundColor: "#3B5FAD", // Default background
      "&:hover": {
        backgroundColor: "#5A77D6", // Darker shade on hover
      },
    },

    contained: {
      primaryErrorBg: {
        backgroundColor: "#D92D20", // Default background
        "&:hover": {
          backgroundColor: "#B5231A", // Darker shade on hover
        },
      },
      dangerActionBg: {
        backgroundColor: "#ff3545", // Default background
        "&:hover": {
          backgroundColor: "#dd3946", // Darker shade on hover
        },
      },
    },

    outlined: {
      brown: {
        border: "1px solid #A47764",
        color: `#A47764`,
      },
    },
  },
  switchStyles: {
    brownPrimaryBg: {
      "& .MuiSwitch-switchBase": {
        color: "#A47764", // Thumb color when unchecked
      },
      "& .MuiSwitch-switchBase.Mui-checked": {
        color: "#A47764", // Thumb color when checked
      },
      "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
        backgroundColor: "#A47764", // Track color when checked
      },
    },
    green: {
      "& .MuiSwitch-switchBase": {
        color: "#fff", // Thumb color when unchecked
      },
      "& .MuiSwitch-switchBase.Mui-checked": {
        color: "#17B26A", // Thumb color when checked
      },
      "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
        backgroundColor: "#17B26A", // Track color when checked
      },
    },
  },
};

export default MuiStyles;
