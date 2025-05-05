// auth.js: simple localStorage user store
const USERS_KEY = 'mm_users';
function getUsers(){ return JSON.parse(localStorage.getItem(USERS_KEY)||'[]'); }
function saveUsers(u){ localStorage.setItem(USERS_KEY, JSON.stringify(u)); }

// Registration
if(document.getElementById('register-form')){
  document.getElementById('register-form').onsubmit = e =>{
    e.preventDefault();
    const u=document.getElementById('reg-user').value,
          em=document.getElementById('reg-email').value,
          pw=document.getElementById('reg-pass').value;
    let users = getUsers();
    if(users.find(x=>x.email===em)){ return alert('Email in use'); }
    users.push({ username: u, email: em, pass: pw });
    saveUsers(users);
    alert('Registered!'); location.href='login.html';
  };
}

// Login
if(document.getElementById('login-form')){
  document.getElementById('login-form').onsubmit = e =>{
    e.preventDefault();
    const em=document.getElementById('login-email').value,
          pw=document.getElementById('login-pass').value;
    let users = getUsers();
    const user = users.find(x=>x.email===em && x.pass===pw);
    if(!user) return alert('Invalid credentials');
    localStorage.setItem('mm_current', JSON.stringify(user));
    alert('Welcome '+user.username);
    location.href='game.html';
  };
}