const Markup = require("telegraf/markup");

const _action = Symbol("action");
const _createPageInlineButton = Symbol("createPageInlineButton");
const _generatePagesInlineKeyboard = Symbol("generatePagesInlineKeyboard");

class Pagination {
    constructor(action) {
        this[_action] = action;
    }

    [_createPageInlineButton](token, index, text) {
        return Markup.callbackButton(text, `${this[_action]}:${index};${token}`);
    }

    [_generatePagesInlineKeyboard](token, start, last, pageIndx, firstArrow = false, lastArrow = false) {
        let pagesInlineKeyboard = [];
        for (let i = start; i <= last; i++) {
            let text = i == pageIndx ? `\u{00B7} ${i} \u{00B7}` : (firstArrow && i == start) ? `\u{2039} ${i}` :
                (lastArrow && i == last) ? `${i} \u{203A}` : String(i);
            let pageInlineButton = this[_createPageInlineButton](token, i, text);
            pagesInlineKeyboard.push(pageInlineButton);
        }

        return pagesInlineKeyboard;
    }

    createPagesInlineKeyboard(token, currentPage, countPages) {
        const factor = 4;
        let pagesInlineKeyboard = [];
        if (countPages > 1) {
            let startButton = this[_createPageInlineButton](token, 1, "\u{00AB} 1");
            let lastButton = this[_createPageInlineButton](token, countPages, `${countPages} \u{00BB}`);
            if (countPages > factor) {
                if ((countPages - currentPage) <= factor - 2) {
                    pagesInlineKeyboard = [
                        startButton,
                        ...this[_generatePagesInlineKeyboard](
                            token,
                            countPages - (factor - 1),
                            countPages,
                            currentPage,
                            true,
                            false
                        ),
                    ];
                } else if (currentPage > factor - 1) {
                    let prevPage = Number(currentPage) - 1;
                    let nextPage = Number(currentPage) + 1;
                    pagesInlineKeyboard = [
                        startButton,
                        ...this[_generatePagesInlineKeyboard](
                            token,
                            prevPage,
                            nextPage,
                            currentPage,
                            true,
                            true
                        ),
                        lastButton,
                    ];
                } else {
                    pagesInlineKeyboard = [
                        ...this[_generatePagesInlineKeyboard](
                            token,
                            1,
                            factor,
                            currentPage,
                            false,
                            true
                        ),
                        lastButton,
                    ];
                }
            } else {
                pagesInlineKeyboard = this[_generatePagesInlineKeyboard](token, 1, countPages);
            }
        }

        return pagesInlineKeyboard;
    }

    createBackButton(action, token) {
        return Markup.callbackButton("\u{1F519}НАЗАД", `${action}:${token}`);
    }

}



module.exports = Pagination;