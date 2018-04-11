function play(id, title){
    title = title.replace(/ /g,"~");
    console.log(title);
    $('#vid'+id).addClass('video-container-active');
    $(".menu-container").addClass('nb-active-dl');
    $(".item-container").css('pointer-events','none');
    document.getElementById('vid'+id).innerHTML = "<div id='vid"+id+"' class='vid-close'>X</div>"+
        "<video src=\"./"+title+".mp4\" id='_vid"+id+"' autoplay controls='true' preload='auto' width='100%' height='99%' data-setup='{}'><source src=\"./"+title+"\" type='video/mp4'><source src=\"./"+title+"\" type='video/webm'></video>";
    $('.vid-close').on('click', function(e){
        $(this).parent().removeClass('video-container-active');
        $(this).parent().html("");
        $(".menu-container").removeClass('nb-active-dl');
        $(".item-container").css('pointer-events','');
    });
    $(document).keyup(function(event) {
        if(event.keyCode == 27){
            $('.video-container').removeClass('video-container-active');
            $('.video-container').html("");
            $(".menu-container").removeClass('nb-active-dl');
            $(".item-container").css('pointer-events','');
        }
    });
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
    var view_choice = $('.t2-choice-active').attr('id');
    $.ajax({
        url : '/.Scripts/tor.php',
        data: {view_choice_q: view_choice, tor_site_q: tor_site, grab_q: title, grab_l: window.location.pathname},
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
