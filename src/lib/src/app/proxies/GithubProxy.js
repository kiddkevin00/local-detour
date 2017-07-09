import HttpProxy from './HttpProxy';


class GithubProxy {

  static getBio(username) {
    const name = username.trim().toLowerCase();
    const url = `https://api.github.com/users/${name}`;

    return HttpProxy.get(url);
  }

  static getRepos(username) {
    const name = username.trim().toLowerCase();
    const url = `https://api.github.com/users/${name}/repos`;

    return HttpProxy.get(url);
  }

}

export default GithubProxy;
