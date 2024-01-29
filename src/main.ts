import './reset.css'
import './styles.css'


const getDataButton: HTMLButtonElement = document.querySelector('#get-data-button') as HTMLButtonElement;
const list: HTMLUListElement = document.querySelector('#card-list') as HTMLUListElement;

const getDataPromises = () => {
  const request = new Request(
    'https://api.scryfall.com/cards/search?order=cmc&q=c:red%20pow=3',
    { method: 'GET' }
  );

  fetch(request)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      processData(data)
    })
    .catch((error) => {
      console.log(error);
    })
}

const getDataAsync = async () => {
  const request = new Request(
    'https://api.scryfall.com/cards/search?order=cmc&q=c:red%20pow=3',
    { method: 'GET' }
  );

  try {
    const response = await fetch(request)

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    const data = await response.json();

    processData(data)
  } catch (error) {
    console.log(error);
  }
}

// "Magic" Toggle Comment : see how 52 and 54 behave when 51 is: /* or //*
/*
getDataButton?.addEventListener('click', getDataPromises)
/*/
getDataButton?.addEventListener('click', getDataAsync)
//*/


// data: ScryfallResponse is a TypeScript thing ... gives VSCode a hint of what the data has inside it
const processData = (data: ScryfallResponse) => {
  data.data.forEach((card) => {
    const li = document.createElement('li')
    li.innerText = card.name
    list.appendChild(li)
  })
}

// Some TypeScript interfaces that describe the shape of the API response
// So we can get good code hinting
// See : https://api.scryfall.com/cards/search?order=cmc&q=c:red%20pow=3
interface MTGCard {
  name: string
}

interface ScryfallResponse {
  data: MTGCard[],
}