const newsApiKey = "a02cb18408a84f4899600da118b984d5";
const mainHtmlElement = document.querySelector("main");
const selectHtmlElement = document.querySelector("#sources");
const defaultSource = "the-washington-post";
window.addEventListener("load", async event=>{
    updateNews();
    await updateSources();
    selectHtmlElement.value = defaultSource;
    selectHtmlElement.addEventListener("change", event=>{
        updateNews(event.target.value);
    });
});

async function updateNews(source = defaultSource){
    const response = await fetch(`https://newsapi.org/v1/articles?source=${source}&country=us&apiKey=${newsApiKey}`);
    const jsonResponse = await response.json();
    const newsHtmlString = jsonResponse.articles.map(createArticle).join("");
    mainHtmlElement.innerHTML = newsHtmlString;
};

async function updateSources(){
    const response = await fetch(`https://newsapi.org/v1/sources`);
    const jsonResponse = await response.json();
    const sourcesNewsHtmlString = jsonResponse.sources.map(createSources).join("");
    selectHtmlElement.innerHTML = sourcesNewsHtmlString;
}

function createSources(source){
    return `
        <option value="${source.id}">${source.name}</option>
    `;
}

function createArticle(article){
    return `
        <div class="article">
            <a href="${article.url}">
                <h2>${article.title}</h2>
                <img src="${article.urlToImage}">
                <p>${article.description}</p>
            </a>
        </div>
        `;
};