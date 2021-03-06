// 처음 시작할떄는 use strict를 통해 실수 할 수 있는 부분을
// 미연에 방지 (자세한 내용은 구글 검색)
'use strict';

// 1. Make navbar transparent when it is on the top
const navbar = document.querySelector('#navbar');
const navbarHeight = navbar.getBoundingClientRect().height;

// MDN: Window.scrollY 를 통해 스크롤된 높이를 알아냄
// scroll이 될 때 마다 우리가 블럭 안에서 작성한 코드들이 실행되도록 
// 이벤트 리스터를 등록한다.
document.addEventListener('scroll', () => {
    // console.log(window.scrollY)
    // console.log(`navbarHeight: ${navbarHeight}`);
    // 윈도우의 스크롤이 navbar높이 이상으로 지나가게 되면 navbar색상을 진하게함
    if(window.scrollY > navbarHeight) {
        navbar.classList.add('navbar--dark');
    }else {
        // 그렇지 않다면 어두워지게하는 클래스 추가한걸 없애줌
        navbar.classList.remove('navbar--dark');
    }
});

// 2. Scrolling when navbar items clicked
const navbarMenu = document.querySelector('.navbar__menu');
// navbar item 클릭시 이벤트 리스너 작성(보통은 클릭시 인자로 event가 들어옴)
navbarMenu.addEventListener('click', (event) => {
    const target = event.target;
    // dataset객체를 통해 data속성을 가져오기 위해서는 속성 이름의 data-뒷 부분을 사용한다
    // 각 속성은 문자열이며 읽거나 쓸 수 있다.
    const link = target.dataset.link;

    // 우리가 원하는 데이터가 아닌 아이템 클릭시 undefined가 나오는데
    // 이를 처리하기 위해 아래의 구문 사용
    if(link == null){
        return;
    }

    // 8번 메뉴바 숨기기
    navbarMenu.classList.remove('open');

    
    // 9-1. navbar__menu__item 클릭시 클릭한 item에 border 고정시키기
    // const navbarItem = document.querySelector('.navbar__menu__item.active');
    // navbarItem.classList.remove('active');
    // target.classList.add('active');

    // console.log(event.target.dataset.link);

    // const scrollTo = document.querySelector(link);
    // scrollTo.scrollIntoView({ behavior: 'smooth' });
    scrollIntoView(link);

    // 9-1 ellie ver
    // selectNavItem(target);
});

// 3. Scrolling when "contact me" button clicked
const homeContactMeBtn = document.querySelector('.home__contact');

homeContactMeBtn.addEventListener('click', (event) => {
    // console.log('button clicked');

    scrollIntoView('#contact');
});

// 4. Home opacity
// 스크롤을 내릴수록 홈 화면의 아이템들이 점점 투명해지도록함
const home = document.querySelector('.home__container');

// 높이를 가져오기 위한 함수사용
const homeHeight = home.getBoundingClientRect().height;

document.addEventListener('scroll', () => {
    // console.log(window.scrollY)
    // console.log(`homeHeight: ${homeHeight}`);

    // 스크롤이 가장 위에 있을때는 window.scrollY 값이 0 이고 내려갈수록 점점 커짐
    // opacity는 1일때 가장 불투명하고 0이하일떄 가장 투명하다.
    // console.log(1 - window.scrollY / homeHeight);

    // css에 opacity 적용하기
    home.style.opacity = 1 - window.scrollY / homeHeight;
    // 이 때 home 전체가 투명해지는것이 아니라 home 안에 컨텐츠들만 투명해지게 하기 위해
    // html코드의 home 안에 있는 코드들을 home__container라는 div로 한번 묶어줘서
    // 해당 컨테이너가 투명해지도록 한다.
    
});

// 5. Arrow up button
const arrowUpBtn = document.querySelector('.arrowUpBtn');

// 윈도우의 scroll 위치를 지정해주는 함수 window.scroll()
// option값인 top을 사용해 가장 위로 이동
arrowUpBtn.addEventListener('click', () => {
    // window.scroll({
    //     top,
    //     behavior: 'smooth'
    // });

    // 다른 방법으로는 우리가 만들어 놓은 함수를 사용해 home으로 이동
    scrollIntoView('#home');
});

document.addEventListener('scroll', () => {
    if(window.scrollY > homeHeight / 2) {
        arrowUpBtn.classList.add('arrowUpBtn--display');
    }else{
        arrowUpBtn.classList.remove('arrowUpBtn--display');
    }

});

// 6. project selection

