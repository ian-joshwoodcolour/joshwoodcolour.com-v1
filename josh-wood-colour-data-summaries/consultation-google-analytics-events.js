/**
 * @prettier
 */
const chalk = require('chalk');
const fs = require('fs');
const map = require('lodash.map');
const parse = require('csv-parse');

const log = console.log;

const columnNames = {
    HAIRTYPE: 'What type of hair colour do you currently have?',
    CURCOLOUR: 'What is your current hair colour?',
    HAIRSHADE: 'Which of these best matches your current shade?',
    GREYAMOUNT: 'How much grey hair do you have?',
    REGROWTHCO: 'What colour is your regrowth hair (not including grey)?',
    REGROWTHSH: 'Which of the below best matches your regrowth colour?',
    GREYDIFFIC: 'Do you find your grey hair hard to cover?',
    COLOURAMBI: 'Do you want your colour to be darker, lighter or stay the same?',
    UNWANTEDTO: 'Does your hair fade with any of these unwanted tones?',
    HAIRTEXTUR: 'Which one of the below best describes your hair?',
    COLOURSAT: 'Where do you currently colour your hair?',
    SAVECONSUL: 'Would you like us to save your consultation?',
    NEWSLETTER: 'Do you want to sign up to our newsletter?'
};

const getFormattedColumnNames = data => {
    const formattedData = {};

    map(data, item => {
        const questionAndAnswer = item['Event Label'].split(' - ');
        const question = questionAndAnswer[0];
        const answer = questionAndAnswer[1];

        if (columnNames[question]) {
            if (!formattedData[columnNames[question]]) {
                formattedData[columnNames[question]] = {
                    answers: {},
                    answered: 0
                };
            }

            if (!formattedData[columnNames[question]].answers[answer]) {
                formattedData[columnNames[question]].answers[answer] = {
                    percent: 0,
                    total: 0
                };
            }

            formattedData[columnNames[question]].answers[answer].total = item['Total Events'];
            formattedData[columnNames[question]].answered =
                formattedData[columnNames[question]].answered + parseFloat(item['Total Events']);
        }
    });

    return formattedData;
};

const getPercent = (number1, number2) => parseFloat((number2 / number1 * 100).toFixed(2));

const getPercentageForAnswers = data => {
    let formattedData = {...data};

    map(data, (info, question) =>
        map(question, () => {
            map(formattedData[question].answers, (answerTotal, answer) => {
                const percent = getPercent(formattedData[question].answered, answerTotal.total);

                formattedData[question].answers[answer] = {percent, total: answerTotal.total};
            });
        })
    );

    return formattedData;
};

const formatData = data => {
    const dataWithFormattedColumns = getFormattedColumnNames(data);
    const dataWithAnswerPercentage = getPercentageForAnswers(dataWithFormattedColumns);

    fs.writeFile(
        './consultation-google-analytics-events-summary.json',
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
