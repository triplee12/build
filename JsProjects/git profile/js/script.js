const APIURL = 'https://api.github.com/users/';

const main = document.getElementById('main');
const form = document.getElementById('profile');
const search = document.getElementById('query');

getGithubUser('triplee12');

async function getGithubUser(user) {
    const resp = await fetch(APIURL + user);
    const respData = await resp.json();

    createUser(respData);

    getUserRepo(user);
}

async function getUserRepo(user) {
    const repo = await fetch(APIURL + user + '/repos');
    const repoData = await repo.json();

    addRepo(repoData);
}

function createUser(user){

    const userCard = `
        <div class="user-card">
            <div class="img-container">
                <img class="avatar" src="${user.avatar_url}" alt="${user.name}" />
            </div>
            <div class="user-info">
                <h2>${user.name}</h2>
                <p>${user.bio}</p>

                <ul>
                <li>Followers: ${user.followers}</li>
                <li>Following: ${user.following}</li>
                <li>Public Repos: ${user.public_repos}</li>
                </ul>
                <h2>Repos</h2>
                <div id="repos"></div>
            </div>
        </div>
    `;
    main.innerHTML = userCard;
}

function addRepo(repos){
    const reposEl = document.getElementById('repos');

    repos.slice(0, 9).forEach((repo) => {
        const repoEl = document.createElement('a');

        repoEl.classList.add('repo');
        repoEl.href = repo.html_url;
        repoEl.target = '_blank';
        repoEl.innerText = repo.name;

        reposEl.appendChild(repoEl);
    });
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const user = search.value;

    if(user) {
        getGithubUser(user);
        search.value = '';
    }
});