const img_container=document.querySelector('.image-container');
const already_acc=document.querySelector('.signup-foot');
const login_page=document.querySelector('.login');
const signup_page=document.querySelector('.signup-container');
let signup_mail=document.querySelector('.signup-mail');
let signup_pass=document.querySelector('.signup-pass');
const signup_btn=document.querySelector('.signup-btn');
let signin_mail=document.querySelector('.signin-mail');
let signin_pass=document.querySelector('.signin-pass');
const signin_btn=document.querySelector('.login-btn');
const create_acc=document.querySelector('.login-create');
const login_foot=document.querySelector('.login-foot');
const signup_foot=document.querySelector('.signup-foot');
const signup_mail_container=document.querySelector('.signup-email');
const signup_pass_container=document.querySelector('.signup-password');
const signin_mail_container=document.querySelector('.signin-email');
const signin_pass_container=document.querySelector('.signin-password');

let accounts=JSON.parse(localStorage.getItem('accounts'))||[];

signup_mail.addEventListener('click',()=>{
    signup_mail_container.classList.add('upper-shift');
});
signup_pass.addEventListener('click',()=>{
    signup_pass_container.classList.add('upper-shift');
});

signin_mail.addEventListener('click',()=>{
    signin_mail_container.classList.add('upper-shift');
});
signin_pass.addEventListener('click',()=>{
    signin_pass_container.classList.add('upper-shift');
});

img_container.addEventListener('click',()=>{
    img_mover();
});

already_acc.addEventListener('click',()=>{
    img_mover();
});

create_acc.addEventListener('click',()=>{
    img_mover();
});

signup_mail.addEventListener('keydown',(event)=>{
    if(event.key=="Enter"){
        if(signup_pass.value!==``){
            signup_mail_container.classList.remove('upper-shift');
            sign_up();
        }else{
            signup_pass_container.classList.add('upper-shift');
            signup_pass.focus();
        }
    }
});

signup_pass.addEventListener('keydown',(event)=>{
    if(event.key=="Enter"){
        if(signup_mail.value!==``){
            signup_pass_container.classList.remove('upper-shift');
            sign_up();
        }else{
            signup_mail_container.classList.add('upper-shift');
            signup_mail.focus();
        }
    }
});

signin_mail.addEventListener('keydown',(event)=>{
    if(event.key=="Enter"){
        if(signin_pass.value!==``){
            signin_mail_container.classList.remove('upper-shift');
            signin_acc();
        }else{
            signin_pass_container.classList.add('upper-shift');
            signin_pass.focus();
        }
    }
});

signin_pass.addEventListener('keydown',(event)=>{
    if(event.key=="Enter"){
        if(signin_mail.value!==``){
            signin_pass_container.classList.remove('upper-shift');
            signin_acc();
        }else{
            signin_mail_container.classList.add('upper-shift');
            signin_mail.focus();
        }
    }
});

signup_btn.addEventListener('click',()=>{
    sign_up();
});

signin_btn.addEventListener('click',()=>{
    signin_acc();
});


function img_mover(){
    clearvalues();
    img_container.classList.toggle('img-shift');
}

function sign_up(){
    if(signup_mail.value==``){
        signup_mail.focus();
        sign_up();
    }
    else if(signup_pass.value==``){
        signup_pass.focus();
        sign_up();
    }
    else{
        let mail =signup_mail.value;
        let pass=signup_pass.value;
        let matching=``;
        accounts.forEach((value)=>{
            if(value.mail==mail){
                matching=1;
                signup_foot.innerHTML=`Email Already exists !!`;
            }
        });
        if(!matching){
        signup_btn.innerHTML=`Registered`;
        signup_foot.innerHTML=`Account Created Successfully !!`;
            accounts.push({
                mail: mail,
                pass: pass
            });
            localStorage.setItem('accounts',JSON.stringify(accounts));
        }
        signup_foot.classList.add('account-created');
        clearvalues();
        setTimeout(()=>{
        signup_btn.innerHTML=`Register`;
        signup_foot.innerHTML=`Already have an Account`;
        signup_foot.classList.remove('account-created');
        },2500);
    }
}
function signin_acc(){
    if(signin_mail.value==``){
        signin_mail.focus();
        signin_acc();
    }
    else if(signin_pass.value==``){
        signin_pass.focus();
        signin_acc();
    }
    else{
        let mail =signin_mail.value;
        let pass=signin_pass.value;
        let matching=``;
        accounts.forEach((value)=>{
            if(value.mail==mail ){
                matching=value;
            }
        });
        if(matching){
            if(matching.pass==pass){
                login_foot.innerHTML=`Login Succesfull`;
            }
            else{
                login_foot.innerHTML=`Incorrect Password`;
            }
        }
        else{
            login_foot.innerHTML=`
            Invalid Email 
            `;
        }
        login_foot.classList.add('account-created');
        clearvalues();
        setTimeout(()=>{
            login_foot.innerHTML=`
            <div class="login-create">Create an account</div>
            <div class="forgot-pass">Forgot your password</div>`;
            login_foot.classList.remove('account-created');
        },2500);
    }
}

function clearvalues(){
    signin_mail_container.classList.remove('upper-shift');
    signin_pass_container.classList.remove('upper-shift');    
    signup_mail_container.classList.remove('upper-shift');
    signup_pass_container.classList.remove('upper-shift');
    signin_mail.disabled=true;
    signin_pass.disabled=true;    
    signup_mail.disabled=true;
    signup_pass.disabled=true;
    signup_mail.value=``;
    signup_pass.value=``;
    signin_mail.value=``;
    signin_pass.value=``;
    signin_mail.disabled=false;
    signin_pass.disabled=false;    
    signup_mail.disabled=false;
    signup_pass.disabled=false;  
}

