const lowExposure = {
    risk: 'Low',
    color: '#009000',
    description: 'Low exposure. No sun protection needed.',
}

const moderateExposure = {
    risk: 'Moderate',
    color: '#AFAF00',
    description:
        'Moderate exposure. Think about sun protection, especially between 11am-3pm.',
}

const highExposure = {
    risk: 'High',
    color: '#BA7900',
    description: 'High exposure. Skin protection needed for most skin tones.',
}

const veryHighExposure = {
    risk: 'Very High',
    color: '#A70000',
    description:
        'Very high exposure. Skin protection needed for all skin tones.',
}

type UvRatings = Record<
    number,
    {
        risk: string
        color: string
        description: string
    }
>

export const uvRatings: UvRatings = {
    0: lowExposure,
    1: lowExposure,
    2: lowExposure,
    3: moderateExposure,
    4: moderateExposure,
    5: moderateExposure,
    6: highExposure,
    7: highExposure,
    8: veryHighExposure,
    9: veryHighExposure,
}
