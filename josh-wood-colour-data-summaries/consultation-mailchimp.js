/**
 * @prettier
 */
const chalk = require('chalk');
const fs = require('fs');
const map = require('lodash.map');
const parse = require('csv-parse');

const log = console.log;

const columnNames = {
    'What type of hair colour do you currently have?':
        'What type of hair colour do you currently have?',
    'What is your current hair colour?': 'What is your current hair colour?',
    'Which of these best matches your current shade?':
        'Which of these best matches your current shade?',
    'How much grey hair do you have?': 'How much grey hair do you have?',
    'What colour is your regrowth hair (not including g':
        'What colour is your regrowth hair (not including grey)?',
    'Which of the below best matches your regrowth colo':
        'Which of the below best matches your regrowth colour?',
    'Do you find your grey hair hard to cover?': 'Do you find your grey hair hard to cover?',
    'Do you want your colour to be darker, lighter or s':
        'Do you want your colour to be darker, lighter or stay the same?',
    'Does your hair fade with any of these unwanted ton':
        'Does your hair fade with any of these unwanted tones?',
    'Which one of the below best describes your hair?':
        'Which one of the below best describes your hair?',
    'Where do you currently colour your hair?': 'Where do you currently colour your hair?',
    'Would you like us to save your consultation': 'Would you like us to save your consultation?',
    'Do you want to sign up to our newsletter?': 'Do you want to sign up to our newsletter?'
};

const getFormattedColumnNames = data => {
    return map(data, i => {
        let o = {};

        map(i, (v, k) => (o[columnNames[k]] = v));

        return o;
    });
};

const getGroupedQuestionAnswers = data => {
    let groupedData = {};

    map(data, consulation =>
        map(consulation, (answer, question) => {
            if (!groupedData[question]) {
                groupedData[question] = {answers: {}, answered: 0, skipped: 0};
            }

            if (answer === '') {
                groupedData[question].skipped = groupedData[question].skipped + 1;
            } else {
                if (!groupedData[question].answers[answer]) {
                    groupedData[question].answers[answer] = 0;
                }

                groupedData[question].answered = groupedData[question].answered + 1;
                groupedData[question].answers[answer] = groupedData[question].answers[answer] + 1;
            }
        })
    );

    return groupedData;
};

const getPercent = (number1, number2) => parseFloat((number2 / number1 * 100).toFixed(2));

const getPercentageForAnswers = data => {
    let formattedData = {};

    map(data, (info, question) =>
        map(question, () => {
            if (!formattedData[question]) {
                formattedData[question] = info;
            }

            map(formattedData[question].answers, (answerTotal, answer) => {
                const total = typeof answerTotal === 'number' ? answerTotal : answerTotal.total;
                const percent = getPercent(formattedData[question].answered, total);

                formattedData[question].answers[answer] = {percent, total};
            });
        })
    );

    return formattedData;
};

const formatData = data => {
    const dataWithFormattedColumns = getFormattedColumnNames(data);
    const dataWithGroupedAnswers = getGroupedQuestionAnswers(dataWithFormattedColumns);
    const dataWithAnswerPercentage = getPercentageForAnswers(dataWithGroupedAnswers);

    fs.writeFile(
        './consultation-mailchimp-summary.json',
        JSON.stringify(dataWithAnswerPercentage, null, 4),
        'utf-8',
        error => {
            if (error) {
                log(chalk.black.bgRed('SUMMARISING error saving file'));
            } else {
                log(chalk.black.bgGreen('SUMMARISING saved to JSON'));
            }
        }
    );
};

const init = () => {
    log(chalk.black.bgYellow('SUMMARISING entries'));

    const parser = parse({columns: true}, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            formatData(data);
        }
    });

    fs.createReadStream(`${__dirname}/${process.env.FILE}`).pipe(parser);
};

init();
