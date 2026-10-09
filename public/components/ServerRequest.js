export class Api {
    url;
    headers;
    constructor({ url, headers }) {
        this.url = url;
        this.headers = headers;
    }
    async getUserInfo() {
        try {
            const res = await fetch(`${this.url}users/me`, {
                headers: this.headers,
            });
            if (res.ok) {
                const data = await res.json();
                return data;
            }
            else {
                throw new Error(`Error ${res.status}`);
            }
        }
        catch (err) {
            console.error(err);
            throw err;
        }
    }
    async getCards() {
        try {
            const res = await fetch(`${this.url}cards/`, {
                headers: this.headers,
            });
            if (res.ok) {
                const imgInfo = [];
                const data = await res.json();
                data.forEach((card) => {
                    imgInfo.push({
                        name: card.name,
                        link: card.link,
                        _id: card._id,
                        isLiked: card.isLiked,
                        owner: card.owner
                    });
                });
                return imgInfo;
            }
            else {
                throw new Error(`Error ${res.status}`);
            }
        }
        catch (err) {
            console.error(err);
            throw err;
        }
    }
    async editProfile(name, about) {
        try {
            const res = await fetch(`${this.url}users/me`, {
                method: 'PATCH',
                headers: this.headers,
                body: JSON.stringify({
                    name: name,
                    about: about,
                }),
            });
            if (res.ok) {
                return await res.json();
            }
            else {
                throw new Error(`Error ${res.status}`);
            }
        }
        catch (err) {
            console.error(err);
            throw err;
        }
    }
    async addNewCard(name, link) {
        try {
            const res = await fetch(`${this.url}cards/`, {
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
            }
            else {
                throw new Error(`Error ${res.status}`);
            }
        }
        catch (err) {
            console.error(err);
            throw err;
        }
    }
    async isLiked(isLiked, url) {
        try {
            if (isLiked) {
                const res = await fetch(`${this.url}cards/${url}/likes`, {
                    method: "DELETE",
                    headers: this.headers,
                });
                if (res.ok) {
                    const data = await res.json();
                    return data.isLiked;
                }
                else {
                    throw new Error(`Error ${res.status}`);
                }
            }
            else {
                const res = await fetch(`${this.url}cards/${url}/likes`, {
                    method: "PUT",
                    headers: this.headers,
                });
                if (res.ok) {
                    const data = await res.json();
                    return data.isLiked;
                }
                else {
                    throw new Error(`Error ${res.status}`);
                }
            }
        }
        catch (err) {
            console.error(err);
            throw err;
        }
    }
    ;
    async deleteCard(card, id) {
        try {
            const res = await fetch(`${this.url}cards/${id}`, {
                method: 'DELETE',
                headers: this.headers
            });
            if (res.ok) {
                card.cardRemoval();
            }
            else {
                throw new Error(`Error ${res.status}`);
            }
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    }
    async ProfilePictureRequest(avatar) {
        try {
            const res = await fetch(`${this.url}users/me/avatar`, {
                method: 'PATCH',
                headers: this.headers,
                body: JSON.stringify({
                    'avatar': avatar
                })
            });
            if (res.ok) {
                const data = await res.json();
            }
            else {
                throw new Error(`Error ${res.status}`);
            }
        }
        catch (err) {
            console.error(err);
        }
    }
}
