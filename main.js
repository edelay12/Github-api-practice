
function watchSubmit(){

    

    $('.form').on('submit', function(e){
        e.preventDefault();
        console.log('submiting')
        let user = $('#userInput').val();
        const url = `https://api.github.com/users/${user}/repos`
       
            console.log(url);
        

        function getUser(){
            fetch(url)
            .then(Response => { 
                if(Response.ok) {
                    return Response.json();
                }
                throw new Error(Response.statusText)
            })
            .then(ResponseJson => {
            $('#js-error').text('');
            console.log(ResponseJson)
            insertRepos(ResponseJson);
            })
            .catch(err => {
                $('.list').empty();
                $('#js-error').text(err);
            });
        }
    
        function insertRepos(ResponseJson){
                $('.list').empty();


            for (let i = 0; i < ResponseJson.length; i++ ){
                let name = ResponseJson[i].full_name;
                let link = ResponseJson[i].url;
                    $('.list').append(
                    `<li id="repoName">${name}</li>
                    <li id="repoURL">${link}</li>`
                );
            }
        }
  



    getUser();
    })

}


window.onload = function(){
    watchSubmit();
    console.log('App loaded successfully, waiting on User submit')


};