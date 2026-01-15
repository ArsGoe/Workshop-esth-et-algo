from random import randint, choice


first = ["Dear", "Poor", "Lonely", "Lost"]
second = ["soul", "heart", "thing", "one"]

adjectives = [
    "aching",
    "apathetic",
    "bleak",
    "blue",
    "broken",
    "desolate",
    "drained",
    "empty",
    "forlorn",
    "fragile",
    "gray",
    "heavy",
    "hollow",
    "isolated",
    "lonely",
    "melancholic",
    "numb",
    "overcast",
    "pale",
    "quiet",
    "resigned",
    "sad",
    "sinking",
    "somber",
    "tired",
    "unhopeful",
    "weary",
    "withdrawn",
]
nouns = [
    "ache",
    "absence",
    "despair",
    "emptiness",
    "fatigue",
    "gloom",
    "grief",
    "heaviness",
    "hopelessness",
    "isolation",
    "loneliness",
    "loss",
    "melancholy",
    "misery",
    "numbness",
    "regret",
    "sadness",
    "shadow",
    "silence",
    "sorrow",
    "tiredness",
    "void",
    "weight",
    "withdrawal",
]
adverbs = [
    "quietly",
    "slowly",
    "heavily",
    "wearily",
    "dully",
    "softly",
    "listlessly",
    "numbly",
    "resignedly",
    "silently",
    "sadly",
    "faintly",
    "hopelessly",
    "weakly",
    "dimly",
]
verbs = [
    "aches",
    "burdens",
    "clings to",
    "clouds",
    "drains",
    "dulls",
    "follows",
    "hangs over",
    "lingers",
    "presses on",
    "pulls down",
    "settles into",
    "smothers",
    "stays with",
    "wears away",
    "weighs on",
    "withdraws from",
]

def random_choice(word_type):
    return choice(word_type)

def sentence_construction():
    sentence = choice(first) + " " + choice(second) + ",\n" + "you are my " + choice(adjectives) + " " + choice(nouns) + ". My " + choice(adjectives) + " " + choice(nouns) + " " + choice(adverbs) + " " + choice(verbs) + " your " + choice(adjectives) + " " + choice(nouns) + ". My " + choice(nouns) + " " + choice(verbs) + " your " + choice(nouns) + "\n" + "\n" + "Always Yours"
    print(sentence)

sentence_construction()

