export class UserInfo {
    userName;
    userProfession;
    constructor(userName, userProfession) {
        this.userName = userName;
        this.userProfession = userProfession;
    }
    getUserInfo() {
        const userInformation = {
            name: this.userName.textContent,
            profession: this.userProfession.textContent
        };
        return userInformation;
    }
    setUserInfo(inputName, inputProfession) {
        this.userName.textContent = inputName;
        this.userProfession.textContent = inputProfession;
    }
}
