'use strict';

function displayResults(responseJson) {
    console.log(responseJson);
    $('#results-list').empty();

    for (let i = 0; i < responseJson.length; i++) {
        $('#results-list').append(
            `<li><h3>${responseJson[i].name}</h3>
            <a href="${responseJson[i].html_url}">${responseJson[i].html_url}</a></li>`)
        };


    $('#results').removeClass('hidden');
    
}

function getGitHubHandle(searchTerm) {
    const url = `https://api.github.com/users/${searchTerm}/repos`

    console.log(url);

    fetch(url)
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error('it is broken!');
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
        $('#js-error-message').text(`That GitHub handle doesn't exist!`);
    });
}

function watchForm() {
    $('form').submit(event => {
        event.preventDefault();
        const searchTerm = $('#js-search-term').val();
        getGitHubHandle(searchTerm);
    });
}

$(function() {
    console.log('App loaded! Ready to parse!');
    watchForm();
});