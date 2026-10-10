import type { user } from "../types/Types.js";
import type { InitialCardsType } from "../types/Types.js";
import type { Card } from "./Card.js";

export class Api {
  private url: string;
  private headers: Record <string, string>;

  constructor({url, headers}: {url: string, headers: Record <string, string>}) {
    this.url = url;
    this.headers=headers;
  }

  async getUserInfo(): Promise<user> {
    try {
      const res: Response = await fetch(`${this.url}users/me`, {
        headers: this.headers,
      });
      if (res.ok) {
        const data = await res.json();
        return data;
      } else {
        throw new Error(`Error ${res.status}`);
      }
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  async getCards(): Promise<InitialCardsType[]> {
    try {
      const res: Response = await fetch(`${this.url}cards/`, {
        headers: this.headers,
      });
      if (res.ok) {
        const imgInfo: InitialCardsType[] = [];
        const data = await res.json();
        data.forEach((card: any) => {
          imgInfo.push({
            name: card.name,
            link: card.link,
            _id: card._id,
            isLiked: card.isLiked,
            owner: card.owner
            
          });
        });
        return imgInfo;
      } else {
        throw new Error(`Error ${res.status}`);
      }
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  async editProfile(name: string, about: string): Promise<any> {

    try {
      const res: Response = await fetch(`${this.url}users/me`, {
        method: 'PATCH',
        headers: this.headers,
        body: JSON.stringify({
          name: name,
          about: about,
        }),
      });

      if (res.ok) {
        return await res.json();
      } else {
        throw new Error(`Error ${res.status}`);
      }
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  async addNewCard(name: string, link: string): Promise<any> {
    try {
      const res: Response = await fetch(`${this.url}cards/`, {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify({
          name: name,
          link: link,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        return data;
      } else {
        throw new Error(`Error ${res.status}`);
      }
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  async isLiked(isLiked: boolean, url: string): Promise<boolean> {
    try {
      if (isLiked) {
        const res: Response = await fetch(`${this.url}cards/${url}/likes`, {
          method: "DELETE",
          headers: this.headers,
        });
        if (res.ok) {
          const data = await res.json();
          return data.isLiked;
        } else {
          throw new Error(`Error ${res.status}`);
        }
      } else {
        const res: Response = await fetch(`${this.url}cards/${url}/likes`, {
          method: "PUT",
          headers: this.headers,
        });
        if (res.ok) {
          const data = await res.json();
          return data.isLiked;
        } else {
          throw new Error(`Error ${res.status}`);
        }
      }
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  async deleteCard(id: string ): Promise<void>{
    try{
              const res = await fetch(`${this.url}cards/${id}`,{
                method:  'DELETE',
                headers: this.headers
              }
                
              )
              if(!res.ok){
               throw new Error(`Error ${res.status}`)

              }
            }
            catch(err){
            console.log(err)
            throw err

  }
}
async ProfilePictureRequest(avatar: string): Promise<void> {
  try{
  const res = await fetch(`${this.url}users/me/avatar`, {
      method: 'PATCH',
      headers: this.headers,
          body: JSON.stringify({
            'avatar': avatar
          })
      
    })
    if(res.ok){
      const data = await res.json()
    } else {
      throw new Error(`Error ${res.status}`)
    }  
    }catch(err){
      console.error(err)

    }
}
}
