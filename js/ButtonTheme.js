//Btn Theme
const body = document.querySelector('body')
const toggle = document.querySelector("#toggle")
const Icon = document.querySelector("#moon") 
const Icon2 = document.querySelector("#sun") 
toggle.addEventListener('click', () => {
    body.classList.toggle('active')
    if(toggle.classList.toggle('active')){
        toggle.classList.add('active')
        Icon.classList.add('d-none')
        Icon2.classList.remove('d-none')
    }else{
        Icon.classList.remove('d-none')
        Icon2.classList.add('d-none')
    }
})