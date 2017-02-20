const strategy = [
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

export default function makeGuess(word, times) {
    return strategy[word.length - 1][times]
}