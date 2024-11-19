let result_Section = document.getElementById("result")
import { apikey  } from "./config";


async function requestAPi(query) {
    const apiurl = `https://www.omdbapi.com/?s=${encodeURIComponent(query)}&apikey=${apikey}`

    try {
        const response = await fetch(apiurl);
        const data = await response.json();
        return data["Search"];
    }
    
    catch (error) {
        console.error(`Request Error: ${error}`);
    }
};

function display_result(array) {
    console.log("array")
    console.log(array)
    result_Section.innerHTML = "";

    if (array.length === 0) {
        result_Section = "<p> No Results Found</p>";
        return
    }

    array.forEach(element => {

        const frame = document.createElement("div");
        frame.className = "item-frame";

        const info = document.createElement("div");
        info.className = "info";

        const img = document.createElement("img");
        img.src = element.Poster || 'https://via.placeholder.com/200x300';
        img.alt = element.Title;
        img.className = "item-img";

        const title = document.createElement("p");
        title.className = "item";
        title.textContent = element.Title;

        const dot = document.createElement("span");
        dot.className = "dot";

        const item_gen = document.createElement("span");
        item_gen.className = "item-gen";
        item_gen.textContent = element.Type.toUpperCase()


        const item_year = document.createElement("span");
        item_year.className = "item-year";
        item_year.textContent = element.Year;

        info.appendChild(title);
        info.appendChild(item_year);
        info.appendChild(dot);
        info.appendChild(item_gen);
        
        frame.appendChild(img);
        frame.appendChild(info);

        result_Section.appendChild(frame)
        
    });
};


document.getElementById("textbox").addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        let query = document.getElementById("textbox").value.trim();

        if (query) {
            console.log(`search Query: ${query}`);
            requestAPi(query).then( data => {
                display_result(data);
            })
        }
        
        else {
            alert("Enter a valid search");
        }
    }
});