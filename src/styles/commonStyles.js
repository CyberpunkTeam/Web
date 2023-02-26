export const selectedGreenStyle = {
    control: () => ({
        fontFamily: "Inter",
        display: "flex",
        minHeight: "32px",
        padding: "4px 0",
        borderRadius: "16px",
        background: "#E3E3E3",
        border: "none"
    }),
    menu: (style) => ({
        ...style,
        padding: " 0 8px",
        maxHeight: "120px",
        borderRadius: "16px",
        background: "#FAFAFA"
    }),
    menuList: base => ({
        ...base,
        maxHeight: "120px" // your desired height
    }),
    option: (style, {isSelected}) => ({
        ...style,
        fontFamily: "Inter",
        borderRadius: "8px",
        backgroundColor: isSelected ? "rgba(8,155,173,0.2)" : undefined,
        ":hover": {
            background: "rgba(8,155,173,0.2)"
        }
    }),
    multiValueLabel: () => ({
            fontFamily: "Inter",
            background: "#089BAD",
            color: "#FAFAFA",
            padding: "4px 0 4px 8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderTopLeftRadius: "8px",
            borderBottomLeftRadius: "8px"
        }
    ),
    multiValueRemove: (theme, state) => ({
        fontFamily: "Inter",
        background: "#089BAD",
        color: "#FAFAFA",
        display: "flex",
        padding: "4px",
        alignItems: "center",
        justifyContent: "center",
        borderTopRightRadius: "8px",
        borderBottomRightRadius: "8px",
        cursor: "pointer",
        ':hover': {
            backgroundColor: "#CD5B45"
        },
    })
}

export const selectedViolet = {
    control: () => ({
        fontFamily: "Inter",
        display: "flex",
        minHeight: "32px",
        padding: "4px 0",
        borderRadius: "16px",
        background: "#E3E3E3",
        border: "none"
    }),
    menu: (style) => ({
        ...style,
        padding: " 0 8px",
        maxHeight: "120px",
        borderRadius: "16px",
        background: "#FAFAFA"
    }),
    menuList: base => ({
        ...base,
        maxHeight: "120px" // your desired height
    }),
    option: (style, {isSelected}) => ({
        ...style,
        fontFamily: "Inter",
        borderRadius: "8px",
        overflow: "hidden",
        backgroundColor: isSelected ? "rgba(141,100,204,0.2)" : undefined,
        ":hover": {
            background: "rgba(141,100,204,0.2)"
        }
    }),
    multiValueLabel: () => ({
            fontFamily: "Inter",
            background: "#8D64CC",
            color: "#FAFAFA",
            padding: "4px 0 4px 8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderTopLeftRadius: "8px",
            borderBottomLeftRadius: "8px"
        }
    ),
    multiValueRemove: (theme, state) => ({
        fontFamily: "Inter",
        background: "#8D64CC",
        color: "#FAFAFA",
        display: "flex",
        padding: "4px",
        alignItems: "center",
        justifyContent: "center",
        borderTopRightRadius: "8px",
        borderBottomRightRadius: "8px",
        cursor: "pointer",
        ':hover': {
            backgroundColor: "#CD5B45"
        },
    })
}

export const selectedViolet2 = {
    control: () => ({
        fontFamily: "Inter",
        display: "flex",
        minHeight: "32px",
        padding: "4px 0",
        borderRadius: "16px",
        background: "#E3E3E3",
        border: "none"
    }),
    menu: (style) => ({
        ...style,
        padding: " 0 8px",
        maxHeight: "120px",
        borderRadius: "16px",
        background: "#FAFAFA"
    }),
    menuList: base => ({
        ...base,
        maxHeight: "120px" // your desired height
    }),
    option: (style, {isSelected}) => ({
        ...style,
        fontFamily: "Inter",
        borderRadius: "8px",
        backgroundColor: isSelected ? "rgba(162,60,121,0.2)" : undefined,
        ":hover": {
            background: "rgba(162,60,121,0.2)"
        }
    }),
    multiValueLabel: () => ({
            fontFamily: "Inter",
            background: "#a23c79",
            color: "#FAFAFA",
            padding: "4px 0 4px 8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderTopLeftRadius: "8px",
            borderBottomLeftRadius: "8px"
        }
    ),
    multiValueRemove: (theme, state) => ({
        fontFamily: "Inter",
        background: "#a23c79",
        color: "#FAFAFA",
        display: "flex",
        padding: "4px",
        alignItems: "center",
        justifyContent: "center",
        borderTopRightRadius: "8px",
        borderBottomRightRadius: "8px",
        cursor: "pointer",
        ':hover': {
            backgroundColor: "#CD5B45"
        },
    })
}

