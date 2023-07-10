let page = document.getElementById("apiPage");
let api = `https://perenual.com/api/species-list?page=`
let key = `&key=sk-n4Qo646d3f1358b2c1033`

const flowers = () => fetch(api + page.value + key)
.then (
    (response) => {
        return response.json()
    })
    .then((data) => {
        console.log(page)
        console.log(api)
        let flowers = data.data;
        let card = document.getElementById("flower_profile");
        for (let i = 0; i < flowers.length; i++){
            let newDiv = document.createElement('div')
            newDiv.innerHTML = 
            `
            <div class="flower_display">
            <h2>${flowers[i].common_name}</h2>
            <p>${flowers[i].scientific_name}</p>
            <img src=${flowers[i].default_image.regular_url} height="150px"/>
            </div>
            `
            card.append(newDiv);
        }
    },
    (err) => {
        console.log(err)
    }
    )