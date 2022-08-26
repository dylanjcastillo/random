const observer = new MutationObserver((event) => {
    let elements = document.querySelectorAll('div[id^="output-"]');
    [].forEach.call(elements, function (element) {
        if (parseInt(element.id.split("-")[1]) != elements.length) {
            element.classList.add("hidden");
        }
    });

    document.querySelector("#initial-repl button").click();

    elements = document.querySelectorAll('[id^="initial-"]');
    [].forEach.call(elements, function (element) {
        if (parseInt(element.id.split("-")[1]) != elements.length) {
            element.classList.add("hidden");
        }
    });
});

const output = document.getElementById('output');

observer.observe(output, {
    childList: true,
    subtree: true
});
