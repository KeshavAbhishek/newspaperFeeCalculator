var moreChargedDaysList = ['Sat','Sun'];
var bunchOfButtons = document.getElementsByClassName('days-button')
for (const i of bunchOfButtons) {
    i.addEventListener('mousedown',()=>{
        moreChargedDaysList.push(i.innerText[0]+i.innerText[1]+i.innerText[2]);
        alert(`${i.innerHTML} added as weekends or more extra charged days.`);
    });
};
var mainrecord=new Array();
var monthdata={
    'Jan':'01',
    'Feb':'02',
    'Mar':'03',
    'Apr':'04',
    'May':'05',
    'Jun':'06',
    'Jul':'07',
    'Aug':'08',
    'Sep':'09',
    'Oct':'10',
    'Nov':'11',
    'Dec':'12'
};

document.getElementById("calculateAmount").addEventListener('mousedown',()=>{
    document.getElementById("calculateAmount").style.boxShadow='5px 5px black';
    
    var fromdatevalue=document.getElementById('fromdate').value;
    var todatevalue=document.getElementById('todate').value;

    fromdatevalue=fromdatevalue.split('-').reverse();
    todatevalue=todatevalue.split('-').reverse();

    const hugedate_dataset={1:31,2:28,3:31,4:30,5:31,6:30,7:31,8:31,9:30,10:31,11:30,12:31}

    var fromdatevalueyear=fromdatevalue[2];
    var todatevalueyear=todatevalue[2];
    
    var fromdatevaluemonth=fromdatevalue[1];
    var todatevaluemonth=todatevalue[1];
    
    var fromdatevalueday=fromdatevalue[0];
    var todatevalueday=todatevalue[0];

    var fromdatems=new Date(`${fromdatevaluemonth}-${fromdatevalueday}-${fromdatevalueyear}`);
    fromdatems=parseInt(fromdatems.getTime());

    var todatems=new Date(`${todatevaluemonth}-${todatevalueday}-${todatevalueyear}`);
    todatems=parseInt(todatems.getTime());

    if(fromdatems<todatems){

        var instance_date='';

        var i=0;
        while(instance_date!=`${todatevalueday}-${todatevaluemonth}-${todatevalueyear}`){
            var currms=new Date(fromdatems+i*24*3600*1000);
            k=currms.toDateString().split(' ')[2]+'-'+currms.toDateString().split(' ')[1]+'-'+currms.toDateString().split(' ')[3].split('-')
            k=k.split('-')
            k[1]=monthdata[k[1]]
            mainrecord.push(k.join('-'));
            instance_date=k.join('-');
            i+=1;
        };

        for (let tareekh = 0; tareekh < mainrecord.length; tareekh++) {
            var instancedate = mainrecord[tareekh];
            var instancedateis = mainrecord[tareekh].split('-').reverse().join('-');
            instancedateis=new Date(instancedateis);
            mainrecord[tareekh]=`${instancedate},${instancedateis.toDateString().split(' ')[0]}`;
        };

        var weekends=[];
        var nonweekends=[];

        var moreChargedDaysSets = new Set(moreChargedDaysList);

        mainrecord.forEach(x => {
            moreChargedDaysSets.forEach(instance => {
                if(x.split(',')[1]==instance){
                    weekends.push(x.split(',')[0]);
                }
                else
                {
                    nonweekends.push(x.split(',')[0]);
                };
            });
        });

        console.table(weekends);

        var nonweekendsSets = new Set(nonweekends);

        nonweekends=[];

        nonweekendsSets.forEach(element => {
            nonweekends.push(element);
        });

        
        weekends.forEach(element => {
            var removeableindex = nonweekends.indexOf(element);
            nonweekends.pop(removeableindex);
        });

        var normalrate=parseFloat(document.getElementById('normalrateEntry').value);
        var weekendrate=parseFloat(document.getElementById('weekendrateEntry').value);

        var money=weekends.length*weekendrate+nonweekends.length*normalrate;
        
        var message=`Pay ₹${money} to the Newspaper Boy.`;

        document.getElementById('messageScreen').innerText=message;

        var alldatesString='';

        mainrecord.forEach(z => {
            var element=z.split(',');
            alldatesString+=element[0]+' '+element[1]+', ';
        });

        document.getElementById('alldates').innerText=alldatesString;
        document.getElementById('alldates').style.display='none';
        document.getElementById('printPage').style.display='block';
    };

});

document.getElementById('printPage').addEventListener('mousedown',()=>{
    document.getElementById('alldates').style.display='block';
    document.getElementById('calculateAmount').style.display='none';
    document.getElementById('days_area').style.display='none';
    document.getElementById('printPage').style.display='none';
    setTimeout(() => {
        window.print()
    }, 1000);
});

document.getElementById("calculateAmount").addEventListener('mouseup',()=>{
    document.getElementById("calculateAmount").style.border='none';
    document.getElementById("calculateAmount").disabled=true;
});