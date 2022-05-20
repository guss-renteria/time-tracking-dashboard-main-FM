import './normalize.css'
import './index.scss'
import './index.md.scss'
import './index.lg.scss'

import { data } from './times.data'

const options = document.querySelector('div.profile-options')?.children
const cards = document.querySelector('section.cards')

let current_pos

// [?] actualizar elementos en el DOM
const loadElements = (pos) => {
  if(current_pos == pos) return cards.children
  current_pos = pos

  console.log('[+] loadElements()')
  cards.innerHTML = ''
  
  for(let dat of data) {
    const element = `
      <div class='card ${ dat.name }'>
        <div class='card-container'>
          <h2>${ dat.name }</h2>
          <div class='menu'></div>
          <div class='data-times'>
            <p class='current-time'>${ dat.data_times[pos].current }</p>
            <p class='previous-time'>${ dat.data_times[pos].previous }</p>
          </div>
        </div>
      </div>
    `
    cards.innerHTML += element
  }

  stopMenuPropagation()
  return cards.children
}

// [?] cargar eventos en opciones
const loadEvents = () => {
  console.log('[+] loadEvents()')

  for(let i = 0; i < options.length; i++) {
    options[i].onclick = () => handleEvent(i)
  }
}

// [?] evento a ejecutar en cada opción
const handleEvent = (option) => {
  console.log(`[+] handleEvent() in ${ option } option`)

  for(let i = 0; i < options.length; i++) {
    if(i == option){
      options[i].classList.add('active')
      loadElements(option)
    }
    else
      options[i].classList.remove('active')
  }
}

// [+] corregir la propagación 'hover' del menu
const stopMenuPropagation = () => {
  console.log('[+] stopMenuPropagation()')

  let card_container = document.querySelectorAll('.card-container')
  let menu_list = document.querySelectorAll('.menu')

  for(let i = 0; i < card_container.length; i++) {
    menu_list[i].addEventListener('mouseover', () => {
      card_container[i].style.background = 'hsl(235, 46%, 20%)'
    })
    menu_list[i].addEventListener('mouseout', () => {
      card_container[i].style.background = ''
    })
  }
}

// [*] START

// cargar eventos
loadEvents()

// * iniciar elementos
loadElements(0)
stopMenuPropagation()
