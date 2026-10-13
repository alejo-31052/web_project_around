export default interface FormConfig {
inputSelector: string;
submitButtonSelector: string;
inactiveButtonClass: string;
inputErrorClass:string;
errorClass: string

}

export type PopupConfig = {
  title?: string;
  children: React.ReactNode;
};

export interface UserInfoTypes {
    name: string,
    profession: string
    
}

export interface InitialCardsType {
    name: string;
    link: string;
    _id: string;
    isLiked: boolean;
    owner: string;
    createdAt: string;
}

export interface user {
    about: string,
avatar: string,
name: string,
_id: string

}