// 우선 프로젝트 카테고리 버튼들이 눌렸을때 눌린 버튼만 active 되고
/**
 * 내가 해본 버젼

// 나머지 버튼들은 unactive한 상태로 만들기
const categories = document.querySelector('.work__categories');
const projects = document.querySelector('.work__projects');

categories.addEventListener('click', (event) => {
    // Event 인터페이스의 target 속성은 이벤트가 발생한 대상 객체를 가리킵니다.
    // console.log(event.target)
    const target = event.target;
    const link = target.dataset.link;

    // 버튼이 아닌 다른 빈 여백을 눌렀을 경우엔 아무것도 하지 않음
    if(link == null) {
        return;
    }
    
    console.log(`link: ${link}`)

    // 각 카테코리별 버튼 클릭시 선택되지 않는 프로젝트들을 선별
    const Allproject = projects.querySelectorAll('.project');
    const project = projects.querySelectorAll(link);

    Allproject.forEach(element => {
        element.classList.remove('selected');
    });

    Allproject.forEach(element => {
        element.classList.add('unselected');
    });

    project.forEach(element => {
        element.classList.remove('unselected');
        element.classList.add('selected');
    });

});
*/

const workBtnContainer = document.querySelector('.work__categories');
const projectContainer = document.querySelector('.work__projects');
// project클래스를 가지고있는 쿼리 리스트가 전달됨
const projects = document.querySelectorAll('.project');

workBtnContainer.addEventListener('click', (e) => {
    // const filter = e.target.dataset.filter;
    // console.log(filter);
    // 단, 이 때 버튼 옆의 숫자는 span 태그로 감싸져 있어서 눌러도 undefined이 뜰텐데
    // 이를 방지하기 위해 개발자 툴에서 source를 통해 디버깅을 하고
    // 해당 span 태그(e.target 활용)의 부모 노드의 filter 값을 가져오면 된다.
    const filter = e.target.dataset.filter || e.target.parentNode.dataset.filter;

    if(filter == null) {
        return;
    }

    // 7. ellie ver
    // 카테고리버튼의 active상태인 애를 가져옴
    const active = document.querySelector('.category__btn.active');
    // 이전에 이미 선택되어진 아이이기에 active를 remove해줌
    active.classList.remove('active');
    // 버튼을 클릭하여 선택된 아이는 active해줌
    // e.target.classList.add('active');
    // 위의 줄 처럼 하면 span태그로 감싸져있는 옆의 숫자 클릭시 문제가 발생함
    // 그렇기에 span태그로 감싸진 숫자를 눌러도 버튼으로 활동할 수 있도록 해줘야함

    // 클릭된 타겟의 nodeName이 button이면 e.target이고, button이 아니면 해당 타겟의 부모 노드를 준다
    const target = e.target.nodeName === 'BUTTON' ? e.target : e.target.parentNode;
    target.classList.add('active');

    // 버튼 클릭시 project container 자체가 사라지는 효과를 넣기 위해
    projectContainer.classList.add('anim-out');

    /**
     * 이떄 문제점은 필터링이 이루어진후 애니메이션이 이루어지기에 좀 부자연 스러운 모습이 보인다
     * 이를 방지하기 위해 먼저 애니메이션이 일어난 후 다시 보여질떄 필터링이 이루어져야하기에
     * 아래의 코드를 setTimeout 함수 안으로 넣는다.
     */
    // 선택된 애들만 보이고 나머지는 안보이게
    // projects.forEach(project => {
    //     if(filter === '*' || filter === project.dataset.type) {
    //         project.classList.remove('invisible');
    //     }else {
    //         project.classList.add('invisible');
    //     }
    // });

    // 위의 foreach구문은 아래의 for문과 똑같다.
    // for(let project of projects){

    // }

    // animation out이 버튼이 클릭된 상태면 계속 out 된 상태로 남아있기 때문에
    // 일정 시간이 지난 후에는 이를 없애줘야댐
    // setTimeout함수 사용, 300ms가 지난 후에 우리가 지정한 함수를 불러달라는 의미
    setTimeout(() => {
        projects.forEach(project => {
            if(filter === '*' || filter === project.dataset.type) {
                project.classList.remove('invisible');
            }else {
                project.classList.add('invisible');
            }
        });
        projectContainer.classList.remove('anim-out');
    }, 300);
});

// 7. navbar active and project select
// navbar 아이템 클릭시 active한 아이템에 border가 쳐지게 하고
// work(project)란에서도 원하는 카테고리 선택시 배경색이 바뀌고 해당 카테고리에 고정되도록함


// navbar 아이템은 그냥 마우스가 hover되면 border가 이동하는 방법으로 진행됬음
// 단, 그때 기존 border를 
// const navbarMenuItem = document.querySelectorAll('.navbar__menu__item');

// navbarMenu.addEventListener('click', (e) => {
//     // 각 메뉴 아이템들을 돌면서 클릭된 아이템과 같은 아이템은 active상태로 만들고
//     // 아닌 아이템들에게선 active클래스를 삭제해준다.
//     navbarMenuItem.forEach(item => {
//         if(e.target === item) {
//             item.classList.add('active');
//         }else {
//             item.classList.remove('active');
//         }
//     });
// });

const catecoryBtn = document.querySelectorAll('.category__btn');