export const selectedViolet3 = {
    control: () => ({
        fontFamily: "Inter",
        display: "flex",
        minHeight: "32px",
        padding: "4px 0",
        borderRadius: "16px",
        background: "#E3E3E3",
        border: "none"
    }),
    menu: (style) => ({
        ...style,
        padding: " 0 8px",
        maxHeight: "120px",
        borderRadius: "16px",
        background: "#FAFAFA"
    }),
    menuList: base => ({
        ...base,
        maxHeight: "120px" // your desired height
    }),
    option: (style, {isSelected}) => ({
        ...style,
        fontFamily: "Inter",
        borderRadius: "8px",
        backgroundColor: isSelected ? "rgba(152,80,163,0.2)" : undefined,
        ":hover": {
            background: "rgba(152,80,163,0.2)"
        }
    }),
    multiValueLabel: () => ({
            fontFamily: "Inter",
            background: "#9850A3",
            color: "#FAFAFA",
            padding: "4px 0 4px 8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderTopLeftRadius: "8px",
            borderBottomLeftRadius: "8px"
        }
    ),
    multiValueRemove: (theme, state) => ({
        fontFamily: "Inter",
        background: "#9850A3",
        color: "#FAFAFA",
        display: "flex",
        padding: "4px",
        alignItems: "center",
        justifyContent: "center",
        borderTopRightRadius: "8px",
        borderBottomRightRadius: "8px",
        cursor: "pointer",
        ':hover': {
            backgroundColor: "#CD5B45"
        },
    })
}

export const selectedColor5 = {
    control: () => ({
        fontFamily: "Inter",
        display: "flex",
        minHeight: "32px",
        padding: "4px 0",
        borderRadius: "16px",
        background: "#E3E3E3",
        border: "none"
    }),
    menu: (style) => ({
        ...style,
        padding: " 0 8px",
        maxHeight: "120px",
        borderRadius: "16px",
        background: "#FAFAFA"
    }),
    menuList: base => ({
        ...base,
        maxHeight: "120px" // your desired height
    }),
    option: (style, {isSelected}) => ({
        ...style,
        fontFamily: "Inter",
        borderRadius: "8px",
        backgroundColor: isSelected ? "rgba(75,128,189,0.2)" : undefined,
        ":hover": {
            background: "rgba(75,128,189,0.2)"
        }
    }),
    multiValueLabel: () => ({
            fontFamily: "Inter",
            background: "#4B80BD",
            color: "#FAFAFA",
            padding: "4px 0 4px 8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderTopLeftRadius: "8px",
            borderBottomLeftRadius: "8px"
        }
    ),
    multiValueRemove: (theme, state) => ({
        fontFamily: "Inter",
        background: "#4B80BD",
        color: "#FAFAFA",
        display: "flex",
        padding: "4px",
        alignItems: "center",
        justifyContent: "center",
        borderTopRightRadius: "8px",
        borderBottomRightRadius: "8px",
        cursor: "pointer",
        ':hover': {
            backgroundColor: "#CD5B45"
        },
    })
}

export const selected4 = {
    control: () => ({
        fontFamily: "Inter",
        display: "flex",
        minHeight: "32px",
        padding: "4px 0",
        borderRadius: "16px",
        background: "#E3E3E3",
        border: "none"
    }),
    menu: (style) => ({
        ...style,
        padding: " 0 8px",
        maxHeight: "120px",
        borderRadius: "16px",
        background: "#FAFAFA"
    }),
    menuList: base => ({
        ...base,
        maxHeight: "120px" // your desired height
    }),
    option: (style, {isSelected}) => ({
        ...style,
        fontFamily: "Inter",
        borderRadius: "8px",
        backgroundColor: isSelected ? "rgba(184,76,95,0.2)" : undefined,
        ":hover": {
            background: "rgba(184,76,95,0.2)"
        }
    }),
    multiValueLabel: () => ({
            fontFamily: "Inter",
            background: "#B84C5F",
            color: "#FAFAFA",
            padding: "4px 0 4px 8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderTopLeftRadius: "8px",
            borderBottomLeftRadius: "8px"
        }
    ),
    multiValueRemove: (theme, state) => ({
        fontFamily: "Inter",
        background: "#B84C5F",
        color: "#FAFAFA",
        display: "flex",
        padding: "4px",
        alignItems: "center",
        justifyContent: "center",
        borderTopRightRadius: "8px",
        borderBottomRightRadius: "8px",
        cursor: "pointer",
        ':hover': {
            backgroundColor: "#CD5B45"
        },
    })
}

