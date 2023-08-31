const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const maxRecords = 386
const limit = 20
let offset = 0;

function infoAbillitsPoke(pokemonId, htmlAbiliti){
    let abilityStr =''
    pokemonId.abilities.forEach((ability) => {
        abilityStr += ability.name
        if(ability !==  pokemonId.abilities[pokemonId.abilities.length - 1]){
            abilityStr += ', '
        }
    })
 
    htmlAbiliti.innerHTML = abilityStr
}

async function loadPokemonItens(offset, limit){
let pokemons = await pokeApi.getPokemons(offset, limit)

const newHtml = pokemons.map((pokemon) =>  `
<li class="pokemon ${pokemon.type}">
<span class="number">#${pokemon.number}</span>
<span class="name">${pokemon.name}</span>
<div class="detail">
    <ol class="types">
    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
    </ol>
    <img src="${pokemon.photo}" 
    alt="${pokemon.name}">
    </div>
    <button class="infoAbillitsButton" id="abilitiePoke${pokemon.number}">
    <h1 id="${pokemon.number}habilidade">Mostrar Habilidade </h1></button>

</li>

`).join('')
pokemonList.innerHTML += newHtml

pokemons.forEach((pokemon) => {
const pokemonCard = document.getElementById(`abilitiePoke${pokemon.number}`)
pokemonCard.addEventListener('click', () => {
    const listAblit =document.getElementById(`${pokemon.number}habilidade`)
    infoAbillitsPoke(pokemon, listAblit)
}
 )
} )

}


loadPokemonItens(offset, limit)
loadMoreButton.addEventListener('click', () =>{
    offset += limit
    const qtdRecordNextPage = offset + limit

    if (qtdRecordNextPage >= maxRecords){
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)
        loadMoreButton.parentElement.removeChild(loadMoreButton)
    }
    else{
    loadPokemonItens(offset, limit)
    }
} )