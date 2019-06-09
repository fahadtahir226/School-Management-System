var admin = document.getElementById('admin'),
    moderate = document.getElementById('moderate'),
    user = document.getElementById('user');

const renderForm = (name) => {
    if (name === 'admin') {
        moderate.innerHTML= "";
        user.innerHTML= "";
        CreateForm(admin)
    } else
    if (name === 'moderate') {
        admin.innerHTML= "";
        user.innerHTML= "";
        CreateForm(moderate)
    } else
    if (name === 'user') {
        moderate.innerHTML= "";
        admin.innerHTML= "";
        CreateForm(user)
    }

}

const CreateForm = (name) => {
    var id = name.getAttribute('id')

    name.innerHTML = ` 
    <div class='container-fluid form-page-main-container' >
    <div class='container'>
    <h4 class='center heading'>Welcome ${id} </h4>
    <div class="row">
    <div class="col s12">
    <form >
    <input class="col s12"
        id='login-email'
        type='email'
        name='email'
        placeholder="Enter your email" 
        required="yes" />
    
    <input class="col s12"
        id='login-pass'
        type='password'
        name='password'
        placeholder="Enter your password" 
        required="yes" />
    
    <div class="input-field col s12" >
        <button
        onclick="login(event, ${id})"
         class="btn btn-large btn-primary"  >
            Login
        </button>
        <button class="btn btn-large btn-secondary"
            style="margin-left: 5% "
            onclick='ClearField(event)'
            >
            Cancel
        </button>
    </div>
    </form>
    </div>
    </div>
</div>

</div>
</div>
`;

}