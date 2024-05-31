function genPassword(num) {
    lowerCases = "abcdefghijklmnopqrstuvwxyz";
    upperCases = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    specials = "&é\"#'{([-|è`_\\ç^à@)]°+=}¨$£¤ù%*µ?,.;/:!§<>";
    numbers = "0123456789";
    result = '';
    if (typeof num !== "number") {
        return console.error("Ошибка");
    }
    for (let i = 0; i < num; i++) {
        let randStr = getRandomInt(0, 3);
        switch (randStr) {
            case 0:
                let ind = getRandomInt(0, 25);
                result += lowerCases[ind];
                break;

            case 1:
                let ind2 = getRandomInt(0, 25);
                result += upperCases[ind2];
                break;

            case 2:
                let ind3 = getRandomInt(0, 42);
                result += specials[ind3];
                break;

            case 3:
                let ind4 = getRandomInt(0, 9);
                result += numbers[ind4];

                break;
            default:
                break;
        }
    }
    return result;
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


console.log(genPassword(10));

module.exports = { genPassword };