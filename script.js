let chart;
let lang = "en";

// ================= LOGIN =================
function login(){
    let u = document.getElementById("username").value;
    if(u){
        localStorage.setItem("user",u);
        window.location.href="dashboard.html";
    }
}

// ================= REGISTER =================
function register(){
    alert("Account created successfully (demo)");
}

// ================= FORGOT =================
function forgot(){
    alert("Password reset link sent (demo)");
}

// ================= LANGUAGE =================
function toggleLang(){
    lang = lang==="en"?"ar":"en";

    if(lang==="ar"){
        document.body.style.direction="rtl";
        document.getElementById("title").innerText="نظام التسويق الذكي";
    }else{
        document.body.style.direction="ltr";
        document.getElementById("title").innerText="AI Marketing System";
    }
}

// ================= DARK =================
function toggleDark(){
    document.body.classList.toggle("dark");
}

// ================= AI ENGINE (WEIGHTED) =================
function analyze(){

    let business = document.getElementById("business").value;
    let age = document.getElementById("age").value;
    let budget = parseInt(document.getElementById("budget").value)||0;
    let goal = document.getElementById("goal").value;

    let score = {
        Facebook: 0,
        Instagram: 0,
        TikTok: 0
    };

    // WEIGHTED AI
    let weights = {
        young: {tiktok:50, ig:40},
        old: {fb:50},
        clothes: {ig:60},
        food: {fb:40},
        services: {fb:30, ig:20}
    };

    if(weights[age]?.tiktok) score.TikTok += weights[age].tiktok;
    if(weights[age]?.ig) score.Instagram += weights[age].ig;
    if(weights[age]?.fb) score.Facebook += weights[age].fb;

    if(weights[business]?.ig) score.Instagram += weights[business].ig;
    if(weights[business]?.fb) score.Facebook += weights[business].fb;

    if(goal==="sales"){
        score.Instagram += 30;
        score.Facebook += 20;
    }

    if(budget>2000){
        score.TikTok += 25;
    }

    // BEST PLATFORM
    let best = Object.keys(score).reduce((a,b)=>score[a]>score[b]?a:b);

    // UI
    document.getElementById("fb").innerText=score.Facebook;
    document.getElementById("ig").innerText=score.Instagram;
    document.getElementById("tt").innerText=score.TikTok;

    document.getElementById("result").innerHTML=
    `<h2>Best Platform: ${best}</h2>`;

    // CHART
    let ctx=document.getElementById("chart").getContext("2d");

    if(chart) chart.destroy();

    chart=new Chart(ctx,{
        type:"bar",
        data:{
            labels:["Facebook","Instagram","TikTok"],
            datasets:[{
                data:[score.Facebook,score.Instagram,score.TikTok],
                backgroundColor:["#1877f2","#e1306c","#111"]
            }]
        }
    });
}

// ================= LOAD USER =================
window.onload=function(){
    let u=localStorage.getItem("user");
    if(u && document.getElementById("title")){
        document.getElementById("title").innerText="Welcome "+u;
    }

    setTimeout(()=>{
        let l=document.getElementById("loader");
        if(l) l.style.display="none";
    },800);
}