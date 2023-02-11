export const selectedGreenStyle = {
    control: () => ({
        display: "flex",
        minHeight: "32px",
        padding: "4px 0",
        borderRadius: "16px",
        background: "#E3E3E3",
        border: "none"
    }),
    multiValueLabel: () => ({
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
        display: "flex",
        minHeight: "32px",
        padding: "4px 0",
        borderRadius: "16px",
        background: "#E3E3E3",
        border: "none"
    }),
    multiValueLabel: () => ({
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
        display: "flex",
        minHeight: "32px",
        padding: "4px 0",
        borderRadius: "16px",
        background: "#E3E3E3",
        border: "none"
    }),
    multiValueLabel: () => ({
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
