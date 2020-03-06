/**
 * @prettier
 */
export const questions = [
    {
        answer: {
            nextQuestion: 2,
            type: 'text'
        },
        id: 1,
        name: 'NAME',
        question: 'Foo bar baz'
    },
    {
        answer: {
            nextQuestion: 3,
            type: 'text'
        },
        id: 2,
        name: 'EMAIL',
        question: 'Bar baz foo'
    },
    {
        answer: {
            options: [
                {
                    nextQuestion: 4,
                    value: 'foo'
                },
                {
                    nextQuestion: 4,
                    value: 'bar'
                },
                {
                    nextQuestion: 4,
                    value: 'baz'
                }
            ],
            type: 'select'
        },
        id: 3,
        name: 'NUMBER',
        question: 'Baz foo bar'
    },
    {
        answer: {
            nextQuestion: 5,
            type: 'text'
        },
        id: 4,
        name: 'COLOUR',
        question: 'Bar baz foo'
    },
    {
        answer: {
            options: [
                {
                    endsQuiz: true,
                    value: 'foo'
                },
                {
                    nextQuestion: 6,
                    value: 'bar'
                },
                {
                    nextQuestion: 6,
                    value: 'baz'
                }
            ],
            type: 'select'
        },
        id: 5,
        name: 'SHADE',
        question: 'Bar baz foo'
    },
    {
        answer: {
            type: 'text'
        },
        id: 6,
        name: 'TEXTURE',
        question: 'Bar baz foo'
    }
];

export const answerOptions = [
    {
        label: 'Foo bar',
        nextQuestion: 2,
        value: 'Foo bar'
    }
];
