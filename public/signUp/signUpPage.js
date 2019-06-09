var moderate = document.getElementById('moderate-reg'),
    user = document.getElementById('user-reg');


const renderForm = (name) => {
    user.innerHTML = '';
    moderate.innerHTML = ''
    if (name === 'moderate') {
        CreateForm(moderate, name)
    }
    if (name === 'user') {
        CreateForm(user, name)
    }

}


const CreateForm = (elem, name) => {

    elem.innerHTML = `
<div class="container-fluid form-page-main-container">
                <div class="container">
                    <div class="row">
                        <div class="col s12 center">
                            <h4 class='name' >register ${name} </h4>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col s12 m8 offset-m2">
                            <form >
                                <input type="text" placeholder="Enter your name" id="reg-name" required="yes" classes="col s12" />
                   
                                <input type="email" placeholder="Enter your email address" id="reg-email" required="yes" classes="col s12" />
                                <input type="password" placeholder="Password" id="reg-password" required="yes" classes="col s12" />
                                <div class="input-field col s12">
                                    <button onclick="Register(event)" class="btn btn-large btn-primary" >
                                        register
                                    </button>
                                    <button type="button"
                                        class="btn btn-large btn-secondary"
                                        style="marginLeft: 5%"
                                        onclick='ClearField(event)'
                                    >
                                        cancel
                                    </button>
                                </div>
                               </form>
                        </div>
                    </div>
                </div>
            </div>`
}