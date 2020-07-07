function scrollToTop(number) {
    document.documentElement.scrollTop = number;
    document.body.scrollTop = number;
}

function setTitle(title) {
    document.title = title + ' - 佛山协同(国际)学校';
}

function isPc() {
    if(/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
        return false;
    } else {
        return true
    }
}

export default {
    scrollToTop: scrollToTop,
    setTitle: setTitle,
    isPc: isPc
};