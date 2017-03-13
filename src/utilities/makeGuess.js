const frequencyMap = [
    'AI',
    'AOEIMHNUSTYB',
    'AEOITSUPRNDBG',
    'AESOIRLTNUDCYP',
    'SEAROILTNUDCYPM',
    'ESARIOLNTDUCMPGH',
    'ESIARNTOLDUCGPMHB',
    'ESIARNTOLDCUGMPHBY',
    'ESIRANTOLCDUGMPHBYF',
    'EISRANTOLCDUGMPHBYFV',
    'EISNARTOLCUDPMGHBYFVK',
    'EISNTAROLCPUMDGHYBVFZK',
    'IENTSAORLCPUMGDHYBVFZXK',
    'IETSNAORLCPUMDHGYBVFZXKW',
    'IETNSOARLCPUMDHGYBVFZXWKQ',
    'IETSNAORLCPUMHDYGBVFZXWQKJ',
    'IETNSOARLCPUMHDGYBVFZXQWJK',
    'ISETONRALCPMUHDGYBVZFXQWK',
    'IETONASRLCPMUHDGYBVFZXKJQW',
    'IOETRSANCLPHUMYDGBZVFKXJQ'
]

let series = ''
let relationSeries = ''
let guessed = ''
let preWrongTimes = 0

const relationMap = {
    '(l|rr)\\*$': 'Y',
    '(t|c)\\*er': 'H',
    'e\\*e': 'LV',
    'sc\\*(e|i|o)': 'H',
    'i\\*e': 'FV',
    '\\*or': 'WF',
    '^\\*a': 'F',
    'ea\\*': 'MF',
    '^(t|s|c)\\*(a|e|i|o|u|r)': 'H',
    'i\\*\\*t$': 'G',
    'ig\\*t$': 'H',
    '(a|i|e)n\\*$': 'GDK'
}

export default function makeGuess(word, wrongTimes) {

    if (wrongTimes <= preWrongTimes) {
        relationSeries = ''
    }

    if (!/\w/.test(word) && !wrongTimes) {
        series = frequencyMap[word.length - 1]
        guessed = ''
    }

    if (!relationSeries) {
        for (let key in relationMap) {
            let reg = new RegExp(key, 'i')
            if (reg.test(word)) {
                relationSeries = relationMap[key] + relationSeries
            }
        }
    }

    if (relationSeries) {
        while (guessed.includes(relationSeries[0]) && relationSeries[0]) {
            relationSeries = relationSeries.substr(1, relationSeries.length)
        }
    }
    if (relationSeries[0]) {
        guessed += relationSeries[0]
        relationSeries = relationSeries.substr(1, series.length)
    } else {
        while (guessed.includes(series[0])) {
            series = series.substr(1, series.length)
        }
        guessed += series[0]
        series = series.substr(1, series.length)
    }

    preWrongTimes = wrongTimes

    return guessed[guessed.length - 1]
}
