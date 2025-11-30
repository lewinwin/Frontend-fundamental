// Edit the behavior of the panels
const optical=document.querySelector('.h4-left');
const bio=document.querySelector('.h4-mid');
const smart=document.querySelector('.h4-right');

function showPanel(group){
    if (group==='optical'){
        optical.classList.add('backgroundTitle');
        bio.classList.remove('backgroundTitle');
        smart.classList.remove('backgroundTitle');
        document.querySelector('.optical').style.display='block';
        document.querySelector('.bio').style.display='none';
        document.querySelector('.smart').style.display='none';
    }
    if (group==='bio'){
        optical.classList.remove('backgroundTitle');
        bio.classList.add('backgroundTitle');
        smart.classList.remove('backgroundTitle');
        document.querySelector('.optical').style.display='none';
        document.querySelector('.bio').style.display='block';
        document.querySelector('.smart').style.display='none';
    }
    if (group==='smart'){
        optical.classList.remove('backgroundTitle');
        bio.classList.remove('backgroundTitle');
        smart.classList.add('backgroundTitle');
        document.querySelector('.optical').style.display='none';
        document.querySelector('.bio').style.display='none';
        document.querySelector('.smart').style.display='block';
    }
}
optical.addEventListener('click',()=>{showPanel('optical')});
optical.click();
bio.addEventListener('click',()=>{showPanel('bio')});
smart.addEventListener('click',()=>{showPanel('smart')});

// ranking
const rankChoices=document.querySelectorAll('.inner-register button');
let listRank={};
let rankChosenList = new Set();
for (let i=1; i<=10; i++){
    listRank[i]=0;
}
let listGroup=[];
rankChoices.forEach(btn=>{
    btn.addEventListener('click',(e)=>{
        e.preventDefault();
        const divisionName=btn.dataset.division;
        const teamName=btn.dataset.team;
        let rank=document.querySelector(`#${btn.dataset.rank}`).value;
        rank=Number(rank);
        
        if (!rank || !Number(rank) || (parseInt(rank)!==Number(rank))){
            alert('Please enter the rank of chosen group');
        }
        else if(Number(rank)>10 || Number(rank)<1){
            alert('Please enter the rank of chosen between 1 and 10');
        }
        else if(listGroup.includes(teamName)){
            alert('You have already chosen the group');
        }
        else if (listRank[rank]!==0){
            alert('You have already chosen the rank');
        }
        else{
            updateTable(rank,listRank,divisionName,teamName,listGroup);
            console.log(listRank,listGroup);
        }
    });
});

function renderTable(row,rank,listRank){
    row.cells[0].innerHTML=listRank[rank][0];
    row.cells[1].innerHTML=listRank[rank][1];
}

function updateTable(rank,listRank,divisionName,teamName,listGroup){
    const row=document.querySelector(`tbody tr:nth-child(${rank})`);
    listRank[rank]=[divisionName,teamName];
    listGroup.push(teamName);
    rankChosenList.add(rank);
    renderTable(row,rank,listRank);
    if (rank===1){
        alert(`You have chosen ${teamName} as your 1st chosen group in ${divisionName} successfully`);
    }
    else if (rank===2){
        alert(`You have chosen ${teamName} as your 2nd chosen group in ${divisionName} successfully`);
    }
    else if(rank===3){
        alert(`You have chosen ${teamName} as your 3rd chosen group in ${divisionName} successfully`);
    }
    else{
        alert(`You have chosen ${teamName} as your ${rank}th chosen group in ${divisionName} successfully`);
    }
    let totalNumber=listGroup.length;
    document.querySelector('.total').innerHTML=`Total number of completed choices: ${totalNumber}`;
    let changeTime = new Date();
    changeTime=changeTime.toString();
    document.querySelector('#lastchange').innerHTML=`Last change time: ${changeTime}`;
}

// Submit and clear link
//Submit Link
function submitButton(listGroup,listRank){
    let gap=checkGap(listRank);
    if (listGroup.length===0){
        document.querySelector('.error').innerHTML='You have not chosen any group.';
    }
    else{
        let time=new Date();
        time=time.toString();
        if(!gap){
            document.querySelector('.error').innerHTML=`You have successfully submitted your application at time ${time}`;
        }
        else{
            let htmlContent='You have not chosen your ';
            let content='';
            let rankNumber=null;
            for (let i=0;i<(gap.length);i++){
                rankNumber=gap[i];
                if (rankNumber===1){
                    content='1st chosen group, ';
                }
                else if(rankNumber===2){
                    content='2nd chosen group, ';
                }
                else if(rankNumber===3){
                    content='3rd chosen group, ';
                }
                else{
                    content=`${gap[i]}th chosen group, `
                }
                htmlContent+=content;
                if (i===(gap.length-2) && i>0){
                    htmlContent+='and ';
                }
            }
            htmlContent+=' you can not leave any gap between your chosen groups.'
            document.querySelector('.error').innerHTML=htmlContent;
        }
    }
    console.log(listRank,listGroup,gap);
}

function checkGap(listRank){
    let gapList=[];
    let maxRank=Math.max(...rankChosenList);
    for (let i=1;i<=maxRank;i++){
        if(listRank[i]===0){
            gapList.push(i);
        }
    }
    if (gapList.length===0){
        return false
    }
    else{
        return gapList
    }
}

const submit=document.querySelector('.submit');
submit.addEventListener('click',(e)=>{
    e.preventDefault();
    submitButton(listGroup,listRank);
});

// Clear Link
function clearButton(){
    listGroup=[];
    listRank={};
    rankChosenList = new Set();
    for (let j=1; j<=10; j++){
        listRank[j]=0;
    }
    for (let i=1;i<=10;i++){
        const row=document.querySelector(`tbody tr:nth-child(${i})`);
        row.cells[0].innerHTML='';
        row.cells[1].innerHTML='';
    }
    let totalNumberr=listGroup.length;
    document.querySelector('.total').innerHTML=`Total number of completed choices: ${totalNumberr}`;
    let change = new Date();
    change=change.toString();
    document.querySelector('#lastchange').innerHTML=`Last change time: ${change}`;
}

const clear=document.querySelector('.clear');
clear.addEventListener('click',(e)=>{
    e.preventDefault();
    clearButton(listGroup,listRank);
    console.log(listRank,listGroup);
    document.querySelector('.error').innerHTML='';
});