export const modalStyle = {
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    content: {
        fontFamily: "Inter",
        padding: '0',
        borderWidth: 0,
        borderRadius: '16px',
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        boxShadow: "0px 4px 10px #666666",
    },
}

export const selectedCities = {
    control: () => ({
        fontFamily: "Inter",
        display: "flex",
        minHeight: "32px",
        padding: "4px 0",
        fontSize: "16px",
        borderRadius: "16px",
        background: "#E3E3E3",
        border: "none"
    }),
    menu: (style) => ({
        ...style,
        padding: " 0 8px",
        maxHeight: "120px",
        borderRadius: "16px",
        background: "#FAFAFA"
    }),
    menuList: base => ({
        ...base,
        maxHeight: "120px" // your desired height
    }),
    option: (style, {isSelected}) => ({
        ...style,
        fontFamily: "Inter",
        fontsize: "12px",
        color: "#222222",
        borderRadius: "8px",
        backgroundColor: isSelected ? "rgba(75,128,189,0.2)" : undefined,
        ":hover": {
            background: "rgba(75,128,189,0.2)"
        }
    })
}

export const selectedCitiesMobile = {
    control: () => ({
        fontFamily: "Inter",
        display: "flex",
        height: "100px",
        padding: "8px 0",
        fontSize: "40px",
        borderRadius: "45px",
        background: "#E3E3E3",
        border: "none"
    }),
    menu: (style) => ({
        ...style,
        fontFamily: "Inter",
        padding: " 0 24px",
        fontSize: "32px",
        maxHeight: "300px",
        borderRadius: "45px",
        background: "#FAFAFA"
    }),
    menuList: base => ({
        ...base,
        fontSize: "32px",
        maxHeight: "300px" // your desired height
    }),
    option: (style, {isSelected}) => ({
        ...style,
        fontFamily: "Inter",
        color: "#222222",
        fontSize: "40px",
        borderRadius: "16px",
        backgroundColor: isSelected ? "rgba(75,128,189,0.2)" : undefined,
        ":hover": {
            background: "rgba(75,128,189,0.2)"
        }
    }),
    dropdownIndicator: (base) => ({
        ...base,
        display: "none"
    }),
    clearIndicator: () => ({
        display: "none"
    }),
    indicatorSeparator: () => ({
        display: "none"
    })
}

export const selectedLanguages = {
    control: () => ({
        fontFamily: "Inter",
        display: "flex",
        minHeight: "100px",
        padding: "16px",
        fontSize: "32px",
        borderRadius: "45px",
        background: "#E3E3E3",
        border: "none"
    }),
    menu: (style) => ({
        ...style,
        fontFamily: "Inter",
        padding: " 0 24px",
        fontSize: "32px",
        maxHeight: "300px",
        borderRadius: "45px",
        background: "#FAFAFA"
    }),
    menuList: base => ({
        ...base,
        fontSize: "32px",
        maxHeight: "300px" // your desired height
    }),
    option: (style, {isSelected}) => ({
        ...style,
        fontFamily: "Inter",
        color: "#222222",
        borderRadius: "16px",
        fontSize: "40px",
        overflow: "hidden",
        backgroundColor: isSelected ? "rgba(141,100,204,0.2)" : undefined,
        ":hover": {
            background: "rgba(141,100,204,0.2)"
        }
    }),
    multiValueLabel: () => ({
            fontFamily: "Inter",
            background: "#8D64CC",
            color: "#FAFAFA",
            padding: "8px 0 8px 16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderTopLeftRadius: "16px",
            borderBottomLeftRadius: "16px"
        }
    ),
    multiValueRemove: (theme, state) => ({
        fontFamily: "Inter",
        background: "#8D64CC",
        color: "#FAFAFA",
        display: "flex",
        padding: "16px",
        alignItems: "center",
        justifyContent: "center",
        borderTopRightRadius: "16px",
        borderBottomRightRadius: "16px",
        cursor: "pointer",
        ':hover': {
            backgroundColor: "#CD5B45"
        },
    })
}

