import './styles/normalize.css'
import './styles/index.scss'
import './styles/index.md.scss'
import './styles/index.lg.scss'

import { data } from './times.data'

import icon_work from './images/icon-work.svg'
import icon_play from './images/icon-play.svg'
import icon_study from './images/icon-study.svg'
import icon_exercise from './images/icon-exercise.svg'
import icon_social from './images/icon-social.svg'
import icon_self_care from './images/icon-self-care.svg'

import icon_menu from './images/icon-ellipsis.svg'

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
  importBackgroundImages()
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

// [+] agrega svg para evitar errores en importaciónes de imagenes
// TODO: corregir importación de imagenes con desde SASS
const importBackgroundImages = () => {
  console.log('[+] importBackgroundImages()')

  let cards = document.querySelectorAll('.card')
  for(let card of cards) {
    if([...card.classList].includes('Work')) {
      card.style.background = `url(${ icon_work })`
      card.style.backgroundPositionY = '-1rem'
    }
    else if([...card.classList].includes('Play')) {
      card.style.background = `url(${ icon_play })`
      card.style.backgroundPositionY = '-.8rem'
    }
    else if([...card.classList].includes('Study')) {
      card.style.background = `url(${ icon_study })`
      card.style.backgroundPositionY = '-.2rem'
    }
    else if([...card.classList].includes('Exercise')) {
      card.style.background = `url(${ icon_exercise })`
      card.style.backgroundPositionY = '-.2rem'
    }
    else if([...card.classList].includes('Social')) {
      card.style.background = `url(${ icon_social })`
      card.style.backgroundPositionY = '-1rem'
    }
    else if([...card.classList].includes('Self') && [...card.classList].includes('Care')) {
      card.style.background = `url(${ icon_self_care })`
      card.style.backgroundPositionY = '-1rem'
    }

    card.style.backgroundRepeat = 'no-repeat'
    card.style.backgroundPositionX = '90%'

    let menu = card.querySelector('.menu')
    menu.style.background = `url(${ icon_menu })`
    menu.style.backgroundRepeat = 'no-repeat'
    menu.style.backgroundPositionY = '.5rem'
  }
}

// [*] START

// cargar eventos
loadEvents()

// * iniciar elementos
loadElements(0)
