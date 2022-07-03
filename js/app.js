const form = document.querySelector('form')
const inputWord = document.querySelector('input[name="word"]')
const listOfMeanings = document.querySelector('ul')
const spinner = document.querySelector('#spinner')

const toggleSpinnerVisibility = () => {
    spinner.classList.toggle('d-none')
}

const getSearchWord = () => inputWord.value.toLowerCase().trim()

const searchForMeanings = async word => {
    const data = await fetch(`https://significado.herokuapp.com/v2/${word}`)
    return data.ok ? await data.json() : []
}

const getMeanings = data => data.reduce((accumulator, { meanings }) => 
    accumulator += meanings.map(meaning => `<li><blockquote>${meaning}</blockquote></li>`).join(''), '')

const insertMeaningsOnThePage = meanings => {
    listOfMeanings.innerHTML = meanings ? meanings : '<p>Nenhum significado encontrado.</p>'
}

const displayWordMeanings = async event => {
    event.preventDefault()

    toggleSpinnerVisibility()

    const word = getSearchWord()

    const data = await searchForMeanings(word)

    const meanings = getMeanings(data)
    
    toggleSpinnerVisibility()

    insertMeaningsOnThePage(meanings)
}

const clearMeaningList = () => {
    listOfMeanings.innerHTML = ''
}

form.addEventListener('submit', displayWordMeanings)
inputWord.addEventListener('input', clearMeaningList)