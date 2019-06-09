window.addEventListener('DOMContentLoaded', (event) => {
    // import  renderForm  from './login/loginPage.js';

    let select = document.querySelectorAll('select'),
        sidenav = document.querySelectorAll('.sidenav'),
        dropdown = document.querySelectorAll('.dropdown-trigger'),
        collapsible = document.querySelectorAll('.collapsible'),
        datepicker = document.querySelectorAll('.datepicker'),
        modal = document.querySelectorAll('.modal'),
        tabs = document.querySelectorAll('.tabs');


    M.FormSelect.init(select);
    M.Sidenav.init(sidenav);
    M.Dropdown.init(dropdown, {
        coverTrigger: false
    });
    M.Collapsible.init(collapsible);
    M.Datepicker.init(datepicker);
    M.Modal.init(modal);
    M.Tabs.init(tabs);
    // document.querySelector('.user') = renderForm('user')
    // Loader
    Loading('none')

})

const ClearField = (e) => {
    e.preventDefault();
    var input = document.getElementsByTagName('input');

    for (let index = 0; index < input.length; index++) {
        input[index].value = null;
    }

}