export const selectedFrameworks = {
    control: () => ({
        fontFamily: "Inter",
        display: "flex",
        minHeight: "100px",
        padding: "16px",
        fontSize: "32px",
        borderRadius: "45px",
        background: "#E3E3E3",
        border: "none"
    }),
    menu: (style) => ({
        ...style,
        fontFamily: "Inter",
        padding: " 0 24px",
        fontSize: "32px",
        maxHeight: "300px",
        borderRadius: "45px",
        background: "#FAFAFA"
    }),
    menuList: base => ({
        ...base,
        fontSize: "32px",
        maxHeight: "300px" // your desired height
    }),
    option: (style, {isSelected}) => ({
        ...style,
        fontFamily: "Inter",
        color: "#222222",
        borderRadius: "16px",
        fontSize: "40px",
        overflow: "hidden",
        backgroundColor: isSelected ? "rgba(152,80,163,0.2)" : undefined,
        ":hover": {
            background: "rgba(152,80,163,0.2)"
        }
    }),
    multiValueLabel: () => ({
            fontFamily: "Inter",
            background: "#9850A3",
            color: "#FAFAFA",
            padding: "8px 0 8px 16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderTopLeftRadius: "16px",
            borderBottomLeftRadius: "16px"
        }
    ),
    multiValueRemove: (theme, state) => ({
        fontFamily: "Inter",
        background: "#9850A3",
        color: "#FAFAFA",
        display: "flex",
        padding: "16px",
        alignItems: "center",
        justifyContent: "center",
        borderTopRightRadius: "16px",
        borderBottomRightRadius: "16px",
        cursor: "pointer",
        ':hover': {
            backgroundColor: "#CD5B45"
        },
    })
}

export const selectedPlatform = {
    control: () => ({
        fontFamily: "Inter",
        display: "flex",
        minHeight: "100px",
        padding: "16px",
        fontSize: "32px",
        borderRadius: "45px",
        background: "#E3E3E3",
        border: "none"
    }),
    menu: (style) => ({
        ...style,
        fontFamily: "Inter",
        padding: " 0 24px",
        fontSize: "32px",
        maxHeight: "300px",
        borderRadius: "45px",
        background: "#FAFAFA"
    }),
    menuList: base => ({
        ...base,
        fontSize: "32px",
        maxHeight: "300px" // your desired height
    }),
    option: (style, {isSelected}) => ({
        ...style,
        fontFamily: "Inter",
        color: "#222222",
        borderRadius: "16px",
        fontSize: "40px",
        overflow: "hidden",
        backgroundColor: isSelected ? "rgba(162,60,121,0.2)" : undefined,
        ":hover": {
            background: "rgba(162,60,121,0.2)"
        }
    }),
    multiValueLabel: () => ({
            fontFamily: "Inter",
            background: "#a23c79",
            color: "#FAFAFA",
            padding: "8px 0 8px 16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderTopLeftRadius: "16px",
            borderBottomLeftRadius: "16px"
        }
    ),
    multiValueRemove: (theme, state) => ({
        fontFamily: "Inter",
        background: "#a23c79",
        color: "#FAFAFA",
        display: "flex",
        padding: "16px",
        alignItems: "center",
        justifyContent: "center",
        borderTopRightRadius: "16px",
        borderBottomRightRadius: "16px",
        cursor: "pointer",
        ':hover': {
            backgroundColor: "#CD5B45"
        },
    })
}

