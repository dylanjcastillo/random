const err_observer = new MutationObserver((event) => {
    let elements = document.querySelectorAll('div[id^="errors-"]');
    [].forEach.call(elements, function (element) {
        if (parseInt(element.id.split("-")[1]) != elements.length) {
            element.classList.add("hidden");
        }
    });
});

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

const err = document.getElementById("errors");
const output = document.getElementById('output');

observer.observe(output, {
    childList: true,
    subtree: true
});

err_observer.observe(err, {
    childList: true,
    subtree: true
});

function get_operations(category) {
    let operations = ["Choose an operation"];
    if (category === "subset_rows") {
        var cat_operations = ["Using logical criteria", "Drop duplicates", "Find duplicates", "Sample rows"]
    }
    operations = operations.concat(cat_operations);
    return operations;
}

function get_sample_code(operation) {
    if (operation === "Sample rows") {
        return "df.sample(n=3)";
    }
    if (operation === "Find duplicates") {
        return "df[df.duplicated(keep=False)]";
    }
    if (operation === "Drop duplicates") {
        return "df.drop_duplicates()";
    }
    if (operation === "Using logical criteria") {
        return "df[(df.sepal_length == 6.4) & (df.sepal_width == 3.2)]";
    }
    return "";
}

function update_categories() {
    let category = document.getElementById("category");
    document.getElementById("operation").innerHTML = "";
    operations = get_operations(category.value);

    for (var i = 0; i < operations.length; i++) {
        var option = document.createElement("option");
        option.text = operations[i];
        option.value = operations[i];
        if (i == 0) {
            option.selected = true;
        }
        document.getElementById("operation").appendChild(option);
    }
}

function update_repl() {
    let operation = document.getElementById("operation");

    let code_str = get_sample_code(operation.value);

    if (code_str != "") {
        document.getElementById("output-repl").remove();
        let repl = document.createElement("py-repl");

        repl.textContent = code_str;
        repl.setAttribute("std-out", "output");
        repl.setAttribute("std-err", "errors");
        repl.id = "output-repl";
        document.getElementById("container-repl").appendChild(repl);

        if (code_str.match("\$")) {
            let editor_lines = document.getElementById("container-repl").getElementsByClassName("cm-line");
            for (var i = 0; i < editor_lines.length; i++) {
                editor_lines[i].textContent = editor_lines[i].textContent.replace("amp;", "");
            }
        }
    }
}

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById("category").addEventListener("change", update_categories);
    update_categories();
    document.getElementById("operation").addEventListener("change", update_repl);
});
