

function CreateCmt(cmtName, cmtWish){
    return '<div class="cmtName">' + cmtName + '</div><div class="cmtWish">' + cmtWish + '</div>';
}

function SendWish(){
    //check
    var cmtName = document.querySelector('#Name').value;
    if(cmtName == undefined){
        //không thỏa mãn
        alert("Vui lòng để lại quý danh");
        return;
    }
    if((cmtName = cmtName.trim()).length < 2){
        alert("Vui lòng để lại quý danh");
        return;
    }
    var cmtWish = document.querySelector('#Wish').value; //lời chúc có thể để trống.

    //gửi data
    var btnSend = document.querySelector('#btnSend');
    btnSend.setAttribute('disabled','true');
    btnSend.innerHTML="Đang gửi";
    let data= $('#frmConfirm').serialize();
    $.ajax({ //Sử dụng Ajax gửi data
        url: 'https://script.google.com/macros/s/AKfycbz4iOwfAfEL5SzyrdQmcurEbYAmQedKWCYLXIWIq3cGPlJnUW9g6Q1VnpLl2CsUEhlyXQ/exec',
        method: "GET",
        dataType: 'json',
        data: data,
        success: function(responseData, textStatus, jqXHR) {
            btnSend.innerHTML="Gửi";
            btnSend.removeAttribute('disabled');
            if(textStatus!='success'){
                alert('Thông tin chưa được gửi đi, vui lòng thử lại.');
            }
            else{
                alert('Thông tin đã gửi thành công. Chân thành cảm ơn!');
                if(cmtWish== undefined) return;
                if((cmtWish = cmtWish.trim()) != ''){
                    var nc = document.querySelector('#newCmt');
                    var nn = nc.cloneNode();
                    nc.innerHTML = CreateCmt(cmtName, cmtWish);
                    nc.setAttribute('class', 'comment');
                    var fstWish= document.querySelector('#letTheFirstCmt');
                    if(fstWish!=undefined){
                        fstWish.hidden = true;
                    }
                    document.querySelector("#boxWishes").insertBefore(nn, nc);
                    nc.removeAttribute('id');
                    //nc.attributes['class'] = 'comment';
                }
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            btnSend.innerHTML="Gửi";
            alert('Không gửi được thông tin. Hãy thử đăng nhập tài khoản Google trước');
            console.log(errorThrown);
        }
    });
}

function GetWishes(){
    //var wishes=[];
    $.ajax({ //Sử dụng Ajax gửi lệnh
        url: 'https://script.google.com/macros/s/AKfycbz4iOwfAfEL5SzyrdQmcurEbYAmQedKWCYLXIWIq3cGPlJnUW9g6Q1VnpLl2CsUEhlyXQ/exec?get=cm',
        method: "GET",
        dataType: 'json',
        data: '',
        success: function(responseData, textStatus, jqXHR) {
            if(textStatus!='success'){
                //không lấy được dữ liệu, có thể do không có dữ liệu hoặc bị lỗi.
                //wishes=[];
            }
            else{
                //wishes = responseData.data;
                ShowWishes(responseData.data);
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            //alert('Không tải được thông tin. Hãy thử đăng nhập tài khoản google trước');
            console.log(errorThrown);
        }
    });
}

function ShowWishes(wishes){
    if(wishes == undefined) return;
    if(wishes.length < 1)   return;
    
    var wHtml='<div class="comment blank" id="newCmt"></div>';
    wishes.forEach(item => {
        wHtml+= '<div class="comment">' + CreateCmt(item[0], item[1]) + '</div>';
    });
    document.querySelector('#boxWishes').innerHTML = wHtml;
}


function Contact(p){
    switch(p){
        case 'pN':
            window.open('tel:0364893456','_blank');
            break;
        case 'mN':
            window.open('https://m.me/N7023C', '_blank');
            break;
        case 'zN':
            window.open('https://zalo.me/0364893456', '_blank');
            break;
        case 'fN':
            window.open('https://fb.me/N7023C', '_blank');
            break;
        case 'lN':
            window.open('https://www.google.com/maps/dir//20.7764444,106.38075', '_blank');
            break;
        case 'pC':
            window.open('tel:0388761666','_blank');
            break;
        case 'mC':
            window.open('https://m.me/C7023N', '_blank');
            break;
        case 'zC':
            window.open('https://zalo.me/0388761666', '_blank');
            break;
        case 'fC':
            window.open('https://fb.me/C7023N', '_blank');
            break;
        case 'lC':
            window.open('https://www.google.com/maps/dir//20.746093,106.355293', '_blank');
            break;
    }
}


let WDsec = (new Date(2024, 2, 20, 11, 11, 11, 111)).getTime(); //20/3/2024

function Countdown()
{
    var td = new Date();
    var tdSec = td.getTime();
    var secs = Math.floor((-tdSec + WDsec) / 1000);
    var dhm = Math.floor(secs / 86400);
    secs %= 86400;
    document.getElementById("ngay").innerText = dhm;
    dhm = Math.floor(secs / 3600);
    secs %= 3600;
    document.getElementById("gio").innerText = dhm < 10 ? ("0" + dhm) : dhm;
    dhm=Math.floor(secs / 60);
    document.getElementById("phut").innerText = dhm < 10 ? ("0" + dhm) : dhm;
    secs %= 60;
    document.getElementById("giay").innerText = secs < 10 ? ("0" + secs) : secs;
}


function selectConfirm(){
    var num = document.querySelector(".inp#Number");
    if(document.querySelector(".inp#Join").value == "không")
    {
        num.setAttribute('hidden', 'true');
        num.value = 0;
    }
    else{
        try{
            num.removeAttribute("hidden");
            if(num.value==0)    num.value = 1;
        }
        catch{
            ;
        }
    }
}




function SetBtnPause()
{
    //document.getElementById("btnPlayPause").setAttribute("src", imgPause);
    isPlaying = true;
    document.getElementById("btnPlayPause").hidden = true;
}