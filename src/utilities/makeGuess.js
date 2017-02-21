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
let guessed = ''

const relationMap = {
    '(l)\\*$': 'Y',
    '(t|c)\\*er': 'H',
    'e\\*e': 'LV',
    'sc\\*(e|i|o)': 'H',
    'i\\*e': 'FV',
    '\\*or': 'WF',
    '^\\*a': 'F',
    'ea\\*': 'MF',
    '^(t|s|c)\\*(a|e|i|o|u|r)': 'H',
    'i\\*\\*t$': 'GH'
}

export default function makeGuess(word, wrongTimes) {
    if (!/\w/.test(word) && !wrongTimes) {
        series = frequencyMap[word.length - 1]
        guessed = ''
    }

    for (let key in relationMap) {
        let reg = new RegExp(key, 'i')
        if (reg.test(word)) {
            series = relationMap[key] + series
        }
    }

    while (guessed.includes(series[0])) {
        series = series.substr(1, series.length)
    }
    guessed += series[0]
    series = series.substr(1, series.length)

    return guessed[guessed.length - 1]
}
