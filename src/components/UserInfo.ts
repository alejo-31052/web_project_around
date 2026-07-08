

export class UserInfo {
    private userName: HTMLElement;
    private userProfession: HTMLElement;

    constructor(userName: HTMLElement, userProfession: HTMLElement){
        this.userName= userName;
        this.userProfession = userProfession;
    }

    public getUserInfo(){
        const userInformation: Record <string, string> ={
            name: this.userName.textContent,
            profession: this.userProfession.textContent
        }
        return userInformation;
    }

    public setUserInfo(inputName:string, inputProfession: string){
        this.userName.textContent=inputName;
        this.userProfession.textContent=inputProfession;
    }
}