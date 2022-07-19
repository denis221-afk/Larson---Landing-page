const responsiveBtn = document.querySelector('.btn__responsive');
const menuBody = document.querySelector('.menu__responsive');
let postion = 100;
responsiveBtn.addEventListener('click', () => {
        if(postion == 100) {
            menuBody.style.cssText = `left: 0%;`; 
            postion = 0;
        } else{
            menuBody.style.cssText = `left: -100%;`;
            postion = 100;
        }

  
})


const wrapImages = document.querySelectorAll('.wrap__images');
const btnNextSlide = document.querySelector('.next');
const btnPrevSlide = document.querySelector('.prev');
let slideIndex = 0;

function hideElements(elements) {
    elements.forEach(item => {
        item.style.display = "none";
    })
}


function showElemnts(elements,) {
    if(slideIndex >= elements.length) {
        slideIndex = 0;
    }if (slideIndex < 0) {
        slideIndex = 1;
        console.log("dsads")
    }
    elements[slideIndex].style.display = "block";

}




function PulseSlide(triger, slide) {
    triger.addEventListener('click', () => {
        slideIndex++;
        hideElements(slide);
        showElemnts(slide);   
        wrapImages.forEach((item) => {
            item.classList.remove('uk-animation-slide-right');
            item.classList.add('uk-animation-slide-left');
        })
    });
}


function minusSliode(triger, slide) {

    triger.addEventListener('click', () => {
        slideIndex--;
        console.log(slideIndex)
        hideElements(slide);
        showElemnts(slide);   
        wrapImages.forEach((item) => {
            item.classList.remove('uk-animation-slide-left');
            item.classList.add('uk-animation-slide-right');
        })
    });
}


hideElements(wrapImages);
showElemnts(wrapImages);
PulseSlide(btnNextSlide, wrapImages);
minusSliode(btnPrevSlide, wrapImages);


// slider Promo




// nav Animation

const navLink = document.querySelectorAll('.nav__link');



function remuveActiveNav() {
    navLink.forEach(item => {
        item.classList.remove('active');
    })
} 


function addActiveNav(index = 0) {
    navLink[index].classList.add('active');
}

addActiveNav();


navLink.forEach((item, index) => {
    item.addEventListener('click', () => {
        remuveActiveNav();
        addActiveNav(index);
    })
})

document.querySelectorAll('a[href^="#"').forEach(link => {

    link.addEventListener('click', function(e) {
        e.preventDefault();

        let href = this.getAttribute('href').substring(1);

        const scrollTarget = document.getElementById(href);

        const topOffset = document.querySelector('.scrollto').offsetHeight;
        const elementPosition = scrollTarget.getBoundingClientRect().top;
        const offsetPosition = elementPosition - topOffset;

        window.scrollBy({
            top: offsetPosition,
            behavior: 'smooth'
        });
    });
});



// tabs 

const elementTabs = document.querySelectorAll('.services__img');
const navTabs = document.querySelectorAll('.tabs__item');
const activeSpan = document.querySelectorAll('.projekts__nav span')

function hideTabs(elements, tabsElements) {
    elements.forEach(item => {
        item.style.display ="none";

    })
    tabsElements.forEach(item => {
        item.classList.remove('active_tab')
    })
}


function showTab(elements, elementsNav ,index = 0) {
    hideTabs(elements, navTabs);
    elements[index].style.display = "block";
    elementsNav[index].classList.add('active_tab')   
    elements[index].classList.add('uk-animation-fade')
}


function changeTabs(elementsTabs) {
    elementsTabs.forEach((item, index) => {
        item.addEventListener('click', () => {
            hideTabs(elementTabs, navTabs);
            showTab(elementTabs, navTabs, index)
        })
    })
}
showTab(elementTabs, navTabs)
changeTabs(navTabs);

const slideItem = document.querySelectorAll('.projekts__item');
const filterSlide = document.querySelectorAll('.projekts__fillter');
const navSpan = document.querySelectorAll('.projekts__nav span');


function hideFilter() {
    filterSlide.forEach(item => {
        item.style.display = "none";
   
    })
}
slideItem.forEach((item, index) => {
    item.addEventListener('click' , () => {
        hideFilter();
        filterSlide[index].classList.add('uk-animation-slide-bottom')
        filterSlide[index].style.display = "block"; 
    })

})




function hide() {
    navSpan.forEach(item => {
        item.classList.remove('active__span');
    })
}

function showActive(id) {
    hide();
    navSpan[id].classList.add('active__span');
}

showActive(0);

navSpan.forEach((item, id) => {
    item.addEventListener('click', () => {
        showActive(id); 
    })
})





// news 


const newsItem = document.querySelectorAll('.news__item');
const newsFillter = document.querySelectorAll('.news__fillter');



function hideFillter() {
    newsFillter.forEach(item => {
        item.style.display = "none"
    })
}

newsItem.forEach((item, id) => {
    item.addEventListener('click', () => {
        hideFillter(); 
        newsFillter[id].style.display = "block";
        newsFillter[id].classList.add('uk-animation-fade');
    })
})







// forms


const forms = document.querySelector('form');
const inputs = document.querySelectorAll('input');

const masenge = {
    ladiing: "loading please wait",
    sucsses: "Successfully sent",
    errors: "You cannot post an attempt later"
}




 const postData = async (url, data) => {


    let res = await fetch(url, {
        method: "POST",
        body: data

    })

    return await res.text();
 }


 const clearInputs = () => {
    inputs.forEach(item => {
        item.value = '';
    });
};

 

forms.addEventListener('submit', (e) =>{
    e.preventDefault();
    let statuseMasenge = document.createElement('div')
    forms.appendChild(statuseMasenge);


    const fromData = new FormData(forms);

    postData('api/mailer/smart.php', fromData)
        .then(res => {
            console.log(res);
            statuseMasenge.classList.add('uk-alert-success')
            statuseMasenge.textContent = masenge.sucsses
            
        })
        .catch(() => {
            statuseMasenge.classList.add('uk-alert-danger')
            statuseMasenge.textContent = masenge.errors
        })
        .finally(() => clearInputs());

})





