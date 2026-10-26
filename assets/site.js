// Hours in 24h, Sunday first. Google shows Mon–Fri 8–5, closed Saturday; Sunday unverified.
const HOURS=[null,[8,17],[8,17],[8,17],[8,17],[8,17],null];
const DAYS=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const fmt=h=>(h%12||12)+" "+(h>=12?"PM":"AM");
const now=new Date(new Date().toLocaleString("en-US",{timeZone:"America/Los_Angeles"}));
const d=now.getDay(),h=now.getHours()+now.getMinutes()/60;

const table=document.getElementById("hours");
if(table)table.innerHTML=DAYS.map((n,i)=>`<tr class="${i===d?"today":""}"><td>${n}</td><td>${HOURS[i]?fmt(HOURS[i][0])+" – "+fmt(HOURS[i][1]):"Closed"}</td></tr>`).join("");

const t=HOURS[d],open=t&&h>=t[0]&&h<t[1],st=document.getElementById("status");
if(st){
  st.classList.add(open?"open":"closed");
  let msg;
  if(open)msg=`Open now · until ${fmt(t[1])}`;
  else{
    let n=d,today=t&&h<t[0];
    if(!today)do{n=(n+1)%7}while(!HOURS[n]);
    msg=`Closed · opens ${today?"today":DAYS[n]} ${fmt(HOURS[n][0])}`;
  }
  st.lastElementChild.textContent=msg;
}
document.querySelectorAll(".yr").forEach(e=>e.textContent=now.getFullYear());
