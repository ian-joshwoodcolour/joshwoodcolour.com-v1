/**
 * @prettier
 * @flow
 */
import get from 'lodash/get';

export const questions = [
    {
        id: 1,
        name: 'NAME',
        question: ['Hi!', "Let's get started. What is your name?"],
        answer: {
            nextQuestion: 2,
            type: 'text'
        }
    },
    {
        id: 2,
        name: 'HAIRTYPE',
        question: [
            "Hi {NAME}; our Josh Wood Colour System consists of 4 steps designed to help you create  and care for your perfect colour. You're only minutes away from your very own, personalised system.",
            'Firstly, what type of hair colour do you currently have?'
        ],
        answer: {
            options: [
                {
                    nextQuestion: 3,
                    value: 'All-over colour'
                },
                {
                    nextQuestion: 3,
                    value: 'None, my colour is natural'
                },
                {
                    endsQuiz: true,
                    value: 'Bleach, highlights, balayage'
                },
                {
                    endsQuiz: true,
                    value: `I'm not sure!`
                },
                {
                    endsQuiz: true,
                    value: 'Henna'
                }
            ],
            type: 'select'
        }
    },
    {
        id: 3,
        name: 'GREYAMOUNT',
        question: 'Next, how grey are you?',
        tip: {
            prefix: "Josh's tip",
            text:
                'If you have more than a few stray strands, take a look at a section of hair around the middle of your head to roughly judge what percentage of your hair is grey.'
        },
        answer: {
            options: [
                {
                    nextQuestion: 5,
                    value: 'None (0%)'
                },
                {
                    nextQuestion: 5,
                    value: 'Very few (less than 10%)'
                },
                {
                    nextQuestion: 5,
                    value: 'Some (10-50%)'
                },
                {
                    nextQuestion: 5,
                    value: 'Most (50-80%)'
                },
                {
                    nextQuestion: 4,
                    value: 'All (80-100%)'
                }
            ],
            type: 'select'
        }
    },
    {
        id: 4,
        name: 'GREYCOVERAIM',
        question: 'We know everyone is different; how do you feel about your greys?',
        answer: {
            options: [
                {
                    nextQuestion: 11,
                    value: `I'm not ready to be grey yet! Let's cover it`
                },
                {
                    nextQuestion: 10,
                    value: 'I love my grey! I just need care',
                    nextQuestionText:
                        'As you grey, your hair texture can often change, which means a change in hair care, too. Complete this sentence. I need help to…'
                },
                {
                    nextQuestion: 10,
                    value: `I'm embracing it! I'm growing out my grey`,
                    nextQuestionText:
                        'As you grey, your hair texture can often change, which means a change in hair care, too. Complete this sentence. I need help to…',
                    nextQuestionTip: `I love grey hair; I have grey hair. But I know that growing out your greys can be a slow and frustrating process. I’ve pulled together some expert tips and tricks to help you through this journey as best I can. <a href="/blogs/tips-tricks/how-to-grow-out-your-grey-hair">Read my blog here</a>`
                }
            ],
            type: 'select'
        }
    },
    {
        id: 5,
        name: 'CURCOLOUR',
        question: 'What is your current hair colour?',
        tip: {
            prefix: "Josh's tip",
            text:
                'Select the closest match to the lengths of your hair, ignoring your roots/regrowth for now.'
        },
        answer: {
            options: [
                {
                    endsQuiz: true,
                    value: 'Black'
                },
                {
                    nextQuestion: 6,
                    value: 'Dark brown'
                },
                {
                    nextQuestion: 6,
                    value: 'Light brown'
                },
                {
                    nextQuestion: 6,
                    value: 'Dark blonde'
                },
                {
                    nextQuestion: 6,
                    value: 'Light blonde'
                },
                {
                    nextQuestion: 17,
                    value: 'Red',
                    nextQuestionText: `it's on its way! Josh is currently working on products specifically developed for redheads; sign up here to be the first to know when these are available.`
                },
                {
                    nextQuestion: 17,
                    value: 'Other',
                    nextQuestionText: `Our current range covers the colour spectrum from darkest brown to lightest blonde, but Josh is always working on new products so please do watch this space. To be the first to know all of our latest news and offers, enter your email below`
                }
            ],
            type: 'select'
        }
    },
    {
        id: 6,
        name: 'CURCOLOURSELECT',
        question: 'Looking at your lengths and ends… what is your current hair colour?',
        tip: {
            prefix: "Josh's tip",
            text:
                'Remember to select the closest match to the lengths of your hair, not your roots/regrowth.'
        },
        answer: {
            options: [
                {
                    condition: {
                        questionId: 5,
                        answers: ['Dark brown']
                    },
                    image: get(
                        window,
                        'globalData.shadeSwatchImages.2-0',
                        'http://placehold.it/170x170/1f140b'
                    ),
                    nextQuestion: 7,
                    disablesQuestions: [9],
                    value: 'Dark brown (Shade 2.0)'
                },
                {
                    condition: {
                        questionId: 5,
                        answers: ['Dark brown']
                    },
                    image: get(
                        window,
                        'globalData.shadeSwatchImages.3-0',
                        'http://placehold.it/170x170/322113'
                    ),
                    nextQuestion: 7,
                    disablesQuestions: [9],
                    value: 'Dark brown (Shade 3.0)'
                },
                {
                    condition: {
                        questionId: 5,
                        answers: ['Dark brown']
                    },
                    image: get(
                        window,
                        'globalData.shadeSwatchImages.4-0',
                        'http://placehold.it/170x170/4b321b'
                    ),
                    nextQuestion: 7,
                    value: 'Dark brown (Shade 4.0)'
                },
                {
                    condition: {
                        questionId: 5,
                        answers: ['Light brown']
                    },
                    image: get(
                        window,
                        'globalData.shadeSwatchImages.5-0',
                        'http://placehold.it/170x170/5f3f22'
                    ),
                    nextQuestion: 7,
                    value: 'Light brown (Shade 5.0)'
                },
                {
                    condition: {
                        questionId: 5,
                        answers: ['Light brown']
                    },
                    image: get(
                        window,
                        'globalData.shadeSwatchImages.5-5',
                        'http://placehold.it/170x170/604022'
                    ),
                    nextQuestion: 7,
                    value: 'Light brown (Shade 5.5)'
                },
                {
                    condition: {
                        questionId: 5,
                        answers: ['Light brown']
                    },
                    image: get(
                        window,
                        'globalData.shadeSwatchImages.6-0',
                        'http://placehold.it/170x170/694f26'
                    ),
                    nextQuestion: 7,
                    value: 'Light brown (Shade 6.0)'
                },
                {
                    condition: {
                        questionId: 5,
                        answers: ['Dark blonde']
                    },
                    image: get(
                        window,
                        'globalData.shadeSwatchImages.6-5',
                        'http://placehold.it/170x170/593f21'
                    ),
                    nextQuestion: 7,
                    value: 'Dark blonde (Shade 6.5)'
                },
                {
                    condition: {
                        questionId: 5,
                        answers: ['Dark blonde']
                    },
                    image: get(
                        window,
                        'globalData.shadeSwatchImages.7-0',
                        'http://placehold.it/170x170/5a3c22'
                    ),
                    nextQuestion: 7,
                    value: 'Dark blonde (Shade 7.0)'
                },
                {
                    condition: {
                        questionId: 5,
                        answers: ['Dark blonde']
                    },
                    image: get(
                        window,
                        'globalData.shadeSwatchImages.7-5',
                        'http://placehold.it/170x170/654326'
                    ),
                    nextQuestion: 7,
                    value: 'Dark blonde (Shade 7.5)'
                },
                {
                    condition: {
                        questionId: 5,
                        answers: ['Light blonde']
                    },
                    image: get(
                        window,
                        'globalData.shadeSwatchImages.8-0',
                        'http://placehold.it/170x170/785a33'
                    ),
                    nextQuestion: 7,
                    value: 'Light blonde (Shade 8.0)'
                },
                {
                    condition: {
                        questionId: 5,
                        answers: ['Light blonde']
                    },
                    image: get(
                        window,
                        'globalData.shadeSwatchImages.8-5',
                        'http://placehold.it/170x170/b29764'
                    ),
                    nextQuestion: 7,
                    value: 'Light blonde (Shade 8.5)'
                },
                {
                    condition: {
                        questionId: 5,
                        answers: ['Light blonde']
                    },
                    image: get(
                        window,
                        'globalData.shadeSwatchImages.9-0',
                        'http://placehold.it/170x170/c5994d'
                    ),
                    nextQuestion: 7,
                    value: 'Light blonde (Shade 9.0)'
                },
                {
                    value: 'Repick previous color',
                    questionReset: true,
                    nextQuestion: 5
                }
            ],
            type: 'select'
        }
    },
    {
        id: 7,
        name: 'ROOTCOLOUR',
        question: 'And how do your roots compare to your lengths and ends?',
        answer: {
            options: [
                {
                    nextQuestion: 8,
                    value: `They're lighter`
                },
                {
                    nextQuestion: 8,
                    value: 'They match'
                },
                {
                    value: `They're darker`,
                    endsQuiz: true
                }
            ],
            type: 'select'
        }
    },
    {
        id: 8,
        name: 'AMBICOLOURSELECT',
        question: 'And now your perfect colour… Would you like to be…',
        tip: {
            prefix: "Josh's tip",
            text:
                "If you'd like to go a lot lighter with your colour, I'd always recommend visiting a salon to get a great result."
        },
        answer: {
            options: [
                {
                    condition: {
                        questionId: 6,
                        answers: ['Light blonde (Shade 9.0)']
                    },
                    nextQuestion: 9,
                    value: 'Stay the same',
                    showImageText: true,
                    image: get(
                        window,
                        'globalData.shadeSwatchImages.9-0',
                        'http://placehold.it/170x170/1f140b'
                    )
                },

                {
                    condition: {
                        questionId: 6,
                        answers: ['Light blonde (Shade 9.0)']
                    },
                    nextQuestion: 9,
                    value: 'A lot darker',
                    showImageText: true,
                    image: get(
                        window,
                        'globalData.shadeSwatchImages.8-0',
                        'http://placehold.it/170x170/1f140b'
                    )
                },

                {
                    condition: {
                        questionId: 6,
                        answers: ['Light blonde (Shade 8.5)']
                    },
                    nextQuestion: 9,
                    value: 'Stay the same',
                    showImageText: true,
                    image: get(
                        window,
                        'globalData.shadeSwatchImages.8-5',
                        'http://placehold.it/170x170/1f140b'
                    )
                },
                {
                    condition: {
                        questionId: 6,
                        answers: ['Light blonde (Shade 8.5)']
                    },
                    nextQuestion: 9,
                    value: 'A bit darker',
                    showImageText: true,
                    image: get(
                        window,
                        'globalData.shadeSwatchImages.8-0',
                        'http://placehold.it/170x170/1f140b'
                    )
                },
                {
                    condition: {
                        questionId: 6,
                        answers: ['Light blonde (Shade 8.5)']
                    },
                    nextQuestion: 9,
                    value: 'A lot darker',
                    showImageText: true,
                    image: get(
                        window,
                        'globalData.shadeSwatchImages.7-5',
                        'http://placehold.it/170x170/1f140b'
                    )
                },

                {
                    condition: {
                        questionId: 6,
                        answers: ['Light blonde (Shade 8.0)']
                    },
                    nextQuestion: 9,
                    value: 'Stay the same',
                    showImageText: true,
                    image: get(
                        window,
                        'globalData.shadeSwatchImages.8-0',
                        'http://placehold.it/170x170/1f140b'
                    )
                },
                {
                    condition: {
                        questionId: 6,
                        answers: ['Light blonde (Shade 8.0)']
                    },
                    nextQuestion: 9,
                    value: 'A bit darker',
                    showImageText: true,
                    image: get(
                        window,
                        'globalData.shadeSwatchImages.7-5',
                        'http://placehold.it/170x170/1f140b'
                    )
                },
                {
                    condition: {
                        questionId: 6,
                        answers: ['Light blonde (Shade 8.0)']
                    },
                    nextQuestion: 9,
                    value: 'A lot darker',
                    showImageText: true,
                    image: get(
                        window,
                        'globalData.shadeSwatchImages.7-0',
                        'http://placehold.it/170x170/1f140b'
                    )
                },

                {
                    condition: {
                        questionId: 6,
                        answers: ['Dark blonde (Shade 7.5)']
                    },
                    nextQuestion: 9,
                    value: 'Stay the same',
                    showImageText: true,
                    image: get(
                        window,
                        'globalData.shadeSwatchImages.7-5',
                        'http://placehold.it/170x170/1f140b'
                    )
                },
                {
                    condition: {
                        questionId: 6,
                        answers: ['Dark blonde (Shade 7.5)']
                    },
                    nextQuestion: 9,
                    value: 'A bit darker',
                    showImageText: true,
                    image: get(
                        window,
                        'globalData.shadeSwatchImages.7-0',
                        'http://placehold.it/170x170/1f140b'
                    )
                },
                {
                    condition: {
                        questionId: 6,
                        answers: ['Dark blonde (Shade 7.5)']
                    },
                    nextQuestion: 9,
                    value: 'A lot darker',
                    showImageText: true,
                    image: get(
                        window,
                        'globalData.shadeSwatchImages.6-5',
                        'http://placehold.it/170x170/1f140b'
                    )
                },

                {
                    condition: {
                        questionId: 6,
                        answers: ['Dark blonde (Shade 7.0)']
                    },
                    nextQuestion: 9,
                    value: 'Stay the same',
                    showImageText: true,
                    image: get(
                        window,
                        'globalData.shadeSwatchImages.7-0',
                        'http://placehold.it/170x170/1f140b'
                    )
                },
                {
                    condition: {
                        questionId: 6,
                        answers: ['Dark blonde (Shade 7.0)']
                    },
                    nextQuestion: 9,
                    value: 'A bit darker',
                    showImageText: true,
                    image: get(
                        window,
                        'globalData.shadeSwatchImages.6-5',
                        'http://placehold.it/170x170/1f140b'
                    )
                },
                {
                    condition: {
                        questionId: 6,
                        answers: ['Dark blonde (Shade 7.0)']
                    },
                    nextQuestion: 9,
                    value: 'A lot darker',
                    showImageText: true,
                    image: get(
                        window,
                        'globalData.shadeSwatchImages.6-0',
                        'http://placehold.it/170x170/1f140b'
                    )
                },

                {
                    condition: {
                        questionId: 6,
                        answers: ['Dark blonde (Shade 6.5)']
                    },
                    nextQuestion: 9,
                    value: 'Stay the same',
                    showImageText: true,
                    image: get(
                        window,
                        'globalData.shadeSwatchImages.6-5',
                        'http://placehold.it/170x170/1f140b'
                    )
                },
                {
                    condition: {
                        questionId: 6,
                        answers: ['Dark blonde (Shade 6.5)']
                    },
                    nextQuestion: 9,
                    value: 'A bit darker',
                    showImageText: true,
                    image: get(
                        window,
                        'globalData.shadeSwatchImages.6-0',
                        'http://placehold.it/170x170/1f140b'
                    )
                },
                {
                    condition: {
                        questionId: 6,
                        answers: ['Dark blonde (Shade 6.5)']
                    },
                    nextQuestion: 9,
                    value: 'A lot darker',
                    showImageText: true,
                    image: get(
                        window,
                        'globalData.shadeSwatchImages.5-5',
                        'http://placehold.it/170x170/1f140b'
                    )
                },

                {
                    condition: {
                        questionId: 6,
                        answers: ['Light brown (Shade 6.0)']
                    },
                    nextQuestion: 9,
                    value: 'Stay the same',
                    showImageText: true,
                    image: get(
                        window,
                        'globalData.shadeSwatchImages.6-0',
                        'http://placehold.it/170x170/1f140b'
                    )
                },
                {
                    condition: {
                        questionId: 6,
                        answers: ['Light brown (Shade 6.0)']
                    },
                    nextQuestion: 9,
                    value: 'A bit darker',
                    showImageText: true,
                    image: get(
                        window,
                        'globalData.shadeSwatchImages.5-5',
                        'http://placehold.it/170x170/1f140b'
                    )
                },
                {
                    condition: {
                        questionId: 6,
                        answers: ['Light brown (Shade 6.0)']
                    },
                    nextQuestion: 9,
                    value: 'A lot darker',
                    showImageText: true,
                    image: get(
                        window,
                        'globalData.shadeSwatchImages.5-0',
                        'http://placehold.it/170x170/1f140b'
                    )
                },

                {
                    condition: {
                        questionId: 6,
                        answers: ['Light brown (Shade 5.5)']
                    },
                    nextQuestion: 9,
                    value: 'Stay the same',
                    showImageText: true,
                    image: get(
                        window,
                        'globalData.shadeSwatchImages.5-5',
                        'http://placehold.it/170x170/1f140b'
                    )
                },
                {
                    condition: {
                        questionId: 6,
                        answers: ['Light brown (Shade 5.5)']
                    },
                    nextQuestion: 9,
                    value: 'A bit darker',
                    showImageText: true,
                    image: get(
                        window,
                        'globalData.shadeSwatchImages.5-0',
                        'http://placehold.it/170x170/1f140b'
                    )
                },
                {
                    condition: {
                        questionId: 6,
                        answers: ['Light brown (Shade 5.5)']
                    },
                    nextQuestion: 9,
                    value: 'A lot darker',
                    showImageText: true,
                    image: get(
                        window,
                        'globalData.shadeSwatchImages.4-0',
                        'http://placehold.it/170x170/1f140b'
                    )
                },

                {
                    condition: {
                        questionId: 6,
                        answers: ['Light brown (Shade 5.0)']
                    },
                    nextQuestion: 9,
                    value: 'Stay the same',
                    showImageText: true,
                    image: get(
                        window,
                        'globalData.shadeSwatchImages.5-0',
                        'http://placehold.it/170x170/1f140b'
                    )
                },
                {
                    condition: {
                        questionId: 6,
                        answers: ['Light brown (Shade 5.0)']
                    },
                    nextQuestion: 9,
                    value: 'A bit darker',
                    showImageText: true,
                    image: get(
                        window,
                        'globalData.shadeSwatchImages.4-0',
                        'http://placehold.it/170x170/1f140b'
                    )
                },
                {
                    condition: {
                        questionId: 6,
                        answers: ['Light brown (Shade 5.0)']
                    },
                    nextQuestion: 9,
                    value: 'A lot darker',
                    showImageText: true,
                    image: get(
                        window,
                        'globalData.shadeSwatchImages.3-0',
                        'http://placehold.it/170x170/1f140b'
                    )
                },

                {
                    condition: {
                        questionId: 6,
                        answers: ['Dark brown (Shade 4.0)']
                    },
                    nextQuestion: 9,
                    value: 'Stay the same',
                    showImageText: true,
                    image: get(
                        window,
                        'globalData.shadeSwatchImages.4-0',
                        'http://placehold.it/170x170/1f140b'
                    )
                },
                {
                    condition: {
                        questionId: 6,
                        answers: ['Dark brown (Shade 4.0)']
                    },
                    nextQuestion: 10,
                    value: 'A bit darker',
                    showImageText: true,
                    image: get(
                        window,
                        'globalData.shadeSwatchImages.3-0',
                        'http://placehold.it/170x170/1f140b'
                    )
                },
                {
                    condition: {
                        questionId: 6,
                        answers: ['Dark brown (Shade 4.0)']
                    },
                    nextQuestion: 10,
                    value: 'A lot darker',
                    showImageText: true,
                    image: get(
                        window,
                        'globalData.shadeSwatchImages.2-0',
                        'http://placehold.it/170x170/1f140b'
                    )
                },

                {
                    condition: {
                        questionId: 6,
                        answers: ['Dark brown (Shade 3.0)']
                    },
                    nextQuestion: 10,
                    value: 'Stay the same',
                    showImageText: true,
                    image: get(
                        window,
                        'globalData.shadeSwatchImages.3-0',
                        'http://placehold.it/170x170/1f140b'
                    )
                },
                {
                    condition: {
                        questionId: 6,
                        answers: ['Dark brown (Shade 3.0)']
                    },
                    nextQuestion: 9,
                    value: 'A bit darker',
                    showImageText: true,
                    image: get(
                        window,
                        'globalData.shadeSwatchImages.2-0',
                        'http://placehold.it/170x170/1f140b'
                    )
                },

                {
                    condition: {
                        questionId: 6,
                        answers: ['Dark brown (Shade 2.0)']
                    },
                    nextQuestion: 10,
                    value: 'Stay the same',
                    showImageText: true,
                    image: get(
                        window,
                        'globalData.shadeSwatchImages.2-0',
                        'http://placehold.it/170x170/1f140b'
                    )
                }
            ],
            type: 'select'
        }
    },
    {
        id: 9,
        name: 'TONEAMBI',
        question: `Let's talk tone. Do you prefer your colour to be...`,
        answer: {
            options: [
                {
                    condition: {
                        questionId: 5,
                        answers: ['Dark brown']
                    },
                    nextQuestion: 10,
                    value: 'Rich, warm and chocolatey'
                },
                {
                    condition: {
                        questionId: 5,
                        answers: ['Dark brown']
                    },
                    nextQuestion: 10,
                    value: 'Ashy, cool and smoky'
                },
                {
                    condition: {
                        questionId: 5,
                        answers: ['Light brown']
                    },
                    nextQuestion: 10,
                    value: 'Rich, warm and chocolatey'
                },
                {
                    condition: {
                        questionId: 5,
                        answers: ['Light brown']
                    },
                    nextQuestion: 10,
                    value: 'Ashy, cool and smoky'
                },
                {
                    condition: {
                        questionId: 5,
                        answers: ['Dark blonde']
                    },
                    nextQuestion: 10,
                    value: 'Soft and sun-kissed'
                },
                {
                    condition: {
                        questionId: 5,
                        answers: ['Dark blonde']
                    },
                    nextQuestion: 10,
                    value: 'Cool, ashy and icy'
                },
                {
                    condition: {
                        questionId: 5,
                        answers: ['Light blonde']
                    },
                    nextQuestion: 10,
                    value: 'Soft and sun-kissed'
                },
                {
                    condition: {
                        questionId: 5,
                        answers: ['Light blonde']
                    },
                    nextQuestion: 10,
                    value: 'Cool, ashy and icy'
                },

                {
                    condition: {
                        questionId: 12,
                        answers: ['Dark brown']
                    },
                    nextQuestion: 10,
                    value: 'Rich, warm and chocolatey'
                },
                {
                    condition: {
                        questionId: 12,
                        answers: ['Dark brown']
                    },
                    nextQuestion: 10,
                    value: 'Ashy, cool and smoky'
                },
                {
                    condition: {
                        questionId: 12,
                        answers: ['Light brown']
                    },
                    nextQuestion: 10,
                    value: 'Rich, warm and chocolatey'
                },
                {
                    condition: {
                        questionId: 12,
                        answers: ['Light brown']
                    },
                    nextQuestion: 10,
                    value: 'Ashy, cool and smoky'
                },
                {
                    condition: {
                        questionId: 12,
                        answers: ['Dark blonde']
                    },
                    nextQuestion: 10,
                    value: 'Soft and sun-kissed'
                },
                {
                    condition: {
                        questionId: 12,
                        answers: ['Dark blonde']
                    },
                    nextQuestion: 10,
                    value: 'Cool, ashy and icy'
                },
                {
                    condition: {
                        questionId: 12,
                        answers: ['Light blonde']
                    },
                    nextQuestion: 10,
                    value: 'Soft and sun-kissed'
                },
                {
                    condition: {
                        questionId: 12,
                        answers: ['Light blonde']
                    },
                    nextQuestion: 10,
                    value: 'Cool, ashy and icy'
                }
            ],
            type: 'select'
        }
    },
    {
        id: 10,
        name: 'HAIRCARE',
        question:
            'Your perfect colour deserves perfect care. Complete this sentence. I need help to…',
        answer: {
            options: [
                {
                    nextQuestion: 14,
                    value: 'Smooth my hair and keep it under control'
                },
                {
                    nextQuestion: 14,
                    value: 'Add some volume and lock in moisture'
                }
            ],
            type: 'select'
        }
    },
    {
        id: 11,
        name: 'GREYSHADEAIM',
        question: 'Would your perfect colour be…',
        answer: {
            options: [
                {
                    endsQuiz: true,
                    value: 'Lighter than your current colour'
                },
                {
                    nextQuestion: 12,
                    value: 'Darker than your current colour'
                }
            ],
            type: 'select'
        }
    },
    {
        id: 12,
        name: 'PERMAMBI',
        question: 'Help us to pick your perfect permanent colour. Is this…',
        answer: {
            options: [
                {
                    endsQuiz: true,
                    value: 'Black'
                },
                {
                    nextQuestion: 13,
                    value: 'Dark brown'
                },
                {
                    nextQuestion: 13,
                    value: 'Light brown'
                },
                {
                    nextQuestion: 13,
                    value: 'Dark blonde'
                },
                {
                    nextQuestion: 13,
                    value: 'Light blonde'
                },
                {
                    nextQuestion: 17,
                    value: 'Red',
                    nextQuestionText: `it's on its way! Josh is currently working on products specifically developed for redheads;enter your email below to be the first to know when these are available.`
                },
                {
                    nextQuestion: 17,
                    value: 'Other',
                    nextQuestionText: `Our current range covers the colour spectrum from darkest brown to lightest blonde, but Josh is always working on new products so please do watch this space. To be the first to know all of our latest news and offers, enter your email below`
                }
            ],
            type: 'select'
        }
    },
    {
        id: 13,
        name: 'PERMAMBISELECT',
        question: 'Which of the below best matches your desired permanent color?',
        answer: {
            options: [
                {
                    condition: {
                        questionId: 12,
                        answers: ['Dark brown']
                    },
                    image: get(
                        window,
                        'globalData.shadeSwatchImages.2-0',
                        'http://placehold.it/170x170/1f140b'
                    ),
                    nextQuestion: 10,
                    value: 'Dark brown (Shade 2.0)'
                },
                {
                    condition: {
                        questionId: 12,
                        answers: ['Dark brown']
                    },
                    image: get(
                        window,
                        'globalData.shadeSwatchImages.3-0',
                        'http://placehold.it/170x170/322113'
                    ),
                    nextQuestion: 10,
                    value: 'Dark brown (Shade 3.0)'
                },
                {
                    condition: {
                        questionId: 12,
                        answers: ['Dark brown']
                    },
                    image: get(
                        window,
                        'globalData.shadeSwatchImages.4-0',
                        'http://placehold.it/170x170/4b321b'
                    ),
                    nextQuestion: 9,
                    value: 'Dark brown (Shade 4.0)'
                },
                {
                    condition: {
                        questionId: 12,
                        answers: ['Light brown']
                    },
                    image: get(
                        window,
                        'globalData.shadeSwatchImages.5-0',
                        'http://placehold.it/170x170/5f3f22'
                    ),
                    nextQuestion: 9,
                    value: 'Light brown (Shade 5.0)'
                },
                {
                    condition: {
                        questionId: 12,
                        answers: ['Light brown']
                    },
                    image: get(
                        window,
                        'globalData.shadeSwatchImages.5-5',
                        'http://placehold.it/170x170/604022'
                    ),
                    nextQuestion: 9,
                    value: 'Light brown (Shade 5.5)'
                },
                {
                    condition: {
                        questionId: 12,
                        answers: ['Light brown']
                    },
                    image: get(
                        window,
                        'globalData.shadeSwatchImages.6-0',
                        'http://placehold.it/170x170/694f26'
                    ),
                    nextQuestion: 9,
                    value: 'Light brown (Shade 6.0)'
                },
                {
                    condition: {
                        questionId: 12,
                        answers: ['Dark blonde']
                    },
                    image: get(
                        window,
                        'globalData.shadeSwatchImages.6-5',
                        'http://placehold.it/170x170/593f21'
                    ),
                    nextQuestion: 9,
                    value: 'Dark blonde (Shade 6.5)'
                },
                {
                    condition: {
                        questionId: 12,
                        answers: ['Dark blonde']
                    },
                    image: get(
                        window,
                        'globalData.shadeSwatchImages.7-0',
                        'http://placehold.it/170x170/5a3c22'
                    ),
                    nextQuestion: 9,
                    value: 'Dark blonde (Shade 7.0)'
                },
                {
                    condition: {
                        questionId: 12,
                        answers: ['Dark blonde']
                    },
                    image: get(
                        window,
                        'globalData.shadeSwatchImages.7-5',
                        'http://placehold.it/170x170/654326'
                    ),
                    nextQuestion: 9,
                    value: 'Dark blonde (Shade 7.5)'
                },
                {
                    condition: {
                        questionId: 12,
                        answers: ['Light blonde']
                    },
                    image: get(
                        window,
                        'globalData.shadeSwatchImages.8-0',
                        'http://placehold.it/170x170/785a33'
                    ),
                    nextQuestion: 9,
                    value: 'Light blonde (Shade 8.0)'
                },
                {
                    condition: {
                        questionId: 12,
                        answers: ['Light blonde']
                    },
                    image: get(
                        window,
                        'globalData.shadeSwatchImages.8-5',
                        'http://placehold.it/170x170/b29764'
                    ),
                    nextQuestion: 9,
                    value: 'Light blonde (Shade 8.5)'
                },
                {
                    condition: {
                        questionId: 12,
                        answers: ['Light blonde']
                    },
                    image: get(
                        window,
                        'globalData.shadeSwatchImages.9-0',
                        'http://placehold.it/170x170/c5994d'
                    ),
                    nextQuestion: 9,
                    value: 'Light blonde (Shade 9.0)'
                }
            ],
            type: 'select'
        }
    },
    {
        id: 14,
        answer: {
            options: [
                {
                    nextQuestion: 15,
                    value: 'Yes'
                },
                {
                    value: 'No'
                }
            ],
            type: 'select'
        },

        name: 'SAVECONSUL',
        question: [
            'Almost there! We’re just pulling together your results...',
            "Would you like us to save your consultation so you can access your results at any time? We'll need your email address to do this. (If you don't want to save it and you just want to view your results now, that's fine)"
        ],
        tip: {
            prefix: 'Please note',
            text:
                'We\'ll never pass your email on to any third parties and you can opt out at any time. For more information about how we use your information please view our <a href="/pages/privacy-policy" target="_blank">privacy policy</a>.'
        }
    },
    {
        id: 15,
        answer: {
            nextQuestion: 16,
            type: 'text',
            validator: 'isEmail'
        },
        name: 'EMAIL',
        question: 'Please enter your email address'
    },
    {
        id: 16,
        answer: {
            options: [
                {
                    value: 'Yes'
                },
                {
                    value: 'No'
                }
            ],
            type: 'select'
        },
        name: 'NEWSLETTER',
        question:
            "If possible, we'd love to occasionally email you with offers, new products and hair tips and tricks. Is that okay?"
    },
    {
        id: 17,
        answer: {
            type: 'text',
            validator: 'isEmail',
            subcribeToList: true
        },
        name: 'OTHEREMAIL',
        question: 'placeholder'
    }
];
