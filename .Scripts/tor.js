function play(id, title){
    title = title.replace(/ /g,"~");
    $('#vid'+id).addClass('video-container-active');
    $(".menu-container").addClass('nb-active-dl');
    $(".item-del").addClass('nb-active-dl');
    document.getElementById('vid'+id).innerHTML = "<div id='vid"+id+"' class='vid-close'>X</div>"+
        "<video id='_vid"+id+"' controls preload='auto' width='100%' height='99%' data-setup='{}'><source src='./"+title+"'></video>";
}

function get_results(){
//Checks active download provider and then grabs results from tor.php
    document.getElementById('result_container').innerHTML = "<div class='loading'></div>";
    var input = document.getElementById('dn').value;
    var site = $('.t-choice-active').attr('id');
    $.ajax({
        url : '/.Scripts/tor.php',
        data: {site_q: site, search_q: input},
        type:"POST",
        context: document.body
    }).done(function(data) {
        document.getElementById('result_container').innerHTML = data;
    });
}

function grab_dl(title){
//Initiates download of chosen file
    var tor_site = $('.t-choice-active').attr('id');
    $.ajax({
        url : '/.Scripts/tor.php',
        data: {tor_site_q: tor_site, grab_q: title, grab_l: window.location.pathname},
        type:"POST",
        context: document.body
    }).done(function(data) {
        if (data == "success"){
            $('.dnf_container').removeClass('dnf-active');
            $(document.body).prepend("<div class='notify'>Your download will start soon!</div>");
        } else {
            $('.dnf_container').removeClass('dnf-active');
            $(document.body).prepend("<div class='notify'>An error has occurred. Please try again.</div>");
        }
    });
}
