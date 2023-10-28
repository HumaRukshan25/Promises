const posts = [];
        let lastActivityTime = null;

        function createPost(post) {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    posts.push(post);
                    resolve(posts);
                }, 1000);
            });
        }

        function updateLastUserActivityTime() {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    lastActivityTime = new Date();
                    resolve(lastActivityTime);
                }, 1000);
            });
        }

        function deletePost() {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    if (posts.length > 0) {
                        const deletedPost = posts.pop();
                        resolve(deletedPost);
                    } else {
                        reject("No posts to delete.");
                    }
                }, 1000);
            });
        }

        document.getElementById("createPost").addEventListener("click", () => {
            createPost({ title: 'New Post', body: 'This is a new post.' })
                .then(() => updateLastUserActivityTime())
                .then(() => {
                    document.getElementById("activity").textContent = 'Last Activity Time: ' + lastActivityTime.toLocaleTimeString();
                    const postsList = document.getElementById("posts");
                    postsList.innerHTML = '';
                    posts.forEach((post) => {
                        const listItem = document.createElement('li');
                        listItem.textContent = `${post.title}: ${post.body}`;
                        postsList.appendChild(listItem);
                    });
                })
                .catch((error) => console.error(error));
        });

        document.getElementById("deletePost").addEventListener("click", () => {
            deletePost()
                .then((deletedPost) => {
                    if (deletedPost) {
                        console.log("Post deleted successfully.");
                        const postsList = document.getElementById("posts");
                        postsList.innerHTML = '';
                        posts.forEach((post) => {
                            const listItem = document.createElement('li');
                            listItem.textContent = `${post.title}: ${post.body}`;
                            postsList.appendChild(listItem);
                        });
                    }
                })
                .catch((error) => {
                    if (error === "No posts to delete") {
                        console.log("No posts to delete.");
                    } else {
                        console.error(error);
                    }
                });
        });