// 아래의 함수 내의 내용을 원래는 위의 같은 workBtnContainer 이벤트 리스너 함수 안에
// 넣어도댐
// workBtnContainer.addEventListener('click', (event) => {
//     // navbar에서 했던것과 똑같이 클릭되는 요소 목록만 바꿔서 체크하면됨
//     const filter = event.target.dataset.filter || event.target.parentNode.dataset.filter;
//     console.log(filter);
//     if(filter == null) {
//         return;
//     }
//     // catecoryBtn.forEach(c => {
//     //     if(event.target === c || event.target.parentNode === c) {
//     //         c.classList.add('active');
//     //     }else {
//     //         c.classList.remove('active');
//     //     }
//     // });

//     // ellie 버젼
//     // 6번의 같은 함수내에 있음
// });

// 8. navbar toggle(hambuger) button clicked
// 화면이 작아졌을 때 생기는 navbar의 toggle버튼 클릭시 감춰져있던 navbar 메뉴들이
// 보이도록 한다. 이후, 펼쳐진 상태에서 다시 클릭시 다시 감춰지도록 한다.
const navbarToggleBtn = document.querySelector('.navbar__toggle-btn');

navbarToggleBtn.addEventListener('click', () => {
    navbarMenu.classList.toggle('open');
    // navbar 메뉴의 아이템 클릭시 스크롤링되면서 메뉴바가 다시 닫히게 한다.
    // 2번 단락에서 추가함

});

// 9-1. navbar item 클릭시 해당 영역으로 스크롤 되면서 클릭한 item에 border 유지하기
    //2번 scrolling 메서드 내에서 함께 구현

// 9-2. scrolling 될때 특정 section 영역에 들어오면 해당 section에 맞는
// navbar item의 border 활성화 시키기
// intersection observe를 활용하여 구현
// const sections = document.querySelectorAll('.section');

// const options = {
//     root: null,
//     rootMargin: '0px',
//     threshold: 0.6,
// };
// const navbarItems = document.querySelectorAll('.navbar__menu__item');
// navbarItems.forEach(item => {
//     console.log(item.dataset.link);
// })

// const observer = new IntersectionObserver((entries, observe) => {
//     entries.forEach(entry => {
//         if(entry.isIntersecting) {
//             const navbarItemActive = document.querySelector('.navbar__menu__item.active');
//             navbarItemActive.classList.remove('active');
//             navbarItems.forEach(item => {
//                 if(item.dataset.link == ('#'+entry.target.id)){
//                     item.classList.add('active');
//                 }
//             });
//         }else {

//         }
//     });
// }, options);

// sections.forEach(section => observer.observe(section));

// 9-2 ellile ver
// 1. 모든 섹션 요소들과 메뉴 아이템들을 가지고 온다.
// 2. IntersectionObserver를 이용해서 모든 섹션들을 관찰한다.
// 3. 보여지는 섹션에 해당하는 메뉴 아이템을 활성화 시킨다.

const sectionIds = [
    '#home',
    '#about',
    '#skills',
    '#work',
    '#testimonials',
    '#contact',
];
// 각각의 아이디르 섹션 dom 요소로 변환시키기 위해서 map API를 활용한다.
const sects = sectionIds.map(id => document.querySelector(id));

const navItems = sectionIds.map(id => document.querySelector(`[data-link="${id}"]`));

let selectedNavIndex = 0;
let selectedNavItem = navItems[0];
function selectNavItem(selected) {
    selectedNavItem.classList.remove('active');
    selectedNavItem = selected
    selectedNavItem.classList.add('active'); 
}

const observeOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.3,
};

const observerCallback = (entries, observer) => {
    entries.forEach(entry => {
        if(!entry.isIntersecting && entry.intersectionRatio > 0) {
            console.log(entry.target.id);
            const index = sectionIds.indexOf(`#${entry.target.id}`);
            // 스크롤링이 아래로 되어서 페이지가 올라옴 (뒤에 따라오는 index 선택)
            if(entry.boundingClientRect.y < 0) {
                selectedNavIndex = index + 1;
            }else{
                selectedNavIndex = index - 1;
            }
        }
    });
};
const observer = new IntersectionObserver(observerCallback, observeOptions);
sects.forEach(s => observer.observe(s));

// 사용자가 스스로 스크롤하는 이벤트는 wheel 이벤트가 발생한다.
window.addEventListener('wheel', () => {
    if(window.scrollY === 0){ //스크롤이 제일 위에 있을 때
        selectedNavIndex = 0;
    }else if( Math.round(window.scrollY + window.innerHeight) >= document.body.clientHeight){
        // 스크롤이 제일 아래에 있을 때
        selectedNavIndex = navItems.length - 1;
    }
    selectNavItem(navItems[selectedNavIndex]);
});

// functions
function scrollIntoView(selector) {
    const scrollTo = document.querySelector(selector);
    scrollTo.scrollIntoView({ behavior: 'smooth' });
    selectNavItem(navItems[sectionIds.indexOf(selector)]);
}