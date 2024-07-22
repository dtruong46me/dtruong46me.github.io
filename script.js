let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
}


let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {

    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 100;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');

                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });
        }
    });

    let header = document.querySelector('header');

    header.classList.toggle('sticky', window.scrollY > 100);

    // remove toggle icon
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
}

// CHANGE IN PROJECTS SECTION
const tabs = document.querySelectorAll('[data-target]');
tabContents = document.querySelectorAll('[data-content]');

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const target = document.querySelector(tab.dataset.target);
        tabContents.forEach(tc => {
            tc.classList.remove('change-active');
        });

        target.classList.add('change-active');
        tabs.forEach(t => {
            t.classList.remove('opt-active');
        });
        tab.classList.add('opt-active');
    });
});


// # COPY TO CLIPBOARD
function copyToClipboard(element) {
    const textToCopy = element.querySelector('p').textContent;
    const input = document.createElement('textarea');
    input.value = textToCopy;
    document.body.appendChild(input);
    input.select();
    document.execCommand('copy');
    document.body.removeChild(input);
    alert('Copied ' + textToCopy);
    return false; 
}