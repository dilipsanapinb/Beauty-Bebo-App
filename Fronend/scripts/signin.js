import{navbar,footer} from "../components/navbar.js"

let navbar_div=document.getElementById("navbar");
navbar_div.innerHTML=navbar()

let footer_div=document.getElementById("footer");
footer_div.innerHTML=footer();

//makeup btn link
let makeup_btn=document.getElementById('makeup_btn');
makeup_btn.onclick=()=>{
    window.location.href="skin.html"
}
//indexpage btn link
let index_btn=document.getElementById('logo');
index_btn.onclick=()=>{
    window.location.href="index.html"
}

//register btn link
let reg_btn=document.getElementById('register_btn');
reg_btn.onclick=()=>{
    window.location.href="signup.html"
}
//signin page
let sign_in=document.getElementById("login_page");
sign_in.onclick=()=>{
    window.location.href="signin.html"
}
//admin login
let admin_log=document.getElementById("admin_login")
admin_log.onclick=()=>{
    window.location.href="adminlogin.html"
}
// linking the cart page
let cart_btn=document.getElementById("my_cart_btn");
cart_btn.onclick=()=>{
    window.location.href="cart.html"
}
let fragrnace_btn=document.getElementById("fragrance_btn");
fragrnace_btn.onclick=()=>{
    window.location.href="fragrance.html"
}

//hair_btn
let hair_btn=document.getElementById("hair_btn");
hair_btn.onclick=()=>{
    window.location.href="hair.html"
}
//skin page;
let skin_page=document.getElementById("skin-btn")
skin_page.onclick=()=>{
    window.location.href="skin.html"
}
//fragrance page;
let frag_page=document.getElementById("fragrance_btn")
frag_page.onclick=()=>{
    window.location.href="fragrance.html"
}

let data = JSON.parse(localStorage.getItem("signinData")) || [];
// console.log(data[1].user_email);

//var usr_name = document.getElementById("btn3")
    //usr_name.innerHTML = data[i].user_fname ;
              //  usr_name.innerHTML = "Utkarsh" ;


var user_sign_in = document.getElementById("new");
user_sign_in.addEventListener("click", newSign);
async function newSign() {

    let email = document.getElementById("user-email-in").value;
    let password = document.getElementById("user-password-in").value;

    let userObj = {
        email,
        password
    }

    try {
        let res = await fetch('http://localhost:8080/user/api/login', {
        method: "POST",
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(userObj)
        })
        if (res.ok) {
            let data = await res.json();
            console.log(data);
            let token = data.token;
            console.log(token);
            localStorage.setItem('token', token);
            // window.location.href="./fragrance.html"
        } else {
            console.log("Not Able To Login");
        }
    } catch (error) {
        
    }
    
}