export const selectedCloud = {
    control: () => ({
        fontFamily: "Inter",
        display: "flex",
        minHeight: "100px",
        padding: "16px",
        fontSize: "32px",
        borderRadius: "45px",
        background: "#E3E3E3",
        border: "none"
    }),
    menu: (style) => ({
        ...style,
        fontFamily: "Inter",
        padding: " 0 24px",
        fontSize: "32px",
        maxHeight: "300px",
        borderRadius: "45px",
        background: "#FAFAFA"
    }),
    menuList: base => ({
        ...base,
        fontSize: "32px",
        maxHeight: "300px" // your desired height
    }),
    option: (style, {isSelected}) => ({
        ...style,
        fontFamily: "Inter",
        color: "#222222",
        borderRadius: "16px",
        fontSize: "40px",
        overflow: "hidden",
        backgroundColor: isSelected ? "rgba(184,76,95,0.2)" : undefined,
        ":hover": {
            background: "rgba(184,76,95,0.2)"
        }
    }),
    multiValueLabel: () => ({
            fontFamily: "Inter",
            background: "#B84C5F",
            color: "#FAFAFA",
            padding: "8px 0 8px 16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderTopLeftRadius: "16px",
            borderBottomLeftRadius: "16px"
        }
    ),
    multiValueRemove: (theme, state) => ({
        fontFamily: "Inter",
        background: "#B84C5F",
        color: "#FAFAFA",
        display: "flex",
        padding: "16px",
        alignItems: "center",
        justifyContent: "center",
        borderTopRightRadius: "16px",
        borderBottomRightRadius: "16px",
        cursor: "pointer",
        ':hover': {
            backgroundColor: "#CD5B45"
        },
    })
}

export const selectedDb = {
    control: () => ({
        fontFamily: "Inter",
        display: "flex",
        minHeight: "100px",
        padding: "16px",
        fontSize: "32px",
        borderRadius: "45px",
        background: "#E3E3E3",
        border: "none"
    }),
    menu: (style) => ({
        ...style,
        fontFamily: "Inter",
        padding: " 0 24px",
        fontSize: "32px",
        maxHeight: "300px",
        borderRadius: "45px",
        background: "#FAFAFA"
    }),
    menuList: base => ({
        ...base,
        fontSize: "32px",
        maxHeight: "300px" // your desired height
    }),
    option: (style, {isSelected}) => ({
        ...style,
        fontFamily: "Inter",
        color: "#222222",
        borderRadius: "16px",
        fontSize: "40px",
        overflow: "hidden",
        backgroundColor: isSelected ? "rgba(75,128,189,0.2)" : undefined,
        ":hover": {
            background: "rgba(75,128,189,0.2)"
        }
    }),
    multiValueLabel: () => ({
            fontFamily: "Inter",
            background: "#4B80BD",
            color: "#FAFAFA",
            padding: "8px 0 8px 16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderTopLeftRadius: "16px",
            borderBottomLeftRadius: "16px"
        }
    ),
    multiValueRemove: (theme, state) => ({
        fontFamily: "Inter",
        background: "#4B80BD",
        color: "#FAFAFA",
        display: "flex",
        padding: "16px",
        alignItems: "center",
        justifyContent: "center",
        borderTopRightRadius: "16px",
        borderBottomRightRadius: "16px",
        cursor: "pointer",
        ':hover': {
            backgroundColor: "#CD5B45"
        },
    })
}

export const selectPref = {
    control: () => ({
        fontFamily: "Inter",
        display: "flex",
        minHeight: "100px",
        padding: "16px",
        fontSize: "32px",
        borderRadius: "45px",
        background: "#E3E3E3",
        border: "none"
    }),
    menu: (style) => ({
        ...style,
        fontFamily: "Inter",
        padding: " 0 24px",
        fontSize: "32px",
        maxHeight: "300px",
        borderRadius: "45px",
        background: "#FAFAFA"
    }),
    menuList: base => ({
        ...base,
        fontSize: "32px",
        maxHeight: "300px" // your desired height
    }),
    option: (style, {isSelected}) => ({
        ...style,
        fontFamily: "Inter",
        color: "#222222",
        borderRadius: "16px",
        fontSize: "40px",
        overflow: "hidden",
        backgroundColor: isSelected ? "rgba(8,155,173,0.2)" : undefined,
        ":hover": {
            background: "rgba(8,155,173,0.2)"
        }
    }),
    multiValueLabel: () => ({
            fontFamily: "Inter",
            background: "#089BAD",
            color: "#FAFAFA",
            padding: "8px 0 8px 16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderTopLeftRadius: "16px",
            borderBottomLeftRadius: "16px"
        }
    ),
    multiValueRemove: (theme, state) => ({
        fontFamily: "Inter",
        background: "#089BAD",
        color: "#FAFAFA",
        display: "flex",
        padding: "16px",
        alignItems: "center",
        justifyContent: "center",
        borderTopRightRadius: "16px",
        borderBottomRightRadius: "16px",
        cursor: "pointer",
        ':hover': {
            backgroundColor: "#CD5B45"
        },
    })
}
