type JWCConsultationAnswer = {
    name: string,
    questionId: number,
    value: string
};

type JWCConsultationAnswerOption = {
    condition?: {
        questionId: number,
        answers: Array<string>
    },
    nextQuestion?: number,
    validator?: string,
    value: string,
    showImageText?: boolean,
    nextQuestionText?: string,
    nextQuestionTip?: string,
};

type JWCConsultationQuestion = {
    answer: {
        nextQuestion?: number,
        options?: Array<JWCConsultationAnswerOption>,
        type: string,
        validator?: string,
    },
    id: number,
    name: string,
    question: Array<string> | string,
    tip?: {
        image?: string,
        text?: string
    }
};

type JWCConsultationMessage = {
    image?: string,
    prefix?: string,
    text: string,
    type: string
};

type JWCConsultationResult = {
    hairColourType?: string,
    wantsToColour?: string,
    regrowthColour?: string,
    regrowthColourShade?: string,
    currentColour?: string,
    currentColourShade?: string,
    greyAmount?: string,
    greyDifficultCover?: string,
    colourAmbition?: string,
    unwantedTone?: string,
    hairTexture?: string,
    coloursAt?: string,
    toneAmbition?: string,
    careAmbition?: string,
    greyAim?: string
};

type JWCConsultationRecommendation = {
    title: string,
    handle: string,
    id: number,
    key: string,
    image: string,
    imageSmall: string,
    price: string,
    variantId: number,
    type: string
};

type JWCConsultationRecommendationCollection = {
    products: Array<JWCConsultationRecommendation>,
    reason: string
};

type JWCConsultationRecommendations = {
    care: JWCConsultationRecommendationCollection,
    concealer: JWCConsultationRecommendationCollection,
    permanent: JWCConsultationRecommendationCollection
};

type JWCConsultationPossibleMatch = {
    key: string
};

type JWCConsultationFinalColour = {
    allShades?: Array<string>,
    calculation?: Array<Function | number>,
    colour?: string,
    currentShadeIndex?: number,
    regrowthShadeIndex?: number,
    shade?: string,
    shadeIndex?: number,
    shadeNumber?: string,
    steps?: number
};
