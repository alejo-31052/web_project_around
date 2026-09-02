export class Api {
    url;
    method;
    constructor() {
        ((this.url = ''), (this.method = ""));
    }
    async getUserInfo(urlMethod) {
        this.url = urlMethod;
        try {
            const res = await fetch(this.url, {
                headers: {
                    'authorization': "25cd8390-a38b-4c26-9455-c3a4437cd5d2",
                },
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
    async getCards(urlMethod) {
        this.url = urlMethod;
        try {
            const res = await fetch(this.url, {
                headers: {
                    'authorization': "25cd8390-a38b-4c26-9455-c3a4437cd5d2",
                },
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
    async editProfile(name, about, urlMethod) {
        this.method = "PATCH";
        this.url = urlMethod;
        try {
            const res = await fetch(this.url, {
                method: this.method,
                headers: {
                    "Content-type": "application/json",
                    'authorization': "25cd8390-a38b-4c26-9455-c3a4437cd5d2",
                },
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
    async addNewCard(name, link, urlMethod) {
        this.url = urlMethod;
        this.method = "POST";
        try {
            const res = await fetch(this.url, {
                method: this.method,
                headers: {
                    "Content-type": "application/json",
                    'authorization': "25cd8390-a38b-4c26-9455-c3a4437cd5d2",
                },
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
    async isLiked(isLiked, urlMethod) {
        this.url = urlMethod;
        try {
            if (isLiked) {
                const res = await fetch(this.url, {
                    method: "DELETE",
                    headers: {
                        "Content-type": "application/json",
                        'authorization': "25cd8390-a38b-4c26-9455-c3a4437cd5d2",
                    },
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
                const res = await fetch(this.url, {
                    method: "PUT",
                    headers: {
                        "Content-type": "application/json",
                        'authorization': "25cd8390-a38b-4c26-9455-c3a4437cd5d2",
                    },
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
    async deleteCard(card, urlMethod) {
        this.url = urlMethod;
        try {
            const res = await fetch(this.url, {
                method: 'DELETE',
                headers: {
                    authorization: "25cd8390-a38b-4c26-9455-c3a4437cd5d2",
                }
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
}
