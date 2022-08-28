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

const reshape = {
    "Spread rows into columns": "df.pivot(index='iris_class",
}
const subset_cols = {
    "Select a single column": "df['sepal_length']",
    "Select multiple columns": "df[['sepal_length', 'sepal_width']]",
    "Select columns using regex": "df.filter(regex='^petal')",
}

const subset_rows = {
    "Using logical criteria": "df[(df.sepal_length == 6.4) & (df.sepal_width == 3.2)]",
    "Find duplicates": "df[df.duplicated(keep=False)]",
    "Drop duplicates": "df.drop_duplicates()",
    "Rows with missing values": "df[df.isnull().any(axis=1)]",
    "Rows without missing values": "df.dropna()",
    "Sample of n rows": "df.sample(n=3)",
    "First n rows": "df.head(3)",
    "Last n rows": "df.tail(3)"
}

function get_operations(category) {
    let operations = ["Choose an operation"];
    let ops_obj = {};
    if (category === "subset_rows") {
        ops_obj = subset_rows;
    }
    if (category === "subset_cols") {
        ops_obj = subset_cols;
    }
    for (var key in ops_obj) {
        operations.push(key);
    }
    return operations;
}

function get_sample_code(category, operation) {

    if (category === "subset_rows") {
        return subset_rows[operation];
    }

    if (category === "subset_cols") {
        return subset_cols[operation];
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
    let category = document.getElementById("category");
    let operation = document.getElementById("operation");

    let code_str = get_sample_code(category.value, operation.value);

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
